import { types, setModel } from '../lib/utils/model';

export default setModel('Product', {
    name: String,
    code: String,
    brand: String,
    category: String,
    company: {
        type: types.ObjectId,
        ref: 'Company'
    }
});