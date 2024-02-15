import { types, setModel } from '../lib/utils/model';

export default setModel('Employee', {
    name: String,
    company: [{
        type: types.ObjectId,
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