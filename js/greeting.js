const form = document.querySelector(".js-form"),
  input = form.querySelectorAll("input"),
  greeting = document.querySelector(".js-greeting"),
  title = document.querySelector(".js-title"),
  hide_element = document.querySelectorAll(".row-info"),
  remove_element = document.querySelector(".div-form"),
  background_setting = document.querySelector("body");


const USER_LS = "currentUser",
  SHOWING_CN = "showing";

function saveInfo(info) {
  let interest = []
  
  let index = 0;
  for (let i = 3; i < info.length; i++) {
    interest[index] = info[i]; 
    index++;
  }
  localStorage.setItem(USER_LS, info[0]);
  localStorage.setItem("sex", info[1]);
  localStorage.setItem("birth", info[2]);
  localStorage.setItem("interest", interest);
}

function handleSubmit(event) {
  // 이벤트를 취소, form에서 enter를 눌렀을 때 그 이벤트 취소
  // 기본동작 막기
  event.preventDefault();
  let info_list = []
  let index = 3;
  
  // name
  info_list[0] = input[0].value; 
  // sex
  if(input[1].checked == true){ 
    info_list[1] = input[1].value;
  }else if(input[2].checked == true){
    info_list[1] = input[2].value;
  }
  // birth
  const temp = input[3].value;
  info_list[2] = temp.replace(/-/gi, "");
  // interest
  for(let i  = 4; i < 10; i++) {
    if(input[i].checked == true){
      switch(i){
        case 4: // 정치
          info_list[index] = "pol";
          break;
        case 5: // 경제 
          info_list[index] = "eco";
          break;
        case 6:  // 사회
          info_list[index] = "soc";
          break;
        case 7: // 생활/문화
          info_list[index] = "lif";
          break;
        case 8: // 세계
          info_list[index] = "wor";
          break;
        case 9: // IT/과학
          info_list[index] = "sci";
          break;
      }
      index++;
    }
  }
 
  const currentValue =  input[0].value;
  paintGreeting(currentValue);
  saveInfo(info_list);
}

function hideElement(){
  hide_element[0].style.display = "none";
  hide_element[1].style.display = "none";
}

function showElement(){
  hide_element[0].style.display = "block";
  hide_element[1].style.display = "block";
}

// 이름 요청
function askForName() {
  hideElement();
  // form을 보여준다. 이름을 입력 받음
  form.classList.add(SHOWING_CN);
  // (반응할 이벤트 유형, 이벤트가 발생했을때 알림을 받는 객체, option)
  form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
  remove_element.remove();
  // remove_element.style.display = "none";
  paintTitle();
  showElement();
  greeting.classList.add(SHOWING_CN);
  greeting.innerText = `안녕하세요. ${text}님 👋🏻`;
}

function paintTitle(){
  title.classList.add(SHOWING_CN);
  title.innerText = "In My Morning";
}

function imageSetting(){
  var randomNum = Math.random();
  var index = Math.floor( randomNum * 4 + 1 );
  var background_string = "background" + index;
  
  background_setting.style.backgroundImage= `url(..//src/${background_string}.jpg)`;
}

function loadName() {
  imageSetting();
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser == null) {
    // is not
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}

init();
