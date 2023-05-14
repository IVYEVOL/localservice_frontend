import logo from '../assets/logo.png';
import axios from 'axios';
import Cookies from 'js-cookie';

export const defaultImg = logo;



// const userJson = JSON.stringify(user);


/**
 * Back-end server address
 */
// export const serverUrl = 'http://localhost:3006';
export const serverUrl = 'http://51.104.196.52:8090/api/v1';

/**
 * Set token
 * @param token
 * @returns
 */
export const setToken = (token: string) =>
  sessionStorage.setItem('token', token);


export const setUser = (user: any) =>
  Cookies.set('user', JSON.stringify(user));


export const getUser = () => !!Cookies.get('user');


export const removeUser = () => Cookies.remove('user');

/**
 * Get token
 * @returns
 */
export const getToken = () => "Bearer: " + sessionStorage.getItem('token');

/**
 * Get authorization
 * @returns
 */
export const getAuthorization = () => axios.defaults.headers.common['Authorization'] = getToken();


/**
 * Remove token
 * @returns
 */
export const removeToken = () => sessionStorage.removeItem('token');

