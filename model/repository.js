import "dotenv/config.js";
import mongoose from "mongoose";
import ContactModel from "./contact-model.js";
const port = process.env.PORT;
const mongoDB = process.env.MONGODB_URI;
const dbName = process.env.NODE_ENV === "test" ? "testApiDB" : "apiDB";
mongoose.connect(mongoDB, {
  dbname: dbName,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
if (db) {
  console.log("Connected to MongoDB");
} else {
  console.log("Not connected to MongoDB");
}

export async function createContact(params) {
  return new ContactModel(params);
}

export async function getContacts() {
  const contactList = await ContactModel.find({});
  return contactList;
}

export async function findContact(params) {
  const foundContact = ContactModel.findOne(params);
  return foundContact;
}

export async function updateContactNumber(params) {
  const {name, email, phoneNumber} = params;
  const filter = {
    name: name,
    email: email,
  };
  const update = {
    phoneNumber: phoneNumber,
  };
  const updatedContact = ContactModel.findOneAndUpdate(filter, update, {
    new: true,
  });
  return updatedContact;
}

export async function findContactId(params) {
  const foundContact = ContactModel.findById(params);
  return foundContact;
}

export async function deleteContact(params) {
  const {id} = params;
  const filter = {
    _id: id,
  };
  const deletedContact = ContactModel.findOneAndDelete(filter);
  console.log(deletedContact);
  return deletedContact;
}
