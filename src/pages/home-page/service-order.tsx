import * as yup from "yup";
import axiosClient from "@/config";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { ClockIcon, LocationIcon, StarIcon } from "@/components/icons/commons";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Form {
    Address: string;
    BookingDate: string;
    slot: string;
}

const schema = yup
    .object({
        Address: yup.string().required("Xin hãy nhập thông tin"),
        BookingDate: yup
            .string()
            .required("Xin hãy nhập thông tin")
            .test(
                "is-tomorrow-or-later",
                "Ngày đặt phải từ ngày mai trở đi",
                (value) => {
                    const today = new Date();
                    const tomorrow = new Date(today);
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    const bookingDate = new Date(value);
                    return bookingDate >= tomorrow;
                }
            ),
        slot: yup.string().required("Xin hãy nhập thông tin"),
    })
    .required();

const section = "px-4 md:px-[8%] py-[5%] min-h-[calc(100vh-58px)] flex flex-col items-center bg-color1 bg-[url('./assets/imgs/background.png')] bg-cover bg-center";
const h1 = "mb-8 md:mb-12 text-center text-white text-2xl md:text-3xl font-extrabold uppercase";
const border = "my-4 p-0.5 rounded-[20px] bg-gradient-to-b from-[#011949] to-[#55A6CE] shadow-md shadow-slate-600";
const card = "flex flex-col gap-[36px] bg-color1 py-[20px] px-[36px] rounded-[20px] max-w-full w-full md:w-auto";
const img = "w-[400px] h-[400px] object-cover bg-color4 rounded-[20px]";
const input = "w-full h-[48px] mb-2 text-white placeholder:text-white focus:outline-none focus:ring focus:border-color2";
const error = "text-sm text-red-400";

const slot = [
    { value: "07h00", text: "07h00" },
    { value: "08h00", text: "08h00" },
    { value: "09h00", text: "09h00" },
    { value: "10h00", text: "10h00" },
    { value: "11h00", text: "11h00" },
    { value: "12h00", text: "12h00" },
    { value: "13h00", text: "13h00" },
    { value: "14h00", text: "14h00" },
    { value: "15h00", text: "15h00" },
    { value: "16h00", text: "16h00" },
    { value: "17h00", text: "17h00" },
    { value: "18h00", text: "18h00" },
    { value: "19h00", text: "19h00" },
];

function ServiceOrder() {
    const params = useParams();
    const navigate = useNavigate();

    const { data } = useQuery({
        queryKey: ['user-service-details'],
        queryFn: () => axiosClient.get(`/service/${params.serviceId}`),
    });

    const createOrder = useMutation({
        mutationFn: (body: any) => axiosClient.post("/order", body),
        onSuccess: () => {
            toast({
                title: "Đặt lịch thành công!",
                description: "Đơn vị thực hiện sẽ liên hệ với bạn",
            });
        },
        onError: () => {
            toast({
                variant: "destructive",
                title: "Đặt lịch thất bại!",
                description: "Xin vui lòng thử lại.",
            });
        },
    });

    const { watch, setValue, register, handleSubmit, formState: { errors } } = useForm<Form>({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<Form> = (data: Form) => {
        const finalData = {
            ...data,
            ServiceId: params.serviceId,
        };
        createOrder.mutate(finalData);
    };

    return (
        <section className={section}>
            <h1 className={h1}>Đặt dịch vụ</h1>
            <div className="w-full flex flex-col lg:flex-row gap-y-8 lg:gap-x-12">
                <div className={border}>
                    <div className={card}>
                        <img className={img} src={data?.data?.value?.photos?.imageUrl} alt={data?.data?.value?.name} />
                        <div className="w-full md:w-[400px] flex-1">
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
                            <p className={"font-bold text-sm text-white mt-8"}>
                                Mô tả chi tiết:
                            </p>
                            <p className="text-sm text-white text-justify">{data?.data?.value?.description}</p>
                        </div>
                    </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="flex-1 h-fit my-4 p-0.5 rounded-[20px] bg-gradient-to-r from-[#011949] to-[#55A6CE] shadow-md shadow-slate-600">
                    <div className={card}>
                        <h3 className="mb-4 text-white font-bold text-xl sm:text-2xl text-center">Thông tin đặt lịch</h3>
                        <div className="mb-4">
                            <label className="text-white mt-2 font-bold">Địa chỉ thực hiện dịch vụ:</label>
                            <Input {...register("Address")} className={input} placeholder="Nhập địa chỉ chính xác" />
                            <p className={error}>{errors.Address?.message}</p>
                        </div>
                        <div className="mb-4 flex flex-col sm:flex-row gap-x-2">
                            <div className="flex-1">
                                <label className="text-white mt-2 font-bold">Ngày thực hiện:</label>
                                <Input {...register("BookingDate")} className={input} type="date" />
                                <p className={error}>{errors.BookingDate?.message}</p>
                            </div>
                            <div className="flex-1">
                                <label className="text-white mt-2 font-bold">Thời gian:</label>
                                <Select
                                    value={watch("slot")}
                                    onValueChange={(value) => setValue("slot", value)}
                                >
                                    <SelectTrigger className={input}>
                                        <SelectValue placeholder="Chọn thời gian" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {slot?.map((item, index) => (
                                            <SelectItem key={index} value={item?.value}>
                                                {item?.text}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <p className={error}>{errors.slot?.message}</p>
                            </div>
                        </div>
                        <div className="flex justify-end gap-x-2">
                            <Button
                                className="flex-1 lg:flex-none"
                                type="reset"
                                variant={"destructive"}
                                onClick={() => {
                                    navigate(-1);
                                }}
                            >
                                Hủy
                            </Button>
                            {createOrder.isPending ? (
                                <Button disabled className="flex-1 lg:flex-none">
                                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                    Vui lòng chờ
                                </Button>
                            ) : (
                                <Button
                                    type="submit"
                                    className="flex-1 lg:flex-none bg-color2 hover:bg-color3"
                                >
                                    Đặt lịch
                                </Button>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default ServiceOrder;
