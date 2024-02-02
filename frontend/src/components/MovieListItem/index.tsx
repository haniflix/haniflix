import "./listItem.scss";
import {
    PlayArrow,
    Add,
    ThumbUpAltOutlined,
    ThumbDownOutlined,
    ThumbUp,
    Check,
    ThumbDown,
} from "@mui/icons-material";
import { AiOutlinePlus } from "react-icons/ai";
import { useCallback, useEffect, useState } from "react";

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import { useDislikeMovieMutation, useGetMovieQuery, useLikeMovieMutation } from "../../store/rtk-query/moviesApi";
import { useAddMovieToDefaultListMutation } from "../../store/rtk-query/listsApi";

import CircularProgress from '@mui/material-next/CircularProgress';
import { addClassNames } from "../../store/utils/functions";
import useResponsive from "../../hooks/useResponsive";

import moviePlaceHolderSvg from '../../Assets/svgs/moviePlaceholder.svg'
import { useGetGenresQuery } from "../../store/rtk-query/genresApi";


const api_url = import.meta.env.VITE_APP_API_URL;

type MovieListItemProps = {
    movieId: number;
    movieObj?: any;
    refetchFn?: () => {}
    onHover?: (movieId: string) => {};
    layoutType?: 'carousel' | 'grid'
}

export default function MovieListItem({
    movieId,
    movieObj,
    onHover,
    layoutType,
    refetchFn }: MovieListItemProps) {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [movie, setMovie] = useState<any>({});

    const [isLike, setIsLike] = useState<boolean | null>(null);
    const [trailer, setTrailer] = useState<string>("");
    const navigate = useNavigate();

    const [likeMovie, likeMovieState] = useLikeMovieMutation()
    const [dislikeMovie, dislikeMovieState] = useDislikeMovieMutation()
    const [addToMyList, addToMyListState] = useAddMovieToDefaultListMutation()

    const { isMobile } = useResponsive()

    const { data: movieData, isLoading: movieDataLoading, refetch } = useGetMovieQuery(movieId, {
        //skip if movieObj is defined
        skip: movieObj
    })

    const { data: genresData, isLoading: genresLoading } = useGetGenresQuery()


    useEffect(() => {
        if (movieObj) {
            setMovie(movieObj)
        }

        if (!movieData) return
        setMovie(movieData)
    }, [movieData, movieObj])


    const showSwal = (title, message, type) => {
        Swal.fire({
            title: title ?? "",
            text: message,
            icon: type,
        });
    };


    const applyLikeInFrontend = (action: "like" | "dislike") => {
        setIsLike((cur) => {
            if (cur == null && action == "like") return true;
            if (cur == null && action == "dislike") return false;
            if (cur == true && action == "like") return null;
            if (cur == true && action == "dislike") return false;
            if (cur == false && action == "like") return true;
            if (cur == false && action == "dislike") return null;
        });
    };



    const onLikeMovie = async () => {
        const res = await likeMovie(movie?._id)

        if (!res?.data) {
            showSwal("Error Liking movie", '', "error");
            return
        }
        // applyLikeInFrontend("like");
        if (refetchFn) { refetchFn() } else { refetch?.() }
    }

    const onDislikeMovie = async () => {
        const res = await dislikeMovie(movie?._id)

        if (!res?.data) {
            showSwal("Error disliking movie", '', "error");
            return
        }

        // applyLikeInFrontend("dislike");
        if (refetchFn) { refetchFn() } else { refetch?.() }
    }

    const onAddToList = async () => {
        const res = await addToMyList(movie?._id)

        if (!res?.data) {
            showSwal("Error encountered", '', "error");
            return
        }
        if (refetchFn) { refetchFn() } else { refetch?.() }
        //  showSwal("Added to list", '', 'success')
    }

    const renderGenres = () => {
        let genreTextArr = []

        //movie genres Array[] can be just an _id or the full mongoDb document for genre

        if (movie?.genre?.[0]?._id) {
            genreTextArr = movie?.genre?.map((genreObj) => {
                return genreObj?.title
            }).filter((text) => text != undefined)
        } else {
            genreTextArr = movie?.genre?.map((genreId) => {
                const genreObj = genresData?.genres?.find((_genre) => {
                    return genreId == _genre?._id
                })

                return genreObj?.title
            }).filter((text) => text != undefined)
        }

        return (
            <div className='flex text-[9px] flex-wrap gap-[3px]'>
                {genreTextArr?.map((text, index) => {
                    return <div className='flex'>
                        <div className='capitalize'>{text}</div>
                        <div className='ml-[3px]'>
                            {(
                                index + 1 !== genreTextArr.length
                            ) ? '.' : ''}
                        </div>
                    </div>
                })
                }
            </div >
        )
    }


    const renderSideButtons = () => {

        return (
            <div className="side-buttons absolute right-3 top-0 bottom-0 z-[1000] flex flex-col gap-1 justify-end pb-[17px]">
                <div
                    onClick={() => {
                        onLikeMovie()
                    }}
                >
                    {likeMovieState?.isLoading ? <CircularProgress color="inherit" style={{ marginRight: -10 }} size={14} /> :
                        <>
                            {(movie?.currentUserLiked) ? (
                                <div className='icon-circle'>
                                    <ThumbUp
                                        className='!text-[10px] '
                                    />
                                </div>
                            ) : (

                                <div className='icon-circle'>
                                    <ThumbUpAltOutlined
                                        className='!text-[10px] '
                                    />
                                </div>
                            )}
                        </>
                    }

                </div>
                <div
                    onClick={() => {
                        onDislikeMovie()
                    }}
                >
                    {dislikeMovieState?.isLoading ? <CircularProgress color="inherit" style={{ marginRight: -10 }} size={14} /> :
                        <>
                            {(movie?.currentUserDisliked) ? (

                                <div className='icon-circle'>
                                    <ThumbDown
                                        className='!text-[10px] '
                                    />
                                </div>
                            ) : (

                                <div className='icon-circle'>
                                    <ThumbDownOutlined
                                        className='!text-[10px] '
                                    />
                                </div>
                            )}
                        </>
                    }

                </div>
                <div onClick={onAddToList}>
                    {addToMyListState?.isLoading ? <CircularProgress color="inherit" style={{ marginRight: -10 }} size={14} /> :
                        <>
                            {movie?.isInDefaultList ? <div className='icon-circle'><Check
                                className='!text-[10px] '
                            /></div> : <div className='icon-circle'><AiOutlinePlus
                                className='!text-[10px] '
                            /></div>}
                        </>
                    }
                </div>
            </div>
        )
    }

    return (
        <>

            {/*<Link to={{ pathname: "/watch", movie: movie }}>*/}
            <div
                onClick={() => {
                    if (isMobile) {
                        navigate(`/watch/${movie._id}`)
                    }
                }}
                className={
                    addClassNames(
                        "listItem relative",
                        "h-[130px] sm:w-[225px] rounded-[3px]",
                        layoutType == 'grid' ? '!w-full' : 'w-[225px]'
                    )
                }
                // style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
                onMouseEnter={() => {
                    onHover?.(movie?._id)
                    setIsHovered(true)
                }}
                onMouseLeave={() => setIsHovered(false)}
            >
                <img src={movie?.img ? movie?.img : moviePlaceHolderSvg} alt="" className="rounded-[3px]" />

                <div
                    style={{
                        background: "rgb(0, 0, 0, 0.5)",
                        position: "absolute",
                    }}
                    className={
                        addClassNames(
                            'top-0 bottom-0 right-0 left-0 z-[200] details '
                        )
                    }
                >
                    <div
                        style={{
                            // background: "yellow",
                            // height: "50%",
                            position: "absolute",
                            //   overflow: "hidden",
                            bottom: 0,
                            textOverflow: "ellipsis",
                            fontSize: 10,
                            lineHeight: 1.3,
                            margin: 5,
                        }}
                    >
                        <Link
                            to={`/watch/${movie._id}`}
                            style={{ textDecoration: "none", color: "#fff" }}
                        >
                            <div className="flex flex-col">

                                <div className={
                                    addClassNames(
                                        'h-[25px] w-[25px] bg-[rgb(0, 0, 0, 0.9)] flex',
                                        'border border-[#ddd] rounded-[50%] items-center justify-center'
                                    )
                                }>
                                    <PlayArrow className="text-[red] !text-[19px]" />
                                </div>

                                <div style={{}}>
                                    <div className='font-[500] text-[11.5px] mt-[4px] mb-[1px]'>{movie.title}</div>
                                    <div className='flex items-center gap-[3px]'>
                                        <div>
                                            {movie?.year}
                                        </div>
                                        {movie?.ageRating ? <div className='text-[9px] border border-[#ddd] border-[1px] rounded-[2px] py-[1px] px-[2px]'><div>
                                            {movie?.ageRating}
                                        </div> </div> : undefined}
                                        {movie?.duration ?
                                            <div>{movie?.duration}</div>
                                            : undefined}
                                        <div className='font-[600]'>
                                            4K
                                        </div>
                                    </div>
                                    {renderGenres()}
                                </div>

                            </div>
                        </Link>
                    </div>
                </div>
                {renderSideButtons()}
            </div>
        </>
    );
}
