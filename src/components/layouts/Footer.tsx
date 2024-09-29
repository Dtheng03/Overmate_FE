import { Link } from "react-router-dom";
import { FacebookIcon, InstaIcon, TiktokIcon } from "../icons/brands";

const title: string = "mb-[12px] font-semibold";
const subtitle: string = "mb-[8px] text-sm text-slate-300";

function Footer() {
    return (
        <footer className="px-[5%] py-[5%] h-fit bg-color1 text-white">
            <div className="mb-8">
                <Link to={"/"} className="text-color2 font-extrabold text-xl flex items-center gap-x-[4px]">
                    <img className="h-[40px] w-[52px]" src="/About1.png" alt="Logo" />
                    OVERMATE
                </Link>
            </div>
            <div className="flex justify-between flex-wrap">
                <div className="my-4 basis-1/5 min-w-[220px]">
                    <h3 className={title}>Về chúng tôi</h3>
                    <p className={subtitle}>Giới thiệu</p>
                    <p className={subtitle}>An toàn - Bảo mật</p>
                    <p className={subtitle}>Điều khoản - Điều lệ</p>
                    <p className={subtitle}>Chính sách quyền riêng tư</p>
                    <p className={subtitle}>Blog</p>
                    <p className={subtitle}>Liên hệ</p>
                    <p className={subtitle}>Hỏi đáp</p>
                </div>
                <div className="my-4 basis-1/5 min-w-[220px]">
                    <h3 className={title}>Dịch vụ nổi bật</h3>
                    <p className={subtitle}>Tìm bạn cùng nhà</p>
                    <p className={subtitle}>Tìm nhà</p>
                    <p className={subtitle}>Chuyển nhà</p>
                    <p className={subtitle}>Dọn nhà</p>
                </div>
                <div className="my-4 basis-1/5 min-w-[220px]">
                    <h3 className={title}>Chăm sóc khách hàng</h3>
                    <p className={subtitle}>Địa chỉ: Thành phố Hồ Chí Minh</p>
                    <p className={subtitle}>Hotline: 0987654321</p>
                    <p className={subtitle}>Email: overmate@gmail.com</p>
                </div>
                <div className="my-4 basis-1/5 min-w-[220px]">
                    <h3 className={title}>Kết nối với chúng tôi</h3>
                    <div className="flex gap-x-[12px]">
                        <FacebookIcon fill="white" height={40} width={40} />
                        <InstaIcon fill="white" height={40} width={40} />
                        <TiktokIcon fill="white" height={40} width={40} />
                    </div>
                </div>
            </div>
        </footer >
    );
}

export default Footer;