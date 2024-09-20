import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const menuItem: string = "px-[12px] py-[4px] text-sm";
const isSelected: string = "border-[1px] border-color4 rounded-[20px]";

function Header() {
    const pathname = useLocation().pathname;

    return (
        <header className="px-[5%] h-[58px] flex items-center justify-between bg-color1 text-white">
            <Link to={"/"} className="text-color2 font-bold flex items-center gap-x-2">
                <img className="h-[40px] w-[52px]" src="/About1.png" alt="Logo" />
                OVERMATE
            </Link>
            <div className="flex gap-x-[16px]">
                <Link to={"/about-us"} className={`${menuItem} ${pathname == "/about-us" && isSelected}`}>Về chúng tôi</Link>
                <Link to={"/about-test"} className={`${menuItem} ${pathname == "/about-test" && isSelected}`}>Bài kiểm tra</Link>
                <Link to={"/"} className={`${menuItem}`}>Dịch vụ</Link>
                <Link to={"/about-partners"} className={`${menuItem} ${pathname == "/about-partners" && isSelected}`}>Đối tác</Link>
                <Link to={"/"} className={`${menuItem}`}>Hỗ trợ</Link>
                <Link to={"/be-partner"} className={`${menuItem} ${pathname == "/be-partner" && isSelected}`}>Hợp tác</Link>
            </div>
            <div className="flex gap-x-[8px]">
                <Button asChild variant="link" className="text-white">
                    <Link to="/sign-in">Đăng nhập</Link>
                </Button>
                <Button asChild variant="outline">
                    <Link to="/sign-up" className="text-color1">Đăng ký</Link>
                </Button>
            </div>
        </header>
    )
}

export default Header;