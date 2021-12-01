import React from "react";
import { Link } from "react-router-dom";

function Recipe({ recipe }) {
  const { title, year, description, image, _id } = recipe;
  return (
    <summary>
      <img src={`img/${image}`} alt={title} />
      <h2>
        <Link to={_id}>{title}</Link>
      </h2>
      <p>{description}</p>
      <small>Published: {year}</small>
    </summary>
  );
}

export default Recipe;
