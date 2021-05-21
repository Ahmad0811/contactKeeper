import React, { useReducer } from 'react';

import authReducer from './authReducer';
import authContext from './authContext';

import setAuthToken from '../../utils/setAuthToken';

import axios from 'axios';

import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from '../types';

const AuthState = (props) => {
  const initialState = {
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    error: null
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User

  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Origin': '*'
      }
    };

    try {
      const res = await axios.get('/user_info.php', config);
      // console.log(res);

      dispatch({ type: USER_LOADED, payload: res.data });
    } catch (err) {
      console.log(err.message);
      //   dispatch({ type: AUTH_ERROR, payload: err });
    }
  };

  // Register User

  const register = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Origin': '*'
      }
    };

    try {
      const res = await axios.post('/register.php', formData, config);
      // console.log(res.body);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });

      loadUser();
    } catch (err) {
      console.log(err.message);
      // dispatch({
      //   type: REGISTER_FAIL,
      //   payload: err.response.data.msg
      // });
    }
  };

  // Login User

  const login = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Origin': '*'
      }
    };

    try {
      const res = await axios.post('/login.php', formData, config);
      console.log(res);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });

      loadUser();
    } catch (err) {
      //   dispatch({
      //     type: LOGIN_FAIL,
      //     payload: err.response.data.msg
      //   });
      console.log(err);
    }
  };

  // Logout
  const logout = () => {
    dispatch({ type: LOGOUT });
  };

  //Clear Errors

  const clearErrors = () => {
    dispatch({ type: CLEAR_ERRORS });
  };

  return (
    <authContext.Provider
      value={{
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        error: state.error,
        register,
        clearErrors,
        loadUser,
        login,
        logout
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default AuthState;
