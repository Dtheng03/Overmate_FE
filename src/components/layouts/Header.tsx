import { UserIcon } from "../icons/commons";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
import { useQuery } from "@tanstack/react-query";
import axiosClient from "@/config";

const menuItem: string = "px-[12px] py-[4px] text-sm";
const isSelected: string = "border-[1px] border-color4 rounded-[20px]";

function Header() {
    const navigate = useNavigate();
    const pathname = useLocation().pathname;
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username") || "";

    const { data } = useQuery({
        queryKey: ['category'],
        queryFn: () => axiosClient.get("/servicecategory"),
    });

    return (
        <header className="fixed z-[9999] px-[5%] w-full h-[58px] flex items-center justify-between bg-color1 text-white shadow-md shadow-color1">
            <Link to={"/"} className="text-color2 font-bold flex items-center gap-x-[4px]">
                <img className="h-[40px] w-[52px]" src="/About1.png" alt="Logo" />
                OVERMATE
            </Link>
            <div className="flex gap-x-[16px]">
                <Link to={"/about-us"} className={`${menuItem} ${pathname.includes("/about-us") && isSelected}`}>Về chúng tôi</Link>
                <Link to={"/about-test"} className={`${menuItem} ${pathname.includes("/about-test") && isSelected}`}>Bài kiểm tra</Link>
                <Popover>
                    <PopoverTrigger>
                        <span className={`${menuItem} ${pathname.includes("/service") && isSelected}`}>Dịch vụ</span>
                    </PopoverTrigger>
                    <PopoverContent className="z-[9999] w-[160px] p-0">
                        {data?.data?.map((item: any, index: number) => (
                            <Button
                                key={index}
                                className="w-full justify-start"
                                variant="ghost"
                                onClick={() => {
                                    navigate(`/service/${item.serviceCateId}`)
                                }}
                            >
                                {item.categoryName}
                            </Button>
                        ))}
                    </PopoverContent>
                </Popover>
                {!token && <Link to={"/be-partner"} className={`${menuItem} ${pathname.includes("/be-partner") && isSelected}`}>Hợp tác</Link>}
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

export default Header;