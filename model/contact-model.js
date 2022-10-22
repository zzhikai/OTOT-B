import mongoose from "mongoose";

const {Schema} = mongoose;

const ContactModelSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
// pair of name and phone number must be unique
ContactModelSchema.index({name: 1, email: 1, phoneNumber: 1}, {unique: true});
export default mongoose.model("Contact", ContactModelSchema);
