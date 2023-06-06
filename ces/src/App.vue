<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <div id="cesiumContainer"></div>
</template>



<script>
// The URL on your server where CesiumJS's static files are hosted.
window.CESIUM_BASE_URL = './Cesium/';

//../node_modules/cesium/Build/Cesium 👉  삽질스
import * as Cesium from 'cesium';
import "cesium/Build/Cesium/Widgets/widgets.css";

export default {
  name: 'App',
  components: {
  },
  mounted(){
    
    // Your access token can be found at: https://ion.cesium.com/tokens.
    // Replace `your_access_token` with your Cesium ion access token.

    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5YTY3ZDVhNC0zMThlLTQxZjUtODhmOS04ZmJjZGY4MDM4MDEiLCJpZCI6MTQzNzkxLCJpYXQiOjE2ODU2ODkwNDF9.3RQSwjKyySalcp1nUufcBxUk_hNALFLJ9j-X0-FoEpI';

    // Initialize the Cesium Viewer in the HTML element with the "cesiumContainer" ID.
    const viewer = new Cesium.Viewer('cesiumContainer', {
      terrainProvider: Cesium.createWorldTerrain()
    });
    viewer.imageryLayers.addImageryProvider(
      new Cesium.IonImageryProvider({ assetId: 4 })
    );    
    // Add Cesium OSM Buildings, a global 3D buildings layer.
    viewer.scene.primitives.add(Cesium.createOsmBuildings());   
    // Fly the camera to San Francisco at the given longitude, latitude, and height.
    viewer.camera.flyTo({
      destination : Cesium.Cartesian3.fromDegrees(-122.4175, 37.655, 400),
      orientation : {
        heading : Cesium.Math.toRadians(0.0),
        pitch : Cesium.Math.toRadians(-15.0),
      }
    });
  }
}




</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
