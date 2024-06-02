import connectMongo from "@/lib/mongodb";
import Blog from "@/models/blog";
import User from "@/models/user";
import Category from "@/models/category";
import slugify from "slugify";
import multer from 'multer';
const upload = multer({});
export const config = { api: { bodyParser: false }, };
import fetch from 'isomorphic-fetch';
import { DOMAIN } from "@/config";
import Draft from "@/models/draft";
import mongoose from "mongoose";
import striptags from 'striptags';

const handler = async (req, res) => {

    if (req.method === 'GET') {
        await connectMongo();
        const { slug } = req.query;
        try {
            const draftpost = await Draft.findOne({ slug })
                .populate({ path: 'postedBy', model: User, select: '-_id name username' })
                .populate({ path: 'categories', model: Category, select: 'name slug' })
                .select('photo title body slug mtitle mdesc date categories tags postedBy').exec();
            if (!draftpost) { return res.status(404).json({ error: 'Draftpost not found' }); }


            // const data2 = await Blog.findOne({ slug });
            // const categories = data2.categories;
            // const relatedPosts = await Blog.find({ _id: { $ne: data2._id }, categories: { $in: categories }, status: { $ne: 'Draft' } })
            //  .populate({ path: 'postedBy', select: '-_id name username' })
            // .populate({ path: 'categories', model: Category, select: '-_id name slug' })
            // .select('title slug postedBy date photo').limit(6);
            res.json({ draftpost });
        } catch (err) { console.log(err); res.json({ error: "Something Went Wrong000" }); }
    }




    else if (req.method === 'DELETE') {
        await connectMongo();
        const { slug } = req.query;
        try {
            const data = await Draft.findOneAndDelete({ slug }).exec();
            if (!data) { return res.status(400).json({ error: 'Draft not found' }); }
            res.json({ message: 'Draft deleted successfully' });
        } catch (err) { res.status(400).json({ error: "Internal Server Error" }); }
    }



    else if (req.method === 'POST') {
        await connectMongo();
        const { slug } = req.query;
        console.log(slug);
        if (!slug) { return res.status(404).json({ error: 'Blog or Draft not found' }) }
        upload.none()(req, res, async (err) => {
            if (err) { return res.status(400).json({ error: 'Something went wrong' }) }

            if (req.body.status === 'Publish') {
                const { title, description, slug, photo, categories, mtitle, mdesc, date, body, status, userId } = req.body;
                if (!categories || categories.length === 0) { return res.status(400).json({ error: 'At least one category is required' }); }

                let blog = new Blog();
                blog.title = title;
                blog.slug = slugify(slug).toLowerCase();
                blog.description = description;
                blog.mtitle = mtitle;
                blog.mdesc = mdesc;
                blog.photo = photo;
                blog.date = date;
                blog.body = body;
                blog.status = status;
                blog.postedBy = mongoose.Types.ObjectId.createFromHexString(userId);
                let strippedContent = striptags(body);
                let excerpt0 = strippedContent.slice(0, 150);
                blog.excerpt = excerpt0;

                try {

                    let arrayOfCategories = categories && categories.split(',');
                    await blog.save();
                    const updatedBlog = await Blog.findByIdAndUpdate(blog._id, { $push: { categories: { $each: arrayOfCategories } } },
                        { new: true }).populate({ path: 'postedBy', model: User }).exec();

                    if (req.query.slug !== blog.slug) {
                        const { slug } = req.query;
                        await Draft.findOneAndDelete({ slug }).exec();
                        fetch(`${DOMAIN}/api/revalidate?path=/${blog.slug}`, { method: 'POST' });
                    }
                    else if (req.query.slug === blog.slug) {
                        await Draft.findOneAndDelete({ slug }).exec();
                        fetch(`${DOMAIN}/api/revalidate?path=/${slug}`, { method: 'POST' });
                    }
                    res.json(updatedBlog);


                } catch (err) { console.log(err); }
            }


            else if (req.body.status === 'Draft') {
                try {
                    let draft = await Draft.findOne({ slug }).exec();
                    if (!draft) { return res.status(404).json({ error: 'Blog not found' }); }
                    const { title, description, photo, categories, mtitle, mdesc, date, body, status } = req.body;
                    const updatefields = req.body;
                    Object.keys(updatefields).forEach((key) => {
                        if (key === 'title') { draft.title = title; }
                        else if (key === 'description') { draft.description = description; }
                        else if (key === 'mtitle') { draft.mtitle = mtitle; }
                        else if (key === 'mdesc') { draft.mdesc = mdesc; }
                        else if (key === 'date') { draft.date = date }
                        else if (key === 'body') { draft.body = body; }
                        else if (key === 'categories') { draft.categories = categories.split(',').map(category => category.trim()); }
                        else if (key === 'excerpt') { draft.excerpt = strippedContent.slice(0, 150); }
                        else if (key === 'slug') { draft.slug = slugify(updatefields.slug).toLowerCase(); }
                        else if (key === 'photo') { draft.photo = photo; }
                        else if (key === 'status') { draft.status = status; }
                    });
                    const savedDraft = await draft.save();
                    return res.status(200).json(savedDraft);

                } catch (error) { console.log(error); return res.status(500).json({ error: "Internal Server Error" }); }
            }
        })

    }


    else { return res.status(405).json({ error: 'Method not allowed' }); }
};


export default handler;