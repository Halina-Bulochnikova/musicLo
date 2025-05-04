import axios from "axios";
import { getAccessToken } from './clientQr';


const API_TOKEN = { getAccessToken };
  
    
export const options = axios.create({
  baseURL: "https://api.spotify.com/v1",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_TOKEN}`,
  },
});
export const fetchTrending = async () => {
  try {
    const accessToken = localStorage.getItem("spotify_access_token");
    const options = axios.create({
      baseURL: "https://api.spotify.com/v1",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const response = await options.get("/browse/new-releases");
    return response.data.albums.items;
  } catch (error) {
    console.error("Error fetching trending albums:", error.message);
    return [];
  }
};

