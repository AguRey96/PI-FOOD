import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipeByName } from "../../redux/actions";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const handlerChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    dispatch(getRecipeByName(search));
  };

  return (
    <div>
      <input type="text" placeholder="Search recipe" onChange={handlerChange} />
      <button type="submit" onClick={handlerSubmit}>
        {" "}
        Search{" "}
      </button>
    </div>
  );
}
