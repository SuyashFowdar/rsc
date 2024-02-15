import { types, setModel } from '../lib/utils/model';

export default setModel('ProductTransaction', {
    product: {
        type: types.ObjectId,
        ref: 'Product'
    },
    amount: {
        type: Number,
        default: 0
    },
    date: Date,
    transactions: [{
        type: types.ObjectId,
        ref: 'Transaction'
    }],
    details: String,
    company: {
        type: types.ObjectId,
        ref: 'Company'
    },
    supplier: {
        type: types.ObjectId,
        ref: 'Supplier'
    },
    client: {
        type: types.ObjectId,
        ref: 'Client'
    },
    employee: {
        type: types.ObjectId,
        ref: 'Employee'
    }
});