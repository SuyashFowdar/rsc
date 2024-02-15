import { types, setModel } from '../lib/utils/model';

export default setModel('Transaction', {
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