import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetail, clearDetails } from "../../redux/actions";
import { Link, useParams } from "react-router-dom";
import Loading from "../Loader/Loadign";

export default function Details(props) {
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
        <>
          <Link to="/home">
            <button>HOME</button>
          </Link>
          <h1>{name}</h1>
          <br></br>
          <img
            src={image}
            alt={`Picture of ${name}`}
            width="450"
            height="300"
          />
          <br></br>
          <h4>Healty score: {healthyScore}</h4>
          <br></br>
          <h4>Summary</h4>
          <p>{summary}</p>
          <br></br>
          <br></br>
          <h4>Steps</h4>

          {steps ? (
            steps.map((st) => (
              <p>
                Step {st.number}: {st.step}
              </p>
            ))
          ) : (
            <p> No steps</p>
          )}

          <h4>dishTypes</h4>

          {dishTypes ? (
            dishTypes.map((dt) => (
              <p>
                <li>{dt}</li>
              </p>
            ))
          ) : (
            <p> No dishTypes</p>
          )}
          <h4>Diet Type:</h4>
          {diets ? (
            diets.map((diet) =>
              typeof diet === "string" ? (
                <p>
                  <li>{diet}</li>
                </p>
              ) : (
                <p>
                  <li>{diet.name}</li>
                </p>
              )
            )
          ) : (
            <p> No diets</p>
          )}
        </>
      )}
    </div>
  );
}
