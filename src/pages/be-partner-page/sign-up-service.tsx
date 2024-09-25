import { SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import MyButton from "@/components/commons/MyButton"
import { Input } from "@/components/ui/input"

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

function SignUpService() {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: yupResolver(schema),
    })
    const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data)

    return (
        <section className="min-h-[calc(100vh-58px)] py-8 flex justify-center">
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-[816px]">
                <h1 className="my-4 text-2xl font-bold text-center text-color1">
                    Đăng ký dịch vụ
                </h1>
                <h3 className="text-color4 text-xl font-bold">Xin chào!</h3>
                <p className="italic">Để bắt đầu, Qúy vị có thể cung cấp những thông tin cơ bản dưới đây. Quý vị có thể sửa lại mục này sau nếu cần.</p>
                <h2 className="my-4 text-xl font-bold text-center text-color1">Thông tin cơ bản</h2>
                <div className="flex flex-wrap gap-x-4">
                    <div className="mb-4 flex-1">
                        <Input
                            {...register("email")}
                            className={input}
                            placeholder="Nhập email"
                        />
                        <p className={error}>{errors.email?.message}</p>
                    </div>
                    <div className="mb-4 flex-1">
                        <Input
                            {...register("phone")}
                            className={input}
                            placeholder="Nhập số điện thoại"
                        />
                        <p className={error}>{errors.phone?.message}</p>
                    </div>
                    <div className="mb-4 flex-1">
                        <Input
                            {...register("name")}
                            className={input}
                            placeholder="Tên doanh nghiệp "
                        />
                        <p className={error}>{errors.name?.message}</p>
                    </div>
                    <div className="mb-4 flex-1">
                        <Input
                            {...register("password")}
                            className={input}
                            type="password"
                            placeholder="Nhập mật khẩu"
                        />
                        <p className={error}>{errors.password?.message}</p>
                    </div>
                    <div className="mb-4 flex-1">
                        <Input
                            {...register("retypePassword")}
                            className={input}
                            type="password"
                            placeholder="Nhập lại mật khẩu"
                        />
                        <p className={error}>{errors.retypePassword?.message}</p>
                    </div>
                </div>
                <div className="flex justify-end" >
                    <MyButton title="Đăng ký" />
                </div>
            </form>
        </section >
    );
}

export default SignUpService;