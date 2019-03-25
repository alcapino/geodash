import React from 'react';
import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs
} from "react-google-maps";
import {withGeoContext} from '../../GeoContext/withGeoContext';

const DashMap = withScriptjs(withGoogleMap(props =>{
  const markers = props.contextData.geopoints.map(
    (point, i) => <Marker key={i} position={{lat: point[1],lng: point[0]}} />
  );
  return(
    <GoogleMap
      defaultZoom={6}
      defaultCenter={{ lat: 12.8797207, lng: 121.7740173 }}
      height={'100%'}
    >
      {markers}
    </GoogleMap>
  );
}));

export default withGeoContext(DashMap);
