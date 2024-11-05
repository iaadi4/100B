import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Pages/Home/Home';
import NotFoundPage from './Pages/Error/Error';
import Signup from "./Pages/Auth/Signup";
import Login from './Pages/Auth/Login';
import ForgotPassword from './Pages/Auth/ForgotPassword';
import ResetPassword from './Pages/Auth/ResetPassword';
import EmailVerificationPage from './Pages/Auth/EmailVerify';
import { useSelector } from 'react-redux';

function App() {
  const user = useSelector((state: any) => state.auth.userData);

  return (
    <BrowserRouter >
      <Routes>
        <Route path='*' element={<NotFoundPage />} />
        <Route path='/' element={ user? <Home /> : <Navigate to={'/login'} />} />
        <Route path="/signup" element={ user? <Navigate to={'/'} /> : <Signup />} />
        <Route path="/login" element={ user? <Navigate to={'/'} /> : <Login />} />
        <Route path="/forgot-password" element={ <ForgotPassword /> } />
        <Route path="/verify-email" element={<EmailVerificationPage />} />
        <Route path='/reset-password/:token' element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;