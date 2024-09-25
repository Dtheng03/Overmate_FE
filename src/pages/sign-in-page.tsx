import * as yup from "yup"
import { Link } from "react-router-dom"
import { Input } from "@/components/ui/input"
import MyButton from "@/components/commons/MyButton"
import { yupResolver } from "@hookform/resolvers/yup"
import { SubmitHandler, useForm } from "react-hook-form"
import { FacebookIcon, GoogleIcon } from "@/components/icons/brands"

interface FormValues {
    phoneOrEmail: string,
    password: string
}

const schema = yup
    .object({
        phoneOrEmail: yup.string().required("Xin hãy nhập thông tin"),
        password: yup.string().required("Xin hãy nhập thông tin"),
    })
    .required()

const social: string = "basis-1/2 w-full bg-color1 text-white shadow shadow-color2 border-color2 border-[1px]";
const input: string = "w-[400px] h-[48px] mb-2 text-white placeholder:text-white focus:outline-none focus:ring focus:border-color2 ";
const error: string = "text-sm text-red-400";

function SignInPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: yupResolver(schema),
    })
    const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data)

    return (
        <section className="h-[calc(100vh-58px)] py-8 flex justify-center bg-[url('./assets/imgs/backgroundAuth.png')] bg-cover bg-center bg-color1">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex items-center justify-center gap-x-2 text-color2 font-bold">
                    <img className="h-[40px] w-[50px]" src="/About1.png" alt="Logo" />
                    OVERMATE
                </div>
                <div className="my-8 flex gap-x-4">
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
                        {...register("phoneOrEmail")}
                        className={input}
                        placeholder="Nhập số điện thoại/ email"
                    />
                    <p className={error}>{errors.phoneOrEmail?.message}</p>
                </div>
                <div className="mb-4">
                    <Input
                        {...register("password")}
                        className={input}
                        type="password"
                        placeholder="Nhập mật khẩu"
                    />
                    <p className={error}>{errors.password?.message}</p>
                </div>
                <p className="text-right mb-2 text-white">
                    <Link className="text-sm" to={"/forgot-password"}>Quên mật khẩu?</Link>
                </p>
                <MyButton
                    classname={`${social} mb-8`}
                    title="Đăng nhập"
                    type="submit"
                />
                <p className="flex gap-x-4 justify-center items-center text-sm text-white">
                    Bạn chưa có tài khoản?
                    <Link className="text-red-400" to={"/sign-up"}>Đăng ký ngay</Link>
                </p>
            </form>
        </section >
    );
}

export default SignInPage;