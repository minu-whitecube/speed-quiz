'use client';

import { useEffect, useState } from 'react';

interface CountdownScreenProps {
  onComplete: () => void;
}

export default function CountdownScreen({ onComplete }: CountdownScreenProps) {
  const [count, setCount] = useState(3);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (count > 0) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
        setTimeout(() => {
          setCount(count - 1);
        }, 100);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        onComplete();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [count, onComplete]);

  return (
    <div className="text-center bg-white">
      <div className="flex items-center justify-center min-h-screen">
        <div
          className={`text-9xl font-bold text-[#F93B4E] drop-shadow-lg ${
            isAnimating ? 'countdown-animation' : ''
          }`}
        >
          {count > 0 ? count : ''}
        </div>
      </div>
    </div>
  );
}
