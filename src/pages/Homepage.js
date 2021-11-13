import React, { useState, useEffect } from "react";
import Search from "../components/Search";
require("dotenv").config();

const Homepage = () => {
  let [image, setImage] = useState(null);
  let [page, setPage] = useState(1); //其實起始值設多少都沒差，因為進入頁面時useEffect執行fetchData(curatedURL)會把Page設成2
  let [currentSearch, setCurrentSearch] = useState("");

  const apiKey = "563492ad6f91700001000001cb4ec69d50894c53b7cdae4f6d2f6cf6"; //React要使用的環境變數須前綴（prefix）:REACT_APP
  const curatedURL = "https://api.pexels.com/v1/curated?per_page=4"; //Pexels精選照片
  const searchURL = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=4`; //pexels搜尋照片

  const fetchData = (url) => {
    fetch(url, { headers: { Authorization: apiKey } })
      .then((data) => data.json())
      .then((parsedData) => setImage(parsedData.photos));

    //避免「more許多次後，搜尋新字詞，再按more會延續先前頁數」，故須在按下Search Component的search button執行此功能時，把page設回第2頁，使搜尋新字詞後的more重新從第2頁開始fetch
    setPage(2);
  };

  //按下 more button 則再 fetch data，並連接新、舊陣列
  const fetchMore = () => {
    let newURL = "";
    if (currentSearch === "") {
      newURL = `https://api.pexels.com/v1/curated?page=${page}&per_page=4`; // 其實就是 curatedURL，但須從上方獨立出來、定義在這，否則顯示頁數的設計會亂掉
    } else {
      newURL = `https://api.pexels.com/v1/search?query=${currentSearch}&page=${page}&per_page=4`; //其實就是 searchURL
    }

    fetch(newURL, { headers: { Authorization: apiKey } })
      .then((data) => data.json())
      .then((parsedData) => setImage(image.concat(parsedData.photos))); //連接既有的photos陣列與新的photos陣列

    setPage(page + 1); //使下次 more fetch下一頁
  };

  //進入頁面或CurrentSearch變更時fetch data
  useEffect(() => {
    if (currentSearch === "") {
      fetchData(curatedURL);
    } else {
      fetchData(searchURL);
    }
  }, [currentSearch]);

  return (
    <div className="pagebody">
      {/* 當成prop傳給Search component的search button用 */}
      <div className="search">
        <Search setCurrentSearch={setCurrentSearch} />
      </div>

      <div className="cards">
        {/* If(imaage) then 把fetch到的資料呈現到頁面上（ PartA && PartB 意思即為 If PartA then PartB） */}
        {image &&
          image.map((obj) => {
            return (
              <div className="card">
                <div className="image">
                  {/* target屬性使點擊a標籤在新分頁開啟連結 */}
                  <a href={obj.url} target="_blank">
                    <img key={obj.id} src={obj.src.medium}></img>
                  </a>
                </div>
                <div className="info">
                  <a href={obj.photographer_url} target="_blank">
                    {obj.photographer}
                  </a>
                </div>
              </div>
            );
          })}
      </div>

      <div className="more">
        <button onClick={fetchMore}>More</button>
      </div>
    </div>
  );
};

export default Homepage;
