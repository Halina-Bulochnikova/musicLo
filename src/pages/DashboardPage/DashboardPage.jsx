import s from './DashboardPage.module.css';
import { useEffect, useState } from "react";
import { fetchTrending } from '../../servis/api';
 


const DashboardPage = () => {
  const [result, setResult] = useState([]);

  useEffect(() => {
    const loadTrending = async () => {
      const result = await fetchTrending();
      setResult(result);
    };
loadTrending();
}, []);

  return (
    <div>
      <h1>Display your Spotify profile data</h1>

      <section id="profile">
        <h2>
          Logged in as <span id="displayName"></span>
        </h2>
        <span id="avatar"></span>
        <ul>
          <li>
            User ID: <span id="id"></span>
          </li>
          <li>
            Email: <span id="email"></span>
          </li>
          <li>
            Spotify URI: <a id="uri" href="#"></a>
          </li>
          <li>
            Link: <a id="url" href="#"></a>
          </li>
          <li>
            Profile Image: <span id="imgUrl"></span>
          </li>
        </ul>
      </section>
      <section>
        <h2>🎧 Нові релізи</h2>
        <ul>
          {result.map((album) => (
            <li key={album.id}>
              <img src={album.images[0]?.url} alt={album.name} width="100" />
              <div>
                <strong>{album.name}</strong> –{" "}
                {album.artists.map((artist) => artist.name).join(", ")}
              </div>
              <a
                href={album.external_urls.spotify}
                target="_blank"
                rel="noreferrer"
              >
                Слухати
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
export default DashboardPage;

