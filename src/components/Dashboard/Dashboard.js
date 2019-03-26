import React, {useEffect, useState} from 'react';

import './Dashboard.css';
import DashMap from '../DashMap';
import DatePicker from 'react-date-picker';
import {withGeoContext} from '../../GeoContext/withGeoContext';

export const Dashboard = props => {
  const handleChange = () => {};

  useEffect(()=>{
    props.getGeoData(props.startDate,props.endDate);
  },[props.startDate,props.endDate]);

  return (
    <div className="dash">
      <div className="dash-filter">
        Start: <DatePicker
          clearIcon={null}
          value={props.startDate}
          onChange={(start) => props.setStartDate(start)}
        />
        End: <DatePicker
          clearIcon={null}
          value={props.endDate}
          onChange={(end) => props.setEndDate(end)}
        />
      </div>
      <div className="dash-map">
        <DashMap 
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=<key>&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `700px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    </div>
  );
}

export default withGeoContext(Dashboard);
