import { useNavigate } from 'react-router-dom';

export default function Home({ playerName, setPlayerName, history }) {
  const navigate = useNavigate();
  
  const handleStart = (e) => {
    e.preventDefault();
    if (playerName.trim()) navigate('/play');
  };

  const bestRecord = history.length > 0 
    ? [...history].sort((a, b) => b.score - a.score)[0] 
    : null;

  return (
    <div>
      <h2>Rung chuông vàng</h2>
      {bestRecord && <p>Kỷ lục: {bestRecord.score} điểm – {bestRecord.name}</p>}
      <form onSubmit={handleStart}>
        <input 
          type="text" 
          placeholder="Tên người chơi" 
          value={playerName} 
          onChange={e => setPlayerName(e.target.value)} 
        />
        <button type="submit" disabled={!playerName.trim()}>Vào thi</button>
      </form>
    </div>
  );
}