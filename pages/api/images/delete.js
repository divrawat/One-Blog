import connectMongo from "@/lib/mongodb";
import Images from "@/models/images";

const handler = async (req, res) => {
    if (req.method !== 'DELETE') { return res.status(405).json({ error: 'Method not allowed' }); }
    await connectMongo();
    try {
        const { url } = req.query;
        if (url) {
            const deletedImage = await Images.findOneAndDelete({ url }).exec();
            if (deletedImage) {
                res.json({ message: 'Image deleted successfully' });
            } else { res.status(404).json({ error: 'Image Cannot be found or deleted' }); }
        }
    } catch (err) { console.error(err); res.status(500).json({ error: 'Cannot delete image' }); }

};

export default handler;