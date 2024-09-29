import MyButton from "@/components/commons/MyButton";

function ServicePage() {
    return (
        <section className="px-[10%] py-[5%] bg-color1">
            <div className="mb-4 flex gap-x-12 flex-col items-center md:flex-row">
                <div className="h-[200px] w-[200px] bg-color4 rounded-[20px]"></div>
                <div className="flex-1 relative">
                    <h2 className="my-4 text-color4 text-xl font-bold text-center md:text-left ">Đối tác A</h2>
                    <p className="mb-4 text-white">Overmate là nền tảng trực tuyến giúp người dùng tìm kiếm bạn cùng phòng
                        phù hợp dựa trên tính cách của mỗi người, áp dụng các phương pháp như
                        MBTI và số học.</p>
                    <div className="flex justify-end">
                        <MyButton title="Xem thêm" />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ServicePage;