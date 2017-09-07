export const AStar = (startNode:any, finishNode:any) => {
  // the set of currently discovered nodes that are not evaluated yet
  // Initially only the start node is known
  let open = [];

  // the set of nodes that already evaluated
  let closet = [];
  open.push(startNode);

  // for each node, which node is can most efficiently be reached from
  // if a node can be reached from many nodes, cameFrom will eventially
  // contain the most efficient previous step
  let from = new Map();

  // For each node, the cost of getting from the start node to that node.
  let gScore = [];
  let fScore = [];

  gScore.push(startNode);
  gScore[startNode] = 0;
  fScore[startNode] = gScore[startNode] + h(startNode, finishNode);


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
