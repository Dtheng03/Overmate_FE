import axiosClient from "@/config";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";

const section = "px-4 md:px-[8%] py-[5%] min-h-[calc(100vh-58px)] bg-color3";
const h1 = "mb-10 text-center text-white text-2xl md:text-3xl font-extrabold";
const border = "my-4 p-0.5 rounded-[20px] bg-gradient-to-r from-[#011949] to-[#55A6CE]";
const card = "flex flex-col md:flex-row gap-y-6 md:gap-x-12 items-center bg-color1 p-6 rounded-[20px]";
const img = "h-[150px] w-[150px] md:h-[200px] md:w-[200px] object-cover bg-color4 rounded-[20px] shadow-md";
const name = "mb-4 text-color4 text-lg md:text-xl font-bold text-center md:text-left";
const description = "mb-4 text-white text-sm md:text-base leading-relaxed";
const buttonContainer = "flex justify-center md:justify-end w-full mt-4 md:mt-0";
const button = "bg-color2 hover:bg-color3 py-2 px-6 rounded-lg text-white font-semibold";

function ServicePage() {
    const params = useParams();
    const { data, refetch } = useQuery({
        queryKey: ['user-view-service'],
        queryFn: () => axiosClient.get(`/service/service_category?ServiceCateId=${params.categoryId}`),
    });

    useEffect(() => {
        refetch()
    }, [params.categoryId])

    return (
        <section className={section}>
            <h1 className={h1}>Danh sách dịch vụ</h1>
            {data?.data?.value?.map((item: any, index: number) => (
                <div key={index} className={border}>
                    <div className={card}>
                        <img className={img} src={item?.photos?.[0]?.imageUrl} alt={item.name} />
                        <div className="flex-1">
                            <h2 className={name}>{item.name}</h2>
                            <p className={description}>{item.description}</p>
                            <div className={buttonContainer}>
                                <Button asChild className={button}>
                                    <Link to={`/service/details/${item.id}`}>Xem thêm</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            {data?.data?.value?.length <= 0 &&
                <div className={border}>
                    <div className="bg-color1 p-[2%] rounded-[20px]">
                        <h1 className="text-center text-color4 text-xl font-bold">Hiện chưa có dịch vụ khả dụng.</h1>
                    </div>
                </div>
            }
        </section>
    );
}

export default ServicePage;