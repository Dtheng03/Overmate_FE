function Services() {
    return (
        <section className="px-[10%] py-[5%]">
            <h1 className="mb-10 text-white text-xl text-center font-bold">DỊCH VỤ</h1>
            <div className="flex items-center justify-center gap-x-4">
                <div className="">
                    <img className="mb-2" src="/Service1.png" alt="Service1" />
                    <img src="/Service2.png" alt="Service2" />
                </div>
                <div className="">
                    <img src="/Service3.png" alt="Service3" />
                </div>
                <div className="">
                    <img src="/Service4.png" alt="Service4" />
                </div>
            </div>
        </section>
    );
}

export default Services;