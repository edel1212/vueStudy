# Vue Study

## 개발환경 세팅
- 1 . node.js 설치
- 2 . vue 설치 `npm intall -g @vue/cli`
- 3 . 필요 익스텐션 다운로드

| 익스텐션           | 설명           |
|----------------|--------------|
| Vetur          | Vue 코드 하이라드트 |
| HTML CSS Support          | css 선택자 요소 자동완성        |
| Vue 3 Snippets | 자동완성 기능         |


<br/>
<hr/>

## 프로젝트 생성 및 빌드 명령어

| 설명               | 명령어                  |
|------------------|----------------------|
| 프로젝트 생성            | `vue create [프로젝트명]` |
| 프로젝트 서버실행 | `npm run serve`      |
| 프로젝트 빌드  | `npm run build`      |

<br/>
<hr/>

## App.vue 구조

- 웹 브라우저는 .vue 확장자를 읽지 못하므로 컴파일 된 파일을 읽어 보여준다.
- vue는 데이터가 바뀌면 알아서 랜더링을 해준다.
  - 그렇기 script -> exprot -> data(){/* 타켓 */} 의 데이터를 읽는다.


| 코드                      | 설명                |
|-------------------------|-------------------|
| `<template></template>` | Html 코드가 들어간다     |
| `<script></script>`     | Javascript가 들어간다  |
| `<style></style>`       | Style sheet가 들어간다 |

<br/>
<hr/>

## 데이터 가져와 적용하기

👉 데이터를 가져올 javascipt
```javascript
// javascript

export default {
  name: 'App',
  data(){     
    return {
      buildName : "이름입니다",
      price : 100,
      elemId : "testId",
      backgroundColor : "background : red",
      tmpArr : [1,2,3,4,5]   
    }
  },
  components: {
  }
```

👉 적용할 html
```html
<!-- template -->

<template>
    <!--  Dom요소에 적요하기 위해서는 ":[타겟]"으로 지정 해야한다  -->
    <h4 :id="elemId" :style="backgroundColor">xxx 원룸</h4>
    
    <!--  "{{타겟}}"을 사용해서 데이터 주입 -->
    <div>
        <h4>{{buildName}} 원룸</h4>
        <p>{{price}} 만원</p>
    </div>
    
    <!--   배열에 접근  -->
    <p>{{tmpArr[0]}}</p>
    <p>{{tmpArr[1]}}</p>
    <!--  배열을 초과해도 Error가 나지 않음   -->
    <p>{{tmpArr[99]}}</p> 
</template>
```

### 추가 정보 +
- 데이터를 추가 시 methods 나 life cycle 등에서 사용할 함수 변수도 생성이 가능하다.  

```html

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
          // ✅ 함수를 변수로 지정이 가능하다.
          intervalId : null,
        }
    },methods:{
       discountFunc() {
       // 👉 data()에 추가한 곳에 변수 할당
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

<style></style>
```

<br/>
<hr/>

## Image 가져오기

### Vue 자체에서는 이미지를 가져올때 웹팩을 사용할 경우 절대경로로 가져오지 못하는 문제가 있다
- 이미지 자체에 이미지명 + 난수가 붙어 있다. 👉 ex) `/img/room0.e2d4696b.jpg`

### 차이점
- 웹팩을 사용한 경로 지정시 ✅ 문제 없음
  -   `<img src="./asset/img/yoo.jpg">` ./로 시작하면 src 경로를 기준으로 이미지를 찾아다 줌 이미지 명 뒤에 난수가 붙어있다.


- 일반 절대 경로 사용 시  
  - 일반적인 절대경로 사용 시 ❌ 404 not found
    - `<img src="/assets/img/room0.jpg" class="room-img">` 경로는 맞지만 이미지를 찾기 못하는 문제 발생
  - 일반적인 절대경로 사용 시 "@"적용 ✅ 문제없음
    - `<img src="@/assets/img/room0.jpg" class="room-img">`
  
- 데이터에 접근하여 이미지를 지정하고 싶을 경우
  - Vue의 일반적은 ":" 만 사용 시 ❌ 404 not found
    - `<img :src="`@/assets/img/room${index}.jpg`" class="room-img">` 경로 자체에 "@" 박혀서 나옴
  - require()를 사용 ✅ 문제없음
    - `<img :src="require(`@/assets/img/room${index}.jpg`)" class="room-img"> `


<br/>
<hr/>

## Import, Export

👉 Export 대상 js
```javascript
  // js File
 
  let apple = 10;

  let apple2 = 100;
  
  // 방법 1 . export default 변수명
  export default apple;   // 👉 하나만  밖으로 보냄
  
  // 방법 2 . export {변수 , 변수 , ...}
  export {apple, apple2};  // 👉 다수를 밖에 보낼 수 있음
```

👉 Import 대상 js
```html
<!-- App.vue -->

<template> 
<!-- code ..-->
</template>

<script>
  /** 
  * 방법 1
  * - export를 Default로 지정 시 변수 명을 변경하여 부를수 있다.
  * - 어차피 하나이기 때문임!!
  * - 불러오는 방식 또한 "./"를 사용하여 불러옴 
  */
  import variableNameChange from "./assets/json/oneroom.js"
  // ✅ 사용하지 않으면 Error 발생
  //variableNameChange;
  
  //방법 2 - 다건
  import {apple, apple2} from "./assets/json/oneroom.js";
  console.log(apple);
  console.log(apple2);
  
  // JSON 데이터를 불러옴 Export 시 default로 지정 하였음
  import dummyData from "./assets/json/dummyData.js"
</script>


```

<br/>
<hr/>

## Vue 명령문

### v-for문 사용방법
```html

<!-- script -->
<script>
  data(){    
    return {
      topMenu : ["Home", "Shop", "About"],
      products : [ {name:"역삼동원룸", reportCnt : 0 }
                 , {name:"천호동원룸", reportCnt : 0 }
                  , {name:"마보구원룸", reportCnt : 0 } ]  ,
      }
   },   
</script>

<!--=================================================================-->
<!--=================================================================-->
<!--=================================================================-->

<!-- html -->
<!-- "(아이템, 인덱스번호 ) in 대상" ✅ 중요한건 :key="필수값" -->
<!-- 여기서 사용되는 key는 vue에서 순서를 인식하기 위한 값으로 앵간하면 index값을 넣어준다한다 -->
<a v-for="(item,index) in topMenu" :key="index" href="">
  {{item}}    <!-- 아이템 요소 -->
  [{{index}}] <!-- 인덱스번호 -->
</a>

<!-- json 형태도 가능함-->
<div class="itemSection" v-for="(item, index) in products" :key="index">
  <h4>{{item.name}}</h4>
  <p>{{(index+1) *10}} 만원</p>
</div>

```

### Event Handler 사용 방법
```html

<!-- script -->
<script>
  data(){    
    return {
      products : [ {name:"역삼동원룸", reportCnt : 0 }
                 , {name:"천호동원룸", reportCnt : 0 }
                  , {name:"마보구원룸", reportCnt : 0 } ]  
      },
      methods:{             // ✅ 함수를 담는곳이 존재한다
        increase(index){
            // 접근 시에는 this가 필수이다 
          this.products[index].reportCnt++;
        }
      },
   },   
</script>

<!--=================================================================-->
<!--=================================================================-->
<!--=================================================================-->


<!-- json 형태도 가능함-->
<div class="itemSection" v-for="(item, index) in products" :key="index">
    <!-- 배열속 json에 직접 접근 -->
  <button @click="item.reportCnt++">허위매물 신고</button> <span>신고수 : {{reportCnt}}</span>
    <!-- methods를 사용한 접근 function내에서 data에 접근시는 "this."를 사용해야 함  -->
  <button @click="increase(index)">허위매물 신고</button> <span>신고수 : {{item.reportCnt}}</span>
    <!-- @Event를 사용하여 다양한 이벤트로 접근이 가능하다 -->
  <button @mouseover="item.reportCnt++">허위매물 신고</button> <span>신고수 : {{reportCnt}}</span>
</div>

```

### v-if 문
```html

<!-- script -->
<script>
  data(){    
    return {
        modalState : true,  
      }
   },   
</script>

<!--=================================================================-->
<!--=================================================================-->
<!--=================================================================-->


<!-- Modal -->
<!-- v-if가 true일 경우에만 화면이 그려진다. -->
<div class="black-bg" v-if="modalState">
  <div class="white-bg">
    <h4>상세페이지</h4>
    <p>상세페이지 내용</p>
    <!--  닫힘 버튼 클릭 시 data의 State를 업데이트  -->
    <button @click="this.modalState = false">닫기</button>
  </div>
</div>


<!-- v-if ~ else-if ~ else -->
<div v-if=" 1 === 2">
  if 문
</div>
<div v-else-if="1 === 1">
  else if 문
</div>
<!-- <div> ⭐️ 중간에 끼면 안된다!</div> -->
<div v-else>
  else 문
</div>
```

### v-model 문 **모든 input,select에 사용가능**
- 다양한 값을 받는 테그에 사용이 가능하다
- v-model을 사용하지 않아도 `@change, @input, @keydown`등을 사용해서 처리가 가능하나 코드가 길어진다.
  - 결과값으로  `$event`를 받는대 해당 값은 `.addEventListener("click",(e)=>{ /** cocd */})`의 **e**와 같다 
- v-model을 사용하면 코드가 간략해지고 직관적이기에 유용하다.
  - `v-model.자료구조`를 사용해서 조절이 가능하다.
  - 
```html
<template>
      <!--   👉 @이벤트="" 사용 방법   -->
      <!-- .addEventListener("click",(e)=>{ /** cocd */})  해당 e가 $event임-->
      <input type="text" @input=" month = $event.target.value"> 
      <!-- 
        상단의 코드 축약버전 모든 input, select 등 value를 알아서 바인딩 해줌 
        단 v-model을 사용 시 초기값이 굉장이 중요함! 숫자로하고 한글을 넣으면 바인딩을 못함 당연한것이지만 기억해두자
      -->
      <input type="text" v-model.number = "month" />
      <p> {{month}}개월 선택 :  {{oneRoomData[clickNum].price * month }}</p>

</template>

<script>
export default {
    name: "Modal-Component",
    data() {
      return {
        // 👉 v-model을 사용시 초기 데이터의 형식을 맞춰주자 안그러면
        //    바인딩에 문제가 있는 경우가 많음
        month : 1,
      }
    }
}
</script>

```

<br/>
<hr/>

## Component란 ?

## 사용이유 
- 재사용에 용의하다.
- App.vue에서 모든 코드를 넣어 사용하는 것이 아니기에 코드가 간결해지며 가독성이 높아짐
## 단점 
- 데이터 바인딩 및 이벤츠 처리가 복잡해진다.


### 사용 방법
- 1 . 파일명.vue 파일을 생성한다.
- 2 . 해당 파일을 vue 파일의 형식에 맞게 생성한다.  👉  Extention을 받았다면 간편하게 생성 가능
```html
<!-- 대상.vue -->

<template></template>

<script>
export default {    
    name: "사용할 이름 아무거나 가능하나 중간 "-"로 구분자 필요",
    data(){
        return
    },
    methods: {
        // 함수
    },
    components: {
        // 불러올 컴포넌트
    }
}
</script>

<style></style>
```
- 3 . 부모 vue 파일에서 대상 import 해준다. `<script>import 대상명 from '대상위치'</script>`
- 4 . 부모 vue 파일의 script 내부 component에 import한 대상 추가
```html
<!--  부모.vue -->
<script>
    // 👉 Target Import
    import Discount from "./Discount.vue";
    
    export default {
      name: 'App',
      data(){ /** code */ },
      methods:{ /** code */ },
      components: {
        // 👉 Add Target Component 
        // Discount : Discount  - key : value가 같다면 한개로 축약 가능
        Discount
      }
    }
</script>
```

<br/>
<hr/>

## Component - 부모의 Data에 접근하기

- props를 사용하면 부모 컴포넌트에서 자식 컴포넌트로 데이터 전달이 가능하다.

### 방법은 2가지
- 첫번째 : `v-bind="전달대상"`을 사용하는 방법
- 두번째 : `:데이터이름="전달대상"`을 사용하는 방법

### 주의사항
- 자식 컴포넌트에서 data에 데이터를 추가해서 사용해도 되지만 만약 부모, 자식 둘다 쓰는 데이터라면 **부모컴포넌트에 만드는게 맞다.**
- 자식 컴포넌트에서 prop으로 받은 데이터는 재할당 **(수정)**  불가능하다
- 부모 컴포넌트에서는 자식 컴포넌트를 부를 경우 `<자식컴포넌트 :명칭="data" />` 또는 `<자식컴포넌트 v-bind:명칭="데이터" />`를 사용해야함
- 자식 컴포넌트에서는 `<script></script>` 내부에서 `props : { 부모지정이름 : 자료구조 }`를 맞춰서 불러줘야한다.

### 추가정보
- 일반적인 문자는 ":"를 쓰지 않고도 전달이 가능하다
- 단 숫자도 가능은하나 전달받은 자식창에서는 문자로 받아진다. `<ComponentTest 이름지정="이렇게전달 해도 자식에서 받습니다." />`
- Object나 배열의 경우 해당 key 혹인 index를 통해 전달이 가능하다. `<ComponentTest :이름지정="arry[22]" v-bind:이름지정2="obj.name" />`
  - 단 해당 경우에는 ":", "v-bind" 필수이다!! 이름에서 보시다싶이 바인딩을 해줘야함! 

### 사용방법

👉 부모 Component
```html
<!-- App.vue -->

<template>
  
  <!-- ✅ 구조는 지졍이름:대상Data이다 -->
  
  <!-- Discount -->
  <!-- 👉 v-bind를 사용  -->
  <Discount v-bind:아무거나 작명가능="bindSendDataTest"/>
  <!-- Modal -->
  <!-- 👉 ":"를 사용  -->
  <Modal :oneRoomData="oneRoomData" :clickNum=clickNum :modalState=modalState />
</template>

<script>
// Component
import Discount from "./Discount.vue";
import Modal from "./Modal.vue"

// DummyData
import dummyData from "./assets/json/dummyData.js"

export default {
  name: 'App',
  data(){     // 데이터를 담는 곳
    return {
      modalState : false,
      oneRoomData : dummyData,
      clickNum : 0,                  
      bindSendDataTest : 200,      
    }  
  },
  methods:{ },
  components: {
    // Discount : Discount
    Discount,
    // Modal
    Modal
  }
}
</script>
```

👉 자식 Component - Discount
```html
<!-- Discount.vue -->

<template>
  <div class="discount">
    지금 결제하면 20% 할인 {{작명가능}}
  </div>
</template>

<script>
export default {    
    name: "Discount-Component",
    data(){
        return
    },
    props : { // ✅ props는 필수!~~~~
        //  👉 부모에서 넘겨준 이름 : 자료구조
        작명가능 : Number,
    }
}
</script>

<style></style>
```

👉 자식 Component - Modal
```html
<!-- Modal.vue -->

<template>
  <div class="black-bg" v-if="modalState">
    <div class="white-bg">
      <img :src="oneRoomData[clickNum].image" >
      <h4>{{oneRoomData[clickNum].title}}</h4>
      <p>{{oneRoomData[clickNum].content}}</p>
      <p>{{oneRoomData[clickNum].price}}</p>
      <!-- ❌ props에서 받아온 데이터는 재할당(변경)이 불가능하다 "read-only" -->
      <!-- <button @click="this.modalState = false">닫기</button> -->
    </div>
  </div>
</template>

<script>
export default {
    name: "Modal-Component",
    props:{
      // 받아온 key : 자료형
      oneRoomData : Array,
      clickNum : Number,
      modalState : Boolean
    }
}

<style></style>
```

<br/>
<hr/>

## Component - 자식이 부모의 Data에 접근 하는 방법
- 기본적으로 자식 자체에서 부모의 데이터를 변경할수는 없다
- 따라서 부모에게 요청사항을 전달하고 부모 컴포넌트에서 해당 사항을 적용 하는 방식이다.

### 👉 자식 Component에서 전달 
- `$emit("사용될 Key명", 넘겨줄 데이터)`로 보내주면 된다.
  - 중요 : methods 내부에서는 `$emit()`사용시 **"this."** 는 필수이다 
```html
<template>
    // 클릭 시  함수 실행 
    <h4 @click="openModal(oneRoomData)">{{oneRoomData.title}}</h4>
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
```

### 👉 부모 Component에서 받기
- `@자식컴포넌트에 서작명한것 = "$event"`를 사용하면 `$event`안에는 넘겨준 값이 들어가 있다.
  - 내부에서 받아 쓸 수 도 있고 함수로 받아서 사용 또한 가능하다 

```html
<template>
  <!-- Card -->
  <!-- @자식 컴포넌트에서 작명한 것= "함수 또는 코드 $event" -->
  <Card @openModal="modalEvent($event)" v-for="(item, idx) in oneRoomData" :key="idx"  v-bind:oneRoomData="oneRoomData[idx]" />   
</template>

<script>

// Component
import Card from "./Card.vue"

// DummyData
import dummyData from "./assets/json/dummyData.js"

export default {
  name: 'App',
  data(){     // 데이터를 담는 곳
    return {
      modalState : false,
      oneRoomData : dummyData,
      clickNum : 0,                  
    }  
  },
  methods:{   // 함수를 담는곳
    modalEvent (clickNum){
      this.modalState = true;
      this.clickNum = clickNum;
    }
  },
  components: { Modal,}
}
</script>
```

<br/>
<hr/>

## watch - data()의 데이터가 변경이 일어날 경우 감지

### ⭐️ 단 중요한것은 배열이나 오브젝트와 같은 구조는 감지하지 않음

- 사용하는 방법은 다양한곳에 사용할것 같으나 Validation Check의 경우 상세하게 잡지 못했음
  - 숫자입력하다가 후에 글자를 입력해도 제대로 동작하지 못함 따로 함수로 구현하는게 나을 듯함
- data와 watch에서 사용하는 변수명은 👍***같아야 한다.***
- watch의 파라미터는 2개를 받을 수 있다 . `month(nowVale,beforeVale)` 현재값 , 이전 값 
```html
<template>
    <!--  두가지 tag 모두다 data()의 값을 변경 중임  -->
    <input type="text" v-model.number = "month" />
    <button @click="bool = !bool"> test </button>
    <button @click="arr.push(0)"> test </button>
    <button @click="obj.age += 100"> test </button>
</template>

  <script>
export default {
    name: "Modal-Component",
    data() {
      return {
        month : 1,
        arr : [1,2],                        // ❌ 감지 불가능
        str : "가나다",                       // ❌ 감지 불가능 
        obj : {name : "yoo", age : 30},     // ❌ 감지 불가능
        bool : false
      }
    },
    watch : { // 데이터 감시
      // 👉 데이터와 함수명은 같아야 한다.
      //month(param,beforeParam){ // 변경 데이터 변경 전 데이터 둘다 받을 수 있음
      month(param){ // 변경 데이터 변경 전 데이터 둘다 받을 수 있음
        if(isNaN(param)){
          alert("숫자를 입력해주세요");
          this.month = 1;
        }
      },
      bool(param){
        console.log(param);
      }
    } 
}
</script>
```

<br/>
<hr/>

## 동적 Class 사용방법
- Data() 기준으로 해당 값에 따라 addClass, removeClass를 정할 수 있다.
- `:class{대상이될 class명 : Boolean}`을 사용하여 구분 할 수있다.

```html
<template>

  <!-- :class=오브젝트형태로 value가 true일 경우 생긴다. -->
   <div class="start" :class="{end : modalState}">
    <Modal :oneRoomData="oneRoomData" :clickNum=clickNum :modalState=modalState @modalClose="modalState = $event" />
  </div>
  
</template>

<style>
  .start{
    opacity: 0;
    transition: all 1s;
  }
  .end{
    opacity: 1;
  }
</style>
```

<br/>
<hr/>

## 동적 Class 사용방법

- `:class="{클래스명 : Boolean}"`을 사용하면 된다.
- 복수의 class 추가하고 싶다면 `:class="{클래스명 : Boolean, 클래스명2 : Boolean, 클래스명3 : Boolean ....}"`로 늘릴 수 있다

```html

<template>
  
  <!-- :class=오브젝트형태로 value가 true일 경우 생긴다. -->
  <div class="start" :class="{'end' : modalState}">
    <Modal :oneRoomData="oneRoomData" :clickNum=clickNum :modalState=modalState @modalClose="modalState = $event" />
  </div>
  
</template>

<script>
  export default {
    name: 'App',
    data(){     
      return {
        modalState : false,
      }  
    },
    methods:{   },
    components: {  }
  }
</script>

<style>
  .start{
    opacity: 0;
    transition: all 1s;
  }
  .end{
    opacity: 1;
  }
</style>
```

<br/>
<hr/>

## Vue에서 Dom요소 애니메이션 효과
- css를 통한 class 사용으로 대처가 가능하다나 알아두자!
- 설정방법
  - `<template></template>` 내부에 애니메이션 효과를 주고싶은 곳에 `<transition name="사용될 이름"></tansition>` 태그로 묶어준다.
    - 중요한 것은 `name=""`에 들어가는 명칭이다. 
  - `<style></style>` 내부에 css를 추가해준다
    - 시작일 경우
      - `사용될이름-enter-from`, `사용될이름-enter-action`, `사용될이름-enter-end`, 3단계로 css를 추가해준다.  
    - 떠날 경우
      - `사용될이름-leave-from`, `사용될이름-leave-action`, `사용될이름-leave-end`, 3단계로 css를 추가해준다.
- 따로 설정이 없어도 해당 태그 내부의 화면에 보이고 안보이고 조건 `v-if`조건에 충족될 경우 애니메이션 효과가 적용된다.

```html

<template>

  <transition name="fade">
    <Modal v-bind:oneRoomData="oneRoomData" v-bind:clickNum=clickNum v-bind:modalState=modalState @modalClose="modalState = $event" />
  </transition>
  
</template>

<script>
  export default {
    name: 'App',
    data(){     
      return {
        modalState : false,
      }  
    },
    methods:{   },
    components: {  }
  }
</script>

<style>
  .fade-enter-from{ /* 시작 */
    transform: translateY(-1000px);
  }
  .fade-enter-active{
    transition: all .5s;
  }
  .fade-enter-to{ /* 끝 */
    transform: translateY(0px);
  }
  
  .fade-leave-from{ /* 끝 */
    opacity: 1;
  }
  .fade-leave-active{
    transition: all 1s;
  }
  .fade-leave-to{ /* 시작 */
    opacity: 0;
  }
</style>
```

<br/>
<hr/>

## Life Cycle Hook
- 컴포넌트는 step별로 생성되며 사라지는 Life Cycle을 갖고 있고 거기에 Hook(중간에 가로채서) 핸들링을 할수있다.
- 간단하게 축약하자면 vue에서는 html이 생성되가까지의 흐름이 있다
  - Create 단계 : 데이터만 있는 상태
  - Mount 단계  : .vue 파일을 => html로 변경되는 단계
  - update 단계 : data()의 값이 변경 되면 html을 재 랜더링하는 단계

### 사용방법
- `<script></script>`  내부 Hook 함수를 추가하여 컨트롤한다.
  - 최초 상태       :: `beforeCreate(){ /** TODO Logic */}` 
  - 데이터만 있는 상태  :: `created(){ /** TODO Logic */}`      
  - html 마운트 전  :: `beforeMount(){ /** TODO Logic */}`  
  - html 마운트 후  :: `mounted(){ /** TODO Logic */}`      
  - data 업데이트 전 :: `beforeUpdate(){ /** TODO Logic */}` 
  - data 업데이트 후 :: `updated(){ /** TODO Logic */}`      
  - 컴포넌트 삭제 전  :: `beforeUnmount(){ /** TODO Logic */}`
  - 컴포넌트 삭제 후  :: `unmounted() { /** TODO Logic */}`   

### 중요
- 해당 Hook들은 각각의 파일(컴포넌트)에 따라 실행된다.
  - ex) Modal.vue에서 `mounted(){}`사용시 Modal 컴포넌트가 다 그려진 후 실행됨 각각의 파일에 따라 실행되는 것이다.
- 데이터를 가져 올떄 많이 사용된다 
  - javascript의 `<script defer> (function(){ 초기 값 가져오기  })(); </script>` 와 비슷한 개념이라 보면된다.
  - `created(){}` 와 `mounted(){}`가 주로 사용 된다.
    - 정말 간단한 UI에 연관 없어도 되는 데이터를 가져올떄는 `created(){}`
    - 아닌 경우에는 `mounted(){}`를 사용한다 보면 된다.

```html

<template>
  <!-- v-if를 사용하여 UI 보여지고 안보여지고 처리  -->
  <Discount v-if="showDiscount"/>

</template>

<script>

// Component
import Discount from "./Discount.vue";
import Modal from "./Modal.vue"
import Card from "./Card.vue"

// DummyData
import dummyData from "./assets/json/dummyData.js"

export default {
  name: 'App',
  data(){     // 데이터를 담는 곳
    return {
      showwDiscount : true,    
    }    
  },
 // 👉 Mount가 된 후 2초 후 상태값 변경
  mounted(){ 
    setTimeout(()=>{
      this.showDiscount = false;
    },2000)
  }
}
</script>
```

<br/>
<hr/>

## Vue에서 Bootstrap 사용 방법

### Bootstrap 버전이 올라가면서 명렁어가 바뀔 수 있으므로 공식 홈페이지를 참고하자.

- 1 . npm을 통해 bootstrap을 설치한다. `npm install bootstrap@5`
  - 설치가 완료됐다면 package.json에서 확인이 가능하다.
- 2 . project - src - main.js에 bootstrap 관련 정보 import 해준다.
  - `import "bootstrap/dist/css/bootstrap.min.css" // [bootstrap]`
  - `import "bootstrap" // [bootstrap]`
    - 💬 main.js란? 
      -  // 1. 애플리케이션 진입점으로 Vue 초기화, 폴더 , 전역, 컴포넌트 , 라이브러리 등록 수행 실시
      -  // 2. import App 을 사용해 최상위 App.vue 컴포넌트 지정 실시
      -  // 3. createApp mount 를 사용해 index.html 파일 div id 값 설정 및 렌더링 시작점 지정 실시
      -  // 4. router : 라우터는 웹페이지 간의 이동하는 방법 및 경로를 설정해주는 파일입니다
      -  // 5. app.config.globalProperties : 글로벌 변수를 선언합니다. 변수 명칭은 $변수명칭 을 지정합니다


<br/>
<hr/>

## Vue - Router 
### Router란?
- URL별로 화면을 구성하여 나오게 하는것이다.

### 사용 방법
- 1 . npm을 사용하여 vur-router를 설치한다 . `npm install vue-router@4`
- 2 . 라우터를 설정할 파일 생성 기본적으로 Router를 사용할 목록을 js파일로 나눠 사용한다.

```javascript
// router.js

// 👉 import 할 시 from "" 경로가 아닌 라이브러리명을 장성 시 해당 라이브러리를 불러온다
import { createWebHistory, createRouter } from "vue-router";

// 👉 Router에 불러올 component를 import 해준다.
import List from "./components/List.vue"
import Home from "./components/Home.vue"

// 👉 배열<{path : String , component: VueFile}> 형식으로 설정해준다.
// - path : URL , component : vue 파일
const routes = [
  {
    path: "/list",
    component: List,
  },
  {
    path: "/",
    component: Home,
  },
];

// 👉 라우터 객체생성
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 👉 라우터 export
export default router;  
```

- 3 . main.js에 위에서 만든 router 셋팅 .js 파일을 import 해준다.
  - 3 - 1 . `use(router)`를 추가해준다.
  
```javacript
// main.js

import { createApp } from 'vue'
import App from './App.vue'

// Add Bootstrap 
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

// 👉 Router를 추가해준다.
import router from "./router"

createApp(App)
// 👉 추가한 라우터를 사용
.use(router)
.mount('#app')
```

4 . App.vue에서 `<router-view />` 사용하여 불러온다
  - 4 - 1 . 데이터를 바인딩하여 전달하고 싶을 경우 부모 컴포넌트 `<router-view v-bind:blogDataArr="blogDataArr" />`
  - 4 - 2 . 라우팅 대상 자식 컴포넌트에서 스크립트 내부 `props :{ blogDataArr : Array }`를 사용하여 일반 컴퍼넌트에서 데이터 받는 식과  
똑같이 해결이 가능하다.

<br/>
<hr/>

## Vue - Route 파라미터 전달

### 주의사항
- routes에서의 순서가 중요하다.
  - `/:anyting`을 사용하면 모든 url에 걸릴것 같지만 순서대로 실행되기에 가장 마지막에 두면 마지막에 사용된다. 
- 다양한 방법으로 사용이가능하다
  - `/:anyting(정규식)` 정규식 사용이 가능
  - 내부 함수를 사용하여 추가 및 삭제도 가능
  - 필요한 것은 그떄그때 공식 홈페이지에서 확인하는것이 좋다
  - redirect도 사용가능
  - 컴포넌트도 각각 조각내어 사용 가능

### 사용방법
- router를 설정하는 js 파일에서 path설정 부분에  `/:내가지정할 이름`을 사용하여 추가 해준다.
- 해당 파라미터를 사용하는 컴포넌트에서 `$route`를 사용하면 여러가지 값을 불러와 사용할 수 있다. 
  - fullPath, hash, matched, meta, name, params, path, query, redirectedFrom

✅ router.js
```javascript

import { createWebHistory, createRouter } from "vue-router";

// Router에 import할 component를 추가
import Detail from "./components/Detail.vue"

/**
 * path에 맞는 url 접속 시 지정된 component로 이동 시켜준다.
 */
const routes = [
  {
    // 👉 ":id"를 통해 파라미터 지정
    path: "/Detail/:id",
    component: Detail,
  },
  // 👉 순서가 중요하므로 /Details과 겹치지만 여기까지 오지 않는다!
  {
    path: "/:anyting",
    component: 404Page,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router; 
```

✅ Detail.vue - "/Details/값"으로 전달 받은 컴포넌트
```html
<template>
    <!--  router.js에서 :id 지정했기에 .id로 불러와 사용 가능    -->
    <h4>{{blogDataArr[routeData.params.id]?.title}}</h4>
    <p>{{blogDataArr[routeData.params.id]?.content}}</p>
    <p>{{blogDataArr[routeData.params.id]?.date}}</p>
    <!--  👉 아래외 같이 사용하면 값을 알 수 있음  -->
    {{$route}}
</template>

<script>
export default {
    name : "Detail-Component",
    data(){
        return {
            // 👉 this.$route 를 사용하면 변수에 할당이 가능하다
            routeData : this.$route
        }
    },
    props : {
        blogDataArr : Array        
    },
    mounted(){
        console.log(this.routeData);
    }
}
</script>

<style></style>
```

<br/>
<hr/>

## Vue - Route를 사용한 페이지 이동

- 방법 1 : `<router-link to="내가 사용할 링크"></router-link>`
  -  **:to="'url' + data"** 를 사용하면 데이터값을 추가해서 사용이 가능하다.
    - ex)  `<router-link :to="'/Detail/' + idx"></router-link>`
- 방법 2 : `@click="$router.push('URL')"` 
  - ex)  `<h5 @click="$router.push('/detail/'+idx)">{{item.title}}</h5>` 
- 번외 : `<h5 @click="$router.go(-1)">뒤로가기 [숫자에 따라 페이지 개수 지정 가능]</h5>` 페이지 앞, 뒤 이동도 가능함

### 주의사항
- `$route`와 `$router`는 다른 명렁어이다!
  - `$route`는 데이터 또는 path정보를 가져옴
- `$router`는 페이지 이동등을 시킬 수 있음

<br/>
<hr/>

## Vue - Route의 자식 Route 사용 방법 

#### `"/detail/1/author"`, `"/detail/1/comment"`와 같이 Url을 이어서 사용 하는것이다.

### 사용 방법
- router 설정한 .js파일에 추가해 주면된다.   
  - 주의사항 : 절대경로가 아닌 상대경로로 지정해줘야한다.

✅ Router.js
```javascript
import { createWebHistory, createRouter } from "vue-router";

// Router에 import할 component를 추가
import List from "./components/List.vue"
import Home from "./components/Home.vue"
import Detail from "./components/Detail.vue"

// Child Router import
import Author from "./components/Author.vue"
import Comment from "./components/Comment.vue"

/**
 * path에 맞는 url 접속 시 지정된 component로 이동 시켜준다.
 */
const routes = [
  {
    path: "/list",
    component: List,
  },
  {
    path: "/",
    component: Home,
  },
  {
    path: "/Detail/:id",
    component: Detail,
    children :  [
      // ✅ '/'를 뺴줘여함 상대경로로 해야한다.
      {
        path : "author",
        component : Author
      },
      {
        path : "comment",
        component : Comment
      },
    ]
  },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router; 
```

<br/>
<hr/>

## Vue - Router Mode


#### mode의 종류는 2가지가 있다
- 1 . History Mode

✅ Router.js - HistoryMode
```javascript
import { createWebHistory, createRouter } from "vue-router";

const routes = [/** component */ ];

const router = createRouter({
  // 👉 모드 지정
  history: createWebHistory(),
  routes,
});

export default router; 
```

- 2 . Hash Mode

✅ Router.js - HashMode
```javascript
import { createWebHashHistory, createRouter } from "vue-router";

const routes = [/** component */ ];

const router = createRouter({
  // 👉 모드 지정
  history: createWebHashHistory(),
  routes,
});

export default router; 
```

### 사실상 Hash 모드는 SEO 문제와 URL 자체에 "#"이 들어가는 문제가있어  개인적으로는 지양한다

- 그래도 사용하는 이유는 vue에서 라우팅 전에 서버가 채가는것을 방지함
  - /*/가 url 뒤에 붙으면 서버에 내용이 전달되지 않기 때문이다. 

<br/>
<hr/>

## Vue - Navigation guards

### 특정 URL로 접근 시 실행 시켜야할 로직이 있을 경우 사용
- hook과 유사하나 차이점이 있다면 hook의 경우는 라이프사이클 훅으로 내가 설정한 훅의 조건에  따라 실행되는 반면에  
`beforeEnter`는 Vue 라우터의 네비게이션 가드로서 라우트 진입전에 실행되고 어떠한 경로로 들어왔는지 알수있다.
- 네이게이션가드의 경우 특정 조건에 따라 라우트 진입을 허용 또는 방지 할수 있기에 사용자 인증 사앹를 확인하거나 특정 데이터를  
로드하는데 사용된다.
- 단 해당 방법은 javascript로 실행 되기에 서버단에서도 조치를 해줘야한다.

#### `return false`를 통해 접근을 방지 할 수 있다.

### 사용 방법 - 1

- Router 설정 파일에서의 설정

✅ Router.js 
```javascript
import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/list",
    component: List,
    // ✅ beforeEnter를 사용하여 네비게이션 사용
    beforeEnter: (to, from) => {
      console.log(to);    // 💬 목적지 정보
      console.log(from);  // 💬 출발지 정보
      return false;       // 💬 튕겨내기가 가능하다
    }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router; 
```

### 사용 방법 - 1 - 2

- Router 설정 파일에서의 설정 - 복수 지정

✅ Router.js
```javascript
import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/list",
    component: List
  },
  {
    // Code..
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router에 적용
router.beforeEach((to, from) => {
  //페이지 변경 전에 실행할 코드
})

export default router; 
```

### 사용 방법 - 2
- vue 파일 내부에서의 네비게이터 가드 사용 방법  

✅ 적용하고 싶은 Vue 파일
```html
<template></template>

<script>
export default {
    name : "List-Component",
    data(){ return { } },
    props :{ }
    ,methods :{ }
    // ✅ beforeRouteEnter()를 사용하여 접근
    , beforeRouteEnter (to, from) {
      console.log("----------------");
      console.log("해당 Vue 파일에서의 네이게이터 가드 접근");
      console.log(to);
      console.log(from);
      console.log("----------------");
    }
}
</script>

<style></style>
```

<br/>
<hr/>

## Slot 

### Slot 이란?
- props을 사용하지 않아도 부모의 데이터를 자식에게 넘겨줄수 있다.
- 간단하게 화면에 보여줄 데이터라면 활용하기 좋다.

### 장점 
- 직관적이다.
- html 태그 자체로도 넘겨줄 수 있다.
- 간단하다.

### 단점
- 갯수가 많아지면 점점 복잡해진다.
- 자식 자체에서 html태그 자체게 개입이 불가능하다 :class , :id, v-for문 등등.

### 사용방법
- 부모 컴포넌트에서 자식 컴포넌트를 호출시 `<자식컴포넌트>여기에다 데이터를 넣으면 전달 됩니다.</자식입니다.>` 방법으로 전달
- 자식 컴포넌트에서는 `<slot></slot>` 하나만 넣어주면 해당 위치에 넘겨준 값이 들어온다.


- 다건의 `slot`을 사용하고 싶은 경우
  - 부모 컴포넌트 
    - `<template v-slot:내가 지정한 이름>`을 부모 컴포넌트에서 지정을 해주고
  - 자식 컴포넌트
    - `<slot name ="a"></slot>`부모에서 넘겨주는 이름을 맞춰서 **name**에 맞춰준다.  
    
✅ 부모 컴포넌트
```html
<template>
    <FilterBox v-bind:updateImgURL="updateImgURL" v-bind:filterArr="filterArr">
        <template v-slot:a><h1>1</h1></template>
        <template v-slot:b>2</template>
    </FilterBox>
</template>
```
✅ 자식 컴포넌트
```html
<template>
  <!-- 슬롯 생성  -->
  <slot name ="a"></slot>
  <slot name ="b"></slot>
</template>
</template>
```

<br/>
<hr/>

## mitt 라이브러리

### mitt 라이브러리란

- 자식 컴포넌트에서 부모 컴포넌트에 데이터를 전달하기 위해서는 `$emit`을 사용해야하는데 이것이 자식 -> 부모 -> 부모 .. 가 될 경우  
 계속해서 `$emit`을 사용 후 `@작명한이름` -> `$event`를 사용해서 데이터를 받아야하는 번거로움이 있는데 **mit**을 사용하면 간단하게 해결 가능  

### 단점
- mitt 라이브러리 사용의 개수가 증가 할수록 네이밍 및 어디서 사용됐는지 파악이 어려워짐 **개수가 늘어나먼 오히려 불편해짐**

### 그렇다면?
- vuex를 사용한다.


### 사용 방법
- 1 . mitt 라이브러를 설치해준다. 
  - `npm install mitt`
- 2 . main.js에서 사용할 라이브러리 지정 **만약 라이브러리를 추가하여 사용할 경우 아래와 같이 방법으로 설정해주면 된다.**
  - mitt 라이브러리 import 
  - 초기 설정이었던 `createApp(App)`를 변수로 할당 
  - mitt를 함수 변수로 지정
  - App의 config -> globalProperties -> emitter에 지정
  - App을 mount()할 위치 지정

✅ main.js
```javscript
import { createApp } from 'vue'
import App from './App.vue'

// 👉 1. mitt 라이브러리  추가
import mitt from "mitt"

// 👉 2. createApp(App)을 변수로 할당 [상단에 import한 App 추가]
const app = createApp(App);

// 👉 3. mitt라이브러르를 함수 변수로 생성
const emitter = mitt();

// 👉 4. app의 config -> globalProperties에 추가
app.config.globalProperties.emitter = emitter;

// 👉 5. 기존 사용중이던 createApp(App)를 변수로 변경된것으로 수정
// ❌ createApp(App).mount('#app')
app.mount('#app');
```

- 3 . 데이터를 보낼 자식 컴포넌트에서 `this.emitter.emit("내가 작명할 이벤트명", 데이터);`를 사용하여 데이터 전송  
  - 아래 코드에서의 `emiiter`인 이유는 **main.js에서** `globalProperties.emitter`로 지정했기 때문이다.

✅ 자식.vue
```html
<template>
    <button @click="fire">버튼</button>
</template>

<script>
export default {
    name : "FilterBoxComponent",
    methods:{
        fire(){
            // 👉 mitt 이벤트 실행 방법
            //this.emitter.emit("작명", 데이터);
            this.emitter.emit("mittTest",30);
        }
    }
}
</script>
```

- 4 . 부모에서 사용 될 떄는 대게 `mounted()`에서 불러 사용된다.
  ✅ 부모.vue
```html
<template></template>

<script>
export default {
  name: 'App',
  mounted(){
    // 👉 자식 컴포넌트에서 "내가 지정한 이벤트명"
    this.emitter.on("mittTest",(data)=>{
      console.log("부모 컴포넌트!");
      console.log(data);
      console.log("-----------");
    })
  }
}
</script>

<style></style>
```

<br/>
<hr/>

## Vuex

### Vuex란?
- Vuex를 사용하지 않고 데이터 전달 방법
  - 부모가 자식에게 데이터를 전달하려면 :: **[부모]**  `v-bind:명싱="대상"` -> **[자식]** `props:{ /**...*/}` 을 사용 하거나
  - 자식이 부모에게 데이터 전달 시 :: **[자식]** `$emit("명칭",데이터)` ->  **[부모]** : `@자식에서 만든 명칭($event)`를 사용 
  - mitt 라이브러리 사용 :: **[자식]** `this.emitter.emit("작명", 데이터)` ->  **[부모]** ` this.emitter.on("작명",(data)=>{})`
- 위와 같은 방벙이 있지만 많은 양의 데이터를 핸들링 하기에는 코드양이 많아지고 관리하기가 힘들다는 문제가있다.   
그렇기에 **Vuex를** 사용하면 **한가지 .js 파일**에서 
**모든 데이터를 핸들링이 가능하다.**

### 사용 방법
- 1 . Vuex 설치
  - `npm install vuex@next` 
- 2 . Vuex 설정할 js파일 추가
  - 기본적으로 파일 작명을 **store.js**로 하는것이 일반적이다.

```javascript
  // 👉 설치한 vuex를 import
  import { createStore } from 'vuex'
  
  // 👉 createStore()를 사용하여 store 생성
  const store = createStore({
    state(){
      return {
       // 👉 데이터 추가
        name : "kim"
      }
    },
  })
  
  // 👉 export store  
  export default store
```

- 3 . main.js에 vuex설정 파일 import 후 `use()`에 추가

```javscript
import { createApp } from 'vue'
import App from './App.vue'

// vuex 추가
import store from "./store.js" // 👉 .js를 붙여주자 안붙여주니 안나옴

// createApp(App)을 변수로 할당 [상단에 import한 App 추가]
const app = createApp(App);

app
.use(store)     // 👉 vuex(스토어) 추가
.mount('#app');
```

- 4 . 컴포넌트에서 사용
```html
  <template>
    <!-- {{$store.state.내가 지정한 명칭}}으로 불러서 사용 -->
    <h4>안녕 {{$store.state.name}}</h4>
    <!--  👎 이런식으로 변경하면 안된다!! -->
    <button @click=" $store.state.name = 'yoo' ">store 값 변경</button>
  </template>
```