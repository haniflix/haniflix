import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import {
  PlayArrow,
  Add,
  ThumbUpAltOutlined,
  ThumbDownOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function SearchListItem({ movie }) {
  // Trim the description to a maximum of 100 characters
  const trimmedDesc =
    movie?.desc && movie.desc.length > 80
      ? `${movie.desc.slice(0, 80)}...`
      : movie?.desc;

  return (
    <Card>
      <Link to={`/watch/${movie._id}`}>
        <CardMedia
          component="img"
          alt={movie?.title}
          height="200"
          image={movie?.img}
          title={movie?.title}
        />
      </Link>
      <CardContent>
        <Typography variant="h6" component="div">
          {movie?.title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {movie?.duration} | +{movie?.limit} | {movie?.year}
        </Typography>
        <Typography variant="body2" paragraph>
          {trimmedDesc}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Genre: {movie?.genre}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton aria-label="play">
          <PlayArrow />
        </IconButton>
        <IconButton aria-label="add">
          <Add />
        </IconButton>
        <IconButton aria-label="thumb up">
          <ThumbUpAltOutlined />
        </IconButton>
        <IconButton aria-label="thumb down">
          <ThumbDownOutlined />
        </IconButton>
      </CardActions>
    </Card>
  );
}
