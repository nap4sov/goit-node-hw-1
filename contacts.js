const fs = require('fs').promises;
const path = require('path');
const { v4: uuid } = require('uuid');

const contactsPath = path.resolve('./db/contacts.json');

async function listContacts() {
    try {
        const data = await fs.readFile(contactsPath);
        const allContacts = JSON.parse(data);
        console.table(allContacts);
    } catch (error) {
        console.error(error);
    }
}

async function getContactById(contactId) {
    try {
        const data = await fs.readFile(contactsPath);
        const allContacts = JSON.parse(data);
        const requestedContact = allContacts.find(({ id }) => id === contactId);
        console.table(requestedContact);
    } catch (error) {
        console.error(error);
    }
}

async function removeContact(contactId) {
    try {
        const data = await fs.readFile(contactsPath);
        const allContacts = JSON.parse(data);

        if (!allContacts.find(({ id }) => id === contactId)) {
            throw new Error(`Contact with id ${contactId} not found`);
        }

        const updatedContacts = allContacts.filter(
            ({ id }) => id !== contactId,
        );
        await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
        console.log(`Contact with id ${contactId} successfully deleted`);
    } catch (error) {
        console.error(error);
    }
}

async function addContact(name, email, phone) {
    const newContact = {
        id: uuid(),
        name,
        email,
        phone,
    };

    try {
        const data = await fs.readFile(contactsPath);
        const allContacts = JSON.parse(data);
        const updatedContacts = [...allContacts, newContact];

        await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
        console.log(`${name} successfully added to contacts`);
    } catch (error) {
        console.error(error);
    }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
