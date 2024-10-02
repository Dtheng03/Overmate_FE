import axiosClient from "@/config";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";

const section = "px-4 md:px-[8%] py-[5%] min-h-[calc(100vh-58px)] bg-color1 bg-[url('./assets/imgs/background.png')] bg-cover bg-center";
const h1 = "mb-10 text-center text-white text-2xl md:text-3xl font-extrabold";
const border = "my-4 p-0.5 rounded-[20px] bg-gradient-to-r from-[#011949] to-[#55A6CE] max-w-[1000px] mx-auto";
const card = "flex flex-col md:flex-row gap-y-6 md:gap-x-12 items-center bg-color1 p-6 rounded-[20px] max-w-[1000px] mx-auto"; // Limit card width
const img = "h-[150px] w-[150px] md:h-[200px] md:w-[200px] object-cover bg-color4 rounded-[20px] shadow-md";
const buttonContainer = "flex justify-center md:justify-end w-full mt-4";
const button = "bg-color2 hover:bg-color3 py-2 px-6 rounded-lg text-white font-semibold";

function ServicePage() {
    const params = useParams();

    const { data, refetch, isFetching, status } = useQuery({
        queryKey: ['user-view-service'],
        queryFn: () => axiosClient.get(`/service/service_category?ServiceCateId=${params.categoryId}`),
        retry: 0
    });

    useEffect(() => {
        refetch()
    }, [params.categoryId])

    return (
        <section className={section}>
            <h1 className={h1}>Danh sách dịch vụ</h1>
            {isFetching ? (
                <div className={border}>
                    <div className="bg-color1 p-[2%] rounded-[20px]">
                        <h1 className="text-center text-color4 text-xl font-bold">
                            Đang tải dữ liệu ...
                        </h1>
                    </div>
                </div>
            ) : (
                <>
                    {status === "success" ? (
                        data?.data?.value?.items?.map((item: any, index: number) => (
                            <div key={index} className={border}>
                                <div className={card}>
                                    <img className={img} src={item?.photos?.imageUrl} alt={item.name} />
                                    <div className="flex-1">
                                        <h2 className="text-xl md:text-2xl font-semibold text-color4 mb-2">
                                            {item?.name} - <span className="text-xl">{item?.serviceCategoryName}</span>
                                        </h2>
                                        <p className="text-white font-bold mb-4">Đơn vị thực hiện: <span className="font-normal">{item?.serviceOwnerName}</span></p>
                                        <p className="font-bold text-white mb-4">Thời lượng:
                                            <span className="ml-2 font-normal text-color2">{item?.duration} giờ</span>
                                        </p>
                                        <p className="font-bold text-white mt-2 md:mt-0">Giá:
                                            <span className="ml-2 font-normal text-color2">{item?.price?.toLocaleString()} VND</span>
                                        </p>
                                        <div className={buttonContainer}>
                                            <Button asChild className={button}>
                                                <Link to={`/service/details/${item.id}`}>Xem thêm</Link>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className={border}>
                            <div className="bg-color1 p-[2%] rounded-[20px]">
                                <h1 className="text-center text-color4 text-xl font-bold">
                                    Hiện chưa có dịch vụ khả dụng.
                                </h1>
                            </div>
                        </div>
                    )}
                </>
            )}
        </section>
    );
}

export default ServicePage;
