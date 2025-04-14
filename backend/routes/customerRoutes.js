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
router.post("/", (req, res) => {
  const { name, email, phone, address, company_name} = req.body;
  
  if (!name || !email || !phone || !address) {
    return res.status(400).send("名前・メールアドレス・電話番号・住所の入力が必要です");
  }
  const created_at = new Date();
  const updated_at = new Date();  
  const sql = `
    INSERT INTO customers (name, email, phone, address, company_name, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?,?)
  `;
  // console.log(sql);  //sqlには入っているぽい
  db.query(sql, [name, email, phone, address, company_name, created_at, updated_at], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("タスクの追加に失敗しました");
    }
    res.status(201).send("タスクを追加しました");
  });
});

// 特定のタスクを更新 (PUT /customers/:id)
router.put("/:id", (req, res) => {
  const { name, email, phone, address, company_name } = req.body;
  const { id } = req.params;

  if (!name || !email || !phone || !address) {
    return res.status(400).send("名前・メールアドレス・電話番号・住所の入力が必要です");
  }

  // まずは元の created_at を取得
  const getSql = "SELECT created_at FROM customers WHERE id = ?";
  db.query(getSql, [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("データ取得に失敗しました");
    }

    if (results.length === 0) {
      return res.status(404).send("指定されたタスクが見つかりません");
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
        return res.status(500).send("タスクの更新に失敗しました");
      }
      res.send("タスクを更新しました");
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
      return res.status(500).send("タスクの削除に失敗しました");
    }
    res.send("タスクを削除しました");
  });
});

module.exports = router;