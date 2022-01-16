/** @format */
import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
import { ThemeProvider } from '@mui/material/styles';
import { getPlacesData, getWeatherData } from './api';

function App() {
  const theme = useTheme();
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('');

  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState(null);
  // const [bounds, setBounds] = useState({});

  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [weatherData, setWeatherData] = useState([]);

  const [autocomplete, setAutocomplete] = useState(null);
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // only happen at the start
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoordinates({ lat: latitude, lng: longitude });
    });
  }, []);

  useEffect(() => {
    const filtered = places.filter(place => Number(place.rating) > rating);
    setFilteredPlaces(filtered);
  }, [rating]);

  useEffect(() => {
    // if (bounds.sw && bounds.ne)
    if (bounds) {
      setIsLoading(true);

      getWeatherData(coordinates.lat, coordinates.lng).then(data => setWeatherData(data));

      getPlacesData(type, bounds.sw, bounds.ne).then(data => {
        // console.log('data', data);
        setPlaces(data?.filter(place => place.name && place.num_reviews > 0));
        setFilteredPlaces([]);
        setRating('');
        setIsLoading(false);
      });
    }
  }, [bounds, type]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header
        setCoordinates={setCoordinates}
        autocomplete={autocomplete}
        setAutocomplete={setAutocomplete}
      />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4} sm={6}>
          <List
            places={filteredPlaces.length ? filteredPlaces : places}
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8} sm={6}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={filteredPlaces.length ? filteredPlaces : places}
            setChildClicked={setChildClicked}
            weatherData={weatherData}
          />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
