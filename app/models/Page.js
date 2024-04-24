import mongoose from 'mongoose';
import 'server-only';

const { Schema } = mongoose;

const pageSchema = new Schema({
    pageId: {
        type: Number,
        required: true
    },
    pageName: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Page = mongoose.models.Page || mongoose.model('Page', pageSchema);

export default Page;
