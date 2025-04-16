import React, {  useState} from "react";
import { useNavigate } from "react-router-dom";

import '../styles.css';

export default function SearchBar({searchToData}) {
  const [values, setValues] = useState(""); //入力値
  const navigate = useNavigate();
  
   // 顧客追加ページへ移動
   const goToAddCustomers = () => {
    navigate("/add-form");
  };


  return(
  <div className="searchBer">
      <input
        type="text"
        id="text"
        value={values}
        onChange={(e) => setValues(e.target.value)}
        placeholder="顧客名で検索"
        className="searchBerInput"
      />
      <button onClick={() => searchToData(values)} className="searchBarButton">フィルタリング</button>
      <button onClick={goToAddCustomers} className="searchBarButton">顧客情報追加</button>

      
  </div>
  )
};