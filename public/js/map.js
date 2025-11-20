
maptilersdk.config.apiKey = mapApi;

const map = new maptilersdk.Map({
  container: 'map', // container's id or the HTML element to render the map
  style: maptilersdk.MapStyle.STREET,
  center: listing.geometry.coordinates, // starting position [lng, lat]
  zoom: 14,// starting zoom

});

// console.log(coordinates); 


const marker = new maptilersdk.Marker({color: "red"})
  .setLngLat(listing.geometry.coordinates)
  .setPopup(new maptilersdk.Popup({offset: 25})
  .setHTML(`<h4>${listing.title}</h4><p>Exact Location Will Be Provided After Booking!</p>`))
  .addTo(map); 