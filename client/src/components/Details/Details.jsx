import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetail, clearDetails } from "../../redux/actions";
import { Link, useParams } from "react-router-dom";
import Loading from "../Loader/Loadign";
import "./Details.css";

export default function Details() {
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetail(id));
    return () => dispatch(clearDetails());
  }, [dispatch, id]);

  const recipeDetail = useSelector((state) => state.detail);

  let { name, image, summary, healthyScore, dishTypes, steps, diets } =
    recipeDetail;

  return (
    <div>
      {!image ? (
        <Loading />
      ) : (
        <div className="allDetail">
          <div>
            <Link to="/home">
              <button className="btnHome">
                <p>
                  <span>Home</span>
                </p>
              </button>
            </Link>
          </div>
          <div className="detail">
            <h1 className="nameD">{name}</h1>
            <div className="first">
              <img src={image} alt={`${name}`} />
              <div className="dishT">
                <h4>
                  <u>Dish Types</u>
                </h4>
                {dishTypes ? (
                  dishTypes.map((dt) => (
                    <div className="dish">
                      <ul>
                        <strong>{dt}</strong>
                      </ul>
                    </div>
                  ))
                ) : (
                  <p>
                    {" "}
                    <strong>No dishTypes</strong>
                  </p>
                )}
              </div>
              <div className="dietT">
                <h4>Diet Type</h4>
                {diets ? (
                  diets.map((diet) =>
                    typeof diet === "string" ? (
                      <div className="diet">
                        <ul>
                          <strong>{diet}</strong>
                        </ul>
                      </div>
                    ) : (
                      <div className="diet">
                        <strong>{diet.name}</strong>
                      </div>
                    )
                  )
                ) : (
                  <p>
                    {" "}
                    <strong>No diets</strong>
                  </p>
                )}
              </div>
              <div className="hS">
                <h4>Healty score</h4>
                <p>
                  <strong>{healthyScore}</strong>
                </p>
              </div>
            </div>
            <div className="second">
              <div className="summaryD">
                <h4>Summary</h4>
                <p>{summary}</p>
              </div>
              <div className="stepsD">
                <h4>Steps</h4>
                {steps ? (
                  steps.map((st) => (
                    <p>
                      <strong>Step {st.number}</strong>: {st.step}
                    </p>
                  ))
                ) : (
                  <p> No steps</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
