import React from "react";
import { Link } from "react-router-dom";

const Card = ({ categories, tags }) => {
  return (
    <>
      {categories && categories.length > 0 && (
        <>
          <h1 className="text-white text-3xl lg:text-4xl font-bold m-3">
            {tags ? "Tags" : "Categories"}
          </h1>
          <div className="bg-white bg-opacity-30 p-4 rounded-lg shadow-lg m-2">
            <ul>
              {categories.map((category, index) => (
                <li key={index} className="text-white lg:text-xl mb-2">
                  <Link
                    to={`/${tags ? "tags" : "categories"}/${category}`}
                    className="text-indigo hover:underline"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default Card;
