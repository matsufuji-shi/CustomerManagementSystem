import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {addList} from "../pages/CustomerFormPage";

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

  const [originalFormState, setOriginalFormState] = useState(formState);

  // 編集モードならデータ取得
  useEffect(() => {
    if (isEditing) {
      const fetchTask = async () => {
        try {
          const { data } = await addList.get(`/customers/${id}`);
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

  // 共通の変更ハンドラー  次回ここから変更
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  // 保存処理
  const handleSave = async (e) => {
    e.preventDefault();

    const { name, email, phone, address } = formState;
    if (!name || !email || !phone || !address) {
      alert("名前・メールアドレス・電話番号・住所の入力が必要です");
      return;
    }

    try {
      if (isEditing) {
        await addList.put(`/customers/${id}`, formState);
        console.log("タスクが更新されました:", title);
      } else {
        await addList(formState);
        console.log("タスクが追加されました:", title);

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

  // キャンセル処理
  const handleCancel = () => {
    setFormState(originalFormState);
    navigate(`/customers/${id}`);
  };

  return (
    <div className={isEditing ? "customerList" : ""}>
      <h2>顧客追加/編集</h2>
      <form onSubmit={handleSave}>
        <input
          type="text"
          name="name"
          placeholder="顧客名を入力"
          value={formState.name}
          onChange={handleChange}
        />
        <br />
        <input
          type="email"
          name="email"
          placeholder="メールアドレスを入力"
          value={formState.email}
          onChange={handleChange}
        />
        {/* ここから入力 */}
        <br />
        期限日：
        <input
          type="date"
          name="dueDate"
          value={formState.dueDate}
          onChange={handleChange}
        />
        <br />
        ステータス：
        <select name="status" value={formState.status} onChange={handleChange}>
          <option value="未完了">未完了</option>
          <option value="完了">完了</option>
        </select>
        <br />
        <button type="submit" className="taskButton">{isEditing ? "保存" : "追加"}</button>
        {isEditing && (
          <button type="button" onClick={handleCancel} className="taskButton">
            キャンセル
          </button>
        )}
      </form>
    </div>
  );
}

export default CustomerForm;