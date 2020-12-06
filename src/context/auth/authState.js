import React, { useReducer } from 'react';
import * as axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
import {
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOAD_USER,
  SIGNOUT,
  SIGNOUT_FAIL,
  AUTH_ERROR,
  CLEAR_ERRORS,
  CLEAR_MSG,
} from '../types';

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    msg: null,
    error: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // load user
  const loadUser = async () => {
    setAuthToken(localStorage.token);

    try {
      const res = await axios.get('http://localhost:5000/api/auth/signin');

      dispatch({
        type: LOAD_USER,
        payload: res.data,
      });
    } catch (error) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  // Sign In User
  const signin = async (email, password, userType) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post(
        `http://localhost:5000/api/auth/signin?role=${userType}`,
        {
          email,
          password,
        },
        config
      );

      dispatch({
        type: SIGNIN_SUCCESS,
        payload: res.data,
      });

      loadUser();
    } catch (error) {
      dispatch({
        type: SIGNIN_FAIL,
        payload: error.response.data.msg,
      });
    }
  };

  // signup user
  const signup = async (formData) => {
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };

    const {
      firstName,
      lastName,
      email,
      password,
      userType,
      address,
    } = formData;

    try {
      const res = await axios.post(
        `http://localhost:5000/api/auth/signup?role=${userType}`,
        {
          firstName,
          lastName,
          email,
          password,
          type: userType,
          address,
        },
        config
      );

      dispatch({
        type: SIGNUP_SUCCESS,
        payload: res.data.msg,
      });
    } catch (error) {
      dispatch({
        type: SIGNUP_FAIL,
        payload: error.response.data.msg,
      });
    }
  };

  // signout user
  const signout = () => dispatch({ type: SIGNOUT });

  // clear errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  // clear msg
  const clearMsg = () => dispatch({ type: CLEAR_MSG });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        msg: state.msg,
        signin,
        signup,
        signout,
        loadUser,
        clearErrors,
        clearMsg,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
