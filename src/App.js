import React, { useState } from 'react';

// Dữ liệu mẫu ban đầu (tối thiểu 3 sinh viên có: id, name, score, class)
const initialStudents = [
  { id: 1, name: 'Nguyễn Văn A', score: 8.5, class: 'D23CQCN01-B' },
  { id: 2, name: 'Trần Thị B', score: 4.0, class: 'D23CQCN01-B' },
  { id: 3, name: 'Lê Hoàng C', score: 9.0, class: 'D23CQCN02-B' }
];

// 1. Component cháu: Hiển thị chi tiết từng dòng dữ liệu của một sinh viên (Dùng Destructuring Props)
const StudentItem = ({ student, onDelete }) => {
  // Destructuring các thuộc tính từ object student
  const { id, name, score, class: className } = student;

  return (
    <tr>
      <td style={tdStyle}>{id}</td>
      <td style={tdStyle}>{name}</td>
      <td style={tdStyle}>{className}</td>
      <td style={tdStyle}>{score}</td>
      <td style={tdStyle}>
        <button 
          onClick={() => onDelete(id)} 
          style={{ backgroundColor: '#dc3545', color: '#fff', border: 'none', padding: '4px 8px', cursor: 'pointer', borderRadius: '3px' }}
        >
          Xóa
        </button>
      </td>
    </tr>
  );
};

// 2. Component con: Nhận danh sách qua Props để hiển thị dạng bảng (Dùng .map() render danh sách)
const StudentTable = ({ students, onDelete }) => {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
      <thead>
        <tr style={{ backgroundColor: '#f2f2f2' }}>
          <th style={thStyle}>ID</th>
          <th style={thStyle}>Họ và Tên</th>
          <th style={thStyle}>Lớp</th>
          <th style={thStyle}>Điểm</th>
          <th style={thStyle}>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        {students.length > 0 ? (
          students.map((student) => (
            <StudentItem key={student.id} student={student} onDelete={onDelete} />
          ))
        ) : (
          <tr>
            <td colSpan="5" style={{ ...tdStyle, textAlign: 'center' }}>
              Không tìm thấy sinh viên nào.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

// 3. Component cha: Quản lý state chính (danh sách sinh viên, bộ lọc, form nhập liệu)
const App = () => {
  // State quản lý danh sách sinh viên
  const [students, setStudents] = useState(initialStudents);

  // State quản lý dữ liệu form
  const [name, setName] = useState('');
  const [score, setScore] = useState('');
  const [className, setClassName] = useState('');

  // State quản lý bộ lọc: 'ALL', 'EXCELLENT' (>= 8), 'FAILED' (< 5)
  const [filter, setFilter] = useState('ALL');

  // State báo lỗi ràng buộc dữ liệu
  const [errorMessage, setErrorMessage] = useState('');

  // Thêm sinh viên mới
  const handleAddStudent = (e) => {
    e.preventDefault();

    // Ràng buộc dữ liệu: Không để trống
    if (!name.trim() || score === '' || !className.trim()) {
      setErrorMessage('Vui lòng nhập đầy đủ thông tin: Họ tên, Điểm số và Lớp!');
      return;
    }

    const numericScore = parseFloat(score);

    // Ràng buộc dữ liệu: Điểm số từ 0 đến 10
    if (isNaN(numericScore) || numericScore < 0 || numericScore > 10) {
      setErrorMessage('Điểm số phải là một số từ 0 đến 10!');
      return;
    }

    // Xóa thông báo lỗi nếu dữ liệu hợp lệ
    setErrorMessage('');

    const newStudent = {
      id: Date.now(),
      name: name.trim(),
      score: numericScore,
      class: className.trim()
    };

    // Cập nhật danh sách (không làm mất dữ liệu cũ)
    setStudents((prev) => [...prev, newStudent]);

    // Reset ô nhập
    setName('');
    setScore('');
    setClassName('');
  };

  // Xóa sinh viên
  const handleDeleteStudent = (id) => {
    setStudents((prev) => prev.filter((student) => student.id !== id));
  };

  // Áp dụng phương thức .filter() để lọc danh sách hiển thị
  const filteredStudents = students.filter((student) => {
    if (filter === 'EXCELLENT') return student.score >= 8;
    if (filter === 'FAILED') return student.score < 5;
    return true; // 'ALL'
  });

  // Áp dụng phương thức .reduce() tính điểm trung bình của toàn lớp
  const totalStudents = students.length;
  const averageScore = totalStudents > 0
    ? (students.reduce((acc, student) => acc + student.score, 0) / totalStudents).toFixed(2)
    : 0;

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', fontFamily: 'Arial, sans-serif', padding: '0 15px' }}>
      <h2 style={{ color: '#333', textAlign: 'center' }}>Ứng dụng Quản lý Điểm Sinh viên</h2>

      {/* Form nhập liệu */}
      <form onSubmit={handleAddStudent} style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Họ tên"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />
        <input
          type="number"
          step="0.1"
          placeholder="Điểm số (0 - 10)"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Lớp"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          style={inputStyle}
        />
        <button type="submit" style={{ ...buttonStyle, backgroundColor: '#28a745', color: '#fff' }}>
          Thêm
        </button>
      </form>

      {/* Hiển thị thông báo lỗi ràng buộc */}
      {errorMessage && (
        <p style={{ color: 'red', margin: '5px 0 15px 0', fontSize: '14px' }}>{errorMessage}</p>
      )}

      {/* Thống kê cơ bản (Dùng Template Literals) */}
      <div style={{ backgroundColor: '#e9ecef', padding: '10px 15px', borderRadius: '4px', margin: '15px 0' }}>
        <p style={{ margin: '4px 0' }}>{`Tổng số sinh viên: ${totalStudents}`}</p>
        <p style={{ margin: '4px 0' }}>{`Điểm trung bình toàn lớp: ${averageScore}`}</p>
      </div>

      {/* Bộ lọc (Filter) */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <span>Lọc danh sách: </span>
        <button
          onClick={() => setFilter('ALL')}
          style={{ ...buttonStyle, backgroundColor: filter === 'ALL' ? '#007bff' : '#6c757d', color: '#fff' }}
        >
          Tất cả
        </button>
        <button
          onClick={() => setFilter('EXCELLENT')}
          style={{ ...buttonStyle, backgroundColor: filter === 'EXCELLENT' ? '#007bff' : '#6c757d', color: '#fff' }}
        >
          Loại Giỏi (>= 8)
        </button>
        <button
          onClick={() => setFilter('FAILED')}
          style={{ ...buttonStyle, backgroundColor: filter === 'FAILED' ? '#007bff' : '#6c757d', color: '#fff' }}
        >
          Trượt môn (&lt; 5)
        </button>
      </div>

      {/* Component con render danh sách */}
      <StudentTable students={filteredStudents} onDelete={handleDeleteStudent} />
    </div>
  );
};

// CSS inline đơn giản
const thStyle = { border: '1px solid #ddd', padding: '8px', textAlign: 'left' };
const tdStyle = { border: '1px solid #ddd', padding: '8px' };
const inputStyle = { padding: '6px 10px', fontSize: '14px', flex: '1', minWidth: '120px' };
const buttonStyle = { padding: '6px 12px', border: 'none', cursor: 'pointer', borderRadius: '3px' };

export default App;