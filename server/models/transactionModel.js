import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    userId: {type:String, required: true},
    plan: {type:String, required: true},
    amount: {type:String, required: true},
    credits: {type:String, required: true},
    payment: {type: Boolean, default: false},
    date: {type:Number}
})

const transactionalModel = mongoose.models.transaction || mongoose.model("transaction", transactionSchema)

export default transactionalModel