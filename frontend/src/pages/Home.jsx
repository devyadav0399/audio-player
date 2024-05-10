import { useEffect, useState } from "react";
import { axiosInstance, setAuthorizationHeader } from "../utils/axiosInstance";
import AudioPlayer from "../components/AudioPlayer";

import "./Home.css";

const DEBOUNCE_DELAY = 500;

const Home = () => {
  const [audioFiles, setAudioFiles] = useState([]);
  const [selectedAudioId, setSelectedAudioId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    // Use a timeout to debounce the search term
    const debounceTimeout = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, DEBOUNCE_DELAY);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [searchTerm]);

  useEffect(() => {
    setAuthorizationHeader();
    setLoading(true);

    if (debouncedSearchTerm) {
      // If there's a search term, call the search endpoint
      axiosInstance
        .get("/audio/search", { params: { query: debouncedSearchTerm } })
        .then((response) => {
          setAudioFiles(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching search results:", error);
          setLoading(false);
        });
    } else {
      // If no search term, fetch all audio files
      axiosInstance
        .get("/audio")
        .then((response) => {
          setAudioFiles(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching audio files:", error);
          setLoading(false);
        });
    }
  }, [debouncedSearchTerm]);

  const handleAudioSelect = (e) => {
    setSelectedAudioId(e.target.value);
  };

  return (
    <div className="home-container">
      <div className="home-title">
        <h2>Browse Audio Files</h2>
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search audio files"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          id="search-bar"
        />
      </div>
      {loading ? (
        <div className="spinner-container" style={{ marginTop: "2rem" }}>
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default Home;
