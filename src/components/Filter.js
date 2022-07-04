import { useState } from "react";
import { useDispatch } from "react-redux";
import { anecdoteActions, filterActions, notifActions } from "../store";

const Filter = () => {
  const { filterAnecdotes } = filterActions;
  const dispatch = useDispatch();
  const [filterInput, setFilterInput] = useState("");
  const handleChange = (event) => {
    setFilterInput(event.target.value);
    dispatch(filterAnecdotes(event.target.value));
  };
  const style = {
    marginBottom: 30,
  };

  return (
    <div style={style}>
      filter <input value={filterInput} onChange={handleChange} />
    </div>
  );
};

export default Filter;
