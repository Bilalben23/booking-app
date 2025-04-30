import Header from "@/components/layout/Header";
import AuthDialog from "@/features/auth/components/AuthDialog";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <>
            <Header />
            <main className="px-4 sm:px-6 md:px-12">
                <Outlet />
            </main>

            <AuthDialog />
        </>
    );
}

export default MainLayout;
