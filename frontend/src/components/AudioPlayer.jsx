import { useEffect, useState, useRef } from "react";
import { axiosInstance, setAuthorizationHeader } from "../utils/axiosInstance";
import PropTypes from "prop-types";
import { AudioVisualizer } from "react-audio-visualize";

import "./AudioPlayer.css";

const AudioPlayer = ({ audioId }) => {
  const [audioSource, setAudioSource] = useState(null);
  const [blob, setBlob] = useState(null);
  const visualizerRef = useRef(null);
  const [loading, setLoading] = useState(true);

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
                ref={visualizerRef}
                blob={blob}
                width={500}
                height={75}
                barWidth={1}
                gap={0}
                barColor={"#f76565"}
              />
            )}
          </div>
          <div className="media-player">
            <audio controls src={audioSource} />
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
