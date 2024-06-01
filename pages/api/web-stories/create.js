import connectMongo from "@/lib/mongodb";
import WebStory from "@/models/webstory";
import slugify from "slugify";
import multer from 'multer';
const upload = multer({});
import moment from "moment-timezone";
export const config = { api: { bodyParser: false }, };
import fetch from 'isomorphic-fetch';
import { DOMAIN } from "@/config";

const handler = async (req, res) => {
    if (req.method !== 'POST') { return res.status(405).json({ error: 'Method not allowed' }); }
    await connectMongo();

    upload.none()(req, res, async (err) => {
        if (err) { return res.status(400).json({ error: 'Something went wrong' }) }
        const { title, description, slug, status, coverphoto, coverphotoheight, coverphotowidth, slides, link, lastimage, lastheading, ads } = req.body;

        if (!title || title.length > 69) { return res.status(400).json({ error: 'Title is required, less than 70 characters' }) }
        if (!description || description.length > 200) { return res.status(400).json({ error: 'Description is required, less than 200 characters' }); }
        if (!slug) { return res.status(400).json({ error: 'Slug is required' }) }
        if (!coverphoto) { return res.status(400).json({ error: 'Cover photo is required' }) }
        if (!slides) { return res.status(400).json({ error: 'Slides is required' }); }


        let story = new WebStory();
        story.title = title;
        story.slug = slugify(slug).toLowerCase();
        story.description = description;
        story.coverphoto = coverphoto;
        story.coverphotoheight = coverphotoheight;
        story.coverphotowidth = coverphotowidth;
        const currentDateTimeIST = moment().tz('Asia/Kolkata').format();
        story.date = currentDateTimeIST;
        story.slides = JSON.parse(slides);
        story.link = link;
        story.status = status;
        story.lastheading = lastheading;
        story.lastimage = lastimage;
        story.ads = ads;

        try {
            const savedStory = await story.save();

            if (status === 'Publish') {
                fetch(`${DOMAIN}/api/revalidate?path=/web-stories/${story.slug}`, { method: 'POST' });
            }

            return res.status(201).json(savedStory);
        } catch (error) { return res.status(500).json({ error: "Slug should be unique" }) }
    });

};

export default handler;