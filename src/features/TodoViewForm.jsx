import { useState, useEffect } from 'react';
import styled from 'styled-components';

//     const Viewform = styled.Viewform`
//   padding: 1rem;
// `;

function TodoViewForm({
  sortField,
  setSortField,
  sortDirection,
  setSortDirection,
  queryString,
  setQueryString,
}) {
  const preventRefresh = (e) => e.preventDefault();

  // Local state for the search input
  const [localQueryString, setLocalQueryString] = useState(queryString);

  // useEffect for debouncing the search input
  useEffect(() => {
    const debounce = setTimeout(() => {
      setQueryString(localQueryString);
    }, 500); // 500ms delay

    // Cleanup previous timeout on new keystroke
    return () => clearTimeout(debounce);
  }, [localQueryString, setQueryString]);

  return (
    <form onSubmit={preventRefresh}>
      <div style={{ marginBottom: '1rem' }}>
        <label>Search todos:</label>
        <input
          type="text"
          value={localQueryString}
          onChange={(e) => setLocalQueryString(e.target.value)}
        />
        <button type="button" onClick={() => setLocalQueryString('')}>
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
