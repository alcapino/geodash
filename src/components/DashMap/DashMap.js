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
    (point, i) => <Marker key={i} position={{lat: point.coords[1],lng: point.coords[0]}} onClick={() => props.getDetail(point.url)}/>
  );
  return(
    <GoogleMap
      defaultZoom={props.map.zoom}
      defaultCenter={props.map.initialCenter}
      zoom={props.map.zoom}
      center={props.map.center}
      defaultOptions={props.map.options}
    >
      {markers}
    </GoogleMap>
  );
}));

export default withGeoContext(DashMap);
