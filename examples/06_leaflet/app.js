(async () => {

    const Leaflet = L;

    const map = Leaflet.map('map', { preferCanvas: true, maxZoom: 13, minZoom: 2 }).setView([0,0], 2)
   
    const tile_layer = Leaflet.tileLayer(
    //   'http://services.arcgisonline.com/arcgis/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
    'https://map1.vis.earthdata.nasa.gov/wmts-webmerc/BlueMarble_ShadedRelief_Bathymetry/default/GoogleMapsCompatible_Level8/{z}/{y}/{x}.jpg',
    {
        attribution: '',
        noWrap: true
    }
    ).addTo(map)

    const geojson = await d3.json('./countries.geojson')

    console.log(geojson)

    const geo_layer = Leaflet.geoJSON(geojson, {
        style: function (feature){
            let name = feature.properties.ADMIN

            let color = Math.random() > 0.5 ? 'red' : 'blue'

            return {
                color: color,
                opacity: 0.4,
                fillColor: color,
                fillOpacity: 0.2
            }
        }
    })

    geo_layer.addTo(map)

    console.log(geo_layer)
})()