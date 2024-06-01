import connectMongo from "@/lib/mongodb";
import Blog from "@/models/blog";
import Category from "@/models/category";
import User from "@/models/user";

const handler = async (req, res) => {
    if (req.method !== 'GET') { return res.status(405).json({ error: 'Method not allowed' }); }
    await connectMongo();
    try {
        const blogs = await Blog.find({}).sort({ date: -1 })
            .populate({ path: 'categories', model: Category, select: 'name slug -_id' })
            .populate({ path: 'postedBy', model: User, select: 'name username -_id' })
            .select('-_id title photo slug excerpt categories date postedBy').exec();
        res.json({ blogs, size: blogs.length });
    } catch (err) { res.json({ error: "Something Went Wrong" }); }
};

export default handler;