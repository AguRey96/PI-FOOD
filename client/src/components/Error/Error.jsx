import React from "react";
import "./Error.css";

export default function Error({ error }) {
  return (
    <div className="back">
      <div className="rotate">
        <div className="error">
          {error.diet ? (
            <h1>There are no {error.diet} recipes</h1>
          ) : (
            <h1>There is no recipe with the name {error.search}</h1>
          )}
        </div>
        <div>
          <button onClick={() => window.location.reload()} className="btnHome">
            <p>
              <span>Home</span>
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
