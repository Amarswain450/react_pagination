import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Pagination = ({ showPerPage, onPaginationChange, total }) => {
  const [counter, setCounter] = useState(1);
  const [numberOfButtons, setNumberOfButoons] = useState(
    Math.ceil(total / showPerPage)
  );
  console.log(numberOfButtons);

  useEffect(() => {
    const value = showPerPage * counter;
    onPaginationChange(value - showPerPage, value);
  }, [counter]);

  const onButtonClick = (type) => {
    if (type === "prev") {
      if (counter === 1) {
        setCounter(1);
      } else {
        setCounter(counter - 1);
      }
    } else if (type === "next") {
      if (numberOfButtons === counter) {
        setCounter(counter);
      } else {
        setCounter(counter + 1);
      }
    }
  };
  return (
    <div className="d-flex justify-content-start">
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <Link
              className="page-link"
              to="/"
              onClick={() => onButtonClick("prev")}
            >
              Previous
            </Link>
          </li>

          {new Array(numberOfButtons).fill("").map((el, index) => (
            <li className={`page-item ${index + 1 === counter ? "active" : null}`}>
              <Link
                className="page-link"
                to="/"
                onClick={() => setCounter(index + 1)}
              >
                {index + 1}
              </Link>
            </li>
          ))}
          <li className="page-item">
            <Link
              className="page-link"
              to="/"
              onClick={() => onButtonClick("next")}
            >
              Next
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;