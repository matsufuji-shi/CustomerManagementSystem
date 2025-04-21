import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {getLists} from "../pages/CustomerListPage";
import SearchBar from "./SearchBar";
import '../styles.css';

function CustomerList()  {
    //テーブルの値が入る
    const [customer, setCustomer] =useState([]); //通常時
  
    const [filterCustomer,setFilterCustomer] = useState([]); //フィルタリング/検索から持ってきたデータ
    const navigate = useNavigate();
    const listHeader =["顧客名", "メールアドレス", "電話番号", "会社名" , "詳細"];

const fetchLists = async () => {
    try {
      const data = await getLists();  // APIから取得
      setCustomer(data);  // 取得したタスクを状態にセット
      setFilterCustomer(data); //フィルタリング状態もセット
    } catch (error) {
      console.error("Failed to fetch customer", error);
    }
  };

  // 初期の顧客リスト取得
  useEffect(() => {
    fetchLists();
  }, []);

  //追加
  const searchToData = (SearchBarData) => {
    console.log(SearchBarData)
    switch(SearchBarData){
      case "":
        setFilterCustomer(customer);
break;
      default:
        const filtered = filterCustomer.filter(c =>
            c.name.toLowerCase().includes(SearchBarData.toLowerCase())
          );
          console.log(filtered)
          setFilterCustomer(filtered);
    }
  }


    // 顧客詳細ページへ移動
    const goToGetCustomers = (id) => {
      navigate(`/detail/${id}`);
    };



return(
    <div>
      <h1>顧客一覧</h1>
        <SearchBar searchToData={searchToData}/>
        
        <table>
        <thead>
          <tr>
            {listHeader.map((Header,i) => 
            <th key={i}>{Header}</th>)}
          </tr>
        </thead>
        <tbody>
        {filterCustomer .map((data) => (
          <tr key={data.id}>
            <td>{data.name}</td>
            <td>{data.email}</td>
            <td>{data.phone}</td>
            <td>{data.company_name}</td>
            <td><button onClick={() => goToGetCustomers(data.id)} className="listButton">詳細</button></td>
          </tr>
        ))}
          </tbody>
      </table>

    </div>
)
};

export default CustomerList;