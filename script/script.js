// This array contains the coordinates for all bus stops between MIT and Harvard
const busStops = [
    [-71.093729, 42.359244],
    [-71.094915, 42.360175],
    [-71.0958, 42.360698],
    [-71.099558, 42.362953],
    [-71.103476, 42.365248],
    [-71.106067, 42.366806],
    [-71.108717, 42.368355],
    [-71.110799, 42.369192],
    [-71.113095, 42.370218],
    [-71.115476, 42.372085],
    [-71.117585, 42.373016],
    [-71.118625, 42.374863],
  ];
  
  // TODO: add your own access token
  mapboxgl.accessToken =
    'pk.eyJ1IjoidGVzdHVzZXIxMDAwIiwiYSI6ImNraDkzZ2pkMzAzMHoycnBmMXpvZ3UwZnMifQ.jAE4YsPeAJv50VK92NSpOQ';
  
  // TODO: create the map object using mapboxgl.map() function
  let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-71.104081, 42.365554],
    zoom: 14,
  });
  
  // TODO: add a marker to the map
  let marker = new mapboxgl.Marker().setLngLat([-71.092761, 42.357575]).addTo(map);
  
  // counter here represents the index of the current bus stop
  let counter = 0;
  function move() {
    // TODO: move the marker on the map every 1000ms. Use the function marker.setLngLat() to update the marker coordinates
    // Use counter to access bus stops in the array busStops
  
    setTimeout(() => {
      if (counter >= busStops.length) return;
      marker.setLngLat(busStops[counter]);
      counter++;
      move();
    }, 1000);
  }
  
  // Do not edit code past this point
  if (typeof module !== 'undefined') {
    module.exports = { move, counter, marker, busStops };
  }
mapboxgl.accessToken = 'pk.eyJ1Ijoicnlhbm5hbGJhY2giLCJhIjoiY2w3ejZjYjhwMTZvNjNubjMwaHAxeXpnaSJ9.SpNG94XxoZOycNIYcr2GKg';
var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-87.6994,41.8171],
        zoom: 11
});
let markers = [];
async function run(){
    // get bus data    
	const locations = await getBusLocations();
	removeMarkers();
	addMarkers(locations);

	// timer
	setTimeout(run, 15000);
}
function addMarkers(locs){
	for(let i=0;i<locs.length;i++){
		let marker = new mapboxgl.Marker()
  			.setLngLat(locs[i])
  			.addTo(map);
		markers.push(marker);
	}
}
function removeMarkers(){
	for(let i=0;i<markers.length;i++){
	markers[i].remove();
	}
	markers=[];
}

// Request bus data from CTA
async function getBusLocations(){
    const url = 'https://www.ctabustracker.com/bustime/api/v3/getvehicles?key=wZHcXx3PsREP5QqHSbjYQ2sLi&format=json&rt=62,62H,63,63W';
   // const url = 'https://www.ctabustracker.com/bustime/api/v3/getvehicles?key=89dj2he89d8j3j3ksjhdue93&format=json&rt=62,62H,63,63W';
	
	const updatedURL = `https://corsanywhere.herokuapp.com/${url}`;
    let vehicles;
	const response = await fetch(updatedURL)
  		.then(function(response) {
    	return response.json();
  		}).then(function(data) {
		vehicles = data['bustime-response'].vehicle;
	});	
	
	let locations = [];
	for(let i=0;i<vehicles.length;i++){
		locations.push([vehicles[i].lon,vehicles[i].lat]);
    }
	
	return locations;
}

run();