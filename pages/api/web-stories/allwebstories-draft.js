import connectMongo from "@/lib/mongodb";
import WebStory from "@/models/webstory";

const handler = async (req, res) => {
    if (req.method !== 'GET') { return res.status(405).json({ error: 'Method not allowed' }); }
    await connectMongo();
    try {
        const totalCount = await WebStory.countDocuments({ status: { $ne: 'Publish' } }).exec();
        const page = Number(req.query.page) || 1;
        const perPage = 10;
        const { search } = req.query;
        const query = { $and: [{ title: { $regex: search, $options: 'i' } }, { status: { $ne: 'Publish' } }] };
        const skip = (page - 1) * perPage;
        const data = await WebStory.find(query).sort({ createdAt: -1 }).skip(skip).limit(perPage).exec();
        res.json({
            status: true,
            message: 'All Draft Web Stories Fetched Successfully',
            totalBlogs: totalCount, data
        });
    } catch (err) { console.error('Error fetching Draft Web Stories:', err); res.status(500).json({ error: 'Internal Server Error' }); }
};

export default handler;