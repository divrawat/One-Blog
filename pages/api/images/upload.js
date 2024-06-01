import connectMongo from "@/lib/mongodb";
import Images from "@/models/images";

const handler = async (req, res) => {
    if (req.method !== 'POST') { return res.status(405).json({ error: 'Method not allowed' }); }
    await connectMongo();
    try {
        const { url } = req.body;
        const images = new Images({ url });
        const data = await images.save();
        res.json(data);
    } catch (err) { res.status(400).json({ error: "Something went wrong" }) }

};

export default handler;