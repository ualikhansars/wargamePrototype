import {
  canvas,
  ctx,
  WIDTH,
  HEIGHT
} from '../map/mapConfig';

export const createMap = (gridSize:number) => {
  let map:any[] = [];
  let id = 0;
  for(let y = 0; y <= HEIGHT; y+= gridSize) {
    for(let x = 0; x <= WIDTH; x+= gridSize) {
      map.push({
        id: id,
        topLeftX: x,
        topLeftY: y,
      });
      id++;
    }
  }
  return map;
}
