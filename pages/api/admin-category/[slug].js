import connectMongo from "@/lib/mongodb";
import Category from "@/models/category";
import Blog from "@/models/blog";
import User from "@/models/user";

const handler = async (req, res) => {
    if (req.method === 'DELETE') {
        await connectMongo();
        const { slug } = req.query;
        try {
            const data = await Category.findOneAndDelete({ slug }).exec();
            if (!data) { return res.status(400).json({ error: 'Category not found' }); }
            res.json({ message: 'Category deleted successfully' });
        } catch (err) { res.status(400).json({ error: "Internal Server Error" }); }
    }

    else if (req.method === 'GET') {
        await connectMongo();
        const { slug } = req.query;

        try {
            const category = await Category.findOne({ slug }).select('name slug').exec();
            if (!category) { return res.status(400).json({ error: 'Category not found' }); }
            const totalCount = await Blog.countDocuments({ categories: category }).exec();

            const blogs = await Blog.find({ categories: category })
                .populate({ path: 'categories', model: Category, select: 'name slug' })
                .populate({ path: 'postedBy', model: User, select: 'name username' })
                .select(' title photo slug excerpt categories date postedBy tags').sort({ date: -1 })
            res.json({ category, blogs, totalCount });
        } catch (err) { console.log(err); res.status(400).json({ error: "Internal Server Error" }); }
    }

    else {
        res.status(400).json({ error: "Method Not Allowed" });
    }
};

export default handler;





