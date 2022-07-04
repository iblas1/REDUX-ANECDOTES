import { useSelector } from "react-redux";

const Notification = () => {
  const style = {
    marginLeft: "5px",
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  const notification = useSelector((state) => state.notif.notific);
  return <div style={style}>{notification}</div>;
};

export default Notification;
