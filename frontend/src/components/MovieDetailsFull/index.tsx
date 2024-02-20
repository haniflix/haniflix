import { PlayArrow, AddCircle } from "@mui/icons-material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
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
  Close,
  ThumbDown
} from "@mui/icons-material";
import CircularProgress from '@mui/material-next/CircularProgress';
import { useGetGenresQuery } from "../../store/rtk-query/genresApi";

import styles from "./details.module.scss";

import {
  PlayIcon,
  HeartIcon,
  HeartIconFilled,
  ThumbsDownIcon,
  ThumbsUpIcon,
  DolbyLogo
} from '../../Assets/svgs/tsSvgs'
import useResponsive from "../../hooks/useResponsive";

import { Dialog, Disclosure, Transition } from '@headlessui/react';
import ReactPlayer from "react-player";


type MetaInfoItem = {
  text: string
}

type Props = {
  movieId: string | undefined;
  movieDataProps: any
}

export default function MovieDetailsFull({ movieId, movieDataProps }: Props) {
  const client = useApiClient();

  const isMobile = React.useRef(window.matchMedia('(pointer: coarse)').matches);

  const userReducer = useSelector((state) => state.auth)

  const [skipInitialCall, setSkipInitial] = useState(true)

  const [playTrailerOpen, setPlayTrailerOpen] = useState(false)


  const { data: genresData, isLoading: genresLoading } = useGetGenresQuery()


  const [likeMovie, likeMovieState] = useLikeMovieMutation()
  const [dislikeMovie, dislikeMovieState] = useDislikeMovieMutation()
  const [addToMyList, addToMyListState] = useAddMovieToDefaultListMutation()

  //frontend like
  const [isLike, setIsLike] = useState<boolean | null>(null);

  const [movieData, setMovieData] = useState<any>()

  const { data: newMovieData, isLoading: getMovieLoading, refetch } = useGetMovieQuery(movieId, {
    skip: skipInitialCall || !movieId,
    refetchOnMountOrArgChange: true,
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
    // if no movieDataProps, then call get movie query
    else {
      setSkipInitial(false)
    }
  }, [movieDataProps])


  const showSwal = (title, message, type) => {
    Swal.fire({
      title: title ?? "",
      text: message,
      icon: type,
    });
  };


  const onLikeMovie = async () => {
    const res = await likeMovie(movieData?._id)

    if (!res?.data) {
      showSwal("Error Liking movie", '', "error");
      return
    }

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
    // applyLikeInFrontend("dislike");
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
    " backdrop-blur-md",
    'bg-[#ffffff29] rounded-[30px] text-sm !border !border-[#FFFFFF1A]',
    'h-[45px] ',
    'flex space-x-1 !text-white rounded-[8px] height-[55px] flex items-center justify-center'
  )

  const renderTrailerModal = () => {

    console.log('movieData?.trailer ', movieData)

    return (
      <Transition appear show={playTrailerOpen} as={React.Fragment}>
        <Dialog
          className='z-[1000] absolute'
          onClose={() => {
            setPlayTrailerOpen(false)
          }}>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            as="div"
          >
            <div className="fixed top-0 right-0 left-0 bottom-0 bg-[#00000080] backdrop-blur-sm transition-opacity duration-300" />
            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex items-center  justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:p-0">
                <button
                  className
                  onClick={() => {
                    setPlayTrailerOpen(false)
                  }}>
                  <span className={
                    addClassNames(
                      " bg-[#ffffff32] text-white flex items-center justify-center h-[35px] w-[35px] focus:ring-offset-2 focus:ring-blue-500",
                      "rounded-[50%] px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-[#ffffff54] focus:outline-none focus:ring-2 ",
                      "absolute top-[50px] right-[100px]"
                    )
                  }>
                    <Close
                      style={{ color: 'white' }}
                    />
                  </span>
                </button>
                <div className="mt-[100px] h-[80vh] max-w-[800px] w-[75%] text-center ">
                  {/* Wrap your video player component here, e.g., react-player, with appropriate styling and state management */}
                  <ReactPlayer
                    url={movieData?.trailer}
                    width="100%"
                    height="100%"
                    style={{
                      objectFit: 'contain',
                      height: 'auto !important',
                      aspectRatio: '16/9'
                    }}
                  />
                </div>
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    )
  }


  const renderLikeContainer = () => {
    return (
      <div className="flex space-x-[4px]">
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
              {movieData?.currentUserLiked ? <ThumbUp /> : <div className='scale-75'><ThumbsUpIcon /></div>}
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
              {movieData?.currentUserDisliked ? <ThumbDown /> : <div className='scale-75'><ThumbsDownIcon /></div>}
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
          className='flex flex-wrap space-x-3 mt-2'
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

    metaInfo.push({
      component: <div>
        <DolbyLogo
          height={23}
          width={60}
        />
      </div>
    })

    metaInfo.push({
      component: <div>4K</div>
    })

    if (metaInfo.length == 0) return

    //build tsx


    return (
      <div
        className='flex flex-wrap items-center space-x-3'
      >
        {metaInfo?.map((info) => {
          return (
            <div
              key={info?.text}
              className='px-3 capitalize py-2 bg-[#ffffff29] rounded-[30px] text-xs'>
              {info.text || info.component}
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
      {renderTrailerModal()}
      <div className="h-full w-full relative flex flex-col justify-end ">
        {/* Image div */}
        <div
          className="absolute top-0 left-0 right-0 bottom-0 bg-cover bg-teal-500 bg-no-repeat"
          style={{
            backgroundImage: `url(${movieData?.imgTitle}), url(${movieData?.img})`
          }}
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


        <button
          onClick={() => {
            setPlayTrailerOpen(true)
          }}
          className={
            addClassNames(
              "flex items-center gap-[4px] px-7 absolute flex items-center top-[22vh] right-[10%]",
              buttonClasses
            )
          }
        >
          {/* <div className='scale-75'><PlayIcon /></div> */}
          <span className='capitalise text-[13px] font-[500]'>Play Trailer</span>
        </button>

        <div className={
          addClassNames(
            "z-[100] relative p-[13px] min-h-[300px] ",
            '!top-[100px] sm:!top-[60px] sm:w-[66vw]',
            'sm:ml-[70px]',
            'mb-[5vh] space-y-[12px]',
            styles['info']
          )
        }>

          <div className={
            addClassNames(
              " font-[500] mt-6",
              isMobile.current ? "text-[5rem]" : "text-[2.5rem]"
            )
          }>{movieData?.title ? movieData?.title : <div><CircularProgress color="inherit" size={18} /><span>Loading..</span></div>}</div>
          <div className="flex flex-wrap  space-x-3">
            <div className={
              addClassNames(
                styles["buttons"], ' !space-x-[8px] '
              )
            }>
              <Link
                className={
                  buttonClasses
                }
                to={`/watch/${movieData?._id}`}
                style={{ textDecoration: "none" }}
              >
                <button >
                  <div className='scale-75'><PlayIcon /></div>
                  <span className='capitalise text-[13px] font-[500]'>Play Now</span>
                </button>
              </Link>
              <div className={
                addClassNames(
                  buttonClasses,
                  "px-2"
                )
              } onClick={onAddToList}>
                {addToMyListState?.isLoading ? <CircularProgress color="inherit" size={18} /> :
                  <>
                    {movieData?.isInDefaultList ? <div className='scale-[0.73]'><HeartIconFilled /></div> : <div className='scale-75'><HeartIcon /></div>}
                  </>
                }
                <span className=' text-[13px] font-[500]'>
                  {movieData?.isInDefaultList ? "Remove From My List" : "Add To My List"}
                </span>
              </div>
            </div>
            {
              renderLikeContainer()
            }
          </div>
          {renderMetaInfo()}

          <div>
            {renderGenres()}
          </div>

          <span className={styles["desc"]} >
            {trimmedDesc}
          </span>

        </div>
      </div>


    </div>
  );
}
