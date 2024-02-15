import model from '../lib/utils/model';

export default model('Location', {
    name: String,
    address: String,
    street: String,
    city: String,
    district: String
});