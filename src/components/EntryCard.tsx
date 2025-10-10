const EntryCard = ({ entry }) => {
  const date = new Date(entry.createdAt).toDateString();
  return <div>{date}</div>;
};

export default EntryCard;
