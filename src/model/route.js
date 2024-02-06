import mongoose from 'mongoose';
import sanitizeJson from 'mongoose-sanitize-json';

const route = {
    code: String,
    locations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location'
    }],
    noOfPeople: Number
};

const routeSchema = new mongoose.Schema(route);

routeSchema.plugin(sanitizeJson);

export default mongoose.model('Route', routeSchema);