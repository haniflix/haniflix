import { useState, useMemo } from "react";
import { makeStyles } from "@mui/styles";
import { useNavigate, useParams } from "react-router-dom";
import {
  Grid,
} from "@mui/material";
import Pagination from "./Pagination";
import MovieListItem from "./MovieListItem";
import { useGetGenresQuery } from "../store/rtk-query/genresApi";
import { useGetMoviesQuery } from "../store/rtk-query/moviesApi";
import Icon from "./icon";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "12vh",
    width: "85%",
    margin: "auto",
    color: "white",
    gap: "2",
    minHeight: "calc(100vh - 56px)",
    marginBottom: "56px",
  },
  input: {
    width: "100%",
    marginBottom: "2rem",
    "& input": {
      color: "black",
    },
  },
}));

const getCurrentYear = () => new Date().getFullYear();

const years = Array.from({ length: getCurrentYear() - 1900 + 1 }, (_, i) => 1900 + i).reverse();

const GenreResults = () => {
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const [movieYear, setMovieYear] = useState<number | undefined>(undefined);
  const navigate = useNavigate()
  const { id: genreId } = useParams();
  const { data: genresData, isLoading: genresLoading, error: genresError } = useGetGenresQuery({}, { refetchOnMountOrArgChange: true });

  const itemsPerPage = 20;
  const [page, setPage] = useState(1);

  const queryParams = {
    genreId,
    perPage: itemsPerPage,
    page,
    searchTerm: search,
    ...(movieYear && { movieYear }),
  };

  const { data: moviesData, isLoading: moviesLoading, error: moviesError, refetch } = useGetMoviesQuery(queryParams, {
    pollingInterval: 10000,
    refetchOnMountOrArgChange: true,
  });

  const pageCount = moviesData?.totalMovies
    ? Math.ceil(moviesData.totalMovies / queryParams.perPage)
    : 0;

  const selectedGenre = useMemo(() => {
    if (!genresData) return undefined;
    return genresData?.genres?.find((item) => item?._id === genreId);
  }, [genresData, genreId]);

  const handlePageChange = (data) => {
    const selectedPage = parseInt(data?.selected) + 1 || 0;
    setPage(selectedPage);
  };

  const handleSearch = (e) => {
    const searchString = e.target.value.trim().toLowerCase();
    setSearch(searchString);
  };

  const handleYearChange = (e) => {
    const year = e.target?.value;
    setMovieYear(year);
  };


  if (genresError || moviesError) {
    return <div>Error loading data</div>;
  }

  return (

    <div className={`home flex p-3 gap-3 relative`}>
      <div className=" homedarkbg p-4 m-auto fixed left-0 top-0 right-0 bottom-0">
        <div className="w-full h-full relative z-[1] overflow-x-hidden	 overflow-y-scroll CustomScroller">
          <div className="w-full h-fit flex-grow flex-shrink rounded-2xl p-6 xl:p-10 flex flex-col gap-4 sm:gap-6 xl:gap-5">

            <div className="flex gap-2 sm:flex-row justify-between relative z-10">
              <div className="flex gap-6 text-white ">
                <button className="text-white " onClick={() => navigate('/')} onTouchStart={(e) => { e.preventDefault(); navigate('/') }}>
                  <Icon name={"Home"} />
                </button>
              </div>

              <div
                className={`inputWrapperHover relative flex items-center w-72 px-3 bg-dark gap-2 py-3  overflow-hidden group duration-500`}
              >
                <Icon name={"Search"} />
                <input
                  type="text"
                  placeholder="Search"
                  className="min-w-0 bg-transparent placeholder:text-muted text-white w-56 absolute left-12"
                  value={search}
                  onChange={handleSearch}
                />
              </div>
            </div>

            {/* <FormControl>
              <InputLabel id="year-select-label">Year</InputLabel>
              <Select
                id="year-select"
                value={movieYear || ""}
                label="Year"
                onChange={handleYearChange}
                className="bg-white h-[45px] w-[90px] text-black"
                sx={{ color: 'black' }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {years.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl> */}

            <p className="text-base xl:text-lg capitalize">{selectedGenre?.title}</p>
            {moviesData?.movies?.length === 0 &&
              (search !== "" || movieYear !== undefined) && (
                <h1 className="text-white mt-6">No Movies Found...</h1>
              )}

            <Grid container spacing={2} className="mt-3 sm:mx-[20px] relative">
              {moviesData?.movies?.map((movie, index) => (
                <Grid item xs={6} md={12 / 7} key={index}>
                  <div className="relative hover:z-[200] shadow-md">
                    <MovieListItem
                      movieObj={movie}
                      refetchFn={refetch}
                      layoutType="grid"
                    />
                  </div>
                </Grid>
              ))}
            </Grid>
            <div className="flex items-center justify-center">
              <Pagination
                onPageChange={handlePageChange}
                pageCount={pageCount}
                itemsPerPage={itemsPerPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenreResults;
