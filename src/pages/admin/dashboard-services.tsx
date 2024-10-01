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
import { CheckIcon } from "@/components/icons/commons";

function DashboardServices() {
    const [pageNumber, setPageNumber] = useState(1); // Quản lý số trang hiện tại
    const [searchTerm, setSearchTerm] = useState(""); // Quản lý giá trị tìm kiếm
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(""); // Quản lý giá trị tìm kiếm sau debounce
    const pageSize = 10; // Số lượng item trên mỗi trang

    // Debounce logic: update debounced search term after 500ms of inactivity
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
            setPageNumber(1); // Reset to the first page when search term changes
        }, 500); // Debounce time (500ms)

        return () => {
            clearTimeout(handler); // Clear timeout if user types again within 500ms
        };
    }, [searchTerm]); // Run this effect whenever `searchTerm` changes

    const { data, isFetching } = useQuery({
        queryKey: ['admin-services', pageNumber, debouncedSearchTerm],
        queryFn: () =>
            axiosClient.get(
                `/auth/users?pageSize=${pageSize}&pageNumber=${pageNumber}&searchTerm=${debouncedSearchTerm}`
            ),
        staleTime: 3000, // Đặt thời gian stale (tạm thời giữ dữ liệu trong 3 giây)
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

    return (
        <section className="min-h-screen p-[4%] bg-color1">
            <div className={"my-2 p-0.5 rounded-[20px] bg-gradient-to-r from-[#011949] to-[#55A6CE]"}>
                <div className="bg-color1 p-2 rounded-[20px]">
                    <h1 className="text-center text-color4 text-lg font-bold">DỊCH VỤ</h1>
                </div>
            </div>

            {/* Search Input */}
            <input
                type="text"
                placeholder="Search by username, email."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-[280px] p-2 border rounded-lg my-4"
            />

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
                                        <TableHead className="text-center text-white first:rounded-s-lg">Tên</TableHead>
                                        <TableHead className="text-center text-white">Email</TableHead>
                                        <TableHead className="text-center text-white">Địa chỉ</TableHead>
                                        <TableHead className="text-center text-white">Ngày sinh</TableHead>
                                        <TableHead className="text-center text-white">Giới tính</TableHead>
                                        <TableHead className="text-center text-white">Thần số học</TableHead>
                                        <TableHead className="text-center text-white">MBTI</TableHead>
                                        <TableHead className="text-center text-white last:rounded-e-lg">Service Owner</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data?.data?.value?.items?.map((item: any, index: number) => (
                                        <TableRow key={index}>
                                            <TableCell className="font-medium first:rounded-s-lg">{item?.username}</TableCell>
                                            <TableCell>{item?.email}</TableCell>
                                            <TableCell>{item?.location}</TableCell>
                                            <TableCell>{item?.dob?.slice(8, 10)}-{item?.dob?.slice(5, 7)}-{item?.dob?.slice(0, 4)}</TableCell>
                                            <TableCell className="text-center">
                                                {item?.gender === "female" && <Badge className="bg-pink-400" variant="outline">Nữ</Badge>}
                                                {item?.gender === "male" && <Badge className="bg-color2" variant="outline">Nam</Badge>}
                                                {item?.gender === "other" && <Badge className="bg-purple-400" variant="outline">Khác</Badge>}
                                            </TableCell>
                                            <TableCell className="text-center">{item?.numerologyType}</TableCell>
                                            <TableCell className="text-center">{item?.mbtiType}</TableCell>
                                            <TableCell className="flex items-center justify-center last:rounded-e-lg">
                                                {item?.isServiceOwner && <CheckIcon fill="black" width={20} height={20} />}
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
                                            Total: {data?.data?.value?.totalItems} users
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

export default DashboardServices;