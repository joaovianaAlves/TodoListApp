const Search = ({ search, setSearch }) => {
  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div className="flex flex-col items-start bg-[#2F4F4F] p-4 shadow-md rounded-md">
      <input
        type="text"
        value={search}
        onChange={handleChange}
        className="p-2 text-base rounded bg-[#696969] w-full box-border focus:outline-none focus:ring-2 focus:ring-blue-200"
        placeholder="Search..."
      />
    </div>
  );
};

export default Search;
