import { types, setModel } from '../lib/utils/model';

export default setModel('User', {
    username: String,
    password: String,
    employee: {
        type: types.ObjectId,
        ref: 'Employee'
    }
});