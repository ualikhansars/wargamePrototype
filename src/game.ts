import {canvas, ctx} from './map/mapConfig';
import {drawGrid} from './map/drawGrid';
import {createMap} from './map/createMap';

let gridSize = 20;

drawGrid(gridSize);
let map = createMap(gridSize);
console.log(map);

canvas.addEventListener('click', (e) => {
  console.error('Click');
  let x = e.offsetX; // get X
  let y = e.offsetY; // get Y
  console.log('Position x', e.offsetX); // get X
  console.log('Position y', e.offsetY); // get Y
  for(let grid of map) {
    let bottomRightX = grid.topLeftX + gridSize;
    let bottomRightY = grid.topLeftY + gridSize;
    if(x >= grid.topLeftX && x < bottomRightX && y >= grid.topLeftY && y < bottomRightY) {
      ctx.fillStyle = 'green';
      ctx.fillRect(grid.topLeftX, grid.topLeftY, 20 , 20);
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
});
