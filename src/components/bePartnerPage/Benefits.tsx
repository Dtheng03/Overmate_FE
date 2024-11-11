import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StarIcon } from "../icons/commons";

const trigger: string = "flex-1 rounded-[20px] text-base text-white data-[state=active]:bg-color2 data-[state=active]:text-color1";
const h4: string = "mb-2 flex items-center gap-x-2 text-color1 font-bold text-lg";

function Benefits() {
    return (
        <section className="px-[5%] py-[5%]">
            <Tabs defaultValue="Đăng ký với sự yên tâm" className="">
                {/* Tab buttons */}
                <div className="p-0.5 rounded-[20px] bg-gradient-to-r from-[#011949] to-[#55A6CE]">
                    <TabsList className="w-full h-12 rounded-[20px] bg-color1 justify-evenly">
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
                </div>
                {/* Content for "Đăng ký với sự yên tâm" */}
                <TabsContent value="Đăng ký với sự yên tâm">
                    <div className="p-[5%] rounded-[12px] bg-color2">
                        <h2 className="mb-8 text-2xl md:text-3xl text-color1 font-bold">Đăng ký với yên tâm</h2>
                        <div className="mb-4">
                            <h4 className={h4}>
                                <StarIcon fill="black" height={20} width={20} />
                                Quy định dịch vụ của riêng bạn
                            </h4>
                            <p>Thông báo quy định dịch vụ của bạn cho các khách hàng tiềm năng, những người phải đồng ý với các quy định này để có thể đặt dịch vụ.</p>
                        </div>
                        <div className="mb-4">
                            <h4 className={h4}>
                                <StarIcon fill="black" height={20} width={20} />
                                Được thanh toán một cách an toàn
                            </h4>
                            <p>Nhận các khoản thanh toán được đảm bảo và chống gian lận thông qua Thanh toán của <span className="text-color2">Overmate</span></p>
                        </div>
                        <div className="mb-4">
                            <h4 className={h4}>
                                <StarIcon fill="black" height={20} width={20} />
                                Người dùng đã được xác thực
                            </h4>
                            <p>Xác minh địa chỉ email và thẻ tín dụng của khách dành cho đối tác trên thanh toán của <span className="text-color2">Overmate</span></p>
                        </div>
                    </div>
                </TabsContent>

                {/* Content for "Nổi bật ngay từ đầu" */}
                <TabsContent value="Nổi bật ngay từ đầu">
                    <div className="p-[5%] rounded-[12px] bg-color2">
                        <h2 className="mb-8 text-2xl md:text-3xl text-color1 font-bold">Nổi bật ngay từ đầu</h2>
                        <div className="flex flex-col md:flex-row gap-y-8 md:gap-x-8 justify-center">
                            <div className="basis-full md:basis-2/5 mb-4 flex flex-col items-center">
                                <img className="h-[120px] w-[120px] md:h-[144px] md:w-[144px]" src="benefit1.png" alt="benefit1" />
                                <h4 className={`${h4} text-center`}>Nhập đánh giá của bạn</h4>
                                <p className="text-sm text-center">
                                    Chúng tôi nhập điểm đánh giá của bạn từ các nền tảng khác và hiển thị trên trang <span className="text-color4">Overmate</span> cho bạn, do đó bạn sẽ không bắt đầu từ con số 0.
                                </p>
                            </div>
                            <div className="basis-full md:basis-2/5 mb-4 flex flex-col items-center">
                                <img className="h-[120px] w-[120px] md:h-[144px] md:w-[144px]" src="benefit2.png" alt="benefit2" />
                                <h4 className={`${h4} text-center`}>Nhập chi tiết dịch vụ của bạn</h4>
                                <p className="text-sm text-center">
                                    Nhập liền mạch chi tiết dịch vụ và đồng bộ hóa lịch trống của bạn với các nền tảng khác để dễ dàng liệt kê và tránh đặt dịch vụ bị trùng lặp.
                                </p>
                            </div>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </section>
    );
}

export default Benefits;
