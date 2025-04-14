import React, { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import {getLists} from "../pages/CustomerListPage";

export default function SearchBar({searchToData}) {
  const [customer, setCustomer] =useState([]); //通常時
  const [filterCustomer,setFilterCustomer] = useState([]); //フィルタリング
  const [values, setValues] = useState(""); //入力値
  // const [isButtonPressed, setIsButtonPressed] = useState(false); //ボタン
  const navigate = useNavigate();
  // const listHeader =["顧客名", "メールアドレス", "電話番号", "会社名" , "詳細"];

  const fetchLists = async () => {
      try {
        const data = await getLists();  // APIから取得
        // setCustomer(data);  // 取得したタスクを状態にセット
        setFilterCustomer(data); //フィルタリング状態もセット
      } catch (error) {
        console.error("Failed to fetch customer", error);
      }
    };
  
    // 初期の顧客リスト取得
    useEffect(() => {
      fetchLists();
    }, []);

  // フィルター実行
//   const filter = () => {
//     const filtered = customer.filter((c) =>
//       c.name.toLowerCase().includes(values.toLowerCase())
//     );
//     setFilterCustomer(filtered);  
//     // フィルタリングされたデータをセット
//   };

   // 顧客追加ページへ移動
   const goToAddCustomers = () => {
    navigate("/add-form");
  };


  return(
  <div>
      <input
        type="text"
        id="text"
        value={values}
        onChange={(e) => setValues(e.target.value)}
        placeholder="顧客名で検索"
      />
      <button onClick={() => searchToData(values)}>フィルタリング</button>
      <button onClick={goToAddCustomers}>顧客情報追加</button>

      
  </div>
  )
};




//子から親への伝達参考
// import React from 'react'
// // import { Button } from 'semantic-ui-react';

// export default function Child({childToParent}) {
//     const data = "This is data from Child Component to the Parent Component."
//     return (
//         <div>
//             <button primary onClick={() => childToParent(data)}>Click Child</button>
//         </div>
//     )
// }