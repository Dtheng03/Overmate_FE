const card: string = "h-[300px] bg-color1 p-[4%] rounded-[20px]";
const title: string = "mb-4 text-color4 text-xl font-bold text-center";
const content: string = "text-white";

function AboutTestPage() {
    return (
        <section className="px-[10%] py-[5%] bg-color1">
            <h1 className="mb-16 text-center text-white text-3xl font-extrabold">BÀI KIỂM TRA</h1>
            <div className="flex justify-evenly">
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
        </section >
    );
}

export default AboutTestPage;