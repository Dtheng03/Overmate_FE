import CallToAction from "./CallToAction";

function Section1() {
    return (
        <section className="px-[5%] py-[5%] flex flex-col md:flex-row justify-center items-center gap-y-8 md:gap-x-12">
            {/* Text content */}
            <div className="text-center md:text-left">
                <h1 className="mb-6 md:mb-12 text-color1 text-3xl md:text-4xl font-bold">
                    Cùng <span className="text-color4">Overmate</span> để <br className="hidden md:block" />
                    phát triển kinh doanh!
                </h1>
                <p className="text-base md:text-xl">
                    Trở thành đối tác của chúng tôi để tiếp cận
                    <br className="hidden md:block" />
                    nhiều khách hàng hơn, tăng doanh thu và
                    <br className="hidden md:block" />
                    quản lý dịch vụ một cách dễ dàng
                </p>
            </div>

            {/* Call to Action button */}
            <CallToAction />
        </section>
    );
}

export default Section1;
