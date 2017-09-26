import {getCentralUnit} from './unitUtils';
import {gridSize} from '../map/mapConfig';
import {map} from '../map/createMap';
import {getNodeFromMap} from '../path/drawPath';
import {
  getNodeFromArray,
  deleteObjectFromArray
} from '../utils/objUtils';
import {updateWarrior} from '../warrior/warriorMovement';
import {aStar} from '../path/AStar';

export const moveToPosition = (unit:any, nextNode:any) => {
  // assign moveToPositions to warriors
  let centralWarrior = getCentralUnit(unit);
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
    let moveToNode = getNodeFromMap(x, y);
    console.error('moveToNode', moveToNode);
    warrior.moveToNode = moveToNode;
  }
}

export const checkWarriorsPositions = (centralWarrior:any, currentWarrior:any) => {
  let centralCol = centralWarrior.colInUnit;
  let centralRow = centralWarrior.rowInUnit;
  let currentRow = currentWarrior.colInUnit;
  let currentCol = currentWarrior.rowInUnit;
  let differenceInX = currentCol - centralCol;
  let differenceInY = currentRow - centralRow;
  return {
    differenceInX,
    differenceInY
  }
}
