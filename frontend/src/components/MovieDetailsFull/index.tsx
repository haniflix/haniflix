import { PlayArrow, AddCircle } from "@mui/icons-material";
import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert 2
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

import styles from "./details.module.scss";


type MetaInfoItem = {
  text: string
}

type Props = {
  movieId: string | undefined;
  movieDataProps: any
}

export default function MovieDetailsFull({ movieId, movieDataProps }: Props) {
  const client = useApiClient();

  const userReducer = useSelector((state) => state.auth)

  const [skipInitialCall, setSkipInitial] = useState(true)


  const { data: genresData, isLoading: genresLoading } = useGetGenresQuery()


  const [likeMovie, likeMovieState] = useLikeMovieMutation()
  const [dislikeMovie, dislikeMovieState] = useDislikeMovieMutation()
  const [addToMyList, addToMyListState] = useAddMovieToDefaultListMutation()

  //frontend like
  const [isLike, setIsLike] = useState<boolean | null>(null);

  const [movieData, setMovieData] = useState<any>()

  const { data: newMovieData, isLoading: getMovieLoading, refetch } = useGetMovieQuery(movieId, {
    skip: skipInitialCall || !movieId
  })


  useEffect(() => {
    if (newMovieData) {
      setMovieData(newMovieData)
    }
  }, [newMovieData])

  //if initialised with movieDataProps then set as default
  useEffect(() => {
    if (movieDataProps) {
      setMovieData(movieDataProps)
    }
  }, [movieDataProps])


  const showSwal = (title, message, type) => {
    Swal.fire({
      title: title ?? "",
      text: message,
      icon: type,
    });
  };

  const applyLikeInFrontend = (action: "like" | "dislike") => {
    setIsLike((cur) => {
      if (cur == null && action == "like") return true;
      if (cur == null && action == "dislike") return false;
      if (cur == true && action == "like") return null;
      if (cur == true && action == "dislike") return false;
      if (cur == false && action == "like") return true;
      if (cur == false && action == "dislike") return null;
    });
  };

  const onLikeMovie = async () => {
    const res = await likeMovie(movieData?._id)

    if (!res?.data) {
      showSwal("Error Liking movie", '', "error");
      return
    }
    applyLikeInFrontend("like");
    if (skipInitialCall) {
      setSkipInitial(false)
    }
    else {
      refetch({ force: true });
    }
  }

  const onDislikeMovie = async () => {
    const res = await dislikeMovie(movieData?._id)

    if (!res?.data) {
      showSwal("Error disliking movie", '', "error");
      return
    }
    applyLikeInFrontend("dislike");
    if (skipInitialCall) {
      setSkipInitial(false)
    }
    else {
      refetch({ force: true });
    }
  }

  const onAddToList = async () => {
    const res = await addToMyList(movieData?._id)

    if (!res?.data) {
      showSwal("Error encountered", '', "error");
      return
    }

    if (skipInitialCall) {
      setSkipInitial(false)
    }
    else {
      refetch({ force: true });
    }
  }


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

  const buttonClasses = addClassNames(
    "bg-[#FFFFFF33] backdrop-blur-md",
    'flex gap-1 !text-white rounded-[8px] height-[55px] flex items-center justify-center'
  )


  const renderLikeContainer = () => {
    return (
      <div className="flex gap-[4px]">
        <button
          onClick={onLikeMovie}
          className={
            addClassNames(
              buttonClasses,
              'w-[52px]'
            )
          }
          aria-label="thumb up">
          {likeMovieState?.isLoading ? <CircularProgress color="inherit" size={18} /> :
            <>
              {movieData?.currentUserLiked ? <ThumbUp /> : <ThumbUpAltOutlined />}
            </>
          }
          <div className='text-sm'>{formatNumber(movieData?.likesCount)}</div>
        </button>
        <button
          onClick={onDislikeMovie}
          className={
            addClassNames(
              buttonClasses,
              'w-[52px]'
            )
          }
          aria-label="thumb down ">

          {dislikeMovieState?.isLoading ? <CircularProgress color="inherit" size={18} /> :
            <>
              {movieData?.currentUserDisliked ? <ThumbDown /> : <ThumbDownOutlined />}
            </>
          }
          <div className='text-sm'>{formatNumber(movieData?.dislikesCount)}</div>

        </button>
      </div>
    )
  }

  const renderGenres = () => {
    const metaInfo: MetaInfoItem[] = []

    if (movieData?.genre && Array.isArray(movieData?.genre)) {
      let genreTextArr = movieData?.genre?.map((genreId) => {
        const genreObj = genresData?.genres?.find((_genre) => {
          return genreId == _genre?._id
        })

        return genreObj?.title
      }).filter((text) => text != undefined)

      return (
        <div
          className='flex flex-wrap gap-3 mt-2'
        >
          {genreTextArr?.map((genreText) => {
            return (
              <div
                key={genreText}
                className='px-3 capitalize py-2 bg-[#ffffff29] rounded-[30px] text-sm border border-[#FFFFFF1A]'>
                {genreText}
              </div>
            )
          })}
        </div>
      )
    }
  }

  const renderMetaInfo = () => {
    const metaInfo: MetaInfoItem[] = []


    if (movieData?.ageRating) {
      metaInfo.push({
        text: movieData?.ageRating
      })
    }

    if (movieData?.year) {
      metaInfo.push({
        text: movieData?.year
      })
    }

    if (movieData?.duration) {
      metaInfo.push({
        text: movieData?.duration
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
              className='px-3 capitalize py-2 bg-[#ffffff29] rounded-[30px] text-xs'>
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
        " relative",
        "h-[65vh] flex flex-col justify-center",
        movieData?.img ? '' : 'bg-gradient-to-b from-teal-500 to-gray-900',
        styles['featured']
      )
    }>

      <div className="h-full w-full relative flex flex-col justify-center">
        {/* Image div */}
        <div
          className="absolute top-0 left-0 right-0 bottom-0 bg-cover bg-teal-500 bg-no-repeat"
          style={{ backgroundImage: `url(${movieData?.img})` }}
        ></div>

        {/* 1st overlay div */}
        <div
          style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}
          className="absolute top-0 left-0 right-0 bottom-0 "
        ></div>

        {/* 2nd Overlay div */}
        <div
          className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-black to-transparent opacity-[100%]"
        ></div>

        <div className={
          addClassNames(
            "z-[100] relative p-[13px] min-h-[300px] ",
            '!top-[100px] sm:!top-[60px] sm:w-[60vw]',
            'sm:ml-[70px]',
            styles['info']
          )
        }>
          {/* <div className="w-[150px] h-[250px]">
            <img
              className="w-full h-full"
              src={movieData?.imgTitle ? movieData?.imgTitle : moviePlaceholderSvg}
              alt="" loading="lazy" />
          </div> */}
          <div>
            {renderGenres()}
          </div>
          <div className="text-4xl font-[500] mt-6">{movieData?.title ? movieData?.title : <div><CircularProgress color="inherit" size={18} /><span>Loading..</span></div>}</div>
          {renderMetaInfo()}

          <span className={styles["desc"]} >
            {trimmedDesc}
          </span>
          <div className="flex flex-wrap  gap-3">
            <div className={
              addClassNames(
                styles["buttons"], ' !gap-[8px] '
              )
            }>
              <Link
                to={`/watch/${movieData?._id}`}
                style={{ textDecoration: "none" }}
              >
                <button className={
                  buttonClasses
                }>
                  <PlayArrow />
                  <span className='uppercase text-[13px]'>Play Now</span>
                </button>
              </Link>
              <button className={buttonClasses} onClick={onAddToList}>
                {addToMyListState?.isLoading ? <CircularProgress color="inherit" size={18} /> :
                  <>
                    {movieData?.isInDefaultList ? <Check /> : <AddCircle />}
                  </>
                }
                <span className='uppercase text-[13px]'>My List</span>
              </button>
            </div>
            {
              renderLikeContainer()
            }
          </div>
        </div>
      </div>


    </div>
  );
}
