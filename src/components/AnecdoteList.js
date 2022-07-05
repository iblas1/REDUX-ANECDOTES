import { useSelector, useDispatch } from "react-redux";
import { getAll, updateAnecdote } from "../services/anecodotes";
import { anecdoteActions, notifActions, updateVote } from "../store";
import { notify } from "../store";
const AnecdoteList = () => {
  const { setNotification, clearNotification } = notifActions;
  const anecdotes = useSelector((state) => state.anecdotes);
  const filterInput = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const vote = (id) => {
    console.log("vote", id);
    dispatch(anecdoteActions.voteAnecdote(id));
    const votedAnecdote = anecdotes.find((anecdote) => anecdote.id === id);
    dispatch(updateVote(id, votedAnecdote));
    // updateAnecdote(id, {
    //   ...votedAnecdote,
    //   votes: votedAnecdote.votes + 1,
    // }).then((an) =>
    //   getAll().then((res) => dispatch(anecdoteActions.replaceAnecdotes(res)))
    // );

    dispatch(notify(votedAnecdote.content, 2));
    // dispatch(setNotification(votedAnecdote.content));
    // setTimeout(() => {
    //   dispatch(setNotification(""));
    //   console.log("cleared");
    // }, 3000);
  };

  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);
  const filteredAnecdotes = sortedAnecdotes.filter((anecdote) => {
    return anecdote.content.toLowerCase().includes(filterInput.toLowerCase());
  });
  console.log(sortedAnecdotes);
  // console.log(filterInput);
  console.log(filteredAnecdotes);
  return (
    <>
      {filteredAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
