import React from "react";
import moviePlaceHolderSvg from "../../Assets/svgs/moviePlaceholder.svg";
import MovieListItem from "../MovieListItem";
import Icon from "../icon";
import { useGetGenresQuery } from "../../store/rtk-query/genresApi";
import { motion, AnimatePresence } from "framer-motion";

export default function MovieDetailPanel({ movieToShow, onPlayMovie , onHoverMovie, type}) {
  const imageToshow = React.useMemo(() => {
    return movieToShow?.img ? movieToShow?.img : moviePlaceHolderSvg;
  }, [movieToShow]);

  const tabVariant = {
    hidden: {},
    visible: {},
    exit: {},
  };

  const tabChildVariant = {
    hidden: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.5, ease: [0.65, 0, 0.35, 1] },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.65, 0, 0.35, 1] },
    },
    exit: {
      opacity: 0,
      y: 10,
      transition: { duration: 0.5, ease: [0.65, 0, 0.35, 1] },
    },
  };

  const parentTransition = { staggerChildren: 0.05 };

  const handleHover = (movie) => {
    // onHoverMovie?.(movie);
  };
 
  const onClickPlayMovie = (movie, axis) => {
    onPlayMovie?.(movie, axis);
  };

  const { data: genresData, isLoading: genresLoading } =
    useGetGenresQuery(null);

  const renderGenres = () => {
    let genreTextArr = [];

    //movie genres Array[] can be just an _id or the full mongoDb document for genre

    if (movieToShow?.genre?.[0]?._id) {
      genreTextArr = movieToShow?.genre
        ?.map((genreObj) => {
          return genreObj?.title;
        })
        .filter((text) => text != undefined);
    } else {
      genreTextArr = movieToShow?.genre
        ?.map((genreId) => {
          const genreObj = genresData?.genres?.find((_genre) => {
            return genreId == _genre?._id;
          });

          return genreObj?.title;
        })
        .filter((text) => text != undefined);
    }
  }

  return (
    
    <motion.div 
    key={movieToShow?._id}
    initial="hidden"
    animate="visible"
    exit="exit"
    variants={tabVariant}
    transition={parentTransition}
    className="flex flex-col gap-5 relative z-10">

      {movieToShow && <p className="text-main text-center capitalize">{type}</p>}

      {movieToShow && (
        <motion.div variants={tabChildVariant}>
            <MovieListItem
            showActionOnMobile={true}
              movieId={movieToShow?._id}
              showActionButtons={false}
              // movieObj={list}
              // onHover={onHoverMovie}

              onHover={handleHover}
              onPlayMovie={onClickPlayMovie}
            />
        </motion.div>
      )}

      {movieToShow && (
        <motion.div variants={tabChildVariant}>
          <p className="text-lg">Description</p>
          <p className="text-muted text-base mt-1">{movieToShow?.desc}</p>
        </motion.div>
      )}

      {movieToShow && (
        <motion.div variants={tabChildVariant}>
          <p className="text-lg">Rating</p>
          <p className="text-muted text-base mt-1 flex gap-8">
          <span className="flex items-center gap-2" >
          <Icon name={"Like"} size={"M"}/>{movieToShow?.likesCount}
          </span>
          <span className="flex items-center gap-2">
          <Icon name={"Dislike"} size={"M"} />{movieToShow?.dislikesCount}
          </span> 
          </p>
        </motion.div>
      )}

      {movieToShow && (
        <motion.div variants={tabChildVariant}>
          <p className="text-lg">Duration</p>
          <p className="text-muted text-base mt-1">{movieToShow?.duration}</p>
        </motion.div>
      )}

      {movieToShow && (
        <motion.div variants={tabChildVariant}>
          <p className="text-lg">Age Rating</p>
          <p className="text-muted text-base mt-1">{movieToShow?.ageRating}</p>
        </motion.div>
      )}

      {movieToShow && (
        <motion.div variants={tabChildVariant}>
          <p className="text-lg">Genre</p>
          <p className="text-muted text-base mt-1">{renderGenres()}</p>
        </motion.div>
      )}
    </motion.div>
  );
}
