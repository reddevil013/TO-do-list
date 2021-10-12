
let fileName;
let currentList;

const input = document.getElementById("input");
const addButton = document.getElementById("input-btn1");
const list = document.getElementById("list-append-area");
const deleteButton = document.getElementById("input-btn2");
const saveButton = document.getElementById("saveButton");
const folderButton = document.getElementById("folderButton")


input.addEventListener("keyup", readInput);
addButton.addEventListener("click",readInput);
deleteButton.addEventListener("mouseup",clearSelectedElements);
document.addEventListener("DOMContentLoaded",renderList)
saveButton.addEventListener("click",saveFile);
folderButton.addEventListener("click",folderButtonAction);
window.addEventListener("unload",saveCurrentList);

function clearSelectedElements(){
    const selectedElements = document.querySelectorAll(".strike-through");
    selectedElements.forEach((element)=>{
        remove(element.parentElement);
    });
}


function readInput(event){

    if (event.type=="click" && input.value !== ""){
        appendElement(event,input.value);
        input.value = "";
    }
    if(event.type=="keyup" && input.value !== "" && event.keyCode===13){
        appendElement(event,input.value);
        input.value = "";
    }
}   


function appendElement(event,string){
    const divP = document.createElement("div");
    const div1 = document.createElement("div");
    const div2 = document.createElement("div");
    const div3 = document.createElement("div");

    divP.setAttribute("class","row pb-3 justify-row");
    divP.setAttribute("draggable","true")
    div1.setAttribute("class","col-2 input-button-col")
    div2.setAttribute("class","col-8 input-colP")
    div3.setAttribute("class","col-2 input-button-col")
    
    divP.appendChild(div1)
    divP.appendChild(div2)
    divP.appendChild(div3)

    const buttonT = document.createElement("button");
    const buttonC = document.createElement("button");
    const para = document.createElement("p");

    buttonT.setAttribute("class","input-btnt")
    buttonC.setAttribute("class","input-btnc")
    
    const img1 = document.createElement("img");
    const img2 = document.createElement("img");

    img1.setAttribute("src","images/tick.png");
    img1.setAttribute("class","input-button-img");
    img1.setAttribute("draggable","false")
    
    img2.setAttribute("src","images/close.png");
    img2.setAttribute("class","input-button-img");
    img2.setAttribute("draggable","false")

    buttonT.appendChild(img1);
    buttonC.appendChild(img2);

    div1.appendChild(buttonT);
    div3.appendChild(buttonC);
   
    para.setAttribute("class","todo-text");
    para.innerHTML = string;
    div2.appendChild(para);  

    list.appendChild(divP);
    buttonT.setAttribute("onClick","strike(this)");
    buttonC.setAttribute("onClick","remove(this.parentElement.parentElement)");
    divP.addEventListener("dragstart",dragFunction);

    if (event!=="render"){
        currentList.push(string);
    }
}

function strike(event){
    event.parentElement.nextElementSibling.classList.toggle("strike-through");
}

function remove(event){
    const val = event.getElementsByClassName("todo-text")[0].innerHTML;
    currentList.splice(currentList.indexOf(val),1);
    event.classList.add("remove-element-transition");
    event.addEventListener("transitionend",function (eventi){
        eventi.target.classList.add("remove-element");
    });
}

// ....................................................................................
    // <div class="row pt-5 justify-row" draggable="true">
    //     <div class="col-2 input-button-col">
    //         <button class="input-btnt"><img src="images/tick.png" class="input-button-img"></button>
    //     </div>
    //     <div class="col-8" id="input-col">
    //         <p class="todo-text">Lorem ipsum dolor sit amet.</p> 
    //     </div>
    //     <div class="col-2 input-button-col">
    //         <button class="input-btnc"><img src="images/close.png" class="input-button-img"></button>
    //     </div>
    // </div>
// ...............................................................................................

// .............draf functionality...............

let initial_pos_element;
let final_pos_element;

function dragFunction(event){
    
    event.target.classList.add("dragging");

    event.target.addEventListener("dragend",()=>{
        event.target.classList.remove("dragging");
        updateCurrentList(initial_pos_element,final_pos_element)
    })
}

list.addEventListener("dragover",(eventi)=>{
    eventi.preventDefault();
    const position = getPosition(eventi.clientY)
    //console.log(position);
    const dragging = document.querySelector(".dragging");
    initial_pos_element = dragging
    final_pos_element = position
    if (position!==null) console.log();
    if(position === null){
        list.insertBefore(dragging,list.firstElementChild);
    }else{
        list.insertBefore(dragging,position.nextElementSibling);
    }
});

function getPosition(yOffset){
    const listItems = [...list.querySelectorAll('[draggable="true"]:not(.dragging,.remove-element)')];
    //console.log(listItems)
    return listItems.reduce((closest,child)=>{
        const box = child.getBoundingClientRect();
        const offset = yOffset - box.top - (box.height/2);
        //console.log(offset,yOffset,box.top,box.height);
        if(offset>0 && closest.offset>0 && offset<closest.offset){
            return {offset: offset, element: child};
        }else if(offset>0 && offset>closest.offset){
            return {offset: offset, element: child};
        }else{
            return closest;
        }
    }, {offset: Number.NEGATIVE_INFINITY, element: null}).element;
}


// ...............local storage funtionality......................

function checkSessionStorage(){
    
    return (sessionStorage.getItem("currentList")==null) ? false : true;
}

function renderList(){
    if(checkSessionStorage()){
        currentList = JSON.parse(sessionStorage.getItem("currentList"));
        currentList.forEach((element)=>{
            appendElement("render",element);
        });
        fileName = JSON.parse(sessionStorage.getItem("fileName"));
    }else{
        currentList = [];
        sessionStorage.setItem("todoList",JSON.stringify({}));
        sessionStorage.setItem("fileName",JSON.stringify(""));
    }
}

function saveCurrentList(){
    sessionStorage.setItem("currentList",JSON.stringify(currentList));
    sessionStorage.setItem("fileName",JSON.stringify(fileName));
}

function folderButtonAction(){
    if (currentList.length>0) fileName ? saveFile("folder") :(confirm("Do you want to save current file")? saveFile("folder") : currentList=[]);
    location.href = "folders.html";
}

function saveFile(event){
    const todoList = JSON.parse(sessionStorage.getItem("todoList"));
    if (fileName){
        saveFileHandler(fileName,todoList)
    }else{
        fileName = prompt("Enter File name");
        fileName ? (todoList[fileName] ? (confirm("File name already exists, do you want to override") ?  saveFileHandler(fileName,todoList) : overrideRejectHandler(event)): saveFileHandler(fileName,todoList)) : alert("File not saved");
    }
    if (event==="folder"){
        currentList = [];
        fileName = "";    
    }else{
        alert("Save Success!!");
    }
}

function overrideRejectHandler(event){
    fileName = "";
    saveFile(event);
}

function saveFileHandler(fileName,todoList){
    todoList[fileName] = currentList;
    sessionStorage.setItem("todoList",JSON.stringify(todoList));
    sessionStorage.setItem("fileName",JSON.stringify(fileName));
}

function updateCurrentList(initial_pos_element,final_pos_element){
    const initial_pos_value = initial_pos_element.getElementsByTagName("p")[0].innerHTML;
    const initial_pos_index = currentList.indexOf(initial_pos_value); 
    if (final_pos_element !== null){
        currentList.splice(initial_pos_index,1); 
        currentList.splice(currentList.indexOf(final_pos_element.getElementsByTagName("p")[0].innerHTML)+1,0,initial_pos_value);
    }else if(initial_pos_index!==0){
        currentList.splice(initial_pos_index,1); 
        currentList.splice(0,0,initial_pos_value);
    }
}
