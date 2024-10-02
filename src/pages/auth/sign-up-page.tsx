import { SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import MyButton from "@/components/commons/MyButton"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Link, useNavigate } from "react-router-dom"
import { FacebookIcon, GoogleIcon } from "@/components/icons/brands"
import { useState } from "react"
import { useMutation } from '@tanstack/react-query';
import { FormRegisterValues, User } from "@/types/user"
import axiosClient from "@/config"
import { useToast } from "@/hooks/use-toast"
import { differenceInYears } from "date-fns";
import { Button } from "@/components/ui/button"
import { ReloadIcon } from "@radix-ui/react-icons"

const schema = yup
    .object({
        Email: yup.string().email("Xin hãy nhập đúng cú pháp email").required("Xin hãy nhập thông tin"),
        Username: yup
            .string()
            .required("Xin hãy nhập thông tin")
            .max(8, "Username không được quá 8 ký tự"),
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

const social = "w-full bg-color1 text-white shadow shadow-color2 border-color2 border-[1px]";
const input = "w-full h-[48px] mb-2 text-white placeholder:text-white focus:outline-none focus:ring focus:border-color2";
const error = "text-sm text-red-400";

function SignUpPage() {
    const navigate = useNavigate();
    const { toast } = useToast();

    const registerUser = useMutation({
        mutationFn: (body: User) => axiosClient.post("/auth/register", body),
        onSuccess: () => {
            toast({ title: "Đăng ký thành công!", description: "Vui lòng đăng nhập để tiếp tục." });
            navigate("/sign-in");
        },
        onError: () => {
            toast({ variant: "destructive", title: "Đăng ký thất bại!", description: "Xin vui lòng thử lại." });
        },
    });

    const [isChecked, setIsChecked] = useState(false);

    const { setValue, register, handleSubmit, formState: { errors } } = useForm<FormRegisterValues>({
        defaultValues: { Dob: "2003-01-01" },
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<FormRegisterValues> = (data) => {
        const body: User = { ...data, IsServiceOwner: false };
        registerUser.mutate(body);
    }

    return (
        <section className="min-h-[calc(100vh-58px)] py-8 px-4 flex justify-center bg-[url('./assets/imgs/backgroundAuth.png')] bg-cover bg-center bg-color1">
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-md w-full mt-[-40px]">
                <div className="flex items-center justify-center">
                    <img className="w-[200px]" src="/logoFull.png" alt="Logo" />
                </div>
                <div className="mb-8 mt-[-20px] flex flex-col md:flex-row gap-4">
                    <MyButton classname={social} title="Google" icon={<GoogleIcon fill="white" height={20} width={20} />} type="button" />
                    <MyButton classname={social} title="Facebook" icon={<FacebookIcon fill="white" height={20} width={20} />} type="button" />
                </div>
                <div className="mb-4">
                    <Input {...register("Email")} className={input} placeholder="Email" />
                    <p className={error}>{errors.Email?.message}</p>
                </div>
                <div className="mb-4">
                    <Input {...register("Username")} className={input} placeholder="Tên người dùng" />
                    <p className={error}>{errors.Username?.message}</p>
                </div>
                <div className="mb-4">
                    <Input {...register("Password")} className={input} type="password" placeholder="Mật khẩu" />
                    <p className={error}>{errors.Password?.message}</p>
                </div>
                <div className="mb-4">
                    <Input
                        {...register("PhoneNumber")}
                        className={input}
                        placeholder="Số điện thoại"
                    />
                    <p className={error}>{errors.PhoneNumber?.message}</p>
                </div>
                <div className="mb-4">
                    <Select onValueChange={(value) => setValue('Location', value)}>
                        <SelectTrigger className={input}>
                            <SelectValue placeholder="Tỉnh/Thành phố" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Hồ Chí Minh">Hồ Chí Minh</SelectItem>
                        </SelectContent>
                    </Select>
                    <p className={error}>{errors.Location?.message}</p>
                </div>
                <div className="mb-4 flex flex-col sm:flex-row gap-x-2">
                    <div className="flex-1">
                        <Input {...register("Dob")} className={input} type="date" />
                        <p className={error}>{errors.Dob?.message}</p>
                    </div>
                    <div className="flex-1">
                        <Select onValueChange={(value) => setValue('Gender', value)}>
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
                <p className="flex items-center space-x-2 mb-4">
                    <Checkbox id="terms" onCheckedChange={() => setIsChecked(!isChecked)} />
                    <label htmlFor="terms" className="text-sm text-white font-medium">Tôi đồng ý với các <Link className="text-color2" to={"#"}>điều khoản</Link> và bảo mật cá nhân</label>
                </p>
                {registerUser.isPending ? (
                    <Button disabled className={`${social} mb-8`}>
                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                        Vui lòng chờ
                    </Button>
                ) : (
                    <MyButton classname={`${social} mb-8`} title="Đăng ký" type="submit" disabled={!isChecked} />
                )}
                <p className="flex gap-4 justify-center items-center text-sm text-white">
                    Bạn đã có tài khoản? <Link className="text-red-400" to={"/sign-in"}>Đăng nhập ngay</Link>
                </p>
            </form>
        </section>
    );
}

export default SignUpPage;
