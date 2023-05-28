  import { createStore } from 'vuex'
  import Axios from 'axios';

  const store = createStore({
    state(){
      return {
        instaArr : null,
        stepCnt : 0,
        filterArr : [ "aden", "_1977", "brannan", "brooklyn", "clarendon", "earlybird", "gingham", "hudson", 
                            "inkwell", "kelvin", "lark", "lofi", "maven", "mayfair", "moon", "nashville", "perpetua", 
                            "reyes", "rise", "slumber", "stinson", "toaster", "valencia", "walden", "willow", "xpro2"]
      }
    },
    mutations:{
      setInstaData(state, param){
        state.instaArr = param;
      },
      setStepCnt(state, param){
        state.stepCnt = param;
      }
    }, actions :{
      getData(){
        Axios.get('http://localhost:8081/list')
        .then(result=>{
          store.commit("setInstaData",result.data);
        }).catch(err=>{
          console.log(err);
        })
      }
    }
  })
  
  // 👉 export store  
  export default store