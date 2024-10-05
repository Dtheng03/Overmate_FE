import { useState, useEffect } from "react";
import axiosClient from "@/config";
import { useQuery } from "@tanstack/react-query";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Eye, Services } from "@/components/icons/dashboard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function MyServices() {
    const navigate = useNavigate();
    const [pageNumber, setPageNumber] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const pageSize = 10;

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
            setPageNumber(1);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    const { data, isFetching } = useQuery({
        queryKey: ['partner-services', pageNumber, debouncedSearchTerm, statusFilter],
        queryFn: () =>
            axiosClient.get(
                `/service/service_owner?PageSize=${pageSize}&PageNumber=${pageNumber}&SearchTerm=${debouncedSearchTerm}&FilterStatus=${statusFilter}`
            ),
        staleTime: 3000,
        retry: 0
    });

    // Điều khiển khi nhấn "Previous" và "Next"
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

    // Xử lý thay đổi giá trị tìm kiếm
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value); // Update search term immediately on input change
    };

    // Xử lý thay đổi trạng thái
    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStatusFilter(e.target.value); // Cập nhật trạng thái lọc
        setPageNumber(1); // Đặt lại trang về 1
    };

    return (
        <section className="min-h-[calc(100vh-58px)] p-[4%] bg-color1 bg-[url('./assets/imgs/background.png')] bg-cover bg-center">
            <div className={"my-2 p-0.5 rounded-[20px] bg-gradient-to-r from-[#011949] to-[#55A6CE]"}>
                <div className="bg-color1 p-2 rounded-[20px]">
                    <h1 className="text-center text-color4 text-lg font-bold uppercase">Dịch vụ của tôi</h1>
                </div>
            </div>
            <div className="my-4 flex justify-between items-center">
                {/* Search Input */}
                <input
                    type="text"
                    placeholder="Tìm kiếm ..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-[280px] p-2 border rounded-lg my-4"
                />
                {/* filter */}
                <div className={"my-2 p-0.5 rounded-[20px] bg-gradient-to-r from-[#011949] to-[#55A6CE]"}>
                    <select
                        className="w-[200px] p-2 outline-none cursor-pointer flex items-center text-white bg-color1 rounded-[20px]"
                        value={statusFilter}
                        onChange={handleStatusChange}
                    >
                        <option value="">Tất cả trạng thái</option>
                        <option value="1">Chờ xử lý</option>
                        <option value="2">Chấp nhận</option>
                        <option value="3">Từ chối</option>
                    </select>
                </div>
                <Button
                    className="flex items-center gap-x-4 bg-color2 hover:bg-color3"
                    onClick={() => {
                        navigate("/partner/sign-up-service")
                    }}
                >
                    <Services fill="white" width={20} height={20} />
                    Đăng ký dịch vụ
                </Button>
            </div>
            {isFetching ? (
                <div className={"my-2 p-0.5 rounded-[20px] bg-gradient-to-r from-[#011949] to-[#55A6CE]"}>
                    <div className="bg-color1 p-2 rounded-[20px]">
                        <h1 className="text-center text-color4 text-lg font-bold">Đang tải ...</h1>
                    </div>
                </div>
            ) : (
                <>
                    {data?.data?.value?.items?.length > 0 ?
                        <>
                            <Table className="bg-white rounded-lg">
                                <TableHeader>
                                    <TableRow className="rounded-t-lg bg-color2 hover:bg-color2">
                                        <TableHead className="text-center text-white first:rounded-s-lg">Loại dịch vụ</TableHead>
                                        <TableHead className="text-center text-white">Tên dịch vụ</TableHead>
                                        <TableHead className="text-center text-white">Đối tác</TableHead>
                                        <TableHead className="text-center text-white">Giá</TableHead>
                                        <TableHead className="text-center text-white">Thời lượng</TableHead>
                                        <TableHead className="text-center text-white">Trạng thái</TableHead>
                                        <TableHead className="text-center text-white last:rounded-e-lg">Thao tác</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data?.data?.value?.items?.map((item: any, index: number) => (
                                        <TableRow key={index}>
                                            <TableCell className="font-medium first:rounded-s-lg">{item?.serviceCategoryName}</TableCell>
                                            <TableCell>{item?.name}</TableCell>
                                            <TableCell>{item?.serviceOwnerName}</TableCell>
                                            <TableCell>{item?.price?.toLocaleString()} đ</TableCell>
                                            <TableCell className="text-center">{item?.duration} giờ</TableCell>
                                            <TableCell className="text-center">
                                                {item?.status === 1 && <Badge className="bg-color2" variant="outline">
                                                    <ReloadIcon className="mr-2 h-3 w-3 animate-spin" />
                                                    Chờ xử lý</Badge>
                                                }
                                                {item?.status === 2 && <Badge className="bg-green-400" variant="outline">Chấp nhận</Badge>}
                                                {item?.status === 3 && <Badge className="bg-red-400" variant="outline">Từ chối</Badge>}
                                            </TableCell>
                                            <TableCell className="flex items-center justify-center gap-x-2 last:rounded-e-lg">
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        {/* Use a span instead of button to avoid nesting */}
                                                        <span className="cursor-pointer">
                                                            <Eye fill="#4bc8e7" width={20} height={20} />
                                                        </span>
                                                    </DialogTrigger>
                                                    <DialogContent className="max-w-4xl w-full p-6 md:p-8 bg-white rounded-lg shadow-lg">
                                                        <DialogHeader>
                                                            <DialogTitle className="text-2xl font-bold text-color1">Thông tin chi tiết</DialogTitle>
                                                            <DialogDescription>
                                                                Hãy xem xét kĩ lưỡng trước.
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <div className="flex gap-x-4">
                                                            <img
                                                                className="w-[360px] h-[360px]"
                                                                src={item?.photos?.imageUrl}
                                                                alt={item?.name}
                                                            />
                                                            <div className="">
                                                                <div>
                                                                    <h2 className="text-xl font-semibold text-color1 mb-4">
                                                                        {item?.name} - <span className="text-color4">{item?.serviceCategoryName}</span>
                                                                    </h2>
                                                                    <div className="mb-8 flex items-center justify-between">
                                                                        <p className="text-color3">Đối tác: <span className="font-medium">{item?.serviceOwnerName}</span></p>
                                                                        {item?.status === 1 && <Badge className="bg-color2" variant="outline">
                                                                            <ReloadIcon className="mr-2 h-3 w-3 animate-spin" />
                                                                            Chờ xử lý</Badge>
                                                                        }
                                                                        {item?.status === 2 && <Badge className="bg-green-400" variant="outline">Chấp nhận</Badge>}
                                                                        {item?.status === 3 && <Badge className="bg-red-400" variant="outline">Từ chối</Badge>}
                                                                    </div>
                                                                    <p className="text-color2 mb-8 text-justify italic">{item?.description}</p>
                                                                </div>
                                                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                                                                    <p className="font-bold text-color1">Thời lượng:
                                                                        <span className="ml-2 font-normal text-color2">{item?.duration} giờ</span>
                                                                    </p>
                                                                    <p className="font-bold text-color1 mt-2 md:mt-0">Giá:
                                                                        <span className="ml-2 font-normal text-color2">{item?.price?.toLocaleString()} đ</span>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </DialogContent>
                                                </Dialog>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <Pagination className="my-8">
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            onClick={pageNumber > 1 ? handlePreviousPage : (e) => e.preventDefault()} // Prevent click if disabled
                                            className={`bg-color2 cursor-pointer ${pageNumber === 1 ? "opacity-50 cursor-not-allowed" : ""}`} // Styling for disabled state
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
                                            onClick={pageNumber < data?.data?.value?.totalPages ? handleNextPage : (e) => e.preventDefault()} // Prevent click if disabled
                                            className={`bg-color2 cursor-pointer ${pageNumber === data?.data?.value?.totalPages ? "opacity-50 cursor-not-allowed" : ""}`} // Styling for disabled state
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </>
                        :
                        <div className={"my-2 p-0.5 rounded-[20px] bg-gradient-to-r from-[#011949] to-[#55A6CE]"}>
                            <div className="bg-color1 p-2 rounded-[20px]">
                                <h1 className="text-center text-color4 text-lg font-bold">Không tìm thấy kết quả phù hợp</h1>
                            </div>
                        </div>
                    }
                </>
            )}
        </section>
    );
}

export default MyServices;