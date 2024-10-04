import axiosClient from "@/config";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ClockIcon, LocationIcon, StarIcon } from "@/components/icons/commons";
import { toast } from "@/hooks/use-toast";

const section = "px-4 md:px-[8%] py-[5%] min-h-[calc(100vh-58px)] flex flex-col items-center bg-color1 bg-[url('./assets/imgs/background.png')] bg-cover bg-center";
const h1 = "mb-8 md:mb-12 text-center text-white text-2xl md:text-3xl font-extrabold uppercase";
const border = "my-4 p-0.5 rounded-[20px] bg-gradient-to-b from-[#011949] to-[#55A6CE] shadow-md shadow-slate-600";
const card = "flex flex-col md:flex-row gap-[36px] bg-color1 py-[20px] px-[36px] rounded-[20px]";
const img = "w-[400px] h-[400px] object-cover bg-color4 rounded-[20px]";

const border2 = "my-4 p-0.5 rounded-[20px] bg-gradient-to-bl from-[#011949] to-[#55A6CE] lg:w-fit";
const card2 = "bg-color1 p-4 rounded-[20px] lg:w-fit flex gap-x-4 lg:block";
const img2 = "w-[240px] h-[240px] object-cover bg-color4 rounded-[20px] shadow-md";

function ServiceDetails() {
    const params = useParams();
    const navigate = useNavigate();
    const pathname = useLocation().pathname;
    const token = localStorage.getItem("token");

    const { data } = useQuery({
        queryKey: ['user-service-details'],
        queryFn: () => axiosClient.get(`/service/${params.serviceId}`),
    });

    const handleBook = () => {
        if (!token) {
            toast({
                title: "Bạn chưa đăng nhập",
                description: "Vui lòng đăng nhập để tiếp tục",
            });
            sessionStorage.setItem("history", pathname)
            navigate("/sign-in");
        } else {
            navigate(`/service/order/${data?.data?.value?.id}`)
        }
    }

    return (
        <section className={section}>
            <h1 className={h1}>{data?.data?.value?.serviceCategoryName}</h1>
            <div className={border}>
                <div className={card}>
                    <img className={img} src={data?.data?.value?.photos?.imageUrl} alt={data?.data?.value?.name} />
                    <div className="w-full md:w-[400px] flex-1"> {/* Sử dụng w-full cho các màn hình nhỏ hơn */}
                        <p className="text-2xl font-semibold text-white uppercase mb-[8px]">
                            {data?.data?.value?.name}
                        </p>
                        <div className="flex items-center text-color5 text-xs mb-[16px]">
                            5.0 |
                            <div className="ml-1 flex items-center">
                                <StarIcon fill="#E8B200" width={12} height={12} />
                                <StarIcon fill="#E8B200" width={12} height={12} />
                                <StarIcon fill="#E8B200" width={12} height={12} />
                                <StarIcon fill="#E8B200" width={12} height={12} />
                                <StarIcon fill="#E8B200" width={12} height={12} />
                            </div>
                        </div>
                        <p className="flex items-center gap-x-[8px] text-sm text-slate-200 mb-[16px]">
                            <LocationIcon fill="white" width={20} height={20} /> Tp. Hồ Chí Minh
                        </p>
                        <p className="flex items-center gap-x-[8px] text-xs text-slate-400 italic">
                            <ClockIcon fill="white" width={20} height={20} /> Cập nhật 35 phút trước
                        </p>
                        <div className="flex justify-end">
                            <span
                                className="inline-block my-4 p-0.5 rounded-[10px] bg-gradient-to-l from-[#011949] to-[#55A6CE] cursor-pointer transition-all hover:scale-[1.02]"
                                onClick={handleBook}
                            >
                                <span className="inline-block bg-color1 rounded-[10px] px-[28px] py-[8px] text-white text-sm ">
                                    Đặt ngay
                                </span>
                            </span>
                        </div>
                        <p className={"font-bold text-sm text-white"}>
                            Mô tả chi tiết:
                        </p>
                        <p className="text-sm text-white text-justify">{data?.data?.value?.description}</p>
                    </div>
                </div>
            </div>

            {/* dich vụ them */}
            <h2 className={`mt-[60px] mb-[20px] w-fit lg:w-[896px] mx-auto text-white text-2xl font-bold text-center lg:text-left`}>DỊCH VỤ TƯƠNG TỰ</h2>
            <div className="w-fit lg:w-[896px] mx-auto flex flex-col lg:flex-row justify-between flex-wrap">
                <div className={`${border2} cursor-pointer transition-all hover:scale-[1.02]`}>
                    <div className={card2}>
                        <img className={img2} src={data?.data?.value?.photos?.imageUrl} alt={data?.data?.value?.name} />
                        <div className="w-[240px]">
                            <p className="text-white font-extrabold uppercase mt-[8px] mb-[4px]">
                                {data?.data?.value?.name}
                            </p>
                            <p className="mb-[8px] font-semibold text-color5">
                                {data?.data?.value?.price?.toLocaleString()} đ
                            </p>
                            <div className="flex flex-col lg:flex-row justify-between gap-2 lg:items-center">
                                <p className="flex items-center text-xs text-slate-400 italic">
                                    <LocationIcon fill="white" width={12} height={12} /> Tp. Hồ Chí Minh
                                </p>
                                <div className="flex items-center text-color5 text-xs">
                                    5.0 |
                                    <div className="ml-1 flex items-center">
                                        <StarIcon fill="#E8B200" width={12} height={12} />
                                        <StarIcon fill="#E8B200" width={12} height={12} />
                                        <StarIcon fill="#E8B200" width={12} height={12} />
                                        <StarIcon fill="#E8B200" width={12} height={12} />
                                        <StarIcon fill="#E8B200" width={12} height={12} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
}

export default ServiceDetails;