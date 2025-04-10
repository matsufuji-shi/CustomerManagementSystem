import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CustomerList = () => {
    //テーブルの値が入る
    const [customer, setCustomer] =useState([]);

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

    </div>
)
};

export default CustomerList;