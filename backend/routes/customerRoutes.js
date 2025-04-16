const express = require("express");
const router = express.Router();
const db = require("../db/db"); 


//タスク一覧を取得 (GET /customers)
router.get('/',  (req, res) => {
 
  const sql = "SELECT * FROM customers ";
  db.query(sql,(err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("タスクの取得に失敗しました");
    }
    res.json(result);
  });
});

//特定のタスクを取得 (GET /customers/:id)
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM customers WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("タスクの取得に失敗しました");
    }
    if (result.length === 0) {
      return res.status(404).send("タスクが見つかりません");
    }
    res.json(result[0]);
  });
});

// 新しいタスクを追加 (POST /customers)
router.post('/', (req, res) => {
  const { name, email, phone, address, company_name } = req.body;

  if (!name || !email || !phone || !address || !company_name) {
    return res.status(400).json({ message: '全ての必須項目を入力してください。' });
  }

  const created_at = new Date();
  const updated_at = new Date();

  const sql = `
    INSERT INTO customers (name, email, phone, address, company_name, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [name, email, phone, address, company_name, created_at, updated_at], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: '顧客の追加に失敗しました' });
    }

    const insertedCustomer = {
      id: result.insertId,
      name,
      email,
      phone,
      address,
      company_name,
      created_at,
      updated_at
    };

    res.status(201).json(insertedCustomer);
  });
});

// 特定のタスクを更新 (PUT /customers/:id)
router.put("/:id", (req, res) => {
  const { name, email, phone, address, company_name } = req.body;
  const { id } = req.params;

  if (!name || !email || !phone || !address || !company_name) {
    return res.status(400).send("名前・メールアドレス・電話番号・住所・会社名の入力が必要です");
  }

  // まずは元の created_at を取得
  const getSql = "SELECT created_at FROM customers WHERE id = ?";
  db.query(getSql, [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("データ取得に失敗しました");
    }

    if (results.length === 0) {
      return res.status(404).send("指定された顧客が見つかりません");
    }

    const created_at = results[0].created_at;
    const updated_at = new Date();

    const updateSql = `
      UPDATE customers
      SET name = ?, email = ?, phone = ?, address = ?, company_name = ?, created_at = ?, updated_at = ?
      WHERE id = ?
    `;
    db.query(updateSql, [name, email, phone, address, company_name, created_at, updated_at, id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send("顧客の更新に失敗しました");
      }
      res.status(200).json({ message: "顧客情報を更新しました" });  // レスポンスメッセージを修正
    });
  });
});

//特定のタスクを削除 (DELETE /customers/:id)
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM customers WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("顧客の削除に失敗しました");
    }
    if (result.affectedRows === 0) {
      return res.status(404).send("顧客が見つかりません");
    }
    res.status(200).json({ message: "顧客を削除しました" });  // レスポンスメッセージを修正
  });
});

module.exports = router;