import {
   BrowserRouter,
   Routes,
   Route,
} from "react-router-dom";
import './index.css'
import LoginForm from './pages/LoginForm'
import Dashboard from './pages/Dashboard'
import Enrollment from "./pages/Enrollment";
import Course from "./pages/Course";
import Grade from "./pages/Grade";
import Appointment from "./pages/Appointment";
import Profile from "./pages/Profile";
function App() {

  return (
    <BrowserRouter>
         <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/enrollment" element={<Enrollment />} />
            <Route path="/courses" element={<Course />} />
            <Route path="/grades" element={<Grade />} />
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/profile" element={<Profile />} />
         </Routes>
      </BrowserRouter>
  )
}

export default App
