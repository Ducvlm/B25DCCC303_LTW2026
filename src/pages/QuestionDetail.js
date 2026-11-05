import { useParams, useNavigate } from 'react-router-dom';
import { LEVELS, POINTS, LETTERS } from '../data';

export default function QuestionDetail({ questions }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const question = questions.find(q => q.id === Number(id));

  if (!question) return <div>Không tìm thấy câu hỏi. <button onClick={() => navigate(-1)}>Quay lại</button></div>;

  return (
    <div>
      <h3>Câu hỏi số {question.id} - {question.topic} ({LEVELS[question.level]}, {POINTS[question.level]} điểm)</h3>
      <p>{question.question}</p>
      <div className="options-list">
        {question.options.map((opt, i) => (
          <div key={i} className={`option-detail ${i === question.answer ? 'correct-bg' : ''}`}>
            {LETTERS[i]}. {opt} {i === question.answer && <strong>(Đáp án đúng)</strong>}
          </div>
        ))}
      </div>
      <button onClick={() => navigate(-1)}>Quay lại</button>
    </div>
  );
}