import Sidebar from "@/components/layouts/Sidebar";
import { Outlet } from "react-router-dom";

function DashboardLayout() {
    return (
        <main className="flex">
            <Sidebar />
            <div className="flex-1">
                <Outlet />
            </div>
        </main>
    );
}

export default DashboardLayout;