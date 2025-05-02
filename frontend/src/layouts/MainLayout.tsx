import Header from "@/components/layout/Header";
import AuthDialog from "@/features/auth/components/AuthDialog";
import { Outlet } from "react-router-dom";
import Footer from "../components/layout/Footer";

const MainLayout = () => {
    return (
        <>
            <Header />
            <main className="px-4 sm:px-6 md:px-12">
                <Outlet />
            </main>
            <Footer />

            <AuthDialog />
        </>
    );
}

export default MainLayout;
