import CallToAction from "./CallToAction";

function Section2() {
    return (
        <section className="px-[5%] py-[5%] flex flex-col md:flex-row justify-center items-center gap-y-8 md:gap-x-12">
            {/* Text content */}
            <div className="text-center md:text-left">
                <h1 className="mb-6 md:mb-12 text-color1 text-3xl md:text-4xl font-bold">
                    Đăng ký trở thành đối tác <br className="hidden md:block" />
                    của <span className="text-color2">Overmate</span> và <br className="hidden md:block" />
                    bắt đầu chào đón khách <br className="hidden md:block" />
                    hàng ngay ngày hôm nay!
                </h1>
                <p className="text-base md:text-2xl">
                    Trở thành đối tác của chúng tôi để tiếp cận
                    <br className="hidden md:block" />nhiều khách hàng hơn, tăng doanh thu và
                    <br className="hidden md:block" />quản lý dịch vụ một cách dễ dàng
                </p>
            </div>

            {/* Call to Action button */}
            <CallToAction />
        </section>
    );
}

export default Section2;
