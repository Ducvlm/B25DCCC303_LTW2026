import { POINTS, RANKS } from './data';

export const calcScore = (answers) => {
  return answers.filter(a => a.correct).reduce((sum, a) => sum + POINTS[a.level], 0);
};

export const getRank = (score) => {
  return RANKS.find(r => score >= r.min)?.title || 'Cần cố gắng';
};