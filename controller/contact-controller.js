import mongoose from "mongoose";
import {
  ormCreateContact as _createContact,
  ormGetContacts as _getContact,
  ormFindContact as _findContact,
  ormUpdateContactNumber as _updateContactNumber,
  ormDeleteContact as _deleteContact,
  ormFindContactId as _findContactId,
} from "../model/contact-orm.js";

export async function createContact(req, res) {
  try {
    const {name, email, phoneNumber} = req.body;
    if (
      phoneNumber.trim().length === 0 ||
      name.trim().length === 0 ||
      email.trim().length === 0
    ) {
      return res
        .status(400)
        .json({message: "Required information are are missing!"});
    }
    const contactExists = await _findContact(name, email, phoneNumber);

    if (contactExists) {
      return res.status(400).json({
        status: "error",
        message: "Contact already exists",
      });
    }
    if (!req.body) {
      return res
        .status(400)
        .json({message: "Required information are are missing!"});
    }
    if (name && email && phoneNumber) {
      const resp = await _createContact(name, email, phoneNumber);
      if (resp.err) {
        return res
          .status(400)
          .json({message: "Could not create a new contact!"});
      } else {
        return res
          .status(201)
          .json({message: `Created new contact ${name} successfully!`});
      }
    } else {
      return res
        .status(400)
        .json({message: "Required information are are missing!"});
    }
  } catch (err) {
    return res
      .status(500)
      .json({message: "Database failure when creating new contact!"});
  }
}

export async function getContacts(req, res) {
  try {
    const resp = await _getContact();
    if (resp.err) {
      return res.status(400).json({message: "Could not get contacts!"});
    } else {
      return res.status(200).json(resp);
    }
  } catch (err) {
    return res
      .status(500)
      .json({message: "Database failure when getting contacts!"});
  }
}

export async function updateContactNumber(req, res) {
  try {
    const {name, email, phoneNumber} = req.body;
    if (
      phoneNumber.trim().length === 0 ||
      name.trim().length === 0 ||
      email.trim().length === 0
    ) {
      return res
        .status(400)
        .json({message: "Required information are are missing!"});
    }
    if (!req.body) {
      return res
        .status(400)
        .json({message: "Required information are are missing!"});
    }
    if (name && email && phoneNumber) {
      const contactExists = await _findContact(name, email, phoneNumber);
      if (contactExists) {
        return res.status(400).json({
          status: "error",
          message: "Cannot update contact with same information",
        });
      }
      const resp = await _updateContactNumber(name, email, phoneNumber);
      if (resp.err) {
        return res.status(400).json({message: "Could not update contact!"});
      } else {
        return res.status(200).json({
          message: `Updated contact number to ${phoneNumber} successfully!`,
        });
      }
    }
  } catch (err) {
    return res
      .status(500)
      .json({message: "Database failure when updating contact!"});
  }
}

export async function deleteContact(req, res) {
  try {
    const {contact_id} = req.params;
    // const {id} = req.params.contact_id;
    if (!mongoose.isValidObjectId(contact_id)) {
      return res
        .status(400)
        .json({message: "Required information are are missing!"});
    }
    const contactExists = await _findContactId(contact_id);
    if (!contactExists) {
      return res.status(404).json({
        status: "error",
        message: "Contact does not exist",
      });
    }
    const resp = await _deleteContact(contact_id);
    if (resp.err) {
      return res.status(400).json({message: "Could not delete contact!"});
    } else {
      return res.status(200).json({
        message: `Deleted contact successfully!`,
        name: resp.name,
        email: resp.email,
        phoneNumber: resp.phoneNumber,
      });
    }
  } catch (err) {
    return res
      .status(500)
      .json({message: "Database failure when deleting contact!"});
  }
}
