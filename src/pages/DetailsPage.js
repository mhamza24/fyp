import React from "react";
import { Link } from "react-router-dom";

const DetailsPage = () => {
  return (
    <div>
      <h1>Details Page</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home Page</Link>
          </li>
          <li>
            <Link to="/profile">Profile Page</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default DetailsPage;
