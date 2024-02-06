import mongoose from 'mongoose';
import sanitizeJson from 'mongoose-sanitize-json';

const supplier = {
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

const supplierSchema = new mongoose.Schema(supplier);

supplierSchema.plugin(sanitizeJson);

export default mongoose.model('Supplier', supplierSchema);