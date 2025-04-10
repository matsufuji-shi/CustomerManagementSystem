import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {getLists} from "../pages/CustomerListPage";

function CustomerList()  {
    //テーブルの値が入る
    const [customer, setCustomer] =useState([]);
    const listHeader =["顧客名", "メールアドレス", "電話番号", "会社名" , "詳細"];

const fetchLists = async () => {
    try {
      const data = await getLists();  // APIから取得
      console.log(data);
      setCustomer(data);  // 取得したタスクを状態にセット
      
    } catch (error) {
      console.error("Failed to fetch customer", error);
    }
  };

  // 初期のタスク取得
  useEffect(() => {
    fetchLists();
  }, []);

return(
    <div>
      <table>
        <thead>
          <tr>
            {listHeader.map((Header,i) => 
            <th key={i}>{Header}</th>)}
          </tr>
        </thead>
        <tbody>
        {customer.map((customer) => (
          <tr key={customer.id}>
            <td>{customer.name}</td>
            <td>{customer.email}</td>
            <td>{customer.phone}</td>
            <td>{customer.company_name}</td>
            <td> <Link to={`/detail/${customer.id}`}><button>編集</button></Link></td>
          </tr>
        ))}
          </tbody>
      </table>

    </div>
)
};

export default CustomerList;