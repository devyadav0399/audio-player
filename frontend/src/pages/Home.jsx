import { useEffect, useState } from "react";
import { axiosInstance, setAuthorizationHeader } from "../utils/axiosInstance";
import AudioPlayer from "../components/AudioPlayer";

import "./Home.css";

const Home = () => {
  const [audioFiles, setAudioFiles] = useState([]);
  const [selectedAudioId, setSelectedAudioId] = useState(null);

  useEffect(() => {
    setAuthorizationHeader();
    axiosInstance
      .get("/audio")
      .then((response) => {
        setAudioFiles(response.data);
      })
      .catch((error) => {
        console.error("Error fetching audio files:", error);
      });
  }, []);

  const handleAudioSelect = (e) => {
    setSelectedAudioId(e.target.value);
  };

  return (
    <div className="home-container">
      <div className="home-title">
        <h2>Browse Audio Files</h2>
      </div>
      <div className="files-dropdown">
        <select onChange={handleAudioSelect} defaultValue="">
          <option value="" disabled>
            Select an Audio File
          </option>
          {audioFiles.map((audio) => (
            <option key={audio.id} value={audio.id}>
              {audio.name}
            </option>
          ))}
        </select>
      </div>
      <div className="audio-player-container">
        {selectedAudioId && <AudioPlayer audioId={selectedAudioId} />}
      </div>
    </div>
  );
};

export default Home;
