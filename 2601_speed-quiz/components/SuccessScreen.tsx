'use client';

import { useEffect } from 'react';
import { setHasAttempted } from '@/lib/storage';

export default function SuccessScreen() {
  useEffect(() => {
    setHasAttempted();
  }, []);

  const handleClaimReward = () => {
    window.location.href = 'https://www.google.com';
  };

  return (
    <div className="text-center fade-in">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 mt-12">
        <div className="mb-8">
          <div className="inline-block bg-[#F93B4E] bg-opacity-10 rounded-full p-5 mb-4 pulse-animation">
            <svg className="w-16 h-16 text-[#F93B4E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">
          축하합니다!<br />5문제를 모두 맞추셨습니다.
        </h2>
        <p className="text-gray-500 text-sm mb-10">보상을 받아가세요!</p>
        <button
          onClick={handleClaimReward}
          className="w-full bg-[#F93B4E] text-white font-semibold py-4 px-8 rounded-xl text-lg shadow-md hover:shadow-lg hover:bg-[#d83242] transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
        >
          1만원 받기
        </button>
      </div>
    </div>
  );
}
