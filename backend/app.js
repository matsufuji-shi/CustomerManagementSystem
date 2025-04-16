const express = require("express");
const cors = require("cors");
const db = require("./db/db");
const app = express();


// 既存のルート
const customersRouter = require("./routes/customerRoutes"); // タスク管理ルート

app.use(express.json());  
app.use(cors()); 

// タスク管理用のAPIルートを追加
app.use("/api/customers", customersRouter); 


db.getConnection((err, connection) => {
    if (err) {
        console.error("データベース接続エラー:", err);
        process.exit(1); // 接続失敗時にサーバを終了
    } else {
        console.log("データベース接続成功");
        connection.release(); // 接続が成功したらリリース
    }
});


app.listen(3001, () => {
    console.log('Server running on port 3001');
});

// module.exports = app; 