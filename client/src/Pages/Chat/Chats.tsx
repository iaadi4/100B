import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSocket, setOnlineUsers } from "@/Redux/socketSlice";
import io from "socket.io-client";
import Contacts from "@/components/Contacts";

const Chats = () => {
  const dispatch = useDispatch();

  const user = useSelector((state: any) => state.auth.userData);

  //@ts-expect-error god knows wtf is the problem
  useEffect(() => {
    const socket = io('localhost:3000', {
      query: {
        userId: user.id
      }
    });
    dispatch(setSocket(socket));
    socket.on('getOnlineUsers', (users) => {
      dispatch(setOnlineUsers(users));
    })
    return () => socket.disconnect();
  }, [dispatch, user])

  return (
    <div className="flex h-screen grow">
      <Contacts />
    </div>
  )
}

export default Chats