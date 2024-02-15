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
import CircularProgress from '@mui/material-next/CircularProgress';
import { useGetGenresQuery } from "../../store/rtk-query/genresApi";
import MovieDetailsFull from "../MovieDetailsFull/index";

type MetaInfoItem = {
  text: string
}

export default function Featured({ type }) {
  const client = useApiClient();

  const userReducer = useSelector((state) => state.auth)

  const { data: genresData, isLoading: genresLoading } = useGetGenresQuery()


  const [getRandomMovie, getRandomMovieState] = useGetRandomMoviesMutation()


  useEffect(() => {
    onGetRandomMovie();

    //DUmmy content
    // setMovieData(
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

  const onGetRandomMovie = useCallback(async () => {

    const res = await getRandomMovie(type)

    if (!res?.data) {
      Swal.fire({
        title: "Error",
        text: "An error occurred while fetching content.",
        icon: "error",
      });
    }
  }, [type]);



  return (
    <div>
      <MovieDetailsFull
        movieId={getRandomMovieState?.data?._id}
        movieDataProps={getRandomMovieState?.data}
      />
    </div>
  );
}
