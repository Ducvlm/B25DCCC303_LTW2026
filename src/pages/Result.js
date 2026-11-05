import { useLocation, Navigate, useNavigate } from 'react-router-dom';

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  
  if (!location.state) return <Navigate to="/" replace />;
  
  const { name, score, rank, correctCount, reason } = location.state;

  return (
    <div className="result-page">
      <h2>{reason}</h2>
      <p>Người chơi: {name}</p>
      <p>Số câu trả lời đúng: {correctCount}</p>
      <p>Điểm: {score}</p>
      <p>Danh hiệu: {rank}</p>
      <button onClick={() => navigate('/play')}>Chơi lại</button>
      <button onClick={() => navigate('/')}>Về trang chủ</button>
    </div>
  );
}