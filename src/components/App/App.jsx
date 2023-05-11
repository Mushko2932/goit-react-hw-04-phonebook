import { useEffect, useState } from "react";
import { ContactsForm } from "components/ContactsForm/ContactsForm";
import { ContactList } from "components/ContactList/ContactList";
import contacts from "components/contacts.json";
import { SearchForm } from "components/SearchForm/SearchForm";
import { Container } from "./App.styled";

const getInitialContacts = () => {
  const myContacts = localStorage.getItem('contacts');

  if (myContacts !== null) {
    return JSON.parse(myContacts);
  } else {
    return contacts;
  }
}

export const App = () => {
  const [contacts, setContacts] = useState(getInitialContacts);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts])
  
  const addContact = newContact => {
    setContacts(prevState => [...prevState, newContact]);
  };

  const deleteContact = contactId => {
    setContacts(prevState => prevState.filter(contact => contact.id !== contactId));
  };

  const changeSearchForm = e => {
    setFilter(e.currentTarget.value.toLowerCase());
  };

  const getContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    const myContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
    return myContacts;
  };

    return (
      <Container>
        <h1>Phonebook</h1>
        <ContactsForm onAdd={addContact} />
        <h2>Contacts</h2>
        <SearchForm onChange={changeSearchForm} value={filter} />
        <ContactList contacts={getContacts()} onDelete={deleteContact} />
      </Container>
    );
};
