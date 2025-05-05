import React, { useEffect, useState } from "react";
import { redirectToAuthCodeFlow } from "../../servis/clientQr";

const clientId = "86605a51d31243bf89bbdf9d1cedcd7c";

export default function DashboardPage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      const accessToken = localStorage.getItem("spotify_access_token");

      if (!accessToken) {
        await redirectToAuthCodeFlow(clientId);
        return;
      }

      try {
        const res = await fetch("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (res.status === 401) {
          localStorage.removeItem("spotify_access_token");
          window.location.reload();
          return;
        }

        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  if (loading) return <div>Завантаження профілю...</div>;

  return (
    <div>
      {profile ? (
        <div>
          <h1>Привіт, {profile.display_name}</h1>
          <p>Email: {profile.email}</p>
          <img
            src={profile.images?.[0]?.url}
            alt="User Avatar"
            style={{ width: 100, borderRadius: "50px" }}
          />
        </div>
      ) : (
        <div>Дані профілю не знайдено</div>
      )}
    </div>
  );
}
