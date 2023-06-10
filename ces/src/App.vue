<template>
  <div id="tooltip"></div>
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
    
    const osm = new Cesium.OpenStreetMapImageryProvider({url : 'https://a.tile.openstreetmap.org/'});
        const viewer = new Cesium.Viewer('cesiumContainer', {
            imageryProvider: osm,                         // 초기 지도 설정
            terrainProvider: Cesium.createWorldTerrain({
                    requestWaterMask : true,    //수면에 파도효과
                    requestVertexNormals : true //경사 명암효과
                }), // 지형데이터
            sceneMode: Cesium.SceneMode.SCENE3D,          // 초기 화면 상태 2D, 3D
            sceneModePicker: true,                        // 우측 상단 2D, 3D 변경
            timeline: true,                              // 타임라인바 비활성화
            animation : false,                            // 왼쪽 시간바 제거 
            navigationHelpButton : true,                 // 우측 상단 help    
            geocoder: false,                              // 우측 상단 조회   
            baseLayerPicker : false,                      // 우측 상단 레이어 버튼  
            infoBox: false,                               // 도형 클릭 시 설명
            shouldAnimate : true
        });    

        viewer.camera.flyTo({
            destination : Cesium.Cartesian3.fromDegrees(127.5, 37.512, 4000), 
            orientation : { heading : Cesium.Math.toRadians(0),  
                pitch : Cesium.Math.toRadians(-90.0),
                roll : 0.0  },
        })
      

         // Gltf포맷 사용을 위한 변수들 선언
        const position = Cesium.Cartesian3.fromDegrees(127.5, 37.51, 0);
        const modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(position);
        
        // fromGltf 함수를 사용하여 key : value 값으로 요소를 지정
        viewer.scene.primitives.add(Cesium.Model.fromGltf({
            url : '../../gltf/scene.gltf', // gltf포맷의 위치 
            modelMatrix : modelMatrix,
            scale : 500_000
        }));

  }// mounted
}




</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
body{
  margin: 0px;
}
#cesiumContainer{
  height: 100vh;
}
#tooltip{
  position: fixed;
  z-index: 10;
  background: white;
  border-radius: 10px;
  border:3px solid black;
  display: none;
  padding: 10px;
}
</style>
