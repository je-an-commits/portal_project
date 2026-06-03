import {
   BrowserRouter,
   Routes,
   Route,
} from "react-router-dom";
import './App.css'
import LoginForm from './pages/LoginForm'
import Dashboard from './pages/Dashboard'
import Enrollment from "./pages/Enrollment";
import Course from "./pages/Course";
import Grade from "./pages/Grade";
import Appointment from "./pages/Appointment";
import Profile from "./pages/Profile";
import ProtectedRoute from './components/ProtectedRoute'
import { Toaster } from "./components/ui/sonner";
function App() {

  return (
   <>
   <Toaster richColors />
    <BrowserRouter>
         <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/dashboard" element={ <ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
            <Route path="/enrollment" element={<ProtectedRoute> <Enrollment /> </ProtectedRoute>} />
            <Route path="/courses" element={<ProtectedRoute> <Course /> </ProtectedRoute>} />
            <Route path="/grades" element={<ProtectedRoute> <Grade /> </ProtectedRoute>} />
            <Route path="/appointment" element={<ProtectedRoute> <Appointment /> </ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute> <Profile /> </ProtectedRoute>} />
         </Routes>
      </BrowserRouter>
      
   </>
  )
}

export default App
