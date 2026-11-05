import React, { useState, useEffect, useCallback } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { calcScore, getRank } from '../utils';
import { EXTRA_TIME } from '../data';
import QuestionCard from '../components/QuestionCard';
import Timer from '../components/Timer';
import ScoreBoard from '../components/ScoreBoard';
import Helpers from '../components/Helpers';

export default function Play({ questions, playerName, history, setHistory }) {
    const navigate = useNavigate();
    const [currentIdx, setCurrentIdx] = useState(0);
    const [timeLeft, setTimeLeft] = useState(20);
    const [status, setStatus] = useState("answering"); // answering -> locked -> revealed
    const [selectedOption, setSelectedOption] = useState(null);
    const [answers, setAnswers] = useState([]);

    // Helpers state
    const [hiddenOptions, setHiddenOptions] = useState([]);
    const [lifebuoyActive, setLifebuoyActive] = useState(false);
    const [helpersUsed, setHelpersUsed] = useState({ fiftyFifty: false, addTime: false, lifebuoy: false });

    // Tiêu đề tab
    useEffect(() => {
        const originalTitle = "Rung chuông vàng";
        if (status === 'answering' && questions.length > 0) {
            document.title = `Câu ${currentIdx + 1}/15 – ${calcScore(answers)} điểm`;
        }
        return () => { document.title = originalTitle; };
    }, [currentIdx, answers, status, questions]);

    // Đồng hồ đếm ngược
    useEffect(() => {
        let timerId;
        if (status === "answering" && timeLeft > 0) {
            timerId = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        } else if (timeLeft === 0 && status === "answering") {
            setStatus("locked");
        }
        return () => clearInterval(timerId);
    }, [status, timeLeft]);

    // Phím tắt[cite: 14]
    useEffect(() => {
        const handleKey = (e) => {
            if (status !== 'answering') return;
            const keyMap = { '1': 0, '2': 1, '3': 2, '4': 3 };
            const idx = keyMap[e.key];
            if (idx !== undefined && !hiddenOptions.includes(idx)) {
                setSelectedOption(idx);
                setStatus('locked');
            }
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [status, hiddenOptions]);

    // Chuỗi sự kiện hiển thị đáp án[cite: 13]
    const endGame = useCallback((newAnswers, reason) => {
        const score = calcScore(newAnswers);
        const rank = getRank(score);
        const correctCount = newAnswers.filter(a => a.correct).length;
        const newRecord = {
            id: Date.now(),
            name: playerName,
            score,
            rank,
            correctCount,
            playedAt: new Date().toLocaleString("vi-VN")
        };
        setHistory([...history, newRecord]);
        navigate('/result', { replace: true, state: { name: playerName, score, rank, correctCount, reason } });
    }, [history, navigate, playerName, setHistory]);

    const handleNextStep = useCallback(() => {
        const question = questions[currentIdx];
        const isCorrect = selectedOption === question.answer;

        // Lưu lifebuoySaved=true nếu trả lời sai nhưng có bật phao[cite: 14]
        const lifebuoySaved = (!isCorrect && lifebuoyActive);
        const newAnswer = { id: question.id, level: question.level, correct: isCorrect, lifebuoySaved };
        const newAnswers = [...answers, newAnswer];
        setAnswers(newAnswers);

        let eliminated = !isCorrect;
        if (lifebuoySaved) eliminated = false;

        if (eliminated) {
            const reason = selectedOption === null ? "Hết giờ!" : "Bạn đã bị loại (trả lời sai)";
            endGame(newAnswers, reason);
        } else if (currentIdx === 14) {
            const reason = (isCorrect && !newAnswers.some(a => !a.correct && !a.lifebuoySaved))
                ? "Chúc mừng! Bạn đã rung chuông vàng (đúng cả 15 câu)"
                : "Bạn đã hoàn thành 15 câu";
            endGame(newAnswers, reason);
        } else {
            setCurrentIdx(prev => prev + 1);
            setTimeLeft(20);
            setStatus('answering');
            setSelectedOption(null);
            setHiddenOptions([]);
            setLifebuoyActive(false);
        }
    }, [answers, currentIdx, endGame, lifebuoyActive, questions, selectedOption]);

    useEffect(() => {
        let t1, t2;
        if (status === 'locked') {
            const delay = (timeLeft === 0 && selectedOption === null) ? 0 : 2000;
            t1 = setTimeout(() => setStatus('revealed'), delay);
        } else if (status === 'revealed') {
            t2 = setTimeout(() => handleNextStep(), 1500);
        }
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, [status, timeLeft, selectedOption, handleNextStep]);

    if (!playerName) return <Navigate to="/" replace />;
    if (questions.length === 0) return <div>Đang tải...</div>;

    const currentQ = questions[currentIdx];

    const triggerFiftyFifty = () => {
        if (helpersUsed.fiftyFifty || status !== 'answering') return;
        setHelpersUsed({ ...helpersUsed, fiftyFifty: true });
        let wrongOptions = [0, 1, 2, 3].filter(i => i !== currentQ.answer);
        const hidden = wrongOptions[Math.floor(Math.random() * wrongOptions.length)];
        setHiddenOptions([hidden]);
    };

    const triggerAddTime = () => {
        if (helpersUsed.addTime || status !== 'answering') return;
        setHelpersUsed({ ...helpersUsed, addTime: true });
        setTimeLeft(prev => prev + EXTRA_TIME);
    };

    const triggerLifebuoy = () => {
        if (helpersUsed.lifebuoy || status !== 'answering') return;
        setHelpersUsed({ ...helpersUsed, lifebuoy: true });
        setLifebuoyActive(true);
    };

    return (
        <div className="play-container">
            <ScoreBoard score={calcScore(answers)} answers={answers} currentIdx={currentIdx} />
            <Timer timeLeft={timeLeft} />
            <QuestionCard
                question={currentQ}
                index={currentIdx}
                status={status}
                selectedOption={selectedOption}
                onSelect={(idx) => { setSelectedOption(idx); setStatus('locked'); }}
                hiddenOptions={hiddenOptions}
            />
            <Helpers
                used={helpersUsed}
                active={lifebuoyActive}
                onFiftyFifty={triggerFiftyFifty}
                onAddTime={triggerAddTime}
                onLifebuoy={triggerLifebuoy}
                disabled={status !== 'answering'}
            />
        </div>
    );
}