import React, {useEffect} from 'react';

import './Dashboard.css';
import DashMap from '../DashMap';
import DatePicker from 'react-date-picker';
import {withGeoContext} from '../../GeoContext/withGeoContext';

export const Dashboard = props => {
  useEffect(()=>{
    props.getGeoData(props.startDate,props.endDate);
  },[props.startDate,props.endDate]);

  const events = props.geoData.events.map(
    (event, i) => <li key={i} onClick={() => props.showDetail(event.id)} >{event.place}</li>
  );

  return (
    <div className="dash">
      <div className="dash-sidebar">
        <div className="dash-box filter">
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
        <div className="dash-box detail">
          <h3>Details: </h3>
          <ul>
            alekfnj
          </ul>
        </div>
        <div className="dash-box events">
          <h3>Activities ({props.geoData.count})</h3>
          <ul>
            {events}
          </ul>
        </div>
      </div>
      <div className="dash-map">
        <DashMap 
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${props.map.key}&v=3.exp&libraries=geometry,drawing,places`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `700px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    </div>
  );
}

export default withGeoContext(Dashboard);
