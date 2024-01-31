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
import "./list.scss";
import { useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/reducers/auth";

interface ListProps {
  list: any;
  onDelete?: Function;
  onEdit?: Function;
}

const List: React.FC<ListProps> = ({ list, onDelete, onEdit }) => {
  const user = useAppSelector(selectUser);
  // const [isMoved, setIsMoved] = useState<boolean>(false);
  // const [slideNumber, setSlideNumber] = useState<number>(0);

  /*const listRef: any = useRef();

  const handleClick = (direction: "left" | "right") => {
    if (listRef.current) {
      setIsMoved(true);
      let distance = listRef?.current?.getBoundingClientRect().x - 50;
      if (direction === "left" && slideNumber > 0) {
        setSlideNumber(slideNumber - 1);
        listRef.current.style.transform = `translateX(${230 + distance}px)`;
      }
      if (direction === "right" && slideNumber < 5) {
        setSlideNumber(slideNumber + 1);
        listRef.current.style.transform = `translateX(${-230 + distance}px)`;
      }
    }
  };*/

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
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

  return (
    <>
      <div className="list">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="listTitle text-white font-bold !text-2xl mt-6">{list?.title}</div>
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
        <div className="wrapper">
          <Carousel
            responsive={responsive}
            centerMode={true}
            customLeftArrow={
              <ArrowBackIosOutlined className="sliderArrow left" />
            }
            customRightArrow={
              <ArrowForwardIosOutlined className="sliderArrow right" />
            }
          >
            {list?.content?.map((item, i) => {

              if (!item) return;
              return <ListItem key={i} index={i} item={item} />
            })}
          </Carousel>
        </div>
      </div>
      {/*<div className="list">
        <span className="listTitle">{list?.title}</span>
        <div className="wrapper">
          <ArrowBackIosOutlined
            className="sliderArrow left"
            onClick={() => handleClick("left")}
            style={{ display: !isMoved && "none" }}
          />
          <div className="container" ref={listRef}>
            {list?.content?.map((item, i) => (
              <ListItem key={i} index={i} item={item} />
            ))}
          </div>
          <ArrowForwardIosOutlined
            className="sliderArrow right"
            onClick={() => handleClick("right")}
          />
        </div>
            </div>*/}
    </>
  );
};

export default List;
