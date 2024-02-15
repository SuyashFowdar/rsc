import { types, setModel } from '../lib/utils/model';

export default setModel('Credit', {
    amount: Number,
    client: {
        type: types.ObjectId,
        ref: 'Client'
    },
    employee: {
        type: types.ObjectId,
        ref: 'Employee'
    },
    company: {
        type: types.ObjectId,
        ref: 'Company'
    },
    personName: String,
    personNo: Number,
    date: Date,
    payments: [{
        type: types.ObjectId,
        ref: 'Transaction'
    }]
});