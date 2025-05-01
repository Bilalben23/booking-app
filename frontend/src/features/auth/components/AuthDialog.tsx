import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { closeDialog } from "../state/authSlice";
import AuthForm from "./AuthForm";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";

const AuthDialog = () => {
    const { isDialogOpen } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>();

    return (
        <Dialog open={isDialogOpen} onOpenChange={() => dispatch(closeDialog())} modal >
            <DialogContent className="p-0 rounded-2xl overflow-hidden">
                <DialogHeader>
                    <DialogTitle className="px-5 py-3.5 border-b" asChild>
                        <h1 className="font-bold text-xl text-center">Log in or sign up</h1>
                    </DialogTitle>
                    <DialogDescription asChild >
                        <div className="px-5 py-3 max-h-[80vh] overflow-y-auto">
                            <p className="text-black font-bold text-2xl mb-3">Welcome to Airbnb</p>
                            <AuthForm />
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}

export default AuthDialog;


