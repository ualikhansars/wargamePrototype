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
    {x: -gridSize, y: gridSize},
    {x: gridSize, y: -gridSize},
    {x: gridSize, y: -gridSize},
    {x: -gridSize, y: gridSize},
    {x: gridSize, y: gridSize},
    {x: -gridSize, y: gridSize},
    {x: gridSize, y: gridSize},
    {x: gridSize, y: gridSize}
  ];
  let result = [];
  for(let dir of dirs) {
    let neighbor = {
      x: node.x + dir.x,
      y: node.y + dir.y
    }
    for(let el of map) {
      if(el.x === neighbor.x && el.y === neighbor.y) {
        result.push({
          id: el.id,
          x: el.x,
          y: el.y,
          value: el.value
        });
      }
    }
  }
  return result;
}
