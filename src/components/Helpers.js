import React from 'react';

export default function Helpers({ used, active, onFiftyFifty, onAddTime, onLifebuoy, disabled }) {
  return (
    <div className="helpers">
      <button onClick={onFiftyFifty} disabled={disabled || used.fiftyFifty}>
        Loại 1 đáp án
      </button>
      <button onClick={onAddTime} disabled={disabled || used.addTime}>
        Thêm 15 giây
      </button>
      <button onClick={onLifebuoy} disabled={disabled || used.lifebuoy}>
        {active ? "Phao đang bật" : "Phao cứu sinh"}
      </button>
    </div>
  );
}