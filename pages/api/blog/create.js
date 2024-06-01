import Blog from "@/models/blog";
import Draft from "@/models/draft";
import connectMongo from "@/lib/mongodb";
import slugify from "slugify";
import striptags from 'striptags';
import multer from 'multer';
const upload = multer({});
import User from "@/models/user";
export const config = { api: { bodyParser: false }, };
import mongoose from "mongoose";
import fetch from 'isomorphic-fetch';
import { DOMAIN } from "@/config";

const handler = async (req, res) => {
    if (req.method !== 'POST') { return res.status(405).json({ error: 'Method not allowed' }); }
    await connectMongo();

    upload.none()(req, res, async (err) => {
        if (err) { return res.status(400).json({ error: 'Something went wrong' }); }

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
                    { new: true }).populate({ path: 'postedBy', model: User })
                    .exec();
                res.json(updatedBlog);

                fetch(`${DOMAIN}/api/revalidate?path=/${blog.slug}`, { method: 'POST' });
            } catch (err) { console.log(err); }
        }

        else if (req.body.status === 'Draft') {
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
                res.json(updateddraft);
            } catch (err) { console.log(err); }
        }

        else { return res.status(400).json({ error: 'Invalid status' }); }
    });
};

export default handler;