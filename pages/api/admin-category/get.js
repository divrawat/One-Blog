import connectMongo from "@/lib/mongodb";
import Category from "@/models/category";

const handler = async (req, res) => {
    if (req.method !== 'GET') { return res.status(405).json({ error: 'Method not allowed' }); }
    await connectMongo();
    try {
        const categories = await Category.find();
        return res.status(200).json({ categories });
    } catch (error) {
        console.error('Error retrieving web stories:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default handler;
