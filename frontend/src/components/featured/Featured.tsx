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

import { useSelector } from 'react-redux'
import { useDislikeMovieMutation, useGetMovieQuery, useGetRandomMoviesMutation, useLikeMovieMutation } from "../../store/rtk-query/moviesApi";
import { useAddMovieToDefaultListMutation } from "../../store/rtk-query/listsApi";

import {
  IconButton,
  Typography,
} from "@mui/material";

import {
  Check,
  ThumbUpAltOutlined,
  ThumbDownOutlined,
  ThumbUp,
  ThumbDown
} from "@mui/icons-material";
import { useGetGenresQuery } from "../../store/rtk-query/genresApi";

type MetaInfoItem = {
  text: string
}

export default function Featured({ type }) {
  const [content, setContent] = useState<any>({});
  const client = useApiClient();

  const userReducer = useSelector((state) => state.auth)

  const [getRandomMovieApi, getRandomMovieState] = useGetRandomMoviesMutation()
  const { data: movieData, isLoading: movieDataLoading, refetch } = useGetMovieQuery(content?._id, {
    refetchOnMountOrArgChange: true,
  })


  const { data: genresData, isLoading: genresLoading } = useGetGenresQuery()


  const [likeMovie, likeMovieState] = useLikeMovieMutation()
  const [dislikeMovie, dislikeMovieState] = useDislikeMovieMutation()
  const [addToMyList, addToMyListState] = useAddMovieToDefaultListMutation()



  useEffect(() => {
    getRandomMovie();

    //DUmmy content
    // setContent(
    //   {
    //     "_id": "65aeffab0358caeb152fc9b4",
    //     "title": "The Twilight Saga: New Moon",
    //     "video": "https://cdn.haniflix.com/movies/The%20Twilight%20Saga%20New%20Moon%20(2009)%20%5B1080p%5D/The.Twilight.Saga.New.Moon.2009.1080p.BRrip.x264.GAZ.YIFY.mp4",
    //     "isSeries": false,
    //     "desc": "Forks, Washington resident Bella Swan is reeling from the departure of her vampire love, Edward Cullen, and finds comfort in her friendship with Jacob Black, a werewolf. But before she knows it, she's thrust into a centuries-old conflict, and her desire to be with Edward at any cost leads her to take greater and greater risks.",
    //     "img": "https://img.yts.mx/assets/images/movies/Twilight_New_Moon_2009/medium-cover.jpg",
    //     "imgTitle": "https://img.yts.mx/assets/images/movies/Twilight_New_Moon_2009/medium-cover.jpg",
    //     "trailer": "",
    //     "year": "2009",
    //     "duration": '3hrs 30m',
    //     "ageRating": "PG 13",
    //     "genre": [
    //       "65b66808f4c51c32d74acc53",
    //       "65b6689a5d44d7333eca29ab",
    //       "65b668c64c710d33801db5be",
    //       "65b6689b5d44d7333eca29b1",
    //       "65b668c64c710d33801db5c1",
    //       "65b668d84c710d33801db603"
    //     ],
    //     "updatedAt": "2024-01-28T14:46:55.296Z",
    //     "createdAt": "2023-12-31T23:00:00.000Z",
    //     "__v": 1
    //   }
    // )
  }, [type]);

  const showSwal = (title, message, type) => {
    Swal.fire({
      title: title ?? "",
      text: message,
      icon: type,
    });
  };

  const onLikeMovie = async () => {
    const res = await likeMovie(content?._id)

    if (!res?.data) {
      showSwal("Error Liking movie", '', "error");
      return
    }
    refetch({ force: true });
  }

  const onDislikeMovie = async () => {
    const res = await dislikeMovie(content?._id)

    if (!res?.data) {
      showSwal("Error disliking movie", '', "error");
      return
    }
    refetch({ force: true });
  }

  const onAddToList = async () => {
    const res = await addToMyList(content?._id)

    if (!res?.data) {
      showSwal("Error encountered", '', "error");
      return
    }

    // showSwal("Added to list", '', 'success')
    refetch({ force: true });
  }

  const getRandomMovie = useCallback(async () => {

    const res = await getRandomMovieApi(type)

    if (Array.isArray(res?.data)) {
      setContent(res?.data?.[0]);
    }

    else {
      Swal.fire({
        title: "Error",
        text: "An error occurred while fetching content.",
        icon: "error",
      });
    }
  }, [type]);


  function formatNumber(number) {

    if (isNaN(number)) return 0

    if (number < 1000) {
      return number.toString(); // No abbreviation for numbers less than 1000
    } else if (number < 1000000) {
      return `${(number / 1000).toFixed(1)}k`; // Abbreviate thousands with "k"
    } else {
      return `${(number / 1000000).toFixed(1)}M`; // Abbreviate millions with "M"
    }
  }



  const trimmedDesc = useMemo(() => {
    const maxLength = 300; // Adjust the maximum length as needed
    return movieData?.desc
      ? movieData.desc.length > maxLength
        ? movieData.desc.slice(0, maxLength) + "..."
        : movieData.desc
      : "";
  }, [movieData]);


  const renderLikeContainer = () => {

    return (
      <div className=" flex">
        <IconButton
          onClick={onLikeMovie}
          className='flex gap-1 !text-white '
          aria-label="thumb up">
          {
            movieData?.currentUserLiked ? <ThumbUp /> : <ThumbUpAltOutlined />
          }
          <div className='text-sm'>{formatNumber(movieData?.likesCount)}</div>
        </IconButton>
        <IconButton
          onClick={onDislikeMovie}
          className='flex gap-1 !text-white'
          aria-label="thumb down ">
          {
            movieData?.currentUserDisliked ? <ThumbDown /> : <ThumbDownOutlined />
          }
          <div className='text-sm'>{formatNumber(movieData?.dislikesCount)}</div>

        </IconButton>
      </div>
    )
  }

  const renderMetaInfo = () => {
    const metaInfo: MetaInfoItem[] = []


    if (movieData?.genre && Array.isArray(movieData?.genre)) {
      let genreTextArr = movieData?.genre?.map((genreId) => {
        const genreObj = genresData?.genres?.find((_genre) => {
          return genreId == _genre?._id
        })

        return genreObj?.title
      }).filter((text) => text != undefined)

      if (genreTextArr.length > 0) {
        metaInfo.push({
          text: genreTextArr?.join(', ')
        })
      }
    }

    if (movieData?.ageRating) {
      metaInfo.push({
        text: content?.ageRating
      })
    }

    if (movieData?.year) {
      metaInfo.push({
        text: content?.year
      })
    }

    if (movieData?.duration) {
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
            <div
              key={info?.text}
              className='px-3 py-2 bg-[#ffffff29] rounded-[30px] text-sm'>
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
        "featured relative",
        "h-[105vh] flex flex-col justify-center",
        movieData?.img ? '' : 'bg-gradient-to-b from-teal-500 to-gray-900'
      )
    }>

      {movieData?.img ? (
        <img src={movieData?.img} alt=""
          className="w-full h-full absolute top-0 bottom-0 right-0 left-0"
          loading="lazy" />
      ) : null}
      <div className={
        addClassNames(
          "info z-[100] p-[13px] sm:p-[20px] min-h-[400px]",
          'mt-[100px] sm:w-[43vw]',
          'sm:ml-[70px]'
        )
      }>
        <div className="w-[150px] h-[250px]">
          <img
            className="w-full h-full"
            src={movieData?.imgTitle ? movieData?.imgTitle : moviePlaceholderSvg}
            alt="" loading="lazy" />
        </div>
        <div>
          {renderMetaInfo()}
        </div>
        <span className="desc" style={{ color: "#fff" }}>
          <span id="desc-title">{movieData?.title}</span>
          {trimmedDesc}
        </span>
        <div className="flex justify-between flex-wrap">
          <div className="buttons">
            <Link
              to={`/watch/${movieData?._id}`}
              style={{ textDecoration: "none" }}
            >
              <button className="play more">
                <PlayArrow />
                <span className='uppercase text-[13px]'>Play</span>
              </button>
            </Link>
            <button className="more" onClick={onAddToList}>
              {movieData?.isInDefaultList ? <Check /> : <AddCircle />}
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
