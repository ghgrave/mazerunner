const MAZE_SIZE = 7;

// creates Block class to be used to build maze
const Block = (x, y, t, r, b, l, w) => {
  return {
    x, // row location = int 0 -> maze_size
    y, // column location = int 0 -> maze_size
    t, // what is located top of current position
    r, // what is located right of current position
    b, // what is located bottom of current position
    l, // what is located left of current position
    w, // wall = 0 -> no wall, 1 -> wall
    c: 0, // content = 0 -> no content,  other num -> item
    d: false, // default -> not a door
    setContent: (item) => (c = item),
    getContent: () => c,
  };
}

// makes a default 2d-array MAZE filled with nulls
const MAZE = Array.from(Array(MAZE_SIZE), () => Array(MAZE_SIZE));

// builds the maze by assigning values using Block Class
const BUILD_MAZE = (count, num) => {
  for (let i = count; i < num; i++) {
    for (let j = 0; j < num; j++) {
      let wall =
        i === 0 || // first row all walls
        i === MAZE_SIZE - 1 || // last row all walls
        j === 0 || // first column all walls
        j === MAZE_SIZE - 1 || // last columns all walls
        (i % 2 === 0 && j % 2 === 0) // default, every other odd row/col is a wall
          ? 1 // is a wall
          : 0; // is not a wall
      MAZE[i][j] = Block(i, j, [i-1, j], [i, j+1], [i+1, j], [i, j-1], wall);
    }
  }
  return num !== 1 ? BUILD_MAZE((count += 1), num - 2) : MAZE;
};

// translates values into actual walls based on w value
const DISPLAY_WALLS = (mazeArr) => {
  let walls = "";
  for (let i = 0; i < mazeArr.length; i++) {
    for (let j = 0; j < mazeArr.length; j++) {
      walls += `<div class="walls ${
        mazeArr[i][j].w === 1 && !mazeArr[i][j].d ? "fill" : ""
      }"></div>`;
    }
    walls += "<br />";
  }

  return walls;
};

// randomly assigns a block as the entrance to the maze
const DOOR = () => {
  // randomly chooses which row to assign door
  let a = Math.floor(Math.random() * (MAZE_SIZE - 1));
  // depending on row, then col chosen to place door
  let b =
    a === 0 || a === MAZE_SIZE - 1 // if 0 or last column
      ? Math.floor(Math.random() * (MAZE_SIZE - 2)) + 1 // rand num between 1 and size of maze - 2
      : Math.random() < 0.5 // otherwise, column can only be 0 or
      ? 0
      : MAZE_SIZE - 1;
  return [a, b];
};

const INT_WALLS = () => {
  return MAZE.map((arr) => {
    return arr.filter((el) => {
      return el.w === 0 && el.d === false;
    });
  });
};

// console.log(MAZE);
BUILD_MAZE(0, MAZE_SIZE);
// determines which block will be entrace
let tempDoor = DOOR();
MAZE[tempDoor[0]][tempDoor[1]].d = true;

// create a 2d array of all possible spaces which can become interior walls
// converted from 2d -> 1d
let int_wall_arr = [].concat(...INT_WALLS());
console.log(int_wall_arr);

// places maze in the DOM
$("#root").html(DISPLAY_WALLS(MAZE));
