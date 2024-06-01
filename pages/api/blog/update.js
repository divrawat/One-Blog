import Blog from "@/models/blog";
import connectMongo from "@/lib/mongodb";
import slugify from "slugify";
import multer from 'multer';
const upload = multer({});
export const config = { api: { bodyParser: false }, };
import fetch from 'isomorphic-fetch';
import { DOMAIN } from "@/config";

const handler = async (req, res) => {
    if (req.method !== 'POST') { return res.status(405).json({ error: 'Method not allowed' }); }
    await connectMongo();

    upload.none()(req, res, async (err) => {
        if (err) { return res.status(400).json({ error: 'Something went wrong' }) }
        try {
            const slug = req.params.slug.toLowerCase();
            if (!slug) { return res.status(404).json({ error: 'Blog not found' }) }

            let blog = await Blog.findOne({ slug }).exec();

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

            if (status === 'Publish') {
                fetch(`${DOMAIN}/api/revalidate?path=/${blog.slug}`, { method: 'POST' });
            }

            return res.status(200).json(savedBlog);

        } catch (error) {
            console.error("Error updating Blog:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    });


};

export default handler;