import React from 'react';
import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs
} from "react-google-maps";
import {withGeoContext} from '../../GeoContext/withGeoContext';

const DashMap = withScriptjs(withGoogleMap(props =>{
  const markers = props.geoData.points.map(
    (point, i) => <Marker key={i} position={{lat: point[1],lng: point[0]}} />
  );
  return(
    <GoogleMap
      defaultZoom={props.map.zoom}
      defaultCenter={{ lat: props.map.lat, lng: props.map.lng }}
      height={'100%'}
      defaultOptions={props.map.options}
    >
      {markers}
    </GoogleMap>
  );
}));

export default withGeoContext(DashMap);
