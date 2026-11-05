import React from 'react';
import { LEVELS } from '../data';
import AnswerButton from './AnswerButton';

export default function QuestionCard({ question, index, status, selectedOption, onSelect, hiddenOptions }) {
  return (
    <div className="question-card">
      <h3>Câu {index + 1}/15 – {question.topic} – {LEVELS[question.level]}</h3>
      <p className="q-text">{question.question}</p>
      <div className="answers-grid">
        {question.options.map((opt, i) => (
          <AnswerButton 
            key={i} 
            index={i} 
            text={opt} 
            status={status}
            isSelected={selectedOption === i}
            isCorrect={question.answer === i}
            isHidden={hiddenOptions.includes(i)}
            onClick={() => onSelect(i)}
          />
        ))}
      </div>
    </div>
  );
}