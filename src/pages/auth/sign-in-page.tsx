import * as yup from "yup";
import axiosClient from "@/config";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { FormLoginValues } from "@/types/user";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import MyButton from "@/components/commons/MyButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { FacebookIcon, GoogleIcon } from "@/components/icons/brands";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
    [key: string]: any;
}

const schema = yup
    .object({
        Email: yup.string().required("Xin hãy nhập thông tin"),
        Password: yup.string().required("Xin hãy nhập thông tin"),
    })
    .required();

const social: string = "w-full bg-color1 text-white shadow shadow-color2 border-color2 border-[1px] flex items-center justify-center py-2";
const input: string = "w-full h-[48px] mb-2 text-white placeholder:text-white focus:outline-none focus:ring focus:border-color2 px-4";
const error: string = "text-sm text-red-400";

export default function SignInPage() {
    const navigate = useNavigate();
    const { toast } = useToast();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormLoginValues>({
        resolver: yupResolver(schema),
    });

    const loginUser = useMutation({
        mutationFn: (body: FormLoginValues) => axiosClient.post("/auth/login", body),
        onSuccess: (data: any) => {
            toast({
                title: "Đăng nhập thành công!",
                description: "Chào mừng đến với OVERMATE.",
            });
            const decoded: JwtPayload = jwtDecode(data?.data?.value?.accessToken);
            localStorage.setItem("token", data?.data?.value?.accessToken);
            localStorage.setItem("username", data?.data?.value?.username);
            localStorage.setItem("photoUrl", data?.data?.value?.photoUrl);
            localStorage.setItem(
                "userId",
                decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
            );
            localStorage.setItem("role", decoded["role"]);
            const history = sessionStorage.getItem("history");

            if (decoded["role"]?.[1] == "ServiceOwner") {
                navigate("/partner");
            } else if (decoded["role"] == "Admin") {
                navigate("/admin");
            } else if (history) {
                navigate(history);
                sessionStorage.clear();
            } else {
                navigate("/");
            }
        },
        onError: () => {
            toast({
                variant: "destructive",
                title: "Đăng nhập thất bại!",
                description: "Xin vui lòng thử lại.",
            });
        },
    });

    const onSubmit: SubmitHandler<FormLoginValues> = (data) => {
        loginUser.mutate(data);
    };

    return (
        <section className="min-h-[calc(100vh-58px)] py-8 px-4 flex justify-center bg-[url('./assets/imgs/backgroundAuth.png')] bg-cover bg-center bg-color1">
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-md w-full mt-[-40px]">
                <div className="flex items-center justify-center">
                    <img className="w-[200px]" src="/logoFull.png" alt="Logo" />
                </div>
                <div className="mb-8 mt-[-20px] flex flex-col gap-4 md:flex-row">
                    <MyButton
                        classname={social}
                        title="Google"
                        icon={<GoogleIcon fill="white" height={20} width={20} />}
                        type="button"
                    />
                    <MyButton
                        classname={social}
                        title="Facebook"
                        icon={<FacebookIcon fill="white" height={20} width={20} />}
                        type="button"
                    />
                </div>
                <div className="mb-4">
                    <Input
                        {...register("Email")}
                        className={input}
                        placeholder="Nhập email"
                    />
                    <p className={error}>{errors.Email?.message}</p>
                </div>
                <div className="mb-4">
                    <Input
                        {...register("Password")}
                        className={input}
                        type="password"
                        placeholder="Nhập mật khẩu"
                    />
                    <p className={error}>{errors.Password?.message}</p>
                </div>
                <p className="text-right mb-2 text-white">
                    <Link className="text-sm" to={"/forgot-password"}>Quên mật khẩu?</Link>
                </p>
                {loginUser.isPending ? (
                    <Button disabled className={`${social} mb-8`}>
                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                        Vui lòng chờ
                    </Button>
                ) : (
                    <MyButton
                        classname={`${social} mb-8`}
                        title="Đăng nhập"
                        type="submit"
                    />
                )}
                <p className="flex gap-x-4 justify-center items-center text-sm text-white">
                    Bạn chưa có tài khoản?
                    <Link className="text-red-400" to={"/sign-up"}>Đăng ký ngay</Link>
                </p>
            </form>
        </section>
    );
}
