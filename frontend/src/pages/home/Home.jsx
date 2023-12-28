import React, { lazy, Suspense, useEffect, useState } from 'react';
import axios from 'axios';

import Navbar from '../../components/navbar/Navbar';
import Featured from '../../components/featured/Featured';
const List = lazy(() => import('../../components/list/List'));

const api_url = process.env.REACT_APP_API_URL;

const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre] = useState(null);

  useEffect(() => {
    const getRandomLists = async () => {
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
        console.log(filteredLists);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomLists();
  }, [type, genre]);

  return (
    <div className="home">
        <Navbar />
        <Featured type={type} />
        <Suspense fallback={<div style={{backgroundColor:"black"}}>Loading...</div>}>
        {lists?.map((list) => (
          <List key={list._id} list={list} />
        ))}
      </Suspense>
    </div>
  );
};

export default Home;
