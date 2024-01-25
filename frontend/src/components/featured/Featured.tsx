import { PlayArrow, AddCircle } from "@mui/icons-material";
import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert 2
import "./featured.scss";
import { useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/auth";
import useApiClient from "../../hooks/useApiClient";

export default function Featured({ type }) {
  const [content, setContent] = useState<any>({});
  const client = useApiClient();

  const getRandomMovie = useCallback(() => {
    client
      .getRandomMovies(type)
      .then((res) => {
        setContent(res?.[0]);
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          title: "Error",
          text: "An error occurred while fetching content.",
          icon: "error",
        });
      });
  }, [type]);

  useEffect(() => {
    getRandomMovie();
    /*const getRandomContent = async () => {
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
    getRandomContent();*/
  }, [type]);

  const trimmedDesc = useMemo(() => {
    const maxLength = 300; // Adjust the maximum length as needed
    return content?.desc
      ? content.desc.length > maxLength
        ? content.desc.slice(0, maxLength) + "..."
        : content.desc
      : "";
  }, [content]);

  // Function to add a movie to the default list
  const addMovieToDefaultList = useCallback(() => {
    if (content?._id) {
      client
        .addMovieToDefaultList(content._id)
        .then(() => {
          Swal.fire({
            title: "Movie Added",
            text: "The movie has been added to your list.",
            icon: "success",
          });
        })
        .catch((err) => {
          console.error(err);
          Swal.fire({
            title: "Error",
            text: "An error occurred while adding the movie to your list.",
            icon: "error",
          });
        });
    }

    /*try {
      const response = await axios.post(
        `${api_url}lists/add-movie-to-default-list`,
        {
          email: user.email || "",
          movieId: content._id,
        }
      );
      console.log(content);
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
    }*/
  }, [content, client]);

  return (
    <div className="featured">
      {/*type != null ? (
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
      ) : null*/}
      {content?.img ? (
        <img src={content?.img} alt="" className="bg-img" loading="lazy" />
      ) : null}
      <div className="info">
        <img src={content?.imgTitle} alt="" loading="lazy" />
        <span className="desc" style={{ color: "#fff" }}>
          <span id="desc-title">{content?.title}</span>
          {trimmedDesc}
        </span>
        <div className="buttons">
          <Link
            to={`/watch/${content?._id}`}
            style={{ textDecoration: "none" }}
          >
            <button className="play more">
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
