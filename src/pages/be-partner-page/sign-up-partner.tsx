import { SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import MyButton from "@/components/commons/MyButton"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Link } from "react-router-dom"
import { useState } from "react"

interface FormValues {
    email: string,
    phone: string,
    name: string,
    password: string,
    retypePassword: string,
}

const schema = yup
    .object({
        email: yup.string().required("Xin hãy nhập thông tin"),
        phone: yup.string().required("Xin hãy nhập thông tin"),
        name: yup.string().required("Xin hãy nhập thông tin"),
        password: yup.string().required("Xin hãy nhập thông tin"),
        retypePassword: yup.string().required("Xin hãy nhập thông tin"),
    })
    .required()

const input: string = "w-[400px] h-[48px] mb-2";
const error: string = "text-sm text-red-400";

function SignUpPartner() {
    const [isChecked, setIsChecked] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: yupResolver(schema),
    })
    const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data)

    return (
        <section className="min-h-[calc(100vh-58px)] py-8 flex items-center justify-center">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex items-center justify-center gap-x-[4px] text-color2 font-bold">
                    <img className="h-[40px] w-[50px]" src="/About1.png" alt="Logo" />
                    OVERMATE
                </div>
                <h2 className="my-4 text-xl font-semibold text-center">
                    Đăng kí tài khoản đối tác
                </h2>
                <div className="mb-4">
                    <Input
                        {...register("email")}
                        className={input}
                        placeholder="Nhập email"
                    />
                    <p className={error}>{errors.email?.message}</p>
                </div>
                <div className="mb-4">
                    <Input
                        {...register("phone")}
                        className={input}
                        placeholder="Nhập số điện thoại"
                    />
                    <p className={error}>{errors.phone?.message}</p>
                </div>
                <div className="mb-4">
                    <Input
                        {...register("name")}
                        className={input}
                        placeholder="Tên doanh nghiệp "
                    />
                    <p className={error}>{errors.name?.message}</p>
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
                <div className="mb-4">
                    <Input
                        {...register("retypePassword")}
                        className={input}
                        type="password"
                        placeholder="Nhập lại mật khẩu"
                    />
                    <p className={error}>{errors.retypePassword?.message}</p>
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
                <MyButton classname="w-full mb-8" title="Đăng ký" disabled={!isChecked} />
                <p className="flex gap-x-4 justify-center items-center text-sm">
                    Bạn đã có tài khoản?
                    <Link className="text-red-400" to={"/sign-in"}>Đăng nhập ngay</Link>
                </p>
            </form>
        </section >
    );
}

export default SignUpPartner;