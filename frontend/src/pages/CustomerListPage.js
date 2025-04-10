import api from "../services/api";

export const getLists = async () => {
  try {
      const response = await api.get("/detail", {

      });
      return response.data;
  } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
  }
};

