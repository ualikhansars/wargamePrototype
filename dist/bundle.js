/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// global variables
exports.WIDTH = 1200;
exports.HEIGHT = 600;
exports.gridSize = 20;
// create Canvas
exports.canvas = document.createElement('canvas');
exports.canvas.id = "canvas";
exports.canvas.width = exports.WIDTH;
exports.canvas.height = exports.HEIGHT;
exports.canvas.style.border = "1px solid";
document.body.appendChild(exports.canvas);
// define 2d context
exports.ctx = exports.canvas.getContext("2d");


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var mapConfig_1 = __webpack_require__(0);
var objUtils_1 = __webpack_require__(3);
exports.createNodes = function () {
    var map = [];
    var value = 1;
    var id = 0;
    for (var y = 0; y <= mapConfig_1.HEIGHT; y += mapConfig_1.gridSize) {
        for (var x = 0; x <= mapConfig_1.WIDTH; x += mapConfig_1.gridSize) {
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
};
exports.neighbours = function (node) {
    var dirs = [
        { x: -mapConfig_1.gridSize, y: -mapConfig_1.gridSize, distance: 14 },
        { x: 0, y: -mapConfig_1.gridSize, distance: 10 },
        { x: mapConfig_1.gridSize, y: -mapConfig_1.gridSize, distance: 14 },
        { x: -mapConfig_1.gridSize, y: 0, distance: 10 },
        { x: mapConfig_1.gridSize, y: 0, distance: 10 },
        { x: -mapConfig_1.gridSize, y: mapConfig_1.gridSize, distance: 14 },
        { x: 0, y: mapConfig_1.gridSize, distance: 10 },
        { x: mapConfig_1.gridSize, y: mapConfig_1.gridSize, distance: 14 }
    ];
    var result = [];
    for (var _i = 0, dirs_1 = dirs; _i < dirs_1.length; _i++) {
        var dir = dirs_1[_i];
        var neighbour = {
            x: node.x + dir.x,
            y: node.y + dir.y,
            distance: dir.distance
        };
        if (neighbour.x >= 0 && neighbour.x < mapConfig_1.WIDTH && neighbour.y >= 0 && neighbour.y < mapConfig_1.HEIGHT) {
            var finded = false;
            for (var _a = 0, map_1 = exports.map; _a < map_1.length; _a++) {
                var node_1 = map_1[_a];
                if (neighbour.x === node_1.x && neighbour.y === node_1.y) {
                    finded = true;
                }
            }
            if (finded) {
                result.push({
                    x: neighbour.x,
                    y: neighbour.y,
                    distance: neighbour.distance,
                });
            }
        }
    }
    return result;
};
exports.addNeighbours = function (map) {
    for (var _i = 0, map_2 = map; _i < map_2.length; _i++) {
        var node = map_2[_i];
        var n = exports.neighbours(node);
        node.neighbours = n;
    }
};
exports.createOneObstacle = function (positionX, positionY, type) {
    if (type === void 0) { type = 'forest'; }
    var node = {
        x: positionX,
        y: positionY
    };
    if (type === 'forest')
        mapConfig_1.ctx.fillStyle = 'green';
    else if (type === 'mountain')
        mapConfig_1.ctx.fillStyle = '#8B4513';
    else if (type === 'river')
        mapConfig_1.ctx.fillStyle = 'blue';
    mapConfig_1.ctx.fillRect(positionX, positionY, mapConfig_1.gridSize, mapConfig_1.gridSize);
    return objUtils_1.deleteObjectFromArray(node, exports.map);
};
exports.createObstacles = function (startX, finishX, startY, finishY, type) {
    if (type === void 0) { type = 'forest'; }
    var newMap = exports.map;
    for (var x = startX; x <= finishX; x += mapConfig_1.gridSize) {
        for (var y = startY; y <= finishY; y += mapConfig_1.gridSize) {
            var node = {
                x: x,
                y: y
            };
            newMap = objUtils_1.deleteObjectFromArray(node, newMap);
            if (type === 'forest')
                mapConfig_1.ctx.fillStyle = 'green';
            else if (type === 'mountain')
                mapConfig_1.ctx.fillStyle = '#8B4513';
            else if (type === 'river')
                mapConfig_1.ctx.fillStyle = 'blue';
            var xLength = Math.abs(startX - finishX);
            var yLength = Math.abs(startY - finishY);
            mapConfig_1.ctx.fillRect(x, y, mapConfig_1.gridSize, mapConfig_1.gridSize);
        }
    }
    return newMap;
};
exports.map = exports.createNodes();
exports.map = exports.createObstacles(120, 160, 120, 160, 'river');
exports.map = exports.createObstacles(660, 820, 180, 200, 'river');
exports.map = exports.createObstacles(900, 1180, 180, 200, 'river');
exports.map = exports.createOneObstacle(300, 340, 'mountain');
exports.map = exports.createObstacles(280, 320, 360, 380, 'mountain');
exports.map = exports.createObstacles(740, 760, 420, 500, 'forest');
exports.map = exports.createObstacles(960, 1000, 440, 460, 'forest');
exports.map = exports.createObstacles(980, 1000, 440, 520, 'forest');
exports.addNeighbours(exports.map);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var mapConfig_1 = __webpack_require__(0);
var warriorStore_1 = __webpack_require__(4);
var mapConfig_2 = __webpack_require__(0);
var Warrior_1 = __webpack_require__(11);
exports.onChooseWarrior = function (warriors, mouseX, mouseY) {
    var foundedWarrior = null;
    for (var _i = 0, warriors_1 = warriors; _i < warriors_1.length; _i++) {
        var warrior = warriors_1[_i];
        var bottomRightX = warrior.x + mapConfig_1.gridSize;
        var bottomRightY = warrior.y + mapConfig_1.gridSize;
        if (mouseX >= warrior.x && mouseX < bottomRightX && mouseY >= warrior.y && mouseY < bottomRightY) {
            console.log('warrior', warrior.name, ' was chosen');
            warrior.isCurrentlyChosen = true;
            foundedWarrior = warrior;
        }
    }
    warriorStore_1.assignCurrentlyChosenWarrior(foundedWarrior);
    console.log('currentlyChosenWarrior', warriorStore_1.currentlyChosenWarrior);
};
exports.drawWarrior = function (warrior) {
    mapConfig_2.ctx.beginPath();
    mapConfig_2.ctx.arc(warrior.centerX, warrior.centerY, warrior.radius, 0, Math.PI * 2);
    mapConfig_2.ctx.fillStyle = '#d92510';
    mapConfig_2.ctx.fill();
    mapConfig_2.ctx.closePath();
};
exports.assignWarriorMoveToPosition = function (warrior, x, y) {
    //console.error('assignMoveToPosition');
    if (warrior) {
        warrior.moveToNodeX = x;
        warrior.moveToNodeY = y;
        console.log(warrior.name + ' is moving to node:' + warrior.moveToNodeX + ' y:' + warrior.moveToNodeY);
    }
    else {
        console.log('warrior not chosen');
    }
};
// create Unit and immediatly push it into units array
exports.createWarrior = function (name, x, y, radius) {
    //console.error('createUnit');
    var warrior = new Warrior_1.default(name, x, y, radius);
    warriorStore_1.warriors.push(warrior);
    exports.drawWarrior(warrior);
    return warrior;
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteObjectFromArray = function (object, arr) {
    var updatedArr = arr.filter(function (el) {
        if (el.x === object.x && el.y === object.y) {
            return false;
        }
        return true;
    });
    return updatedArr;
};
exports.isObjectInArray = function (object, arr) {
    var result = false;
    for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
        var node = arr_1[_i];
        if (object.x === node.x && object.y === node.y) {
            result = true;
        }
    }
    return result;
};
exports.getNodeFromArray = function (object, arr) {
    for (var _i = 0, arr_2 = arr; _i < arr_2.length; _i++) {
        var node = arr_2[_i];
        if (node.x === object.x && node.y && object.y) {
            return node;
        }
    }
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.warriors = [];
exports.currentlyChosenWarrior = null;
exports.assignCurrentlyChosenWarrior = function (warrior) {
    // check unit
    if (warrior) {
        exports.currentlyChosenWarrior = warrior;
    }
    else {
        exports.currentlyChosenWarrior = null;
    }
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.units = [];
exports.currentlyChosenUnit = null;
exports.assignCurrentlyChosenUnit = function (unit) {
    // check unit
    if (unit) {
        exports.currentlyChosenUnit = unit;
    }
    else {
        exports.currentlyChosenUnit = null;
    }
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var mapConfig_1 = __webpack_require__(0);
var drawGrid_1 = __webpack_require__(7);
var createMap_1 = __webpack_require__(1);
var AStar_1 = __webpack_require__(8);
var drawPath_1 = __webpack_require__(10);
var warriorStore_1 = __webpack_require__(4);
var warriorAction_1 = __webpack_require__(2);
var warriorMovement_1 = __webpack_require__(12);
var unitActions_1 = __webpack_require__(13);
var unitStore_1 = __webpack_require__(5);
var warrior = warriorAction_1.createWarrior('barbarian', 80, 160, 5);
unitActions_1.createUnit('testUnit', 6, 240, 420);
drawGrid_1.drawGrid();
console.log('map', createMap_1.map);
console.log('currentlyChosenWarrior', warriorStore_1.currentlyChosenWarrior);
mapConfig_1.canvas.addEventListener('click', function (e) {
    console.error('Click');
    var x = e.offsetX; // get X
    var y = e.offsetY; // get Y
    console.log('Position x', e.offsetX); // get X
    console.log('Position y', e.offsetY); // get Y
    warriorAction_1.onChooseWarrior(warriorStore_1.warriors, x, y);
    unitActions_1.onChooseUnit(unitStore_1.units, warriorStore_1.currentlyChosenWarrior);
    console.log('currentlyChosenWarrior', warriorStore_1.currentlyChosenWarrior);
});
// set onClickListener for right mouse event
mapConfig_1.canvas.addEventListener('contextmenu', function (e) {
    console.error('Right Mouse Click');
    e.preventDefault();
    var x = e.offsetX; // get X
    var y = e.offsetY; // get Y
    var startNode = drawPath_1.getNodeFromMap(warriorStore_1.currentlyChosenWarrior.x, warriorStore_1.currentlyChosenWarrior.y);
    var finishNode = drawPath_1.getNodeFromMap(x, y);
    console.error('startNode', startNode);
    console.error('finishNode', finishNode);
    warriorAction_1.assignWarriorMoveToPosition(warriorStore_1.currentlyChosenWarrior, x, y);
    var path = AStar_1.aStar(startNode, finishNode);
    if (warriorStore_1.currentlyChosenWarrior) {
        warriorMovement_1.updateWarrior(warriorStore_1.currentlyChosenWarrior, path, 0, x, y);
    }
    //drawPath(path);
});


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var mapConfig_1 = __webpack_require__(0);
exports.drawGrid = function () {
    for (var y = 0; y <= mapConfig_1.HEIGHT; y += mapConfig_1.gridSize) {
        for (var x = 0; x <= mapConfig_1.WIDTH; x += mapConfig_1.gridSize) {
            mapConfig_1.ctx.strokeRect(x, y, mapConfig_1.gridSize, mapConfig_1.gridSize);
        }
    }
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var createMap_1 = __webpack_require__(1);
var objUtils_1 = __webpack_require__(3);
var aStarUtils_1 = __webpack_require__(9);
exports.aStar = function (startNode, finishNode) {
    // the set of currently discovered nodes that are not evaluated yet
    // Initially only the start node is known
    var open = [];
    // the set of nodes that already evaluated
    var closed = [];
    startNode.gScore = 0;
    startNode.fScore = startNode.gScore + exports.h(startNode, finishNode);
    open.push(startNode);
    // for each node, which node is can most efficiently be reached from
    // if a node can be reached from many nodes, cameFrom will eventially
    // contain the most efficient previous step
    var from = new Map();
    // For each node, the cost of getting from the start node to that node.
    // let gScore = new Map();
    // let fScore = new Map();
    //
    // gScore.set(startNode, 0);
    // fScore.set(startNode, gScore.get(startNode) + h(startNode, finishNode));
    while (open) {
        var current = aStarUtils_1.getMinFScore(open);
        console.log('current', current);
        if (current.x === finishNode.x && current.y === finishNode.y) {
            console.error('Path', exports.reconstructPath(from, current));
            return exports.reconstructPath(from, current);
        }
        open = objUtils_1.deleteObjectFromArray(current, open);
        closed.push(current);
        for (var _i = 0, _a = aStarUtils_1.unclosedNeigbours(current, closed); _i < _a.length; _i++) {
            var neighbour = _a[_i];
            var tempG = current.gScore + neighbour.distance;
            if (!objUtils_1.isObjectInArray(neighbour, open) || tempG < neighbour.gScore) {
                from.set(neighbour, current);
                neighbour.gScore = tempG;
                neighbour.fScore = neighbour.gScore + exports.h(neighbour, finishNode);
            }
            if (!objUtils_1.isObjectInArray(neighbour, open)) {
                var nodeNeighbours = createMap_1.neighbours(neighbour);
                neighbour.neighbours = nodeNeighbours;
                open.push(neighbour);
            }
        }
    }
    console.log('failure');
    return 0; // failure
};
exports.h = function (startNode, finishNode) {
    //function heuristic(node) =
    // dx = abs(node.x - goal.x)
    // dy = abs(node.y - goal.y)
    // return D * (dx + dy) + (D2 - 2 * D) * min(dx, dy)
    var D = 10; // cost of moving horizontally
    var D2 = 14; // cost of moving diagonally
    var dx = Math.abs(startNode.x - finishNode.x);
    var dy = Math.abs(startNode.y - finishNode.y);
    return D * (dx + dy) + (D2 - 2 * D) * Math.min(dx, dy);
};
exports.reconstructPath = function (from, current) {
    console.log('reconstructPath from:', from);
    console.log('reconstructPath current', current);
    // function reconstruct_path(cameFrom, current)
    //   total_path := [current]
    //   while current in cameFrom.Keys:
    //       current := cameFrom[current]
    //       total_path.append(current)
    //   return total_path
    var reversePath = [current];
    var totalPath = [];
    while (aStarUtils_1.isObjectInMapKeys(current, from)) {
        console.log('current', current);
        current = from.get(current);
        reversePath.push(current);
    }
    for (var i = reversePath.length - 1; i >= 0; i--) {
        totalPath.push(reversePath[i]);
    }
    return totalPath;
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.getMinFScore = function (open) {
    var min = 0;
    for (var i = 1; i < open.length - 1; ++i) {
        if (open[min].fScore > open[i].fScore) {
            min = i;
        }
    }
    return open[min];
};
exports.unclosedNeigbours = function (current, closed) {
    var neighboursNotInClosed = [];
    for (var _i = 0, _a = current.neighbours; _i < _a.length; _i++) {
        var neighbour = _a[_i];
        var isInClosed = false;
        for (var _b = 0, closed_1 = closed; _b < closed_1.length; _b++) {
            var node = closed_1[_b];
            if (neighbour.x === node.x && neighbour.y === node.y) {
                isInClosed = true;
            }
        }
        if (!isInClosed) {
            neighboursNotInClosed.push(neighbour);
        }
    }
    return neighboursNotInClosed;
};
exports.isObjectInMapKeys = function (object, map) {
    var arr = Array.from(map);
    var result = false;
    for (var i = 0; i < arr.length; ++i) {
        //console.log('object', object);
        if (arr[i][0].x === object.x && arr[i][0].y === object.y) {
            result = true;
        }
    }
    console.log('result', result);
    return result;
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var mapConfig_1 = __webpack_require__(0);
var createMap_1 = __webpack_require__(1);
exports.drawPath = function (path) {
    for (var _i = 0, path_1 = path; _i < path_1.length; _i++) {
        var step = path_1[_i];
        mapConfig_1.ctx.fillStyle = 'yellow';
        mapConfig_1.ctx.fillRect(step.x, step.y, mapConfig_1.gridSize, mapConfig_1.gridSize);
    }
};
exports.getNodeFromMap = function (x, y) {
    var node;
    for (var _i = 0, map_1 = createMap_1.map; _i < map_1.length; _i++) {
        var grid = map_1[_i];
        var bottomRightX = grid.x + mapConfig_1.gridSize;
        var bottomRightY = grid.y + mapConfig_1.gridSize;
        if (x >= grid.x && x < bottomRightX && y >= grid.y && y < bottomRightY) {
            node = grid;
        }
    }
    return node;
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var mapConfig_1 = __webpack_require__(0);
var Warrior = /** @class */ (function () {
    function Warrior(name, x, y, radius) {
        this.isCurrentlyChosen = false;
        this.name = name;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.centerX = x + (mapConfig_1.gridSize / 2);
        this.centerY = y + (mapConfig_1.gridSize / 2);
    }
    Warrior.prototype.setX = function (x) {
        this.x = x;
        this.centerX = x + (mapConfig_1.gridSize / 2);
    };
    Warrior.prototype.setY = function (y) {
        this.y = y;
        this.centerY = y + (mapConfig_1.gridSize / 2);
    };
    Warrior.prototype.assignPosition = function (newPosition) {
        this.positionInUnit = newPosition;
    };
    return Warrior;
}());
exports.default = Warrior;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var warriorAction_1 = __webpack_require__(2);
var mapConfig_1 = __webpack_require__(0);
exports.updateWarrior = function (warrior, path, i, currentMoveToX, currentMoveToY) {
    if (i === void 0) { i = 0; }
    if (currentMoveToX !== warrior.moveToNodeX || currentMoveToY !== warrior.moveToNodeY)
        return;
    var updatedPath = path;
    var node = path[i]; // get next node
    var nodeToClear = node;
    ;
    if (i !== 0) {
        nodeToClear = updatedPath[i - 1];
    }
    mapConfig_1.ctx.clearRect(nodeToClear.x, nodeToClear.y, mapConfig_1.gridSize, mapConfig_1.gridSize);
    warrior.setX(node.x); // calculate center of the current node
    warrior.setY(node.y);
    //console.log('warrior.x', warrior.x, 'warrior.y', warrior.y);
    warriorAction_1.drawWarrior(warrior);
    i++;
    if (i !== updatedPath.length) {
        setTimeout(function () {
            exports.updateWarrior(warrior, updatedPath, i, currentMoveToX, currentMoveToY);
        }, 300);
    }
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var warriorAction_1 = __webpack_require__(2);
var mapConfig_1 = __webpack_require__(0);
var Unit_1 = __webpack_require__(14);
var unitStore_1 = __webpack_require__(5);
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
exports.addWarriorsToUnit = function (unit) {
    var startX = unit.commanderPositionX;
    var startY = unit.commanderPositionY;
    var i = 1;
    var row = unit.quantity / 2;
    var col = Math.ceil(unit.quantity / row);
    var finishX = startX + ((row - 1) * mapConfig_1.gridSize);
    var finishY = startY + ((col - 1) * mapConfig_1.gridSize);
    var radius = mapConfig_1.gridSize / 4;
    for (var y = startX; y <= finishY; y += mapConfig_1.gridSize) {
        if (i <= unit.quantity) {
            for (var x = startX; x <= finishX; x += mapConfig_1.gridSize) {
                var currentWarrior = warriorAction_1.createWarrior(unit.name, x, y, radius);
                currentWarrior.assignPosition(i);
                unit.addWarriorToUnit(currentWarrior);
                i++;
            }
        }
    }
};
exports.createUnit = function (name, quantity, posX, posY) {
    var newUnit = new Unit_1.default(name, quantity, posX, posY);
    var radius = mapConfig_1.gridSize / 4;
    exports.addWarriorsToUnit(newUnit);
    unitStore_1.units.push(newUnit);
};
// warriors in the unit have same name as unit that they assigned to
// if warrior with same name is chosen that means that unit also
// has been chosen
exports.onChooseUnit = function (units, currentlyChosenWarrior) {
    var foundedUnit = null;
    if (currentlyChosenWarrior) {
        for (var _i = 0, units_1 = units; _i < units_1.length; _i++) {
            var unit = units_1[_i];
            if (currentlyChosenWarrior.name === unit.name) {
                foundedUnit = unit;
            }
        }
    }
    unitStore_1.assignCurrentlyChosenUnit(foundedUnit);
    console.log('currentlyChosenUnit', unitStore_1.currentlyChosenUnit);
};
exports.updateUnit = function (unit, path, i, currentMoveToX, currentMoveToY) {
    if (i === void 0) { i = 0; }
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Unit = /** @class */ (function () {
    function Unit(name, quantity, posX, posY) {
        this.warriors = [];
        this.name = name;
        this.quantity = quantity;
        this.commanderPositionX = posX;
        this.commanderPositionY = posX;
    }
    Unit.prototype.addWarriorToUnit = function (warrior) {
        this.warriors.push(warrior);
    };
    return Unit;
}());
exports.default = Unit;


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZGNhYTJiODQxNDM0YTU1ZTU4NTMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hcC9tYXBDb25maWcudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hcC9jcmVhdGVNYXAudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dhcnJpb3Ivd2FycmlvckFjdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvb2JqVXRpbHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0b3JlL3dhcnJpb3JTdG9yZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc3RvcmUvdW5pdFN0b3JlLnRzIiwid2VicGFjazovLy8uL3NyYy9nYW1lLnRzIiwid2VicGFjazovLy8uL3NyYy9tYXAvZHJhd0dyaWQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhdGgvQVN0YXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhdGgvYVN0YXJVdGlscy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcGF0aC9kcmF3UGF0aC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd2Fycmlvci9XYXJyaW9yLnRzIiwid2VicGFjazovLy8uL3NyYy93YXJyaW9yL3dhcnJpb3JNb3ZlbWVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdW5pdC91bml0QWN0aW9ucy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdW5pdC9Vbml0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxl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QUM5QixDQUFDO0lBQ0gsV0FBQztBQUFELENBQUM7QUFFRCxrQkFBZSxJQUFJLENBQUMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZGNhYTJiODQxNDM0YTU1ZTU4NTMiLCIvLyBnbG9iYWwgdmFyaWFibGVzXG5leHBvcnQgY29uc3QgV0lEVEg6IG51bWJlciA9IDEyMDA7XG5leHBvcnQgY29uc3QgSEVJR0hUOiBudW1iZXIgPSA2MDA7XG5leHBvcnQgY29uc3QgZ3JpZFNpemU6bnVtYmVyID0gMjA7XG5cbi8vIGNyZWF0ZSBDYW52YXNcbmV4cG9ydCBsZXQgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG5jYW52YXMuaWQgPSBcImNhbnZhc1wiO1xuY2FudmFzLndpZHRoID0gV0lEVEg7XG5jYW52YXMuaGVpZ2h0ID0gSEVJR0hUO1xuY2FudmFzLnN0eWxlLmJvcmRlciA9IFwiMXB4IHNvbGlkXCI7XG5cbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY2FudmFzKTtcblxuLy8gZGVmaW5lIDJkIGNvbnRleHRcbmV4cG9ydCBsZXQgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tYXAvbWFwQ29uZmlnLnRzIiwiaW1wb3J0IHtcbiAgY2FudmFzLFxuICBjdHgsXG4gIFdJRFRILFxuICBIRUlHSFQsXG4gIGdyaWRTaXplXG59IGZyb20gJy4uL21hcC9tYXBDb25maWcnO1xuXG5pbXBvcnQge1xuICBkZWxldGVPYmplY3RGcm9tQXJyYXksXG59IGZyb20gJy4uL3V0aWxzL29ialV0aWxzJztcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZU5vZGVzID0gKCkgPT4ge1xuICBsZXQgbWFwOmFueVtdID0gW107XG4gIGxldCB2YWx1ZSA9IDE7XG4gIGxldCBpZCA9IDA7XG4gIGZvcihsZXQgeSA9IDA7IHkgPD0gSEVJR0hUOyB5Kz0gZ3JpZFNpemUpIHtcbiAgICBmb3IobGV0IHggPSAwOyB4IDw9IFdJRFRIOyB4Kz0gZ3JpZFNpemUpIHtcbiAgICAgIG1hcC5wdXNoKHtcbiAgICAgICAgaWQ6IGlkLFxuICAgICAgICB4OiB4LFxuICAgICAgICB5OiB5LFxuICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgIG5laWdoYm91cnM6IFtdXG4gICAgICB9KTtcbiAgICAgIGlkKys7XG4gICAgfVxuICB9XG4gIHJldHVybiBtYXA7XG59XG5cbmV4cG9ydCBjb25zdCBuZWlnaGJvdXJzID0gKG5vZGU6YW55KSA9PiB7XG4gIGxldCBkaXJzID0gW1xuICAgIHt4OiAtZ3JpZFNpemUsIHk6IC1ncmlkU2l6ZSwgZGlzdGFuY2U6IDE0fSxcbiAgICB7eDogMCwgeTogLWdyaWRTaXplLCBkaXN0YW5jZTogMTB9LFxuICAgIHt4OiBncmlkU2l6ZSwgeTogLWdyaWRTaXplLCBkaXN0YW5jZTogMTR9LFxuICAgIHt4OiAtZ3JpZFNpemUsIHk6IDAsIGRpc3RhbmNlOiAxMH0sXG4gICAge3g6IGdyaWRTaXplLCB5OiAwLCBkaXN0YW5jZTogMTB9LFxuICAgIHt4OiAtZ3JpZFNpemUsIHk6IGdyaWRTaXplLCBkaXN0YW5jZTogMTR9LFxuICAgIHt4OiAwLCB5OiBncmlkU2l6ZSwgZGlzdGFuY2U6IDEwfSxcbiAgICB7eDogZ3JpZFNpemUsIHk6IGdyaWRTaXplLCBkaXN0YW5jZTogMTR9XG4gIF07XG4gIGxldCByZXN1bHQgPSBbXTtcbiAgZm9yKGxldCBkaXIgb2YgZGlycykge1xuICAgIGxldCBuZWlnaGJvdXIgPSB7XG4gICAgICB4OiBub2RlLnggKyBkaXIueCxcbiAgICAgIHk6IG5vZGUueSArIGRpci55LFxuICAgICAgZGlzdGFuY2U6IGRpci5kaXN0YW5jZVxuICAgIH1cbiAgICBpZihuZWlnaGJvdXIueCA+PSAwICYmIG5laWdoYm91ci54IDwgV0lEVEggJiYgbmVpZ2hib3VyLnkgPj0gMCAmJiBuZWlnaGJvdXIueSA8IEhFSUdIVCkge1xuICAgICAgICBsZXQgZmluZGVkOmJvb2xlYW4gPSBmYWxzZTtcbiAgICAgICAgZm9yKGxldCBub2RlIG9mIG1hcCkge1xuICAgICAgICAgIGlmKG5laWdoYm91ci54ID09PSBub2RlLnggJiYgbmVpZ2hib3VyLnkgPT09IG5vZGUueSkge1xuICAgICAgICAgICAgZmluZGVkID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYoZmluZGVkKSB7XG4gICAgICAgICAgcmVzdWx0LnB1c2goe1xuICAgICAgICAgICAgeDogbmVpZ2hib3VyLngsXG4gICAgICAgICAgICB5OiBuZWlnaGJvdXIueSxcbiAgICAgICAgICAgIGRpc3RhbmNlOiBuZWlnaGJvdXIuZGlzdGFuY2UsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGNvbnN0IGFkZE5laWdoYm91cnMgPSAobWFwOmFueVtdKSA9PiB7XG4gIGZvcihsZXQgbm9kZSBvZiBtYXApIHtcbiAgICBsZXQgbiA9IG5laWdoYm91cnMobm9kZSk7XG4gICAgbm9kZS5uZWlnaGJvdXJzID0gbjtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgY3JlYXRlT25lT2JzdGFjbGUgPSAocG9zaXRpb25YOm51bWJlciwgcG9zaXRpb25ZOm51bWJlciwgdHlwZTpzdHJpbmc9J2ZvcmVzdCcpID0+IHtcbiAgbGV0IG5vZGUgPSB7XG4gICAgeDogcG9zaXRpb25YLFxuICAgIHk6IHBvc2l0aW9uWVxuICB9O1xuICBpZih0eXBlID09PSAnZm9yZXN0JykgY3R4LmZpbGxTdHlsZSA9ICdncmVlbic7XG4gIGVsc2UgaWYodHlwZSA9PT0gJ21vdW50YWluJykgY3R4LmZpbGxTdHlsZSA9ICcjOEI0NTEzJztcbiAgZWxzZSBpZih0eXBlID09PSAncml2ZXInKSBjdHguZmlsbFN0eWxlID0gJ2JsdWUnO1xuICBjdHguZmlsbFJlY3QocG9zaXRpb25YLCBwb3NpdGlvblksIGdyaWRTaXplLCBncmlkU2l6ZSk7XG4gIHJldHVybiBkZWxldGVPYmplY3RGcm9tQXJyYXkobm9kZSwgbWFwKVxufVxuXG5leHBvcnQgY29uc3QgY3JlYXRlT2JzdGFjbGVzID0gKHN0YXJ0WDpudW1iZXIsIGZpbmlzaFg6bnVtYmVyLCBzdGFydFk6bnVtYmVyLCBmaW5pc2hZOm51bWJlciwgdHlwZTpzdHJpbmc9J2ZvcmVzdCcpID0+IHtcbiAgbGV0IG5ld01hcDphbnlbXSA9IG1hcDtcbiAgZm9yKGxldCB4ID0gc3RhcnRYOyB4IDw9IGZpbmlzaFg7IHggKz0gZ3JpZFNpemUpIHtcbiAgICBmb3IobGV0IHkgPSBzdGFydFk7IHkgPD0gZmluaXNoWTsgeSArPSBncmlkU2l6ZSkge1xuICAgICAgbGV0IG5vZGUgPSB7XG4gICAgICAgIHgsXG4gICAgICAgIHlcbiAgICAgIH1cbiAgICAgIG5ld01hcCA9IGRlbGV0ZU9iamVjdEZyb21BcnJheShub2RlLCBuZXdNYXApO1xuICAgICAgaWYodHlwZSA9PT0gJ2ZvcmVzdCcpIGN0eC5maWxsU3R5bGUgPSAnZ3JlZW4nO1xuICAgICAgZWxzZSBpZih0eXBlID09PSAnbW91bnRhaW4nKSBjdHguZmlsbFN0eWxlID0gJyM4QjQ1MTMnO1xuICAgICAgZWxzZSBpZih0eXBlID09PSAncml2ZXInKSBjdHguZmlsbFN0eWxlID0gJ2JsdWUnO1xuICAgICAgbGV0IHhMZW5ndGggPSBNYXRoLmFicyhzdGFydFggLSBmaW5pc2hYKTtcbiAgICAgIGxldCB5TGVuZ3RoID0gTWF0aC5hYnMoc3RhcnRZIC0gZmluaXNoWSk7XG4gICAgICBjdHguZmlsbFJlY3QoeCwgeSwgZ3JpZFNpemUsIGdyaWRTaXplKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG5ld01hcDtcbn1cblxuZXhwb3J0IGxldCBtYXAgPSBjcmVhdGVOb2RlcygpO1xubWFwID0gY3JlYXRlT2JzdGFjbGVzKDEyMCwgMTYwLCAxMjAsIDE2MCwgJ3JpdmVyJyk7XG5tYXAgPSBjcmVhdGVPYnN0YWNsZXMoNjYwLCA4MjAsIDE4MCwgMjAwLCAncml2ZXInKTtcbm1hcCA9IGNyZWF0ZU9ic3RhY2xlcyg5MDAsIDExODAsIDE4MCwgMjAwLCAncml2ZXInKTtcbm1hcCA9IGNyZWF0ZU9uZU9ic3RhY2xlKDMwMCwgMzQwLCAnbW91bnRhaW4nKTtcbm1hcCA9IGNyZWF0ZU9ic3RhY2xlcygyODAsIDMyMCwgMzYwLCAzODAsICdtb3VudGFpbicpO1xubWFwID0gY3JlYXRlT2JzdGFjbGVzKDc0MCwgNzYwLCA0MjAsIDUwMCwgJ2ZvcmVzdCcpO1xubWFwID0gY3JlYXRlT2JzdGFjbGVzKDk2MCwgMTAwMCwgNDQwLCA0NjAsICdmb3Jlc3QnKTtcbm1hcCA9IGNyZWF0ZU9ic3RhY2xlcyg5ODAsIDEwMDAsIDQ0MCwgNTIwLCAnZm9yZXN0Jyk7XG5hZGROZWlnaGJvdXJzKG1hcCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFwL2NyZWF0ZU1hcC50cyIsImltcG9ydCB7Z3JpZFNpemV9IGZyb20gJy4uL21hcC9tYXBDb25maWcnO1xuaW1wb3J0IHtcbiAgd2FycmlvcnMsXG4gIGN1cnJlbnRseUNob3NlbldhcnJpb3IsXG4gIGFzc2lnbkN1cnJlbnRseUNob3NlbldhcnJpb3Jcbn0gZnJvbSAnLi4vc3RvcmUvd2FycmlvclN0b3JlJztcbmltcG9ydCB7Y3R4fSBmcm9tICcuLi9tYXAvbWFwQ29uZmlnJztcbmltcG9ydCBXYXJyaW9yIGZyb20gJy4vV2Fycmlvcic7XG5cbmV4cG9ydCBjb25zdCBvbkNob29zZVdhcnJpb3IgPSAod2FycmlvcnM6YW55W10sIG1vdXNlWDpudW1iZXIsIG1vdXNlWTpudW1iZXIpID0+IHtcbiAgbGV0IGZvdW5kZWRXYXJyaW9yID0gbnVsbDtcbiAgZm9yKGxldCB3YXJyaW9yIG9mIHdhcnJpb3JzKSB7XG4gICAgbGV0IGJvdHRvbVJpZ2h0WCA9IHdhcnJpb3IueCArIGdyaWRTaXplO1xuICAgIGxldCBib3R0b21SaWdodFkgPSB3YXJyaW9yLnkgKyBncmlkU2l6ZTtcbiAgICBpZihtb3VzZVggPj0gd2Fycmlvci54ICYmIG1vdXNlWCA8IGJvdHRvbVJpZ2h0WCAmJiBtb3VzZVkgPj0gd2Fycmlvci55ICYmIG1vdXNlWSA8IGJvdHRvbVJpZ2h0WSkge1xuICAgICAgY29uc29sZS5sb2coJ3dhcnJpb3InLCB3YXJyaW9yLm5hbWUsICcgd2FzIGNob3NlbicpO1xuICAgICAgd2Fycmlvci5pc0N1cnJlbnRseUNob3NlbiA9IHRydWU7XG4gICAgICBmb3VuZGVkV2FycmlvciA9IHdhcnJpb3I7XG4gICAgfVxuICB9XG4gIGFzc2lnbkN1cnJlbnRseUNob3NlbldhcnJpb3IoZm91bmRlZFdhcnJpb3IpO1xuICBjb25zb2xlLmxvZygnY3VycmVudGx5Q2hvc2VuV2FycmlvcicsIGN1cnJlbnRseUNob3NlbldhcnJpb3IpO1xufVxuXG5leHBvcnQgY29uc3QgZHJhd1dhcnJpb3IgPSAod2FycmlvcjphbnkpID0+IHtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4LmFyYyh3YXJyaW9yLmNlbnRlclgsIHdhcnJpb3IuY2VudGVyWSwgd2Fycmlvci5yYWRpdXMsIDAsIE1hdGguUEkqMik7XG4gICAgY3R4LmZpbGxTdHlsZSA9ICcjZDkyNTEwJztcbiAgICBjdHguZmlsbCgpO1xuICAgIGN0eC5jbG9zZVBhdGgoKTtcbn1cblxuZXhwb3J0IGNvbnN0IGFzc2lnbldhcnJpb3JNb3ZlVG9Qb3NpdGlvbiA9ICh3YXJyaW9yOmFueSwgeDpudW1iZXIsIHk6bnVtYmVyKSA9PiB7XG4gIC8vY29uc29sZS5lcnJvcignYXNzaWduTW92ZVRvUG9zaXRpb24nKTtcbiAgaWYod2Fycmlvcikge1xuICAgIHdhcnJpb3IubW92ZVRvTm9kZVggPSB4O1xuICAgIHdhcnJpb3IubW92ZVRvTm9kZVkgPSB5O1xuICAgIGNvbnNvbGUubG9nKHdhcnJpb3IubmFtZSArICcgaXMgbW92aW5nIHRvIG5vZGU6JyArIHdhcnJpb3IubW92ZVRvTm9kZVggKyAnIHk6JyArIHdhcnJpb3IubW92ZVRvTm9kZVkpO1xuICB9IGVsc2Uge1xuICAgIGNvbnNvbGUubG9nKCd3YXJyaW9yIG5vdCBjaG9zZW4nKTtcbiAgfVxufVxuXG4vLyBjcmVhdGUgVW5pdCBhbmQgaW1tZWRpYXRseSBwdXNoIGl0IGludG8gdW5pdHMgYXJyYXlcbmV4cG9ydCBsZXQgY3JlYXRlV2FycmlvciA9IChuYW1lOnN0cmluZywgeDpudW1iZXIsIHk6bnVtYmVyLCByYWRpdXM6bnVtYmVyKSA9PiB7XG4gIC8vY29uc29sZS5lcnJvcignY3JlYXRlVW5pdCcpO1xuICBsZXQgd2FycmlvciA9IG5ldyBXYXJyaW9yKG5hbWUsIHgsIHksIHJhZGl1cyk7XG4gIHdhcnJpb3JzLnB1c2god2Fycmlvcik7XG4gIGRyYXdXYXJyaW9yKHdhcnJpb3IpO1xuICByZXR1cm4gd2Fycmlvcjtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy93YXJyaW9yL3dhcnJpb3JBY3Rpb24udHMiLCJleHBvcnQgY29uc3QgZGVsZXRlT2JqZWN0RnJvbUFycmF5ID0gKG9iamVjdDphbnksIGFycjphbnlbXSkgPT4ge1xuICBsZXQgdXBkYXRlZEFyciA9IGFyci5maWx0ZXIoKGVsKSA9PiB7XG4gICAgaWYoZWwueCA9PT0gb2JqZWN0LnggJiYgZWwueSA9PT0gb2JqZWN0LnkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH0pO1xuICByZXR1cm4gdXBkYXRlZEFycjtcbn1cblxuZXhwb3J0IGNvbnN0IGlzT2JqZWN0SW5BcnJheSA9IChvYmplY3Q6YW55LCBhcnI6YW55W10pID0+IHtcbiAgbGV0IHJlc3VsdDpib29sZWFuID0gZmFsc2U7XG4gIGZvcihsZXQgbm9kZSBvZiBhcnIpIHtcbiAgICBpZihvYmplY3QueCA9PT0gbm9kZS54ICYmIG9iamVjdC55ID09PSBub2RlLnkpIHtcbiAgICAgIHJlc3VsdCA9IHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBjb25zdCBnZXROb2RlRnJvbUFycmF5ID0gKG9iamVjdDphbnksIGFycjphbnlbXSkgPT4ge1xuICBmb3IobGV0IG5vZGUgb2YgYXJyKSB7XG4gICAgaWYobm9kZS54ID09PSBvYmplY3QueCAmJiBub2RlLnkgJiYgb2JqZWN0LnkpIHtcbiAgICAgIHJldHVybiBub2RlO1xuICAgIH1cbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3V0aWxzL29ialV0aWxzLnRzIiwiZXhwb3J0IGNvbnN0IHdhcnJpb3JzOmFueVtdID0gW107XG5leHBvcnQgbGV0IGN1cnJlbnRseUNob3NlbldhcnJpb3I6YW55ID0gbnVsbDtcblxuZXhwb3J0IGNvbnN0IGFzc2lnbkN1cnJlbnRseUNob3NlbldhcnJpb3IgPSAod2FycmlvcjphbnkpID0+IHtcbiAgLy8gY2hlY2sgdW5pdFxuICBpZih3YXJyaW9yKSB7XG4gICAgICBjdXJyZW50bHlDaG9zZW5XYXJyaW9yID0gd2FycmlvcjtcbiAgfSBlbHNlIHtcbiAgICBjdXJyZW50bHlDaG9zZW5XYXJyaW9yID0gbnVsbDtcbiAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc3RvcmUvd2FycmlvclN0b3JlLnRzIiwiZXhwb3J0IGNvbnN0IHVuaXRzOmFueVtdID0gW107XG5leHBvcnQgbGV0IGN1cnJlbnRseUNob3NlblVuaXQ6YW55ID0gbnVsbDtcblxuZXhwb3J0IGNvbnN0IGFzc2lnbkN1cnJlbnRseUNob3NlblVuaXQgPSAodW5pdDphbnkpID0+IHtcbiAgLy8gY2hlY2sgdW5pdFxuICBpZih1bml0KSB7XG4gICAgICBjdXJyZW50bHlDaG9zZW5Vbml0ID0gdW5pdDtcbiAgfSBlbHNlIHtcbiAgICBjdXJyZW50bHlDaG9zZW5Vbml0ID0gbnVsbDtcbiAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc3RvcmUvdW5pdFN0b3JlLnRzIiwiaW1wb3J0IHtcbiAgY2FudmFzLFxuICBjdHgsXG4gIFdJRFRILFxuICBIRUlHSFQsXG4gIGdyaWRTaXplXG59IGZyb20gJy4vbWFwL21hcENvbmZpZyc7XG5cbmltcG9ydCB7ZHJhd0dyaWR9IGZyb20gJy4vbWFwL2RyYXdHcmlkJztcbmltcG9ydCB7XG4gIGFkZE5laWdoYm91cnMsXG4gIGNyZWF0ZU5vZGVzLFxuICBtYXBcbn0gZnJvbSAnLi9tYXAvY3JlYXRlTWFwJztcbmltcG9ydCB7c2hvd09ic3RhY2xlc30gZnJvbSAnLi9tYXAvbWFwVXRpbHMnO1xuaW1wb3J0IHtoLCBhU3Rhcn0gZnJvbSAnLi9wYXRoL0FTdGFyJztcbmltcG9ydCB7XG4gIGRyYXdQYXRoLFxuICBnZXROb2RlRnJvbU1hcFxufSBmcm9tICcuL3BhdGgvZHJhd1BhdGgnO1xuXG5pbXBvcnQgV2FycmlvciBmcm9tICcuL3dhcnJpb3IvV2Fycmlvcic7XG5pbXBvcnQge3dhcnJpb3JzLCBjdXJyZW50bHlDaG9zZW5XYXJyaW9yfSBmcm9tICcuL3N0b3JlL3dhcnJpb3JTdG9yZSc7XG5pbXBvcnQge1xuICBvbkNob29zZVdhcnJpb3IsXG4gIGNyZWF0ZVdhcnJpb3IsXG4gIGFzc2lnbldhcnJpb3JNb3ZlVG9Qb3NpdGlvbixcbn0gZnJvbSAnLi93YXJyaW9yL3dhcnJpb3JBY3Rpb24nO1xuaW1wb3J0IHt1cGRhdGVXYXJyaW9yfSBmcm9tICcuL3dhcnJpb3Ivd2Fycmlvck1vdmVtZW50JztcblxuaW1wb3J0IHtcbiAgY3JlYXRlVW5pdCxcbiAgb25DaG9vc2VVbml0XG59IGZyb20gJy4vdW5pdC91bml0QWN0aW9ucyc7XG5pbXBvcnQge1xuICB1bml0cyxcbiAgY3VycmVudGx5Q2hvc2VuVW5pdFxufSBmcm9tICcuL3N0b3JlL3VuaXRTdG9yZSc7XG5cbmxldCB3YXJyaW9yID0gY3JlYXRlV2FycmlvcignYmFyYmFyaWFuJywgODAsIDE2MCwgNSk7XG5jcmVhdGVVbml0KCd0ZXN0VW5pdCcsIDYsIDI0MCwgNDIwKTtcblxuZHJhd0dyaWQoKTtcbmNvbnNvbGUubG9nKCdtYXAnLCBtYXApO1xuY29uc29sZS5sb2coJ2N1cnJlbnRseUNob3NlbldhcnJpb3InLCBjdXJyZW50bHlDaG9zZW5XYXJyaW9yKTtcblxuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgY29uc29sZS5lcnJvcignQ2xpY2snKTtcbiAgbGV0IHggPSBlLm9mZnNldFg7IC8vIGdldCBYXG4gIGxldCB5ID0gZS5vZmZzZXRZOyAvLyBnZXQgWVxuICBjb25zb2xlLmxvZygnUG9zaXRpb24geCcsIGUub2Zmc2V0WCk7IC8vIGdldCBYXG4gIGNvbnNvbGUubG9nKCdQb3NpdGlvbiB5JywgZS5vZmZzZXRZKTsgLy8gZ2V0IFlcbiAgb25DaG9vc2VXYXJyaW9yKHdhcnJpb3JzLCB4LCB5KTtcbiAgb25DaG9vc2VVbml0KHVuaXRzLCBjdXJyZW50bHlDaG9zZW5XYXJyaW9yKTtcbiAgY29uc29sZS5sb2coJ2N1cnJlbnRseUNob3NlbldhcnJpb3InLCBjdXJyZW50bHlDaG9zZW5XYXJyaW9yKTtcbn0pO1xuXG4vLyBzZXQgb25DbGlja0xpc3RlbmVyIGZvciByaWdodCBtb3VzZSBldmVudFxuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ2NvbnRleHRtZW51JywgKGUpID0+IHtcbiAgY29uc29sZS5lcnJvcignUmlnaHQgTW91c2UgQ2xpY2snKTtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBsZXQgeCA9IGUub2Zmc2V0WDsgLy8gZ2V0IFhcbiAgbGV0IHkgPSBlLm9mZnNldFk7IC8vIGdldCBZXG4gIGxldCBzdGFydE5vZGUgPSBnZXROb2RlRnJvbU1hcChjdXJyZW50bHlDaG9zZW5XYXJyaW9yLngsIGN1cnJlbnRseUNob3NlbldhcnJpb3IueSk7XG4gIGxldCBmaW5pc2hOb2RlID0gZ2V0Tm9kZUZyb21NYXAoeCwgeSk7XG4gIGNvbnNvbGUuZXJyb3IoJ3N0YXJ0Tm9kZScsIHN0YXJ0Tm9kZSk7XG4gIGNvbnNvbGUuZXJyb3IoJ2ZpbmlzaE5vZGUnLCBmaW5pc2hOb2RlKTtcbiAgYXNzaWduV2Fycmlvck1vdmVUb1Bvc2l0aW9uKGN1cnJlbnRseUNob3NlbldhcnJpb3IsIHgsIHkpO1xuICBsZXQgcGF0aDphbnkgPSBhU3RhcihzdGFydE5vZGUsIGZpbmlzaE5vZGUpO1xuICBpZihjdXJyZW50bHlDaG9zZW5XYXJyaW9yKSB7XG4gICAgdXBkYXRlV2FycmlvcihjdXJyZW50bHlDaG9zZW5XYXJyaW9yLCBwYXRoLCAwLCB4LCB5KTtcbiAgfVxuICAvL2RyYXdQYXRoKHBhdGgpO1xufSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZ2FtZS50cyIsImltcG9ydCB7XG4gIGNhbnZhcyxcbiAgY3R4LFxuICBXSURUSCxcbiAgSEVJR0hULFxuICBncmlkU2l6ZVxufSBmcm9tICcuL21hcENvbmZpZyc7XG5cbmV4cG9ydCBjb25zdCBkcmF3R3JpZCA9ICgpID0+IHtcbiAgZm9yKGxldCB5ID0gMDsgeSA8PSBIRUlHSFQ7IHkrPSBncmlkU2l6ZSkge1xuICAgIGZvcihsZXQgeCA9IDA7IHggPD0gV0lEVEg7IHgrPSBncmlkU2l6ZSkge1xuICAgICAgY3R4LnN0cm9rZVJlY3QoeCwgeSwgZ3JpZFNpemUsIGdyaWRTaXplKTtcbiAgICB9XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tYXAvZHJhd0dyaWQudHMiLCJpbXBvcnQge25laWdoYm91cnN9IGZyb20gJy4uL21hcC9jcmVhdGVNYXAnO1xuaW1wb3J0IHtcbiAgZGVsZXRlT2JqZWN0RnJvbUFycmF5LFxuICBpc09iamVjdEluQXJyYXlcbn0gZnJvbSAnLi4vdXRpbHMvb2JqVXRpbHMnO1xuXG5pbXBvcnQge1xuICBnZXRNaW5GU2NvcmUsXG4gIHVuY2xvc2VkTmVpZ2JvdXJzLFxuICBpc09iamVjdEluTWFwS2V5c1xufSBmcm9tICcuL2FTdGFyVXRpbHMnO1xuXG5leHBvcnQgY29uc3QgYVN0YXIgPSAoc3RhcnROb2RlOmFueSwgZmluaXNoTm9kZTphbnkpID0+IHtcbiAgLy8gdGhlIHNldCBvZiBjdXJyZW50bHkgZGlzY292ZXJlZCBub2RlcyB0aGF0IGFyZSBub3QgZXZhbHVhdGVkIHlldFxuICAvLyBJbml0aWFsbHkgb25seSB0aGUgc3RhcnQgbm9kZSBpcyBrbm93blxuICBsZXQgb3BlbjphbnlbXSA9IFtdO1xuXG4gIC8vIHRoZSBzZXQgb2Ygbm9kZXMgdGhhdCBhbHJlYWR5IGV2YWx1YXRlZFxuICBsZXQgY2xvc2VkOmFueVtdID0gW107XG4gIHN0YXJ0Tm9kZS5nU2NvcmUgPSAwO1xuICBzdGFydE5vZGUuZlNjb3JlID0gc3RhcnROb2RlLmdTY29yZSArIGgoc3RhcnROb2RlLCBmaW5pc2hOb2RlKVxuICBvcGVuLnB1c2goc3RhcnROb2RlKTtcblxuICAvLyBmb3IgZWFjaCBub2RlLCB3aGljaCBub2RlIGlzIGNhbiBtb3N0IGVmZmljaWVudGx5IGJlIHJlYWNoZWQgZnJvbVxuICAvLyBpZiBhIG5vZGUgY2FuIGJlIHJlYWNoZWQgZnJvbSBtYW55IG5vZGVzLCBjYW1lRnJvbSB3aWxsIGV2ZW50aWFsbHlcbiAgLy8gY29udGFpbiB0aGUgbW9zdCBlZmZpY2llbnQgcHJldmlvdXMgc3RlcFxuICBsZXQgZnJvbSA9IG5ldyBNYXAoKTtcblxuICAvLyBGb3IgZWFjaCBub2RlLCB0aGUgY29zdCBvZiBnZXR0aW5nIGZyb20gdGhlIHN0YXJ0IG5vZGUgdG8gdGhhdCBub2RlLlxuICAvLyBsZXQgZ1Njb3JlID0gbmV3IE1hcCgpO1xuICAvLyBsZXQgZlNjb3JlID0gbmV3IE1hcCgpO1xuICAvL1xuICAvLyBnU2NvcmUuc2V0KHN0YXJ0Tm9kZSwgMCk7XG4gIC8vIGZTY29yZS5zZXQoc3RhcnROb2RlLCBnU2NvcmUuZ2V0KHN0YXJ0Tm9kZSkgKyBoKHN0YXJ0Tm9kZSwgZmluaXNoTm9kZSkpO1xuICB3aGlsZShvcGVuKSB7XG4gICAgbGV0IGN1cnJlbnQ6YW55ID0gZ2V0TWluRlNjb3JlKG9wZW4pO1xuICAgIGNvbnNvbGUubG9nKCdjdXJyZW50JywgY3VycmVudCk7XG4gICAgaWYoY3VycmVudC54ID09PSBmaW5pc2hOb2RlLnggJiYgY3VycmVudC55ID09PSBmaW5pc2hOb2RlLnkpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ1BhdGgnLCByZWNvbnN0cnVjdFBhdGgoZnJvbSwgY3VycmVudCkpO1xuICAgICAgcmV0dXJuIHJlY29uc3RydWN0UGF0aChmcm9tLCBjdXJyZW50KTtcbiAgICB9XG4gICAgb3BlbiA9IGRlbGV0ZU9iamVjdEZyb21BcnJheShjdXJyZW50LCBvcGVuKTtcbiAgICBjbG9zZWQucHVzaChjdXJyZW50KTtcbiAgICBmb3IobGV0IG5laWdoYm91ciBvZiB1bmNsb3NlZE5laWdib3VycyhjdXJyZW50LCBjbG9zZWQpKSB7XG4gICAgICBsZXQgdGVtcEcgPSBjdXJyZW50LmdTY29yZSArIG5laWdoYm91ci5kaXN0YW5jZTtcbiAgICAgIGlmKCFpc09iamVjdEluQXJyYXkobmVpZ2hib3VyLCBvcGVuKSB8fCB0ZW1wRyA8IG5laWdoYm91ci5nU2NvcmUpIHtcbiAgICAgICAgZnJvbS5zZXQobmVpZ2hib3VyLCBjdXJyZW50KTtcbiAgICAgICAgbmVpZ2hib3VyLmdTY29yZSA9IHRlbXBHO1xuICAgICAgICBuZWlnaGJvdXIuZlNjb3JlID0gbmVpZ2hib3VyLmdTY29yZSArIGgobmVpZ2hib3VyLCBmaW5pc2hOb2RlKTtcbiAgICAgIH1cbiAgICAgIGlmKCFpc09iamVjdEluQXJyYXkobmVpZ2hib3VyLCBvcGVuKSkgeyAvLyBjcmVhdGUgZnVuY3Rpb25cbiAgICAgICAgbGV0IG5vZGVOZWlnaGJvdXJzID0gbmVpZ2hib3VycyhuZWlnaGJvdXIpO1xuICAgICAgICBuZWlnaGJvdXIubmVpZ2hib3VycyA9IG5vZGVOZWlnaGJvdXJzO1xuICAgICAgICBvcGVuLnB1c2gobmVpZ2hib3VyKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgY29uc29sZS5sb2coJ2ZhaWx1cmUnKTtcbiAgcmV0dXJuIDA7IC8vIGZhaWx1cmVcbn1cblxuZXhwb3J0IGNvbnN0IGggPSAoc3RhcnROb2RlOmFueSwgZmluaXNoTm9kZTphbnkpID0+IHtcbi8vZnVuY3Rpb24gaGV1cmlzdGljKG5vZGUpID1cbiAgLy8gZHggPSBhYnMobm9kZS54IC0gZ29hbC54KVxuICAvLyBkeSA9IGFicyhub2RlLnkgLSBnb2FsLnkpXG4gIC8vIHJldHVybiBEICogKGR4ICsgZHkpICsgKEQyIC0gMiAqIEQpICogbWluKGR4LCBkeSlcbiAgbGV0IEQgPSAxMDsgLy8gY29zdCBvZiBtb3ZpbmcgaG9yaXpvbnRhbGx5XG4gIGxldCBEMiA9IDE0OyAvLyBjb3N0IG9mIG1vdmluZyBkaWFnb25hbGx5XG4gIGxldCBkeCA9IE1hdGguYWJzKHN0YXJ0Tm9kZS54IC0gZmluaXNoTm9kZS54KTtcbiAgbGV0IGR5ID0gTWF0aC5hYnMoc3RhcnROb2RlLnkgLSBmaW5pc2hOb2RlLnkpO1xuICByZXR1cm4gRCAqIChkeCArIGR5KSArIChEMiAtIDIgKiBEKSAqIE1hdGgubWluKGR4LCBkeSk7XG59XG5cblxuXG5leHBvcnQgY29uc3QgcmVjb25zdHJ1Y3RQYXRoID0gKGZyb206YW55LCBjdXJyZW50OmFueSkgPT4ge1xuICBjb25zb2xlLmxvZygncmVjb25zdHJ1Y3RQYXRoIGZyb206JywgZnJvbSk7XG4gIGNvbnNvbGUubG9nKCdyZWNvbnN0cnVjdFBhdGggY3VycmVudCcsIGN1cnJlbnQpO1xuICAvLyBmdW5jdGlvbiByZWNvbnN0cnVjdF9wYXRoKGNhbWVGcm9tLCBjdXJyZW50KVxuICAvLyAgIHRvdGFsX3BhdGggOj0gW2N1cnJlbnRdXG4gIC8vICAgd2hpbGUgY3VycmVudCBpbiBjYW1lRnJvbS5LZXlzOlxuICAvLyAgICAgICBjdXJyZW50IDo9IGNhbWVGcm9tW2N1cnJlbnRdXG4gIC8vICAgICAgIHRvdGFsX3BhdGguYXBwZW5kKGN1cnJlbnQpXG4gIC8vICAgcmV0dXJuIHRvdGFsX3BhdGhcbiAgbGV0IHJldmVyc2VQYXRoOmFueVtdID0gW2N1cnJlbnRdO1xuICBsZXQgdG90YWxQYXRoOmFueVtdID0gW107XG4gIHdoaWxlKGlzT2JqZWN0SW5NYXBLZXlzKGN1cnJlbnQsIGZyb20pKSB7XG4gICAgY29uc29sZS5sb2coJ2N1cnJlbnQnLCBjdXJyZW50KTtcbiAgICBjdXJyZW50ID0gZnJvbS5nZXQoY3VycmVudCk7XG4gICAgcmV2ZXJzZVBhdGgucHVzaChjdXJyZW50KTtcbiAgfVxuICBmb3IobGV0IGkgPSByZXZlcnNlUGF0aC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIHRvdGFsUGF0aC5wdXNoKHJldmVyc2VQYXRoW2ldKTtcbiAgfVxuICByZXR1cm4gdG90YWxQYXRoO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3BhdGgvQVN0YXIudHMiLCJleHBvcnQgY29uc3QgZ2V0TWluRlNjb3JlID0gKG9wZW46YW55W10pID0+IHtcbiAgbGV0IG1pbiA9IDA7XG4gIGZvcihsZXQgaSA9IDE7IGkgPCBvcGVuLmxlbmd0aCAtIDE7ICsraSkge1xuICAgIGlmKG9wZW5bbWluXS5mU2NvcmUgPiBvcGVuW2ldLmZTY29yZSkge1xuICAgICAgbWluID0gaTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG9wZW5bbWluXTtcbn1cblxuZXhwb3J0IGNvbnN0IHVuY2xvc2VkTmVpZ2JvdXJzID0gKGN1cnJlbnQ6YW55LCBjbG9zZWQ6YW55KSA9PiB7XG4gIGxldCBuZWlnaGJvdXJzTm90SW5DbG9zZWQgPSBbXTtcbiAgZm9yKGxldCBuZWlnaGJvdXIgb2YgY3VycmVudC5uZWlnaGJvdXJzKSB7XG4gICAgbGV0IGlzSW5DbG9zZWQ6Ym9vbGVhbiA9IGZhbHNlO1xuICAgIGZvcihsZXQgbm9kZSBvZiBjbG9zZWQpIHtcbiAgICAgIGlmKG5laWdoYm91ci54ID09PSBub2RlLnggJiYgbmVpZ2hib3VyLnkgPT09IG5vZGUueSkge1xuICAgICAgICBpc0luQ2xvc2VkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYoIWlzSW5DbG9zZWQpIHtcbiAgICAgIG5laWdoYm91cnNOb3RJbkNsb3NlZC5wdXNoKG5laWdoYm91cik7XG4gICAgfVxuICB9XG4gIHJldHVybiBuZWlnaGJvdXJzTm90SW5DbG9zZWQ7XG59XG5cbmV4cG9ydCBjb25zdCBpc09iamVjdEluTWFwS2V5cyA9IChvYmplY3Q6YW55LCBtYXA6YW55KSA9PiB7XG4gIGxldCBhcnI6YW55W10gPSBBcnJheS5mcm9tKG1hcCk7XG4gIGxldCByZXN1bHQ6Ym9vbGVhbiA9IGZhbHNlO1xuICBmb3IobGV0IGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgKytpKSB7XG4gICAgLy9jb25zb2xlLmxvZygnb2JqZWN0Jywgb2JqZWN0KTtcbiAgICBpZihhcnJbaV1bMF0ueCA9PT0gb2JqZWN0LnggJiYgYXJyW2ldWzBdLnkgPT09IG9iamVjdC55KSB7XG4gICAgICByZXN1bHQgPSB0cnVlO1xuICAgIH1cbiAgfVxuICBjb25zb2xlLmxvZygncmVzdWx0JywgcmVzdWx0KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9wYXRoL2FTdGFyVXRpbHMudHMiLCJpbXBvcnQge1xuICBjYW52YXMsXG4gIGN0eCxcbiAgV0lEVEgsXG4gIEhFSUdIVCxcbiAgZ3JpZFNpemUsXG59IGZyb20gJy4uL21hcC9tYXBDb25maWcnO1xuXG5pbXBvcnQge21hcH0gZnJvbSAnLi4vbWFwL2NyZWF0ZU1hcCc7XG5cbmV4cG9ydCBjb25zdCBkcmF3UGF0aCA9IChwYXRoOmFueVtdKSA9PiB7XG4gIGZvcihsZXQgc3RlcCBvZiBwYXRoKSB7XG4gICAgY3R4LmZpbGxTdHlsZSA9ICd5ZWxsb3cnO1xuICAgIGN0eC5maWxsUmVjdChzdGVwLngsIHN0ZXAueSwgZ3JpZFNpemUsIGdyaWRTaXplKTtcbiAgfVxufVxuXG5leHBvcnQgbGV0IGdldE5vZGVGcm9tTWFwID0gKHg6bnVtYmVyLCB5Om51bWJlcikgPT4ge1xuICBsZXQgbm9kZTphbnk7XG4gIGZvcihsZXQgZ3JpZCBvZiBtYXApIHtcbiAgICBsZXQgYm90dG9tUmlnaHRYID0gZ3JpZC54ICsgZ3JpZFNpemU7XG4gICAgbGV0IGJvdHRvbVJpZ2h0WSA9IGdyaWQueSArIGdyaWRTaXplO1xuICAgIGlmKHggPj0gZ3JpZC54ICYmIHggPCBib3R0b21SaWdodFggJiYgeSA+PSBncmlkLnkgJiYgeSA8IGJvdHRvbVJpZ2h0WSkge1xuICAgICAgbm9kZSA9IGdyaWQ7XG4gICAgfVxuICB9XG4gIHJldHVybiBub2RlO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3BhdGgvZHJhd1BhdGgudHMiLCJpbXBvcnQge2dyaWRTaXplfSBmcm9tICcuLi9tYXAvbWFwQ29uZmlnJztcblxuY2xhc3MgV2FycmlvciB7XG4gIG5hbWU6IHN0cmluZztcbiAgeDogbnVtYmVyO1xuICB5OiBudW1iZXI7XG4gIGNlbnRlclg6IG51bWJlcjtcbiAgY2VudGVyWTogbnVtYmVyO1xuICByYWRpdXM6IG51bWJlcjtcbiAgbW92ZVRvTm9kZVg6IG51bWJlcjtcbiAgbW92ZVRvTm9kZVk6IG51bWJlcjtcbiAgaXNDdXJyZW50bHlDaG9zZW46IGJvb2xlYW4gPSBmYWxzZTtcbiAgcG9zaXRpb25JblVuaXQ6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcihuYW1lOnN0cmluZywgeDpudW1iZXIsIHk6bnVtYmVyLCByYWRpdXM6bnVtYmVyKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gICAgdGhpcy5yYWRpdXMgPSByYWRpdXM7XG4gICAgdGhpcy5jZW50ZXJYID0geCArIChncmlkU2l6ZSAvIDIpO1xuICAgIHRoaXMuY2VudGVyWSA9IHkgKyAoZ3JpZFNpemUgLyAyKTtcbiAgfVxuXG4gIHNldFgoeDpudW1iZXIpIHtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMuY2VudGVyWCA9IHggKyAoZ3JpZFNpemUgLyAyKTtcbiAgfVxuXG4gIHNldFkoeTpudW1iZXIpIHtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHRoaXMuY2VudGVyWSA9IHkgKyAoZ3JpZFNpemUgLyAyKTtcbiAgfVxuXG4gIGFzc2lnblBvc2l0aW9uKG5ld1Bvc2l0aW9uOiBudW1iZXIpIHtcbiAgICB0aGlzLnBvc2l0aW9uSW5Vbml0ID0gbmV3UG9zaXRpb247XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgV2FycmlvcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy93YXJyaW9yL1dhcnJpb3IudHMiLCJpbXBvcnQge2RyYXdXYXJyaW9yfSBmcm9tICcuL3dhcnJpb3JBY3Rpb24nO1xuaW1wb3J0IHtcbiAgZ3JpZFNpemUsXG4gIGN0eCxcbiAgV0lEVEgsXG4gIEhFSUdIVFxufSBmcm9tICcuLi9tYXAvbWFwQ29uZmlnJztcbmltcG9ydCB7ZGVsZXRlT2JqZWN0RnJvbUFycmF5fSBmcm9tICcuLi91dGlscy9vYmpVdGlscyc7XG5cbmV4cG9ydCBsZXQgdXBkYXRlV2FycmlvciA9ICh3YXJyaW9yOmFueSwgcGF0aDphbnlbXSwgaTpudW1iZXI9MCwgY3VycmVudE1vdmVUb1g6bnVtYmVyLCBjdXJyZW50TW92ZVRvWTpudW1iZXIpID0+IHtcbiAgaWYoY3VycmVudE1vdmVUb1ggIT09IHdhcnJpb3IubW92ZVRvTm9kZVggfHwgY3VycmVudE1vdmVUb1kgIT09IHdhcnJpb3IubW92ZVRvTm9kZVkpIHJldHVybjtcbiAgbGV0IHVwZGF0ZWRQYXRoID0gcGF0aDtcbiAgbGV0IG5vZGUgPSBwYXRoW2ldOyAvLyBnZXQgbmV4dCBub2RlXG4gIGxldCBub2RlVG9DbGVhciA9IG5vZGU7O1xuICBpZihpICE9PSAwKSB7XG4gICAgbm9kZVRvQ2xlYXIgPSB1cGRhdGVkUGF0aFtpIC0gMV07XG4gIH1cbiAgY3R4LmNsZWFyUmVjdChub2RlVG9DbGVhci54LCBub2RlVG9DbGVhci55LCBncmlkU2l6ZSwgZ3JpZFNpemUpO1xuICB3YXJyaW9yLnNldFgobm9kZS54KTsgLy8gY2FsY3VsYXRlIGNlbnRlciBvZiB0aGUgY3VycmVudCBub2RlXG4gIHdhcnJpb3Iuc2V0WShub2RlLnkpO1xuICAvL2NvbnNvbGUubG9nKCd3YXJyaW9yLngnLCB3YXJyaW9yLngsICd3YXJyaW9yLnknLCB3YXJyaW9yLnkpO1xuICBkcmF3V2Fycmlvcih3YXJyaW9yKTtcbiAgaSsrO1xuICBpZihpICE9PSB1cGRhdGVkUGF0aC5sZW5ndGgpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHVwZGF0ZVdhcnJpb3Iod2FycmlvciwgdXBkYXRlZFBhdGgsIGksIGN1cnJlbnRNb3ZlVG9YLCBjdXJyZW50TW92ZVRvWSk7XG4gICAgfSwgMzAwKTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3dhcnJpb3Ivd2Fycmlvck1vdmVtZW50LnRzIiwiaW1wb3J0IHtjcmVhdGVXYXJyaW9yfSBmcm9tICcuLi93YXJyaW9yL3dhcnJpb3JBY3Rpb24nO1xuaW1wb3J0IHtncmlkU2l6ZX0gZnJvbSAnLi4vbWFwL21hcENvbmZpZyc7XG5pbXBvcnQgVW5pdCBmcm9tICcuL1VuaXQnO1xuXG5pbXBvcnQge1xuICB1bml0cyxcbiAgY3VycmVudGx5Q2hvc2VuVW5pdCxcbiAgYXNzaWduQ3VycmVudGx5Q2hvc2VuVW5pdFxufSBmcm9tICcuLi9zdG9yZS91bml0U3RvcmUnO1xuXG4vLyBleHBvcnQgY29uc3QgZHJhd1VuaXQgPSAodW5pdDphbnksIHJhZGl1czpudW1iZXIpID0+IHtcbi8vICAgbGV0IHN0YXJ0WCA9IHVuaXQuY29tbWFuZGVyUG9zaXRpb25YO1xuLy8gICBsZXQgc3RhcnRZID0gdW5pdC5jb21tYW5kZXJQb3NpdGlvblk7XG4vLyAgIGxldCBpID0gMTtcbi8vICAgbGV0IHJvdyA9IHVuaXQucXVhbnRpdHkgLyAyO1xuLy8gICBsZXQgY29sID0gTWF0aC5jZWlsKHVuaXQucXVhbnRpdHkgLyByb3cpO1xuLy8gICBsZXQgZmluaXNoWCA9IHN0YXJ0WCArICgocm93IC0gMSkgKiBncmlkU2l6ZSk7XG4vLyAgIGxldCBmaW5pc2hZID0gc3RhcnRZICsgKChjb2wgLSAxKSAqIGdyaWRTaXplKTtcbi8vICAgZm9yKGxldCB5ID0gc3RhcnRYOyB5IDw9IGZpbmlzaFk7IHkgKz0gZ3JpZFNpemUpIHtcbi8vICAgICBpZihpIDw9IHVuaXQucXVhbnRpdHkpIHtcbi8vICAgICAgIGZvcihsZXQgeCA9IHN0YXJ0WDsgeCA8PSBmaW5pc2hYOyAgeCs9IGdyaWRTaXplKSB7XG4vLyAgICAgICAgIGxldCBjdXJyZW50V2FycmlvciA9IGNyZWF0ZVdhcnJpb3IodW5pdC5uYW1lLCB4LCB5LCByYWRpdXMpO1xuLy8gICAgICAgICBjdXJyZW50V2Fycmlvci5hc3NpZ25Qb3NpdGlvbihpKTtcbi8vICAgICAgICAgaSsrO1xuLy8gICAgICAgfVxuLy8gICAgIH1cbi8vICAgfVxuLy8gfVxuXG5leHBvcnQgY29uc3QgYWRkV2FycmlvcnNUb1VuaXQgPSAodW5pdDphbnkpID0+IHtcbiAgbGV0IHN0YXJ0WCA9IHVuaXQuY29tbWFuZGVyUG9zaXRpb25YO1xuICBsZXQgc3RhcnRZID0gdW5pdC5jb21tYW5kZXJQb3NpdGlvblk7XG4gIGxldCBpID0gMTtcbiAgbGV0IHJvdyA9IHVuaXQucXVhbnRpdHkgLyAyO1xuICBsZXQgY29sID0gTWF0aC5jZWlsKHVuaXQucXVhbnRpdHkgLyByb3cpO1xuICBsZXQgZmluaXNoWCA9IHN0YXJ0WCArICgocm93IC0gMSkgKiBncmlkU2l6ZSk7XG4gIGxldCBmaW5pc2hZID0gc3RhcnRZICsgKChjb2wgLSAxKSAqIGdyaWRTaXplKTtcbiAgbGV0IHJhZGl1cyA9IGdyaWRTaXplIC8gNDtcbiAgZm9yKGxldCB5ID0gc3RhcnRYOyB5IDw9IGZpbmlzaFk7IHkgKz0gZ3JpZFNpemUpIHtcbiAgICBpZihpIDw9IHVuaXQucXVhbnRpdHkpIHtcbiAgICAgIGZvcihsZXQgeCA9IHN0YXJ0WDsgeCA8PSBmaW5pc2hYOyAgeCs9IGdyaWRTaXplKSB7XG4gICAgICAgIGxldCBjdXJyZW50V2FycmlvciA9IGNyZWF0ZVdhcnJpb3IodW5pdC5uYW1lLCB4LCB5LCByYWRpdXMpO1xuICAgICAgICBjdXJyZW50V2Fycmlvci5hc3NpZ25Qb3NpdGlvbihpKTtcbiAgICAgICAgdW5pdC5hZGRXYXJyaW9yVG9Vbml0KGN1cnJlbnRXYXJyaW9yKTtcbiAgICAgICAgaSsrO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY29uc3QgY3JlYXRlVW5pdCA9IChuYW1lOnN0cmluZywgcXVhbnRpdHk6bnVtYmVyLCBwb3NYOm51bWJlciwgcG9zWTogbnVtYmVyKSA9PiB7XG4gIGxldCBuZXdVbml0ID0gbmV3IFVuaXQobmFtZSwgcXVhbnRpdHksIHBvc1gsIHBvc1kpO1xuICBsZXQgcmFkaXVzID0gZ3JpZFNpemUgLyA0O1xuICBhZGRXYXJyaW9yc1RvVW5pdChuZXdVbml0KTtcbiAgdW5pdHMucHVzaChuZXdVbml0KTtcbn1cblxuLy8gd2FycmlvcnMgaW4gdGhlIHVuaXQgaGF2ZSBzYW1lIG5hbWUgYXMgdW5pdCB0aGF0IHRoZXkgYXNzaWduZWQgdG9cbi8vIGlmIHdhcnJpb3Igd2l0aCBzYW1lIG5hbWUgaXMgY2hvc2VuIHRoYXQgbWVhbnMgdGhhdCB1bml0IGFsc29cbi8vIGhhcyBiZWVuIGNob3NlblxuZXhwb3J0IGNvbnN0IG9uQ2hvb3NlVW5pdCA9ICh1bml0czphbnksIGN1cnJlbnRseUNob3NlbldhcnJpb3I6YW55KSA9PiB7XG4gIGxldCBmb3VuZGVkVW5pdCA9IG51bGw7XG4gIGlmKGN1cnJlbnRseUNob3NlbldhcnJpb3IpIHtcbiAgICBmb3IobGV0IHVuaXQgb2YgdW5pdHMpIHtcbiAgICAgIGlmKGN1cnJlbnRseUNob3NlbldhcnJpb3IubmFtZSA9PT0gdW5pdC5uYW1lKSB7XG4gICAgICAgIGZvdW5kZWRVbml0ID0gdW5pdDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgYXNzaWduQ3VycmVudGx5Q2hvc2VuVW5pdChmb3VuZGVkVW5pdCk7XG4gIGNvbnNvbGUubG9nKCdjdXJyZW50bHlDaG9zZW5Vbml0JywgY3VycmVudGx5Q2hvc2VuVW5pdCk7XG59XG5cbmV4cG9ydCBjb25zdCB1cGRhdGVVbml0ID0gKHVuaXQ6YW55LCBwYXRoOmFueVtdLCBpOm51bWJlcj0wLCBjdXJyZW50TW92ZVRvWDpudW1iZXIsIGN1cnJlbnRNb3ZlVG9ZOm51bWJlcikgPT4ge1xuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdW5pdC91bml0QWN0aW9ucy50cyIsIlxuXG5jbGFzcyBVbml0IHtcbiAgbmFtZTogc3RyaW5nO1xuICBxdWFudGl0eTogbnVtYmVyO1xuICBjb21tYW5kZXJQb3NpdGlvblg6IG51bWJlcjtcbiAgY29tbWFuZGVyUG9zaXRpb25ZOiBudW1iZXI7XG4gIHdhcnJpb3JzOiBhbnlbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKG5hbWU6c3RyaW5nLCBxdWFudGl0eTpudW1iZXIsIHBvc1g6bnVtYmVyLCBwb3NZOm51bWJlcikge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5xdWFudGl0eSA9IHF1YW50aXR5O1xuICAgIHRoaXMuY29tbWFuZGVyUG9zaXRpb25YID0gcG9zWDtcbiAgICB0aGlzLmNvbW1hbmRlclBvc2l0aW9uWSA9IHBvc1g7XG4gIH1cbiAgYWRkV2FycmlvclRvVW5pdCh3YXJyaW9yOmFueSkge1xuICAgIHRoaXMud2FycmlvcnMucHVzaCh3YXJyaW9yKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBVbml0O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3VuaXQvVW5pdC50cyJdLCJzb3VyY2VSb290IjoiIn0=