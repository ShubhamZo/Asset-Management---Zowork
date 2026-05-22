
import './App.css';
import NavBar from './components/NavBar';
import Login from './components/Login';
import About from './components/About';
import AdminPage from './components/AdminPage';
import EmployeePage from './components/Employee/EmployeePage';
import ProtectedRoute from './components/ProtectedRoute';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <div className='container'>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/about' element={<About />} />

            <Route path="/AdminPage" element={
              <ProtectedRoute role='Admin'>
                <AdminPage />
              </ProtectedRoute>} />
            <Route path="/EmployeePage" element={
              <ProtectedRoute role="Employee">
                <EmployeePage />
              </ProtectedRoute>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
