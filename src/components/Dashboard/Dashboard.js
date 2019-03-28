import React, {useEffect} from 'react';

import './Dashboard.css';
import DashMap from '../DashMap';
import DatePicker from 'react-date-picker';
import {withGeoContext} from '../../GeoContext/withGeoContext';

export const Dashboard = props => {
  useEffect(()=>{
    props.getGeoData(props.startDate,props.endDate);
  },[props.startDate,props.endDate]);

  const features = props.geoData.points.map(
    (feature, i) => <li key={i} onClick={() => props.getDetail(feature.url)} >{feature.place}</li>
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
        { (props.geoData.feature !== false) && 
          (<div className="dash-box detail">
            <h3 >Details</h3>
            <h5>Location:</h5> {props.geoData.feature.properties.place}
            <h5>Magnitude:</h5> {props.geoData.feature.properties.mag}
            <h5>Time occurred:</h5> {props.geoData.feature.properties.time}
            <h5>Updated:</h5> {props.geoData.feature.properties.updated}

          </div>)
        }
        <div className="dash-box features">
          <h3>Activities ({props.geoData.count})</h3>
          { props.geoData.count > 0 &&
            <ul> {features} </ul>
          }
        </div>
      </div>
      <div className="dash-map">
        <DashMap 
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${props.map.key}&v=3.exp&libraries=geometry,drawing,places`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    </div>
  );
}

export default withGeoContext(Dashboard);
