import connectMongo from "@/lib/mongodb";
import Blog from "@/models/blog";
import Draft from "@/models/draft";

const handler = async (req, res) => {
    if (req.method !== 'PUT') { return res.status(405).json({ error: 'Method not allowed' }); }
    await connectMongo();

    /*
    try {
        await Blog.updateMany({}, { status: 'Publish' });
        res.json({ success: true, message: 'All articles updated to "Publish" status.' });
    } catch (error) {
        console.error('Error updating article status:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
    */

    /*
        try {
            const draftblogs = await Draft.find({});
    
            if (draftblogs.length === 0) {
                return res.json({ success: true, message: 'No Draft articles found to transfer.' });
            }
    
            const draftBlogs = await Blog.create(draftblogs.map(blog => ({
                title: blog.title,
                slug: blog.slug,
                body: blog.body,
                excerpt: blog.excerpt,
                mtitle: blog.mtitle,
                mdesc: blog.mdesc,
                date: blog.date,
                photo: blog.photo,
                status: 'Publish',
                categories: blog.categories,
                postedBy: blog.postedBy
            })));
    
            await Draft.deleteMany({});
    
            res.json({ success: true, message: `${draftBlogs.length} published articles transferred to "Publish" status.` });
        } catch (error) {
            console.error('Error transferring articles:', error);
            res.status(500).json({ success: false, message: 'Internal server error.' });
        }
    */
};

export default handler;