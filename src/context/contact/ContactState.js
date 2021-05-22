import React, { useReducer } from 'react';
import axios from 'axios';
import contactContext from './contactContext';
import contactReducer from './contactReducer';

import {
  CLEAR_CURRENT,
  CLEAR_FILTER,
  DELETE_CONTACT,
  SET_CURRENT,
  FILTER_CONTACTS,
  CONTACT_ERROR,
  GET_CONTACTS,
  CLEAR_CONTACTS,
  CONTACT_SUCCESS,
  CLEAR_SUCCESS,
  CLEAR_ERRORS
} from '../types';

const ContactState = (props) => {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null,
    loading: true,
    success: null
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  //get contacts
  const getContacts = async () => {
    try {
      const res = await axios.get('/all_contacts.php');
      dispatch({ type: GET_CONTACTS, payload: res.data });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err });
      console.log(err.message);
    }
  };

  //Add contact
  const addContact = async (contact) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/create_contact.php', contact, config);
      dispatch({ type: CONTACT_SUCCESS, payload: res.data.msg });
      // console.log(res.data.msg);
      getContacts();
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.data.msg });
      // console.log(err.response.data.msg);
    }
  };

  //Delete contact
  const deleteContact = async (id) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'DELETE',
        'Access-Control-Allow-Origin': '*'
      }
    };

    try {
      const res = await axios.delete(
        `/delete_contact.php`,
        { data: { id: id } },
        config
      );

      dispatch({ type: DELETE_CONTACT, payload: id, msg: res.data.msg });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.data.msg });
    }
  };

  //Update current contact
  const updateContact = async (contact) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put(`/update_contact.php`, contact, config);
      dispatch({ type: CONTACT_SUCCESS, payload: res.data.msg });
      getContacts();
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.data.msg });
    }
  };

  //Clear Contacts
  const clearContacts = () => {
    dispatch({ type: CLEAR_CONTACTS });
  };

  //Set current contact
  const setCurrent = (contact) => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  //Clear current contact
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  //Filter contact
  const filterContact = (text) => {
    dispatch({ type: FILTER_CONTACTS, payload: text });
  };

  //Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  //Clear Errors
  const clearErrors = () => {
    dispatch({ type: CLEAR_ERRORS });
  };

  //Clear Success
  const clearSuccess = () => {
    dispatch({ type: CLEAR_SUCCESS });
  };

  return (
    <contactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        loading: state.loading,
        success: state.success,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContact,
        clearFilter,
        getContacts,
        clearContacts,
        clearErrors,
        clearSuccess
      }}
    >
      {props.children}
    </contactContext.Provider>
  );
};

export default ContactState;
