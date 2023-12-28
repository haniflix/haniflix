import { PlayArrow, AddCircle } from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios"; 
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'; // Import SweetAlert 2
import "./featured.scss";

const api_url = process.env.REACT_APP_API_URL;

export default function Featured({ type }) {
  const [content, setContent] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const getRandomContent = async () => {
      try {
        const res = await axios.get(
          `${api_url}movies/random?type=${type ? type : ""}`,
          {
            headers: {
              token: user.accessToken || "",
            },
          }
        );
        setContent(res.data[0]);
      } catch (err) {
        console.error(err);
        // Handle error and display an error Swal popup if needed
        Swal.fire({
          title: "Error",
          text: "An error occurred while fetching content.",
          icon: "error",
        });
      }
    };
    getRandomContent();
  }, []);

  const maxLength = 300; // Adjust the maximum length as needed
  const trimmedDesc = content?.desc
    ? content.desc.length > maxLength
      ? content.desc.slice(0, maxLength) + "..."
      : content.desc
    : "";

  // Function to add a movie to the default list
  const addMovieToDefaultList = async () => {
    try {
      const response = await axios.post(
        `${api_url}lists/add-movie-to-default-list`, 
        {
          email: user.email || "", 
          movieId: content._id, 
        }
      );
      console.log(content)
      // Display a success Swal popup when the movie is added
      if (response.status === 200) {
        Swal.fire({
          title: "Movie Added",
          text: "The movie has been added to your list.",
          icon: "success",
        });
      }
    } catch (error) {
      console.error(error);
      // Handle error and display an error Swal popup if needed
      Swal.fire({
        title: "Error",
        text: "An error occurred while adding the movie to your list.",
        icon: "error",
      });
    }
  };

  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movies" ? "Movies" : "Series"}</span>
          <select name="genre" id="genre">
            <option value="">Genre</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="fantasy">Fantasy</option>
            <option value="historical">Historical</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="sci-fi">Sci-fi</option>
            <option value="thriller">Thriller</option>
            <option value="western">Western</option>
            <option value="animation">Animation</option>
            <option value="drama">Drama</option>
            <option value="documentary">Documentary</option>
          </select>
        </div>
      )}
      <img src={content?.img} alt="" className="bg-img" loading="lazy"/>
      <div className="info">
        <img src={content?.imgTitle} alt="" loading="lazy"/>
        <span className="desc" style={{ color: "#fff" }}>
          <span id="desc-title">{content?.title}</span>
          {trimmedDesc}
        </span>
        <div className="buttons">
          <Link to={{ pathname: "/watch", movie: content }}>
            <button className="play">
              <PlayArrow />
              <span>Play</span>
            </button>
          </Link>
          <button className="more" onClick={addMovieToDefaultList}>
            <AddCircle />
            <span>My List</span>
          </button>
        </div>
      </div>
    </div>
  );
}