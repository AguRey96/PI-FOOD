import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  filterByDiets,
  getRecipes,
  sortByHealtyScore,
  sortByName,
} from "../../redux/actions";
import Card from "../Card/Card";
import SearchBar from "../SearchBar/SearchBar";
import Paginado from "../Paginado/Paginado";
import Loading from "../Loader/Loadign";

export default function Home() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const allRecipes = state.allRecipes;
  const { diets } = state.diet;

  /* PAGINADO */
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(9);
  const lastCard = currentPage * cardsPerPage;
  const firstCard = lastCard - cardsPerPage;
  const currentCards = allRecipes.slice(firstCard, lastCard);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const numLength = Math.ceil(allRecipes.length / cardsPerPage);
  const nextPage = () => {
    if (numLength !== currentPage) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  const handlerClick = (e) => {
    e.preventDefault();
    dispatch(getRecipes());
  };

  const handlerFilter = (e) => {
    if (e.target.name === "sortScore")
      dispatch(sortByHealtyScore(e.target.value));
    if (e.target.name === "sortName") dispatch(sortByName(e.target.value));
    if (e.target.name === "filterByDiets")
      dispatch(filterByDiets(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div>
      {!allRecipes.length ? (
        <Loading />
      ) : (
        <>
          <div>
            <SearchBar />
          </div>
          <div>
            <h1> Comidas wachin</h1>
            <button onClick={handlerClick}>Reload recipes</button>
            <Link to="/create">
              <button>Create</button>
            </Link>
          </div>

          {/* filtros */}
          <div>
            {/* Alfabeticamente */}
            <select name="sortName" onChange={handlerFilter}>
              <option disabled selected>
                Sort Names
              </option>
              <option value="A-Z">Az</option>
              <option value="Z-A">Za</option>
            </select>
          </div>

          <div>
            {/* Dietas */}
            <select
              name="filterByDiets"
              defaultValue={"All"}
              onChange={handlerFilter}
            >
              <option value="All">All Diets</option>
              {diets?.map((dt) => (
                <option value={dt.name}>{dt.name}</option>
              ))}
            </select>
          </div>

          <div>
            {/* HealtScore */}
            <select name="sortScore" onChange={handlerFilter}>
              <option disabled selected>
                Sort Score
              </option>
              <option value="Asc">Ascendent</option>
              <option value="Desc">Descendent</option>
            </select>
          </div>

          <div>
            <Paginado
              numLength={numLength}
              paginado={paginado}
              prevPage={prevPage}
              nextPage={nextPage}
            />
          </div>
          <div>
            {currentCards?.map((receta) => (
              <Link key={receta.id} to={`/recipes/${receta.id}`}>
                <Card
                  name={receta.name}
                  image={receta.image}
                  diets={receta.diets}
                  healthyScore={receta.healthyScore}
                />
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
