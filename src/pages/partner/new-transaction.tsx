import * as yup from "yup";
import { useState } from "react";
import axiosClient from "@/config";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormValues {
    amount: number;
    username: string;
}

const schema = yup
    .object({
        amount: yup
            .number()
            .integer("Giá phải là số nguyên")
            .min(500000, "Số tiền phải lớn hơn hoặc bằng 500,000 đ")
            .required("Xin hãy nhập thông tin"),
        username: yup
            .string()
            .max(8, "Tên người dùng tối đa 8 ký tự")
            .required("Xin hãy nhập thông tin"),
    })
    .required();

const card: string = "h-full bg-color1 p-4 rounded-[20px] flex gap-x-4";
const input: string = "w-full h-[48px] mb-2";
const error: string = "text-sm text-red-400";

function NewTransaction() {
    const navigate = useNavigate();
    const username = localStorage.getItem("username") || "";
    const [showQR, setShowQR] = useState(false);
    const [dataQR, setDataQR] = useState<FormValues>();

    const createTransaction = useMutation({
        mutationFn: (body: {
            "Amount": number
        }) => {
            return axiosClient.post("/auth/deposit", body);
        },
        onSuccess: () => {
            toast({
                title: "Tạo giao dịch thành công!",
                description: "Vào giao dịch của tôi để xem chi tiết",
            });
            navigate("/partner/my-transactions");
        },
        onError: () => {
            toast({
                variant: "destructive",
                title: "Tạo giao dịch thất bại!",
                description: "Xin vui lòng thử lại.",
            });
        },
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: yupResolver(schema),
        defaultValues: {
            amount: 500000,  // Giá trị mặc định cho số tiền nạp
            username: username,  // Giá trị mặc định cho tên người dùng
        },
    });

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        setDataQR(data);
        setShowQR(true);
    };

    return (
        <section className="p-[4%] min-h-[calc(100vh-58px)">
            <h1 className="mb-12 text-center text-color1 text-3xl font-extrabold uppercase">Thanh toán</h1>
            <div className="mx-auto p-0.5 rounded-[20px] bg-gradient-to-r from-[#011949] to-[#55A6CE] w-[900px]">
                <div className={card}>
                    <div className="flex-1 bg-white rounded-2xl p-6 shadow-lg">
                        <h2 className="text-lg font-semibold text-color1 text-center mb-4">Hướng dẫn tạo giao dịch nạp tiền mới</h2>
                        <div className="space-y-2 text-gray-600">
                            <p><span className="font-semibold text-color1">Bước 1:</span> Nhập số tiền muốn nạp (tối thiểu 500.000 đ)</p>
                            <p><span className="font-semibold text-color1">Bước 2:</span> Nhập tên người dùng</p>
                            <p><span className="font-semibold text-color1">Bước 3:</span> Nhấn nút "Tạo mã QR"</p>
                            <p><span className="font-semibold text-color1">Bước 4:</span> Mở ví điện tử/ ứng dụng ngân hàng</p>
                            <p><span className="font-semibold text-color1">Bước 5:</span> Chọn "Quét QR" và quét mã</p>
                            <p><span className="font-semibold text-color1">Bước 6:</span> Thanh toán</p>
                            <p><span className="font-semibold text-color1">Bước 7:</span> Sau khi thanh toán thành công, nhấn nút "Hoàn tất"</p>
                        </div>
                    </div>
                    {showQR
                        ?
                        <div className="flex-1 bg-white rounded-2xl p-6 shadow-lg">
                            <img
                                className="rounded-[20px]"
                                src={`https://img.vietqr.io/image/970422-0978490265-print.png?amount=${dataQR?.amount}&addInfo=${dataQR?.username}%20CHUYEN%20TIEN%20CHO%20OVERMATE&accountName=NGUYEN%20DUC%20THANG`}
                                alt="QR Code" />
                            <div className="mb-4 flex justify-center gap-x-8">
                                <Button
                                    className="flex gap-x-2 bg-color5 hover:bg-color3"
                                    onClick={() => {
                                        setShowQR(false);
                                    }}
                                >
                                    Hủy bỏ
                                </Button>
                                {createTransaction.isPending
                                    ?
                                    <Button disabled>
                                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                        Vui lòng chờ
                                    </Button>
                                    :
                                    <Button
                                        className="flex gap-x-2 bg-color1 hover:bg-color2"
                                        onClick={() => {
                                            createTransaction.mutate({
                                                "Amount": dataQR!.amount
                                            })
                                            setShowQR(false);
                                        }}
                                    >
                                        Hoàn tất
                                    </Button>
                                }
                            </div>
                        </div>
                        :
                        <div className="flex-1 bg-white rounded-2xl p-6 shadow-lg">
                            <h2 className="text-lg font-semibold text-color1 text-center mb-4">Điền thông tin</h2>
                            <form onSubmit={handleSubmit(onSubmit)} className="max-w-[816px] w-full">
                                <div className="mb-4">
                                    <Input {...register("amount")} type="number" className={input} placeholder="Sô tiền muốn nạp" />
                                    <p className={error}>{errors.amount?.message}</p>
                                </div>
                                <div className="mb-4">
                                    <Input {...register("username")} className={input} placeholder="Tên người dùng" />
                                    <p className={error}>{errors.username?.message}</p>
                                </div>
                                <div className="mt-8 flex justify-center">
                                    <Button
                                        type="submit"
                                        className="flex gap-x-2 bg-color2 hover:bg-color3"
                                    >
                                        Tạo mã QR
                                    </Button>
                                </div>
                            </form>
                        </div>
                    }
                </div>
            </div>
        </section >
    );
}

export default NewTransaction;