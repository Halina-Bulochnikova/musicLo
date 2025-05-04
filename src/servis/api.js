import axios from "axios";

const API_TOKEN = "86605a51d31243bf89bbdf9d1cedcd7c";

const options = axios.create({
  baseURL: "https://api.spotify.com/v1",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_TOKEN}`,
  },
});
export const fetchTrending = async () => {
  try {
    const response = await options.get("https://api.spotify.com/v1");
    return response.data.results;
  } catch (error) {
    console.error("Error fetching trending movies:", error.message);
    return [];
  }
};

