import './App.scss';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import SideBar from './components/Sidebar/SideBar';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard' element={
          <div className='route-with-sidebar'>
            <SideBar />
            <Dashboard/>
          </div>
        }/>
      </Routes>
    </Router>
  );
}

export default App;
