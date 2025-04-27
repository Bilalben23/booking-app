import facebookIcon from "@/assets/facebook-icon.svg";
import appleIcon from "@/assets/apple-icon.svg";
import googleIcon from "@/assets/google-icon.svg";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";

const SocialAuth = () => {

    const dispatch = useDispatch<AppDispatch>();


    const handleSocialLogin = (provider: "google" | "facebook" | "apple") => {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;

        if (provider === "google") {
            window.location.href = `${backendUrl}/api/v1/auth/google`;
        }

        if (provider === "facebook") {
            window.location.href = `${backendUrl}/api/v1/auth/facebook`;
        }

        if (provider === "apple") {
            window.location.href = `${backendUrl}/api/v1/auth/apple`;
        }
    }


    return (
        <div className="flex flex-col gap-y-3">
            <Button
                size="full"
                variant="outline"
                className="rounded-md grid grid-cols-3"
                onClick={() => handleSocialLogin("google")}
            >
                <img src={googleIcon} alt="google" className="w-5" />
                <span>Continue with Google</span>
            </Button>
            <Button
                size="full"
                variant="outline"
                className="rounded-md grid grid-cols-3"
                onClick={() => handleSocialLogin("apple")}
            >
                <img src={appleIcon} alt="apple" className="w-5" />
                <span>Continue with Apple</span>
            </Button>
            <Button
                size="full"
                variant="outline"
                className="rounded-md grid grid-cols-3"
                onClick={() => handleSocialLogin("facebook")}
            >
                <img src={facebookIcon} alt="facebook" className="w-5" />
                Continue with Facebook
            </Button>
        </div>
    );
}

export default SocialAuth;
