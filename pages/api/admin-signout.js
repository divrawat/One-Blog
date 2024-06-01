import connectMongo from '@/lib/mongodb';

const handler = async (req, res) => {
    if (req.method !== 'GET') { return res.status(405).json({ error: 'Method not allowed' }); }
    try {
        await connectMongo();
        res.clearCookie('token');
        res.json({ message: 'Signout success' });
    }
    catch (error) { return res.status(500).json({ error: 'Internal Server Error' }); }
};


export default handler;