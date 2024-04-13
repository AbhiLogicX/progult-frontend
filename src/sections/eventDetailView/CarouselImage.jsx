import PropTypes from 'prop-types';

import { Grid } from '@mui/material';

import properties from 'src/config/properties';

export default function ItemRender({ imgName }) {
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={10}>
        <img
          src={`${properties.BASE_IMAGE_URL}${imgName}`}
          alt="Cover Images"
          style={{ width: 1200, height: 300 }}
        />
        {/* <Typography variant="h5" align="center" gutterBottom>
            {item.title}
          </Typography> */}
      </Grid>
    </Grid>
  );
}

ItemRender.propTypes = {
  imgName: PropTypes.string,
};
