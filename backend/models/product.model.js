import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    summary:{
        type: String,
        required: true
    },
    budget:{
        type: Number,
        required: true
    },
    audience:{
        type: String,
        required: true
    },
    venue:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    time:{
        type: String,
        required: true
    },
    status:{
        type: String,
        enum: ["Active", "Completed"],
        default: "Active",
        required: true,
    },
},  {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

export default Product;