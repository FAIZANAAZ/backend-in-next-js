import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
    },
    message: {
        type: String,
        required: true,
    },
});

const schema= mongoose.model("Enquiry", enquirySchema);
// ye hmara table ka name he
export default schema;