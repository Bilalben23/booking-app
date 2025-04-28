import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type AuthMode = "login" | "register";

export interface User {
    id: string;
    name: string;
    email: string;
    image?: string
}

interface AuthState {
    user: User | null;
    accessToken: string | null;
    isAuthenticated: boolean;
    isDialogOpen: boolean;
    authMode: AuthMode;
    redirectPath: string
}

const initialState: AuthState = {
    user: null,
    accessToken: null,
    isAuthenticated: false,
    isDialogOpen: false,
    authMode: "login",
    redirectPath: "/"
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
            state.accessToken = action.payload.accessToken;
            state.user = action.payload.user;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.accessToken = null;
            state.user = null;
            state.isAuthenticated = false;
        },
        setAuthMode: (state, action: PayloadAction<AuthMode>) => {
            state.authMode = action.payload;
        },
        setRedirectPath(state, action: PayloadAction<string>) {
            state.redirectPath = action.payload;
        },
    }
})


export const {
    openDialog,
    closeDialog,
    setCredentials,
    logout,
    setAuthMode,
    setRedirectPath
} = authSlice.actions;
export default authSlice.reducer;