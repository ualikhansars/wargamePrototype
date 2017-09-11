import {
  canvas,
  ctx,
  WIDTH,
  HEIGHT,
  gridSize
} from '../map/mapConfig';

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
    let neighbor = {
      x: node.x + dir.x,
      y: node.y + dir.y,
      distance: dir.distance
    }
    if(neighbor.x >= 0 && neighbor.x < 1000 && neighbor.y >= 0 && neighbor.y < 600) {
      for(let node of map) {
        if(neighbor.x === node.x && neighbor.y ) {
          result.push(node);
        }
      }
      // result.push({
      //   x: neighbor.x,
      //   y: neighbor.y,
      //   distance: neighbor.distance,
      // });
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

export const map = createNodes();
addNeighbours(map);
