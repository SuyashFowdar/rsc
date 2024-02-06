import mongoose from 'mongoose';
import sanitizeJson from 'mongoose-sanitize-json';

const client = {
    name: String,
    company: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    }],
    address: String,
    phone: Number,
    email: String,
    nid: String,
    brn: String,
    bankAccNo: Number,
    bankName: String,
    bankBranch: String
};

const clientSchema = new mongoose.Schema(client);

clientSchema.plugin(sanitizeJson);

export default mongoose.model('Client', clientSchema);