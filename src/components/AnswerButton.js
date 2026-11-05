import React from 'react';
import { LETTERS } from '../data';

export default function AnswerButton({ index, text, status, isSelected, isCorrect, isHidden, onClick }) {
  let btnClass = "answer-btn ";
  
  if (status === 'locked' && isSelected) {
    btnClass += "selected-yellow ";
  } else if (status === 'revealed') {
    if (isCorrect) btnClass += "correct-green ";
    else if (isSelected) btnClass += "wrong-red ";
  }

  if (isHidden) return <div className="answer-btn hidden-btn"></div>;

  return (
    <button 
      className={btnClass} 
      onClick={onClick} 
      disabled={status !== 'answering'}
    >
      {LETTERS[index]}. {text}
    </button>
  );
}