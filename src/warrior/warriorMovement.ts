import {drawWarrior} from './warriorAction';
import {
  gridSize,
  ctx,
  WIDTH,
  HEIGHT
} from '../map/mapConfig';
import {deleteObjectFromArray} from '../utils/objUtils';

export let updateWarrior = (warrior:any, path:any[], i:number=0, currentMoveToX:number, currentMoveToY:number) => {
  //console.log('updateWarrior');
  if(currentMoveToX !== warrior.moveToNode.x || currentMoveToY !== warrior.moveToNode.y) {
    console.log('new destination has been chosen');
    return;
  }
  let updatedPath = path;
  let node = path[i]; // get next node
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
}

// check if nextNode is occupied by other warrior
export const checkOtherWarriorsPosition = (warriors:any[], currentUnit:any, x:number, y:number) => {
  let updatedWarriors = deleteObjectFromArray(currentUnit, warriors);
  for(let warrior of updatedWarriors) {
    if(warrior.x === x && warrior.y === y) {
      return true;
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
