import { useState } from "react";
import axiosClient from "@/config";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { MenuIcon, UserIcon } from "../icons/commons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HoverCard, HoverCardContent, HoverCardTrigger, } from "@/components/ui/hover-card"

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
        retry: 0
    });

    return (
        <header className="fixed z-[999] px-[5%] w-full h-[58px] flex items-center justify-between bg-color1 text-white">
            <Link to={"/"} className="" onClick={() => { setMobileMenuOpen(false) }}>
                <img className="w-[200px]" src="/logoFull.png" alt="Logo" />
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
                <Link to={"/about-us"} className={`${menuItem} ${pathname.includes("/about-us") && isSelected}`}>Về chúng tôi</Link>
                <Link to={"/about-explore"} className={`${menuItem} ${pathname.includes("/about-explore") && isSelected}`}>Khám phá</Link>
                <HoverCard openDelay={0}>
                    <HoverCardTrigger className="flex">
                        <span className={`${menuItem} cursor-pointer ${pathname.includes("/service") && isSelected}`}>Dịch vụ</span>
                    </HoverCardTrigger>
                    {(data?.data?.value?.items?.length > 0) ?
                        <HoverCardContent className="z-[9999] w-[160px] text-white p-0.5 bg-gradient-to-b from-[#1c1e4e] to-[#55A6CE] border-0 rounded-none">
                            <div className="bg-color1 p-[4%]">
                                {data?.data?.value?.items?.map((item: any, index: number) => (
                                    <Button
                                        key={index}
                                        className="w-full justify-start rounded-none hover:bg-color4"
                                        variant="ghost"
                                        onClick={() => {
                                            navigate(`/service/${item.serviceCateId}`, { state: { categoryName: item?.categoryName } })
                                        }}
                                    >
                                        {item.categoryName}
                                    </Button>
                                ))}
                            </div>
                        </HoverCardContent>
                        :
                        <HoverCardContent className="z-[9999] w-[200px] text-white p-0.5 bg-gradient-to-b from-[#1c1e4e] to-[#55A6CE] border-0 rounded-none">
                            <div className="bg-color1 p-[4%]">
                                <p className="text-white text-center">Hiện chưa có dịch vụ</p>
                            </div>
                        </HoverCardContent>
                    }
                </HoverCard>
                {!token && <Link to={"/be-partner"} className={`${menuItem} ${pathname.includes("/be-partner") && isSelected}`}>Hợp tác</Link>}
            </div >
            {
                token ?
                    <div className="hidden lg:block">
                        < HoverCard openDelay={0} >
                            <HoverCardTrigger>
                                <div className={`px-2 py-[4px] flex gap-x-[8px] items-center cursor-pointer ${isSelected}`}>
                                    <p className="text-sm select-none">Xin chào, {username}</p>
                                    <UserIcon fill="white" height={16} width={16} />
                                </div>
                            </HoverCardTrigger>
                            <HoverCardContent className="z-[9999] w-[160px] p-0">
                                <Button className="w-full justify-start" variant="ghost" onClick={() => {
                                    navigate("/profile")
                                }}>Hồ sơ</Button>
                                <Button className="w-full justify-start" variant="ghost" onClick={() => {
                                    navigate("/orders")
                                }}>Lịch sử</Button>
                                <Button className="w-full justify-start" variant="ghost" onClick={() => {
                                    localStorage.clear()
                                    navigate("/sign-in")
                                }}>Đăng xuất</Button>
                            </HoverCardContent>
                        </HoverCard >
                    </div >
                    :
                    <div className="hidden lg:flex items-center gap-x-[8px]">
                        <Button asChild variant="link" className="text-white">
                            <Link to="/sign-in">Đăng nhập</Link>
                        </Button>
                        <Button asChild variant="outline" className="rounded-[20px] bg-transparent text-white border-color4 hover:bg-color4 h-[30px]">
                            <Link to="/sign-up" className="text-color1">Đăng ký</Link>
                        </Button>
                    </div>
            }
            <div className={`lg:hidden ${mobileMenuOpen ? "flex" : "hidden"} absolute top-[58px] right-0 w-[300px] flex-col shadow-lg bg-white text-color1`}>
                {token && <p className={`${menuItemMobile} text-sm`}>Xin chào, {username}</p>}
                <Link to={"/about-us"} className={`${menuItemMobile}`} onClick={() => { setMobileMenuOpen(!mobileMenuOpen) }}>Về chúng tôi</Link>
                <Link to={"/about-explore"} className={`${menuItemMobile}`} onClick={() => { setMobileMenuOpen(!mobileMenuOpen) }}>Khám phá</Link>
                <span className={`${menuItemMobile} cursor-pointer`} onClick={() => { setServiceOpen(!serviceOpen) }}>Dịch vụ</span>
                <div className={`${serviceOpen ? "block" : "hidden"}`}>
                    {data?.data?.value?.items?.map((item: any, index: number) => (
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
                {!token ?
                    <Link to="/sign-in" className={`${menuItemMobile}`} onClick={() => { setMobileMenuOpen(!mobileMenuOpen) }}>Đăng nhập</Link>
                    :
                    <Link to="/profile" className={`${menuItemMobile}`} onClick={() => { setMobileMenuOpen(!mobileMenuOpen) }}>Hồ sơ</Link>
                }
                {token && <Link to={"/orders"} className={`${menuItemMobile}`} onClick={() => { setMobileMenuOpen(!mobileMenuOpen) }}>Lịch sử</Link>}
                {!token ?
                    <Link to="/sign-up" className={`${menuItemMobile}`} onClick={() => { setMobileMenuOpen(!mobileMenuOpen) }} >Đăng ký</Link>
                    :
                    <Link to="/sign-in" className={`${menuItemMobile}`} onClick={() => { setMobileMenuOpen(!mobileMenuOpen); localStorage.clear(); }} >Đăng xuất</Link>
                }
            </div>
        </header >
    )
}

export default Header;