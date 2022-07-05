import axios from "axios";

const url = "http://localhost:4000/anecdotes";

const getAll = () => {
  const response = axios.get(url);
  return response.then((res) => res.data);
};

const createAnecdote = (obj) => {
  const response = axios.post(url, obj);
  return response.then((res) => res.data);
};

const updateAnecdote = (id, obj) => {
  const response = axios.put(`${url}/${id}`, obj);
  return response.then((res) => res.data);
};
export { getAll, createAnecdote, updateAnecdote };
