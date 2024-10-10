function Intro() {
    return (
        <section className="sm:block px-[10%] py-[5%] lg:flex gap-x-12">
            <div className="basis-2/5">
                <h1 className="mb-8 lg:mb-12 text-white text-4xl lg:text-5xl font-extrabold">Over match <br /> to your mate</h1>
                <p className="mb-4 lg:m-0 text-white text-sm lg:text-base text-justify">
                    Nơi kết nối những bạn trẻ đồng điệu, phù hợp dựa trên tính cách, áp dụng các phương pháp thú vị như MBTI, cung hoàng đạo và thần số học.
                </p>
            </div>
            <div className="basis-3/5">
                <img className="w-full rounded-[20px]" src="/website.jpg" alt="Intro" />
            </div>
        </section>
    );
}

export default Intro;