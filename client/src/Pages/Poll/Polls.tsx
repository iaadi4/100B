import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import Poll from "@/components/Poll";
import PollModel from "@/models/PollModel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Polls = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [year, setYear] = useState("");
  const [branch, setBranch] = useState("");
  const [polls, setPolls] = useState<PollModel[] | null>();

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getAllPoles = async () => {
      try {
        const response = await axiosPrivate.get('/api/v1/polls', {
          params: {
            pageNo: 1
          }
        });
        setPolls(response.data.polls);
      } catch (error: any) {
        if (error.response.data.message)
          toast.error(error.response.data.message);
        else
          toast.error("Failed to fetch polls");
      }
    }
    getAllPoles();
  }, [axiosPrivate])

  return (
    <div className="min-h-screen w-[calc(100%-4rem)]">
      <div className="mx-auto px-4 w-full">
        <div className="flex w-full sticky top-0 z-50 pt-8 pb-5 px-10 bg-white">
          <p className="text-2xl font-bold text-orange-500">Agora</p>
          <div className="flex ml-auto">
            <Input
              type="text"
              placeholder="Search"
              className="w-[300px] mx-10 bg-white/40 text-black placeholder-black hover:placeholder-white outline-none focus-within:outline-none focus:outline-none border-orange-500/60 hover:text-white hover:bg-orange-500/60 transition-all duration-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="gap-4 flex">
              <div>
                <Select
                  value={year}
                  onValueChange={setYear}
                >
                  <SelectTrigger className="bg-white/40 border-orange-500/60 hover:text-white hover:bg-orange-500/60">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 border-orange-500/30 text-black">
                    <SelectItem value="Year">Year</SelectItem>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select
                  value={branch}
                  onValueChange={setBranch}
                >
                  <SelectTrigger className="bg-white/40 border-orange-500/60 hover:text-white hover:bg-orange-500/60">
                    <SelectValue placeholder="Branch" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 border-orange-500/30 text-black">
                    <SelectItem value="Branch">Branch</SelectItem>
                    <SelectItem value="CSE DS&AI">CSE DS&AI</SelectItem>
                    <SelectItem value="CSE">CSE</SelectItem>
                    <SelectItem value="ECE">ECE</SelectItem>
                    <SelectItem value="ECE IOT">ECE IOT</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="ml-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="border-orange-500/60 hover:bg-orange-500/60 hover:text-white">Create Poll</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle className="text-orange-500">Create Poll</DialogTitle>
                    <DialogDescription>
                      Maximum of 4 options are allowed
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                  </div>
                  <DialogFooter>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-full overflow-y-auto flex">
        <div>
          {polls && polls.map((poll) => (
            <Poll poll={poll} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Polls;