import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CustomerList = () => {
    //テーブルの値が入る
    const [customer, setCustomer] =useState([]);
    const listHeader =["顧客名", "メールアドレス", "電話番号", "会社名" , "詳細"];

const fetchTasks = async () => {
    try {
      const data = await getLists();  // APIから取得
      setCustomer(data);  // 取得したタスクを状態にセット
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    }
  };

  // 初期のタスク取得
  useEffect(() => {
    fetchTasks();
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
        {data.map((row) => (
          <tr key={customer.id}>
            <td>{customer.name}</td>
            <td>{customer.email}</td>
            <td>{customer.phone}</td>
            <td>{customer.company_name}</td>
            <td> <Link to={`/detail/${id}`}><button>編集</button></Link></td>
          </tr>
        ))}
          </tbody>
      </table>

    </div>
)
};

export default CustomerList;