<template>
  <div v-if="tapStep == 0">
    <div v-for="(item,idx) in instaDataArr" :key="idx">
        <Post v-bind:instaData="instaDataArr[idx]" />
    </div>
  </div>  

  <!-- 필터선택페이지 -->
  <div v-if="tapStep == 1">
    <div class="upload-image" :style="`background-image : url(${updateImgURL})`"></div>
    <div class="filters">
        <FilterBox v-bind:updateImgURL="updateImgURL" v-bind:filterArr="filterArr">
            <template v-slot:a><h1>1</h1></template>
            <template v-slot:b>2</template>
        </FilterBox>
    </div>  
  </div>
  

  <!-- 글작성페이지 -->
  <div v-if="tapStep == 2">
    <div class="upload-image"  :style="`background-image : url(${updateImgURL})`"></div>
    <div class="write">
        <textarea @input="$emit('write', $event.target.value)" class="write-box">write!</textarea>
    </div>
  </div>
  
</template>

<script>
import Post from "/src/components/Post.vue"
import FilterBox from "/src/components/FilterBox.vue"
export default {
    data(){
        return {
            filterArr : [ "aden", "_1977", "brannan", "brooklyn", "clarendon", "earlybird", "gingham", "hudson", 
                            "inkwell", "kelvin", "lark", "lofi", "maven", "mayfair", "moon", "nashville", "perpetua", 
                            "reyes", "rise", "slumber", "stinson", "toaster", "valencia", "walden", "willow", "xpro2"],

        }
    },
    name : "ContainerComponent"
    ,components :{
        Post,
        FilterBox,
    },
    props : {
        instaDataArr : Array,
        tapStep : Number,
        updateImgURL : String
    },
    methods :{
                
    }
    
}
</script>

<style>
    .upload-image{
    width: 100%;
    height: 450px;
    background: cornflowerblue;
    background-size : cover;
    }
    .filters{
    overflow-x:scroll;
    white-space: nowrap;
    }
    .filter-1 {
    width: 100px;
    height: 100px;
    background-color: cornflowerblue;
    margin: 10px 10px 10px auto;
    padding: 8px;
    display: inline-block;
    color : white;
    background-size: cover;
    }
    .filters::-webkit-scrollbar {
    height: 5px;
    }
    .filters::-webkit-scrollbar-track {
    background: #f1f1f1; 
    }
    .filters::-webkit-scrollbar-thumb {
    background: #888; 
    border-radius: 5px;
    }
    .filters::-webkit-scrollbar-thumb:hover {
    background: #555; 
    }
    .write-box {
    border: none;
    width: 90%;
    height: 100px;
    padding: 15px;
    margin: auto;
    display: block;
    outline: none;
    }
</style>