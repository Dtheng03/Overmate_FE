import { SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import MyButton from "@/components/commons/MyButton"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { FormRegisterValues, User } from "@/types/user"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { differenceInYears } from "date-fns"
import { useMutation } from "@tanstack/react-query"
import { useToast } from "@/hooks/use-toast"
import axiosClient from "@/config"
import { Button } from "@/components/ui/button"
import { ReloadIcon } from "@radix-ui/react-icons"

const schema = yup
    .object({
        Email: yup.string().email("Xin hãy nhập đúng cú pháp email").required("Xin hãy nhập thông tin"),
        Username: yup
            .string()
            .required("Xin hãy nhập thông tin")
            .max(8, "Username không được quá 8 ký tự"), // Giới hạn độ dài username
        Password: yup
            .string()
            .required("Xin hãy nhập thông tin")
            .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
            .matches(/[A-Z]/, "Mật khẩu phải chứa ít nhất một chữ cái viết hoa")
            .matches(/[a-z]/, "Mật khẩu phải chứa ít nhất một chữ cái thường")
            .matches(/\d/, "Mật khẩu phải chứa ít nhất một chữ số"),
        Dob: yup
            .string()
            .required("Xin hãy nhập thông tin")
            .test("is-18", "Bạn phải đủ 18 tuổi", function (value) {
                return differenceInYears(new Date(), new Date(value)) >= 18;
            }), // Kiểm tra tuổi phải đủ 18
        Gender: yup.string().required("Xin hãy nhập thông tin"),
        Location: yup.string().required("Xin hãy nhập thông tin"),
    })
    .required()

const input: string = "w-[400px] h-[48px] mb-2";
const inputSm: string = "h-[48px] mb-2 ";
const error: string = "text-sm text-red-400";

function SignUpPartner() {
    const navigate = useNavigate();
    const { toast } = useToast();

    const registerPartner = useMutation({
        mutationFn: (body: User) => { return axiosClient.post("/auth/register", body) },
        onSuccess: () => {
            toast({
                title: "Đăng ký thành công!",
                description: "Vui lòng đăng nhập để tiếp tục.",
            })
            navigate("/sign-in")
        },
        onError: () => {
            toast({
                variant: "destructive",
                title: "Đăng ký thất bại!",
                description: "Xin vui lòng thử lại.",
            })
        },
    });

    const [isChecked, setIsChecked] = useState<boolean>(false);

    const {
        setValue,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormRegisterValues>({
        defaultValues: {
            Dob: "2003-01-01",
        },
        resolver: yupResolver(schema),
    })

    const onSubmit: SubmitHandler<FormRegisterValues> = (data) => {
        const body: User = {
            ...data,
            IsServiceOwner: true
        }
        registerPartner.mutate(body)
    }

    return (
        <section className="min-h-[calc(100vh-58px)] py-8 flex items-center justify-center">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex items-center justify-center gap-x-[4px] text-color2 font-bold">
                    <img className="h-[40px] w-[50px]" src="/About1.png" alt="Logo" />
                    OVERMATE
                </div>
                <h2 className="my-4 text-xl font-semibold text-center">
                    Đăng ký tài khoản đối tác
                </h2>
                <div className="mb-4">
                    <Input
                        {...register("Email")}
                        className={input}
                        placeholder="Email"
                    />
                    <p className={error}>{errors.Email?.message}</p>
                </div>
                <div className="mb-4">
                    <Input
                        {...register("Username")}
                        className={input}
                        placeholder="Tên người dùng"
                    />
                    <p className={error}>{errors.Username?.message}</p>
                </div>
                <div className="mb-4">
                    <Input
                        {...register("Password")}
                        className={input}
                        type="password"
                        placeholder="Mật khẩu"
                    />
                    <p className={error}>{errors.Password?.message}</p>
                </div>
                <div className="mb-4">
                    <Select onValueChange={(value) => setValue('Location', value)}>
                        <SelectTrigger
                            className={inputSm}
                            {...register("Location")}
                        >
                            <SelectValue placeholder="Tỉnh/Thành phố" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Hồ Chí Minh">Hồ Chí Minh</SelectItem>
                        </SelectContent>
                    </Select>
                    <p className={error}>{errors.Location?.message}</p>
                </div>
                <div className="mb-4 flex gap-x-2">
                    <div className="basis-1/2">
                        <Input
                            {...register("Dob")}
                            className={inputSm}
                            type="date"
                        />
                        <p className={error}>{errors.Dob?.message}</p>
                    </div>
                    <div className="basis-1/2"  >
                        <Select onValueChange={(value) => setValue('Gender', value)}>
                            <SelectTrigger
                                className={inputSm}
                                {...register("Gender")}
                            >
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
                <p className="w-[400px] flex items-center space-x-2 mb-4">
                    <Checkbox id="terms" onCheckedChange={() => { setIsChecked(!isChecked) }} />
                    <label
                        htmlFor="terms"
                        className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Bằng cách đăng ký, bạn xác nhận rằng bạn đồng ý với việc <span className="text-color2">Overmate</span> lưu trữ và xử lý dữ liệu doanh nghiệp của bạn như được mô tả trong Chính sách <span className="text-color2">quyền riêng tư</span> của chúng tôi.
                    </label>
                </p>
                {registerPartner.isPending ?
                    <Button disabled className={`w-full mb-8`}>
                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                        Vui lòng chờ
                    </Button>
                    :
                    <MyButton classname="w-full mb-8" title="Đăng ký" disabled={!isChecked} />}
                <p className="flex gap-x-4 justify-center items-center text-sm">
                    Bạn đã có tài khoản?
                    <Link className="text-red-400" to={"/sign-in"}>Đăng nhập ngay</Link>
                </p>
            </form>
        </section >
    );
}

export default SignUpPartner;