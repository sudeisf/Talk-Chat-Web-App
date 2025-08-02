import { createSlice ,PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types/user";
import { AuthState } from "@/types/auth";




const initialState : AuthState = {
      isAuthenticated : false,
      user : null,
      email : null
}

const AuthSlice = createSlice({
      name : "auth",
      initialState,
      reducers : {
            setAuth(state,action:PayloadAction<User>){
                  state.isAuthenticated = true,
                  state.user = action.payload
            },
            clearAuth(state){
                  state.isAuthenticated = false,
                  state.user = null
            },
            setEmail(state,action){
                  state.email = action.payload
            },
            clearEmail(state) {
                  state.email = null
            }
      },
});

export const action = AuthSlice.actions;
export default AuthSlice.reducer;