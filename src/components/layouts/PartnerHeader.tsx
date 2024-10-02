import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MenuIcon, UserIcon } from "../icons/commons";
import { HoverCard, HoverCardContent, HoverCardTrigger, } from "@/components/ui/hover-card"

const menuItem: string = "px-[12px] py-[4px] text-sm";
const menuItemMobile: string = "p-[12px] pl-[40px] text-sm my-[4px] text-lg font-bold";
const isSelected: string = "border-[1px] border-color4 rounded-[20px]";

function PartnerHeader() {
    const navigate = useNavigate();
    const pathname = useLocation().pathname;
    const username = localStorage.getItem("username") || "";
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="fixed z-[999] px-[5%] w-full h-[58px] flex items-center justify-between bg-color1 text-white shadow-md shadow-color1">
            <Link to={"/partner"} className="text-color2 font-bold flex items-center gap-x-[4px]">
                <img className="h-[40px] w-[52px]" src="/About1.png" alt="Logo" />
                OVERMATE
            </Link>

            {/* menu mobile */}
            <div className="flex lg:hidden">
                <button
                    type="button"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                >
                    <span className="sr-only">Open main menu</span>
                    <MenuIcon aria-hidden="true" fill="white" height={20} width={20} />
                </button>
            </div>

            <div className="hidden lg:flex gap-x-[16px]">
                <Link to={"/partner/my-services"} className={`${menuItem} ${pathname.includes("/my-services") && isSelected}`}>Dịch vụ của tôi</Link>
            </div>
            <div className="hidden lg:block">
                <HoverCard openDelay={0}>
                    <HoverCardTrigger>
                        <div className={`p-2 flex gap-x-[8px] items-center cursor-pointer ${isSelected}`}>
                            <p className="text-sm">Xin chào, {username}</p>
                            <UserIcon fill="white" height={16} width={16} />
                        </div>
                    </HoverCardTrigger>
                    <HoverCardContent className="z-[9999] w-[160px] p-0">
                        <Button className="w-full justify-start" variant="ghost" onClick={() => {
                            localStorage.clear()
                            navigate("/sign-in")
                        }}>Đăng xuất</Button>
                    </HoverCardContent>
                </HoverCard>
            </div>
            <div className={`lg:hidden ${mobileMenuOpen ? "flex" : "hidden"} absolute top-[58px] right-0 w-[300px] flex-col shadow-lg bg-white text-color1`}>
                <p className={`${menuItemMobile} text-sm`}>Xin chào, {username}</p>
                <Link to={"/partner/my-services"} className={`${menuItemMobile}`} onClick={() => { setMobileMenuOpen(!mobileMenuOpen) }}>Dịch vụ của tôi</Link>
                <Link to="/sign-in" className={`${menuItemMobile}`} onClick={() => { setMobileMenuOpen(!mobileMenuOpen); localStorage.clear(); }} >Đăng xuất</Link>
            </div>
        </header>
    )
}

export default PartnerHeader;