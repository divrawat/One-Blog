import connectMongo from '@/lib/mongodb';
import User from '../../models/user';
import jwt from 'jsonwebtoken';

const handler = async (req, res) => {
    if (req.method !== 'POST') { return res.status(405).json({ error: 'Method not allowed' }); }
    const { email, password } = req.body;
    try {
        await connectMongo();
        const user = await User.findOne({ email });
        if (!user) { return res.status(401).json({ error: 'User not found' }); }
        if (!user.authenticate(password)) { return res.status(401).json({ error: 'Email and password do not match' }); }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        return res.status(200).json({
            token, user: { _id: user._id, name: user.name, email: user.email, role: user.role }
        });
    }
    catch (error) { return res.status(500).json({ error: 'Internal Server Error' }); }
};


export default handler;