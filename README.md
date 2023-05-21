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