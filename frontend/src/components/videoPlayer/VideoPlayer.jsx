import React, { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";

import { useSelector } from "react-redux";
import SocketContext from "../../context/SocketContext";

import { IconButton } from "@mui/material";
import {
  Add,
  ThumbUpAltOutlined,
  ThumbDownOutlined,
  ThumbUp,
  ThumbDown,
  Check,
} from "@mui/icons-material";
import {
  useDislikeMovieMutation,
  useGetMovieQuery,
  useLikeMovieMutation,
} from "../../store/rtk-query/moviesApi";

import Swal from "sweetalert2";
import { useAddMovieToDefaultListMutation } from "../../store/rtk-query/listsApi";

import CircularProgress from "@mui/material-next/CircularProgress";

import { useNavigate } from "react-router-dom";

const VideoPlayer = ({ videoId, videoUrl }) => {
  const [playtime, setPlaytime] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const playerRef = useRef(null);

  const [likeMovie, likeMovieState] = useLikeMovieMutation();
  const [dislikeMovie, dislikeMovieState] = useDislikeMovieMutation();
  const [addToMyList, addToMyListState] = useAddMovieToDefaultListMutation();

  const navigate = useNavigate();

  const {
    data: movieData,
    isLoading: movieDataLoading,
    refetch,
  } = useGetMovieQuery(videoId, {
    refetchOnMountOrArgChange: true,
    skip: !videoId,
  });

  const authReducer = useSelector((state) => state.auth);

  const { socket } = React.useContext(SocketContext);

  //time tracker for emitter
  const lastEmitTimeRef = useRef(0);

  // Load saved playtime from localStorage on component mount
  useEffect(() => {
    const savedPlaytime = parseFloat(
      localStorage.getItem(`videoPlaytime_${videoId}`)
    );
    if (!isNaN(savedPlaytime) && savedPlaytime <= duration) {
      setPlaytime(savedPlaytime);
      setSeekTime(savedPlaytime);
      playerRef.current.seekTo(savedPlaytime);
    }
  }, [videoId, duration]);

  useEffect(() => {
    if (!socket) return;

    const watchedPercentage = Math.floor((playtime / duration) * 100);

    const currentTime = Date.now();
    const timeDifference = currentTime - lastEmitTimeRef.current;

    if (!isNaN(watchedPercentage)) {
      // Check if the last emit was more than 5 seconds ago

      if (timeDifference > 5 * 1000) {
        socket?.emit("updateMovieProgress", {
          movieId: videoId,
          watchedPercentage,
          userId: authReducer?.user?._id,
        });
        // Update the last emit time
        lastEmitTimeRef.current = currentTime;
      }
    }

    return () => {
      const watchedPercentage = Math.floor((playtime / duration) * 100);

      if (!isNaN(watchedPercentage)) {
        socket?.emit("updateMovieProgress", {
          movieId: videoId,
          watchedPercentage,
          userId: authReducer?.user?._id,
        });
      }
    };
  }, [playtime, duration, socket]);

  function formatNumber(number) {
    if (isNaN(number)) return;
    if (number < 1000) {
      return number.toString(); // No abbreviation for numbers less than 1000
    } else if (number < 1000000) {
      return `${(number / 1000).toFixed(1)}k`; // Abbreviate thousands with "k"
    } else {
      return `${(number / 1000000).toFixed(1)}M`; // Abbreviate millions with "M"
    }
  }

  // Set the video duration once it's available
  const handleDuration = (videoDuration) => {
    setDuration(videoDuration);
  };

  // Update playtime in state and localStorage on video progress
  const handleProgress = ({ playedSeconds }) => {
    setPlaytime(playedSeconds);

    if (!playerRef.current.isSeeking) {
      setSeekTime(playedSeconds);
      localStorage.setItem(
        `videoPlaytime_${videoId}`,
        playedSeconds.toString()
      );
    }
  };

  // Handle seeking
  const handleSeekChange = (e) => {
    setSeekTime(parseFloat(e.target.value));
  };

  const handleSeek = () => {
    playerRef.current.seekTo(seekTime);
    setPlaytime(seekTime);
    localStorage.setItem(`videoPlaytime_${videoId}`, seekTime.toString());
  };

  const handleEnded = () => {
    setTimeout(() => {
      navigate("/"); // Redirect to homepage after 2 seconds
    }, 2000);
  };

  // Handle pause
  const handlePause = () => {
    localStorage.setItem(`videoPlaytime_${videoId}`, playtime.toString());
  };

  const showSwal = (title, message, type) => {
    Swal.fire({
      title: title ?? "",
      text: message,
      icon: type,
    });
  };

  const onLikeMovie = async () => {
    const res = await likeMovie(movieData?._id);

    if (!res?.data) {
      showSwal("Error Liking movie", "", "error");
      return;
    }
    refetch({ force: true });
  };

  const onDislikeMovie = async () => {
    const res = await dislikeMovie(movieData?._id);

    if (!res?.data) {
      showSwal("Error disliking movie", "", "error");
      return;
    }
    refetch({ force: true });
  };

  const onAddToList = async () => {
    const res = await addToMyList(movieData?._id);

    if (!res?.data) {
      showSwal("Error encountered", "", "error");
      return;
    }
    refetch({ force: true });
    // showSwal("Added to list", "", "success");
  };

  const renderExtraButtons = () => {
    return (
      <div className=" flex mb-2">
        <IconButton
          className="!text-white"
          onClick={onAddToList}
          aria-label="add"
        >
          {addToMyListState?.isLoading ? (
            <CircularProgress
              color="inherit"
              // style={{ marginRight: -10 }}
              size={14}
            />
          ) : (
            <>
              {movieData?.isInDefaultList ? (
                <div className="icon-circle">
                  <Check className="" />
                </div>
              ) : (
                <div className="icon-circle">
                  <Add className=" " />
                </div>
              )}
            </>
          )}
        </IconButton>
        <IconButton
          onClick={onLikeMovie}
          className="flex gap-1 !text-white items-center"
          aria-label="thumb up"
        >
          {likeMovieState?.isLoading ? (
            <CircularProgress
              color="inherit"
              // style={{ marginRight: -10 }}
              size={14}
            />
          ) : (
            <>
              {movieData?.currentUserLiked ? (
                <div className="icon-circle">
                  <ThumbUp className="" />
                </div>
              ) : (
                <div className="icon-circle">
                  <ThumbUpAltOutlined className="" />
                </div>
              )}
            </>
          )}
          <div className="text-sm">{formatNumber(movieData?.likesCount)}</div>
        </IconButton>
        <IconButton
          onClick={onDislikeMovie}
          className="flex items-center gap-1 !text-white"
          aria-label="thumb down "
        >
          {dislikeMovieState?.isLoading ? (
            <CircularProgress color="inherit" className="w-[26px]" size={14} />
          ) : (
            <>
              {movieData?.currentUserDisliked ? (
                <div className="icon-circle">
                  <ThumbDown className="" />
                </div>
              ) : (
                <div className="icon-circle">
                  <ThumbDownOutlined className=" " />
                </div>
              )}
            </>
          )}
          <div className="text-sm">
            {formatNumber(movieData?.dislikesCount)}
          </div>
        </IconButton>
      </div>
    );
  };

  return (
    <div className="video-player-container">
      <ReactPlayer
        ref={playerRef}
        url={videoUrl}
        controls
        onEnded={handleEnded}
        onDuration={handleDuration}
        onProgress={handleProgress}
        onPause={handlePause}
        playing
        width="100%"
        height="95vh"
        playbackRate={1.0}
        progressInterval={1000}
      />
      <div className="px-3">{renderExtraButtons()}</div>
    </div>
  );
};

export default VideoPlayer;
