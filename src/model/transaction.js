import mongoose from 'mongoose';
import sanitizeJson from 'mongoose-sanitize-json';

const transaction = {
    details: String,
    date: Date,
    incoming: {
        type: Number,
        default: 0
    },
    outgoing: {
        type: Number,
        default: 0
    },
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

const transactionSchema = new mongoose.Schema(transaction);

transactionSchema.plugin(sanitizeJson);

export default mongoose.model('Transaction', transactionSchema);