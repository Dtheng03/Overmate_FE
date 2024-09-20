import MyButton from "@/components/commons/MyButton";

const card: string = "h-[300px] bg-color1 p-[4%] rounded-[20px]";
const title: string = "mb-4 text-color4 text-xl font-bold text-center";
const content: string = "text-white";

function ProfilePage() {
    return (
        <section className="px-[10%] py-[5%] bg-color1">
            <h1 className="text-white font-extrabold text-5xl text-center">Xin chào, Kiên</h1>
            <div className="mt-12 flex items-center justify-center gap-x-8">
                <div className="w-[320px] h-[320px] bg-color4 rounded-[50%]"></div>
                <div className="w-[600px] p-0.5 rounded-[20px] bg-gradient-to-r from-[#011949] to-[#55A6CE]">
                    <div className={card}>
                        <h3 className="mb-4 text-white font-bold text-2xl text-center">Thông tin cá nhân</h3>
                        <p className="text-white mt-2">Họ và tên: Lê Trung Kiên</p>
                        <p className="text-white mt-2">Tuổi: 20</p>
                        <p className="text-white mt-2">Tiểu sử:</p>
                        <p className="text-white mt-2">Địa chỉ:</p>
                    </div>
                </div>
            </div>
            <div className="mt-12 flex justify-evenly">
                <div className="basis-[30%] p-0.5 rounded-[20px] bg-gradient-to-r from-[#011949] to-[#55A6CE]">
                    <div className={card}>
                        <h3 className={title}>THẦN SỐ HỌC</h3>
                        <p className={content}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>
                </div>
                <div className="basis-[30%] p-0.5 rounded-[20px] bg-gradient-to-r from-[#011949] to-[#55A6CE]">
                    <div className={card}>
                        <h3 className={title}>CUNG HOÀNG ĐẠO</h3>
                        <p className={content}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>
                </div>
                <div className="basis-[30%] p-0.5 rounded-[20px] bg-gradient-to-r from-[#011949] to-[#55A6CE]">

                    <div className={card}>
                        <h3 className={title}>MBTI</h3>
                        <p className={content}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>
                </div>
            </div>
            <div className="mt-12 flex justify-center">
                <MyButton title="Tìm bạn cùng nhà" />
            </div>
        </section>
    );
}

export default ProfilePage;