import React, { useState } from "react";

const Search = ({ setCurrentSearch }) => {
  let [input, setInput] = useState("");

  //input標籤輸入值變動時執行inputHandler，將input設為input標籤輸入值（e.target.value）
  const inputHandler = (e) => {
    setInput(e.target.value);
  };

  return (
    <div>
      <input type="text" onChange={inputHandler} />
      <button
        onClick={() => {
          setCurrentSearch(input); //input變更後，將執行Homepage的useEffect，fetchData()
        }}
      >
        Search
      </button>
    </div>
  );
};

export default Search;
