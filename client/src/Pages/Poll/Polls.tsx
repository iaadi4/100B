import React, { useState, useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

interface Poll {
  id: string;
  title: string;
  options: string[];
  year: string;
  branch: string;
  votes: { id: number; option: string }[];
  closesAt: string;
  voteCounts: { [key: string]: number };
}

const Polls = () => {
  const axiosPrivate = useAxiosPrivate();
  const [polls, setPolls] = useState<Poll[]>([]);
  const [newPoll, setNewPoll] = useState<{ title: string; options: string[]; year: string; branch: string }>({ title: '', options: [], year: '', branch: '' });
  const [currentOption, setCurrentOption] = useState<string>('');
  const [userVotes, setUserVotes] = useState<{ [key: string]: string }>({});
  const [pageNo, setPageNo] = useState(1);
  const [message, setMessage] = useState('');

  const fetchPolls = async () => {
    try {
      const response = await axiosPrivate.get('api/v1/polls', { params: { pageNo } });
      setPolls(response.data.polls);
    } catch (error) {
      setMessage('Failed to fetch polls');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPolls();
  }, [pageNo]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPoll((prevPoll) => ({ ...prevPoll, [name]: value }));
  };

  const handleAddOption = () => {
    if (currentOption.trim() && newPoll.options.length < 4) {
      setNewPoll((prevPoll) => ({
        ...prevPoll,
        options: [...prevPoll.options, currentOption.trim()],
      }));
      setCurrentOption('');
    }
  };

  const handleCreatePoll = async () => {
    try {
      await axiosPrivate.post('api/v1/poll', newPoll);
      setMessage('Poll created successfully!');
      fetchPolls();
    } catch (error) {
      setMessage('Failed to create poll');
      console.error(error);
    }
  };

  const handleVote = async (pollId: string, option: string) => {
    try {
      await axiosPrivate.post('api/v1/vote', { pollId, option });
      setUserVotes((prevVotes) => ({ ...prevVotes, [pollId]: option }));
      setMessage('Vote recorded successfully!');
      fetchPolls();
    } catch (error) {
      setMessage('Failed to vote');
      console.error(error);
    }
  };

  const handleDeselectVote = async (voteId: number) => {
    try {
      console.log('Attempting to remove vote with id:', voteId);
      await axiosPrivate.delete('/api/v1/vote', { data: { voteId } });

      setUserVotes((prevVotes) => {
        const updatedVotes = { ...prevVotes };
        delete updatedVotes[voteId];
        return updatedVotes;
      });

      setMessage('Vote removed successfully!');
      fetchPolls();
    } catch (error) {
      setMessage('Failed to remove vote');
      console.error('Error in handleDeselectVote:', error);
    }
  };

  const handleDeletePoll = async (pollId: string) => {
    try {
      await axiosPrivate.delete('api/v1/poll', { data: { pollId } });
      setMessage('Poll deleted successfully!');
      fetchPolls();
    } catch (error) {
      setMessage('Failed to delete poll');
      console.error(error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 shadow-lg rounded-lg">
     
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Create a New Poll</h2>
      <div className="space-y-3 mb-6">
        <input
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          name="title"
          placeholder="Poll Title"
          onChange={handleInputChange}
          value={newPoll.title}
        />
        <input
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          name="year"
          placeholder="Year"
          onChange={handleInputChange}
          value={newPoll.year}
        />
        <input
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          name="branch"
          placeholder="Branch"
          onChange={handleInputChange}
          value={newPoll.branch}
        />
        <div className="space-y-2">
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Add an option"
            value={currentOption}
            onChange={(e) => setCurrentOption(e.target.value)}
          />
          <button
            className={`w-full bg-green-500 text-white font-semibold py-2 rounded-md ${
              newPoll.options.length >= 4 ? 'cursor-not-allowed opacity-50' : 'hover:bg-green-600'
            }`}
            onClick={handleAddOption}
            disabled={newPoll.options.length >= 4}
          >
            Add Option ({newPoll.options.length}/4)
          </button>
        </div>
        <button
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700"
          onClick={handleCreatePoll}
        >
          Create Poll
        </button>
      </div>
      {message && <p className="text-center text-sm text-gray-600 mb-4">{message}</p>}

      <h2 className="text-2xl font-bold text-gray-800 mb-4">Polls</h2>
      <div className="space-y-4">
        {polls.map((poll) => (
          <div key={poll.id} className="p-4 border border-gray-200 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold">{poll.title}</h3>
            <p className="text-sm text-gray-600">Year: {poll.year} | Branch: {poll.branch}</p>
            <p className="text-sm text-gray-600">Closes at: {poll.closesAt}</p>
            <ul className="mt-3 space-y-2">
              {(poll.options || []).map((option, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>{option}</span>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 mr-2">
                      Votes: {(poll.voteCounts && poll.voteCounts[option]) || 0}
                    </span>
                    {userVotes[poll.id] === option ? (
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        onClick={() => {
                          const vote = poll.votes.find((v) => v.option === option);
                          if (vote) {
                            handleDeselectVote(vote.id);
                          }
                        }}
                      >
                        Deselect
                      </button>
                    ) : (
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                        onClick={() => handleVote(poll.id, option)}
                      >
                        Vote
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 mt-3"
              onClick={() => handleDeletePoll(poll.id)}
            >
              Delete Poll
            </button>
          </div>
        ))}
      </div>

      
      <div className="flex justify-between items-center mt-6">
        <button
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
          onClick={() => setPageNo((prev) => Math.max(prev - 1, 1))}
          disabled={pageNo === 1}
        >
          Previous Page
        </button>
        <span className="text-gray-700">Page {pageNo}</span>
        <button
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
          onClick={() => setPageNo((prev) => prev + 1)}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default Polls;
