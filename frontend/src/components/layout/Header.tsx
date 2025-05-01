import fullLogo from "@/assets/logo-full.svg";
import { LogOut, Search, User, Menu } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "../ui/dropdown-menu";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { openDialog, setAuthMode } from "@/features/auth/state/authSlice";
import { ROUTES } from "@/constants/routes";
import useLogout from "@/features/account/hooks/useLogout";

const Header = () => {
    const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>();
    const { mutate: signOut, isPending } = useLogout();

    const handleLogout = () => {
        signOut();
    }

    return (
        <header className="flex items-center justify-between py-2.5 px-4 md:px-12 shadow-sm">
            <div>
                <Link to="/">
                    <img
                        src={fullLogo}
                        alt="Airbnb Logo"
                        className="w-20 md:w-24"
                        loading="lazy"
                    />
                </Link>
            </div>

            {/* Search bar (hidden on small screens) */}
            <div className="hidden md:flex items-center shadow-md rounded-full space-x-4 px-3 py-1.5 border">
                <div>
                    <p className="font-semibold">Anywhere</p>
                </div>
                <Separator orientation="vertical" className="!h-7" />
                <div>
                    <p className="font-semibold">Any week</p>
                </div>
                <Separator orientation="vertical" className="!h-7" />
                <div>
                    <p>Add guests</p>
                </div>
                <Button variant="destructive" size="icon">
                    <Search className="size-4" strokeWidth={3} />
                </Button>
            </div>

            {/* Mobile: just show the search button */}
            <div className="md:hidden">
                <Button variant="destructive" size="icon">
                    <Search className="size-4" strokeWidth={3} />
                </Button>
            </div>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="py-2 px-2 border-gray-300 flex items-center gap-2">
                        <Menu className="size-5" />
                        <div className="relative">
                            <Avatar className="w-8 h-8">
                                <AvatarImage src={user?.image} alt="avatar" />
                                <AvatarFallback>
                                    <User strokeWidth={2.3} />
                                </AvatarFallback>
                            </Avatar>
                            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-destructive ring ring-white" />
                        </div>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48" align="end">
                    {!isAuthenticated ? (
                        <DropdownMenuGroup>
                            <DropdownMenuItem asChild>
                                <button
                                    className="font-semibold w-full"
                                    onClick={() => {
                                        dispatch(setAuthMode("register"));
                                        dispatch(openDialog());
                                    }}>
                                    Sign up
                                </button>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <button className="w-full" onClick={() => dispatch(openDialog())}>
                                    Log in
                                </button>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    ) : (
                        <DropdownMenuGroup>
                            <DropdownMenuItem asChild>
                                <Link to={ROUTES.ACCOUNT.ROOT} className="flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    My Account
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <button onClick={handleLogout} className="flex items-center gap-2 w-full text-left" disabled={isPending}>
                                    <LogOut className="w-4 h-4" />
                                    Logout
                                </button>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
    );
};

export default Header;
