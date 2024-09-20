import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { CheckIcon } from "../icons/commons";

const div: string = "mb-4 flex items-center gap-x-4"
const text: string = "text-xs";

function CallToAction() {
    return (
        <div className="p-[4%] rounded-[20px] bg-color1 text-white shadow-lg">
            <h3 className="mb-8 font-bold">Đăng ký ngay</h3>
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
                    <Link to={"sign-up"}>Bắt đầu ngay bây giờ</Link>
                </Button>
            </div>
        </div>
    );
}

export default CallToAction;