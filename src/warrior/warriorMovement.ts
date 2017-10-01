import {drawWarrior} from './warriorAction';
import {warriors} from '../store/warriorStore';
import {
  map,
  createWarriorObstacle,
  addNeighbours
} from '../map/createMap';
import {getNodeFromMap} from '../path/drawPath';
import {
  gridSize,
  ctx,
  WIDTH,
  HEIGHT
} from '../map/mapConfig';
import {aStar} from '../path/AStar';
import {deleteObjectFromArray,isObjectInArray} from '../utils/objUtils';

export let updateWarrior = (warrior:any, path:any[], i:number=0, currentMoveToX:number, currentMoveToY:number) => {
  //console.log('updateWarrior');
  warrior.setIsMovingToTrue();
  let updatedPath = Object.assign([], path);
  let node = updatedPath[i]; // get next node

  if(currentMoveToX !== warrior.moveToNode.x || currentMoveToY !== warrior.moveToNode.y) {
    console.log('new destination has been chosen');
    warrior.moveToNode.x = node.x;
    warrior.moveToNode.y = node.y;
    warrior.setIsMovingToFalse();
    return;
  }
  // ally warrior is on the destination position
  // currentWarrior should stop moving
  if(checkOtherWarriorsPosition(warriors, warrior, node.x, node.y) && i === updatedPath.length - 1) {
    warrior.moveToNode.x = node.x; // set moveToNode value to current warrior position
    warrior.moveToNode.y = node.y;
    warrior.setIsMovingToFalse();
    console.error('ally unit in dest position');
    return;
  }
  if(checkOtherWarriorsPosition(warriors, warrior, node.x, node.y)) {

    if(isAllyUnitIsOnPosition(warriors, warrior, node.x, node.y)) {
      // warrior in the same unit blocks the next position and it finished movement
      console.log(`ally's warrior is on position`);
      warrior.setIsMovingToFalse();
      warrior.moveToNode.x = node.x; // set moveToNode value to current warrior position
      warrior.moveToNode.y = node.y;
      return;
    }
    // unit has another allies' unit on its way
    console.error('updateUnit: another unit is on the way x:',node.x,'y:', node.y);
    let updatedMap = Object.assign([], map);
    console.error('createWarriorObstacle x:', node.x, 'y:', node.y);
    updatedMap = createWarriorObstacle(node.x, node.y, updatedMap);
    updatedMap = addNeighbours(updatedMap);
    console.log('deleted Node', node);
    console.log('updatedMap', updatedMap);
    console.log('node', node);
    let startNode = getNodeFromMap(warrior.x, warrior.y, updatedMap);
    let finishNode = getNodeFromMap(currentMoveToX, currentMoveToY, updatedMap);
    console.error('node{x: 960, y: 480} in map:', isObjectInArray({x: 960, y: 480}, map));
    let newPath:any = aStar(startNode, finishNode, updatedMap);

    console.error('newPath', newPath);
    updateWarrior(warrior, newPath, 0, currentMoveToX, currentMoveToY);
    return;
  }

  let nodeToClear = node;;
  if(i !== 0) {
    nodeToClear = updatedPath[i - 1];
  }
  moveToNextNode(warrior, node, nodeToClear);
  i++;

  if(i !== updatedPath.length) {
    setTimeout(() => {
      updateWarrior(warrior, updatedPath, i, currentMoveToX, currentMoveToY);
    }, 400);
  }
  else {
    warrior.moveToNode.x = warrior.x; // set moveToNode value to current warrior position
    warrior.moveToNode.y = warrior.y;
    warrior.setIsMovingToFalse();
    return;
  }
}

// check if nextNode is occupied by other warrior
export const checkOtherWarriorsPosition = (warriors:any[], currentWarrior:any, x:number, y:number) => {
  let updatedWarriors = deleteObjectFromArray(currentWarrior, warriors);
  for(let warrior of updatedWarriors) {
    if(warrior.x === x && warrior.y === y) {
      return true;
    }
  }
  return false;
}

// check if nextNode is occupied by ally's warrior
// that is not moving
export const isAllyUnitIsOnPosition = (warriors:any[], currentWarrior:any, x:number, y:number) => {
  let updatedWarriors = deleteObjectFromArray(currentWarrior, warriors);
  for(let warrior of updatedWarriors) {
    if(warrior.x === x && warrior.y === y) {
      if(warrior.name === currentWarrior.name && warrior.isMoving === false) {
        return true;
      }
    }
  }
  return false;
}

export const moveToNextNode = (warrior:any, node:any, previousNode:any) => {
  ctx.clearRect(previousNode.x, previousNode.y, gridSize, gridSize);
  warrior.setX(node.x); // calculate center of the current node
  warrior.setY(node.y);
  drawWarrior(warrior);
}
