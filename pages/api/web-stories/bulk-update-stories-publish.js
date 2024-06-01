import WebStory from "@/models/webstory";
import connectMongo from "@/lib/mongodb";

const handler = async (req, res) => {
    if (req.method !== 'PUT') { return res.status(405).json({ error: 'Method not allowed' }); }
    await connectMongo();
    try {
        await WebStory.updateMany({}, { status: 'Publish' });
        res.json({ success: true, message: 'All Web Stories updated to "Publish" status.' });
    } catch (error) {
        console.error('Error updating article status:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};

export default handler;