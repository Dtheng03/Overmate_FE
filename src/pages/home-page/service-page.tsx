import { useEffect, useState } from "react";
import axiosClient from "@/config";
import { useQuery } from "@tanstack/react-query";
import { LocationIcon, StarIcon } from "@/components/icons/commons";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

const section = "px-4 md:px-[8%] py-[5%] min-h-[calc(100vh-58px)] bg-color1 bg-[url('./assets/imgs/background.png')] bg-cover bg-center";
const h1 = "mb-10 text-center text-white text-2xl md:text-3xl font-extrabold uppercase";
const border = "my-4 p-0.5 rounded-[20px] bg-gradient-to-bl from-[#011949] to-[#55A6CE] w-full sm:w-auto";
const card = "bg-color1 p-4 rounded-[20px] w-full sm:w-auto";
const img = "w-full sm:w-[240px] h-[240px] object-cover bg-color4 rounded-[20px] shadow-md";

function ServicePage() {
    const params = useParams();
    const navigate = useNavigate();
    const state = useLocation().state;
    const [pageNumber, setPageNumber] = useState(1);
    const pageSize = 9;

    const { data, refetch, isFetching, status } = useQuery({
        queryKey: ['user-view-service'],
        queryFn: () => axiosClient.get(`/service/service_category?PageSize=${pageSize}&PageNumber=${pageNumber}&ServiceCateId=${params.categoryId}`),
        retry: 0
    });

    // pagination handle
    const handleNextPage = () => {
        if (pageNumber < data?.data?.value?.totalPages) {
            setPageNumber((prev) => prev + 1);
        }
    };
    const handlePreviousPage = () => {
        if (pageNumber > 1) {
            setPageNumber((prev) => prev - 1);
        }
    };

    useEffect(() => {
        refetch()
    }, [params.categoryId])

    return (
        <section className={section}>
            <h1 className={h1}>Dịch vụ {state?.categoryName}</h1>
            {isFetching ? (
                <div className="flex justify-center">
                    <div className={`${border} w-full sm:w-2/3 lg:w-1/2 xl:w-1/3`}>
                        <div className="bg-color1 p-4 sm:p-[2%] rounded-[20px]">
                            <h1 className="text-center text-color4 text-lg sm:text-xl font-bold">
                                Đang tải dữ liệu ...
                            </h1>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    {status === "success" ? (
                        <div className="w-full lg:w-[896px] mx-auto flex flex-wrap gap-4 md:gap-x-[34px] justify-center">
                            {data?.data?.value?.items?.map((item: any, index: number) => (
                                <div key={index} className={`${border} cursor-pointer transition-all hover:scale-[1.02]`} onClick={() => { navigate(`/service/details/${item.id}`) }}>
                                    <div className={`${card}`}>
                                        <img className={img} src={item?.photos?.imageUrl} alt={item.name} />
                                        <div className="w-full sm:w-[240px]">
                                            <p className="text-white font-extrabold uppercase mt-[8px] mb-[4px]">
                                                {item?.name}
                                            </p>
                                            <p className="mb-[8px] font-semibold text-color5">
                                                {item?.price?.toLocaleString()} đ
                                            </p>
                                            <div className="flex justify-between items-center">
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
                            ))}
                            {/* pagination */}
                            <Pagination className="my-8">
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            onClick={pageNumber > 1 ? handlePreviousPage : (e) => e.preventDefault()}
                                            className={`bg-color2 cursor-pointer ${pageNumber === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                                        />
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink className="bg-white">
                                            {pageNumber} / {data?.data?.value?.totalPages}
                                        </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink className="w-fit px-2 bg-white">
                                            Tổng: {data?.data?.value?.totalItems}
                                        </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationNext
                                            onClick={pageNumber < data?.data?.value?.totalPages ? handleNextPage : (e) => e.preventDefault()}
                                            className={`bg-color2 cursor-pointer ${pageNumber === data?.data?.value?.totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    ) : (
                        <div className="flex justify-center">
                            <div className={`${border} w-full sm:w-2/3 lg:w-1/2 xl:w-1/3`}>
                                <div className="bg-color1 p-4 sm:p-[2%] rounded-[20px]">
                                    <h1 className="text-center text-color4 text-lg sm:text-xl font-bold">
                                        Hiện chưa có dịch vụ khả dụng.
                                    </h1>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </section >
    );
}

export default ServicePage;
