export interface QuizQuestion {
  question: string;
  image: string;
  answers: string[];
  correct: number;
}

export const quizData: QuizQuestion[] = [
  {
    question: '이 제품의 카테고리는 무엇일까요?',
    image: '/q1_tocobo.png',
    answers: ['스킨케어', '메이크업', '선케어', '마스크팩', '헤어케어'],
    correct: 2
  },
  {
    question: '이 제품의 브랜드는 어디일까요?',
    image: '/q2_whitch.jpg',
    answers: ['마녀공장', '웰라쥬', '메디힐', '토리든', '달바'],
    correct: 0
  },
  {
    question: '이 제품의 정확한 이름은 무엇일까요?',
    image: '/q3_wellage.png',
    answers: ['에스트라 아토베리어365 크림', '아누아 피디알엔 히알루론산100 수분크림', '토리든 다이브인 저분자 히알루론산 세럼', '피지오겔 DMT 페이셜 크림', '웰라쥬 리얼 히알루로닉 블루 100 앰플'],
    correct: 4
  },
  {
    question: '빨간색으로 표시된 제품의 정확한 이름은 무엇일까요?',
    image: '/q4_vt.png',
    answers: ['VT 리들샷 100에센스', 'VT 피디알엔 캡슐 크림 100', 'VT 피디알엔 에센스 100', 'VT 리들샷 헤어 부스팅 앰플', 'VT 리들샷 포맨 올인원 100 엠플러스'],
    correct: 2
  },
  {
    question: '빨간색으로 표시된 제품의 정확한 이름은 무엇일까요?',
    image: '/q5_cnp.png',
    answers: ['차앤팍 더마앤서 액티브 부스트 PDRN 앰플', '차앤박 더마앤서 액티브 부스팅 PDRN 앰플', '차앤박 더마앤서 액티브 부스트 PDRN 앰플', '차앤박 더마앤서 액티브 부스트 PDRN 에센스', '차앤박 더마앤서 액티브 부스트 PNDR 에센스'],
    correct: 2
  }
];

export const questionTimes = [5, 5, 5, 5, 5];
