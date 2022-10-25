import React from "react";
import "./Card.css";

export default function Card({ name, image, diets, healthyScore }) {
  return (
    <div className="container">
      <div>
        <img className="imgCard" src={image} alt="Img food" />
      </div>
      <div>
        <h3 className="nameCard">{name}</h3>
      </div>
      <p>
        <b>Diet Type:</b>{" "}
        {diets?.map((d) =>
          typeof d === "string" ? <span> •{d}</span> : <span> •{d.name}</span>
        )}
      </p>
      <div>
        <h4 className="hsCard">Healty score: {healthyScore}</h4>
      </div>
    </div>
  );
}
