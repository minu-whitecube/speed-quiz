'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import MainScreen from '@/components/MainScreen';
import CountdownScreen from '@/components/CountdownScreen';
import QuizScreen from '@/components/QuizScreen';
import FailScreen from '@/components/FailScreen';
import SuccessScreen from '@/components/SuccessScreen';
import { initializeUser, handleReferrerRewards, getUserId, hasChallengeTicket, getHasAttempted } from '@/lib/storage';

type Screen = 'main' | 'countdown' | 'quiz' | 'fail' | 'success';

export default function Home() {
  const searchParams = useSearchParams();
  const [screen, setScreen] = useState<Screen>('main');
  const [showGoToMain, setShowGoToMain] = useState(true);

  useEffect(() => {
    initializeUser();
    
    const refId = searchParams.get('ref');
    const userId = getUserId();
    
    if (refId) {
      handleReferrerRewards(refId, userId);
      // URL에서 ref 파라미터 제거
      window.history.replaceState({}, '', window.location.pathname);
    }
    
    // 초기 화면 설정
    const hasAttempted = getHasAttempted();
    const hasTicket = hasChallengeTicket();
    
    if (hasAttempted && !hasTicket) {
      setScreen('fail');
      setShowGoToMain(false);
    }
  }, [searchParams]);

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-5 py-6 max-w-md">
        {screen === 'main' && (
          <MainScreen onStart={() => setScreen('countdown')} />
        )}
        {screen === 'countdown' && (
          <CountdownScreen onComplete={() => setScreen('quiz')} />
        )}
        {screen === 'quiz' && (
          <QuizScreen
            onSuccess={() => setScreen('success')}
            onFail={() => setScreen('fail')}
          />
        )}
        {screen === 'fail' && (
          <FailScreen
            showGoToMain={showGoToMain}
            onGoToMain={() => {
              const hasTicket = hasChallengeTicket();
              const hasAttempted = getHasAttempted();
              
              if (hasAttempted && !hasTicket) {
                setScreen('fail');
                setShowGoToMain(false);
              } else {
                setScreen('main');
                setShowGoToMain(true);
              }
            }}
          />
        )}
        {screen === 'success' && <SuccessScreen />}
      </div>
    </div>
  );
}
