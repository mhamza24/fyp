import React from "react";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  return (
    <div>
      <h1>Profile Page</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home Page</Link>
          </li>
          <li>
            <Link to="/details">Details Page</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ProfilePage;
