import PropTypes from 'prop-types';
import Carousel from 'react-material-ui-carousel';

import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';

import ItemRender from './CarouselImage';

export default function EventCarousel({ imgData }) {
  // const items = [
  //   {
  //     id: 1,
  //     title: 'First Slide',

  //     imageUrl: 'https://via.placeholder.com/1200x300',
  //   },
  //   {
  //     id: 2,
  //     title: 'Second Slide',

  //     imageUrl: 'https://via.placeholder.com/1200x300',
  //   },
  //   {
  //     id: 3,
  //     title: 'Third Slide',

  //     imageUrl: 'https://via.placeholder.com/1200x300',
  //   },
  // ];

  return (
    <Grid container>
      <Grid item xs={12}>
        {imgData?.length !== 0 ? (
          <Carousel>
            {imgData?.map((item) => (
              <ItemRender key={item} imgName={item} />
            ))}
          </Carousel>
        ) : (
          <Typography>There are no cover images</Typography>
        )}
      </Grid>
    </Grid>
  );
}

EventCarousel.propTypes = {
  imgData: PropTypes.array,
};
