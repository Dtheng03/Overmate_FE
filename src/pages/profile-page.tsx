import axiosClient from "@/config";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";

const card: string = "h-full bg-color1 p-[4%] rounded-[20px]";
const title: string = "mb-4 text-color4 text-xl font-bold text-center";
const content: string = "text-white";

function ProfilePage() {
    const userId = localStorage.getItem("userId") || undefined;
    const username = localStorage.getItem("username") || undefined;
    const photoUrl = localStorage.getItem("photoUrl") || undefined;

    const { data } = useQuery({
        queryKey: ['profile'],
        queryFn: () => axiosClient.get(`/auth/users/${userId}`),
    });

    return (
        <section className="px-[10%] py-[5%] bg-color1">
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
                <div className="w-full max-w-[600px] p-0.5 rounded-[20px] bg-gradient-to-r from-[#011949] to-[#55A6CE]">
                    <div className={card}>
                        <h3 className="mb-4 text-white font-bold text-xl sm:text-2xl text-center">Thông tin cá nhân</h3>
                        <p className="text-white mt-2 font-bold">Tên người dùng:
                            <span className="ml-4 font-normal">{username}</span>
                        </p>
                        <p className="text-white mt-2 font-bold">Ngày sinh:
                            <span className="ml-4 font-normal">{data?.data?.value?.dob?.slice(8, 10)}/{data?.data?.value?.dob?.slice(5, 7)}/{data?.data?.value?.dob?.slice(0, 4)}</span>
                        </p>
                        <p className="text-white mt-2 font-bold">Địa chỉ:
                            <span className="ml-4 font-normal">{data?.data?.value?.location}</span>
                        </p>
                    </div>
                </div>
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
        </section>
    );
}

export default ProfilePage;
