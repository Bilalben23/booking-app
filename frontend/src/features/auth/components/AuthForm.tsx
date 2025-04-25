// components/auth/AuthForm.tsx
import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import SocialAuth from "./SocialAuth";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { setAuthMode } from "../state/authSlice";

const AuthForm = () => {
    const { authMode } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>();
    const isLogin = authMode === "login";

    const toggleAuthMode = () => {
        dispatch(setAuthMode(authMode === "login" ? "register" : "login"))
    }
 
    return (
        <div className="space-y-3">
            {isLogin ? <LoginForm /> : <RegisterForm />}

            <div className="text-center">
                <p className="text-sm text-muted-foreground">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <Button variant="link" className="ml-2" onClick={toggleAuthMode}>
                        {isLogin ? "Register" : "Login"}
                    </Button>
                </p>
            </div>

            <div className="flex items-center my-4">
                <span className="flex-grow h-px bg-muted-foreground/50" />
                <span className="mx-2 text-sm text-gray-500">or</span>
                <span className="flex-grow h-px bg-muted-foreground/50" />
            </div>

            <SocialAuth />
        </div>
    );
};

export default AuthForm;