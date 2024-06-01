import connectMongo from "@/lib/mongodb";
import Blog from "@/models/blog";

const handler = async (req, res) => {
    if (req.method !== 'GET') { return res.status(405).json({ error: 'Method not allowed' }); }
    await connectMongo();
    try {
        const data = await Blog.find({ status: { $ne: 'draft' } }).select('slug date -_id').sort({ date: -1 }).exec();
        res.json(data);
    } catch (err) { res.json({ error: "Something Went Wrong" }); }
};

export default handler;