'use client';

import { useEffect, useState, useRef } from 'react';
import { quizData, questionTimes } from '@/lib/quiz-data';
import { useChallengeTicket } from '@/lib/storage';

interface QuizScreenProps {
  onSuccess: () => void;
  onFail: () => void;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function shuffleAnswers(question: typeof quizData[0]) {
  const answersWithIndex = question.answers.map((answer, index) => ({
    answer,
    originalIndex: index,
  }));

  const shuffled = shuffleArray(answersWithIndex);
  const newAnswers = shuffled.map((item) => item.answer);
  const correctAnswer = question.answers[question.correct];
  const newCorrectIndex = newAnswers.indexOf(correctAnswer);

  return {
    answers: newAnswers,
    correct: newCorrectIndex,
  };
}

export default function QuizScreen({ onSuccess, onFail }: QuizScreenProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5);
  const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);
  const [correctIndex, setCorrectIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const hasUsedTicket = useRef(false);

  useEffect(() => {
    if (!hasUsedTicket.current) {
      useChallengeTicket();
      hasUsedTicket.current = true;
    }
  }, []);

  useEffect(() => {
    if (currentQuestionIndex >= quizData.length) {
      onSuccess();
      return;
    }

    const question = quizData[currentQuestionIndex];
    const questionTime = questionTimes[currentQuestionIndex];
    const shuffled = shuffleAnswers(question);

    setShuffledAnswers(shuffled.answers);
    setCorrectIndex(shuffled.correct);
    setTimeLeft(questionTime);
    setSelectedIndex(null);

    // 진행바 리셋
    if (progressBarRef.current) {
      progressBarRef.current.style.animation = 'none';
      progressBarRef.current.style.width = '100%';
      void progressBarRef.current.offsetWidth;
      setTimeout(() => {
        if (progressBarRef.current) {
          progressBarRef.current.style.animation = `progress ${questionTime}s linear forwards`;
        }
      }, 10);
    }

    // 타이머 시작
    const updateInterval = 100;
    let elapsed = 0;

    timerRef.current = setInterval(() => {
      elapsed += updateInterval;
      const remaining = Math.max(0, questionTime - elapsed / 1000);
      setTimeLeft(remaining);

      if (remaining <= 0) {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
        onFail();
      }
    }, updateInterval);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [currentQuestionIndex, onSuccess, onFail]);

  const handleAnswer = (index: number) => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    setSelectedIndex(index);

    if (index === correctIndex) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }, 500);
    } else {
      setTimeout(() => {
        onFail();
      }, 300);
    }
  };

  if (currentQuestionIndex >= quizData.length) {
    return null;
  }

  const question = quizData[currentQuestionIndex];
  const displayTime = timeLeft % 1 === 0 ? `${timeLeft}초` : `${timeLeft.toFixed(1)}초`;

  return (
    <div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mt-2">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-semibold text-gray-700">
              문제 <span className="text-[#F93B4E]">{currentQuestionIndex + 1}</span>/5
            </span>
            <span className="text-sm font-semibold text-[#F93B4E]">{displayTime}</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
            <div
              ref={progressBarRef}
              className="h-full bg-[#F93B4E] progress-bar rounded-full"
            />
          </div>
        </div>

        <div className="mb-4">
          <p className="text-lg font-bold text-gray-900 text-center">{question.question}</p>
        </div>

        <div className="mb-6 rounded-xl overflow-hidden border border-gray-100 shadow-sm bg-gray-50">
          <img
            src={question.image}
            alt="문제 이미지"
            className="w-full aspect-square object-contain"
          />
        </div>

        <div className="space-y-2.5">
          {shuffledAnswers.map((answer, index) => {
            const isSelected = selectedIndex === index;
            const isCorrect = index === correctIndex && isSelected;
            const isWrong = isSelected && index !== correctIndex;

            return (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={selectedIndex !== null}
                className={`w-full border font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.01] active:scale-[0.99] text-base font-medium text-left flex items-center h-14 ${
                  isCorrect
                    ? 'bg-[#F93B4E] text-white border-[#F93B4E]'
                    : isWrong
                    ? 'bg-red-100 text-red-700 border-red-300'
                    : 'bg-gray-50 hover:bg-[#F93B4E] hover:text-white border-gray-200 hover:border-[#F93B4E] text-gray-700'
                } ${selectedIndex !== null ? 'cursor-not-allowed' : ''}`}
              >
                <span>{answer}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
