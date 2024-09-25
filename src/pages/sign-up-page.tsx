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
import { Link } from "react-router-dom"
import { FacebookIcon, GoogleIcon } from "@/components/icons/brands"
import { useState } from "react"

interface FormValues {
    username: string,
    phoneOrEmail: string,
    password: string,
    retypePassword: string,
    dob: string,
    gender: string,
    city: string,
    district: string,
}

const schema = yup
    .object({
        username: yup.string().required("Xin hãy nhập thông tin"),
        phoneOrEmail: yup.string().required("Xin hãy nhập thông tin"),
        password: yup.string().required("Xin hãy nhập thông tin"),
        retypePassword: yup.string().required("Xin hãy nhập thông tin"),
        dob: yup.string().required("Xin hãy nhập thông tin"),
        gender: yup.string().required("Xin hãy nhập thông tin"),
        city: yup.string().required("Xin hãy nhập thông tin"),
        district: yup.string().required("Xin hãy nhập thông tin"),
    })
    .required()

const social: string = "basis-1/2 w-full bg-color1 text-white shadow shadow-color2 border-color2 border-[1px]";
const input: string = "w-[400px] h-[48px] mb-2 text-white placeholder:text-white focus:outline-none focus:ring focus:border-color2";
const inputSm: string = "h-[48px] mb-2 text-white placeholder:text-white focus:outline-none focus:ring focus:border-color2 ";
const error: string = "text-sm text-red-400";

function SignUpPage() {
    const [isChecked, setIsChecked] = useState<boolean>(false);

    const {
        setValue,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: {
            dob: "2003-01-01",
        },
        resolver: yupResolver(schema),
    })
    const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data)

    return (
        <section className="min-h-[calc(100vh-58px)] py-8 flex justify-center bg-[url('./assets/imgs/backgroundAuth.png')] bg-cover bg-center bg-color1">
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
                        {...register("username")}
                        className={input}
                        placeholder="Tên đăng nhập"
                    />
                    <p className={error}>{errors.username?.message}</p>
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
                <div className="mb-4">
                    <Input
                        {...register("retypePassword")}
                        className={input}
                        type="password"
                        placeholder="Nhập lại mật khẩu"
                    />
                    <p className={error}>{errors.retypePassword?.message}</p>
                </div>
                <div className="mb-4 flex gap-x-2">
                    <div className="basis-1/2">
                        <Input
                            {...register("dob")}
                            className={inputSm}
                            type="date"
                        />
                        <p className={error}>{errors.dob?.message}</p>
                    </div>
                    <div className="basis-1/2"  >
                        <Select onValueChange={(value) => setValue('gender', value)}>
                            <SelectTrigger
                                className={inputSm}
                                {...register("gender")}
                            >
                                <SelectValue placeholder="Giới tính" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Nữ">Nữ</SelectItem>
                                <SelectItem value="Nam">Nam</SelectItem>
                            </SelectContent>
                        </Select>
                        <p className={error}>{errors.gender?.message}</p>
                    </div>
                </div>
                <div className="mb-4 flex gap-x-2">
                    <div className="basis-1/2">
                        <Select onValueChange={(value) => setValue('city', value)}>
                            <SelectTrigger
                                className={inputSm}
                                {...register("city")}
                            >
                                <SelectValue placeholder="Tỉnh/Thành phố" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Hà Nội">Hà Nội</SelectItem>
                                <SelectItem value="Hồ Chí Minh">Hồ Chí Minh</SelectItem>
                            </SelectContent>
                        </Select>
                        <p className={error}>{errors.city?.message}</p>
                    </div>
                    <div className="basis-1/2"  >
                        <Select onValueChange={(value) => setValue('district', value)}>
                            <SelectTrigger
                                className={inputSm}
                                {...register("district")}
                            >
                                <SelectValue placeholder="Quận/Huyện" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Quận">Quận</SelectItem>
                                <SelectItem value="Huyện">Huyện</SelectItem>
                            </SelectContent>
                        </Select>
                        <p className={error}>{errors.city?.message}</p>
                    </div>
                </div>
                <p className="flex items-center space-x-2 mb-4">
                    <Checkbox id="terms" onCheckedChange={() => { setIsChecked(!isChecked) }} />
                    <label
                        htmlFor="terms"
                        className="text-sm text-white font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Tôi đồng ý với các <Link className="text-color2" to={"#"}>điều khoản</Link> và bảo mật cá nhân
                    </label>
                </p>
                <MyButton
                    classname={`${social} mb-8`}
                    title="Đăng ký"
                    type="submit"
                    disabled={!isChecked}
                />
                <p className="flex gap-x-4 justify-center items-center text-sm text-white">
                    Bạn đã có tài khoản?
                    <Link className="text-red-400" to={"/sign-in"}>Đăng nhập ngay</Link>
                </p>
            </form>
        </section >
    );
}

export default SignUpPage;