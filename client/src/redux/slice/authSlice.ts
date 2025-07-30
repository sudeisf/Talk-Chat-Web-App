import { createSlice ,PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types/user";



interface AuthState {
      isAuthenticated : boolean,
      user : User | null
}


const initialState : AuthState = {
      isAuthenticated : false,
      user : null
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
            }
      },
});

export const action = AuthSlice.actions;
export default AuthSlice.reducer;