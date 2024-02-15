import mongoose from 'mongoose';
import model from '../lib/utils/model';

export default model('Product', {
    name: String,
    code: String,
    brand: String,
    category: String,
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    }
});