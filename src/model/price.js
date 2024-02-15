import { types, setModel } from '../lib/utils/model';

export default setModel('Product', {
    product: {
        type: types.ObjectId,
        ref: 'Product'
    },
    supplier: {
        type: types.ObjectId,
        ref: 'Supplier'
    },
    company: {
        type: types.ObjectId,
        ref: 'Company'
    },
    date: Date,
    buyingPrice: Number,
    sellingPrice: Number
});