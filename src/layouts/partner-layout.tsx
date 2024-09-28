import { Outlet } from "react-router-dom";
import PartnerHeader from "@/components/layouts/PartnerHeader";

function PartnerLayout() {
    return (
        <main className="relative">
            <PartnerHeader />
            <div className="pt-[58px]">
                <Outlet />
            </div>
        </main>
    );
}

export default PartnerLayout;