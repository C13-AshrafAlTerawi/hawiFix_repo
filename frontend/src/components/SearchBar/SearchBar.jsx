//css import
import "./SearchBar.css";

//react hooks import
import { useState } from "react";

//icons import
import { IoSearch } from "react-icons/io5";
const SearchBar = ({ items, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handelSearchSubmet = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };
  return (
    <>
      <div className="Search-input-content">
        <input
          className="Search-input"
          type="text"
          value={searchTerm}
          onChange={handelSearchSubmet}
          placeholder="Search..."
        />
        <span>
          <IoSearch size={22} />
        </span>
      </div>
    </>
  );
};
export default SearchBar;
