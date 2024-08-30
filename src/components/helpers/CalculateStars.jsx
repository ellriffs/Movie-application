import { StarOutline, StarHalf, Star } from "@mui/icons-material";


export const CalculateRating = ({rating}) => {
    const stars = [];
    const votes = rating;
    const fullStars = Math.floor(votes);
    for (let i = 1; i <= fullStars; i++) {
      stars.push(<Star />);
    }
    if (votes < 5) {
      const partialStars = Math.round(votes - fullStars)
      partialStars ? stars.push(<StarHalf />) : null;
    }

    const emptyStars = 5 - stars.length;

    for (let i = 1; i <= emptyStars; i++) {
      stars.push(<StarOutline />);
    }

    return stars;
  };