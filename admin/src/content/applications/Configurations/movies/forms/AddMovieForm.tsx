import React, { useCallback, useEffect, useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Paper,
  TextField,
  Typography,
  generateUtilityClass,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


import useApiClient from 'src/hooks/useApiClient';
import { Movie } from '@api/client/dist/movies/types';
import { TagsInput } from 'react-tag-input-component';
import toast from 'react-hot-toast';
// import { DatePicker } from '@mui/x-date-pickers';

import spinnerSvg from '../../../../../assets/svgs/spinner.svg'
import { useScrapeWebsiteMutation } from 'src/store/rtk-query/scraperApi';


interface AddMovieProps {
  callback?: Function | null;
  item?: Movie | null;
}

interface MovieDetails {
  title: string;
  description: string;
  trailerUrl: string;
  imageUrl: string;
  ageRating: string;
  genre: string;
  yearOfRelease: string;
  duration: string;
}

const AddMovieForm: React.FC<AddMovieProps> = ({ callback, item }) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [videoLink, setVideoLink] = useState<string>('');
  const [trailerLink, setTrailerLink] = useState<string>('');
  const [imageLink, setImageLink] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [ageRating, setAgeRating] = useState<string>('');
  const [duration, setDuration] = useState<string>('');
  const [genres, setGenres] = useState<string[]>([]);
  const [isSerie, setIsSerie] = useState<boolean>(false);
  const client = useApiClient();


  //url for pulling
  const [scrapeUrl, setScrapeUrl] = React.useState<string>('')
  const [isScraping, setIsScraping] = React.useState<boolean>(false)

  const [scrapeWebsiteApi, scrapeWebsiteState] = useScrapeWebsiteMutation()

  // determine if form is in update movie mode
  const isUpdateMode = item == undefined || item == null

  const reset = () => {
    setTitle('');
    setDescription('');
    setVideoLink('');
    setImageLink('');
    setYear('');
    setTrailerLink('');
    setGenres([]);
    setIsSerie(false);
    setAgeRating('')
    setDuration('')
  };

  const populate = (movie: Movie) => {
    setTitle(movie.title);
    setDescription(movie.desc);
    setVideoLink(movie.video);
    setImageLink(movie.img);
    setYear(movie.year);
    setTrailerLink(movie.trailer);
    setGenres(movie?.genre?.split(',') ?? []);
    setIsSerie(movie?.isSeries ?? false);
    setDuration(movie.duration)
    setAgeRating(movie.ageRating)
    // setName(tagGroup.name);
    // setDescription(tagGroup.description);
    // setTags(tagGroup?.tags ? [...tagGroup.tags] : []);
  };

  const save = useCallback(() => {
    const data = {
      title,
      desc: description,
      video: videoLink,
      img: imageLink,
      imgTitle: imageLink,
      trailer: trailerLink,
      year,
      genre: genres.join(','),
      isSeries: isSerie
    };
    toast.loading('saving...', { position: 'top-right' });
    client
      .createMovie(data)
      .then(() => {
        toast.dismiss();
        toast.success('saved', { position: 'top-right' });
        if (callback) callback();
      })
      .catch((err) => {
        toast.dismiss();
        toast.error('failed', { position: 'top-right' });
        console.error(err);
      });
  }, [
    title,
    description,
    videoLink,
    imageLink,
    year,
    trailerLink,
    genres,
    isSerie
  ]);

  const update = useCallback(() => {
    const data = {
      title,
      desc: description,
      video: videoLink,
      img: imageLink,
      imgTitle: imageLink,
      trailer: trailerLink,
      year,
      genre: genres.join(','),
      isSeries: isSerie
    };
    toast.loading('saving...', { position: 'top-right' });
    client
      .updateMovie(item._id, data)
      .then(() => {
        toast.dismiss();
        toast.success('saved', { position: 'top-right' });
        if (callback) callback();
      })
      .catch((err) => {
        toast.dismiss();
        toast.error('failed', { position: 'top-right' });
        console.error(err);
      });
  }, [
    title,
    description,
    videoLink,
    imageLink,
    year,
    trailerLink,
    genres,
    item,
    isSerie
  ]);

  useEffect(() => {
    if (item != null) {
      populate(item);
    }
  }, [item]);

  const onSubmitMovieScrapeUrl = async () => {
    if (!scrapeUrl) {
      toast.error('Please enter url', { position: 'top-right' })
      return;
    }

    const data = {
      url: scrapeUrl
    }


    const res = await scrapeWebsiteApi(data);
    let movieDetails = res?.data

    if (movieDetails?.title) {
      let newMovieDetails: MovieDetails = movieDetails

      setTitle(newMovieDetails.title);
      setDescription(newMovieDetails.description);
      setImageLink(newMovieDetails.imageUrl);
      setYear(newMovieDetails.yearOfRelease);
      setGenres(newMovieDetails?.genre);
      setScrapeUrl('')
      setAgeRating(newMovieDetails.ageRating)
      setDuration(newMovieDetails.duration)
    }

  }

  const renderAutoPopulateMovieSection = () => {
    return (
      <Accordion className='mb-5 border-b-2  py-2'>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          className='font-[600]'
        >
          Auto fill movie details?
        </AccordionSummary>
        <AccordionDetails>
          <div className='text-sm font-[600]'>
            Pull from <span className='underline text-black'><a target='_blank' href="https://reelgood.com/">https://reelgood.com/</a></span>
          </div>
          <TextField
            label="Movie Url"
            fullWidth
            focused
            value={scrapeUrl}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setScrapeUrl(event.target.value)
            }}
          />
          <div className='flex gap-2'>
            <Button variant="contained" onClick={onSubmitMovieScrapeUrl}>
              Pull
            </Button>
            {scrapeWebsiteState.isLoading ?
              <img src={spinnerSvg} alt="Spinner" />
              : undefined}
          </div>
        </AccordionDetails>
      </Accordion>
    )
  }

  return (
    <>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1 }
        }}
      >
        {isUpdateMode ? renderAutoPopulateMovieSection() : undefined}
        {imageLink ? (
          <Box
            sx={{
              width: '100%',
              height: '100px',
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <img src={imageLink} style={{ height: '100%' }} />
          </Box>
        ) : null}
        <TextField
          label="Title"
          fullWidth
          required
          value={title}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(event.target.value);
          }}
        />
        <TextField
          label="Description"
          fullWidth
          multiline
          value={description}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setDescription(event.target.value);
          }}
        />
        <TextField
          label="Trailer link"
          fullWidth
          value={trailerLink}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setTrailerLink(event.target.value);
          }}
        />
        <TextField
          label="Video link"
          fullWidth
          value={videoLink}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setVideoLink(event.target.value);
          }}
        />
        <TextField
          label="Image link"
          fullWidth
          value={imageLink}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setImageLink(event.target.value);
          }}
        />
        <TextField
          label="Year"
          fullWidth
          value={year}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setYear(event.target.value);
          }}
        />
        <TextField
          label="Age rating"
          fullWidth
          value={ageRating}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setAgeRating(event.target.value);
          }}
        />
        <TextField
          label="Duration"
          fullWidth
          value={duration}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setDuration(event.target.value);
          }}
        />
        {/*<DatePicker
          label={'"year"'}
          openTo="year"
          value={year}
          onChange={(date) => setYear(date)}
        />*/}
        <Box
          margin={1}
          sx={{
            '& .MuiTextField-root': { m: 1 }
          }}
        >
          <Typography>Genres</Typography>
          <TagsInput value={genres} onChange={(tags) => setGenres(tags)} />
        </Box>

        <Box
          margin={1}
          sx={{
            '& .MuiTextField-root': { m: 1 }
          }}
        >
          <Checkbox
            checked={isSerie}
            onClick={() => setIsSerie((cur) => !cur)}
          />{' '}
          <Typography component={'span'}>Is serie</Typography>
        </Box>

        <Box marginLeft={1} marginTop={3}>
          {item ? (
            <Button variant="contained" onClick={update}>
              Update
            </Button>
          ) : (
            <Button variant="contained" onClick={save}>
              Save
            </Button>
          )}
        </Box>
      </Box>
    </>
  );
};

export default AddMovieForm;
