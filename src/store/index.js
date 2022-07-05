import { configureStore, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getAll, createAnecdote, updateAnecdote } from "../services/anecodotes";

const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};
// const anecdoteInitialState = anecdotesAtStart.map(asObject);
const anecdoteInitialState = [];

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: anecdoteInitialState,
  reducers: {
    replaceAnecdotes: (state, { payload }) => {
      return payload;
    },
    voteAnecdote: (state, action) => {
      const selectedAnecdoteIndex = state.findIndex(
        (anecdote) => anecdote.id === action.payload
      );
      const selectedAnecdote = state.find(
        (anecdote) => anecdote.id === action.payload
      );
      const newAnecdote = {
        ...selectedAnecdote,
        votes: selectedAnecdote.votes + 1,
      };
      const allAnecdotes = [...state];
      allAnecdotes[selectedAnecdoteIndex] = newAnecdote;
      return allAnecdotes;
    },
    newAnecdote: (state, { payload }) => {
      // const anecdote = {
      //   content: action.payload,
      //   id: getId(),
      //   votes: 0,
      // };
      return state.concat(payload);
    },
  },
});

export const getAnecdotes = () => {
  return async (dispatch) => {
    const allAnecdotes = await getAll();
    console.log(allAnecdotes);
    dispatch(anecdoteActions.replaceAnecdotes(allAnecdotes));

    //using .then below
    // getAll()
    //   .then((returnedAnecdotes) => {
    //     console.log(returnedAnecdotes);
    //     dispatch(anecdoteActions.replaceAnecdotes(returnedAnecdotes));
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };
};

export const sendAnecdotes = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = {
      content: anecdote,
      // id: getId(),
      votes: 0,
    };

    const createdAnecdote = await createAnecdote(newAnecdote);
    console.log(createdAnecdote);
    dispatch(anecdoteActions.newAnecdote(createdAnecdote));

    //using .then below
    // createAnecdote(newAnecdote)
    //   .then((returnedAnecdote) => {
    //     console.log(returnedAnecdote);
    //     dispatch(anecdoteActions.newAnecdote(returnedAnecdote));
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };
};

export const updateVote = (id, votedAnecdote) => {
  const changedAnecdote = {
    ...votedAnecdote,
    votes: votedAnecdote.votes + 1,
  };
  return async (dispatch) => {
    const updatedAnecdocte = await updateAnecdote(id, changedAnecdote);
    if (updatedAnecdocte) {
      const allAnecdotes = await getAll();
      dispatch(anecdoteActions.replaceAnecdotes(allAnecdotes));
    }
  };
};

const initialNotifState = {
  notific: null,
  filterInput: "",
};
const notificationSlice = createSlice({
  name: "notification",
  initialState: initialNotifState,
  reducers: {
    setNotification: (state, action) => {
      console.log("notif set");
      //written with mutation, notice 'return' has been removed
      state.notific = action.payload;
    },
    clearNotification: (state, action) => {
      console.log("clear noif");
      // wriiten in without mutation
      return {
        ...state,
        notific: action.payload,
      };
    },
    // notice i didnt later use the filteranecdotes here as the exercise require
    // to create a new reducer
    filterAnecdotes: (state, { payload }) => {
      state.filterInput = payload;
    },
  },
});

export const notify = (message, seconds) => {
  return (dispatch) => {
    dispatch(notifActions.setNotification(message));
    setTimeout(() => {
      dispatch(notifActions.setNotification(""));
    }, seconds * 1000);
  };
};

const filterSlice = createSlice({
  name: "filter",
  initialState: "",
  reducers: {
    filterAnecdotes: (state, { payload }) => {
      return payload;
    },
  },
});

const store = configureStore({
  reducer: {
    anecdotes: anecdoteSlice.reducer,
    notif: notificationSlice.reducer,
    filter: filterSlice.reducer,
  },
});

export const anecdoteActions = anecdoteSlice.actions;
export const notifActions = notificationSlice.actions;
export const filterActions = filterSlice.actions;
export default store;
