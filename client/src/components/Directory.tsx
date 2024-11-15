import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Directory = ({ contact }: any) => {
    let initials = contact.name[0];
    for (let i = 0; i < contact.name.length; i++) {
        if (contact.name[i] == ' ' && i != contact.name.length - 1) {
            initials += contact.name[i + 1].toUpperCase();
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
            <div className="flex h-full flex-col">
                <div className="flex h-full items-center font-semibold">
                    {contact?.name}
                </div>
            </div>
        </div>
    )
}

export default Directory