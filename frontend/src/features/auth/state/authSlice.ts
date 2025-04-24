import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthMode = "login" | "register";

interface User {
    id: string;
    name: string;
    email: string
}

interface AuthState {
    user: User | null;
    accessToken: string | null;
    isDialogOpen: boolean;
    authMode: AuthMode
}

const initialState: AuthState = {
    user: null,
    accessToken: null,
    isDialogOpen: false,
    authMode: "login"
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        openDialog: (state) => {
            state.isDialogOpen = true;
        },
        closeDialog: (state) => {
            state.isDialogOpen = false;
            state.authMode = "login";
        },
        setCredentials: (state, action: PayloadAction<{ user: User; accessToken: string }>) => {
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
        },
        logout: (state) => {
            state.user = null;
            state.accessToken = null
        },
        setAuthMode: (state, action: PayloadAction<AuthMode>) => {
            state.authMode = action.payload;
        }
    }
})


export const {
    openDialog,
    closeDialog,
    setCredentials,
    logout,
    setAuthMode
} = authSlice.actions;
export default authSlice.reducer;