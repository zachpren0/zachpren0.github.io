

const mazeData = [
[
    "xxxxxxxxxxsx",
    "x        x x",
    "x  xxxx    x",
    "xx    x xxxx",
    "x  x  x    x",
    "xxxxx xxxxxx",
    "x   x x    x",
    "x     x  x x",
    "x xxxxxxxx x",
    "x    x     x",
    "x      x   x",
    "xxxxxxxxxxex",
],
[
    "xxxxxxxxxxex",
    "x   x      x",
    "x          x",
    "xx xxx  xxxx",
    "x   x   x  x",
    "x x x  xxx x",
    "x   xx   x x",
    "x x    x   x",
    "x  x  x x  x",
    "x    x     x",
    "x  x       x",
    "xsxxxxxxxxxx"
]
,
[
    "xxxxxxxxxxsx",
    "x        x x",
    "x  xxxx    x",
    "xx    x xxxx",
    "x  x  x    x",
    "xxxxx xxxxxx",
    "x   x x    x",
    "x     x  x x",
    "x xxxxxxxx x",
    "x          x",
    "x    x     x",
    "xxxxxxxxxxex"
],
[
    "xxxxxxxxxxex",
    "x   x  x   x",
    "x x   x    x",
    "xx  xx  xxxx",
    "x x  x     x",
    "x x x  x x x",
    "x   xxxx x x",
    "x x    x   x",
    "x  x    x  x",
    "x  xxx  x  x",
    "x  x       x",
    "xsxxxxxxxxxx"
],
[
    "xxxxxxxxxxsx",
    "x          x",
    "x          x",
    "x          x",
    "x  x    x  x",
    "x          x",
    "x          x",
    "x x      x x",
    "x  xxxxxx  x",
    "x          x",
    "x          x",
    "xxxexxxxxxxx",
],
];

function setCoords(idx){
    let start = {};
    let end = {};
    
    //change back to idx
    const maze = mazeData[idx];

    for (let rowIdx = 0; rowIdx < maze.length; rowIdx++) {
        const row = maze[rowIdx];
        for (let charIdx = 0; charIdx < row.length; charIdx++) {
            const char = row[charIdx];
            if(char === 's'){
                start = {x: charIdx, y: rowIdx};
            } else if(char === 'e'){
                end = {x: charIdx, y: rowIdx};
            }
        }
    }


    return {maze, start, end};
}

let maze, start, end;
let mazeIdx = 0;

window.onload = displayMaze();

function displayMaze(){

    if (maze == undefined)
        ({ maze, start, end } = setCoords(mazeIdx));
    
    const mazeContainer = document.getElementById("mazeContainer");
    
    mazeContainer.innerHTML = "";

    for (const row of maze) {
        const rowElement = document.createElement("div");
        rowElement.className = "maze-row";

        // Iterate through each character in the row
        for (const char of row) {
            const cellElement = document.createElement("span");
            
            
            if (char == 'x') {
                cellElement.className ="maze-wall";
            }else if(char == 's'){
                cellElement.className ="maze-start";
                cellElement.innerHTML="S"
            }
            else if(char == 'e'){
                cellElement.className ="maze-end";
                cellElement.innerHTML="E"
            }
            else if (char=="p"){
                cellElement.className ="path";
            }
            else{
                cellElement.className = "maze-cell";
            }
            //cellElement.textContent = char;

            rowElement.appendChild(cellElement);
        }

        mazeContainer.appendChild(rowElement);
    }


}






function recurse(){
 // base case 

 wall = "x";
 //start = { x: 10, y: 0 };
 //end = { x: 10, y: 11 };

 const seen = [];
 const path = [];

 for (let i=0; i<maze.length; ++i) {
     seen.push(new Array(maze[0].length).fill(false));
 }
 

 walk(maze,wall, start, end, seen, path);

 return path;
}

const dir = [
    [-1,0],
    [1,0],
    [0,-1],
    [0,1],
]


function walk(maze, wall, curr, end, seen, path) {
    // off the map
    if (
        curr.x < 0 ||
        curr.x >= maze[0].length ||
        curr.y < 0 ||
        curr.y >= maze.length
    ) {
        return false;
    }

    // on a wall
    if (maze[curr.y][curr.x] === wall) {
        return false;
    }

    // are we at end?
    if (curr.x === end.x && curr.y === end.y) {
        path.push(end);
        maze[curr.y] = maze[curr.y].substring(0, curr.x) + "e" + maze[curr.y].substring(curr.x + 1);
        displayMaze();
        return true;
    }

    if (seen[curr.y][curr.x]) {
        return false;
    }

    seen[curr.y][curr.x] = true;
    // pre
    if (maze[curr.y][curr.x] !== 's' && maze[curr.y][curr.x] !== 'e') {
        maze[curr.y] =
            maze[curr.y].substring(0, curr.x) + "p" + maze[curr.y].substring(curr.x + 1);
    }

    path.push({ ...curr });

    // Mark the path
    
    

    displayMaze();

    // recurse
    for (let i = 0; i < dir.length; ++i) {
        const [x, y] = dir[i];
        if (
            walk(
                maze,
                wall,
                {
                    x: curr.x + x,
                    y: curr.y + y,
                },
                end,
                seen,
                path
            )
        ) {
            return true;
        }
    }

    // post
    path.pop();

    // Clear the path marker
    maze[curr.y] =
        maze[curr.y].substring(0, curr.x) + " " + maze[curr.y].substring(curr.x + 1);

    displayMaze();

    return false;
}

const resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", resetMaze);
// Function to reset the maze
function resetMaze() {
    // Restore the original maze
    for (let i = 0; i < maze.length; ++i) {
        maze[i] = maze[i].replace(/p/g, ' ');
    }

    // Call the displayMaze function again to update the maze display
    displayMaze();
}

const newMazeButton = document.getElementById("newMaze");
newMazeButton.addEventListener("click", newMaze);

function newMaze(){

    resetMaze();

    let length = mazeData.length;
    
    let newIdx = Math.floor(Math.random() * length);
    while (newIdx === mazeIdx)
        newIdx = Math.floor(Math.random() * length);
    mazeIdx = newIdx;
    console.log(mazeIdx);
    ({ maze, start, end } = setCoords(mazeIdx));
    displayMaze();
}

