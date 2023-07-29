import React, { useState } from "react";

function Search({ handleSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    handleSearch(event.target.value);
  };

  return (
    <div>
      <label>
        Search Transactions:
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search by description..."
        />
      </label>
    </div>
  );
}

export default Search;