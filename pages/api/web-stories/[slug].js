import connectMongo from "@/lib/mongodb";
import WebStory from "@/models/webstory";
import slugify from "slugify";
import moment from "moment-timezone";
import multer from 'multer';
const upload = multer({});
export const config = { api: { bodyParser: false }, };
import fetch from 'isomorphic-fetch';
// import { DOMAIN } from "@/config";

// const DOMAIN = process.env.DOMAIN;

const handler = async (req, res) => {
    if (req.method === 'GET') {
        await connectMongo();
        const { slug } = req.query;
        try {
            const webstory = await WebStory.findOne({ slug });
            if (!WebStory) { return res.status(404).json({ error: 'Web story not found' }); }
            return res.status(200).json({ webstory });
        } catch (error) {
            console.error('Error retrieving web story:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    else if (req.method === 'DELETE') {
        await connectMongo();
        const { slug } = req.query;
        try {
            const data = await WebStory.findOneAndDelete({ slug }).exec();
            if (!data) {
                return res.status(404).json({ error: 'WebStory not found' });
            }
            res.json({ message: 'WebStory deleted successfully' });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: "Something went wrong" });
        }
        fetch(`${DOMAIN}/api/revalidate?path=/web-stories/${slug}`, { method: 'POST' })
    }



    else if (req.method === 'PATCH') {
        await connectMongo();
        const { slug } = req.query;
        upload.none()(req, res, async (err) => {
            if (err) { return res.status(400).json({ error: 'Something went wrong' }) }

            const updateFields = req.body;

            try {

                if (!slug) { return res.status(404).json({ error: 'Story not found' }) }

                let story = await WebStory.findOne({ slug }).exec();

                const currentDateTimeIST = moment().tz('Asia/Kolkata').format();
                story.date = currentDateTimeIST;

                Object.keys(updateFields).forEach((key) => {
                    if (key === 'title') { story.title = updateFields.title; }
                    else if (key === 'description') { story.description = updateFields.description; }
                    else if (key === 'slug') { story.slug = slugify(updateFields.slug).toLowerCase(); }
                    else if (key === 'coverphoto') { story.coverphoto = updateFields.coverphoto; }
                    else if (key === 'coverphotoheight') { story.coverphotoheight = updateFields.coverphotoheight; }
                    else if (key === 'coverphotowidth') { story.coverphotowidth = updateFields.coverphotowidth; }
                    else if (key === 'ads') { story.ads = updateFields.ads; }
                    else if (key === 'slides') { story.slides = JSON.parse(updateFields.slides); }
                    else if (key === 'link') { story.link = updateFields.link; }
                    else if (key === 'lastimage') { story.lastimage = updateFields.lastimage; }
                    else if (key === 'lastheading') { story.lastheading = updateFields.lastheading; }
                    else if (key === 'status') { story.status = updateFields.status; }
                });
                const savedStory = await story.save();

                if (story.status === 'Publish') {
                    fetch(`${DOMAIN}/api/revalidate?path=/web-stories/${story.slug}`, { method: 'POST' })
                }
                return res.status(200).json(savedStory);
            } catch (error) {
                console.error("Error updating web story:", error);
                return res.status(500).json({ error: "Internal Server Error" });
            }
        });


    }

    else {
        return res.status(405).json({ error: 'Method not allowed' });
    }

}

export default handler;