import {
  createContact,
  getContacts,
  findContact,
  updateContactNumber,
  deleteContact,
  findContactId,
} from "./repository.js";

export async function ormCreateContact(name, email, phoneNumber) {
  try {
    const contact = await createContact({
      name,
      email,
      phoneNumber,
    });
    return contact.save();
  } catch (error) {
    return {error};
    // throw error;
  }
}

export async function ormGetContacts() {
  try {
    return await getContacts();
  } catch (error) {
    return {error};
    // throw error;
  }
}

export async function ormFindContact(name, email, phoneNumber) {
  try {
    return await findContact({
      name,
      email,
      phoneNumber,
    });
  } catch (error) {
    return {error};
    // throw error;
  }
}

export async function ormUpdateContactNumber(name, email, phoneNumber) {
  try {
    return await updateContactNumber({
      name,
      email,
      phoneNumber,
    });
  } catch (error) {
    return {error};
    // throw error;
  }
}

export async function ormFindContactId(id) {
  try {
    console.log("id for findContactId :", id);
    return await findContactId(id);
  } catch (error) {
    return {error};
    // throw error;
  }
}
export async function ormDeleteContact(id) {
  try {
    return await deleteContact({id});
  } catch (error) {
    return {error};
    // throw error;
  }
}
