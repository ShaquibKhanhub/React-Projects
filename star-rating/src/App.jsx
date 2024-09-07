import { useState } from "react";

import "./App.css";

function App() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  console.log("rating", rating);
  console.log("hover", hover);
  console.log("((rating && hover) || hover)", (rating && hover) || hover);

  return (
    <div className="star-cont">
      <h1>Star Rating</h1>
      {[1, 2, 3, 4, 5].map((num, index) => (
        <button
          key={index}
          onClick={() => setRating(num)}
          onMouseOver={() => setHover(num)}
          onMouseLeave={() => setHover(num)}
        >
          <span
            className={`star ${
              num <= ((rating && hover) || hover) ? "on" : "off"
            }`}
          >
            &#9733;
          </span>
        </button>
      ))}
    </div>
  );
}

export default App;
