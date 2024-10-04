import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Outlet, useNavigate } from "react-router-dom";
import PartnerHeader from "@/components/layouts/PartnerHeader";

function PartnerLayout() {
    const navigate = useNavigate();
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsSmallScreen(window.innerWidth < 1024);
        };

        // Check the screen size on initial load
        checkScreenSize();

        // Add event listener to check screen size on resize
        window.addEventListener('resize', checkScreenSize);

        // Cleanup event listener on component unmount
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    return (
        <>
            {isSmallScreen ?
                (
                    <div className="h-[100vh] px-4 flex flex-col items-center justify-center bg-color5 text-white font-semibold">
                        <p className="text-xl text-center">Hiện tại giao diện này chỉ hỗ trợ màn hình của laptop trở lên.</p>
                        <p className="text-center"> Khuyến nghị: Hãy sử dụng thiết bị có màn hình lớn hơn để xem thông tin.</p>
                        <Button className="mt-4 bg-color1" onClick={() => { localStorage.clear(); navigate("/") }}>Thoát</Button>
                    </div>
                )
                : (
                    <main className="relative">
                        <PartnerHeader />
                        <div className="pt-[58px]">
                            <Outlet />
                        </div>
                    </main>
                )
            }
        </>
    );
}

export default PartnerLayout;