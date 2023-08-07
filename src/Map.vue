<template>
    <div class="container">
        <div id="mapDiv"></div> <!-- create a div element with id "map" to hold the map -->
        <div id="mouse-position"></div>
        <button id="extentButton" @click="extenttest">Extent</button>
    </div>
  </template>
  
<script>
import 'ol/ol.css'; // import OpenLayers CSS
import Map from 'ol/Map'; // import Map class from OpenLayers
import View from 'ol/View'; // import View class from OpenLayers
import TileLayer from 'ol/layer/WebGLTile.js'; // import TileLayer class from OpenLayers
import OSM from 'ol/source/OSM'; // import OSM class from OpenLayers
import MousePosition from 'ol/control/MousePosition.js';
import {createStringXY} from 'ol/coordinate.js';
import {defaults as defaultControls} from 'ol/control.js';
import {transform,transformExtent} from 'ol/proj.js';

var map;
export default {
name: 'App',
mounted() {

    // const source = new GeoTIFF({
    //     sources: [
    //         {
    //         //url: 'http://localhost:8070/test/geotrellis/list.tif',
    //         url: 'http://localhost:8070/COG/t3.tif',
    //         },
    //     ],
    //     });
    
    // const layer = new TileLayer({
    //     source: source
    // });

    const mousePositionControl = new MousePosition({
        coordinateFormat: createStringXY(6),
        projection: 'EPSG:4326',
        className: 'custom-mouse-position',
        target: document.getElementById('mouse-position'),
    });

    map = new Map({ // create a new Map instance
        controls: defaultControls().extend([mousePositionControl]),
        target: 'mapDiv', // set the target element to the "map" div
        layers: [
            new TileLayer({
                source: new OSM()
            })
        ],
        view: new View({
            center: transform([114, 30], 'EPSG:4326', 'EPSG:3857'),
            zoom: 10,
        })
    });
},
methods:{
    extenttest(){
        var extent = map.getView().calculateExtent(map.getSize())
        console.log(transformExtent(extent, 'EPSG:3857', 'EPSG:4326'))
        console.log(map.getView().getProjection().getCode())
    }
}
};
</script>

<style scoped>
.container {
  position: relative;
  width: 100%;
    height: 100%;
}

#mapDiv{
    position: absolute;
    width: 100%;
    height: 100%;
}

#mouse-position{
    position: absolute;
    bottom: 0; /* Position div2 at the bottom */
    left: 20px; /* Position div2 at the left */
    z-index: 1;
}

#extentButton{
    position: absolute;
    top:15px;
    right: 20px;
    z-index: 1;
}
</style>


  