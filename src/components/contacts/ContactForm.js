import React, { useContext, useState, useEffect } from 'react';

import ContactContext from '../../context/contact/contactContext';
import AlertContext from '../../context/alert/alertContext';

const ContactForm = () => {
  const contactContext = useContext(ContactContext);
  const alertContext = useContext(AlertContext);

  const { setAlert } = alertContext;

  const {
    addContact,
    current,
    clearCurrent,
    updateContact,
    success,
    clearSuccess,
    error,
    clearErrors
  } = contactContext;

  useEffect(() => {
    if (success) {
      setAlert(success, 'success');
      clearSuccess();
    }

    if (error) {
      setAlert(error, 'danger');
      clearErrors();
    }

    if (current !== null) {
      setContact(current);
    } else {
      setContact({ name: '', email: '', phone: '', type: 'personal' });
    }
  }, [success, contactContext, current]);

  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal'
  });

  const { name, email, phone, type } = contact;

  const onChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addContact(contact);
      setContact({ name: '', email: '', phone: '', type: 'personal' });
    } else {
      updateContact(contact);
      clearCurrent();
    }
  };

  const clearAll = (e) => {
    clearCurrent();
  };

  return (
    <form action='' onSubmit={onSubmit}>
      <h2 className='text-primary'>
        {current ? 'Update Contact' : 'Add Contact'}
      </h2>
      <input
        type='text'
        placeholder='Name'
        name='name'
        value={name}
        onChange={onChange}
      />
      <input
        type='email'
        placeholder='Email'
        name='email'
        value={email}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Phone'
        name='phone'
        value={phone}
        onChange={onChange}
      />
      <h5>Contact Type</h5>
      <input
        type='radio'
        name='type'
        value='personal'
        checked={type === 'personal'}
        onChange={onChange}
      />{' '}
      Personal{'  '}
      <input
        type='radio'
        name='type'
        value='professional'
        onChange={onChange}
        checked={type === 'professional'}
      />{' '}
      Professional
      <div>
        <input
          type='submit'
          value={current ? 'Update Contact' : 'Add Contact'}
          className='btn btn-primary btn-block'
        />
      </div>
      {current && (
        <div>
          <button className='btn btn-block btn-light' onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
