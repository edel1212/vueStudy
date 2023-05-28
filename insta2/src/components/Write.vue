<template>    
  <!-- 필터선택페이지 -->
  <div v-if="store.state.stepCnt == 1">
    <div :class="checkFilter" class="upload-image" :style="`background-image : url(${prop.updateImgURL})`"></div>
    <div class="filters">        
        <div @click="selectedFilter(item)" v-for="(item, idx) in filterArr" :key="idx" :class="`${item} filter-item`" :style="`background-image : url(${updateImgURL})`"></div>      
    </div>  
  </div>
  

  <!-- 글작성페이지 -->
  <div v-if="store.state.stepCnt == 2">
    <div class="upload-image" :class="checkFilter" :style="`background-image : url(${prop.updateImgURL})`"></div>
    <div class="write">
        <textarea @input="writeContent" class="write-box" placeholder="write"></textarea>
    </div>
  </div>
</template>

<script>
export default {
    name : "writeApp",
    data(){
        return {}
    }
}
</script>

<script setup>
    import {useStore} from 'vuex';
    import { ref, defineProps } from 'vue';

    const store = useStore();
    const prop = defineProps({
        updateImgURL : String,
        });

    const filterArr = ref(store.state.filterArr);

    const checkFilter = ref();

    const writeResult = ref({
        name: '신규등록',
        userImage: 'https://placeimg.com/100/100/arch',
        postImage: 'https://placeimg.com/640/480/arch',
        likes: 0,
        liked: false,
        content: '',
        filter: ''
    });

    const selectedFilter = (selected)=>{
        writeResult.value.filter = selected;
        checkFilter.value = selected;
    }

    const writeContent = (e)=>{
        if(!e.target.value) return;
        writeResult.value.content = e.target.value;
        store.commit("setRegisterData",writeResult.value);
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