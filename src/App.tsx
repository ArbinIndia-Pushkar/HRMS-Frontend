import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './components/LoginPage';
import "./App.css";
import EmpDashboard from './components/EmpDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/employee-dashboard' element={<EmpDashboard />}></Route>
      </Routes>     
    </Router>
  );
};
 devicePixelRatio
export default App;
