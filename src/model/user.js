import mongoose from 'mongoose';
import sanitizeJson from 'mongoose-sanitize-json';

const user = {
    username: String,
    password: String,
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    }
};

const userSchema = new mongoose.Schema(user);

userSchema.plugin(sanitizeJson);

export default mongoose.model('User', userSchema);