
document.addEventListener("DOMContentLoaded", createArray);

let arrayLength = 6;

let array = new Array(arrayLength)



//test

//set a head and tail 

let head = (arrayLength / 3);
let tail = (arrayLength / 3)* 2;

let size = tail - head +1;

let fill = 0;



const container = document.getElementById("ring-buffer");
const sizeDisplay = document.getElementById("size");

sizeDisplay.innerHTML="Size: "+ size;

const secret = document.getElementById("secret");
const max = document.getElementById("max");
max.innerHTML = "Buffer Size: " + arrayLength;


function createArray() {

    for (let i=0; i<arrayLength; i++)
{
    if (i === head) { fill = 1;}
    
    array[i] = fill;

    if (i === tail) { fill = 0;}
}

 for (let i=0; i<arrayLength; i++) {

        //does this work ?? 
        let element = document.createElement("div");

        element.setAttribute("data-number", i);


        if (array[i] == 1) {
            element.className="active";

            if (i === head) {element.id="head"; element.innerHTML = "H";}
            if (i === tail) {element.id="tail";element.innerHTML = "T";}


        } else {

            element.className = "ring";

        }

        container.appendChild(element);
    }
    
}

function enqueue() { //fails on end 
//add to tail
let currentTail;
if(size == 0) {
    head=1;
    tail=1;
    currentTail = document.querySelector(`div[data-number="${tail}"]`);
    console.log(currentTail);

    currentTail.id="headTail"; currentTail.innerHTML = "HT";
    size++;
    sizeDisplay.innerHTML="Size: "+ size;
    secret.innerHTML=null;
    return;
}
if(size == 1) {
    currentTail = document.getElementById("headTail");
}
else {
    currentTail = document.getElementById("tail");
}

tail++; 
size++;

if (size > 75) {
secret.innerHTML = "Dude stop";
tail--;
size--;
    
return;

}


 

sizeDisplay.innerHTML="Size: "+ size;


if (tail == arrayLength){
    tail = tail % arrayLength; //i know im supposed to do modulo here but bear with me 
}
if (tail == head && size>1) {
    
    resize();
} 



let next = document.querySelector(`div[data-number="${tail}"]`);

next.id="tail"; next.innerHTML = "T";

currentTail.className="active";

if (size==2){
currentTail.removeAttribute("id");
currentTail.id= "head";
currentTail.innerHTML = "H";
} 

else{
    currentTail.removeAttribute("id");
    currentTail.innerHTML = null;
}


array[tail] = 1;




}

function deque() {
    //remove from head
    head++;
    size--;

    let currentHead;

    if (size<0){
        size++;
        head--;
        secret.innerHTML="Cannot Deque An Empty Queue!";
        return;
    }
    if (size > 0) {
     currentHead = document.getElementById("head");
} else{
     currentHead = document.getElementById("headTail");

}

    console.log(head);
    console.log(tail);

    


    

    sizeDisplay.innerHTML="Size: "+ size;

    if (size == 0 ){
        currentHead.className="ring";
        currentHead.innerHTML = null;
        currentHead.removeAttribute("id");
        
        
    }else {

    currentHead.removeAttribute("id");
    currentHead.innerHTML = null;

    if (head == arrayLength){
        head = head % arrayLength; //i know im supposed to do modulo here but bear with me 
    }

    
   
    let next = document.querySelector(`div[data-number="${head}"]`);

    if (head == tail){
        
        next.id="headTail"; next.innerHTML = "HT";
    }else{

    next.id="head"; next.innerHTML = "H";

    }

    //console.log("head: "+ head);
    //console.log("tail: " +tail);

   

    currentHead.className="ring";



    array[currentHead] = 0;

}
    
}

function resize() {

    while (container.firstChild){
        container.removeChild(container.lastChild);
       }

    //O(N^2) i guess but should be O(N)) // only bc i remove everything before i add new ones
    arrayLength = arrayLength + 10;
    max.innerHTML = "Buffer Size: " + arrayLength;

    
    head = 3;
    tail = head + size -1;

     

   
   
    
    createArray();
}

