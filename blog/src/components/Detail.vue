<template>
    <h4>{{blogDataArr[routeData.params.id]?.title}}</h4>
    <p>{{blogDataArr[routeData.params.id]?.content}}</p>
    <p>{{blogDataArr[routeData.params.id]?.date}}</p>    

    <!-- child router call -->
    <router-view></router-view>
</template>

<script>
export default {
    name : "Detail-Component",
    data(){
        return {
            routeData : this.$route
        }
    },
    props : {
        blogDataArr : Array        
    },
    mounted(){
        //console.log(this.routeData);
    }
}
</script>

<style>

</style>