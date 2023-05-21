<template>
    <div class="itemSection" >  
    <img :src="oneRoomData.image" class="room-img">    
    
    <h4 @click="openModal(oneRoomData)">{{oneRoomData.title}}</h4>       
    <p>{{oneRoomData.price}} 원</p>  
    <p>{{oneRoomData.content}}</p>    
  </div>
</template>

<script>
export default {
    name : "Card-Component",
    data(){     
        return { }  
      },
    methods : {
        openModal(oneRoomData){
            /**
             * 👉 "this."는 필수이다.
             * 👉 부모 컴포넌트에 전달 $emit('작명', 데이터)
             */
            this.$emit('openModal', oneRoomData.id);
        }
    }  ,
    props : {
        oneRoomData :  Object,
    }
}
</script>

<style>

</style>