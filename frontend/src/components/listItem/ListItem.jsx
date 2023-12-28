import "./listItem.scss";
import {
  PlayArrow,
  Add,
  ThumbUpAltOutlined,
  ThumbDownOutlined,
} from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios"; 
import { Link } from "react-router-dom";
const api_url = process.env.REACT_APP_API_URL;

export default function ListItem({ index, item }) {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get(api_url + "movies/find/" + item, {
          headers: {
            token: "",
          },
        });
         setMovie(res.data);
      } catch (err) {
        console.log("An error occured: " + err);
      }
    }
    getMovie();
  }, [item]);
  

  const trailer = movie?.trailer;
  return (
    <Link to={{ pathname: "/watch", movie: movie }}>
    <div
      className="listItem"
      style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src= {movie?.img} alt="" />
      {isHovered && (
        <>
          <video src={trailer} autoPlay={true} loop />
          <div className="itemInfo">
            <div className="icons" style={{color:"#000"}}>
              <PlayArrow className="icon" style={{color:"#000"}} />
              <Add className="icon" style={{color:"#000"}} />
              <ThumbUpAltOutlined className="icon" style={{color:"#000"}} />
              <ThumbDownOutlined className="icon" style={{color:"#000"}} />
            </div>
            <div className="itemInfoTop" style={{color:"#000"}}>
              <span style={{color:"#000"}}>{movie?.duration}</span>
              <span className="limit" style={{color:"#000"}}>+{movie?.limit}</span>
              <span style={{color:"#000"}}>{movie?.year}</span>
            </div>
            <div className="desc" style={{color:"#000"}}>{movie?.desc}</div>
            <div className="genre" style={{color:"#000"}}>{movie?.genre}</div>
          </div>
        </>
      )}
    </div>
    </Link>
  );
}
