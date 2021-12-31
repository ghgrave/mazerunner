const MAZE_SIZE = 9;

const MAZE_WALLS = Array.from(Array(MAZE_SIZE), () => Array(MAZE_SIZE).fill(1));

function Block(x, y, w) {
  this.x = x; // row location = int 0 -> maze_size
  this.y = y; // column location = int 0 -> maze_size
  this.w = w; // wall = 0 -> no wall, 1 -> wall
  this.c = 0; // content = 0 -> no content,  other num -> item
  this.setContent = (item) => (this.c = item);
  this.getContent = () => this.c;
}

function block(x, y, w) {
  return {
    x,
    y,
    w,
    c: 0,
    setContent: (item) => (this.c = item),
    getContent: () => this.c,
  };
}

let maze = [...MAZE_WALLS];
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

      // maze[i][j] = new Block(i, j, wall);
      maze[i][j] = block(i, j, wall);
    }
  }
  return num !== 1 ? BUILD_MAZE((count += 1), num - 2) : maze;
};

const DISPLAY_WALLS = (mazeArr) => {
  let walls = "";
  for (let i = 0; i < mazeArr.length; i++) {
    for (let j = 0; j < mazeArr.length; j++) {
      walls += `<div class="walls ${
        mazeArr[i][j].w === 1 ? "fill" : ""
      }"></div>`;
    }
    walls += "<br />";
  }
  return walls;
};

console.log(maze);
BUILD_MAZE(0, MAZE_SIZE);
DISPLAY_WALLS(maze);
$("#root").html(DISPLAY_WALLS(maze));
