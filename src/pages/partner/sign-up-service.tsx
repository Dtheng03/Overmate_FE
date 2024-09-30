import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import MyButton from "@/components/commons/MyButton";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useMutation, useQuery } from "@tanstack/react-query";
import axiosClient from "@/config";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";

interface FormValues {
    CategoryId: string;
    Name: string;
    Description: string;
    Price: number;
    Duration: number;
}

const schema = yup
    .object({
        CategoryId: yup.string().required("Xin hãy nhập thông tin"),
        Name: yup.string().required("Xin hãy nhập thông tin"),
        Description: yup.string().required("Xin hãy nhập thông tin"),
        Price: yup.number().integer("Giá phải là số nguyên").required("Xin hãy nhập thông tin"),
        Duration: yup.number().required("Xin hãy nhập thông tin").min(0, "Thời gian không hợp lệ"),
    })
    .required();

const input: string = "w-[400px] h-[48px] mb-2";
const error: string = "text-sm text-red-400";

function SignUpService() {
    const { toast } = useToast();
    const navigate = useNavigate();
    const [img, setImg] = useState(null);
    const userId = localStorage.getItem("userId");

    const { data } = useQuery({
        queryKey: ['category'],
        queryFn: () => axiosClient.get("/servicecategory"),
    });

    const createService = useMutation({
        mutationFn: (formData: FormData) => {
            return axiosClient.post("/service", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        },
        onSuccess: () => {
            toast({
                title: "Đăng ký thành công!",
                description: "Vào dịch vụ của tôi để xem chi tiết",
            });
            navigate("/partner");
        },
        onError: () => {
            toast({
                variant: "destructive",
                title: "Đăng ký thất bại!",
                description: "Xin vui lòng thử lại.",
            });
        },
    });

    const {
        setValue,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        const formData = new FormData();
        formData.append('CategoryId', data.CategoryId);
        formData.append('Name', data.Name);
        formData.append('Description', data.Description);
        formData.append('Price', data.Price.toString());
        formData.append('Duration', data.Duration.toString());
        if (img) {
            formData.append('ImageFile', img);
        } else {
            toast({
                variant: "destructive",
                title: "Đăng ký thất bại!",
                description: "Xin vui lòng thử lại.",
            });
        }
        if (userId) {
            formData.append('UserId', userId);
        } else {
            toast({
                variant: "destructive",
                title: "Đăng ký thất bại!",
                description: "Xin vui lòng thử lại.",
            });
        }

        createService.mutate(formData);
    };

    return (
        <section className="min-h-[calc(100vh-58px)] py-8 flex justify-center">
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-[816px]">
                <h1 className="my-4 text-2xl font-bold text-center text-color1">
                    Đăng ký dịch vụ
                </h1>
                <h3 className="text-color4 text-xl font-bold">Xin chào!</h3>
                <p className="italic">Để bắt đầu, Quý vị có thể cung cấp những thông tin cơ bản dưới đây. Quý vị có thể sửa lại mục này sau nếu cần.</p>
                <h2 className="my-4 text-xl font-bold text-center text-color1">Thông tin cơ bản</h2>
                <div className="flex flex-wrap gap-x-4">
                    <div className="mb-4 flex-1">
                        <Select onValueChange={(value) => setValue('CategoryId', value)}>
                            <SelectTrigger className={input} {...register("CategoryId")}>
                                <SelectValue placeholder="Loại dịch vụ" />
                            </SelectTrigger>
                            <SelectContent>
                                {data?.data?.value?.map((category: any) => (
                                    <SelectItem key={category.serviceCateId} value={category.serviceCateId}>
                                        {category.categoryName}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <p className={error}>{errors.CategoryId?.message}</p>
                    </div>
                    <div className="mb-4 flex-1">
                        <Input {...register("Name")} className={input} placeholder="Tên dịch vụ" />
                        <p className={error}>{errors.Name?.message}</p>
                    </div>
                    <div className="mb-4 flex-1">
                        <Input {...register("Description")} className={input} placeholder="Mô tả về dịch vụ" />
                        <p className={error}>{errors.Description?.message}</p>
                    </div>
                    <div className="mb-4 flex-1">
                        <Input {...register("Duration")} className={input} type="number" placeholder="Thời gian thực hiện dịch vụ" />
                        <p className={error}>{errors.Duration?.message}</p>
                    </div>
                    <div className="mb-4 flex-1">
                        <Input {...register("Price")} className={input} type="number" placeholder="Giá 1 gói dịch vụ" />
                        <p className={error}>{errors.Price?.message}</p>
                    </div>
                    <div className="mb-4 flex-1">
                        <Input
                            className={input}
                            type="file"
                            accept="image/*"
                            onChange={(e: any) => { setImg(e.target.files?.[0]) }}
                        />
                        {!img ? <p className={`${error} text-center`}>{"Hãy thêm 1 hình ảnh"}</p> : ""}
                    </div>
                </div>
                <div className="flex justify-end">
                    {createService.isPending
                        ?
                        <Button disabled>
                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                            Vui lòng chờ
                        </Button>
                        :
                        <MyButton title="Đăng ký" />}
                </div>
            </form>
        </section>
    );
}

export default SignUpService;