import mongoose from 'mongoose';
import sanitizeJson from 'mongoose-sanitize-json';

const company = {
    name: String,
    brn: String
};

const companySchema = new mongoose.Schema(company);

companySchema.plugin(sanitizeJson);

export default mongoose.model('Company', companySchema);