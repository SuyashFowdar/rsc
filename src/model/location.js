import mongoose from 'mongoose';
import sanitizeJson from 'mongoose-sanitize-json';

const location = {
    name: String,
    address: String,
    street: String,
    city: String,
    district: String
};

const locationSchema = new mongoose.Schema(location);

locationSchema.plugin(sanitizeJson);

export default mongoose.model('Location', locationSchema);