import connectMongo from "@/lib/mongodb";
import Blog from "@/models/blog";

const handler = async (req, res) => {
    if (req.method !== 'PUT') { return res.status(405).json({ error: 'Method not allowed' }); }
    await connectMongo();

    try {
        await Blog.updateMany({}, { status: 'Draft' });
        res.json({ success: true, message: 'All articles updated to "Draft" status.' });
    } catch (error) {
        console.error('Error updating article status:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};

export default handler;