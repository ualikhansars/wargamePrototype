export const aStar = (startNode:any, finishNode:any) => {
  // the set of currently discovered nodes that are not evaluated yet
  // Initially only the start node is known
  let open:any[] = [];

  // the set of nodes that already evaluated
  let closed:any[] = [];
  startNode.gScore = 0;
  startNode.fScore = startNode.gScore + h(startNode, finishNode)
  open.push(startNode);

  // for each node, which node is can most efficiently be reached from
  // if a node can be reached from many nodes, cameFrom will eventially
  // contain the most efficient previous step
  let from = new Map();

  // For each node, the cost of getting from the start node to that node.
  // let gScore = new Map();
  // let fScore = new Map();
  //
  // gScore.set(startNode, 0);
  // fScore.set(startNode, gScore.get(startNode) + h(startNode, finishNode));
  while(open) {
    let current:any = getMinFScore(open);
    console.log('current', current);
    if(current.x === finishNode.x && current.y === finishNode.y) {
      return reconstructPath(from, current);
    }
    open = deleteObjectFromArray(current, open);
    closed.push(current);
    for(let neighbour of unclosedNeigbours(current, closed)) {
      let tempG = current.gScore + neighbour.distance;
      if(!isObjectInArray(neighbour, open) || tempG < neighbour.gScore) {
        from.set(neighbour, current);
        neighbour.gScore = tempG;
        neighbour.fScore = neighbour.gScore + h(neighbour, finishNode);
      }
      if(!isObjectInArray(neighbour, open)) { // create function
        open.push(neighbour);
      }
    }
  }
  console.log('failure');
  return 0; // failure
}

export const h = (startNode:any, finishNode:any) => {
//function heuristic(node) =
  // dx = abs(node.x - goal.x)
  // dy = abs(node.y - goal.y)
  // return D * (dx + dy) + (D2 - 2 * D) * min(dx, dy)
  let D = 10; // cost of moving horizontally
  let D2 = 14; // cost of moving diagonally
  let dx = Math.abs(startNode.x - finishNode.x);
  let dy = Math.abs(startNode.y - finishNode.y);
  return D * (dx + dy) + (D2 - 2 * D) * Math.min(dx, dy);
}

// export const getMinFScore = (map:any) => {
//   let open:any[] = Array.from(map);
//   let min = 0;
//   for(let i = 1; i < open.length - 1; ++i) {
//     if(open[min][1] > open[i][1]) {
//       min = i;
//     }
//   }
//   return open[min];
// }

export const getMinFScore = (open:any[]) => {
  let min = 0;
  for(let i = 1; i < open.length - 1; ++i) {
    if(open[min].fScore > open[i].fScore) {
      min = i;
    }
  }
  return open[min];
}

export const reconstructPath = (from:any, current:any) => {
  console.log('reconstructPath from:', from);
  console.log('reconstructPath current', current);
}

export const deleteObjectFromArray = (object:any, arr:any[]) => {
  let updatedArr = arr.filter((el) => {
    if(el.x === object.x && el.y === object.y) {
      return false;
    }
    return true;
  });
  return updatedArr;
}

export const isObjectInArray = (object:any, arr:any[]) => {
  let result:boolean = false;
  for(let node of arr) {
    if(object.x === node.x && object.y === node.y) {
      result = true;
    }
  }
  return result;
}

export const unclosedNeigbours = (current:any, closed:any) => {
  let neighboursNotInClosed = [];
  for(let neighbour of current.neighbours) {
    let isInClosed:boolean = false;
    for(let node of closed) {
      if(neighbour.x === node.x && neighbour.y === node.y) {
        isInClosed = true;
      }
    }
    if(!isInClosed) {
      neighboursNotInClosed.push(neighbour);
    }
  }
  return neighboursNotInClosed;
}
