<template>
  <div :class="`${filterArr[idx]} filter-item`" :style="`background-image : url(${updateImgURL}) `"
  v-for="(item,idx) in filterArr" :key="idx"></div> 

  <!-- 슬롯 생성  -->
  <slot name ="a"></slot>
  <slot name ="b"></slot>
</template>

<script>
export default {
    name : "FilterBoxComponent",
    props : {
        updateImgURL : String,
        filterArr : Array
    }
}
</script>

<style>
    .filter-item {
        width: 100px;
        height: 100px;
        margin: 10px 10px 10px auto;
        padding: 8px;
        display: inline-block;
        color : white;
        background-size: cover;
        background-position : center;
    }
</style>