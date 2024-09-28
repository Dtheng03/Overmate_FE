import { CheckIcon } from "@/components/icons/commons";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const div: string = "mb-4 flex items-center gap-x-4"
const text: string = "text-xs";

export default function Welcome() {

    return (
        <section className="h-[calc(100vh-58px)] px-[10%] py-[5%] flex justify-center items-center gap-x-12">
            <div className="p-[4%] rounded-[20px] bg-color1 text-white shadow-lg">
                <h3 className="mb-8 font-bold">Đăng ký dịch vụ ngay</h3>
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
            <div className="">
                <h1 className="mb-12 text-color1 text-4xl font-bold">
                    Cùng <span className="text-color4">Overmate</span> để <br />phát triển kinh doanh!
                </h1>
                <p className="text-xl">
                    Trở thành đối tác của chúng tôi để tiếp cận
                    <br />nhiều khách hàng hơn, tăng doanh thu và
                    <br />quản lý dịch vụ một cách dễ dàng
                </p>
            </div>
        </section>
    )
}
