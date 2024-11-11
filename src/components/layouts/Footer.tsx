import { Link } from "react-router-dom";
import { FacebookIcon, InstaIcon } from "../icons/brands";

const title: string = "mb-[12px] font-semibold";
const subtitle: string = "mb-[8px] text-xs text-slate-300 text-justify";

function Footer() {
    return (
        <footer className="px-[5%] py-[5%] h-fit bg-color1 text-white shadow-2xl shadow-color2">
            <div className="flex flex-wrap justify-between gap-8">
                <div className="w-full sm:w-full md:w-1/4 lg:w-fit md:max-w-[220px]">
                    <Link to={"/"} className="">
                        <img className="w-[200px] mt-[-40px] ml-[-20px]" src="/logoFull.png" alt="Logo" />
                    </Link>
                    <p className={`${subtitle} mt-[-20px]`}>
                        Nơi kết nối những bạn trẻ đồng điệu, phù hợp dựa trên tính cách, áp dụng các phương pháp thú vị như MBTI, cung hoàng đạo và thần số học. Bên cạnh đó chúng tôi còn cung cấp các dịch vụ tiện ích như hỗ trợ chuyển nhà, đóng gói đồ đạc, tìm kiếm nhà ở, bảo trì và dọn dẹp, nhằm mang lại trải nghiệm sống chung thuận tiện và thoải mái cho mọi người.
                    </p>
                </div>
                <div className="w-full sm:w-full md:w-1/4 lg:w-fit md:max-w-[220px]">
                    <h3 className={title}>Về chúng tôi</h3>
                    <p className={subtitle}><Link to={"/about-us"}>Giới thiệu</Link></p>
                    <p className={subtitle}><Link to={"/safety-security"}>An toàn - Bảo mật</Link></p>
                    <p className={subtitle}><Link to={"/terms-charter"}>Điều khoản - Điều lệ</Link></p>
                    <p className={subtitle}><Link to={"/privacy-policy"}>Chính sách quyền riêng tư</Link></p>
                </div>
                <div className="w-full sm:w-full md:w-1/4 lg:w-fit md:max-w-[220px]">
                    <h3 className={title}>Dịch vụ nổi bật</h3>
                    <p className={subtitle}>Dọn dẹp nhà</p>
                    <p className={subtitle}>Bảo trì thiết bị</p>
                </div>
                <div className="w-full sm:w-full md:w-1/4 lg:w-fit md:max-w-[220px]">
                    <h3 className={title}>Chăm sóc khách hàng</h3>
                    <p className={subtitle}>Địa chỉ: Thành phố Hồ Chí Minh</p>
                    <p className={subtitle}>Hotline: 0824655979</p>
                    <p className={subtitle}>Email: overmateteam@gmail.com</p>
                </div>
                <div className="w-full sm:w-full md:w-1/4 lg:w-fit md:max-w-[220px]">
                    <h3 className={title}>Kết nối với chúng tôi</h3>
                    <div className="flex gap-x-[12px] items-center lg:justify-center">
                        <a
                            href="https://www.facebook.com/profile.php?id=61565985286928"
                            target="_blank"
                            className="cursor-pointer bg-white rounded-[50%]"
                        >
                            <FacebookIcon fill="#0866ff" height={40} width={40} />
                        </a>
                        <a
                            href="https://www.instagram.com/overmateteam/"
                            target="_blank"
                            className="bg-gradient-to-t from-[#F58529] via-[#DD2A7B] to-[#515BD4] rounded-[50%] p-[2px]"
                        >
                            <InstaIcon fill="white" height={40} width={40} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
