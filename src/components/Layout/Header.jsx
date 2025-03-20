import { useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const location = useLocation();
  
  // Set the title based on the current route
  const getTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Taco Tracker';
      case '/eaten':
        return 'Taco History';
      default:
        return 'Taco Tracker';
    }
  };
  
  return (
    <header className="app-header">
      <div className="header-logo">🌮</div>
      <h1 className="header-title">{getTitle()}</h1>
    </header>
  );
};

export default Header;