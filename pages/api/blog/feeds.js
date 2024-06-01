import connectMongo from "@/lib/mongodb";
import Blog from "@/models/blog";
import User from "@/models/user";

const handler = async (req, res) => {
    if (req.method !== 'GET') { return res.status(405).json({ error: 'Method not allowed' }); }
    await connectMongo();
    try {
        const data = await Blog.find({}).sort({ date: -1 })
            .populate({ path: 'postedBy', model: User, select: 'name username -_id' })
            .select('-_id title excerpt mdesc slug date body postedBy').limit(6).exec();
        res.json(data);
    } catch (err) { res.json({ error: "Something Went Wrong" }); }

};

export default handler;