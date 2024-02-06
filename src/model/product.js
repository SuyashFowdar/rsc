import mongoose from 'mongoose';
import sanitizeJson from 'mongoose-sanitize-json';

const product = {
    name: String,
    code: String,
    brand: String,
    category: String,
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    }
};

const productSchema = new mongoose.Schema(product);

productSchema.plugin(sanitizeJson);

export default mongoose.model('Product', productSchema);