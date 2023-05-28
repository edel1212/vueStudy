<template>    
  <!-- 필터선택페이지 -->
  <div v-if="stepCnt == 1">
    <div :class="checkFilter" class="upload-image" :style="`background-image : url(${updateImgURL})`"></div>
    <div class="filters">        
        <div @click="checkFilter = item" v-for="(item, idx) in filterArr" :key="idx" :class="`${item} filter-item`" :style="`background-image : url(${updateImgURL})`"></div>      
    </div>  
  </div>
  

  <!-- 글작성페이지 -->
  <div v-if="stepCnt == 2">
    <div class="upload-image"></div>
    <div class="write">
        <textarea @input="TODO" class="write-box">write!</textarea>
    </div>
  </div>
</template>

<script>
export default {
    name : "writeApp",
    data(){
        return {
            checkFilter : ""
        }
    },
    props :{
        updateImgURL: {
            type: String,
            required: true
        }
    }
}
</script>

<script setup>
    import {useStore} from 'vuex';
    import { ref } from 'vue';

    const store = useStore();
    const stepCnt = ref(store.state.stepCnt);

    const filterArr = ref(store.state.filterArr);
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