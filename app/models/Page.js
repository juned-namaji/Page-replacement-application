import mongoose from 'mongoose';
import 'server-only';

const { Schema } = mongoose;

const pageSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    pageName: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Page = mongoose.models.Page || mongoose.model('Page', pageSchema);

export default Page;
