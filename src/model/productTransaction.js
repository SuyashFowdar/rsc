import mongoose from 'mongoose';
import sanitizeJson from 'mongoose-sanitize-json';

const productTransaction = {
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    amount: {
        type: Number,
        default: 0
    },
    date: Date,
    transactions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction'
    }],
    details: String,
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier'
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    },
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    }
};

const productTransactionSchema = new mongoose.Schema(productTransaction);

productTransactionSchema.plugin(sanitizeJson);

export default mongoose.model('ProductTransaction', productTransactionSchema);