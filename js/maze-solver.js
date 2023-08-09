

const maze = [
    "xxxxxxxxxxsx",
    "x        x x",
    "x        x x",
    "x xxxxxxxx x",
    "x          x",
    "xxxxx xxxxxx",
    "x   x x    x",
    "x          x",
    "x xxxxxxxxxx",
    "x          x",
    "x          x",
    "xxxxxxxxxx x",
];



function displayMaze(){

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

window.onload = displayMaze;



function recurse(){
 // base case 

 wall = "x";
 start = { x: 10, y: 0 };
 end = { x: 10, y: 11 };

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
        maze[curr.y] = maze[curr.y].substring(0, curr.x) + "p" + maze[curr.y].substring(curr.x + 1);
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



