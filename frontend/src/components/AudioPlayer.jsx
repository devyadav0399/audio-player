import { useEffect, useState, useRef } from "react";
import { axiosInstance, setAuthorizationHeader } from "../utils/axiosInstance";
import PropTypes from "prop-types";
import { AudioVisualizer } from "react-audio-visualize";

import "./AudioPlayer.css";

const AudioPlayer = ({ audioId }) => {
  const [audioSource, setAudioSource] = useState(null);
  const [blob, setBlob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef(null);

  useEffect(() => {
    if (audioId) {
      setAuthorizationHeader();
      setLoading(true);
      axiosInstance
        .get(`/audio/${audioId}`, { responseType: "blob" }) // Fetch as a blob
        .then((response) => {
          setBlob(response.data); // Set the blob
          const url = URL.createObjectURL(response.data); // Create a URL from the blob
          setAudioSource(url);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching audio file:", error);
          setLoading(false);
        });
    }
  }, [audioId]);

  useEffect(() => {
    if (audioRef.current) {
      const audioElement = audioRef.current;

      const handlePlay = () => {
        setIsPlaying(true);
      };

      const handlePause = () => {
        setIsPlaying(false);
      };

      // Attach event listeners to the audio element
      audioElement.addEventListener("play", handlePlay);
      audioElement.addEventListener("pause", handlePause);
      audioElement.addEventListener("ended", handlePause);

      // Cleanup event listeners to avoid memory leaks
      return () => {
        audioElement.removeEventListener("play", handlePlay);
        audioElement.removeEventListener("pause", handlePause);
        audioElement.removeEventListener("ended", handlePause);
      };
    }
  }, [audioSource]);

  return (
    <div className="audio-player">
      {loading ? (
        <div className="spinner-container">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      ) : audioSource ? (
        <>
          <div className="visualizer">
            {blob && (
              <AudioVisualizer
                key={`visualizer-${isPlaying}`}
                blob={blob}
                width={500}
                height={75}
                barWidth={isPlaying ? 2 : 1}
                gap={0}
                barColor={isPlaying ? "#007bff" : "#f76565"}
              />
            )}
          </div>
          <div className="media-player">
            <audio ref={audioRef} controls src={audioSource} />
          </div>
        </>
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
