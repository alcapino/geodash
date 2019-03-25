import React, {useEffect, useState} from 'react';

import './Dashboard.css';
import DashMap from '../DashMap';
import {withGeoContext} from '../../GeoContext/withGeoContext';

export const Dashboard = props => {
  const SIZE = 5;
  const WIN_SIZE = 3;

  useEffect(()=>{
    props.getGeoData();
  },[]);

  return (
    <div className="dash">
      <div className="dash-map">
        <DashMap 
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=<KEY>&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `700px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    </div>
  );
}

export default withGeoContext(Dashboard);
