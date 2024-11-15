import { useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Contact = ({ contact }: any) => {
  const user = useSelector((state: any) => state.auth.userData);
  const participants = contact.participants;
  const contactObj = participants.filter((contact: any) => contact.name != user.name);

  const lastMessage = contact.messages.findLast(
    (message: any) => message.senderId != user.id
  );

  if (lastMessage?.content?.length > 30) {
    lastMessage.content = lastMessage.content.substring(0, 30)
    lastMessage.content += '...'
  }

  let initials = contactObj[0].name[0];
  for (let i = 0; i < contactObj[0].name.length; i++) {
    if (contactObj[0].name[i] == ' ' && i != contactObj[0].name.length - 1) {
      initials += contactObj[0].name[i + 1].toUpperCase();
      break;
    }
  }

  return (
    <div className="flex w-full h-16 cursor-pointer hover:bg-orange-400">
      <div className="flex items-center justify-center w-[20%]">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="profilepic.png" />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-col">
        <div className={lastMessage?.content ? `ml-3 font-semibold mt-2` : `h-full flex items-center justify-center`}>
          {contactObj[0].name}
        </div>
        <div className="ml-3 text-sm text-slate-600">
          {lastMessage?.content}
        </div>
      </div>
    </div>
  )
}

export default Contact