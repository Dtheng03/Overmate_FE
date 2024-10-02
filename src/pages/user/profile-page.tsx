import axiosClient from "@/config";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { EditIcon } from "@/components/icons/commons";
import { differenceInYears } from "date-fns";
import { SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ReloadIcon } from "@radix-ui/react-icons";

interface Form {
    Username: string,
    Dob: string,
    Gender: string,
    Location: string,
    PhoneNumber: string
}

const schema = yup
    .object({
        Username: yup
            .string()
            .required("Xin hãy nhập thông tin")
            .max(8, "Username không được quá 8 ký tự"),
        Dob: yup
            .string()
            .required("Xin hãy nhập thông tin")
            .test("is-18", "Bạn phải đủ 18 tuổi", function (value) {
                return differenceInYears(new Date(), new Date(value)) >= 18;
            }),
        Gender: yup.string().required("Xin hãy nhập thông tin"),
        Location: yup.string().required("Xin hãy nhập thông tin"),
        PhoneNumber: yup
            .string()
            .required("Xin hãy nhập thông tin")
            .matches(/^[0-9]+$/, "Số điện thoại chỉ được chứa số") // Chỉ cho phép số
            .min(10, "Số điện thoại phải có ít nhất 10 chữ số")
            .max(11, "Số điện thoại không được quá 11 chữ số"), // Giới hạn độ dài
    })
    .required()

const card: string = "relative h-full bg-color1 p-[4%] rounded-[20px]";
const title: string = "mb-4 text-color4 text-xl font-bold text-center";
const content: string = "text-white";
const input = "w-full h-[48px] mb-2 text-white placeholder:text-white focus:outline-none focus:ring focus:border-color2";
const error = "text-sm text-red-400";

function ProfilePage() {
    const navigate = useNavigate();
    const username = localStorage.getItem("username") || undefined;
    const photoUrl = localStorage.getItem("photoUrl") || undefined;
    const [openUpdate, setOpenUpdate] = useState(false);

    const { data } = useQuery({
        queryKey: ['profile'],
        queryFn: () => axiosClient.get(`/auth/user`),
    });

    const updateUser = useMutation({
        mutationFn: (body: Form) => axiosClient.post("/auth/user", body),
        onSuccess: () => {
            toast({
                title: "Cập nhật thành công!",
                description: "Vui lòng đăng nhập lại để cập nhật dữ liệu",
            });
            localStorage.clear();
            navigate("/sign-in")
        },
        onError: () => {
            toast({
                variant: "destructive",
                title: "Cập nhật thất bại!",
                description: "Xin vui lòng thử lại.",
            });
        },
    });

    const { watch, setValue, register, handleSubmit, formState: { errors } } = useForm<Form>({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (data) {
            setValue("Username", data.data.value.username || username);
            setValue("Dob", `${data?.data?.value?.dob?.slice(0, 4)}-${data?.data?.value?.dob?.slice(5, 7)}-${data?.data?.value?.dob?.slice(8, 10)}`);
            setValue("Gender", data.data.value.gender || "");
            setValue("Location", data.data.value.location || "");
            setValue("PhoneNumber", data.data.value.phoneNumber || "");
        }
    }, [data, setValue, username]);

    const onSubmit: SubmitHandler<Form> = (data: Form) => {
        updateUser.mutate(data);
    }

    return (
        <section className="px-[10%] py-[5%] bg-color1 bg-[url('./assets/imgs/background.png')] bg-cover bg-center" >
            <h1 className="text-white font-extrabold text-3xl sm:text-4xl text-center">Xin chào, {username}</h1>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8">
                <img
                    className="w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] bg-color4 rounded-full"
                    src={photoUrl}
                    alt={username}
                    onError={(e) => {
                        e.currentTarget.src = "https://inkythuatso.com/uploads/thumbnails/800/2023/03/9-anh-dai-dien-trang-inkythuatso-03-15-27-03.jpg";
                    }}
                />
                {openUpdate ?
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[600px] p-0.5 rounded-[20px] bg-gradient-to-r from-[#011949] to-[#55A6CE]">
                        <div className={card}>
                            <h3 className="mb-4 text-white font-bold text-xl sm:text-2xl text-center">Cập nhật thông tin</h3>
                            <div className="mb-4">
                                <label className="text-white mt-2 font-bold">Tên người dùng:</label>
                                <Input {...register("Username")} className={input} placeholder="Tên người dùng" />
                                <p className={error}>{errors.Username?.message}</p>
                            </div>
                            <div className="mb-4 flex flex-col sm:flex-row gap-x-2">
                                <div className="flex-1">
                                    <label className="text-white mt-2 font-bold">Ngày sinh:</label>
                                    <Input {...register("Dob")} className={input} type="date" />
                                    <p className={error}>{errors.Dob?.message}</p>
                                </div>
                                <div className="flex-1">
                                    <label className="text-white mt-2 font-bold">Giới tính:</label>
                                    <Select
                                        value={watch("Gender")}
                                        onValueChange={(value) => setValue('Gender', value)}
                                    >
                                        <SelectTrigger className={input}>
                                            <SelectValue placeholder="Giới tính" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="female">Nữ</SelectItem>
                                            <SelectItem value="male">Nam</SelectItem>
                                            <SelectItem value="other">Khác</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <p className={error}>{errors.Gender?.message}</p>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="text-white mt-2 font-bold">Địa chỉ:</label>
                                <Select
                                    value={watch("Location")}
                                    onValueChange={(value) => setValue('Location', value)}
                                >
                                    <SelectTrigger className={input}>
                                        <SelectValue placeholder="Tỉnh/Thành phố" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Hồ Chí Minh">Hồ Chí Minh</SelectItem>
                                    </SelectContent>
                                </Select>
                                <p className={error}>{errors.Location?.message}</p>
                            </div>
                            <div className="mb-4">
                                <label className="text-white mt-2 font-bold">Điện thoại:</label>
                                <Input
                                    {...register("PhoneNumber")}
                                    className={input}
                                    placeholder="Số điện thoại"
                                />
                                <p className={error}>{errors.PhoneNumber?.message}</p>
                            </div>
                            <div className="flex justify-end gap-x-2">
                                <Button
                                    className="flex-1 lg:flex-none"
                                    type="reset"
                                    variant={"destructive"}
                                    onClick={() => { setOpenUpdate(!openUpdate) }}
                                >
                                    Hủy
                                </Button>
                                {updateUser.isPending ? (
                                    <Button disabled className="flex-1 lg:flex-none">
                                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                        Vui lòng chờ
                                    </Button>
                                ) : (
                                    <Button
                                        type="submit"
                                        className="flex-1 lg:flex-none bg-color2 hover:bg-color3"
                                    >
                                        Cập nhật
                                    </Button>)
                                }
                            </div>
                        </div>
                    </form>
                    :
                    <div className="w-full max-w-[600px] p-0.5 rounded-[20px] bg-gradient-to-r from-[#011949] to-[#55A6CE]">
                        <div className={card}>
                            <Button
                                className="absolute top-[8px] right-[8px] bg-color2 hover:bg-color3"
                                size={"icon"}
                                onClick={() => { setOpenUpdate(!openUpdate) }}
                            >
                                <EditIcon fill="white" width={20} height={20} />
                            </Button>
                            <h3 className="mb-4 text-white font-bold text-xl sm:text-2xl text-center">Thông tin cá nhân</h3>
                            <p className="text-white mt-2 font-bold">Tên người dùng:
                                <span className="ml-4 font-normal">{username}</span>
                            </p>
                            <p className="text-white mt-2 font-bold">Email:
                                <span className="ml-4 font-normal">{data?.data?.value?.email}</span>
                            </p>
                            <div className="flex justify-between">
                                <p className="text-white mt-2 font-bold">Ngày sinh:
                                    <span className="ml-4 font-normal">{data?.data?.value?.dob?.slice(8, 10)}/{data?.data?.value?.dob?.slice(5, 7)}/{data?.data?.value?.dob?.slice(0, 4)}</span>
                                </p>
                                <p className="w-[220px] text-white mt-2 font-bold">Giới tính:
                                    <span className="ml-4 font-normal">
                                        {data?.data?.value?.gender == "male" && "Nam"}
                                        {data?.data?.value?.gender == "female" && "Nữ"}
                                        {data?.data?.value?.gender == "other" && "Khác"}
                                    </span>
                                </p>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-white mt-2 font-bold">Địa chỉ:
                                    <span className="ml-4 font-normal">{data?.data?.value?.location}</span>
                                </p>
                                <p className="w-[220px] text-white mt-2 font-bold">Điện thoại:
                                    <span className="ml-4 font-normal">{data?.data?.value?.phoneNumber}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                }
            </div>
            <div className="mt-12 flex flex-col lg:flex-row justify-evenly gap-8">
                <div className="basis-full lg:basis-[30%] p-0.5 rounded-[20px] bg-gradient-to-r from-[#011949] to-[#55A6CE]">
                    <div className={card}>
                        <h3 className={title}>THẦN SỐ HỌC</h3>
                        <div className={content}>
                            {data?.data?.value?.numerology?.split(' | ').map((item: any, index: number) => (
                                <span key={index}>
                                    - {item}
                                    <br />
                                    <br />
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="basis-full lg:basis-[30%] p-0.5 rounded-[20px] bg-gradient-to-r from-[#011949] to-[#55A6CE]">
                    <div className={card}>
                        <h3 className={title}>CUNG HOÀNG ĐẠO</h3>
                        <div className={content}>
                            {data?.data?.value?.zodiac?.split(' | ').map((item: any, index: number) => (
                                <span key={index}>
                                    - {item}
                                    <br />
                                    <br />
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="basis-full lg:basis-[30%] p-0.5 rounded-[20px] bg-gradient-to-r from-[#011949] to-[#55A6CE]">
                    <div className={card}>
                        <h3 className={title}>MBTI</h3>
                        <div className={content}>
                            {data?.data?.value?.mbti == "Bạn cần phải trả lời các câu hỏi đánh giá tính các MBTI"
                                ? data?.data?.value?.mbti
                                :
                                data?.data?.value?.mbti?.split(' | ').map((item: any, index: number) => (
                                    <span key={index}>
                                        - {item}
                                        <br />
                                        <br />
                                    </span>
                                ))
                            }
                            {data?.data?.value?.mbti == "Bạn cần phải trả lời các câu hỏi đánh giá tính các MBTI" &&
                                <div className="mt-12 flex justify-center">
                                    <Button className="bg-color2 hover:bg-color3" onClick={() => { sessionStorage.setItem("mbtiTest", "approved") }}>
                                        <Link to={"/mbti-test"}>Làm bài kiểm tra</Link>
                                    </Button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
}

export default ProfilePage;
