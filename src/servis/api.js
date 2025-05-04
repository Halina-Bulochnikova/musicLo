import axios from "axios";

const API_TOKEN =
  "BQC0jmVtk7sgkKCJRFgt-6SrPXUeXN-i9GAZA5nnu8KfeeJnWz3YRUu6DpG9r-mUI1irTBO0TznvEWN76alH_7RxIGDCKpM5D7PeNo6fL3VP3i30lV7ARfzwy0ptw0Fwdyp3Nu5Oeiw";
  
    
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

