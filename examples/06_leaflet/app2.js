// TILES: http://alexurquhart.github.io/free-tiles/
// https://leaflet-extras.github.io/leaflet-providers/preview/
// GEOJSON: https://datahub.io/core/geo-countries#javascript
// DATA: https://population.un.org/wpp/Download/Standard/CSV/ 
// https://datahub.io/JohnSnowLabs/population-figures-by-country

(async () => {

    const state = {
      'category': ''
    }

    const map = L.map('map', { preferCanvas: true, maxZoom: 13, minZoom: 2 }).setView([0,0], 2)
    
    // fetch data sources
    const geojson = await fetch('./countries.geojson').then((res) => res.json())
    const countries = geojson.features.map(feature => feature.properties.ISO_A3)
    const populationCSV = await d3.csv('./population-figures-by-country-csv_csv.csv')

    const population = d3.rollup(populationCSV.filter(row => countries.includes(row['Country_Code'])), v => parseFloat(v[0]['Year_2015']), d => d['Country_Code'])

    const maxPop = d3.max(population.values())
    const medianPop = d3.median(population.values())
    const minPop = d3.min(population.values())

    console.log('population')
    console.log(population)

    console.log(Array.from(population).filter(([a,b])=>b > 1300000000))
    console.log(maxPop)
    console.log(minPop)


L.tileLayer(
//   'http://services.arcgisonline.com/arcgis/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
'https://map1.vis.earthdata.nasa.gov/wmts-webmerc/BlueMarble_ShadedRelief_Bathymetry/default/GoogleMapsCompatible_Level8/{z}/{y}/{x}.jpg',
  {
    attribution: '',
    noWrap: true
  }
).addTo(map)

// let circle = L.circle([40.7128, -74.006], {
//   color: 'red',
//   fillColor: '#f03',
//   fillOpacity: 0.5,
//   radius: 500,
// }).addTo(map)


    const color_scale = d3
      .scaleLinear()
      .domain([minPop, medianPop, maxPop])
      .range(['green', 'white', 'purple'])

    window.colorfunc = color_scale
    
    geo_layer = L.geoJSON(geojson, {
        style: function(feature) {
            let name = feature.properties.ADMIN
            let code = feature.properties.ISO_A3
            let pop = population.get(code)
            let fill = color_scale(pop)
            
            return {
                stroke: true,
                weight: 1,
                color: fill,
                opacity: population.get(code) === undefined ? 0.0 : 0.8,
                fillColor: fill,
                fillOpacity: population.get(code) === undefined ? 0.0 : 0.5,
            }
        },
        onEachFeature: function (feature, layer) {
            let name = feature.properties.ADMIN
            let code = feature.properties.ISO_A3
            layer.bindPopup(name + ': ' + population.get(code))
        }
    })

    geo_layer.addTo(map)

    console.log(geo_layer)
})()