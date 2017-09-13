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
import {
  drawPath,
  getNodeFromMap
} from './path/drawPath';

import Warrior from './warrior/Warrior';
import {warriors, currentlyChosenWarrior} from './store/warriorStore';
import {
  onChooseWarrior,
  createWarrior,
  assignWarriorMoveToPosition} from './warrior/warriorAction';
import {updateWarrior} from './warrior/warriorMovement';

let warrior = createWarrior('barbarian', 80, 160, 5);

drawGrid();
console.log('map', map);
console.log('currentlyChosenWarrior', currentlyChosenWarrior);

let startNode:any;
let finishNode:any;

canvas.addEventListener('click', (e) => {
  console.error('Click');
  let x = e.offsetX; // get X
  let y = e.offsetY; // get Y
  console.log('Position x', e.offsetX); // get X
  console.log('Position y', e.offsetY); // get Y
  startNode = getNodeFromMap(x, y);
  onChooseWarrior(warriors, x, y);
  console.log('currentlyChosenWarrior', currentlyChosenWarrior);
});

// set onClickListener for right mouse event
canvas.addEventListener('contextmenu', (e) => {
  console.error('Right Mouse Click');
  e.preventDefault();
  let x = e.offsetX; // get X
  let y = e.offsetY; // get Y
  let finishNode = getNodeFromMap(x, y);
  assignWarriorMoveToPosition(currentlyChosenWarrior, x, y);
  let path:any = aStar(startNode, finishNode);
  if(currentlyChosenWarrior) {
    updateWarrior(currentlyChosenWarrior, path);
  }
  //drawPath(path);
});
