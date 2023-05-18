import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50
    },
    beschreibung: {
        type: String,
        required: true,
        maxlength: 250
    },
    kategorie: {
        type: String,
        required: true,
        maxlength: 30
    },
    preis:{
        type: Number,
        required: true
    },
    url: {
        type: String,
        required: true,
        maxlength: 30,
        unique: true
    },
    bild: {
        type: String,
        required: true
    },
    extras: {
        type: [
            {
                text:{
                    type: String,
                    required: true
                },
                preis: {
                    type: Number,
                    required: true
                }
            }
        ]
    }
},
{
    timestamps: true
})

export default mongoose.models.Product || mongoose.model("Product", ProductSchema)