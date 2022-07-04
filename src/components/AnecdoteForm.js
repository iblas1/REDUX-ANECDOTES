import { useDispatch } from "react-redux";
import { anecdoteActions, notifActions, sendAnecdotes } from "../store";
const AnecdoteForm = () => {
  const { newAnecdote } = anecdoteActions;
  const { setNotification, clearNotification } = notifActions;
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    let content = e.target.anecdote.value;
    // dispatch(newAnecdote(content));
    dispatch(sendAnecdotes(content));
    dispatch(setNotification(content));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 3000);
    e.target.anecdote.value = "";

    console.log(content);
  };
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={submitHandler}>
        <div>
          <input type={"text"} name={"anecdote"} />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
