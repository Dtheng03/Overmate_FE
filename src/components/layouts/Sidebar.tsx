import { Link, useLocation } from "react-router-dom";
import { History, Services, SignOut, Stats, Users } from "../icons/dashboard";

const menuItem: string = "mt-4 pl-8 py-2 flex items-center gap-x-4 text-xl font-semibold text-white hover:bg-color2 hover:rounded-r-[20px]";
const isSelected: string = "bg-color2 rounded-r-[20px]";

function Sidebar() {
    const pathname = useLocation().pathname;

    return (
        <div className="w-[240px] min-h-screen bg-color1 flex flex-col gap-4">
            <div>
                <div className="mt-[-20px]">
                    <img className="w-[200px]" src="/logoFull.png" alt="Logo" />
                </div>
                <Link to={"/admin/dashboard"} className={`${menuItem} ${pathname.includes("/dashboard") && isSelected} mt-[-20px]`}>
                    <Stats fill="white" height={20} width={20} />
                    Thống kê
                </Link>
                <Link to={"/admin/users"} className={`${menuItem} ${pathname.includes("/users") && isSelected}`}>
                    <Users fill="white" height={20} width={20} />
                    Thành viên
                </Link >
                <Link to={"/admin/services"} className={`${menuItem} ${pathname.includes("/services") && isSelected}`}>
                    <Services fill="white" height={20} width={20} />
                    Dịch vụ
                </Link>
                <Link to={"/admin/orders"} className={`${menuItem} ${pathname.includes("/orders") && isSelected}`}>
                    <History fill="white" height={20} width={20} />
                    Lịch sử
                </Link>
            </div>
            <Link to={"/sign-in"} className={`${menuItem} mb-4`} onClick={() => { localStorage.clear() }}>
                <SignOut fill="white" height={20} width={20} />
                Đăng xuất
            </Link>
        </div >
    );
}

export default Sidebar;