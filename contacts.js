const fs = require('fs');
const path = require('path');
const shortId = require('shortid');
const { promises: fsPromise } = fs;
const chalk = require('./utils');

const contactsPath = path.join(__dirname, 'db', 'contacts.json'); // OS independent

async function listContacts() {
	try {
		const contacts = await fsPromise.readFile(contactsPath, 'utf-8');
		return JSON.parse(contacts);
	} catch (err) {
		errHandle(err);
	}
}

async function getContactById(contactId) {
	try {
		const contacts = await listContacts();
		return contacts.find(({ id }) => id === contactId);
	} catch (err) {
		errHandle(err);
	}
}

async function removeContact(contactId) {
	try {
		const contacts = await listContacts();
		const newList = contacts.filter(({ id }) => id !== contactId);
		await fsPromise.writeFile(contactsPath, JSON.stringify(newList));
	} catch (err) {
		errHandle(err);
	}
}

async function addContact(name, email, phone) {
	try {
		const contacts = await listContacts();
		const id = shortId.generate();
		const newContact = { id, name, email, phone };
		const newList = [...contacts, newContact];
		await fsPromise.writeFile(contactsPath, JSON.stringify(newList));
		return newContact;
	} catch (err) {
		errHandle(err);
	}
}

function errHandle(err) {
	console.log(chalk.red(err));
	process.exit(1);
}

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
};
