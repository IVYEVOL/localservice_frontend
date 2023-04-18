import logo from '../assets/logo.png';

export const defaultImg = logo;

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

/**
 * Get token
 * @returns
 */
export const getToken = () => sessionStorage.getItem('token');