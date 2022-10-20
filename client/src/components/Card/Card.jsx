import React from "react";

export default function Card({ name, image, diets, healthyScore }) {
  return (
    <div>
      <h3>{name}</h3>
      <img src={image} alt="Img food" width="250px" height="200px" />
      <h4>Healty score: {healthyScore}</h4>
      <p>
        <b>Diet Type:</b>{" "}
        {diets?.map((d) =>
          typeof d === "string" ? <span> •{d}</span> : <span> •{d.name}</span>
        )}
      </p>
    </div>
  );
}
