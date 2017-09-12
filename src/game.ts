import {
  canvas,
  ctx,
  WIDTH,
  HEIGHT,
  gridSize
} from './map/mapConfig';

import {drawGrid} from './map/drawGrid';
import {
  addNeighbours,
  createNodes,
  map
} from './map/createMap';
import {showObstacles} from './map/mapUtils';
import {h, aStar} from './path/AStar';
import {drawPath} from './path/drawPath';

drawGrid();
console.log('map', map);

let startNode:any;
let finishNode:any;

canvas.addEventListener('click', (e) => {
  console.error('Click');
  let x = e.offsetX; // get X
  let y = e.offsetY; // get Y
  console.log('Position x', e.offsetX); // get X
  console.log('Position y', e.offsetY); // get Y
  for(let grid of map) {
    let bottomRightX = grid.x + gridSize;
    let bottomRightY = grid.y + gridSize;
    if(x >= grid.x && x < bottomRightX && y >= grid.y && y < bottomRightY) {
      ctx.fillStyle = 'green';
      ctx.fillRect(grid.x, grid.y, gridSize , gridSize);
      startNode = grid;
      console.log('grid', grid, 'was clicked');
    }
  }
});

// set onClickListener for right mouse event
canvas.addEventListener('contextmenu', (e) => {
  console.error('Right Mouse Click');
  e.preventDefault();
  let x = e.offsetX; // get X
  let y = e.offsetY; // get Y

  for(let grid of map) {
    let bottomRightX = grid.x + gridSize;
    let bottomRightY = grid.y + gridSize;
    if(x >= grid.x && x < bottomRightX && y >= grid.y && y < bottomRightY) {
      ctx.fillStyle = 'red';
      ctx.fillRect(grid.x, grid.y, gridSize, gridSize);
      console.log('grid', grid, 'was clicked');
      finishNode = grid;
      console.log('h', h(startNode, finishNode));
      let path:any = aStar(startNode, finishNode);
      drawPath(path);
    }
  }
});
