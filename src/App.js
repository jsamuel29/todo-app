import Login from './pages/login-page';
import MainApp from './Components/main-app';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import './App.css';

function App() {
  return (
    <Router>
      <div className="form">
        <Routes>
          <Route path="/main" element={<MainApp />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
