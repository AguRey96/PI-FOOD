import React from "react";

import { Link } from "react-router-dom";

import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className="main">
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className="text">
        <div className="lineOne">Are you looking</div>
        <div className="lineTwo">for a</div>
        <div className="lineThree">recipe ?</div>
      </div>
      <br></br>
      <Link to="/home">
        <button className="button">
          <span>Click Here </span>
        </button>
      </Link>
    </div>
  );
}
