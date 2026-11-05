import { useNavigate } from 'react-router-dom';

export default function Home({ playerName, setPlayerName }) {
  const navigate = useNavigate();
  const handleStart = (e) => {
    e.preventDefault();
    if (playerName.trim()) navigate('/play');
  };

  return (
    <div>
      <h2>Rung chuông vàng</h2>
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