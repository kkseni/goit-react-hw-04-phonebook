import { useState } from 'react';
import useLocalStorage from 'hooks/useLocalStorage';
import ContactForm from 'components/ContactForm';
import ContactList from 'components/ContactList/Contactslist';
import Filter from 'components/Filter/Filter';
import { ContainerBody, Title, TitleSecond } from './App/App.styled';

export const App = () => {
  // Масив стандартних контактів)))
  const [contacts, setContacts] = useLocalStorage('contacts', [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filterEl, setFilter] = useState('');

  // Добавляє новий об'єкт та оновлює попередній масив об'єктів
  const formSubmitHandler = newContact => {
    const contactsName = contacts.some(el => newContact.name === el.name);

    // Перевірка на однакові імена
    contactsName
      ? alert(`${newContact.name} is already in contacts.`)
      : setContacts([...contacts, newContact]);
  };

  // Інпут фільтра значення, те, що вводимо
  const changeFilter = e => {
    setFilter(e.target.value);
  };

  // Логіка фільтру
  const getVisibleContacts = () => {
    const normalizedFilter = filterEl.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const filterContacts = getVisibleContacts();

  // Логіка кнопки видалення
  const handleDeleteItem = contactId => {
    setContacts(state => state.filter(el => el.id !== contactId));
  };

  return (
    <ContainerBody>
      <Title>Phonebook</Title>

      <ContactForm onSubmit={formSubmitHandler} />

      <TitleSecond>Contacts</TitleSecond>

      <Filter value={filterEl} onChange={changeFilter} />
      <ContactList
        propsContacts={filterContacts}
        deleteBtn={handleDeleteItem}
      />
    </ContainerBody>
  );
};
