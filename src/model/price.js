import mongoose from 'mongoose';
import sanitizeJson from 'mongoose-sanitize-json';

const product = {
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier'
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    date: Date,
    buyingPrice: Number,
    sellingPrice: Number
};

const productSchema = new mongoose.Schema(product);

productSchema.plugin(sanitizeJson);

export default mongoose.model('Price', productSchema);