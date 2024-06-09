import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <nav>
        <ul>
          <li>
            <Link to="/details">Details Page</Link>
          </li>
          <li>
            <Link to="/profile">Profile Page</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default HomePage;
