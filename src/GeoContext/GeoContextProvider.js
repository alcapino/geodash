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
    const STARTTIME = `${start.getFullYear()}-${start.getMonth()}-${start.getDate()}`;
    const ENDTIME = `${end.getFullYear()}-${end.getMonth()}-${end.getDate()}`;

    let usgsurl = new URL(environment.usgsapi.url);
    let params = environment.usgsapi.params;
    Object.assign(params, {
      starttime: STARTTIME,
      endtime: ENDTIME,
    });
    Object.keys(params).forEach(key => usgsurl.searchParams.append(key, params[key]));

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
