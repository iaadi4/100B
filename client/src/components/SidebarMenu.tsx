import { GoHomeFill } from "react-icons/go";
import { IoChatbubble } from "react-icons/io5";
import { FaPoll } from "react-icons/fa";
import { RiStickyNote2Fill2 } from "react-icons/ri";
import { PiLockSimpleFill } from "react-icons/pi";
import { IoNotifications } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { RiLogoutBoxFill } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "@/Redux/authSlice";

const SidebarMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="flex justify-center h-screen w-[5%] min-w-[65px]">
      <div className="flex items-center flex-col h-full w-full">
        <NavLink
          to="/"
          className={({ isActive }) => `h-10 w-10 flex justify-center items-center p-2 cursor-pointer rounded-lg mt-6 ${isActive ? 'bg-orange-500' : ''}`}>
          <GoHomeFill className="w-5 h-5" />
        </NavLink>
        <NavLink
          to="/notes"
          className={({ isActive }) => `h-10 w-10 flex justify-center items-center p-2 cursor-pointer rounded-lg mt-3 ${isActive ? 'bg-orange-500' : ''}`}>
          <RiStickyNote2Fill2 className="w-5 h-5" />
        </NavLink>
        <NavLink
          to="/chats"
          className={({ isActive }) => `h-10 w-10 flex justify-center items-center p-2 cursor-pointer rounded-lg mt-3 ${isActive ? 'bg-orange-500' : ''}`}>
          <IoChatbubble className="w-5 h-5" />
        </NavLink>
        <NavLink
          to="/polls"
          className={({ isActive }) => `h-10 w-10 flex justify-center items-center p-2 cursor-pointer rounded-lg mt-3 ${isActive ? 'bg-orange-500' : ''}`}>
          <FaPoll className="w-5 h-5" />
        </NavLink>
        <NavLink
          to="/confession"
          className={({ isActive }) => `h-10 w-10 flex justify-center items-center p-2 cursor-pointer rounded-lg mt-3 ${isActive ? 'bg-orange-500' : ''}`}>
          <PiLockSimpleFill className="w-5 h-5" />
        </NavLink>
        <NavLink
          to="/announcements"
          className={({ isActive }) => `h-10 w-10 flex justify-center items-center p-2 cursor-pointer rounded-lg mt-3 ${isActive ? 'bg-orange-500' : ''}`}>
          <IoNotifications className="w-5 h-5" />
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) => `h-10 w-10 mb-6 flex justify-center items-center p-2 cursor-pointer rounded-lg mt-3 ${isActive ? 'bg-orange-500' : ''}`}>
          <FaUser className="w-5 h-5" />
        </NavLink>
        <div onClick={handleLogout} className="h-10 w-10 mb-6 mt-auto flex justify-center items-center p-2 hover:bg-orange-500 cursor-pointer rounded-lg">
          <RiLogoutBoxFill className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};

export default SidebarMenu;
