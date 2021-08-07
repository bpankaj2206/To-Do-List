
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//variables
let LIST,id;



// get items from local storage
let data=localStorage.getItem("TODO");
if(data){
    LIST=JSON.parse(data);
    id=LIST.length; //set the id to the last one in the list
    loadList(LIST); //load the list to user interface
}
else{
    LIST=[];
        id=0;
}

//LOADITEMS TO USER INTERFACE
function loadList(array){
    array.forEach(element => {
        addToDo(element.name,element.id,element.done,element.trash);
    });
}


//CLEAR THE LOCAL STORAGE

clear.addEventListener("click",function(){
    localStorage.clear();
     location.reload();
})


//show todays date
const options = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-IN", options);


//add to do function
function addToDo(toDo,id,done,trash) {
    if(trash){ return ; }
    const DONE=done? CHECK : UNCHECK;
    const LINE=done? LINE_THROUGH : "";
    const item =`<li class="item">
                <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                <p class="text ${LINE}">${toDo}</p>
                <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                </li>`;
    const position="beforeend";
    list.insertAdjacentHTML(position,item);
}

// add a item to the list when user hit the enter key

document.addEventListener("keyup",function(event){
    if(event.keyCode === 13){
        const toDo= input.value;
    
        //if the input isn't empty
        if(toDo){
                addToDo(toDo,id,false,false);

                LIST.push({
                    name:toDo,
                    id:id,
                    done:false,
                    trash:false
                });
        }
        //add items to local storage ( this code must be written every where when we update our list array)
        localStorage.setItem("TODO",JSON.stringify(LIST));
        input.value=""; 
        id++;
    }
});

// addToDo("coffee",1, false, false);

//complete to do
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done=LIST[element.id].done?false:true;
}

function  removeToDo(element)
{  element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash=true;
        
}

list.addEventListener("click",function(event){
    const element=event.target;

    const elementJob=element.attributes.job.value;
    if(elementJob == "complete")
    {  
        completeToDo(element);
    }
    else if(elementJob=="delete"){
       
         removeToDo(element);
    }

    //add items to local storage ( this code must be written every where when we update our list array)
    localStorage.setItem("TODO",JSON.stringify(LIST));
});