import React, { lazy, Suspense, useCallback, useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import useApiClient from "../../hooks/useApiClient";
import Swal from "sweetalert2";
import Carousel from "react-multi-carousel";
import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@material-ui/icons";
import ListItem from "../../components/listItem/ListItem";
const List = lazy(() => import("../../components/list/List"));

const api_url = import.meta.env.VITE_APP_API_URL;

const Home = ({ type = null }) => {
  const [lists, setLists] = useState([]);
  const [genre] = useState(null);
  const client = useApiClient();
  const [movies, setMovies] = useState([]);

  const getRandomLists = (type: string, genre: string) => {
    client
      .getRandomLists(type, genre)
      .then((res) => {
        const filteredLists = res.filter((list) => !list.user);
        setLists(filteredLists);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getRandomMovies = useCallback(
    (type: string) => {
      client
        .getRandomMovies(type)
        .then((res) => {
          setMovies(res);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    [client]
  );

  useEffect(() => {
    getRandomLists(type, genre);
    getRandomMovies(type);
    /*const getRandomLists = async () => {
      try {
        const res = await axios.get(
          `${api_url}lists${type ? '?type=' + type : ''}${genre ? '&genre=' + genre : ''}`,
          {
            headers: {
              token: '',
            },
          }
        );
        // Filter out lists with a user property
        const filteredLists = res.data.filter((list) => !list.user);
        setLists(filteredLists);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomLists();*/
  }, [type, genre]);

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
    <div className="home">
      <Navbar />
      <Featured type={type} />

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
          {movies?.map((item, i) => (
            <ListItem key={item?._id} index={i} item={item?._id} />
          ))}
        </Carousel>
      </div>
      {/*<Suspense
        fallback={<div style={{ backgroundColor: "black" }}>Loading...</div>}
      >
        {lists?.map((list) => (
          <List key={list._id} list={list} />
        ))}
        </Suspense>*/}
    </div>
  );
};

export default Home;
