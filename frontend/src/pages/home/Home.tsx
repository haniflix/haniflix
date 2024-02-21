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
} from "@mui/icons-material";
import ListItem from "../../components/listItem/ListItem";
import { useGetContinueWatchingListQuery, useGetMyListQuery, useGetRandomListsQuery } from "../../store/rtk-query/listsApi";
import List from "../../components/list/List"
import { addClassNames } from "../../store/utils/functions";

import './home.scss'

const api_url = import.meta.env.VITE_APP_API_URL;

const Home = ({ type = null }) => {
  const [lists, setLists] = useState([]);
  const [genre] = useState(null);
  const client = useApiClient();
  //const [movies, setMovies] = useState([]);

  const { data: continueWatchingListData, isLoading: continueWatchingLoading, refetch: refetchContinueWatching } = useGetContinueWatchingListQuery({}, {
    refetchOnMountOrArgChange: true,
  })

  const { data: randomListData, isLoading: randomListLoading } = useGetRandomListsQuery({
  }, {
    refetchOnMountOrArgChange: true,
  })

  const { data: myListData, isLoading: myListLoading } = useGetMyListQuery({})

  const [movieToShow, setMovieToShow] = React.useState(undefined)

  const [appHeight, setAppHeight] = useState(window.innerHeight);
  const [appWidth, setAppWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setAppHeight(window.innerHeight); // Update appHeight
      setAppWidth(window.innerWidth); // Update appWidth
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize); // Clean up listener
  }, [setAppHeight, setAppWidth]);

  console.log('window.innerHeight ', window.innerHeight)
  console.log('appHeight ', appHeight)

  const heroHeight = appHeight * 0.65;
  const slidersHeight = appHeight * 0.35;

  console.log('heroHeight ', heroHeight)



  useEffect(() => {
    setLists(randomListData);
  }, [type, genre, randomListData]);

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

  const onHoverOverMovie = (movie) => {
    setMovieToShow(movie)
  }


  return (
    <div className="home relative !bg-black">
      <Navbar
        onSelectMovie={(movie) => setMovieToShow(movie)}
      />
      <div
        style={{
          height: heroHeight,
        }}
        className='fixed top-0 right-0 left-0 z-[900] '>
        <Featured
          movieObj={movieToShow}
          type={type}
        />
      </div>


      <div className={addClassNames(
        ' overflow-hidden mt-[65vh] relative z-[10] pt-[0px] pb-6'
      )}>
        <div
          className='fixed z-[200] top-[65vh] left-0 right-0 h-[25px] bg-gradient-to-b from-black to-transparent'
        >

        </div>
        <Suspense
          fallback={<div style={{ backgroundColor: "black" }}>Loading...</div>}
        >
          <div className='mx-[20px] sm:mx-[80px] overflow-x-hidden'>
            <div>

              {
                continueWatchingListData?.list ?
                  <List
                    onHoverMovie={onHoverOverMovie}
                    list={{
                      ...continueWatchingListData?.list,
                      title: "Continue Watching"
                    }} />
                  : undefined
              }
            </div>

            <div>

              {
                myListData?.[0] ?
                  <List
                    onHoverMovie={onHoverOverMovie}
                    list={
                      myListData?.[0]
                    } />
                  : undefined
              }
            </div>

            {lists?.map((list) => (
              <List
                onHoverMovie={onHoverOverMovie}
                key={list._id} list={list} />
            ))}
          </div>
        </Suspense>
      </div>
    </div>
  );
};

export default Home;
