const Notification = ({ message, type }) => {
  const messageStyle = {
    color: type === "success"? "green": "red",
    fontStyle: "italic",
    fontSize: 16,
    borderStyle: "solid",
    padding: 10,
    marginBottom: 20
  };
  if (message === null) return "";
  return <div style={messageStyle}>{message}</div>;
};

export default Notification;
