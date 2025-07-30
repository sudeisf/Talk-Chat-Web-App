import { createSlice ,PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types/user";



const initialState = {
      isAuthenticated : false,
      user : null
}

const AuthSlice = createSlice({
      name : "auth",
      initialState,
      reducers : {
            setAuth(state,action:PayloadAction<User>){

            },
            clearAuth(state){
                  
            }
      },
});

export const action = AuthSlice.actions;
export default AuthSlice.reducer;