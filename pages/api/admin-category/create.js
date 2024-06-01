import connectMongo from "@/lib/mongodb";
import Category from "@/models/category";
import slugify from "slugify";

const handler = async (req, res) => {
    if (req.method !== 'POST') { return res.status(405).json({ error: 'Method not allowed' }); }
    await connectMongo();
    const { name, description } = req.body;
    const slug = slugify(name).toLowerCase();
    try {
        const category = new Category({ name, description, slug });
        const data = await category.save();
        const message = "Category created successfully";
        res.json({ data, message });
    } catch (err) { res.status(400).json({ error: "Internal Server Error" }); }
};

export default handler;
