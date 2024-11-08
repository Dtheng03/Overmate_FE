import { CheckIcon } from "@/components/icons/commons";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const div: string = "mb-4 flex items-center gap-x-4";
const text: string = "text-xs";

export default function Welcome() {
    return (
        <section className="h-[calc(100vh-58px)] px-[5%] py-[5%] flex flex-col lg:flex-row justify-center items-center gap-y-12 lg:gap-x-12 bg-[url('./assets/imgs/background.png')] bg-cover bg-color1">
            <div className="my-4 lg:m-0 basis-[35%] p-0.5 rounded-[20px] bg-gradient-to-r from-[#011949] to-[#55A6CE]">
                <div className="p-[6%] rounded-[20px] bg-color1 text-white shadow-lg w-full lg:max-w-full">
                    <h3 className="mb-8 font-bold text-lg lg:text-xl">Đăng ký dịch vụ ngay</h3>
                    <div className={div}>
                        <CheckIcon fill="green" height={24} width={24} />
                        <p className={text}>
                            Tăng độ hiện diện và phạm vi tiếp cận
                        </p>
                    </div>
                    <div className={div}>
                        <CheckIcon fill="green" height={24} width={24} />
                        <p className={text}>
                            Giảm chi phí marketing
                        </p>
                    </div>
                    <div className={div}>
                        <CheckIcon fill="green" height={24} width={24} />
                        <p className={text}>
                            Không lo về chuyện thanh toán vì đã có Overmate lo
                        </p>
                    </div>
                    <div className="mt-12 flex items-center justify-center">
                        <Button asChild className="animate-bounce h-12 bg-color2 font-bold hover:bg-color3">
                            <Link to={"/partner/sign-up-service"}>Đăng ký dịch vụ</Link>
                        </Button>
                    </div>
                </div>
            </div>
            <div className="text-center lg:text-left">
                <h1 className="mb-6 lg:mb-12 text-white text-3xl lg:text-4xl font-bold">
                    Cùng <span className="text-color2">Overmate</span> để <br className="hidden lg:block" /> phát triển kinh doanh!
                </h1>
                <p className="text-lg lg:text-xl text-white">
                    Trở thành đối tác của chúng tôi để tiếp cận
                    <br className="hidden lg:block" /> nhiều khách hàng hơn, tăng doanh thu và
                    <br className="hidden lg:block" /> quản lý dịch vụ một cách dễ dàng.
                </p>
            </div>
        </section>
    );
}
