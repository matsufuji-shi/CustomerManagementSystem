import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/api", // バックエンドのAPIのURL
  headers: {
    "Content-Type": "application/json",
  },
});

// レスポンスのエラーハンドリングのためのカスタムエラーハンドラーを追加
axiosInstance.interceptors.response.use(
  (response) => response, // 正常時はそのまま返す
  (error) => {
    let errorMessage = "不明なエラーが発生しました。";

    if (!error.response) {
      errorMessage = "ネットワークエラーが発生しました。インターネット接続を確認してください。";
    } else {
      const status = error.response.status;
      if (status >= 500) {
        errorMessage = "サーバーエラーが発生しました。しばらくしてから再試行してください。";
      } else if (status >= 400 && status < 500) {
        errorMessage = "クライアントエラーが発生しました。入力内容を確認してください。";
      }
    }

    alert(errorMessage); // ⭐ ユーザーにアラート表示
    console.error(errorMessage); // 開発用にコンソールにも出す
    return Promise.reject(new Error(errorMessage));
  }
);

export default axiosInstance;