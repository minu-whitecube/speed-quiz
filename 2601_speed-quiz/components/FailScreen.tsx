'use client';

import { useEffect } from 'react';
import { getShareUrl, setHasAttempted } from '@/lib/storage';

interface FailScreenProps {
  showGoToMain: boolean;
  onGoToMain: () => void;
}

export default function FailScreen({ showGoToMain, onGoToMain }: FailScreenProps) {
  useEffect(() => {
    setHasAttempted();
  }, []);

  const handleShare = async () => {
    const shareUrl = getShareUrl();

    if (navigator.share) {
      try {
        await navigator.share({
          title: '성공하면 1만 원! 스피드 퀴즈 도전',
          text: '제한 시간 초과나 오답 시 즉시 실패!',
          url: shareUrl,
        });
      } catch (err) {
        copyLink(shareUrl);
      }
    } else {
      copyLink(shareUrl);
    }
  };

  const copyLink = (url: string) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(() => {
        alert('링크가 복사되었습니다');
      });
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = url;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        alert('링크가 복사되었습니다');
      } catch (err) {
        alert('링크 복사에 실패했습니다. 수동으로 복사해주세요: ' + url);
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <div className="text-center fade-in">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 mt-12">
        <div className="mb-8">
          <div className="inline-block bg-red-50 rounded-full p-5 mb-4">
            <svg className="w-16 h-16 text-[#F93B4E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">
          앗 아쉬워요!<br />다시 도전해보시겠어요?
        </h2>
        <p className="text-gray-500 text-sm mb-10">한 번 더 기회를 드려요!</p>

        <div className="space-y-3 mt-8">
          <button
            onClick={handleShare}
            className="w-full bg-[#F93B4E] text-white font-semibold py-4 px-8 rounded-xl text-base shadow-md hover:shadow-lg hover:bg-[#d83242] transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            공유하고 다시 도전하기
          </button>
          {showGoToMain && (
            <button
              onClick={onGoToMain}
              className="w-full bg-gray-50 text-gray-700 font-semibold py-4 px-8 rounded-xl text-base border border-gray-200 hover:bg-gray-100 transition-all duration-200"
            >
              메인으로 돌아가기
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
