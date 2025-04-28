import { Outlet } from "react-router-dom";
import AccountHeader from "../components/AccountHeader";

export default function AccountLayout() {
    return (
        <>
            <AccountHeader />
            <section className="mt-5 border p-5">
                <Outlet />
            </section>
        </>
    )
}
