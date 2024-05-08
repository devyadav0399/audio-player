import { useEffect, useState } from "react";
import { axiosInstance, setAuthorizationHeader } from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const AudioFiles = () => {
  const [audioFiles, setAudioFiles] = useState([]);
  const navigate = useNavigate();

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

  const handleAudioClick = (audioId) => {
    navigate(`/audio-player/${audioId}`);
  };

  return (
    <div>
      <h2>Audio Files</h2>
      <ul>
        {audioFiles.map((audio) => (
          <li
            key={audio.id}
            onClick={() => handleAudioClick(audio.id)}
            style={{ cursor: "pointer" }}
          >
            {audio.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AudioFiles;
