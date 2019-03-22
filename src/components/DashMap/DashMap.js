import React from 'react';
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  withScriptjs
} from "react-google-maps";

const DashMap = withScriptjs(withGoogleMap(props =>
  <GoogleMap
    defaultZoom={5}
    defaultCenter={{ lat: 12.8797207, lng: 121.7740173 }}
    height={'100%'}
  >
  </GoogleMap>
));


export default DashMap;