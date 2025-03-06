import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Layout from './Components/Layout';
import Dashboard from './Pages/Dashboard';
import LoginPage from './Pages/LoginPage';
import Profile from './Pages/Profile';
import AdminDashboard from './Pages/AdminDashboard';
import Layout2 from './Components/Layout2';
import AdminUser from './Pages/AdminUser';
import AdminProjects from './Pages/AdminProjects';
import AdminTasks from './Pages/AdminTasks';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<LoginPage/>} />
        <Route path="/user" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile/>} />
        </Route>
        <Route path="/admin" element={<Layout2 />}>
          <Route path="dashboard" element={<AdminDashboard/>} />
          <Route path="users" element={<AdminUser/>} />
          <Route path="projects" element={<AdminProjects/>} />
          <Route path="tasks" element={<AdminTasks/>} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
