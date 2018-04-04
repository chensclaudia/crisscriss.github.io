var map = L.map('map').setView([37.8, -96], 4);

L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
  subdomains: 'abcd',
  maxZoom: 5,
  minZoom: 3
}).addTo(map);

// control that shows state info on hover
var info = L.control();
info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
};
info.update = function (props) {
    this._div.innerHTML = '<h4>Fatal Police Shootings in the US</h4>' +  (props ?
        '<b>' + props.name + '</b><br />' + props.density + ' people killed by police</sup>'
        : 'Hover over a state');
};
info.addTo(map);

function getColor(d) {
  return d > 400 ? '#330001'
     : d > 200  ? '#4C0102'
     : d > 100  ? '#7E0209'
     : d > 70   ? '#B1060D'
     : d > 60   ? '#E40D18'
     : d > 50   ? '#FC202A'
     : d > 40   ? '#FC4F52'
     : d > 30   ? '#FD8182'
     : d > 20   ? '#FDB3B4'
     : d > 10   ? '#FEE6E7'
     : '#F9F2F3';
}

function style(feature) {
  return {
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: '1',
    fillOpacity: 0.7,
    fillColor: getColor(feature.properties.density)
  };
}

function highlightFeature(e) {
  var layer = e.target;

  layer.setStyle({
    weight: 5,
    color: '#666',
    dashArray: '',
    fillOpacity: 0.7
  });

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }

  info.update(layer.feature.properties);
}

var geojson;

function resetHighlight(e) {
  geojson.resetStyle(e.target);
  info.update();
}

function zoomToFeature(e,layer) {
  map.fitBounds(e.target.getBounds());
  var layer = e.target;
  // console.log(layer.feature.properties.name);
  state = layer.feature.properties.name;
  updateCards(state);
}

function getState(e){
  var layer = e.target;
  // console.log(layer.feature.properties.name);
  state = layer.feature.properties.name;
  updateCards(state);
}

function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    click: zoomToFeature,
    click: getState
  });
}

geojson = L.geoJson(statesData, {
  style: style,
  onEachFeature: onEachFeature
}).addTo(map);

map.attributionControl.addAttribution('Fatal Police Shootings in the US &copy; <a href="https://github.com/washingtonpost/data-police-shootings">The Washington Post</a>');

// Map legend
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'info legend'),
      grades = [0, 10, 20, 30, 40, 50, 60, 70,100, 200, 400],
      labels = [],
      from, to;
  for (var i = 0; i < grades.length; i++) {
    from = grades[i];
    to = grades[i + 1];

    labels.push(
      '<i style="background:' + getColor(from + 1) + '"></i> ' +
      from + (to ? '&ndash;' + to : '+')
    );
  }
  div.innerHTML = labels.join('<br>');
  return div;
};

legend.addTo(map);
