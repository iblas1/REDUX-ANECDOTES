import { combineReducers, createStore } from "redux";

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

const initialState = anecdotesAtStart.map(asObject);
console.log(initialState);
const reducer = (state = initialState, action) => {
  // console.log("state now: ", state);
  // console.log("action", action);
  if (action.type === "VOTE") {
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
  }
  if (action.type === "NEW_ANECDOTE") {
    return state.concat(action.payload);
  }
  return state;
};

export const voteAnecdote = (id) => {
  return {
    type: "VOTE",
    payload: id,
  };
};

export const newAnecdote = (data) => {
  const anecdote = {
    content: data,
    id: getId(),
    votes: 0,
  };
  return {
    type: "NEW_ANECDOTE",
    payload: anecdote,
  };
};

const store = createStore(reducer);
// to combine reducer just use
// const reducer = combineReducers({
//   name1: 'firtReducer',
//   name2: '2nd reducer'
// })

export default store;
