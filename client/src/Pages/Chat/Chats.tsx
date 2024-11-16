import { useCallback, useEffect, useRef, useState } from "react";
import { Input } from "../../components/ui/input";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import Contact from "../../components/Contact";
import Directory from "../../components/Directory";
import { useDispatch, useSelector } from "react-redux";
import { EllipsisVertical } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Message from "@/components/Message";
import { toast } from "sonner";
import io from "socket.io-client";
import { setSocket, setOnlineUsers } from "@/Redux/socketSlice";

interface Message {
  id: number
  content: string
  conversationId: number
  createdAt: string
  receiverId: number
  senderId: number
  updatedAt: string
}

const Chats = () => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(1);
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();

  const selectedContact = useSelector((state: any) => state.contact.selected);
  const user = useSelector((state: any) => state.auth.userData);
  const socket = useSelector((state: any) => state.socket.instance);

  //@ts-expect-error some socket incompatiablity
  useEffect(() => {
    const socket = io('localhost:3000', {
      query: {
        userId: user.id
      }
    });
    dispatch(setSocket(socket));
    socket.on('getOnlineUsers', (users: any) => {
      dispatch(setOnlineUsers(users));
    })
    return () => socket.disconnect();
  }, [dispatch, user])

  const handleNewMessage = useCallback((newMessage: any) => {
    if (newMessage.receiverId == user.id) {
      setMessages((prev) => [...prev, newMessage])
    }
  }, [user.id])

  useEffect(() => {
    socket?.on("newMessage", handleNewMessage);
    return () => socket?.off("newMessage", handleNewMessage);
  }, [socket, handleNewMessage]);


  useEffect(() => {
    const getConversations = async () => {
      try {
        setLoading(true);
        const response = await axiosPrivate.get('/api/v1/user/conversations');
        setConversations(response.data.conversations);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getConversations();
  }, [axiosPrivate])

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await axiosPrivate.get('/api/v1/users');
        setAllUsers(response.data.response);
      } catch (error: any) {
        if (error.response.data.message)
          toast.error(error.response.data.message);
        else
          toast.error('Failed to fetch directory')
        console.log(error);
      }
    }
    getAllUsers();
  }, [axiosPrivate])

  useEffect(() => {
    const getMessages = async () => {
      try {
        if (selectedContact?.id) {
          const response = await axiosPrivate.get(`/api/v1/conversation/${selectedContact.id}`)
          setMessages(response.data.response.messages);
        }
      } catch (error: any) {
        console.log(error);
        if (error.response.data.message)
          toast.error(error.response.data.message);
        else
          toast.error('Failed to fetch messages')
      }
    }
    getMessages();
  }, [axiosPrivate, selectedContact])

  const handleSendingMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axiosPrivate.post('/api/v1/message', {
        content: message,
        receiverId: selectedContact.contact[0].id
      })
      const newMessage = response.data.response;
      console.log(newMessage);
      setMessages((prev: any) => [...prev, newMessage]);
      setMessage("");
    } catch (error: any) {
      console.log(error);
      if (error.response.data.message)
        toast.error(error.response.data.message);
      else
        toast.error('Failed to send message');
    }
  }

  useEffect(() => {
    lastMessageRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex h-screen grow">
      <div className="h-full w-[30%] bg-slate-100 min-w-[350px]">
        <div className="sticky top-0 z-10 flex flex-col w-full">
          <div className="text-2xl font-semibold m-4 ml-10 text-black">
            Chats
          </div>
          <div className="flex justify-center w-full">
            <Input
              className="mx-5 w-full rounded-lg bg-white"
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
          </div>
          <div className="flex items-center h-10 mb-6 mt-3 justify-evenly">
            <h1
              className={`text-sm cursor-pointer font-semibold ${selected == 1 ? 'underline underline-offset-4 decoration-[1.5px] text-orange-500' : ''}`}
              onClick={(() => setSelected(1))}
            >
              CONTACTS
            </h1>
            <h1
              className={`text-sm cursor-pointer font-semibold ${selected == 2 ? 'underline underline-offset-4 decoration-[1.5px] text-orange-500' : ''}`}
              onClick={(() => setSelected(2))}
            >
              DIRECTORY
            </h1>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center w-full">
              {/* spinner here */}
            </div>
          ) : (
            <div>
              {selected == 1 ? (
                <div>
                  {conversations ? (
                    conversations.map((conversation: any) => (
                      <Contact key={conversation.id} contact={conversation} selected={selected} />
                    ))
                  ) : (
                    <div className="flex justify-center h-full">
                      <h1 className="mt-40 text-lg">Feels so empty!</h1>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  {allUsers ? (
                    allUsers.map((user: any) => (
                      <Directory key={user.id} contact={user} />
                    ))
                  ) : (
                    <div className="flex justify-center h-full">
                      <h1 className="mt-40 text-lg">Feels so empty!</h1>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="flex h-full w-[70%] bg-slate-100 min-w-[600px] flex-col">
        <div className="flex w-full h-[75px] bg-white mb-2">
          <div className="flex h-full ml-8 items-center">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="profilepic.png" />
              <AvatarFallback>AA</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex h-full mt-2 ml-5 flex-col">
            <div className="text-black font-bold">
              {selectedContact?.contact[0]?.name}
            </div>
            <div className="text-sm text-slate-700">ACTIVE NOW</div>
          </div>
          <div className="flex items-center ml-auto mr-8">
            <div className="rounded-full cursor-pointer p-2 hover:bg-slate-100">
              <EllipsisVertical />
            </div>
          </div>
        </div>
        <div className="w-full flex h-full overflow-y-auto">
          <div className="flex flex-col ml-6 w-full">
            {messages ? (
              messages.map((message: any) => (
                <div key={message.id} ref={lastMessageRef}>
                  <Message message={message} />
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center w-full h-full">
                <p className="text-gray-500">No messages available</p>
              </div>
            )}
          </div>
        </div>
        <div className="w-full flex items-center justify-center h-[80px] bg-white">
          <form action="submit" className="mx-8 h-10 w-full" onSubmit={handleSendingMessage}>
            <Input
              className="w-full"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </form>
        </div>
      </div>
    </div>
  )
}

export default Chats;