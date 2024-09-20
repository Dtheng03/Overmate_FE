import MyButton from "@/components/commons/MyButton";

const div: string = "basis-1/4 flex flex-col justify-center items-center";
const btn: string = "mt-4 w-[120px] rounded-[50px]";

function ChooseServicePage() {
    return (
        <section className="px-[10%] py-[5%]">
            <h1 className="mb-12 font-extrabold text-4xl text-center">Dịch vụ cung cấp</h1>
            <div className="flex justify-evenly">
                <div className={div}>
                    <img src="/mainService1.png" alt="service1" />
                    <MyButton title="Nhà trọ" classname={btn} />
                </div>
                <div className={div}>
                    <img src="/mainService2.png" alt="service2" />
                    <MyButton title="Chuyển nhà" classname={btn} />
                </div>
                <div className={div}>
                    <img src="/mainService3.png" alt="service3" />
                    <MyButton title="Dọn vệ sinh" classname={btn} />
                </div>
            </div>
        </section>
    );
}

export default ChooseServicePage;