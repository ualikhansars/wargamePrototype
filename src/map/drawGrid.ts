import {
  canvas,
  ctx,
  WIDTH,
  HEIGHT
} from './mapConfig';

export const drawGrid = (gridSize:number) => {
  for(let y = 0; y <= HEIGHT; y+= gridSize) {
    for(let x = 0; x <= WIDTH; x+= gridSize) {
      ctx.strokeRect(x, y, gridSize, gridSize);
    }
  }
}
