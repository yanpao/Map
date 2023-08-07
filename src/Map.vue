<template>
    <div class="container">
        <div id="mapDiv"></div> <!-- create a div element with id "map" to hold the map -->
        <div id="mouse-position"></div>
        <button id="extentButton" @click="extenttest">Extent</button>
        <span ></span>
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
import {ScaleLine,ZoomToExtent,defaults as defaultControls} from 'ol/control.js';
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

    const scaleControl = new ScaleLine({
        units: 'metric',
        bar: true,
        steps: 1,
        text: true,
        minWidth: 140,
    });

    map = new Map({ // create a new Map instance
        controls: defaultControls().extend([
            mousePositionControl,
            scaleControl,
            new ZoomToExtent({
                extent: transformExtent([
                    113.67358849449846,
                    30.186913166337035,
                    115.06549936023082,
                    30.792250483764136
                ], 'EPSG:4326','EPSG:3857'),
                label:''
            })
        ]),
        target: 'mapDiv', // set the target element to the "map" div
        layers: [
            new TileLayer({
                source: new OSM()
            })
        ],
        view: new View({
            center: transform([114, 30], 'EPSG:4326', 'EPSG:3857'),
            zoom: 4,
        })
    });
},
methods:{
    extenttest(){
        var extent = map.getView().calculateExtent(map.getSize())
        console.log(transformExtent(extent, 'EPSG:3857', 'EPSG:4326'))
        console.log(map.getView().getProjection().getCode())
        console.log(map.getView().getResolution())
    }
}
};
</script>

<style scoped>
.container {
    position: relative;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    display: flex;
}

#mapDiv{
    position: absolute;
    width: 100%;
    height: 100%;
}

#mouse-position{
    position: absolute;
    bottom: 0; /* Position div2 at the bottom */
    /*left: 20px; /* Position div2 at the left */
    z-index: 1;
    cursor: pointer;
    background-color: rgb(249, 244, 237);
}

#extentButton{
    position: absolute;
    top:15px;
    right: 20px;
    z-index: 1;
}
</style>


  