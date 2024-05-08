import { useParams } from "react-router-dom";
import AudioPlayer from "../components/AudioPlayer";

const AudioPlayerPage = () => {
  const { audioId } = useParams();

  return (
    <div>
      <h2>Audio Player Page</h2>
      <AudioPlayer audioId={audioId} />
    </div>
  );
};

export default AudioPlayerPage;
