const db = require("../db/db");

// 全顧客を取得する
const getCustomers = (req, res) => {
    const sqlSelect = "SELECT * FROM customers ORDER BY id";
    db.query(sqlSelect, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error retrieving users from the database");
        } else {
            res.send(result);
        }
    });
};

// 新しいタスクを追加する
const addCustomers = (req, res) => {
    const { name, email, phone, address, company_name } = req.body;
    const sqlInsert = "INSERT INTO tasks ( name, email, phone, address, company_name ) VALUES (?, ?, ?, ?, ?)";
    db.query(sqlInsert, [name, email, phone, address, company_name], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Failed to add new customers");
        } else {
            res.status(200).send("Customers added successfully");
        }
    });
};

// 特定のタスクを更新する
const updateCustomers = (req, res) => {
    const { id } = req.params;
    const { name, email, phone, address, company_name } = req.body;
    const sqlUpdate = "UPDATE customers SET name = ?, email = ?, phone = ?, address = ? , company_name = ? WHERE id = ?";
    db.query(sqlUpdate, [name, email, phone, address, company_name, id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Failed to add new customers");
        } else {
            res.status(200).send("Customers updated successfully");
        }
    });
};

// 特定のタスクを削除する
const deleteCustomers = (req, res) => {
    const { id } = req.params;
    const sqlDelete = "DELETE FROM customers WHERE id = ?";
    db.query(sqlDelete, [id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Failed to delete customers");
        } else {
            res.status(200).send("Customers deleted successfully");
        }
    });
};

module.exports = { getCustomers, addCustomers, updateCustomers, deleteCustomers };