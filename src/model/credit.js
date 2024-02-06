import mongoose from 'mongoose';
import sanitizeJson from 'mongoose-sanitize-json';

const credit = {
    amount: Number,
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    },
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    personName: String,
    personNo: Number,
    date: Date,
    payments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction'
    }]
};

const creditSchema = new mongoose.Schema(credit);

creditSchema.plugin(sanitizeJson);

export default mongoose.model('Credit', creditSchema);