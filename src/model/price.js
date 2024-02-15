import mongoose from 'mongoose';
import model from '../lib/utils/model';

export default model('Product', {
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
});