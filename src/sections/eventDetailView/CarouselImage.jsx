import PropTypes from 'prop-types';

import { Grid } from '@mui/material';

import properties from 'src/config/properties';

export default function ItemRender({ imgName }) {
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12}>
        <img
          src={`${properties.BASE_BUSSINESS_IMAGE_URL}${imgName}`}
          alt="Cover Images"
          style={{
            width: '100%',
            aspectRatio: 4 / 1,
          }}
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
