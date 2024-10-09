import { useEffect, useState } from "react";
import axiosClient from "@/config";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";

function MbtiTest() {
    const navigate = useNavigate();

    const submitTest = useMutation({
        mutationFn: (body: { answers: number[] }) => {
            return axiosClient.post('/questions/submit', body);
        },
        onSuccess: () => {
            sessionStorage.removeItem("mbtiTest");
            navigate("/profile");
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
    const [answers, setAnswers] = useState<number[]>(Array(mergedItems.length).fill(-1));
    const [isFinished, setIsFinished] = useState(false);

    // Slice 10 questions at a time
    const questionsPerPage = 10;
    const currentQuestions = mergedItems.slice(currentIndex, currentIndex + questionsPerPage);

    const handleAnswerSelect = (e: any, index: number) => {
        const newAnswers = [...answers];
        newAnswers[currentIndex + index] = +e.target.value;
        setAnswers(newAnswers);
    };

    const handleNextPage = () => {
        window.scrollTo(0, 0);
        if (currentIndex + questionsPerPage < mergedItems.length) {
            setCurrentIndex(currentIndex + questionsPerPage);
        } else {
            setIsFinished(true);
        }
    };

    const handleSubmit = () => {
        // Submit full array of answers, including unanswered (-1) values
        submitTest.mutate({
            answers: answers, // Send all answers, including -1 for unanswered questions
        });
    };

    useEffect(() => {
        const allowed = sessionStorage.getItem("mbtiTest");
        if (allowed !== "approved") {
            window.history.back();
        }
    }, []);

    return (
        <section className="min-h-[calc(100vh-58px)] px-4 py-8 bg-color1 bg-[url('./assets/imgs/background.png')] bg-cover bg-center flex flex-col items-center justify-evenly">
            <h1 className="text-white font-extrabold text-3xl sm:text-4xl text-center">TRẮC NGHIỆM MBTI</h1>
            {!isFinished ? (
                <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md mt-6">
                    <h2 className="text-xl font-bold mb-4">Câu hỏi {currentIndex + 1} - {Math.min(currentIndex + questionsPerPage, mergedItems.length)} / {mergedItems.length}</h2>
                    {currentQuestions.map((questionItem, questionIndex) => {
                        const parts = questionItem?.prompt?.split('\n');
                        const question = parts?.[0];
                        const answerOptions = parts?.slice(1)?.map((answer: string) => answer.trim());

                        return (
                            <div key={questionIndex} className="mb-6">
                                <h3 className="text-lg font-bold mb-2">{question}</h3>
                                {answerOptions?.map((ans: any, index: number) => (
                                    <label
                                        key={index}
                                        className={`block p-2 mb-2 border rounded-lg cursor-pointer transition-all duration-300 ${answers[currentIndex + questionIndex] === index ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
                                    >
                                        <input
                                            type="radio"
                                            name={`answer-${questionIndex}`}
                                            value={index}
                                            className="mr-2"
                                            onChange={(e) => handleAnswerSelect(e, questionIndex)}
                                            checked={answers[currentIndex + questionIndex] === index}
                                        />
                                        {ans}
                                    </label>
                                ))}
                            </div>
                        );
                    })}
                    <div className="mt-6 flex justify-end">
                        <button
                            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all duration-300"
                            onClick={handleNextPage}
                            disabled={answers.slice(currentIndex, currentIndex + questionsPerPage).includes(-1)}
                        >
                            Tiếp theo
                        </button>
                    </div>
                </div>
            ) : (
                <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md mt-6 text-center">
                    <h2 className="text-2xl font-bold mb-4">Hoàn thành bài kiểm tra</h2>
                    <p className="text-lg mb-4">Chúc mừng bạn đã hoàn thành bài kiểm tra MBTI.</p>
                    <p className="text-lg mb-4">Hãy bấm nút xem kết quả bên dưới nhé.</p>
                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all duration-300"
                        onClick={handleSubmit}
                    >
                        Xem kết quả
                    </button>
                </div>
            )}
        </section>
    );
}

export default MbtiTest;
