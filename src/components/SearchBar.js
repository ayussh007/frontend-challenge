import React from "react";
import PageviewRoundedIcon from '@mui/icons-material/PageviewRounded';
import "./SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <form className="searchbar-form" onSubmit={handleSubmit}>
      <label>
        <input placeholder="Search for products" type="text" value={searchTerm} onChange={handleChange} />
      </label>
      <button type="submit" style={{margin: "5px"}}>
      <PageviewRoundedIcon style={{color: "black", backgroundColor: "darkgrey", margin: "2px"}}/>
      </button>
    </form>
  );
};

export default SearchBar;