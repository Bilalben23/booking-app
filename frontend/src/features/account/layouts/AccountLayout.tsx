import { Outlet } from "react-router-dom";
import AccountHeader from "../components/AccountHeader";

export default function AccountLayout() {
    return (
        <>
            <AccountHeader />
            <section className="my-5 shadow-md border rounded-sm p-2 md:p-5">
                <Outlet />
            </section>
        </>
    )
}
