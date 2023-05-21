<template>
    <div class="itemSection" >  
    <img :src="oneRoomData.image" class="room-img">           
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
    props : {
        oneRoomData :  Object,
    }
}
</script>

<style>

</style>