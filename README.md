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