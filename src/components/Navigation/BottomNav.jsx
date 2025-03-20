import { Link, useLocation } from 'react-router-dom';
import './BottomNav.css';

const BottomNav = () => {
  const location = useLocation();
  
  return (
    <nav className="bottom-nav">
      <Link 
        to="/" 
        className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}
      >
        <div className="nav-icon">🌮</div>
        <div className="nav-label">Tacos</div>
      </Link>
      <Link 
        to="/eaten" 
        className={`nav-item ${location.pathname === '/eaten' ? 'active' : ''}`}
      >
        <div className="nav-icon">📋</div>
        <div className="nav-label">Eaten</div>
      </Link>
    </nav>
  );
};

export default BottomNav;