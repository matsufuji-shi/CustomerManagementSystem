import api from "../services/api";

// 新しい顧客を追加
export const addList = async (listData) => {
 
  try {
      const response = await api.post("/customers", listData, {
         
      });
      return response.data;
  } catch (error) {
      console.error("Error adding list:", error);
      throw error;
  }
};

export default addList;