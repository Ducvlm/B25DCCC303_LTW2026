import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

export default function Layout() {
  return (
    <div className="app-container">
      <NavBar />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}