import api from "../services/api";

export const getLists = async () => {
  try {
      const response = await api.get("/customers", {

      });
      return response.data;
  } catch (error) {
      console.error("Error fetching customer:", error);
      throw error;
  }
};

export default getLists;

