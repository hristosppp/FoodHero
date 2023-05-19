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
    },
    produkte: {
        type:[
            {
                name:{
                    type: String,
                    required:true,
                },
                menge:{
                    type: Number,
                    required: true,
                },
                extras:{
                    type:[
                        {
                            type: String,
                        }
                    ]
                }
            }
        ]
    }
},
{
    timestamps: true
})

export default mongoose.models.Orders || mongoose.model("Orders", OrderSchema)
