import {drawWarrior} from './warriorAction';
import {
  gridSize,
  ctx,
  WIDTH,
  HEIGHT
} from '../map/mapConfig';
import {deleteObjectFromArray} from '../utils/objUtils';

export let updateWarrior = (warrior:any, path:any[], i:number=0) => {
  let updatedPath = path;
  console.log('i', i);
  console.log('updatedPath', updatedPath);
  let node = path[i]; // get next node
  console.log('nodeX', node.x);
  let nodeToClear = node;;
  if(i !== 0) {
    nodeToClear = updatedPath[i - 1];
  }
  ctx.clearRect(nodeToClear.x, nodeToClear.y, gridSize, gridSize);
  warrior.setX(node.x); // calculate center of the current node
  warrior.setY(node.y);
  console.log('warrior.x', warrior.x, 'warrior.y', warrior.y);
  drawWarrior(warrior);
  i++;
  if(i !== updatedPath.length) {
    setTimeout(() => {
      updateWarrior(warrior, updatedPath, i);
    }, 300);
  }
}
