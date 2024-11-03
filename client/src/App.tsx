import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import NotFoundPage from './Pages/Error/Error';
import Signup from "./Pages/Auth/Signup";
import Login from './Pages/Auth/Login';
import ForgotPassword from './Pages/Auth/ForgotPassword';
import EmailVerificationPage from './Pages/Auth/EmailVerify';

function App() {
  return (
    <BrowserRouter >
      <Routes>
        <Route path='*' element={<NotFoundPage />} />
        <Route path='/' element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-email" element={<EmailVerificationPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;