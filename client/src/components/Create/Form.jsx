import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postRecipe, getDiet } from "../../redux/actions";
import { useHistory } from "react-router-dom";
import { validatorName, validatorSummary } from "./validatorFunctions";
import "./Form.css";

export default function Form() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { diets } = useSelector((state) => state.diet);

  const dishTypes = [
    "side dish",
    "lunch",
    "main course",
    "main dish",
    "dinner",
    "morning meal",
    "brunch",
    "breakfast",
  ];

  const [input, setInput] = useState({
    name: "",
    summary: "",
    image: "",
    healthyScore: 0,
    dishTypes: [],
    steps: [],
    diets: [],
  });

  const [steps, setSteps] = useState({
    arrSteps: [],
  });

  const [errorButton, setErrorButton] = useState(true);
  const [errorInput, setErrorInput] = useState({});

  useEffect(() => {
    dispatch(getDiet());
  }, [dispatch]);

  const handlerChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === "healthyScore") {
      const number = Number(e.target.value);
      setInput({
        ...input,
        [e.target.name]: number,
      });
    }

    if (e.target.name === "steps") {
      const name = e.target.value;
      const n = e.target.id;
      steps.arrSteps[n - 1].step = name;
      setInput({
        ...input,
        steps: steps.arrSteps,
      });
    }

    if (e.target.name === "dishTypes") {
      setInput({
        ...input,
        dishTypes: [...new Set([...input.dishTypes, e.target.value])],
      });
    }

    if (e.target.name === "diets") {
      e.target.checked
        ? setInput({
            ...input,
            diets: [...new Set([...input.diets, e.target.value])],
          })
        : setInput({
            ...input,
            diets: input.diets.filter((a) => a !== e.target.value),
          });
    }

    setErrorInput(validatior(input));
    Object.entries(errorInput).length === 0
      ? setErrorButton(false)
      : setErrorButton(true);
  };

  const handlerdelete = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      dishTypes: input.dishTypes.filter((a) => a !== e.target.value),
    });
  };

  const handlerSteps = (e) => {
    const n = e.target.value;
    const cp = [];
    for (let i = 1; i <= n; i++) {
      cp.push({ number: i, step: "" });
    }
    setSteps({
      ...steps,
      arrSteps: cp,
    });
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    dispatch(postRecipe(input));
    alert("Recipe Created");
    setInput({
      name: "",
      summary: "",
      image: "",
      healthyScore: 0,
      dishTypes: [],
      steps: [],
      diets: [],
    });
    setSteps({ arrSteps: [] });
    history.push("/home");
  };

  const handlerHome = (e) => {
    e.preventDefault();
    history.push("/home");
  };

  const validatior = (data) => {
    let error = {};
    validatorName(data.name) && (error.name = validatorName(data.name));
    validatorSummary(data.summary) &&
      (error.summary = validatorSummary(data.summary));
    return error;
  };

  return (
    <div className="linkform">
      <div>
        <button className="btnHome" onClick={handlerHome}>
          <p>
            <span>Home</span>
          </p>
        </button>
      </div>

      <form className="form" onSubmit={(e) => handlerSubmit(e)}>
        <h1>CREAR RECETA</h1>
        <div className="name">
          <label>Name</label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={handlerChange}
          />
          {errorInput.name ? (
            <p>
              <small>{errorInput.name}</small>
            </p>
          ) : (
            false
          )}
        </div>
        <div className="summary">
          <label>Summary: </label>
          <textarea
            type="text"
            value={input.summary}
            name="summary"
            onChange={handlerChange}
          />
          {errorInput.summary ? (
            <p>
              <small>{errorInput.summary}</small>
            </p>
          ) : (
            false
          )}
        </div>
        <div className="image">
          <label>Image: </label>
          <input
            type="url"
            value={input.image}
            name="image"
            onChange={handlerChange}
          />

          {input.image ? (
            <img className="prevImg" src={input.image} alt="" />
          ) : (
            false
          )}
        </div>
        <div className="healthyScore">
          <label>HealthyScore : {input.healthyScore}</label>
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            name="healthyScore"
            value={input.healthyScore}
            onChange={handlerChange}
          ></input>
        </div>
        <div className="dishTypes">
          <select name="dishTypes" onChange={(e) => handlerChange(e)}>
            <option disabled selected>
              Dish Types
            </option>
            {dishTypes.map((dt) => (
              <option value={dt}>{dt}</option>
            ))}
          </select>
          <div>
            {input.dishTypes.map((el) => (
              <p>
                {el}
                <button value={el} onClick={(e) => handlerdelete(e)}>
                  x
                </button>
              </p>
            ))}
          </div>
        </div>
        <div className="allSteps">
          <div className="nsteps">
            <label>How many steps does the recipe have? </label>
            <input
              type="number"
              min="1"
              pattern="^[0-9]+"
              value={steps.number}
              name="stepsNumber"
              onChange={handlerSteps}
            />
          </div>
          {steps.arrSteps?.map((e) => (
            <div className="steps">
              <label>Step: {e.number}</label>
              <textarea
                type="text"
                value={e.step}
                name="steps"
                onChange={handlerChange}
                id={e.number}
              />
            </div>
          ))}
        </div>
        <label>Type of Diet</label>
        <div className="allDiets">
          {diets?.map((dt) => (
            <label>
              <input
                type="checkbox"
                value={dt.name}
                name="diets"
                onChange={(e) => handlerChange(e)}
              />
              {dt.name}
            </label>
          ))}
        </div>
        <button
          className={!errorButton ? "submit" : "disabled"}
          type="submit"
          disabled={errorButton ? true : false}
        >
          <span>Create</span>
        </button>
      </form>
    </div>
  );
}
