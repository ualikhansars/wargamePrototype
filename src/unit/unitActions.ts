import {createWarrior} from '../warrior/warriorAction';
import {gridSize} from '../map/mapConfig';
import Unit from './Unit';

import {
  units,
  currentlyChosenUnit,
  assignCurrentlyChosenUnit
} from '../store/unitStore';

// export const drawUnit = (unit:any, radius:number) => {
//   let startX = unit.commanderPositionX;
//   let startY = unit.commanderPositionY;
//   let i = 1;
//   let row = unit.quantity / 2;
//   let col = Math.ceil(unit.quantity / row);
//   let finishX = startX + ((row - 1) * gridSize);
//   let finishY = startY + ((col - 1) * gridSize);
//   for(let y = startX; y <= finishY; y += gridSize) {
//     if(i <= unit.quantity) {
//       for(let x = startX; x <= finishX;  x+= gridSize) {
//         let currentWarrior = createWarrior(unit.name, x, y, radius);
//         currentWarrior.assignPosition(i);
//         i++;
//       }
//     }
//   }
// }

export const addWarriorsToUnit = (unit:any) => {
  let startX = unit.commanderPositionX;
  let startY = unit.commanderPositionY;
  let i = 1;
  let row = unit.quantity / 2;
  let col = Math.ceil(unit.quantity / row);
  let finishX = startX + ((row - 1) * gridSize);
  let finishY = startY + ((col - 1) * gridSize);
  let radius = gridSize / 4;
  for(let y = startX; y <= finishY; y += gridSize) {
    if(i <= unit.quantity) {
      for(let x = startX; x <= finishX;  x+= gridSize) {
        let currentWarrior = createWarrior(unit.name, x, y, radius);
        currentWarrior.assignPosition(i);
        unit.addWarriorToUnit(currentWarrior);
        i++;
      }
    }
  }
}

export const createUnit = (name:string, quantity:number, posX:number, posY: number) => {
  let newUnit = new Unit(name, quantity, posX, posY);
  let radius = gridSize / 4;
  addWarriorsToUnit(newUnit);
  units.push(newUnit);
}

// warriors in the unit have same name as unit that they assigned to
// if warrior with same name is chosen that means that unit also
// has been chosen
export const onChooseUnit = (units:any, currentlyChosenWarrior:any) => {
  let foundedUnit = null;
  if(currentlyChosenWarrior) {
    for(let unit of units) {
      if(currentlyChosenWarrior.name === unit.name) {
        foundedUnit = unit;
      }
    }
  }
  assignCurrentlyChosenUnit(foundedUnit);
  console.log('currentlyChosenUnit', currentlyChosenUnit);
}

export const updateUnit = (unit:any, path:any[], i:number=0, currentMoveToX:number, currentMoveToY:number) => {

}
