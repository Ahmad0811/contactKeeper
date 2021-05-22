import {
  ADD_CONTACT,
  CLEAR_CURRENT,
  CLEAR_FILTER,
  DELETE_CONTACT,
  SET_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CONTACT_ERROR,
  GET_CONTACTS,
  CLEAR_CONTACTS,
  CONTACT_SUCCESS,
  CLEAR_ERRORS,
  CLEAR_SUCCESS
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
        loading: false
      };
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [action.payload, ...state.contacts],
        loading: false
      };
    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map((contact) =>
          contact.id === action.payload.id ? action.payload : contact
        ),
        loading: false
      };
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => contact.id !== action.payload
        ),
        loading: false,
        success: action.msg
      };
    case CLEAR_CONTACTS:
      return {
        ...state,
        error: null,
        current: null,
        contacts: null,
        filtered: null
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
    case FILTER_CONTACTS:
      return {
        ...state,
        filtered: state.contacts.filter((contact) => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return (
            contact.name.match(regex) ||
            contact.email.match(regex) ||
            contact.phone.match(regex)
          );
        })
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      };
    case CONTACT_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case CONTACT_SUCCESS:
      return {
        ...state,
        success: action.payload
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      };
    case CLEAR_SUCCESS:
      return {
        ...state,
        success: null
      };

    default:
      return state;
  }
};
