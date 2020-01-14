


//Transform the position in the next row based on the rules
function rules (a, b, c) {
  if (a == 1 && b == 1 && c == 1) return ruleset[0];
  if (a == 1 && b == 1 && c == 0) return ruleset[1];
  if (a == 1 && b == 0 && c == 1) return ruleset[2];
  if (a == 1 && b == 0 && c == 0) return ruleset[3];
  if (a == 0 && b == 1 && c == 1) return ruleset[4];
  if (a == 0 && b == 1 && c == 0) return ruleset[5];
  if (a == 0 && b == 0 && c == 1) return ruleset[6];
  if (a == 0 && b == 0 && c == 0) return ruleset[7];
  return 0;
}


//Create a matrix/2D array to serve as a Grid
function make2DArray(rows, cols) {
  let arr = new Array(rows);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(cols);
  }
  return arr;
}

let grid;
let cols;
let rows;
let resolution = 10; //the size of the cells

function setup() {
  createCanvas(400, 400);
  rows = width / resolution;
  cols = height / resolution;

  grid = make2DArray(rows, cols);
  next = make2DArray(rows,cols);
  //set all the cells to 0
  for(let i=0 ; i<rows ; i++){
    for(let j=0;j<cols ; j++){
      grid[i][j] = 0;
    }
  }
//first row made up of 0's and  a 1 in the middle
  grid[0][19] = 1;
  generation = 0;
  next  = grid
  ruleset = [0,1,1,1,0,1,1,0];
  document.getElementById('ruleNumber').innerHTML = getRuleNumber(ruleset);

  //set a lower framerate to see the "animation"
  frameRate(20);
}

function draw() {
  background(0);

//draw the grid and the cells
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let x = i * resolution;
      let y = j * resolution;
      if (grid[i][j] == 1) {
        fill(255);
        stroke(0);
        rect(y,x, resolution - 1, resolution - 1);
      }
    }
  }

//create a new generation
  grid = makeNewGeneration(grid);

//check if we have reached the last row, and if so we reset
  if(generation < rows -2)
  {
    generation ++;
  }else{
    generation = 0;
    resetGrid(grid);
    ruleset = randomRuleset();
    document.getElementById('ruleNumber').innerHTML = getRuleNumber(ruleset);
  }
}


//creates the new generation (row) based on the rules
function makeNewGeneration(next){
  //case where the index is the first column and we need to take as a left neighbor the last column
  next[generation+1][0] = rules(next[generation][cols-1],next[generation][0],next[generation][1]);

//general case
  for(let i = 1;i<cols-1;i++)
  {
      next[generation+1][i] = rules(next[generation][i-1],next[generation][i],next[generation][i+1]);
  }

//case where we are on the last column and we need the right neighbor to be the first column
    next[generation+1][cols-1] = rules(next[generation][cols-2],next[generation][cols-1],next[generation][0])
  return next
}

//create a random ruleset
function randomRuleset(){
  newRuleset = [0,0,0,0,0,0,0,0];
  for(let i=0; i<8 ;i++){
    newRuleset[i] = floor(random(2))
  }
  return newRuleset;
}

function resetGrid(grid){
//make all the cells 0 to reset the grid
  for(let i=0 ; i<rows ; i++){
    for(let j=0;j<cols ; j++){
      grid[i][j] = 0;
    }
  }

//place a 1 on a rondom position on the first row of the grid to diversify
  randomPosition = floor(random(38));
  grid[0][randomPosition] = 1;
  document.getElementById('ruleNumber').innerHTML = getRuleNumber(ruleset);
}

function getRuleNumber(ruleset){
  sum = 0;
  for(let i=0;i<8;i++){
    if(ruleset[i] == 1){
      sum = sum + Math.pow(2,i);
    }
  }
  console.log(sum);
  return sum;
}
