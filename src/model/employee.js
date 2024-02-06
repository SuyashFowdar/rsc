import mongoose from 'mongoose';
import sanitizeJson from 'mongoose-sanitize-json';

const employee = {
    name: String,
    company: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    }],
    address: String,
    phone: Number,
    email: String,
    nid: String,
    bankAccNo: Number,
    bankName: String,
    bankBranch: String
};

const employeeSchema = new mongoose.Schema(employee);

employeeSchema.plugin(sanitizeJson);

export default mongoose.model('Employee', employeeSchema);