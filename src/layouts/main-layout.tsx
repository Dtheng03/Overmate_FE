import { Outlet } from "react-router-dom";
import Header from "../components/layouts/Header";
import Footer from "@/components/layouts/Footer";

function MainLayout() {
    return (
        <main className="relative">
            <Header />
            <div className="pt-[58px]">
                <Outlet />
            </div>
            <Footer />
        </main>
    );
}

export default MainLayout;