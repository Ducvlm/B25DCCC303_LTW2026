import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LEVELS, TOPICS } from '../data';

export default function QuestionBank({ questions, loading, error }) {
  const [filterTopic, setFilterTopic] = useState('Tất cả');
  const [searchTerm, setSearchTerm] = useState('');

  if (loading) return <div>Đang tải câu hỏi...</div>;
  if (error) return <div>Không tải được câu hỏi</div>;

  const filtered = questions.filter(q => {
    const matchTopic = filterTopic === 'Tất cả' || q.topic === filterTopic;
    const matchSearch = q.question.toLowerCase().includes(searchTerm.toLowerCase());
    return matchTopic && matchSearch;
  });

  return (
    <div>
      <h2>Ngân hàng câu hỏi</h2>
      <div className="filters">
        <select value={filterTopic} onChange={e => setFilterTopic(e.target.value)}>
          <option value="Tất cả">Tất cả</option>
          {TOPICS.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <input 
          type="text" 
          placeholder="Tìm kiếm..." 
          value={searchTerm} 
          onChange={e => setSearchTerm(e.target.value)} 
        />
      </div>
      <p>Có {filtered.length} câu hỏi.</p>
      <table className="q-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Chủ đề</th>
            <th>Mức độ</th>
            <th>Câu hỏi</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((q, index) => (
            <tr key={q.id}>
              <td>{index + 1}</td>
              <td>{q.topic}</td>
              <td>{LEVELS[q.level]}</td>
              <td><Link to={`/questions/${q.id}`}>{q.question}</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}