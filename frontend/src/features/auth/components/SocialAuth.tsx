import facebookIcon from "@/assets/facebook-icon.svg";
import appleIcon from "@/assets/apple-icon.svg";
import googleIcon from "@/assets/google-icon.svg";
import { Button } from "@/components/ui/button";

const SocialAuth = () => {
    return (
        <div className="flex flex-col gap-y-3">
            <Button
                size="full"
                variant="outline"
                className="rounded-md grid grid-cols-3"
            >
                <img src={googleIcon} alt="google" className="w-5" />
                <span>Continue with Google</span>
            </Button>
            <Button
                size="full"
                variant="outline"
                className="rounded-md grid grid-cols-3"
            >
                <img src={appleIcon} alt="apple" className="w-5" />
                <span>Continue with Apple</span>
            </Button>
            <Button
                size="full"
                variant="outline"
                className="rounded-md grid grid-cols-3"
            >
                <img src={facebookIcon} alt="facebook" className="w-5" />
                Continue with Facebook
            </Button>
        </div>
    );
}

export default SocialAuth;
