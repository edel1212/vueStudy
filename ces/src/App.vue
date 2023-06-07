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


import czml from "./assets/dummyPointData.js";

export default {
  name: 'App',
  components: {
  },
  mounted(){
    
    /**
     * 사용할 지도 객체 생성 - OpenStreetMap 사용
     */
    const osm = new Cesium.OpenStreetMapImageryProvider({
        url : 'https://a.tile.openstreetmap.org/'
    });

    // Cesium.Viewer(' 화면에 도출할 DocumentElment의 ID를 작성해준다. ', {  });    
    const viewer = new Cesium.Viewer('cesiumContainer', {
      
      imageryProvider: osm,                         // 초기 지도 설정
      terrainProvider: Cesium.createWorldTerrain(), // 지형데이터
      sceneMode: Cesium.SceneMode.SCENE3D,          // 초기 화면 상태 2D, 3D
      sceneModePicker: true,                        // 우측 상단 2D, 3D 변경

      timeline: false,                              // 타임라인바 비활성화
      animation : false,                            // 왼쪽 시간바 제거 - 단 false 로 할경우 애니메이션 효과가 사용 불가로 
                                                    // 애니메이션 기능이 필요한경우 hide시켜서 사용함
      navigationHelpButton : false,                 // 우측 상단 help    
         
      geocoder: false,                              // 우측 상단 조회   
      baseLayerPicker : false,                      // 우측 상단 레이어 버튼  
      infoBox: false, // infoBox 비활성화
    });    

    /**
     * Zoom out Maximum 설정
     */    
    viewer.scene.screenSpaceCameraController.maximumZoomDistance = 6378137 * 5;

    // 촤측 하단 logo 제거
    document.querySelector(".cesium-viewer-bottom").remove();

    // 초기 카메라 옵션
    const defaultCoordinate = ()=>{ 
      viewer.camera.flyTo({
        /**
         * Cesium.Cartesian3.fromDegrees(경도 , 위도 , 화면 높이)
         */
        destination : Cesium.Cartesian3.fromDegrees(127.5, 37.512, 1_500_000), 
        orientation : {
          heading : Cesium.Math.toRadians(0),  // 지도 회전 값 양수로 갈수록꺽임
          pitch : Cesium.Math.toRadians(-90.0), // 카메라 시야 각도 : -90[수직] , 0[수평]
          roll : 0.0                            // 회전 값
        },
      })
    };
    
    // 카메라 초기옵션 적용
    defaultCoordinate();

    /**
     * 홈버튼 클릭 Event Override
     */
    viewer.homeButton.viewModel.command.beforeExecute.addEventListener((event)=>{
      // 기존 적용되어있는 이동 이벤트 cancel 시킴
      event.cancel = true;
      // 초기 값 적용
      defaultCoordinate();
    })

    

   /***
    * Point Draw 
    * - czml 더미 데이터 import
    */
    const dataSourcePromise = Cesium.CzmlDataSource.load(czml);
    viewer.dataSources.add(dataSourcePromise);
    viewer.zoomTo(dataSourcePromise);

    /**
     * 마우스 over Event
     */
    const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    handler.setInputAction(function (movement) {
      const pickedObject = viewer.scene.pick(movement.endPosition);
      if (Cesium.defined(pickedObject) && pickedObject.id && pickedObject.id.description) {
        const tooltip = document.getElementById("tooltip");
        tooltip.innerHTML = pickedObject.id.description.getValue(); // 툴팁에 HTML 내용을 설정
        tooltip.style.display = "block";
        tooltip.style.left = movement.endPosition.x + "px";
        tooltip.style.top = movement.endPosition.y + "px";
      } else {
        const tooltip = document.getElementById("tooltip");
        tooltip.style.display = "none";
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
   
    
    /***
     * 스크롤 감지 이벤트
     */
    viewer.scene.postRender.addEventListener( () => {
      const height = viewer.camera.positionCartographic.height; // 현재 카메라의 높이 가져오기
      const zoomLevel = getZoomLevel(height); // 스크롤 레벨 계산 함수 호출
      console.log("Zoom Level:", zoomLevel);        
    });

    /**
     * 스크롤 Level 확인 이벤트
     */
    function getZoomLevel(height) {
      // 스크롤 레벨 계산 방식을 원하는 대로 구현
      // 예: height 값에 따라 스크롤 레벨을 조정
      // 이 예제에서는 임의로 10개의 스크롤 레벨을 가정하고 반환합니다.
      const maxZoomLevel = 15;
      const minZoomLevel = 1;
      const maxHeight = viewer.scene.screenSpaceCameraController.maximumZoomDistance; // 최대 높이
      const minHeight = 1_000; // 최소 높이

      // 현재 높이를 기준으로 스크롤 레벨 계산
      const normalizedHeight = Math.max(minHeight, Math.min(maxHeight, height)); // 최소/최대 높이 범위 내에서 클램핑
      const range = maxHeight - minHeight;
      const level = (normalizedHeight - minHeight) / range * (maxZoomLevel - minZoomLevel) + minZoomLevel;
      return Math.round(level);
    }

    
    /**
     * dataSourcePromise에 추가된 도형정보에 접근 및 수정 가능
     */
    dataSourcePromise.then((dataSource)=>{
          
          const entities = dataSource.entities.values;

          for (let i = 0; i < entities.length; i++) {
            const entity = entities[i];
            if (entity.point) {
              // pixelSize를 증가도 가능
              //entity.point.pixelSize *= 1000;
            }
          }// for
        })

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
