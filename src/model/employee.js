import mongoose from 'mongoose';
import model from '../lib/utils/model';

export default model('Employee', {
    name: String,
    company: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    }],
    address: String,
    phone: Number,
    email: String,
    nid: String,
    bankAccNo: Number,
    bankName: String,
    bankBranch: String
});