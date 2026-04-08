document.addEventListener("DOMContentLoaded", function () {
  const { coordinates, mapToken, title, location } = window.mapData;

  console.log("COORD:", coordinates);

  maptilersdk.config.apiKey = mapToken;

  const map = new maptilersdk.Map({
    container: 'map',
    style: maptilersdk.MapStyle.STREETS,
    center: coordinates,
    zoom: 12,
  })
      new maptilersdk.Marker({ color: 'black' })
      .setLngLat(coordinates)
      .addTo(map);
  });
