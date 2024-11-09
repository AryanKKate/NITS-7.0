import { Schema, model } from "mongoose";

const txnSchema = new Schema({
  amount: Number,
  from: {
    type: String,
    required: true,
  },
  signatures: {
    type: [ {address: String, signature: String} ]
  },
  requiredSignatures: {
    type: Number,
    required: true
  },
  to: {
    type: String,
    required: true,
  },
  txHash: {
    type: String,
    default: false
  },
  executed: {
    type: Boolean,
  },
  status: { type: String, enum: ["Pending", "Complete"], default: "Pending" },
})

export default model("Transaction", txnSchema);