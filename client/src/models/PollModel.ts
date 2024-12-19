import Vote from "./VoteModel";

interface Poll {
    id: number;
    title: string;
    branch: string;
    year: string;
    options: string[];
    closesAt: string;
    createdAt: string;
    updatedAt: string;
    userId: number;
    voteCounts: Record<string, number>;
    votes: Vote[];
}

export default Poll;