import connectMongo from "@/lib/mongodb";
import Blog from "@/models/blog";
import User from "@/models/user";
import Draft from "@/models/draft";

const handler = async (req, res) => {
    if (req.method !== 'GET') { return res.status(405).json({ error: 'Method not allowed' }); }
    await connectMongo();
    try {
        const totalCount = await Draft.countDocuments({ status: { $ne: 'Publish' } }).exec();
        const page = Number(req.query.page) || 1;
        const perPage = 10;
        const { search } = req.query;
        const query = { $and: [{ title: { $regex: search, $options: 'i' } }, { status: { $ne: 'Publish' } }] };
        const skip = (page - 1) * perPage;
        const data = await Draft.find(query).populate({ path: 'postedBy', model: User, select: 'name username -_id' })
            .sort({ date: -1 }).skip(skip).limit(perPage).exec();
        res.json({
            status: true,
            message: 'All Blogs Fetched Successfully',
            totalBlogs: totalCount, data
        });
    } catch (err) { console.error('Error fetching Draft:', err); res.status(500).json({ error: 'Internal Server Error' }); }

};

export default handler;