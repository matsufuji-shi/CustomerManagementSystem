import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {addList} from "../pages/CustomerFormPage";
import axiosInstance from "../services/api";

function CustomerForm({ onListAdded }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  // まとめて管理する formState
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    company_name: "",
  });
  const [error, setError] = useState("");
  
  const [originalFormState, setOriginalFormState] = useState(formState);

  // 編集モードならデータ取得   OK
  useEffect(() => {
    if (isEditing) {
      const fetchTask = async () => {
        try {
          const { data } = await axiosInstance.get(`/customers/${id}`);
          setFormState({
            name: data.name,
            email: data.email,
            phone: data.phone,
            address: data.address,
            company_name: data.company_name,
          });
          setOriginalFormState({
            name: data.name,
            email: data.email,
            phone: data.phone,
            address: data.address,
            company_name: data.company_name,
          });
        } catch (error) {
          console.error("タスクの取得に失敗しました", error);
        }
      };
      fetchTask();
    }
  }, [id, isEditing]);

  // 共通の変更ハンドラー
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  // 保存処理
  const handleSave = async (e) => {
    e.preventDefault();

    const { name, email, phone, address } = formState;
    //if文OK
    if (!name || !email || !phone || !address) {
      alert("名前・メールアドレス・電話番号・住所の入力が必要です");
      return;
    }
    
    setError("");  // エラーをリセット
  

    try {
      if (isEditing) {
        await axiosInstance.put(`/customers/${id}`, formState);
        console.log("タスクが更新されました:", name);
      } else {
        await addList(formState);
        console.log("タスクが追加されました:", name);

        setFormState({
          title: "",
          description: "",
          dueDate: "",
          status: "未完了",
        });
        if (onListAdded) onListAdded();
      }
      navigate("/");
    } catch (error) {
      console.error("タスクの処理に失敗しました", error);
    }
  };

  // キャンセル処理 OK
  const handleCancel = () => {
    setFormState(originalFormState);
    navigate(`/detail/${id}`);
  };

  return (
    <div className={isEditing ? "customerList" : ""}>
      <h2>顧客追加/編集</h2>
      <form onSubmit={handleSave}>
        <div>顧客名：</div>
        <input
          type="text"
          name="name"
          pattern=".{1,255}"
          placeholder="顧客名を入力"
          value={formState.name}
          onChange={handleChange}
        />
         <div>メールアドレス：</div>
        <input
          type="email"
          name="email"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
          placeholder="メールアドレスを入力"
          value={formState.email}
          onChange={handleChange}
        />
        <div>電話番号：</div>
        <input
          type="tel"
          name="phone"
          pattern="\d{2,4}-\d{3,4}-\d{3,4}"
          placeholder="電話番号を入力"
          value={formState.phone}
          onChange={handleChange}
        />
        <div>住所：</div>
        <input
          type="text"
          name="address"
          placeholder="住所を入力"
          value={formState.address}
          onChange={handleChange}
          />
        <div>会社名：</div>
        <input
          type="text"
          name="company_name"
          pattern="{1,255}"
          placeholder="会社名を入力"
          value={formState.company_name}
          onChange={handleChange}
          />
          <br/>
        <button type="submit">{isEditing ? "保存" : "追加"}</button>
        {isEditing && (
          <button type="button" onClick={handleCancel}>
            キャンセル
          </button>
        )}
      </form>
    </div>
  );
}

export default CustomerForm;