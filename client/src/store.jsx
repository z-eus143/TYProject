import {configureStore , createSlice} from '@reduxjs/toolkit'

const initialState = {value: {
    firstname : "",
    lastname : "",
    email : "",
    mobileno : "",
    image : ""
}}
const userSlice = createSlice({
    name : "user",
    initialState,
    reducers: {
        login: (state, action) => {
            state.value = action.payload;
        },
        logout: (state) => {
            state.value = initialState.value;
        }
    },
})

export const { login, logout } = userSlice.actions;

export const store = configureStore({
    reducer : {
        user : userSlice.reducer
    },
});