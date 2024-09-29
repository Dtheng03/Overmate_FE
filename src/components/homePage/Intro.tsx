function Intro() {
    return (
        <section className="px-[10%] py-[5%] flex gap-x-12">
            <div className="basis-2/5">
                <h1 className="mb-12 text-white text-5xl font-extrabold">Over match <br /> to your mate</h1>
                <p className="text-white text-justify">
                    Nơi kết nối những bạn trẻ đồng điệu, phù hợp dựa trên tính cách, áp dụng các phương pháp thú vị như MBTI, cung hoàng đạo và thần số học.
                </p>
            </div>
            <div className="basis-3/5">
                <img className="w-full" src="/intro.png" alt="Intro" />
            </div>
        </section>
    );
}

export default Intro;