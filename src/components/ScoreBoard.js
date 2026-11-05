import React from 'react';

export default function ScoreBoard({ score, answers, currentIdx }) {
  return (
    <div className="scoreboard">
      <h4>Điểm: {score}</h4>
      <div className="score-cells">
        {Array.from({ length: 15 }).map((_, i) => {
          let cellClass = "s-cell ";
          const ans = answers[i];
          
          if (i === currentIdx) {
            cellClass += "current-cell ";
          } else if (ans) {
            if (ans.lifebuoySaved) {
              cellClass += "lifebuoy-cell "; 
            } else if (ans.correct) {
              cellClass += "correct-cell ";
            }
          }
          
          return (
            <div key={i} className={cellClass}>
              {i + 1}
            </div>
          );
        })}
      </div>
    </div>
  );
}