import { types, setModel } from '../lib/utils/model';

export default setModel('Location', {
    name: String,
    address: String,
    street: String,
    city: String,
    district: String
});