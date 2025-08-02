import { User } from "./user";
export interface AuthState {
      isAuthenticated: boolean;
      user: User | null;
      email: string | null;   
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
export interface VerifyEmailCredentials {
      email : string
}
export interface VerifyOTPCredentials {
      email? : string | null;
      code :  number
}