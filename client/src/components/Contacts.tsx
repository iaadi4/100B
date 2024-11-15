import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import Contact from "./Contact";
import Directory from "./Directory";

const Contacts = () => {
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState(1);
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);
    const [allUsers, setAllUsers] = useState([]);

    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        const getConversations = async () => {
            try {
                setLoading(true);
                const response = await axiosPrivate.get('/api/v1/user/conversation');
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
                setLoading(true);
                const response = await axiosPrivate.get('/api/v1/users');
                setAllUsers(response.data.response);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        getAllUsers();
    }, [axiosPrivate])

    return (
        <div className="h-screen w-[30%] bg-slate-100 min-w-[350px]">
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
    )
}

export default Contacts