import { Link, useLocation } from "react-router-dom";
import { Services, Stats, Users } from "../icons/dashboard";

const menuItem: string = "mt-4 pl-8 py-2 flex items-center gap-x-4 text-xl font-semibold text-white";
const isSelected: string = "bg-color2 rounded-r-[20px]";

function Sidebar() {
    const pathname = useLocation().pathname;

    return (
        <div className="w-[240px] min-h-screen bg-color1">
            <div className="pl-4 py-4 text-color2 font-bold flex items-center gap-x-[4px]">
                <img className="h-[40px] w-[52px]" src="/About1.png" alt="Logo" />
                OVERMATE
            </div>
            <Link to={"/dashboard"} className={`${menuItem} ${pathname == "/dashboard" && isSelected}`}>
                <Stats fill="white" height={20} width={20} />
                Thống kê
            </Link>
            <Link to={"/dashboard/users"} className={`${menuItem} ${pathname == "/dashboard/users" && isSelected}`}>
                <Users fill="white" height={20} width={20} />
                Thành viên
            </Link >
            <Link to={"/dashboard/services"} className={`${menuItem} ${pathname == "/dashboard/services" && isSelected}`}>
                <Services fill="white" height={20} width={20} />
                Dịch vụ
            </Link>
        </div >
    );
}

export default Sidebar;