import { useEffect, useState } from "react";
import "../App.css";

const FAQItem = ({ question, answer, index }) => {
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    if (index === 0) {
      setIsShow(true);
    }
  }, []);

  const handleClick = () => {
    setIsShow((prev) => !prev);
  };

  return (
    <div className="faq-cont">
      <div className="que" onClick={handleClick}>
        <button className={isShow ? 'arrow':''}>{">"}</button>
        <div>{question}</div>
      </div>
      {isShow && (
        <div className="ans">
          <span>Ans:</span> {answer}
        </div>
      )}
    </div>
  );
};

export default FAQItem;
