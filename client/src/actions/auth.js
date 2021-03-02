import axios from 'axios';
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from './types';
import setAuthToken from '../utils/setAuthToken';

//Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/auth');
    dispatch({
      type: USER_LOADED,
      payload: res.data, //user
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//Register User

export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'content-type': 'application/json',
    },
  };
  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post('/api/users', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data, //token
    });

    dispatch(loadUser());
  } catch (err) {
    // console.log(err.response.data);
    const errors = err.response.data.errors;
    // return res.status(400).json({ errors: errors.array() }); in users route register part
    if (errors) {
      errors.map((err) => dispatch(setAlert(err.msg, 'danger')));
    }

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

//Login User

export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'content-type': 'application/json',
    },
  };
  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/auth', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data, // token
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    // return res.status(400).json({ errors: errors.array() }); in users route register part
    if (errors) {
      errors.map((err) => dispatch(setAlert(err.msg, 'danger')));
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

//Log Out / Clear Profile

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};