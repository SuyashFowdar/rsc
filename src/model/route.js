import mongoose from 'mongoose';
import model from '../lib/utils/model';

export default model('Route', {
    code: String,
    locations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location'
    }],
    noOfPeople: Number
});