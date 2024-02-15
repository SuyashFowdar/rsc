import mongoose from 'mongoose';
import model from '../lib/utils/model';

export default model('Transaction', {
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
});