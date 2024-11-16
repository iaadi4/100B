import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Poll, PollState, CreatePollPayload, VotePayload, ClosePollPayload, ExtendPollPayload } from '../types';

const initialState: PollState = {
  polls: [],
  loading: false,
  error: null,
  searchResults: [],
};

const pollSlice = createSlice({
  name: 'polls',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setPolls(state, action: PayloadAction<Poll[]>) {
      state.polls = action.payload;
    },
    setSearchResults(state, action: PayloadAction<Poll[]>) {
      state.searchResults = action.payload;
    },
    addPoll(state, action: PayloadAction<Poll>) {
      state.polls.unshift(action.payload);
    },
    updatePollOptions(state, action: PayloadAction<{ pollId: number; updatedOptions: Result[] }>) {
      const poll = state.polls.find(p => p.id === action.payload.pollId);
      if (poll) {
        poll.options = action.payload.updatedOptions;
      }
    },
    updatePollStatus(state, action: PayloadAction<{ pollId: number; isClosed: boolean }>) {
      const poll = state.polls.find(p => p.id === action.payload.pollId);
      if (poll) {
        poll.isClosed = action.payload.isClosed;
      }
    },
    extendPollEndDate(state, action: PayloadAction<{ pollId: number; endDate: string }>) {
      const poll = state.polls.find(p => p.id === action.payload.pollId);
      if (poll) {
        poll.endDate = action.payload.endDate;
      }
    },
  },
});

export const {
  setLoading,
  setError,
  setPolls,
  setSearchResults,
  addPoll,
  updatePollOptions,
  updatePollStatus,
  extendPollEndDate,
} = pollSlice.actions;

export default pollSlice.reducer;

export const fetchPolls = () => async (dispatch: any) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get('/polls');
    dispatch(setPolls(response.data));
  } catch (error: any) {
    dispatch(setError(error.message || 'Failed to fetch polls'));
  } finally {
    dispatch(setLoading(false));
  }
};

export const createPoll = (newPoll: CreatePollPayload) => async (dispatch: any) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.post('/poll', newPoll);
    dispatch(addPoll(response.data));
  } catch (error: any) {
    dispatch(setError(error.message || 'Failed to create poll'));
  } finally {
    dispatch(setLoading(false));
  }
};

export const votePoll = ({ pollId, optionId }: VotePayload) => async (dispatch: any) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.post(`/poll/${pollId}/vote`, { optionId });
    dispatch(updatePollOptions({ pollId, updatedOptions: response.data.options }));
  } catch (error: any) {
    dispatch(setError(error.message || 'Failed to vote on poll'));
  } finally {
    dispatch(setLoading(false));
  }
};

export const closePoll = ({ pollId, isClosed }: ClosePollPayload) => async (dispatch: any) => {
  dispatch(setLoading(true));
  try {
    await axios.patch(`/poll/${pollId}/close`, { isClosed });
    dispatch(updatePollStatus({ pollId, isClosed }));
  } catch (error: any) {
    dispatch(setError(error.message || 'Failed to close poll'));
  } finally {
    dispatch(setLoading(false));
  }
};

export const extendPoll = ({ pollId, endDate }: ExtendPollPayload) => async (dispatch: any) => {
  dispatch(setLoading(true));
  try {
    await axios.patch(`/poll/${pollId}/extend`, { endDate });
    dispatch(extendPollEndDate({ pollId, endDate }));
  } catch (error: any) {
    dispatch(setError(error.message || 'Failed to extend poll'));
  } finally {
    dispatch(setLoading(false));
  }
};

export const searchPolls = (query: string) => async (dispatch: any) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get(`/polls/search?q=${query}`);
    dispatch(setSearchResults(response.data));
  } catch (error: any) {
    dispatch(setError(error.message || 'Search failed'));
  } finally {
    dispatch(setLoading(false));
  }
};
