import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
  Delete,
  Edit,
} from "@mui/icons-material";
import { useRef, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ListItem from "../listItem/ListItem";
import { useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/reducers/auth";
import MovieListItem from "../MovieListItem/index";
import { addClassNames } from "../../store/utils/functions";
import useResponsive from "../../hooks/useResponsive";
import NextPlump from "../../Assets/svgs/Icons/NextPlump.svg";
import PrevPlump from "../../Assets/svgs/Icons/PrevPlump.svg";

import styles from "./list.module.scss";
import { Movie } from "../../store/types";

interface ListProps {
  list: any;
  onDelete?: Function;
  onEdit?: Function;
  onHoverMovie?: any;
  onPlayMovie?: any;
}

const List: React.FC<ListProps> = ({
  list,
  onDelete,
  onEdit,
  onHoverMovie,
  onPlayMovie,
  ...otherProps
}) => {
  const user = useAppSelector(selectUser);

  const carouselRef = useRef();

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 500 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 500, min: 0 },
      items: 2,
    },
  };

  const { isMobile } = useResponsive();

  const handleHover = (movie: Movie) => {
    onHoverMovie?.(movie);
  };
 
  const onClickPlayMovie = (movie: Movie, axis: any) => {
    onPlayMovie?.(movie, axis);
  };

  return (
    <>
      <div className={styles["list"]}>
        <div className="flex justify-between gap-5 mb-2 xl:mb-5">
        <p className="text-muted text-base xl:text-lg">{list?.title}</p>
          
          <div>
            {onEdit ? (
              <span style={{ cursor: "pointer" }} onClick={() => onEdit()}>
                <Edit />
              </span>
            ) : null}
            {user?.defaultList !== list?._id && onDelete ? (
              <span style={{ cursor: "pointer" }} onClick={() => onDelete()}>
                <Delete />
              </span>
            ) : null}
          </div>
        </div>

        <div className={styles["wrapper"]}>
          <Carousel
            ref={carouselRef}
            responsive={responsive}
            centerMode={true}
            containerClass={addClassNames(isMobile ? "" : "overflow-visible")}
            customRightArrow={
              <div className={addClassNames(
                styles["sliderArrow"],
                styles["right"]
              )}>
                <img src={NextPlump} alt="" />
              </div>
            }
            customLeftArrow={
              <div className={addClassNames(
                styles["sliderArrow"],
                styles["left"]
              )}>
                <img src={PrevPlump} alt="" />
              </div>
            }
            itemClass={addClassNames(
              "!w-[120px] sm:!w-[11vw]",
              `mr-[10px] sm:mr-[2vw] carousel-item`
            )}
          >
            {list?.content?.map((movieId, i) => {
              if (!movieId) return;

              return (
                <MovieListItem
                  key={i}
                  index={i}
                  movieId={movieId}
                  // movieObj={list}
                  onHover={handleHover}
                  onPlayMovie={onClickPlayMovie}
                />
              );
            })}
          
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default List;
