import { NavLink } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className="navbar">
      <NavLink to="/" end className={({ isActive }) => isActive ? "active-link" : ""}>Trang chủ</NavLink>
      <NavLink to="/questions" className={({ isActive }) => isActive ? "active-link" : ""}>Ngân hàng câu hỏi</NavLink>
      <NavLink to="/history" className={({ isActive }) => isActive ? "active-link" : ""}>Lịch sử</NavLink>
    </nav>
  );
}