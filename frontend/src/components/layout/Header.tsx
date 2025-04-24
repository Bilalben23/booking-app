import fullLogo from "@/assets/logo-full.svg";
import { Search, User } from "lucide-react";
import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "../ui/dropdown-menu";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { openDialog, setAuthMode } from "@/features/auth/state/authSlice";


const Header = () => {

    const dispatch = useDispatch<AppDispatch>();

    return (
        <header className="flex items-center justify-between py-2.5 px-12 shadow-sm">
            <div>
                <Link to="/">
                    <img
                        src={fullLogo}
                        alt="Airbnb Logo"
                        className="w-24"
                    />
                </Link>
            </div>

            <div className="flex items-center shadow-md rounded-full space-x-4 px-3 py-1.5 border">
                <div>
                    <p className="font-semibold">Anywhere</p>
                </div>
                <Separator orientation="vertical" className="!h-7" />
                <div>
                    <p className="font-semibold">Any week</p>
                </div>
                <Separator orientation="vertical" className="!h-7" />
                <div>
                    <p >Add guests</p>
                </div>
                <Button variant="destructive" size="icon">
                    <Search className="size-4" strokeWidth={3} />
                </Button>
            </div>


            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="py-5 b border-gray-300">
                        <Menu className="size-5" />
                        <div className="relative">
                            <Avatar>
                                <AvatarImage src="https://www.flaticon.com/free-icons/user" alt="avatar" />
                                <AvatarFallback>
                                    <User strokeWidth={2.3} />
                                </AvatarFallback>
                            </Avatar>
                            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-destructive ring ring-white" />
                        </div>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48" align="end" >
                    <DropdownMenuGroup>
                        <DropdownMenuItem asChild>
                            <button
                                className="font-semibold w-full"
                                onClick={() => {
                                    dispatch(setAuthMode("register"));
                                    dispatch(openDialog());
                                }}>Sign up</button>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <button className="w-full" onClick={() => dispatch(openDialog())}>Log in</button>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator />

                    <DropdownMenuGroup>
                        <DropdownMenuItem asChild>
                            <a href="/signup">Gift Card</a>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <a href="/signin">Airbnb your home</a>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <a href="/signin">Host an experience</a>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <a href="/signin">Help center</a>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </header>

    );
}

export default Header;

