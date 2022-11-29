import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/pages/dashboard';
import Login from './components/pages/login';
import Shell from './components/layouts/shell';

const App = () =>  {
  return (<Shell> 
    <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
        </Routes>
    </Router>
  </Shell>);
}

export default App;
