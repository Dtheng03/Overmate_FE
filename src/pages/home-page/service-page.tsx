import MyButton from "@/components/commons/MyButton";

function ServicePage() {
    return (
        <section className="px-[10%] py-[5%] bg-color1">
            <div className="mb-4 flex gap-x-12">
                <div className="h-[200px] w-[200px] bg-color4 rounded-[20px]"></div>
                <div className="flex-1 relative">
                    <h2 className="mb-4 text-color4 text-xl font-bold">Đối tác A</h2>
                    <p className="mb-8 text-white">Overmate là nền tảng trực tuyến giúp người dùng tìm kiếm bạn cùng phòng
                        phù hợp dựa trên tính cách của mỗi người, áp dụng các phương pháp như
                        MBTI và số học. Chúng tôi còn cung cấp các dịch vụ tiện ích như hỗ trợ
                        chuyển nhà, đóng gói đồ đạc, tìm kiếm nhà ở và dọn dẹp, nhằm mang lại
                        trải nghiệm sống chung thuận tiện và hài hòa cho các thành viên.</p>
                    <MyButton classname="absolute bottom-2 right-2" title="Xem thêm" />
                </div>
            </div>
        </section>
    );
}

export default ServicePage;