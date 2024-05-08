import { useEffect, useState } from "react";
import { axiosInstance, setAuthorizationHeader } from "../utils/axiosInstance";
import AudioPlayer from "../components/AudioPlayer";  // Import the AudioPlayer component

const Home = () => {
  const [audioFiles, setAudioFiles] = useState([]);
  const [selectedAudioId, setSelectedAudioId] = useState(null);  // State for selected audio file

  useEffect(() => {
    setAuthorizationHeader();  // Set authorization header for requests
    axiosInstance
      .get("/audio")  // Fetch the list of audio files
      .then((response) => {
        setAudioFiles(response.data);  // Store the audio files in state
      })
      .catch((error) => {
        console.error("Error fetching audio files:", error);  // Handle errors
      });
  }, []);  // Only run once when the component is mounted

  const handleAudioSelect = (e) => {
    setSelectedAudioId(e.target.value);  // Update the selected audio file ID
  };

  return (
    <div>
      <h2>Audio Files</h2>
      <select onChange={handleAudioSelect} defaultValue="">
        <option value="" disabled>
          Select an Audio File
        </option>
        {audioFiles.map((audio) => (
          <option key={audio.id} value={audio.id}>  {/* Use a dropdown for audio files */}
            {audio.name}
          </option>
        ))}
      </select>

      {/* Render the AudioPlayer if an audio file is selected */}
      {selectedAudioId && <AudioPlayer audioId={selectedAudioId} />}
    </div>
  );
};

export default Home;
