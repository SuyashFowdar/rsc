import mongoose from 'mongoose';
import model from '../lib/utils/model';

export default model('Credit', {
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
});