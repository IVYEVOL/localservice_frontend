import { createContext } from "react";

export interface AuthData {
  token: string;
  user_avatar: string;
  user_email: string;
  user_id: number;
  user_mobile: string;
  // ...other fields
}

export const AuthContext = createContext<{
  authData: AuthData | null;
  setAuthData: (data: AuthData | null) => void;
}>({
  authData: null,
  setAuthData: () => {},
});
