import { User } from "./user";
export interface AuthState {
      isAuthenticated: boolean;
      user: User | null;
}
export interface LoginCredentials { 
      email : string,
      password : string
    }
export interface RegisterCredentials { 
      email : string;
      username: string;
      password: string;
     }