import { useEffect, useState } from "react";
import { axiosInstance, setAuthorizationHeader } from "../utils/axiosInstance";
import PropTypes from "prop-types";

const AudioPlayer = ({ audioId }) => {
  const [audioSource, setAudioSource] = useState(null);

  useEffect(() => {
    if (audioId) {
      setAuthorizationHeader();
      axiosInstance
        .get(`/audio/${audioId}`, { responseType: "blob" }) // Fetch as a blob
        .then((response) => {
          const url = URL.createObjectURL(response.data); // Create a URL from the blob
          setAudioSource(url); // Set the audio source to the new URL
        })
        .catch((error) => {
          console.error("Error fetching audio file:", error);
        });
    }
  }, [audioId]);

  return (
    <div>
      <h3>Audio Player</h3>
      {audioSource ? (
        <audio controls src={audioSource} />
      ) : (
        <p>No audio file selected</p>
      )}
    </div>
  );
};

AudioPlayer.propTypes = {
  audioId: PropTypes.node.isRequired,
};

export default AudioPlayer;
