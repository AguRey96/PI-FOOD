import React from "react";

export default function Paginado({ numLength, paginado, prevPage, nextPage }) {
  const pageNumber = [];

  for (let i = 0; i <= numLength; i++) {
    pageNumber.push(i + 1);
  }
  pageNumber.pop();

  return (
    <>
      <ul>
        <li>
          <button onClick={() => prevPage()}>Previous</button>
        </li>
        {pageNumber?.map((n) => (
          <li className="number">
            <button onClick={() => paginado(n)}>{n}</button>
          </li>
        ))}
        <li>
          <button onClick={() => nextPage()}>Next</button>
        </li>
      </ul>
    </>
  );
}
