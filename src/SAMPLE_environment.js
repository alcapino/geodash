// src/environment.js

const environment = {
  mapapi: {
    key: 'string',
    lng: 'int',
    lat: 'int',
    zoom: 'int',
    options: {
      mapTypeControl: 'boolean',
      mapTypeId: 'const'
    }
  },
  usgsapi: {
    url: 'https://earthquake.usgs.gov/fdsnws/event/1/query',
    params: {
      format: 'geojson',
      maxradiuskm: 1000,
      longitude: 121.7740173,
      latitude: 12.8797207
    }
  }
};

export default environment;