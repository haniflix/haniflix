import { PlayArrow, AddCircle } from "@mui/icons-material";
import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert 2
import "./featured.scss";
import { useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/reducers/auth";
import useApiClient from "../../hooks/useApiClient";
import { addClassNames } from "../../store/utils/functions";

import moviePlaceholderSvg from '../../Assets/svgs/moviePlaceholder.svg'


type MetaInfoItem = {
  text: string
}

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
    // getRandomMovie();

    //DUmmy content
    setContent(
      {
        "_id": "65aeffab0358caeb152fc9b4",
        "title": "The Twilight Saga: New Moon",
        "video": "https://cdn.haniflix.com/movies/The%20Twilight%20Saga%20New%20Moon%20(2009)%20%5B1080p%5D/The.Twilight.Saga.New.Moon.2009.1080p.BRrip.x264.GAZ.YIFY.mp4",
        "isSeries": false,
        "desc": "Forks, Washington resident Bella Swan is reeling from the departure of her vampire love, Edward Cullen, and finds comfort in her friendship with Jacob Black, a werewolf. But before she knows it, she's thrust into a centuries-old conflict, and her desire to be with Edward at any cost leads her to take greater and greater risks.",
        "img": "https://img.yts.mx/assets/images/movies/Twilight_New_Moon_2009/medium-cover.jpg",
        "imgTitle": "https://img.yts.mx/assets/images/movies/Twilight_New_Moon_2009/medium-cover.jpg",
        "trailer": "",
        "year": "2009",
        "genre": [
          "65b66808f4c51c32d74acc53",
          "65b6689a5d44d7333eca29ab",
          "65b668c64c710d33801db5be",
          "65b6689b5d44d7333eca29b1",
          "65b668c64c710d33801db5c1",
          "65b668d84c710d33801db603"
        ],
        "updatedAt": "2024-01-28T14:46:55.296Z",
        "createdAt": "2023-12-31T23:00:00.000Z",
        "__v": 1
      }
    )
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

  console.log('content ', content)


  const renderLikeContainer = () => {

    return (
      <div></div>
    )
  }

  const renderMetaInfo = () => {
    const metaInfo: MetaInfoItem[] = []

    if (content?.genre) {

    }

    if (content?.ageRating) {
      metaInfo.push({
        text: content?.ageRating
      })
    }

    if (content?.year) {
      metaInfo.push({
        text: content?.year
      })
    }

    if (content?.duration) {
      metaInfo.push({
        text: content?.duration
      })
    }

    if (metaInfo.length == 0) return

    //build tsx

    return (
      <div
        className='flex flex-wrap  gap-3 mt-2'
      >
        {metaInfo?.map((info) => {
          return (
            <div className='px-3 py-2 bg-[#ffffff29] rounded-[30px] text-sm'>
              {info.text}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className={
      addClassNames(
        "featured ",
        content?.img ? '' : 'bg-gradient-to-b from-teal-500 to-gray-900'
      )
    }>

      {content?.img ? (
        <img src={content?.img} alt=""
          className=" w-full h-full"
          loading="lazy" />
      ) : null}
      <div className="info p-[13px] sm:p-[20px] min-h-[400px]">
        <div className="w-[150px] h-[250px] ">
          <img
            className="w-full h-full"
            src={content?.imgTitle ? content?.imgTitle : moviePlaceholderSvg}
            alt="" loading="lazy" />
        </div>
        <div>
          {renderMetaInfo()}
        </div>
        <span className="desc" style={{ color: "#fff" }}>
          <span id="desc-title">{content?.title}</span>
          {trimmedDesc}
        </span>
        <div>
          <div className="buttons">
            <Link
              to={`/watch/${content?._id}`}
              style={{ textDecoration: "none" }}
            >
              <button className="play more">
                <PlayArrow />
                <span className='uppercase text-[13px]'>Play</span>
              </button>
            </Link>
            <button className="more" onClick={addMovieToDefaultList}>
              <AddCircle />
              <span className='uppercase text-[13px]'>My List</span>
            </button>
          </div>
          {
            renderLikeContainer()
          }
        </div>
      </div>
    </div>
  );
}
