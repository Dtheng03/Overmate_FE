import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StarIcon } from "../icons/commons";

const trigger: string = "text-white data-[state=active]:bg-transparent data-[state=active]:text-color4";
const h4: string = "mb-2 flex items-center gap-x-2 text-color2 font-bold text-lg";

function Benefits() {
    return (
        <section className="px-[10%] py-[5%]">
            <Tabs defaultValue="Đăng ký với sự yên tâm" className="">
                <TabsList className="w-full h-12 bg-color1 justify-evenly">
                    <TabsTrigger
                        className={trigger}
                        value="Đăng ký với sự yên tâm"
                    >
                        Đăng ký với sự yên tâm
                    </TabsTrigger>
                    <TabsTrigger
                        className={trigger}
                        value="Nổi bật ngay từ đầu"
                    >
                        Nổi bật ngay từ đầu
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="Đăng ký với sự yên tâm">
                    <div className="p-[5%] rounded-[12px] bg-color4/40">
                        <h2 className="mb-8 text-3xl text-color2 font-bold">Đăng ký với yên tâm</h2>
                        <div className="mb-4">
                            <h4 className={h4}><StarIcon fill="purple" height={20} width={20} />Quy định dịch vụ của riêng bạn</h4>
                            <p>Thông báo quy định dịch vụ của bạn cho các khách hàng tiềm năng, những người phải đồng ý với các quy định này để có thể đặt dịch vụ.</p>
                        </div>
                        <div className="mb-4">
                            <h4 className={h4}><StarIcon fill="purple" height={20} width={20} />Được thanh toán một cách an toàn</h4>
                            <p>Nhận các khoản thanh toán được đảm bảo và chống gian lận thông qua Thanh toán của <span className="text-color3">Overmate</span></p>
                        </div>
                        <div className="mb-4">
                            <h4 className={h4}><StarIcon fill="purple" height={20} width={20} />Người dùng đã được xác thực</h4>
                            <p>Xác minh địa chỉ email và thẻ tín dụng của khách dành cho đối tác trên thanh toán của <span className="text-color3">Overmate</span></p>
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="Nổi bật ngay từ đầu">
                    <div className="p-[5%] rounded-[12px] bg-color4/40">
                        <h2 className="mb-8 text-3xl text-color2 font-bold">Nổi bật ngay từ đầu</h2>
                        <div className="flex gap-x-8 justify-evenly">
                            <div className="basis-2/5 mb-4 flex flex-col items-center">
                                <img className="h-[144px] w-[144px]" src="benefit1.png" alt="benefit1" />
                                <h4 className={h4}>Nhập đánh giá của bạn</h4>
                                <p className="text-sm">Chúng tôi nhập điểm đánh giá của bạn từ các nền tảng khác và hiển thị trên trang <span className="text-color3">Overmate</span> cho bạn, do đó bạn sẽ không bắt đầu từ con số 0</p>
                            </div>
                            <div className="basis-2/5 mb-4 flex flex-col items-center">
                                <img className="h-[144px] w-[144px]" src="benefit2.png" alt="benefit2" />
                                <h4 className={h4}>Nhập chi tiết dịch vụ của bạn</h4>
                                <p className="text-sm">Nhập liền mạch chi tiết dịch vụ và đồng bộ hóa lịch trống của bạn với các nền tảng khác để dễ dàng liệt kê và tránh đặt dịch vụ bị trùng lặp</p>
                            </div>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </section>
    );
}

export default Benefits;