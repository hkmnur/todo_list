//Todo Eleman Ekleme

//Eleman Seçimi

//const sabit let değişken
const form = document.querySelector("form");
const input = document.querySelector("#txtTaskName");
const btnAddNewTask = document.querySelector("#btnAddNewTask");
const btnDeleteAll = document.querySelector("#btnDeleteAll");
const taskList = document.querySelector("#task-list"); //ul
// const items = ["Todo 1", "Todo 2", "Todo 3", "Todo 4"];
let todos;

//load items
loadItems();

eventListeners();

function eventListeners() {
  //submit event
  form.addEventListener("submit", addNewItem);
  //delete an item
  taskList.addEventListener("click", deleteItem);
  //delete all item
  btnDeleteAll.addEventListener("click", deleteAllItems);
}

function loadItems() {
  todos=getItemsFromLS();
  todos.forEach(function (item) {
    creatItem(item);
  });
}

//get items from local storage:depolama
function getItemsFromLS(){
  if(localStorage.getItem("todos")===null){
    todos =[];
  }
  else{
    todos=JSON.parse(localStorage.getItem("todos"));//bu yapı gelen veriyi array e dönüştürür
  }
  return todos;

}
//set item to Local Storage
function setItemToLS(newTodo){
  todos=getItemsFromLS();
  todos.push(newTodo);
  localStorage.setItem("todos",JSON.stringify(todos));


}


function creatItem(newTodo) {
  //li oluşturma
  const li = document.createElement("li");
  li.className = "list-group-item list-group-item-secondary";
  li.appendChild(document.createTextNode(newTodo)); //input alanında girilen değerin li ye bağlanması gerekiyor append child ile yapıldı

  //a oluşturma

  const a = document.createElement("a");
  a.classList = "delete-item float-right";
  a.setAttribute("href", "#");
  a.innerHTML = '<i class="fas fa-times"></i>';
  li.appendChild(a);
  taskList.appendChild(li);
}

function addNewItem(e) {
  if (input.value === "") {
    //input alanına veri girilip girilmediğini sorguluyoruz
    alert("add new item");
    //console.log("submit");
  } else {
    creatItem(input.value);

    setItemToLS(input.value);

    input.value = "";
  }

  e.preventDefault(); //sayfa da refresh olayı gerçekleştiğinden kaynaklı  onu engellemek adına  prevent:önlemek varsayılanı önlemek
}

//Eleman Silme

function deleteItem(e) {
  //console.log(e.target);elemanı consol'a yazdırma

  if (e.target.className === "fas fa-times") {
    if (confirm("Silmek istediğinize emin misiniz?")) {
      //console.log(e.target);
      e.target.parentElement.parentElement.remove();
      deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
    }
  }
  e.preventDefault();
}


function deleteTodoFromStorage(deletetodo){
  let todos=getItemsFromLS();
  todos.forEach(function(todo,index){
    if(todo=== deletetodo){
      todos.splice(index,1);
    }
  });
  localStorage.setItem("todos",JSON.stringify(todos));
}

//Tüm Elemanları Silmek

function deleteAllItems(e) {
  if (confirm("Tüm elemanları silmek istediğinize emin misiniz?")) {
    while(taskList.firstChild){
      taskList.removeChild(taskList.firstChild);
    }
    localStorage.clear();
  }
  //alternatif yöntem
  // taskList.innerHTML="";
}
