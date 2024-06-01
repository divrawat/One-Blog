import connectMongo from "@/lib/mongodb";
import WebStory from "@/models/webstory";

const handler = async (req, res) => {
    if (req.method !== 'GET') { return res.status(405).json({ error: 'Method not allowed' }); }
    await connectMongo();
    try {
        const data = await WebStory.find({ status: { $ne: 'draft' } }).select('slug date -_id').exec();
        res.json(data);
    } catch (err) { res.json({ error: "Something Went Wrong" }); }
};

export default handler;