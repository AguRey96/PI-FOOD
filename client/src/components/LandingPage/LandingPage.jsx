import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getDiet } from "../../redux/actions";

export default function LandingPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDiet());
  }, []);
  return (
    <div>
      <Link to="/home">
        <button>Wealcome</button>
      </Link>
    </div>
  );
}
