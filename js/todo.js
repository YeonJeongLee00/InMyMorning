const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

// cleanToDos 로 변경되어야 하기 때문에 let으로 변경!!
let toDos = [];

function deleteToDo(event) {
  //dir 로 하면 사용할 수 있는거 다 알려줌 개꿀팁~~!!
  console.log(event.target.parentNode.id);
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  // filter은 array의 모든 아이템을 통해 함수를 실행하고
  // true인 아이템들만 가지고 새로운 array를 만들고
  const cleanToDos = toDos.filter(function (toDo) {
    // 모든 toDos가 li의 id와 같지 않을때
    return toDo.id != li.id;
  });
  // 바뀐 ToDos로 변경해주고
  toDos = cleanToDos;
  // 다시 저장해준다.
  saveToDos();
}

// localStorage에는 자바스크립트의 data를 저장할 수 없다.
// localStorage에 있는 모든 데이터를 string으로 저장하려고 한다.
function saveToDos() {
  // JSON.stringify는 자바스크립트 object를 string으로 변경해준다.
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}
function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;

  delBtn.innerText = "❌";
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

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
