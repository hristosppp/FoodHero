import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    kunde: {
        type: String,
        required: true,
        maxlength: 100
    },
    adresse: {
        type: String,
        required: true,
        maxlength: 200
    },
    betrag: {
        type: Number,
        required: true
    },
    status: {
        type: Number,
        default: 0
    },
    zahlung: {
        type: Number,
        required: true
    }
},
{
    timestamps: true
})

export default mongoose.models.Orders || mongoose.model("Orders", OrderSchema)
