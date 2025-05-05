import axios from "axios";

export const fetchTrending = async () => {
  try {
    const accessToken = localStorage.getItem("spotify_access_token");

    // Перевірка на наявність токену
    if (!accessToken) {
      throw new Error("Access token not found");
    }

    // Створення екземпляра axios з базовим URL та заголовками
    const api = axios.create({
      baseURL: "https://api.spotify.com/v1",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // Запит до Spotify API для отримання нових релізів
    const response = await api.get("/browse/new-releases");

    // Перевірка на успішну відповідь (статус 200)
    if (response.status !== 200) {
      throw new Error(`Error: Unexpected status code ${response.status}`);
    }

    // Повернення нових релізів
    return response.data.albums.items;
  } catch (error) {
    console.error("Error fetching trending albums:", error.message);
    // Повернення порожнього масиву у разі помилки
    return [];
  }
};
