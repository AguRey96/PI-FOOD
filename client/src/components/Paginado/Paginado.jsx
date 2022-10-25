import React from "react";
import "./Paginado.css";

export default function Paginado({
  numLength,
  paginado,
  prevPage,
  nextPage,
  currentPage,
}) {
  const pageNumber = [];

  for (let i = 0; i <= numLength; i++) {
    pageNumber.push(i + 1);
  }
  pageNumber.pop();

  return (
    <>
      <nav className="all">
        <div>
          <button className="prev" onClick={() => prevPage()}>
            <span>Previous</span>
          </button>

          {pageNumber?.map((n) => (
            <button
              onClick={() => paginado(n)}
              className={currentPage === n ? "active" : "number"}
            >
              {n}
            </button>
          ))}

          <button className="next" onClick={() => nextPage()}>
            <span>Next</span>
          </button>
        </div>
      </nav>
    </>
  );
}
