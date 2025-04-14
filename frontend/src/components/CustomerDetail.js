import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axiosInstance from "../services/api";  // axiosインスタンスをインポート


function CustomerDetail() {
  const { id } = useParams(); 
  console.log(id);
  const [list, setList] = useState(null);
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // タスクの取得
  useEffect(() => {

    if (id) {
      const fetchList = async () => {
        try {
          const response = await axiosInstance.get(`/customers/${id}`);
          console.log(response);
          setList(response.data);
          setLoading(false);
        } catch (error) {
          console.error("タスクの取得に失敗しました", error);
          setError("タスクの取得に失敗しました");
          setLoading(false);  
        }
      };
      fetchList();
    } else {
      console.log("idが取得できていません");
    }
  }, [id]);

  // タスクの削除
  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/customers/${id}`);
      console.log("タスクが削除されました");
      navigate("/"); // 削除後、一覧ページに戻る
    } catch (error) {
      console.error("タスクの削除に失敗しました", error);
    }
  };

  // ローディング状態の表示
  if (loading) {
    return <p>タスクを読み込み中...</p>;
  }

  // エラーが発生した場合の表示
  if (error) {
    return <p>{error}</p>;
  }

  // タスクが見つかった場合の表示
  return (
    <div>
      <h1>顧客詳細</h1>
      {list ? (
        <>
          <h2>{list.name}</h2>
          <p><strong>メールアドレス:</strong>{list.email}</p>
          <p><strong>電話番号:</strong> {list.phone}</p>
          <p><strong>住所:</strong> {list.address}</p>  
          <p><strong>会社名:</strong> {list.company_name}</p>
          <Link to={`/form/${id}`}><button>編集</button></Link>
          <button onClick={handleDelete}>削除</button>
        </>
      ) : (
        <p>タスクが存在しません。</p>
      )}
    </div>
  );
}

export default CustomerDetail;