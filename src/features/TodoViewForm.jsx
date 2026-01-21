function TodoViewForm({
  sortField,
  setSortField,
  sortDirection,
  setSortDirection,
  queryString,
  setQueryString,
}) {
  const preventRefresh = (e) => e.preventDefault();

  return (
    <form onSubmit={preventRefresh}>
      <div style={{ marginBottom: '1rem' }}>
        <label>Search todos:</label>
        <input
          type="text"
          value={queryString}
          onChange={(e) => setQueryString(e.target.value)}
        />
        <button type="button" onClick={() => setQueryString('')}>
          Clear
        </button>
      </div>

      <div>
        <label>Sort by:</label>
        <select
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
        >
          <option value="title">Title</option>
          <option value="createdTime">Time added</option>
        </select>

        <label>Direction:</label>
        <select
          value={sortDirection}
          onChange={(e) => setSortDirection(e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </form>
  );
}

export default TodoViewForm;
