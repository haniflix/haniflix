import { ArrowBackOutlined } from "@mui/icons-material";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import "./watch.scss";
import VideoPlayer from "../../components/videoPlayer/VideoPlayer";
import { useEffect, useState } from "react";
import useApiClient from "../../hooks/useApiClient";

export default function Watch() {
  const location = useLocation();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<any>(null);
  const client = useApiClient();
  const params = useParams();
  console.log(movie);
  const getMovie = (id: string) => {
    client
      .getMovie(id)
      .then((res) => {
        setMovie(res);
      })
      .then((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getMovie(params.id);
  }, [params.id]);
  const handleGoBack = () => {
    navigate(-1);
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
