import React from 'react';

export default function Timer({ timeLeft }) {
  return <div className={`timer ${timeLeft <= 5 ? 'red-text' : ''}`}>Còn {timeLeft} giây</div>;
}