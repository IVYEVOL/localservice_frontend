import { post } from '../utils/request';

type LoginData = {
  username: string;
  password: string;
};

type RegisterData = {
  username: string;
  password: string;
};

/**
 * Login interface
 * @param data
 * @returns
 */
export const loginAPI = (data: LoginData) => post('/public/user/login', data);

/**
 * Register interface
 * @param data
 * @returns
 */
export const registerAPI = (data: RegisterData) => post('/public/user/add', data);

