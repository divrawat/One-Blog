import connectMongo from "@/lib/mongodb";
import Images from "@/models/images";

const handler = async (req, res) => {
    if (req.method !== 'GET') { return res.status(405).json({ error: 'Method not allowed' }); }
    await connectMongo();
    try {
        const totalCount = await Images.countDocuments({}).exec();
        const page = parseInt(req.query.page) || 1;
        const perPage = 10;
        const skip = (page - 1) * perPage;
        const data = await Images.find({}).select('-_id url createdAt').sort({ createdAt: -1 }).skip(skip).limit(perPage).exec();
        res.json({ totalImages: totalCount, data });
    } catch (err) { console.error('Error fetching images:', err); res.status(500).json({ error: 'Internal Server Error' }); }

};

export default handler;