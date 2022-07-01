import { useDispatch } from "react-redux";
import { newAnecdote } from "../reducers/anecdoteReducer";
const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    let content = e.target.anecdote.value;
    dispatch(newAnecdote(content));
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
