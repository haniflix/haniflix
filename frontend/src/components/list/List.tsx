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

import styles from "./list.module.scss";
import { Movie } from "../../store/types";

interface ListProps {
  list: any;
  onDelete?: Function;
  onEdit?: Function;
  onHoverMovie?: (movie: Movie) => {}
}

const List: React.FC<ListProps> = ({ list, onDelete, onEdit, ...otherProps }) => {
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
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const { isMobile } = useResponsive()


  const onHoverMovie = (movie: Movie) => {
    // const movieIndex = list?.content?.findIndex(id => id == movieId)
    otherProps.onHoverMovie(movie)
  }

  return (
    <>
      <div className={styles["list"]}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className={addClassNames(styles['listTitle'], " text-white mt-10")}>{list?.title}</div>
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
            containerClass={
              addClassNames(
                isMobile ? '' : 'overflow-visible'
              )
            }
            customLeftArrow={
              <ArrowBackIosOutlined className={
                addClassNames(
                  styles["sliderArrow"], styles['left']
                )
              } />
            }
            customRightArrow={
              <ArrowForwardIosOutlined
                className={
                  addClassNames(
                    styles["sliderArrow"], styles['right']
                  )
                } />
            }
            itemClass={
              addClassNames(
                '!w-[135px] hover:!w-[300px] transition-all duration-200',
                `mr-[15px] carousel-item`
              )
            }
          >
            {list?.content?.map((movieId, i) => {
              if (!movieId) return;
              return <MovieListItem
                key={i} index={i} movieId={movieId}
                onHover={onHoverMovie}
              />
            })}
          </Carousel>
        </div>
      </div>

    </>
  );
};

export default List;
