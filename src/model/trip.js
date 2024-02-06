import mongoose from 'mongoose';
import sanitizeJson from 'mongoose-sanitize-json';

const trip = {
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
};

const tripSchema = new mongoose.Schema(trip);

tripSchema.plugin(sanitizeJson);

export default mongoose.model('Trip', tripSchema);