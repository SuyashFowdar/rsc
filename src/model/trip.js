import mongoose from 'mongoose';
import model from '../lib/utils/model';

export default model('Trip', {
    date: String,
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    },
    route: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Route'
    },
    noOfPeople: Number,
    cost: Number
});