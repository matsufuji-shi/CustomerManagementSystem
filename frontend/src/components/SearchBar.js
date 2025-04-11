// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {getLists} from "../pages/CustomerListPage";

// function SearchBar(){
//   const [customer, setCustomer] =useState([]); //通常時
//   const [filterCustomer,setFilterCustomer] = useState([]); //フィルタリング
//   const [values, setValues] = useState(""); //入力値
//   const [isButtonPressed, setIsButtonPressed] = useState(false); //ボタン
//   const navigate = useNavigate();
//   const listHeader =["顧客名", "メールアドレス", "電話番号", "会社名" , "詳細"];

//   const fetchLists = async () => {
//       try {
//         const data = await getLists();  // APIから取得
//         setCustomer(data);  // 取得したタスクを状態にセット
//         setFilterCustomer(data); //フィルタリング状態もセット
//       } catch (error) {
//         console.error("Failed to fetch customer", error);
//       }
//     };
  
//     // 初期の顧客リスト取得
//     useEffect(() => {
//       fetchLists();
//     }, []);

//   // フィルター実行
//   const filter = () => {
//     const filtered = customer.filter((c) =>
//       c.name.toLowerCase().includes(values.toLowerCase())
//     );
//     setFilterCustomer(filtered);  // フィルタリングされたデータをセット
//     setIsButtonPressed(true); //ボタンを正にする
//   };

//    // 顧客追加ページへ移動
//    const goToAddCustomers = () => {
//     navigate("/add-form");
//   };
// // // フィルタリングページへ移動
// // const goToSearchBar = () => {
// //   navigate("/search");
// // };
// // 顧客詳細ページへ移動
// const goToGetCustomers = (id) => {
//   navigate(`/detail/${id}`);
// };

//   return(
//   <div>
//       <input
//         type="text"
//         id="text"
//         value={values}
//         onChange={(e) => setValues(e.target.value)}
//         placeholder="顧客名で検索"
//       />
//       <button onClick={filter}>フィルタリング</button>
//       <button onClick={goToAddCustomers}>顧客情報追加</button>

//       {!input.value || !isButtonPressed ? (
//         <p></p>
//       ):(
//       <table>
//         <thead>
//           <tr>
//             {listHeader.map((Header,i) => 
//             <th key={i}>{Header}</th>)}
//           </tr>
//         </thead>
//         <tbody>
//         {filterCustomer.map((filterCustomer) => (
//           <tr key={filterCustomer.id}>
//             <td>{filterCustomer.name}</td>
//             <td>{filterCustomer.email}</td>
//             <td>{filterCustomer.phone}</td>
//             <td>{filterCustomer.company_name}</td>
//             <td><button onClick={() => goToGetCustomers(filterCustomer.id)}>詳細</button></td>
//           </tr>
//         ))}
//           </tbody>
//       </table>
//       )}

//   </div>
//   )
// };

// export default SearchBar;