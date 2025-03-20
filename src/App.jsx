import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TacoProvider } from './hooks/useTacoData';
import AppLayout from './components/Layout/AppLayout';
import HomePage from './components/Dashboard/HomePage';
import TacoHistory from './components/TacoHistory/TacoHistory';
import './App.css';

function App() {
  return (
    <TacoProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="eaten" element={<TacoHistory />} />
          </Route>
        </Routes>
      </Router>
    </TacoProvider>
  );
}

export default App;
