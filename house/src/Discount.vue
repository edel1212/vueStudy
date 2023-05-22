<template>
  <div class="discount">
    지금 결제하면 {{discountPercent}}% 할인 
  </div>
</template>

<script>
export default {    
    name: "Discount-Component",
    data(){      
        return {
          discountPercent : 20,
          // 함수를 변수로 지정이 가능하다.
          intervalId : null,
        }
    },methods:{
       discountFunc() {
        this.intervalId = setInterval(()=>{
            this.discountPercent--;       
            if(this.discountPercent === 0){
              clearInterval(this.intervalId);
            } 
          },100);
       }      
    },
    mounted(){
      this.discountFunc();
    }
}
</script>

<style>

</style>