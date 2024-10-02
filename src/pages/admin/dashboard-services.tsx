import { useState, useEffect } from "react";
import axiosClient from "@/config";
import { useMutation, useQuery } from "@tanstack/react-query";
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
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Eye } from "@/components/icons/dashboard";
import { toast } from "@/hooks/use-toast";

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

    const { data, isFetching, refetch } = useQuery({
        queryKey: ['admin-services', pageNumber, debouncedSearchTerm],
        queryFn: () =>
            axiosClient.get(
                `/service?PageSize=${pageSize}&PageNumber=${pageNumber}&SearchTerm=${debouncedSearchTerm}&Oderby=${""}`
            ),
        staleTime: 3000, // Đặt thời gian stale (tạm thời giữ dữ liệu trong 3 giây)
    });

    const updateStatus = useMutation({
        mutationFn: (body: {
            Id: string,
            Status: number
        }) => axiosClient.post("/service/update_status", body),
        onSuccess: () => {
            toast({
                title: "Thao tác thành công!",
                description: "Hãy tải lại nếu chưa thấy sự thay đổi",
            });
            refetch();
        },
        onError: () => {
            toast({
                variant: "destructive",
                title: "Thao tác thất bại!",
                description: "Xin vui lòng thử lại.",
            });
        },
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
                placeholder="Tìm kiếm theo tên dịch vụ"
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
                                            <TableCell>{item?.price?.toLocaleString()} VND</TableCell>
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
                                                        <div className="grid gap-6 py-6 md:grid-cols-3 bg-white rounded-lg overflow-hidden">
                                                            <img
                                                                className="w-full md:w-[200px] object-cover h-auto md:h-full"
                                                                src={item?.photos?.imageUrl}
                                                                alt={item?.name}
                                                            />

                                                            <div className="p-4 md:col-span-2 flex flex-col justify-between">
                                                                <div>
                                                                    <h2 className="text-xl md:text-2xl font-semibold text-color1 mb-4">
                                                                        {item?.name} - <span className="text-color4">{item?.serviceCategoryName}</span>
                                                                    </h2>
                                                                    <div className="flex items-center justify-between">
                                                                        <p className="text-color3 mb-4">Đối tác: <span className="font-medium">{item?.serviceOwnerName}</span></p>
                                                                        {item?.status === 1 && <Badge className="bg-color2" variant="outline">
                                                                            <ReloadIcon className="mr-2 h-3 w-3 animate-spin" />
                                                                            Chờ xử lý</Badge>
                                                                        }
                                                                        {item?.status === 2 && <Badge className="bg-green-400" variant="outline">Chấp nhận</Badge>}
                                                                        {item?.status === 3 && <Badge className="bg-red-400" variant="outline">Từ chối</Badge>}
                                                                    </div>
                                                                    <p className="text-color2 mb-4 italic">{item?.description}</p>
                                                                </div>
                                                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                                                                    <p className="font-bold text-color1">Thời lượng:
                                                                        <span className="ml-2 font-normal text-color2">{item?.duration} giờ</span>
                                                                    </p>
                                                                    <p className="font-bold text-color1 mt-2 md:mt-0">Giá:
                                                                        <span className="ml-2 font-normal text-color2">{item?.price?.toLocaleString()} VND</span>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {(item?.status == 1) &&
                                                            <DialogFooter className="flex justify-end pt-4">
                                                                <span
                                                                    className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 cursor-pointer transition-colors"
                                                                    onClick={() => {
                                                                        updateStatus.mutate({
                                                                            "Id": item?.id,
                                                                            "Status": 3
                                                                        })
                                                                    }}
                                                                >
                                                                    Từ chối
                                                                </span>
                                                                <span
                                                                    className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 cursor-pointer transition-colors"
                                                                    onClick={() => {
                                                                        updateStatus.mutate({
                                                                            "Id": item?.id,
                                                                            "Status": 2
                                                                        })
                                                                    }}
                                                                >
                                                                    Chấp nhận
                                                                </span>
                                                            </DialogFooter>
                                                        }
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

export default DashboardServices;