import { createSlice } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const authSlice = createSlice({
    name:'auth',
    initialState:{
        authData:[],
        isAuthenticated: false
    },
    reducers:{
        resetAuth:(state,action)=>{
            state.authData = action.payload;
        },
        addAuth:(state,action)=>{
            state.authData = action.payload;
            localStorage.setItem('Auth', JSON.stringify(action.payload));
        },
        removeAuth:(state)=>{
            state.authData = [];
            localStorage.removeItem('Auth');
            // toast.error(`You have successfully logged out`,{position:'top-right' })
        }
    }
})

export const {addAuth,removeAuth,resetAuth} = authSlice.actions;
export default authSlice.reducer;