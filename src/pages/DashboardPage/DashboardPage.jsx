import React, { useEffect, useState } from "react";
import { getAccessToken, redirectToAuthCodeFlow } from "../../servis/clientQr";

const clientId = "86605a51d31243bf89bbdf9d1cedcd7c"; // заміни на свій Client ID

export default function DashboardPage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      let accessToken = localStorage.getItem("spotify_access_token");

      try {
        if (!accessToken && code) {
          // Обмін коду на токен
          accessToken = await getAccessToken(clientId, code);
        } else if (!accessToken) {
          // Редірект на авторизацію
          await redirectToAuthCodeFlow(clientId);
          return;
        }

        // Отримання профілю користувача
        const res = await fetch("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (res.status === 401) {
          // Токен недійсний або протух
          localStorage.removeItem("spotify_access_token");
          window.location.reload();
          return;
        }

        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.error("Spotify auth error:", err.message);
      } finally {
        setLoading(false);
      }
    }

    init();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {profile ? (
        <div>
          <h1>Welcome, {profile.display_name}</h1>
          <p>Email: {profile.email}</p>
        </div>
      ) : (
        <div>No profile data available</div>
      )}
    </div>
  );
}
