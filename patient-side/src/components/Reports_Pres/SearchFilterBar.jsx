import React from "react";
import { FiSearch, FiFilter } from "react-icons/fi";

export default function SearchFilterBar({ search, setSearch }) {
  return (
    <div className="search-filter-bar">
      <FiSearch className="search-icon" />
      <input
        type="text"
        placeholder="Search by test, doctor, or date..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <button className="filter-btn">
        <FiFilter />
      </button>
    </div>
  );
}
