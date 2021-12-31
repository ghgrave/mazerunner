// // const MAZE_WALLS = Array.from(Array(MAZE_SIZE), () => Array(MAZE_SIZE).fill(1));
// // console.log(MAZE_WALLS)

// const BUILD_MAZE_CONTAINER = (num) => {
//   return (maze = Array.from(Array(num), () => Array(num).fill(1)));
// };

// BUILD_MAZE_CONTAINER(MAZE_SIZE);
// BUILD_MAZE(1, MAZE_SIZE - 2);

// // $("#root").html(mazeContainer(0, MAZE_SIZE));

const MAZE_SIZE = 7;

const MAZE_WALLS = Array.from(Array(MAZE_SIZE), () => Array(MAZE_SIZE).fill(1));

function Block(x, y, w) {
  this.x = x; // row location = int 0 -> maze_size
  this.y = y; // column location = int 0 -> maze_size
  this.w = w; // wall = 0 -> no wall, 1 -> wall
  this.c = 0; // content = 0 -> no content,  other num -> item
  this.setContent = (item) => (this.c = item);
  this.getContent = () => this.c;
}

let maze = [...MAZE_WALLS];
const BUILD_MAZE = (count, num) => {
  for (let i = count; i < num; i++) {
    for (let j = 0; j < num; j++) {
      let wall = 
        i === 0 || 
        i === MAZE_SIZE - 1 || 
        j === 0 || 
        j === MAZE_SIZE - 1 ||
        (i%2 === 0 && j%2 === 0)
          ? 1 : 0;
      // wall = j === 0 || j === MAZE_SIZE - 1 ? 1 : 0;

      maze[i][j] = new Block(i, j, wall);
      // MAZE[i][j] = "dog";
      // console.log(maze[i][j]);
    }
  }

  return num !== 1 ? BUILD_MAZE((count += 1), num - 2) : maze;
};

const block1 = new Block(1, 1, 0);
block1.setContent(10);
console.log(maze);
$("#root").html(BUILD_MAZE(0, MAZE_SIZE));
