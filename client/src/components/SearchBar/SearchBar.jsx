import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getRecipeByName } from "../../redux/actions";
import "./SearchBar.css";

export default function SearchBar({ page }) {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const handlerChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    dispatch(getRecipeByName(search));
    page(1);
    setSearch("");
  };

  return (
    <div className="bar">
      <div className="btn">
        <Link to="/create">
          <button className="btnCreate">
            <span>Create</span>
          </button>
        </Link>
      </div>
      <div className="barTitle">
        <Link to="/">
          <h1>Food App</h1>
        </Link>
      </div>
      <form className="search">
        <input
          type="text"
          placeholder="Search recipe"
          onChange={(e) => handlerChange(e)}
        />
        <button type="submit" onClick={(e) => handlerSubmit(e)}>
          Search
        </button>
      </form>
    </div>
  );
}
