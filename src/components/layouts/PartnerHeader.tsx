import { UserIcon } from "../icons/commons";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"

const menuItem: string = "px-[12px] py-[4px] text-sm";
const isSelected: string = "border-[1px] border-color4 rounded-[20px]";

function PartnerHeader() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username") || "";

    return (
        <header className="fixed z-[9999] px-[5%] w-full h-[58px] flex items-center justify-between bg-color1 text-white shadow-md shadow-color1">
            <Link to={"/partner"} className="text-color2 font-bold flex items-center gap-x-[4px]">
                <img className="h-[40px] w-[52px]" src="/About1.png" alt="Logo" />
                OVERMATE
            </Link>
            <div className="flex gap-x-[16px]">
                <Link to={"#"} className={`${menuItem}`}>Dịch vụ của tôi</Link>
            </div>
            {token ?
                <Popover>
                    <PopoverTrigger>
                        <div className={`p-2 flex gap-x-[8px] items-center ${isSelected}`}>
                            <p className="text-sm">Xin chào, {username}</p>
                            <UserIcon fill="white" height={16} width={16} />
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className="z-[9999] w-[160px] p-0">
                        <Button className="w-full justify-start" variant="ghost" onClick={() => {
                            navigate("/profile")
                        }}>Hồ sơ</Button>
                        <Button className="w-full justify-start" variant="ghost" onClick={() => {
                            localStorage.clear()
                            navigate("/sign-in")
                        }}>Đăng xuất</Button>
                    </PopoverContent>
                </Popover>
                :
                <div className="flex gap-x-[8px]">
                    <Button asChild variant="link" className="text-white">
                        <Link to="/sign-in">Đăng nhập</Link>
                    </Button>
                    <Button asChild variant="outline">
                        <Link to="/sign-up" className="text-color1">Đăng ký</Link>
                    </Button>
                </div>}
        </header>
    )
}

export default PartnerHeader;