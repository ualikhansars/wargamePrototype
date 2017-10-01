import {
  getCentralWarriorInUnit,
  getClosestWarriorToDestinationInArray
} from './unitUtils';
import {gridSize} from '../map/mapConfig';
import {map} from '../map/createMap';
import {getNodeFromMap} from '../path/drawPath';
import {
  getNodeFromArray,
  deleteObjectFromArray,
  isObjectInArray
} from '../utils/objUtils';
import {updateWarrior} from '../warrior/warriorMovement';
import {aStar} from '../path/AStar';

export const moveToPosition = (unit:any, nextNode:any) => {
  // assign moveToPositions to warriors
  let movingWarriors = Object.assign([], unit.warriors);
  let centralWarrior = getCentralWarriorInUnit(unit);
  let updatedWarriors = deleteObjectFromArray(centralWarrior, unit.warriors);
  //console.log('updatedWarriors', updatedWarriors);
  centralWarrior.moveToNode = nextNode;
  // assign centralUnit ge to next nextNode
  // assign other warriors next positions
  for(let warrior of updatedWarriors) {
    let {differenceInX,differenceInY} = checkWarriorsPositions(centralWarrior, warrior);
    let x:number = nextNode.x + (differenceInX * gridSize);
    let y:number = nextNode.y + (differenceInY * gridSize);
    console.error('x:', x, 'y:', y);
    let moveToNode;
    if(isObjectInArray({x, y}, map)) { // if node exists then go to this node
      moveToNode = getNodeFromMap(x, y, map);
    } else { // else go to guaranted existed node (nextNode)
      moveToNode = nextNode;
    }

    console.error('moveToNode', moveToNode);
    warrior.moveToNode = moveToNode;
  }
  unitMovement(movingWarriors, nextNode);
}

export const checkWarriorsPositions = (centralWarrior:any, currentWarrior:any) => {
  let centralCol = centralWarrior.colInUnit;
  let centralRow = centralWarrior.rowInUnit;
  let currentRow = currentWarrior.rowInUnit;
  let currentCol = currentWarrior.colInUnit;
  let differenceInX = currentCol - centralCol;
  let differenceInY = currentRow - centralRow;
  return {
    differenceInX,
    differenceInY
  }
}

export const unitMovement = (movingWarriors:any[], nextNode:any) => {
  if(movingWarriors.length === 0) {
    return;
  }
  // get closest warrior to destination
  let closest = getClosestWarriorToDestinationInArray(movingWarriors, nextNode.x, nextNode.y);
  console.error('unitMovement closest:', closest);
  let startNode = getNodeFromMap(closest.x, closest.y, map); // startNode of the closest warrior
  console.log('x:', closest.x, 'y:', closest.y);
  console.error('unitMovement startNode:', startNode);
  console.error('finishNode', closest.moveToNode);
  console.log('map', map);
  let path:any = aStar(startNode, closest.moveToNode, map);
  updateWarrior(closest, path, 0, closest.moveToNode.x, closest.moveToNode.y);
  movingWarriors = deleteObjectFromArray(closest, movingWarriors);
  unitMovement(movingWarriors, nextNode);
}
