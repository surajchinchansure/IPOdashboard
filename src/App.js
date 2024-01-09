import './App.css';
import { Navbar } from './components/navbar/Navbar';
import ChartComponent from './components/charts/StockGraph';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import RegisterForm from './components/register/RegisterForm';
import LoginForm from './components/login/LoginForm';
import { useState } from 'react';
import DashboardScreen from './components/dashboard/DashboardScreen';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    setLoggedIn(true);
  };


  return (
    <Router>
      <div className="app">
        <Navbar/>
        <Routes>
         
          <Route path="/" element={<LoginComponent handleLogin={handleLogin} />} />
          <Route path="/register" element={<RegisterComponent />} />
          <Route path="/dashboard" element={<Dashboard user={user} loggedIn={loggedIn} />} />
          <Route path="/ipo" element={<DashboardScreen />} />
        </Routes>
      </div>
    </Router>
  );
};

const LoginComponent = ({ handleLogin }) => {
  return (
    <div className='loginbutton'>
      <LoginForm handleLogin={handleLogin} />
      <Link to="/register">Register</Link>
    </div>
  );
};



const RegisterComponent = () => {
  return (
    <div className='loginbutton'>
      <RegisterForm />
      <Link to="/">Login</Link>
    </div>
  );
};

export const Dashboard = ({ user, loggedIn }) => {
  return (
    <>
      <Navbar user={user} loggedIn={loggedIn} />
      <ChartComponent user={user} loggedIn={loggedIn} />
    </>
  );
};

export default App;
