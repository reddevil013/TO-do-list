
const todoList = JSON.parse(sessionStorage.getItem("todoList"));

const folderArea = document.getElementById("list");
const nofolderArea = document.getElementById("noFolderArea");
const createNewButton = document.getElementById("createNew");
const deleteButton = document.getElementById("deleteButton")

window.addEventListener("unload",()=>{
    sessionStorage.setItem("todoList",JSON.stringify(todoList));
});

createNewButton.addEventListener("click",()=>{
    location.href = "index.html";
});

deleteButton.addEventListener("click",()=>{
    const selected = document.querySelectorAll(".strike-through");
    selected.forEach((element) => {
        deleteFolder(element);
    });
});

if (size(todoList)){
    for(let element in todoList){
        appendTOFolder(element,"custom-card");
    }
}else{
    appendTOFolder("No saved TO-do lists","row mt-4 no-folders");
}

function appendTOFolder(text,customClass){
    const div = document.createElement("div");
    const p = document.createElement("p");

    div.setAttribute("class",customClass);
    p.innerHTML = text;

    div.appendChild(p);

    if(customClass==="custom-card"){
        const buttonT = document.createElement("button");
        const buttonC = document.createElement("button");

        buttonT.setAttribute("class","input-btnt")
        buttonC.setAttribute("class","input-btnc ml-4")
        
        const img1 = document.createElement("img");
        const img2 = document.createElement("img");

        img1.setAttribute("src","images/square_tick.png");
        img1.setAttribute("class","input-button-img");
        
        img2.setAttribute("src","images/square_delete.png");
        img2.setAttribute("class","input-button-img");

        buttonT.appendChild(img1);
        buttonC.appendChild(img2);

        div.appendChild(buttonT);
        div.appendChild(buttonC);
        folderArea.appendChild(div);

        div.setAttribute("onclick","renderList(this)");
        buttonT.setAttribute("onclick","event.stopPropagation();selectFolder(this);");
        buttonC.setAttribute("onclick","event.stopPropagation(); deleteFolder(this.parentElement);");

    }else{
        nofolderArea.appendChild(div);
    }
}

// .......................................................
    // <div class="customClass">
    //     <p>text</p>
    //     <button id="input-btn1"><img src="images/square_tick.png" class="input-button-img"></button>
    //     <button class="ml-4" id="input-btn2"><img src="images/square_delete.png" class="input-button-img"></button> 
    // </div>
// .............................................................

function renderList(event){
    console.log(event) 
    const fileName = event.firstElementChild.innerHTML;
    const currentList = todoList[fileName];
    sessionStorage.setItem("currentList",JSON.stringify(currentList));
    sessionStorage.setItem("fileName",JSON.stringify(fileName));
    location.href = "index.html";
}

function selectFolder(event){
    event.parentElement.classList.toggle("strike-through");
}

function deleteFolder(event){
    delete todoList[event.firstElementChild.innerHTML];
    event.classList.add("remove-element-transition");
    event.addEventListener("transitionend",function (eventi){
        eventi.target.classList.add("remove-element");
    });
}

function size(todoList){
    let size = 0;
    for(let i in todoList){
        size++;
        if (size>0){
            return true;
        }
    }
    return false; 
}



