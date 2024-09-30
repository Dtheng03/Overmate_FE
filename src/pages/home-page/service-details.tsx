import { Button } from "@/components/ui/button";
import axiosClient from "@/config";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";

const section = "px-4 md:px-[8%] py-[5%] min-h-[calc(100vh-58px)] bg-color3 flex flex-col items-center";
const h1 = "mb-8 md:mb-12 text-center text-white text-2xl md:text-3xl font-extrabold";
const border = "my-4 w-full max-w-[800px] p-0.5 rounded-[20px] bg-gradient-to-r from-[#011949] to-[#55A6CE]";
const card = "flex flex-col md:flex-row gap-6 md:gap-12 items-center bg-color1 p-6 rounded-[20px]";
const img = "h-[150px] w-[150px] md:h-[200px] md:w-[200px] object-cover bg-color4 rounded-[20px]";
const name = "my-4 text-color4 text-lg md:text-xl font-bold text-center md:text-left";
const text = "text-white mb-4";
const boldText = "text-white font-bold";
const normalText = "ml-4 font-normal";
const button = "mt-4 w-full bg-color2 hover:bg-color3 py-3 rounded-lg text-white font-semibold text-lg";

function ServiceDetails() {
    const params = useParams();
    const { data } = useQuery({
        queryKey: ['user-service-details'],
        queryFn: () => axiosClient.get(`/service?ServiceId=${params.serviceId}`),
    });

    return (
        <section className={section}>
            <h1 className={h1}>Chi tiết dịch vụ</h1>
            <div className={border}>
                <div className="bg-color1 p-[4%] rounded-[20px]">
                    <div className={card}>
                        <img className={img} src={data?.data?.value?.photos?.[0]?.imageUrl} alt={data?.data?.value?.name} />
                        <div className="flex-1">
                            <h2 className={name}>{data?.data?.value?.name}</h2>
                            <p className={text}>{data?.data?.value?.description}</p>
                            <p className={boldText}>Thời lượng của dịch vụ:
                                <span className={normalText}>{data?.data?.value?.duration} giờ</span>
                            </p>
                            <p className={boldText}>Giá của dịch vụ:
                                <span className={normalText}>{data?.data?.value?.price?.toLocaleString()} VND</span>
                            </p>
                        </div>
                    </div>
                    <Button asChild className={button}>
                        <Link to="#">Đặt dịch vụ</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}

export default ServiceDetails;