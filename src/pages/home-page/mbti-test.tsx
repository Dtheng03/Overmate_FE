import { useEffect, useState } from "react";
import axiosClient from "@/config";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";

function MbtiTest() {
    const navigate = useNavigate();

    const submitTest = useMutation({
        mutationFn: (body: { answers: number[] }) => { return axiosClient.post('/questions/submit', body) },
        onSuccess: () => {
            sessionStorage.removeItem("mbtiTest");
            navigate("/profile")
        },
        onError: (e) => {
            console.log(e);
        },
    });

    const { data: data1 } = useQuery({
        queryKey: ['questions1'],
        queryFn: () => axiosClient.get(`/questions?pageSize=25&pageNumber=1`),
    });
    const { data: data2 } = useQuery({
        queryKey: ['questions2'],
        queryFn: () => axiosClient.get(`/questions?pageSize=25&pageNumber=2`),
    });
    const { data: data3 } = useQuery({
        queryKey: ['questions3'],
        queryFn: () => axiosClient.get(`/questions?pageSize=25&pageNumber=3`),
    });

    const items1 = data1?.data?.items || [];
    const items2 = data2?.data?.items || [];
    const items3 = data3?.data?.items || [];

    const mergedItems = [...items1, ...items2, ...items3];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [selectedValue, setSelectedValue] = useState(0);
    const [finalAns, setFinalAns] = useState<number[]>([]);
    const [isFinished, setIsFinished] = useState(false);

    const currentQuestion = mergedItems[currentIndex]?.prompt;

    // Tách chuỗi dựa trên ký tự \n
    const parts = currentQuestion?.split('\n');

    // Câu hỏi là phần đầu tiên
    const question = parts?.[0];

    // Câu trả lời là các phần sau
    const answers = parts?.slice(1)?.map((answer: string) => answer.trim());

    const handleAnswerSelect = (e: any, answer: string) => {
        setSelectedAnswer(answer);
        setSelectedValue(+e.target.value);
    };

    const handleNextQuestion = () => {
        setFinalAns([...finalAns, selectedValue]);
        if (currentIndex + 1 < mergedItems.length) {
            setCurrentIndex(currentIndex + 1);
            setSelectedAnswer("")
        } else {
            setIsFinished(true);
        }
    };

    useEffect(() => {
        const allowed = sessionStorage.getItem("mbtiTest");
        if (allowed !== "approved") {
            window.history.back();
        }
    }, [])

    return (
        <section className="h-[calc(100vh-58px)] px-[10%] py-[5%] bg-slate-100 flex flex-col items-center justify-evenly">
            <h1 className="text-color1 font-extrabold text-4xl text-center">TRẮC NGHIỆM MBTI</h1>
            {!isFinished ? (
                <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-4">Câu {currentIndex + 1}/{mergedItems.length}</h2>
                    <h2 className="text-lg font-bold mb-4">{question}</h2>
                    <div className="mb-4">
                        {answers?.map((ans: any, index: number) => (
                            <label
                                key={index}
                                className={`block p-2 mb-2 border rounded-lg cursor-pointer ${selectedAnswer === ans ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
                            >
                                <input
                                    type="radio"
                                    name="answer"
                                    value={index}
                                    className="mr-2"
                                    onChange={(e) => handleAnswerSelect(e, ans)}
                                    checked={selectedAnswer === ans}
                                />
                                {ans}
                            </label>
                        ))}
                    </div>
                    <div className="mt-8 flex justify-end">
                        <button
                            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                            onClick={handleNextQuestion}
                            disabled={selectedAnswer === ""}
                        >
                            Tiếp theo
                        </button>
                    </div>
                </div>
            ) : (
                <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md text-center">
                    <h2 className="text-2xl font-bold mb-4">Hoàn thành bài kiểm tra.</h2>
                    <p className="text-lg mb-4">Chúc mừng bạn đã hoàn thành bài kiểm tra MBTI.</p>
                    <p className="text-lg mb-4">Hãy bấm nút xem kết quả bên dưới nhé.</p>
                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                        onClick={() => {
                            console.log(finalAns);
                            submitTest.mutate({
                                "answers": finalAns
                            })
                        }}
                    >
                        Xem kết quả
                    </button>
                </div>
            )}
        </section>
    );
}

export default MbtiTest;