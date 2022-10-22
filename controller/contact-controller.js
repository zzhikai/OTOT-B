import {
  ormCreateContact as _createContact,
  ormGetContacts as _getContact,
  ormFindContact as _findContact,
  ormUpdateContactNumber as _updateContactNumber,
  ormDeleteContact as _deleteContact,
  ormFindContactId as _findContactId,
} from "../model/contact-orm.js";

export async function createContact(req, res) {
  console.log(req.body);
  try {
    const {name, email, phoneNumber} = req.body;
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
      console.log(resp);
      if (resp.err) {
        return res
          .status(400)
          .json({message: "Could not create a new contact!"});
      } else {
        console.log(`Created new contact ${name} successfully!`);
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
    console.log(err);
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
    console.log(err);
    return res
      .status(500)
      .json({message: "Database failure when getting contacts!"});
  }
}

export async function updateContactNumber(req, res) {
  try {
    const {name, email, phoneNumber} = req.body;
    const contactExists = await _findContact(name, email, phoneNumber);
    if (contactExists) {
      return res.status(400).json({
        status: "error",
        message: "Cannot update contact with same information",
      });
    }
    if (!req.body) {
      return res
        .status(400)
        .json({message: "Required information are are missing!"});
    }
    if (name && email && phoneNumber) {
      const resp = await _updateContactNumber(name, email, phoneNumber);
      console.log(resp);
      if (resp.err) {
        return res.status(400).json({message: "Could not update contact!"});
      } else {
        console.log(`Updated contact ${name} successfully!`);
        return res
          .status(200)
          .json({message: `Updated contact ${name} successfully!`});
      }
    } else {
      return res
        .status(400)
        .json({message: "Required information are are missing!"});
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({message: "Database failure when updating contact!"});
  }
}

export async function deleteContact(req, res) {
  try {
    const {id} = req.params.id;
    const contactExists = await _findContactId(id);
    if (!contactExists) {
      return res.status(400).json({
        status: "error",
        message: "Contact does not exist",
      });
    }
    const resp = await _deleteContact(id);
    console.log(resp);
    if (resp.err) {
      return res.status(400).json({message: "Could not delete contact!"});
    } else {
      console.log(`Deleted contact ${resp} successfully!`);
      return res
        .status(200)
        .json({message: `Deleted contact ${id} successfully!`});
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({message: "Database failure when deleting contact!"});
  }
}
