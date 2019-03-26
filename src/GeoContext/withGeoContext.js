import React from 'react';
import GeoContext from '../GeoContext/GeoContext';


export const withGeoContext = Component => (
  props => (
      <GeoContext.Consumer>
      {context => (
        <Component {...props} {...context} />
      )}
      </GeoContext.Consumer>
  )
)
