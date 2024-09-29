import { MenuIcon, UserIcon } from "../icons/commons";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
import { useQuery } from "@tanstack/react-query";
import axiosClient from "@/config";
import { useState } from "react";

const menuItem: string = "px-[12px] py-[4px] text-sm";
const menuItemMobile: string = "p-[12px] pl-[40px] text-sm my-[4px] text-lg font-bold";
const isSelected: string = "border-[1px] border-color4 rounded-[20px]";

function Header() {
    const navigate = useNavigate();
    const pathname = useLocation().pathname;
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username") || "";
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [serviceOpen, setServiceOpen] = useState(false);

    const { data } = useQuery({
        queryKey: ['category'],
        queryFn: () => axiosClient.get("/servicecategory"),
    });

    return (
        <header className="fixed z-[9999] px-[5%] w-full h-[58px] flex items-center justify-between bg-color1 text-white shadow-md shadow-color1">
            <Link to={"/"} className="text-color2 font-bold flex items-center gap-x-[4px]" onClick={() => { setMobileMenuOpen(false) }}>
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
                <Link to={"/about-us"} className={`${menuItem} ${pathname.includes("/about-us") && "font-bold"}`}>Về chúng tôi</Link>
                <Link to={"/about-test"} className={`${menuItem} ${pathname.includes("/about-test") && isSelected}`}>Bài kiểm tra</Link>
                <Popover>
                    <PopoverTrigger>
                        <span className={`${menuItem} ${pathname.includes("/service") && isSelected}`}>Dịch vụ</span>
                    </PopoverTrigger>
                    {(data?.data?.length > 0) ?
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
                        :
                        <PopoverContent className="z-[9999] p-4">
                            <p className="text-red-800">Hiện chưa có dịch vụ khả dụng</p>
                        </PopoverContent>
                    }
                </Popover>
                {!token && <Link to={"/be-partner"} className={`${menuItem} ${pathname.includes("/be-partner") && isSelected}`}>Hợp tác</Link>}
            </div>
            {token ?
                <Popover>
                    <PopoverTrigger>
                        <div className={`hidden p-2 lg:flex gap-x-[8px] items-center ${isSelected}`}>
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
                <div className="hidden lg:flex gap-x-[8px]">
                    <Button asChild variant="link" className="text-white">
                        <Link to="/sign-in">Đăng nhập</Link>
                    </Button>
                    <Button asChild variant="outline">
                        <Link to="/sign-up" className="text-color1">Đăng ký</Link>
                    </Button>
                </div>}
            <div className={`lg:hidden ${mobileMenuOpen ? "flex" : "hidden"} absolute top-[58px] right-0 w-[300px] flex-col shadow-lg bg-white text-color1`}>
                <Link to={"/about-us"} className={`${menuItemMobile}`} onClick={() => { setMobileMenuOpen(!mobileMenuOpen) }}>Về chúng tôi</Link>
                <Link to={"/about-test"} className={`${menuItemMobile}`} onClick={() => { setMobileMenuOpen(!mobileMenuOpen) }}>Bài kiểm tra</Link>
                <span className={`${menuItemMobile} cursor-pointer`} onClick={() => { setServiceOpen(!serviceOpen) }}>Dịch vụ</span>
                <div className={`${serviceOpen ? "block" : "hidden"}`}>
                    {data?.data?.map((item: any, index: number) => (
                        <Button
                            key={index}
                            className="w-full justify-start pl-[60px]"
                            variant="ghost"
                            onClick={() => {
                                setMobileMenuOpen(false)
                                setServiceOpen(false)
                                navigate(`/service/${item.serviceCateId}`)
                            }}
                        >
                            {item.categoryName}
                        </Button>
                    ))}
                </div>
                {!token && <Link to={"/be-partner"} className={`${menuItemMobile}`} onClick={() => { setMobileMenuOpen(!mobileMenuOpen) }}>Hợp tác</Link>}
                <Link to="/sign-in" className={`${menuItemMobile}`} onClick={() => { setMobileMenuOpen(!mobileMenuOpen) }}>Đăng nhập</Link>
                <Link to="/sign-up" className={`${menuItemMobile}`} onClick={() => { setMobileMenuOpen(!mobileMenuOpen) }} >Đăng ký</Link>
            </div>
        </header>
    )
}

export default Header;