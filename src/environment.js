
const environment = {
  mapapi: {
    key: '',
    initialCenter: {
      lng: 121.7740173,
      lat: 12.8797207
    },
    initialZoom: 6,
    featureZoom: 11,
    options: {
      mapTypeId: 'terrain',
      draggable:         true,
      fullscreenControl: false,
      mapTypeControl:    false,
      streetViewControl: false,
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