/** @format */

import React from 'react';
import {
  box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
  Box,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import { Rating } from '@mui/material';
import useStyles from './style';

const PlaceDetails = ({ place, selected, refProps }) => {
  const classes = useStyles();
  console.log('place', place);

  if (selected) refProps?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <Card elevation={6}>
      <CardMedia
        component='img'
        style={{ height: 350 }}
        image={place.photo ? place.photo.images.large.url : ''}
        title={place.name}
      />
      <CardContent>
        <Typography variant='h5'>{place.name}</Typography>
        <Box display='flex' justifyContent='space-between'>
          <Rating value={Number(place.rating)} readOnly />
          <Typography gutterBottom variant='subtitle1'>
            out of {place.num_reviews}
          </Typography>
        </Box>
        <Box display='flex' justifyContent='space-between'>
          <Typography variant='subtitle1'>Price</Typography>
          <Typography gutterBottom variant='subtitle1'>
            {place.price_level}
          </Typography>
        </Box>
        <Box display='flex' justifyContent='space-between'>
          <Typography variant='subtitle1'>Ranking</Typography>
          <Typography gutterBottom variant='subtitle1'>
            {place.ranking}
          </Typography>
        </Box>
        {place?.awards?.map((award, index) => (
          <Box display='flex' key={index} my={1} justifyContent='space-between' alignItems='center'>
            <img src={award.images.small} alt={award.display_name} />
            <Typography variant='subtitle2' color='textSecondary'>
              {award.display_name}
            </Typography>
          </Box>
        ))}
        {place?.cuisine?.map(({ name }, index) => (
          <Chip key={index} size='small' label={name} className={classes.chip} />
        ))}
        {place?.address && (
          <Typography
            gutterBottom
            variant='subtitle2'
            color='textSecondary'
            className={classes.subtitle}>
            <LocationOnIcon />
            {place.address}
          </Typography>
        )}
        {place?.phone && (
          <Typography
            gutterBottom
            variant='subtitle2'
            color='textSecondary'
            className={classes.spacing}>
            <PhoneIcon />
            {place.phone}
          </Typography>
        )}
        <CardActions>
          <Button size='small' color='primary' onClick={() => window.open(place.web_url, '_blank')}>
            前往評論網站
          </Button>
          <Button size='small' color='primary' onClick={() => window.open(place.website, '_blank')}>
            前往該網站
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default PlaceDetails;
