import './App.scss';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import SideBar from './components/Sidebar/SideBar';
import Navbar from './components/Navbar/Navbar';
import { useState } from 'react';
import Users from './pages/Users/Users';
import UserDetails from './pages/UserDetails/UserDetails';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  };


  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/login' element={<Login/>}/>

        <Route
          path="/dashboard"
          element={
            <div className="dashboard-layout">
              <Navbar toggleSidebar={toggleSidebar} />
              <div className={`route-with-sidebar ${isSidebarOpen ? 'sidebar-open' : ''}`}>
                <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                <Dashboard />
              </div>
            </div>
          }
        />

        <Route
          path="/users"
          element={
            <div className="dashboard-layout">
              <Navbar toggleSidebar={toggleSidebar} />
              <div className={`route-with-sidebar ${isSidebarOpen ? 'sidebar-open' : ''}`}>
                <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                <Users />
              </div>
            </div>
          }
        />

        <Route
          path="/user-details/:id"
          element={
            <div className="dashboard-layout">
              <Navbar toggleSidebar={toggleSidebar} />
              <div className={`route-with-sidebar ${isSidebarOpen ? 'sidebar-open' : ''}`}>
                <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                <UserDetails />
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
