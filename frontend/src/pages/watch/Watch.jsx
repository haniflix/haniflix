import { ArrowBackOutlined } from "@material-ui/icons";
import { Link, useLocation, useHistory } from "react-router-dom";
import "./watch.scss";
import VideoPlayer from "../../components/videoPlayer/VideoPlayer";

export default function Watch() {
  const location = useLocation();
  const history = useHistory();
  const movie = location?.movie;
  console.log(movie)

  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <div className="watch">
    <Link to="/">
    <div className="back" onClick={handleGoBack}>
        <ArrowBackOutlined />
        Go Back
      </div>
    </Link>
    <VideoPlayer videoId={movie?._id} videoUrl={movie?.video} />
  </div>
  );
}
