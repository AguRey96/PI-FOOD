import React from "react";
import "./Load.css";
import Loader from "../../Images/Loader.gif";
export default function Loading() {
  return (
    <div className="LoaderBg">
      <img src={Loader} alt="Loading..." />
      <div className="backGif"> </div>
    </div>
  );
}
