const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList"),
  toDoComList = document.querySelector(".js-toDoComList"),
  toDoClear = document.querySelector(".delToDoComBtn");

const TODOS_LS = "toDos";
const TODOCOM_LS = "toDoComplete";

// cleanToDos 로 변경되어야 하기 때문에 let으로 변경!!
let toDos = [];
let toDoComplete = [];

function deleteToDo(event) {
  //dir 로 하면 사용할 수 있는거 다 알려줌 개꿀팁~~!!
  // console.log(event.target.parentNode.id);
  const btn = event.target;
  const li = btn.parentNode;
  const complete = li.childNodes[1].innerText;

  toDoList.removeChild(li);
  // filter은 array의 모든 아이템을 통해 함수를 실행하고
  // true인 아이템들만 가지고 새로운 array를 만들고
  const cleanToDos = toDos.filter(function (toDo) {
    // 모든 toDos가 li의 id와 같지 않을때
    return toDo.id !== parseInt(li.id);
  });
  // 바뀐 ToDos로 변경해주고
  toDos = cleanToDos;
  // 다시 저장해준다.
  saveToDos();
  paintToDoComplete(complete);
}

function backToDo(event){
  console.log(event.target.parentNode.id);
  const btn = event.target;
  const li = btn.parentNode;
  const backToDo = li.childNodes[1].innerText;

  toDoComList.removeChild(li);
  // filter은 array의 모든 아이템을 통해 함수를 실행하고
  // true인 아이템들만 가지고 새로운 array를 만들고
  const cleanToDoCom = toDoComplete.filter(function (toDoCom) {
    // 모든 toDos가 li의 id와 같지 않을때
    return toDoCom.id !== parseInt(li.id);
  });
  // 바뀐 ToDos로 변경해주고
  toDoComplete = cleanToDoCom;
  // 다시 저장해준다.
  saveToDoComplete();
  paintToDo(backToDo);
}

// localStorage에는 자바스크립트의 data를 저장할 수 없다.
// localStorage에 있는 모든 데이터를 string으로 저장하려고 한다.
function saveToDos() {
  // JSON.stringify는 자바스크립트 object를 string으로 변경해준다.
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function saveToDoComplete(){
  localStorage.setItem(TODOCOM_LS, JSON.stringify(toDoComplete));
}

function clearToDo(){
  // 리스트 전체 삭제 
  while(toDoComList.firstChild){
    toDoComList.firstChild.remove();
  }
  toDoComplete = [];
  localStorage.setItem(TODOCOM_LS, JSON.stringify(toDoComplete));
}

function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;

  delBtn.innerText = "❎";
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = text;
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: toDos.length + 1,
  };

  toDos.push(toDoObj);
  saveToDos();
}

function paintToDoComplete(text){
  const li = document.createElement("li");
  const backBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDoComplete.length + 1;

  backBtn.innerText = "✅";
  backBtn.addEventListener("click", backToDo);
  span.innerText = text;
  li.appendChild(backBtn);
  li.appendChild(span);
  li.id = newId;
  toDoComList.appendChild(li);
  const toDoComObj = {
    text: text,
    id: toDoComplete.length + 1,
  };

  toDoComplete.push(toDoComObj);
  saveToDoComplete();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedtoDos = localStorage.getItem(TODOS_LS);
  if (loadedtoDos != null) {
    // String인 것을 원래의 데이터로 변경해준다.
    const parsedToDos = JSON.parse(loadedtoDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
}

function loadToDoCom() {
  const loadedtoDoCom = localStorage.getItem(TODOCOM_LS);
  if (loadedtoDoCom != null) {
    // String인 것을 원래의 데이터로 변경해준다.
    const parsedToDoCom = JSON.parse(loadedtoDoCom);
    parsedToDoCom.forEach(function (toDoCom) {
      paintToDoComplete(toDoCom.text);
    });
  }
}

function init() {
  loadToDos();
  loadToDoCom();
  toDoForm.addEventListener("submit", handleSubmit);
  toDoClear.addEventListener("click", clearToDo);
}

init();
