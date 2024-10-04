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
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge";
import { HandShake, Lock, UnLock } from "@/components/icons/dashboard";
import { useToast } from "@/hooks/use-toast";

function DashboardUsers() {
    const { toast } = useToast();
    const [pageNumber, setPageNumber] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    const [isServiceOwner, setIsServiceOwner] = useState(false);
    const pageSize = 10;

    // debounce for search
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
            setPageNumber(1);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    // call data
    const { data, isFetching, refetch } = useQuery({
        queryKey: ['admin-users', pageNumber, debouncedSearchTerm, isServiceOwner],
        queryFn: () =>
            axiosClient.get(
                `/auth/users?pageSize=${pageSize}&pageNumber=${pageNumber}&searchTerm=${debouncedSearchTerm}&isServiceOwner=${isServiceOwner}`
            ),
        staleTime: 3000,
        retry: 0,
    });

    // delete user
    const deletedUser = useMutation({
        mutationFn: (userId: string) => axiosClient.delete(`/auth/users/${userId}`),
        onSuccess: () => {
            toast({
                title: "Thao tác thành công!",
                description: "Hãy tải lại trang nếu không thấy thay đổi",
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

    // search
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    // filter
    const handleServiceOwnerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsServiceOwner(e.target.checked);
        setPageNumber(1);
    };

    return (
        <section className="min-h-screen p-[4%] bg-color1">
            {/* header */}
            <div className={"my-2 p-0.5 rounded-[20px] bg-gradient-to-r from-[#011949] to-[#55A6CE]"}>
                <div className="bg-color1 p-2 rounded-[20px]">
                    <h1 className="text-center text-color4 text-lg font-bold">THÀNH VIÊN</h1>
                </div>
            </div>

            {/* action */}
            <div className="my-4 flex justify-between items-center">
                {/* Search Input */}
                <input
                    type="text"
                    placeholder="Tìm kiếm ..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-[280px] p-2 border rounded-lg"
                />

                {/* Service Owner Filter Checkbox */}
                <div className={"my-2 p-0.5 rounded-[20px] bg-gradient-to-r from-[#011949] to-[#55A6CE]"}>
                    <label className="p-2 flex items-center text-white bg-color1 rounded-[20px]">
                        <input
                            type="checkbox"
                            checked={isServiceOwner}
                            onChange={handleServiceOwnerChange}
                            className={`checked:hidden`}
                        />
                        <span className="ml-2 flex items-center gap-2">
                            {isServiceOwner && <HandShake fill="white" width={20} height={20} />}
                            Đối tác
                        </span>
                    </label>
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
                    {data?.data?.value?.items?.length > 0 ? (
                        <>
                            {/* table */}
                            <Table className="bg-white rounded-lg">
                                <TableHeader>
                                    <TableRow className="rounded-t-lg bg-color2 hover:bg-color2">
                                        <TableHead className="text-center text-white first:rounded-s-lg">Tên</TableHead>
                                        <TableHead className="text-center text-white">Email</TableHead>
                                        <TableHead className="text-center text-white">Địa chỉ</TableHead>
                                        <TableHead className="text-center text-white">Điện thoại</TableHead>
                                        <TableHead className="text-center text-white">Ngày sinh</TableHead>
                                        <TableHead className="text-center text-white">Giới tính</TableHead>
                                        <TableHead className="text-center text-white">Đối tác</TableHead>
                                        <TableHead className="text-center text-white last:rounded-e-lg">Trạng thái</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data?.data?.value?.items?.map((item: any, index: number) => (
                                        <TableRow key={index}>
                                            <TableCell className="font-medium first:rounded-s-lg">{item?.username}</TableCell>
                                            <TableCell>{item?.email}</TableCell>
                                            <TableCell>{item?.location}</TableCell>
                                            <TableCell>{item?.phoneNumber}</TableCell>
                                            <TableCell>{item?.dob?.slice(8, 10)}-{item?.dob?.slice(5, 7)}-{item?.dob?.slice(0, 4)}</TableCell>
                                            <TableCell className="text-center">
                                                {item?.gender === "female" && <Badge className="bg-pink-400" variant="outline">Nữ</Badge>}
                                                {item?.gender === "male" && <Badge className="bg-color2" variant="outline">Nam</Badge>}
                                                {item?.gender === "other" && <Badge className="bg-purple-400" variant="outline">Khác</Badge>}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                {item?.isServiceOwner && (
                                                    <div className="flex justify-center">
                                                        <HandShake fill="black" width={20} height={20} />
                                                    </div>
                                                )}
                                            </TableCell>
                                            <TableCell className="flex items-center justify-center last:rounded-e-lg">
                                                {item?.isDeleted ?
                                                    <TooltipProvider delayDuration={0}>
                                                        <Tooltip>
                                                            <TooltipTrigger onClick={() => { deletedUser.mutate(item?.id) }}>
                                                                <Lock fill="#4bc8e7" width={16} height={16} />
                                                            </TooltipTrigger>
                                                            <TooltipContent className="bg-color2">
                                                                <p>Ấn để mở khóa</p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>
                                                    :
                                                    <TooltipProvider delayDuration={0}>
                                                        <Tooltip>
                                                            <TooltipTrigger onClick={() => { deletedUser.mutate(item?.id) }}>
                                                                <UnLock fill="red" width={16} height={16} />
                                                            </TooltipTrigger>
                                                            <TooltipContent className="bg-red-400">
                                                                <p>Ấn để khóa</p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>
                                                }
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
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
                        </>
                    ) : (
                        <div className={"my-2 p-0.5 rounded-[20px] bg-gradient-to-r from-[#011949] to-[#55A6CE]"}>
                            <div className="bg-color1 p-2 rounded-[20px]">
                                <h1 className="text-center text-color4 text-lg font-bold">Không tìm thấy kết quả phù hợp</h1>
                            </div>
                        </div>
                    )}
                </>
            )}
        </section>
    );
}

export default DashboardUsers;
