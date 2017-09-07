import {
  canvas,
  ctx,
  WIDTH,
  HEIGHT
} from '../map/mapConfig';

export const createNodes = (gridSize:number) => {
  let map:any[] = [];
  let value = 1;
  let id = 0;
  for(let y = 0; y <= HEIGHT; y+= gridSize) {
    for(let x = 0; x <= WIDTH; x+= gridSize) {
      map.push({
        id: id,
        x: x,
        y: y,
        value: value,
        neighbours: []
      });
      id++;
    }
  }
  return map;
}

export const addNeighbours = (map:any[], gridSize:number) => {
  for(let node of map) {
    let n = neighbours(node, map, gridSize);
    node.neighbours = n;
  }
}

export const neighbours = (node:any, map:any[], gridSize:number) => {
  let dirs = [
    {x: -gridSize, y: -gridSize},
    {x: 0, y: -gridSize},
    {x: gridSize, y: -gridSize},
    {x: -gridSize, y: 0},
    {x: gridSize, y: 0},
    {x: -gridSize, y: gridSize},
    {x: 0, y: gridSize},
    {x: gridSize, y: gridSize}
  ];
  let result = [];
  for(let dir of dirs) {
    let neighbor = {
      x: node.x + dir.x,
      y: node.y + dir.y
    }
    if(neighbor.x >= 0 && neighbor.x < 1000 && neighbor.y >= 0 && neighbor.y < 600) {
      result.push({
        x: neighbor.x,
        y: neighbor.y,
      });
    }
  }
  return result;
}
