import {
  canvas,
  ctx,
  WIDTH,
  HEIGHT,
  gridSize
} from '../map/mapConfig';

import {
  deleteObjectFromArray,
} from '../utils/objUtils';

export const createNodes = () => {
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

export const neighbours = (node:any) => {
  let dirs = [
    {x: -gridSize, y: -gridSize, distance: 14},
    {x: 0, y: -gridSize, distance: 10},
    {x: gridSize, y: -gridSize, distance: 14},
    {x: -gridSize, y: 0, distance: 10},
    {x: gridSize, y: 0, distance: 10},
    {x: -gridSize, y: gridSize, distance: 14},
    {x: 0, y: gridSize, distance: 10},
    {x: gridSize, y: gridSize, distance: 14}
  ];
  let result = [];
  for(let dir of dirs) {
    let neighbour = {
      x: node.x + dir.x,
      y: node.y + dir.y,
      distance: dir.distance
    }
    if(neighbour.x >= 0 && neighbour.x < 1000 && neighbour.y >= 0 && neighbour.y < 600) {
        let finded:boolean = false;
        for(let node of map) {
          if(neighbour.x === node.x && neighbour.y === node.y) {
            finded = true;
          }
        }
        if(finded) {
          result.push({
            x: neighbour.x,
            y: neighbour.y,
            distance: neighbour.distance,
          });
        }
    }
  }
  return result;
}

export const addNeighbours = (map:any[]) => {
  for(let node of map) {
    let n = neighbours(node);
    node.neighbours = n;
  }
}

export const createObstacles = (positionX:number, positionY:number) => {
  let node = {
    x: positionX,
    y: positionY
  };
  ctx.fillRect(node.x, node.y, gridSize, gridSize);
  return deleteObjectFromArray(node, map)
}

export let map = createNodes();
map = createObstacles(500, 100);
map = createObstacles(500, 200);
addNeighbours(map);
