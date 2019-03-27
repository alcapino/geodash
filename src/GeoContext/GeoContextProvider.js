import React, { useState } from 'react';
import environment from '../environment';
import GeoContext from './GeoContext';

export const GeoContextProvider = (props) => {

  const [geopoints,setGeopoints] = useState([]);
  const [magnitudes,setMagnitudes] = useState([]);
  const [events,setEvents] = useState([]);
  const [eventCount,setEventCount] = useState(0);
  const now = new Date();
  const [startDate,setStartDate] = useState(new Date(now.setDate(now.getDate() - 1)));
  const [endDate,setEndDate] = useState(new Date());


  const collectData = data => {
    let points = [];
    let mags = [];
    let geoEvents = [];

    data.features.forEach( point => { 
      points.push(point.geometry.coordinates);
      mags.push(point.properties.mag);
      geoEvents.push({
        id: point.id,
        place: point.properties.place,
        mag: point.properties.mag
      });
    });
    setGeopoints(points);
    setMagnitudes(mags);
    setEvents(geoEvents);
    setEventCount(data.metadata.count || 0);
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
          collectData(result);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  const showDetail = id => {
    console.log('id',id);
  }

  const PROVIDER_DATA = {
    getGeoData: getGeoData,
    showDetail: showDetail,
    setStartDate: setStartDate,
    setEndDate: setEndDate,
    startDate: startDate,
    endDate: endDate,
    geoData: {
      count: eventCount,
      events:events,
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
