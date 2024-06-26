import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema(
    {
        url: { type: String }
    },
    {
        timestamps: true
    }
);

export default mongoose.models.Images || mongoose.model('Images', ImageSchema);