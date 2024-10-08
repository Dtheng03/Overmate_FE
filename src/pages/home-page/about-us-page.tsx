function AboutUsPage() {
    return (
        <section className="h-fit px-[10%] py-[10%] bg-[url('./assets/imgs/bg_about.png')] bg-cover bg-color1">
            <div className="sm:w-full lg:w-[50%]">
                <div className="flex items-center gap-x-[4px] justify-center flex-wrap">
                    <img className="md:w-[600px]" src="/logoFull.png" alt="About1" />
                </div>
                <p className="mt-[-60px] text-white text-justify text-base">
                    Nơi kết nối những bạn trẻ đồng điệu, phù hợp dựa trên tính cách, áp
                    dụng các phương pháp thú vị như MBTI, cung hoàng đạo và thần số học.
                    Bên cạnh đó, chúng tôi còn cung cấp các dịch vụ tiện ích như hỗ trợ
                    chuyển nhà, đóng gói đồ đạc, tìm kiếm nhà ở, bảo trì và dọn dẹp,
                    nhằm mang lại trải nghiệm sống chung thuận tiện và thoải mái cho mọi người.
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