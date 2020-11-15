const form = document.querySelector(".js-form"),
  input = form.querySelectorAll("input"),
  greeting = document.querySelector(".js-greeting");

const USER_LS = "currentUser",
  SHOWING_CN = "showing";

function saveInfo(info) {
  let interest = []
  for (let i = 3; i <info.length - 1; i++) {
    interest = info[i];
  }
  localStorage.setItem(USER_LS, info[0]);
  localStorage.setItem("sex", info[1]);
  localStorage.setItem("birth", info[2]);
  localStorage.setItem("interest", interest);
  localStorage.setItem("area", info[info.length-1])
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
  info_list[2] = input[3].value + "" + input[4].value + "" + input[5].value;
  // interest
  for(let i  = 6; i < 12; i++) {
    if(input[i].checked == true){
      info_list[index] = input[i].value;
      index++;
    }
  }
  // area
  info_list[index] = input[12].value;

  const currentValue = input.value;
  paintGreeting(currentValue);
  saveInfo(info_list);
}

// 이름 요청
function askForName() {
  // form을 보여준다. 이름을 입력 받음
  form.classList.add(SHOWING_CN);
  // (반응할 이벤트 유형, 이벤트가 발생했을때 알림을 받는 객체, option)
  form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
  console.log(form.classList)
  form.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  greeting.innerText = `안녕하세요. ${text}님 ☺️`;
}

function loadName() {
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
