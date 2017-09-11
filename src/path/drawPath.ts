import {
  canvas,
  ctx,
  WIDTH,
  HEIGHT,
  gridSize
} from '../map/mapConfig';

export const drawPath = (path:any[]) => {
  for(let step of path) {
    ctx.fillStyle = 'yellow';
    ctx.fillRect(step.x, step.y, gridSize, gridSize);
  }
}
