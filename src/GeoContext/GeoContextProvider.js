import React, { useState } from 'react';
import environment from '../environment';
import GeoContext from './GeoContext';

export const GeoContextProvider = (props) => {

  const [mapCenter, setMapCenter] = useState(environment.mapapi.initialCenter);
  const [mapZoom, setMapZoom] = useState(environment.mapapi.zoom);
  const [geopoints,setGeopoints] = useState([]);
  const [feature,setFeature] = useState(false);
  const [featureCount,setFeatureCount] = useState(0);
  const now = new Date();
  const [startDate,setStartDate] = useState(new Date(now.setDate(now.getDate() - 1)));
  const [endDate,setEndDate] = useState(new Date());


  const collectData = data => {
    let points = [];
    let details = {};

    data.features.forEach( point => {
      details = {
        coords: point.geometry.coordinates,
        mag: point.properties.mag,
        place: point.properties.place,
        url: point.properties.detail,
      };
      points.push(details);
    });
    setMapZoom(environment.mapapi.initialZoom);
    setMapCenter(environment.mapapi.initialCenter);
    setGeopoints(points);
    setFeature(false);
    setFeatureCount(data.metadata.count || 0);
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

  const getDetail = url => {
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          setFeature(result);
          setMapZoom(environment.mapapi.featureZoom);
          setMapCenter({lat: result.geometry.coordinates[1],lng: result.geometry.coordinates[0]});
        },
        (error) => {
          console.log(error);
        }
      );
  }

  const PROVIDER_DATA = {
    getGeoData: getGeoData,
    getDetail: getDetail,
    setStartDate: setStartDate,
    setEndDate: setEndDate,
    startDate: startDate,
    endDate: endDate,
    geoData: {
      count: featureCount,
      points: geopoints,
      feature: feature
    },
    map: {
      key: environment.mapapi.key,
      initialCenter: environment.mapapi.initialCenter,
      center: mapCenter,
      zoom: mapZoom,
      options: environment.mapapi.options
    }
  };

  return(
    <GeoContext.Provider value={PROVIDER_DATA} >
     {props.children}
    </GeoContext.Provider >
  );
}
