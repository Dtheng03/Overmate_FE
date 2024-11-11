function Intro() {
    return (
        <section className="sm:block px-[10%] py-[5%] lg:flex gap-x-12">
            <div className="basis-2/5">
                <h1 className="mb-8 lg:mb-12 text-white text-4xl lg:text-5xl font-extrabold">Over match <br /> to your mate</h1>
                <p className="mb-4 lg:m-0 text-white text-sm lg:text-base text-justify">
                    Nền tảng kết nối dịch vụ vệ sinh và bảo trì điều hòa chất lượng cao, giúp bạn dễ dàng đặt lịch, theo dõi, và tận hưởng không gian sạch sẽ, tiện nghi.</p>
            </div>
            <div className="basis-3/5">
                <img className="w-full rounded-[20px]" src="/website.jpg" alt="Intro" />
            </div>
        </section>
    );
}

export default Intro;