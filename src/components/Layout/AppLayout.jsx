import { Outlet } from 'react-router-dom';
import Header from './Header';
import BottomNav from '../Navigation/BottomNav';
import './AppLayout.css';

const AppLayout = () => {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
};

export default AppLayout;