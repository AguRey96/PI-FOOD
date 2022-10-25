import React from "react";
import "./Error.css";

export default function Error({ error }) {
  return (
    <div className="back">
      <div className="rotate">
        <div className="error">
          {error.diet ? (
            <h1>No hay recetas de {error.diet}</h1>
          ) : (
            <h1>No hay una receta con el nombre {error.search}</h1>
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
