const title: string = "mt-4 text-white text-center";

function Why() {
    return (
        <section className="px-[10%] py-[5%]">
            <div className="py-[5%] px-[5%] bg-color1 border-color2 border-2 shadow-md rounded-[20px]">
                <h2 className="mb-12 text-color4 font-bold text-base lg:text-xl text-center">TẠI SAO BẠN NÊN CHỌN OVERMATE?</h2>
                <div className="py-[4%] flex justify-center lg:justify-between flex-wrap gap-x-4">
                    <div className="mb-8">
                        <img src="/Why1.png" alt="Why1" />
                        <p className={title}>Tiết kiệm thời gian</p>
                    </div>
                    <div className="mb-8">
                        <img src="/Why2.png" alt="Why2" />
                        <p className={title}>Kết nối nhanh chóng</p>
                    </div>
                    <div className="mb-8">
                        <img src="/Why3.png" alt="Why3" />
                        <p className={title}>Kết nối chính xác</p>
                    </div>
                    <div className="mb-8">
                        <img src="/Why4.png" alt="Why4" />
                        <p className={title}>Đa dạng dịch vụ</p>
                    </div>
                </div>
            </div>
        </section >
    );
}

export default Why;