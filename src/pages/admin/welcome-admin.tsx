const card: string = "h-full bg-color1 p-[4%] rounded-[20px]";

function WelcomeAdmin() {
    const username = localStorage.getItem("username") || undefined;

    return (
        <section className="min-h-screen px-[10%] py-[5%] bg-color1 flex flex-col justify-start items-center gap-12">
            <h1 className="text-white font-extrabold text-4xl text-center">Xin chào, {username}</h1>
            <div className="w-[600px] p-0.5 rounded-[20px] bg-gradient-to-r from-[#011949] to-[#55A6CE]">
                <div className={card}>
                    <h3 className="mb-4 text-white font-bold text-2xl text-center">Chào mừng quay trở lại</h3>
                    <p className="text-color2 mt-2 font-bold text-center">OVERMATE</p>
                </div>
            </div>
        </section>
    );
}

export default WelcomeAdmin;