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
            const blogpost = await Blog.findOne({ slug })
                .populate({ path: 'postedBy', model: User, select: '-_id name username' })
                .populate({ path: 'categories', model: Category, select: 'name slug' })
                .select('photo title body slug mtitle mdesc date categories tags postedBy').exec();
            if (!blogpost) { return res.status(404).json({ error: 'BlogPost not found' }); }


            const data2 = await Blog.findOne({ slug });
            const categories = data2.categories;
            const relatedPosts = await Blog.find({ _id: { $ne: data2._id }, categories: { $in: categories }, status: { $ne: 'Draft' } })
                .populate({ path: 'postedBy', select: '-_id name username' })
                .populate({ path: 'categories', model: Category, select: '-_id name slug' })
                .select('title slug postedBy date photo').limit(6);
            res.json({ blogpost, relatedPosts });
        } catch (err) { res.json({ error: "Something Went Wrong" }); }
    }




    else if (req.method === 'DELETE') {
        await connectMongo();
        const { slug } = req.query;
        try {
            const data = await Blog.findOneAndDelete({ slug }).exec();
            if (!data) { return res.status(400).json({ error: 'Blog not found' }); }
            res.json({ message: 'Blog deleted successfully' });
            fetch(`${DOMAIN}/api/revalidate?path=/${slug}`, { method: 'POST' });
        } catch (err) { res.status(400).json({ error: "Internal Server Error" }); }
    }



    else if (req.method === 'POST') {
        await connectMongo();
        const { slug } = req.query;
        if (!slug) { return res.status(404).json({ error: 'Blog or Draft not found' }) }
        upload.none()(req, res, async (err) => {
            if (err) { return res.status(400).json({ error: 'Something went wrong' }) }
            if (req.body.status === 'Publish') {
                try {
                    let blog = await Blog.findOne({ slug }).exec();
                    if (!blog) { return res.status(404).json({ error: 'Blog not found' }); }
                    const { title, description, photo, categories, mtitle, mdesc, date, body, status } = req.body;
                    const updatefields = req.body;
                    Object.keys(updatefields).forEach((key) => {
                        if (key === 'title') { blog.title = title; }
                        else if (key === 'description') { blog.description = description; }
                        else if (key === 'mtitle') { blog.mtitle = mtitle; }
                        else if (key === 'mdesc') { blog.mdesc = mdesc; }
                        else if (key === 'date') { blog.date = date }
                        else if (key === 'body') { blog.body = body; }
                        else if (key === 'categories') { blog.categories = categories.split(',').map(category => category.trim()); }
                        else if (key === 'excerpt') { blog.excerpt = strippedContent.slice(0, 150); }
                        else if (key === 'slug') { blog.slug = slugify(updatefields.slug).toLowerCase(); }
                        else if (key === 'photo') { blog.photo = photo; }
                        else if (key === 'status') { blog.status = status; }
                    });
                    const savedBlog = await blog.save();
                    if (req.query.slug !== blog.slug) {
                        const { slug } = req.query;
                        fetch(`${DOMAIN}/api/revalidate?path=/${slug}`, { method: 'POST' });
                        fetch(`${DOMAIN}/api/revalidate?path=/${blog.slug}`, { method: 'POST' });
                    }
                    else if (req.query.slug === blog.slug) {
                        fetch(`${DOMAIN}/api/revalidate?path=/${blog.slug}`, { method: 'POST' });
                    }
                    return res.status(200).json(savedBlog);
                } catch (error) { console.log(error); return res.status(500).json({ error: "Internal Server Error" }); }
            }


            else if (req.body.status === 'Draft') {
                try {
                    const { title, description, slug, photo, categories, mtitle, mdesc, date, body, status, userId } = req.body;
                    if (!categories || categories.length === 0) { return res.status(400).json({ error: 'At least one category is required' }); }

                    let draft = new Draft();
                    draft.title = title;
                    draft.slug = slugify(slug).toLowerCase();
                    draft.description = description;
                    draft.mtitle = mtitle;
                    draft.mdesc = mdesc;
                    draft.photo = photo;
                    draft.date = date;
                    draft.body = body;
                    draft.status = status;
                    draft.postedBy = mongoose.Types.ObjectId.createFromHexString(userId);
                    let strippedContent = striptags(body);
                    let excerpt0 = strippedContent.slice(0, 150);
                    draft.excerpt = excerpt0;

                    try {
                        let arrayOfCategories = categories && categories.split(',');
                        await draft.save();
                        const updateddraft = await Draft.findByIdAndUpdate(draft._id, { $push: { categories: { $each: arrayOfCategories } } },
                            { new: true }).populate({ path: 'postedBy', model: User }).exec();

                        const { slug } = req.query;
                        await Blog.findOneAndDelete({ slug }).exec();
                        fetch(`${DOMAIN}/api/revalidate?path=/${slug}`, { method: 'POST' });

                        res.json(updateddraft);
                    } catch (err) { console.log(err); return res.status(500).json({ error: "Slug Should Be Unique" }); }
                }
                catch (error) { console.log(error); return res.status(500).json({ error: "Internal Server Error" }); }
            }
        })

    }


    else { return res.status(405).json({ error: 'Method not allowed' }); }
};


export default handler;