import React, { useState, useEffect } from "react";

function Pagination({ entriesPerPage,totalEntries,paginate,loading }) {
  const numberOfPages = [];

  for (let i = 1; i <= Math.ceil(totalEntries/entriesPerPage); i++) {
    numberOfPages.push(i);
  }
  const [currentButton, setCurrentButton] = useState(1);
  const [arrOfCurrButtons, setArrOfCurrButtons] = useState([]);

  useEffect(() => {
    let tempNumberOfPages = [...arrOfCurrButtons];

    let dotsInitial = "...";
    let dotsLeft = "... ";
    let dotsRight = " ...";

    if (numberOfPages.length < 6) {
      tempNumberOfPages = numberOfPages;
    } else if (currentButton >= 1 && currentButton <= 2) {
      tempNumberOfPages = [1, 2, 3, 4,dotsInitial, numberOfPages.length];
    } else if (currentButton === 4) {
      const sliced = numberOfPages.slice(0, 5);
      tempNumberOfPages = [...sliced, dotsInitial, numberOfPages.length];
    } else if (currentButton > 4 && currentButton < numberOfPages.length - 2) {
      const sliced1 = numberOfPages.slice(currentButton - 2, currentButton);
      const sliced2 = numberOfPages.slice(currentButton, currentButton + 1);
      tempNumberOfPages = [
        1,
        dotsLeft,
        ...sliced1,
        ...sliced2,
        dotsRight,
        numberOfPages.length,
      ];
    } else if (currentButton > numberOfPages.length - 3) {
      const sliced = numberOfPages.slice(numberOfPages.length - 4);
      tempNumberOfPages = [1, dotsLeft, ...sliced];
    } else if (currentButton === dotsInitial) {
      setCurrentButton(arrOfCurrButtons[arrOfCurrButtons.length - 3] + 1);
    } else if (currentButton === dotsRight) {
      setCurrentButton(arrOfCurrButtons[3] + 2);
    } else if (currentButton === dotsLeft) {
      setCurrentButton(arrOfCurrButtons[3] - 2);
    }

    setArrOfCurrButtons(tempNumberOfPages);
    paginate(currentButton);
  }, [currentButton,totalEntries]);
  return (
    <div className="text-xl">
      {loading && (
        <div className="text-center m-3">
          <a
            href="#"
            className={`${currentButton === 1 ? "hidden" : ""}`}
            onClick={() =>
              setCurrentButton((prev) => (prev <= 1 ? prev : prev - 1))
            }
          >
            Prev
          </a>

          {arrOfCurrButtons.map((item, index) => {
            return (
              <button
                key={index}
                className={`${
                  currentButton === item
                    ? "bg-black text-white rounded-sm p-3"
                    : "p-3"
                }`}
                onClick={() => setCurrentButton(item)}
              >
                {item}
              </button>
            );
          })}

          <button
            className={`${
              (currentButton === numberOfPages.length) ? "hidden" : ""
            }
            ${(totalEntries == 0)? "hidden" : ""
            }`}
            onClick={() =>
              setCurrentButton((prev) =>
                prev >= numberOfPages.length ? prev : prev + 1
              )
            }
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
export default Pagination;
