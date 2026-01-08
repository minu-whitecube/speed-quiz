'use client';

interface MainScreenProps {
  onStart: () => void;
}

export default function MainScreen({ onStart }: MainScreenProps) {
  return (
    <div className="text-center fade-in">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 mt-12">
        <div className="mb-8">
          <div className="inline-block bg-[#F93B4E] bg-opacity-10 rounded-full p-4 mb-6">
            <svg className="w-12 h-12 text-[#F93B4E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
            </svg>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3 leading-tight">
          성공하면 1만 원!<br /><span className="text-[#F93B4E]">스피드 퀴즈</span> 도전
        </h1>
        <p className="text-gray-600 mb-10 text-base leading-relaxed">
          제한 시간 초과나 오답 시<br />즉시 실패!
        </p>
        <button
          onClick={onStart}
          className="w-full bg-[#F93B4E] text-white font-semibold py-4 px-8 rounded-xl text-lg shadow-md hover:shadow-lg hover:bg-[#d83242] transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
        >
          퀴즈 시작하기
        </button>
      </div>
    </div>
  );
}
