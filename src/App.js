import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import { getAnecdotes } from "./store";

const App = () => {
  const notification = useSelector((state) => state.notif.notific);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAnecdotes());
  }, []);
  return (
    <div>
      {notification && <Notification />}
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
