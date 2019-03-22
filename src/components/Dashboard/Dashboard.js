import React from 'react';
import './Dashboard.css';
import DashMap from '../DashMap';

export const Dashboard = props => {
  const SIZE = 5;
  const WIN_SIZE = 3;

  return (
    <div className="game">
      <div className="dash-map">
        <DashMap 
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyA4ruZs7NjExXXmHxppui48yBt2gNVLbO0&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
      <div className="game-info">
        <div>{/* status */}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  );
}

export default Dashboard;
