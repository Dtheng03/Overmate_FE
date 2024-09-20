import CallToAction from "./CallToAction";

function Section2() {
    return (
        <section className="px-[10%] py-[5%] flex justify-center gap-x-12">
            <div className="">
                <h1 className="mb-12 text-color1 text-4xl font-bold">
                    Đăng ký trở thành đối tác <br />
                    của <span className="text-color4">Overmate</span> và <br />
                    bắt đầu chào đón khách <br />
                    hàng ngay ngày hôm nay!
                </h1>
                <p className="text-2xl">
                    Trở thành đối tác của chúng tôi để tiếp cận
                    <br />nhiều khách hàng hơn, tăng doanh thu và
                    <br />quản lý dịch vụ một cách dễ dàng
                </p>
            </div>
            <CallToAction />
        </section>
    );
}

export default Section2;