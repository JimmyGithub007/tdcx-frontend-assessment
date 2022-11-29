import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/pages/dashboard';
import Login from './components/pages/login';
import Shell from './components/layouts/shell';
import Error404 from './components/pages/error404';

const App = () =>  {
  return (<Shell> 
    <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
    </Router>
  </Shell>);
}

export default App;
