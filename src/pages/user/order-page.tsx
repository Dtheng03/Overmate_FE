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
import { Badge } from "@/components/ui/badge";
import { ReloadIcon } from "@radix-ui/react-icons";

function OrdersPage() {
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
        queryKey: ['user-orders', pageNumber, debouncedSearchTerm, statusFilter],
        queryFn: () =>
            axiosClient.get(
                `/order/user?PageSize=${pageSize}&PageNumber=${pageNumber}&SearchTerm=${debouncedSearchTerm}&Filter=${statusFilter}`
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
        setSearchTerm(e.target.value);
    };

    // Xử lý thay đổi trạng thái
    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStatusFilter(e.target.value);
        setPageNumber(1);
    };

    return (
        <section className="min-h-screen p-[4%] bg-color1 bg-[url('./assets/imgs/background.png')] bg-cover bg-center">
            <div className={"my-2 p-0.5 rounded-[20px] bg-gradient-to-r from-[#011949] to-[#55A6CE]"}>
                <div className="bg-color1 p-2 rounded-[20px]">
                    <h1 className="text-center text-color4 text-lg font-bold uppercase">Lịch sử hoạt động</h1>
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
                        <option value="_processing">Chờ xử lý</option>
                        <option value="_finished">Hoàn thành</option>
                        <option value="_cancelled">Hủy</option>
                    </select>
                </div>
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
                                        <TableHead className="text-center text-white first:rounded-s-lg">Khách hàng</TableHead>
                                        <TableHead className="text-center text-white">Email</TableHead>
                                        <TableHead className="text-center text-white">Dịch vụ</TableHead>
                                        <TableHead className="text-center text-white">Bên cung cấp</TableHead>
                                        <TableHead className="text-center text-white">Ngày tạo</TableHead>
                                        <TableHead className="text-center text-white">Giá</TableHead>
                                        <TableHead className="text-center text-white last:rounded-e-lg">Trạng thái</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data?.data?.value?.items?.map((item: any, index: number) => (
                                        <TableRow key={index}>
                                            <TableCell className="font-medium first:rounded-s-lg">{item?.userName}</TableCell>
                                            <TableCell>{item?.userEmail}</TableCell>
                                            <TableCell>{item?.serviceName}</TableCell>
                                            <TableCell>{item?.serviceOwnerName}</TableCell>
                                            <TableCell>{item?.createdDate?.slice(8, 10)}/{item?.createdDate?.slice(5, 7)}/{item?.createdDate?.slice(0, 4)}</TableCell>
                                            <TableCell>{item?.price?.toLocaleString()} VND</TableCell>
                                            <TableCell className="text-center last:rounded-e-lg">
                                                {item?.status === 1 && <Badge className="bg-color2" variant="outline">
                                                    <ReloadIcon className="mr-2 h-3 w-3 animate-spin" />
                                                    Chờ xử lý</Badge>
                                                }
                                                {item?.status === 2 && <Badge className="bg-green-400" variant="outline">Hoàn thành</Badge>}
                                                {item?.status === 3 && <Badge className="bg-red-400" variant="outline">Hủy</Badge>}
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
export default OrdersPage;