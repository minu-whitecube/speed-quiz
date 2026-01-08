'use client';

export function getUserId(): string {
  if (typeof window === 'undefined') return '';
  
  let userId = localStorage.getItem('quizUserId');
  if (!userId) {
    userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('quizUserId', userId);
  }
  return userId;
}

export function hasChallengeTicket(): boolean {
  if (typeof window === 'undefined') return false;
  const tickets = parseInt(localStorage.getItem('quizTickets') || '1');
  return tickets > 0;
}

export function useChallengeTicket(): void {
  if (typeof window === 'undefined') return;
  const tickets = parseInt(localStorage.getItem('quizTickets') || '1');
  if (tickets > 0) {
    localStorage.setItem('quizTickets', (tickets - 1).toString());
  }
}

export function addChallengeTicket(): void {
  if (typeof window === 'undefined') return;
  const tickets = parseInt(localStorage.getItem('quizTickets') || '0');
  localStorage.setItem('quizTickets', (tickets + 1).toString());
}

export function initializeUser(): void {
  if (typeof window === 'undefined') return;
  if (!localStorage.getItem('quizTickets')) {
    localStorage.setItem('quizTickets', '1');
  }
}

export function setHasAttempted(): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('hasAttempted', 'true');
}

export function getHasAttempted(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('hasAttempted') === 'true';
}

export function handleReferrerRewards(refId: string, userId: string): void {
  if (typeof window === 'undefined') return;
  
  if (refId && refId !== userId) {
    const pendingRewards = JSON.parse(localStorage.getItem('quizPendingRewards') || '[]');
    const rewardKey = refId + '_rewarded';
    
    if (!pendingRewards.includes(rewardKey)) {
      pendingRewards.push(rewardKey);
      localStorage.setItem('quizPendingRewards', JSON.stringify(pendingRewards));
      
      const referrerRewards = JSON.parse(localStorage.getItem('quizReferrerRewards') || '{}');
      if (!referrerRewards[refId]) {
        referrerRewards[refId] = 1;
      } else {
        referrerRewards[refId] += 1;
      }
      localStorage.setItem('quizReferrerRewards', JSON.stringify(referrerRewards));
    }
  }
  
  const referrerRewards = JSON.parse(localStorage.getItem('quizReferrerRewards') || '{}');
  if (referrerRewards[userId] && referrerRewards[userId] > 0) {
    addChallengeTicket();
    referrerRewards[userId] -= 1;
    if (referrerRewards[userId] <= 0) {
      delete referrerRewards[userId];
    }
    localStorage.setItem('quizReferrerRewards', JSON.stringify(referrerRewards));
  }
}

export function getShareUrl(): string {
  if (typeof window === 'undefined') return '';
  const userId = getUserId();
  const baseUrl = window.location.origin + window.location.pathname;
  return baseUrl + '?ref=' + encodeURIComponent(userId);
}
