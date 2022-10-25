import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  filterByDiets,
  getRecipes,
  sortByHealtyScore,
  sortByName,
  getDiet,
} from "../../redux/actions";
import Card from "../Card/Card";
import SearchBar from "../SearchBar/SearchBar";
import Paginado from "../Paginado/Paginado";
import Loading from "../Loader/Loadign";
import Error from "../Error/Error";
import "./Home.css";

export default function Home() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const allRecipes = state.allRecipes;
  const { diets } = state.diet;
  const error = state.error;

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
    dispatch(getDiet());
  }, [dispatch]);

  const handlerFilter = (e) => {
    if (e.target.name === "sortScore")
      dispatch(sortByHealtyScore(e.target.value));
    if (e.target.name === "sortName") dispatch(sortByName(e.target.value));
    if (e.target.name === "filterByDiets")
      dispatch(filterByDiets(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className={allRecipes.length ? "home" : "Loading"}>
      {!allRecipes.length || error.diet || error.search ? (
        <>
          {!error.diet && !error.search ? <Loading /> : <Error error={error} />}
        </>
      ) : (
        <>
          <div className="sBar">
            <SearchBar page={setCurrentPage} />
          </div>

          {/* filtros */}
          <div className="filters">
            {/* HealtScore */}
            <div>
              <select
                className="sortScore"
                name="sortScore"
                onChange={handlerFilter}
              >
                <option disabled selected>
                  Sort by Healthy Score
                </option>
                <option value="Asc">Ascendent</option>
                <option value="Desc">Descendent</option>
              </select>
            </div>
            {/* Alfabeticamente */}
            <div>
              <select
                className="sortName"
                name="sortName"
                onChange={handlerFilter}
              >
                <option disabled selected>
                  Sort Names
                </option>
                <option value="A-Z">Az</option>
                <option value="Z-A">Za</option>
              </select>
            </div>
            {/* Dietas */}
            <div>
              <select
                className="filterDiets"
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

            <div className="refresh">
              <button
                onClick={() => window.location.reload()}
                className="reload"
              >
                <span>Reload</span>
              </button>
            </div>
          </div>

          <div className="pag">
            <Paginado
              key={currentPage}
              numLength={numLength}
              paginado={paginado}
              prevPage={prevPage}
              nextPage={nextPage}
              currentPage={currentPage}
            />
          </div>
          <div className="grid">
            {currentCards?.map((receta) => (
              <Link
                className="link"
                key={receta.id}
                to={`/recipes/${receta.id}`}
              >
                <Card
                  key={receta.id}
                  name={receta.name}
                  image={receta.image}
                  diets={receta.diets}
                  healthyScore={receta.healthyScore}
                />
              </Link>
            ))}
          </div>
          <div className="pag2">
            <Paginado
              key={currentPage}
              numLength={numLength}
              paginado={paginado}
              prevPage={prevPage}
              nextPage={nextPage}
              currentPage={currentPage}
            />
          </div>
        </>
      )}
    </div>
  );
}
