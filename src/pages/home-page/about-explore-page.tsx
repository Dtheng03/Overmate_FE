const card: string = "h-full bg-color1 p-[4%] rounded-[20px]";
const title: string = "mb-4 text-color4 text-xl font-bold text-center";
const content: string = "text-white text-justify";

function AboutExplorePage() {
    return (
        <section className="px-[10%] py-[5%] min-h-[calc(100vh-58px)] bg-color1 bg-[url('./assets/imgs/backgroundAuth.png')] bg-cover bg-center">
            <h1 className="mb-16 text-center text-white text-3xl font-extrabold uppercase">Khám phá tính cách</h1>
            <div className="block lg:flex justify-evenly">
                <div className="my-4 lg:m-0 basis-[30%] p-0.5 rounded-[20px] bg-gradient-to-r from-[#011949] to-[#55A6CE]">
                    <div className={card}>
                        <h3 className={title}>THẦN SỐ HỌC</h3>
                        <p className={content}>
                            Thần số, thần số học hay còn gọi là số bí thuật là niềm tin ngụy khoa học vào mối quan hệ tín ngưỡng thần thánh và thần bí giữa các chữ số và sự kiện. Tư tưởng này cũng điều tra về sự tương quan giữa số của các chữ cái trong danh xưng với những thứ mang tính tinh thần.
                        </p>
                    </div>
                </div>
                <div className="my-4 lg:m-0 basis-[30%] p-0.5 rounded-[20px] bg-gradient-to-r from-[#011949] to-[#55A6CE]">
                    <div className={card}>
                        <h3 className={title}>CUNG HOÀNG ĐẠO</h3>
                        <p className={content}>
                            Cung hoàng đạo là một hệ thống chiêm tinh học dựa trên vị trí của mặt trời, mặt trăng và các hành tinh trong các chòm sao khi một người được sinh ra. Cung hoàng đạo được chia thành 12 nhóm, mỗi nhóm kéo dài khoảng 30 ngày.
                        </p>
                    </div>
                </div>
                <div className="my-4 lg:m-0 basis-[30%] p-0.5 rounded-[20px] bg-gradient-to-r from-[#011949] to-[#55A6CE]">
                    <div className={card}>
                        <h3 className={title}>MBTI</h3>
                        <p className={content}>
                            Trắc nghiệm tính cách Myers-Briggs, hay Chỉ số phân loại Myers-Briggs, thường được viết ngắn gọn là MBTI, là một phương pháp ngụy khoa học sử dụng các câu hỏi trắc nghiệm tâm lý để tìm hiểu tâm lý, tính cách cũng như cách con người nhận thức thế giới xung quanh, đưa ra quyết định cho một vấn đề.
                        </p>
                    </div>
                </div>
            </div>
        </section >
    );
}

export default AboutExplorePage;