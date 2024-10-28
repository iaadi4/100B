import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Signup from "./Auth/Signup"
import Login from './Auth/Login';
import ForgotPassword from './Auth/ForgotPassword';
import EmailVerificationPage from './Auth/EmailVerify';

function App() {


  
  return (
    <BrowserRouter >
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-email" element={<EmailVerificationPage />} />




    </Routes>
    </BrowserRouter>
  )
}

export default App
