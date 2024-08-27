import { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const fetchImages = async () => {
    setLoading(true);
    const url = "https://www.reddit.com/r/aww/top/.json?t=all";
    const response = await fetch(url);
    const data = await response.json();
    const res = data.data.children;
    console.log(res);
    const list = res
      .filter((item) => item.data.url_overridden_by_dest.includes(".jpg"))
      .map((item) => item.data.url_overridden_by_dest);
    setImages(list);
    setLoading(false);
  };

  const handleClick = (dir) => {
    console.log("curr", index);
    const lastIdx = images.length - 1;

    if (dir === "left") {
      console.log("last idx", lastIdx);
      if (index === 0) {
        setIndex(lastIdx);
      } else setIndex((idx) => idx - 1);
    } else if (dir === "right") {
      if (index === lastIdx) {
        //9 === 9 => index => 0
        setIndex(0);
      } else setIndex((idx) => idx + 1);
    }
  };

  useEffect(() => {
    const id = setInterval(() => {
      handleClick("right");
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, [index]);

  useEffect(() => {
    fetchImages();
  }, []);
  if(loading){
    return <h1>loading...</h1>
  }

  return (
    <div className="App">
      <button onClick={() => handleClick("left")}>{"<"}</button>
      <img src={images[index]} alt="not found" />
      <button onClick={() => handleClick("right")} className="right">
        {">"}
      </button>
    </div>
  );
}

export default App;
