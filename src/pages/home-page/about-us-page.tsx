function AboutUsPage() {
    return (
        <section className="h-fit px-[10%] py-[10%] bg-[url('./assets/imgs/bg_about.png')] bg-cover bg-color1">
            <div className="sm:w-full lg:w-[50%]">
                <div className="flex items-center gap-x-[4px] justify-center flex-wrap">
                    <img className="md:w-[600px]" src="/logoFull.png" alt="About1" />
                </div>
                <p className="mt-[-60px] text-white text-justify text-xl">
                    Nền tảng kết nối dịch vụ vệ sinh và bảo trì điều hòa chất lượng cao, giúp bạn dễ dàng đặt lịch, theo dõi, và tận hưởng không gian sạch sẽ, tiện nghi.
                </p>
            </div>
            <div className="w-[50%] mt-8 flex justify-end">
                <img className="w-[240px] mr-[-80px]" src="/about_new1.png" alt="public\about_new1.png" />
                <img className="w-[200px]" src="/about_new2.png" alt="public\about_new2.png" />
            </div>
        </section>
    );
}

export default AboutUsPage;