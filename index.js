const contacts = require('./contacts');
const yargs = require('yargs');
const chalk = require('./utils');

const argv = yargs.argv;

async function invokeAction({ action, id, name, email, phone }) {
	switch (action) {
		case 'list':
			const list = await contacts.listContacts();
			console.log(chalk.green('Get contact list'));
			console.table(list);
			break;

		case 'get':
			const contact = await contacts.getContactById(id);
			console.log(chalk.green('Get contact by ID'));
			console.table(contact);
			break;

		case 'add':
			const newContact = await contacts.addContact(name, email, phone);
			console.log(chalk.green('Add contact'));
			console.table(newContact);
			break;

		case 'remove':
			await contacts.removeContact(id);
			console.log(chalk.green(`Remove contact with ID ${id}`));
			break;

		default:
			console.warn('\x1B[31m Unknown action type!');
	}
}

invokeAction(argv);
