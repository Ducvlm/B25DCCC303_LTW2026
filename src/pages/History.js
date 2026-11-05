import React from 'react';

export default function History({ history, setHistory }) {
  if (history.length === 0) return <div>Chưa có lượt chơi nào.</div>;

  const sortedHistory = [...history].sort((a, b) => b.score - a.score);
  const avgScore = Math.round(history.reduce((sum, h) => sum + h.score, 0) / history.length);

  return (
    <div>
      <h3>Số lượt chơi: {history.length}, Điểm cao nhất: {sortedHistory[0].score}, Điểm trung bình: {avgScore}</h3>
      <button onClick={() => setHistory([])}>Xóa lịch sử</button>
      <table className="q-table">
        <thead>
          <tr>
            <th>Người chơi</th>
            <th>Số câu đúng</th>
            <th>Điểm</th>
            <th>Danh hiệu</th>
            <th>Thời gian</th>
          </tr>
        </thead>
        <tbody>
          {sortedHistory.map(h => (
            <tr key={h.id}>
              <td>{h.name}</td>
              <td>{h.correctCount}</td>
              <td>{h.score}</td>
              <td>{h.rank}</td>
              <td>{h.playedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}