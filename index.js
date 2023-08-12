const argv = require('yargs').argv;
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require('./contacts');

async function invokeAction({ action, id, name, email, phone }) {
  try {
    switch (action) {
      case 'list':
          const contacts = await listContacts();
          console.log('All contacts:');
          console.table(contacts);
        
        break;

      case 'get':
        const contact = await getContactById(id);
        if (contact) {
          console.log('Contact by ID:', contact);
        } else {
          console.log(null);
        }
        break;

      case 'add':
        const newContact = await addContact(name, email, phone);
        console.log('Newly added contact:', newContact);
        break;

      case 'remove':
        const removedContact = await removeContact(id);
        if (removedContact) {
          console.log('Removed contact:', removedContact);
        } else {
          console.log(null);
        }
        break;

      default:
        console.warn('\x1B[31m Unknown action type!');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

invokeAction(argv);
