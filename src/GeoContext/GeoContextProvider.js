import React, { useState } from 'react';
import environment from '../environment';
import GeoContext from './GeoContext';

export const GeoContextProvider = (props) => {

  const [geopoints,setGeopoints] = useState([]);
  const [magnitudes,setMagnitudes] = useState([]);
  const now = new Date();
  const [startDate,setStartDate] = useState(new Date(now.setDate(now.getDate() - 1)));
  const [endDate,setEndDate] = useState(new Date());


  const getGeopoints = data => {
    let points = geopoints.slice();
    let mags = magnitudes.slice();

    data.features.forEach( point => { 
      points.push(point.geometry.coordinates);
      mags.push(point.properties.mag);
    });
    setGeopoints(points);
    setMagnitudes(mags);
  }

  const getGeoData = (start,end) => {
    console.log('start,end: ',start,end);

    const FORMAT = 'geojson';
    const STARTDATE = `${start.getFullYear()}-${start.getMonth()}-${start.getDate()}`;
    const ENDTIME = `${end.getFullYear()}-${end.getMonth()}-${end.getDate()}`;
    const LON = '121.802730';
    const LAT = '12.151756';
    const RADIUS = '1000';
    const usgsurl = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=${FORMAT}&starttime=${STARTDATE}&endtime=${ENDTIME}&longitude=${LON}&latitude=${LAT}&maxradiuskm=${RADIUS}`;
    console.log(usgsurl);


    fetch(usgsurl)
      .then(res => res.json())
      .then(
        (result) => {
          getGeopoints(result);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  const PROVIDER_DATA = {
    getGeoData: getGeoData,
    setStartDate: setStartDate,
    setEndDate: setEndDate,
    startDate: startDate,
    endDate: endDate,
    geoData: {
      points: geopoints,
      magnitudes: magnitudes
    },
    map: {
      key: environment.mapapi.key,
      lng: environment.mapapi.lng,
      lat: environment.mapapi.lat,
      zoom: environment.mapapi.zoom,
      options: environment.mapapi.options
    }
  };

  return(
    <GeoContext.Provider value={PROVIDER_DATA} >
     {props.children}
    </GeoContext.Provider >
  );
}
