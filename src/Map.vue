<template>
    <div class="container">
        <Menubar :model="items" style="height: 30px; width:100%;background-color:hsla(0, 92%, 48%, 0);" >
            <template #start>
                <img alt="logo" src="./assets/home.svg" height="30" class="mr-2" />
            </template>
            <template #end>
                <InputText placeholder="Search" type="text" />
            </template>
        </Menubar>

        <Splitter style="height: 100%; width: 100%;">
            <SplitterPanel class="flex align-items-center justify-content-center" :size="15" v-show="true"> Panel 1 </SplitterPanel>
            <SplitterPanel :size="85">
                <Splitter>
                    <SplitterPanel class="flex align-items-center justify-content-center" :size="80">
                        <div id="mapDiv"></div>
                        <div id="mouse-position"></div>
                    <Button id="extentButton" label="Extent" @click="extenttest"/>
                    </SplitterPanel>
                    <SplitterPanel class="flex align-items-center justify-content-center" :size="20" v-show="false"> Panel 3 </SplitterPanel>
                </Splitter>
            </SplitterPanel>
            
            <!--  -->
        </Splitter>
    </div>
  </template>
  
<script>
import 'ol/ol.css'; // import OpenLayers CSS
import Map from 'ol/Map'; // import Map class from OpenLayers
import View from 'ol/View'; // import View class from OpenLayers
import TileLayer from 'ol/layer/WebGLTile.js'; // import TileLayer class from OpenLayers
import OSM from 'ol/source/OSM'; // import OSM class from OpenLayers
import XYZ from 'ol/source/XYZ.js';
import MousePosition from 'ol/control/MousePosition.js';
import {createStringXY} from 'ol/coordinate.js';
import {ScaleLine,ZoomToExtent,defaults as defaultControls} from 'ol/control.js';
import {transform,transformExtent} from 'ol/proj.js';
import axios from 'axios';

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
            }),
            // new TileLayer({
            //     source: new XYZ({
            //         url: 'https://api.maptiler.com/maps/satellite/{z}/{x}/{y}.jpg?key=kR13HSIgTbWiBaHkhiL8',
            //         tileSize: 512,
            //     }),
            // }),
        ],
        view: new View({
            center: transform([114, 30], 'EPSG:4326', 'EPSG:3857'),
            zoom: 4,
        })
    });
},
methods:{
    extenttest(){
        var mapExtent = transformExtent(map.getView().calculateExtent(map.getSize()),'EPSG:3857', 'EPSG:4326')
        const extent = {
            project: 'EPSG:4326',
            minX: mapExtent[0],
            minY: mapExtent[1],
            maxX: mapExtent[2],
            maxY: mapExtent[3]
        }
        console.log(JSON.stringify(extent))
        const apiUrl = "http://localhost:8000/extent/send"
        axios.post(apiUrl, extent)
        .then(response => {
            console.log(response.data)
        })
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
    flex-direction: column;
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


  