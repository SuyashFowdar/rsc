import mongoose from 'mongoose';
import model from '../lib/utils/model';

export default model('User', {
    username: String,
    password: String,
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    }
});