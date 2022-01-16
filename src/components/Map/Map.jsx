/** @format */
import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { Rating } from '@mui/material';
import mapStyles from './mapStyle';
import useStyles from './style';

const Map = ({ setCoordinates, setBounds, coordinates, places, setChildClicked, weatherData }) => {
  const classes = useStyles();
  // false, when device screen is larger than 600px
  const isDesktop = useMediaQuery('(min-width:600px)');

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{ disableDefaultUI: true, zoomControl: true, styles: mapStyles }}
        onChange={e => {
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={child => {
          setChildClicked(child);
        }}>
        {places.length &&
          places.map((place, index) => {
            return (
              <div
                className={classes.markerContainer}
                lat={Number(place.latitude)}
                lng={Number(place.longitude)}
                key={index}>
                {!isDesktop ? (
                  <LocationOnOutlinedIcon color='primary' fontSize='large' />
                ) : (
                  <Paper elevation={3} className={classes.paper}>
                    <Typography className={classes.typography} variant='subtitle2' gutterBottom>
                      {place.name}
                    </Typography>
                    <img
                      className={classes.pointer}
                      src={
                        place.photo
                          ? place.photo.images.large.url
                          : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'
                      }
                      alt={place.name ? place.name : 'No image'}
                    />
                    <Rating size='small' value={Number(place.rating)} readOnly name='read-only' />
                  </Paper>
                )}
              </div>
            );
          })}
        {weatherData?.list?.length &&
          weatherData.list.map((data, i) => (
            <div key={i} lat={data.coord.lat} lng={data.coord.lon}>
              <img
                height='70px'
                src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                alt='weather'
              />
            </div>
          ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
