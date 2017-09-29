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
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
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
var warriorStore_1 = __webpack_require__(5);
var mapConfig_2 = __webpack_require__(0);
var Warrior_1 = __webpack_require__(12);
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
/* 2 */
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
exports.neighbours = function (node, map) {
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
            for (var _a = 0, map_1 = map; _a < map_1.length; _a++) {
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
        var n = exports.neighbours(node, map);
        node.neighbours = n;
    }
};
exports.createWarriorObstacle = function (positionX, positionY, map) {
    var node = {
        x: positionX,
        y: positionY
    };
    return objUtils_1.deleteObjectFromArray(node, map);
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
var mapConfig_1 = __webpack_require__(0);
exports.drawPath = function (path) {
    for (var _i = 0, path_1 = path; _i < path_1.length; _i++) {
        var step = path_1[_i];
        mapConfig_1.ctx.fillStyle = 'yellow';
        mapConfig_1.ctx.fillRect(step.x, step.y, mapConfig_1.gridSize, mapConfig_1.gridSize);
    }
};
exports.getNodeFromMap = function (x, y, map) {
    var node;
    for (var _i = 0, map_1 = map; _i < map_1.length; _i++) {
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
/* 5 */
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var warriorAction_1 = __webpack_require__(1);
var warriorStore_1 = __webpack_require__(5);
var createMap_1 = __webpack_require__(2);
var drawPath_1 = __webpack_require__(4);
var mapConfig_1 = __webpack_require__(0);
var AStar_1 = __webpack_require__(8);
var objUtils_1 = __webpack_require__(3);
exports.updateWarrior = function (warrior, path, i, currentMoveToX, currentMoveToY) {
    if (i === void 0) { i = 0; }
    //console.log('updateWarrior');
    warrior.setIsMovingToTrue();
    if (currentMoveToX !== warrior.moveToNode.x || currentMoveToY !== warrior.moveToNode.y) {
        console.log('new destination has been chosen');
        warrior.setIsMovingToFalse();
        return;
    }
    var updatedPath = path;
    var node = updatedPath[i]; // get next node
    // ally warrior is on the destination position
    // currentWarrior should stop moving
    if (exports.checkOtherWarriorsPosition(warriorStore_1.warriors, warrior, node.x, node.y) && i === updatedPath.length - 1) {
        warrior.moveToNode.x = warrior.x; // set moveToNode value to current warrior position
        warrior.moveToNode.y = warrior.y;
        warrior.setIsMovingToFalse();
        return;
    }
    if (exports.checkOtherWarriorsPosition(warriorStore_1.warriors, warrior, node.x, node.y)) {
        // unit has another allies' unit on its way
        console.error('updateUnit: another unit is on the way x:', node.x, 'y:', node.y);
        var updatedMap = createMap_1.map;
        updatedMap = createMap_1.createWarriorObstacle(node.x, node.y, updatedMap);
        createMap_1.addNeighbours(updatedMap);
        console.log('deleted Node', node);
        console.log('updatedMap', updatedMap);
        console.log('node', node);
        var startNode = drawPath_1.getNodeFromMap(warrior.x, warrior.y, updatedMap);
        var finishNode = drawPath_1.getNodeFromMap(currentMoveToX, currentMoveToY, updatedMap);
        var newPath = AStar_1.aStar(startNode, finishNode, updatedMap);
        console.error('newPath', newPath);
        exports.updateWarrior(warrior, newPath, 0, currentMoveToX, currentMoveToY);
        return;
    }
    var nodeToClear = node;
    ;
    if (i !== 0) {
        nodeToClear = updatedPath[i - 1];
    }
    exports.moveToNextNode(warrior, node, nodeToClear);
    i++;
    if (i !== updatedPath.length) {
        setTimeout(function () {
            exports.updateWarrior(warrior, updatedPath, i, currentMoveToX, currentMoveToY);
        }, 400);
    }
};
// check if nextNode is occupied by other warrior
exports.checkOtherWarriorsPosition = function (warriors, currentUnit, x, y) {
    var updatedWarriors = objUtils_1.deleteObjectFromArray(currentUnit, warriors);
    for (var _i = 0, updatedWarriors_1 = updatedWarriors; _i < updatedWarriors_1.length; _i++) {
        var warrior = updatedWarriors_1[_i];
        if (warrior.x === x && warrior.y === y) {
            return true;
        }
    }
    return false;
};
exports.moveToNextNode = function (warrior, node, previousNode) {
    mapConfig_1.ctx.clearRect(previousNode.x, previousNode.y, mapConfig_1.gridSize, mapConfig_1.gridSize);
    warrior.setX(node.x); // calculate center of the current node
    warrior.setY(node.y);
    warriorAction_1.drawWarrior(warrior);
};


/***/ }),
/* 7 */
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var createMap_1 = __webpack_require__(2);
var objUtils_1 = __webpack_require__(3);
var aStarUtils_1 = __webpack_require__(15);
exports.aStar = function (startNode, finishNode, map) {
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
        //console.log('current', current);
        if (current.x === finishNode.x && current.y === finishNode.y) {
            //console.error('Path', reconstructPath(from, current));
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
                var nodeNeighbours = createMap_1.neighbours(neighbour, map);
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
    // function reconstruct_path(cameFrom, current)
    //   total_path := [current]
    //   while current in cameFrom.Keys:
    //       current := cameFrom[current]
    //       total_path.append(current)
    //   return total_path
    var reversePath = [current];
    var totalPath = [];
    while (aStarUtils_1.isObjectInMapKeys(current, from)) {
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
exports.getClosestWarriorToDestination = function (unit, destX, destY) {
    var closest = 0;
    var difference;
    var warriors = unit.warriors;
    for (var i = 1; i <= warriors.length - 1; ++i) {
        var currentUnitDifference = Math.sqrt(Math.pow(Math.abs(warriors[i].x - destX), 2) + Math.pow(Math.abs(warriors[i].y - destY), 2));
        var previousUnitDifference = Math.sqrt(Math.pow(Math.abs(warriors[closest].x - destX), 2) + Math.pow(Math.abs(warriors[closest].y - destY), 2));
        if (currentUnitDifference < previousUnitDifference) {
            closest = i;
        }
    }
    return warriors[closest];
};
exports.getClosestWarriorToDestinationInArray = function (warriors, destX, destY) {
    var closest = 0;
    var difference;
    for (var i = 1; i <= warriors.length - 1; ++i) {
        var currentUnitDifference = Math.sqrt(Math.pow(Math.abs(warriors[i].x - destX), 2) + Math.pow(Math.abs(warriors[i].y - destY), 2));
        var previousUnitDifference = Math.sqrt(Math.pow(Math.abs(warriors[closest].x - destX), 2) + Math.pow(Math.abs(warriors[closest].y - destY), 2));
        if (currentUnitDifference < previousUnitDifference) {
            closest = i;
        }
    }
    return warriors[closest];
};
exports.getCentralWarriorInUnit = function (unit) {
    var centralRow = Math.round(unit.row / 2);
    var centralCol = Math.round(unit.col / 2);
    for (var _i = 0, _a = unit.warriors; _i < _a.length; _i++) {
        var warrior = _a[_i];
        if (warrior.colInUnit === centralCol && warrior.rowInUnit === centralRow) {
            return warrior;
        }
    }
};
// get unit's position and destination position and return angle in radians between unit and destination
exports.calcDestinationAngleInDegrees = function (unit, destX, destY) {
    //console.error('calcDestinationAngleInDegrees');
    var warrior = exports.getClosestWarriorToDestination(unit, destX, destY);
    var angle;
    var a = Math.abs(destY - warrior.y);
    var b = Math.abs(destX - warrior.x);
    var angleInRadian = Math.atan(a / b);
    // check quater of the circle
    var degree = angleInRadian * (180 / Math.PI); // convert radians into degree
    var quater = exports.getQuater(warrior.x, warrior.y, destX, destY); // check quater
    if (quater === 1)
        angle = degree;
    if (quater === 2)
        angle = 90 + (90 - degree);
    else if (quater === 3)
        angle = 180 + degree;
    else if (quater === 4)
        angle = 270 + (90 - degree);
    return Math.round(angle);
};
exports.getQuater = function (unitX, unitY, destX, destY) {
    //console.error('getQuater');
    var quater;
    if (destX >= unitX && destY < unitY) {
        quater = 1;
    }
    else if (destX < unitX && destY <= unitY) {
        quater = 2;
    }
    else if (destX <= unitX && destY > unitY) {
        quater = 3;
    }
    else if (destX > unitX && destY >= unitY) {
        quater = 4;
    }
    return quater;
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var mapConfig_1 = __webpack_require__(0);
var drawGrid_1 = __webpack_require__(11);
var createMap_1 = __webpack_require__(2);
var drawPath_1 = __webpack_require__(4);
var warriorStore_1 = __webpack_require__(5);
var warriorAction_1 = __webpack_require__(1);
var unitActions_1 = __webpack_require__(13);
var unitStore_1 = __webpack_require__(7);
var unitUtils_1 = __webpack_require__(9);
var unitMovement_1 = __webpack_require__(16);
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
    var startNode = drawPath_1.getNodeFromMap(unitStore_1.currentlyChosenUnit.commanderPositionX, unitStore_1.currentlyChosenUnit.commanderPositionY, createMap_1.map);
    var finishNode = drawPath_1.getNodeFromMap(x, y, createMap_1.map);
    console.error('startNode', startNode);
    console.error('finishNode', finishNode);
    warriorAction_1.assignWarriorMoveToPosition(warriorStore_1.currentlyChosenWarrior, x, y);
    unitMovement_1.moveToPosition(unitStore_1.currentlyChosenUnit, finishNode);
    console.error('Angle', unitUtils_1.calcDestinationAngleInDegrees(unitStore_1.currentlyChosenUnit, x, y));
    // let path:any = aStar(startNode, finishNode);
    // if(currentlyChosenUnit) {
    //  onChangeWarriorPositionInUnit(currentlyChosenUnit,path, 0, x, y);
    // }
    //drawPath(path);
});


/***/ }),
/* 11 */
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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var mapConfig_1 = __webpack_require__(0);
var Warrior = /** @class */ (function () {
    function Warrior(name, x, y, radius) {
        this.isCurrentlyChosen = false;
        this.isMoving = false;
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
    Warrior.prototype.setIsMovingToTrue = function () {
        this.isMoving = true;
    };
    Warrior.prototype.setIsMovingToFalse = function () {
        this.isMoving = false;
    };
    return Warrior;
}());
exports.default = Warrior;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var warriorAction_1 = __webpack_require__(1);
var mapConfig_1 = __webpack_require__(0);
var warriorMovement_1 = __webpack_require__(6);
var createMap_1 = __webpack_require__(2);
var Unit_1 = __webpack_require__(14);
var unitStore_1 = __webpack_require__(7);
var warriorAction_2 = __webpack_require__(1);
var drawPath_1 = __webpack_require__(4);
var AStar_1 = __webpack_require__(8);
exports.onChangeWarriorPositionInUnit = function (unit, path, i, currentMoveToX, currentMoveToY) {
    if (i === void 0) { i = 0; }
    var row = unit.quantity / 2;
    var col = Math.ceil(unit.quantity / row);
    for (var _i = 0, _a = unit.warriors; _i < _a.length; _i++) {
        var warrior = _a[_i];
        var startNode = drawPath_1.getNodeFromMap(unitStore_1.currentlyChosenUnit.commanderPositionX, unitStore_1.currentlyChosenUnit.commanderPositionY, createMap_1.map);
        var finishNode = drawPath_1.getNodeFromMap(currentMoveToX, currentMoveToY, createMap_1.map);
        var path_1 = AStar_1.aStar(startNode, finishNode, createMap_1.map);
        warriorAction_2.assignWarriorMoveToPosition(warrior, currentMoveToX, currentMoveToY);
        warriorMovement_1.updateWarrior(warrior, path_1, i, currentMoveToX, currentMoveToY);
        currentMoveToX += mapConfig_1.gridSize;
        console.log('i', i);
        console.log('currentMoveToX', currentMoveToX);
    }
};
exports.addWarriorsToUnit = function (unit) {
    var startX = unit.commanderPositionX;
    var startY = unit.commanderPositionY;
    var i = 1;
    var row = unit.quantity / 2;
    var col = Math.ceil(unit.quantity / row);
    var finishX = startX + ((row - 1) * mapConfig_1.gridSize);
    var finishY = startY + ((col - 1) * mapConfig_1.gridSize);
    var radius = mapConfig_1.gridSize / 4;
    var unitRow = 1; // to give warrior row and column position in unit
    var unitCol = 1;
    unit.row = row; // add row instance for unit
    unit.col = col; // add col instance for unit
    for (var y = startX; y <= finishY; y += mapConfig_1.gridSize) {
        if (i <= unit.quantity) {
            for (var x = startX; x <= finishX; x += mapConfig_1.gridSize) {
                var currentWarrior = warriorAction_1.createWarrior(unit.name, x, y, radius);
                currentWarrior.assignPosition(i);
                currentWarrior.rowInUnit = unitRow;
                currentWarrior.colInUnit = unitCol;
                unit.addWarriorToUnit(currentWarrior);
                i++;
                unitCol++;
            }
        }
        unitRow++;
        unitCol = 1;
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
var getUnitCommander = function (unit) {
    for (var _i = 0, _a = unit.warriors; _i < _a.length; _i++) {
        var warrior = _a[_i];
        if (warrior.positionInUnit === 1) {
            return warrior;
        }
    }
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


/***/ }),
/* 15 */
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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var unitUtils_1 = __webpack_require__(9);
var mapConfig_1 = __webpack_require__(0);
var createMap_1 = __webpack_require__(2);
var drawPath_1 = __webpack_require__(4);
var objUtils_1 = __webpack_require__(3);
var warriorMovement_1 = __webpack_require__(6);
var AStar_1 = __webpack_require__(8);
exports.moveToPosition = function (unit, nextNode) {
    // assign moveToPositions to warriors
    var movingWarriors = Object.assign([], unit.warriors);
    var centralWarrior = unitUtils_1.getCentralWarriorInUnit(unit);
    var updatedWarriors = objUtils_1.deleteObjectFromArray(centralWarrior, unit.warriors);
    //console.log('updatedWarriors', updatedWarriors);
    centralWarrior.moveToNode = nextNode;
    // assign centralUnit ge to next nextNode
    // assign other warriors next positions
    for (var _i = 0, updatedWarriors_1 = updatedWarriors; _i < updatedWarriors_1.length; _i++) {
        var warrior = updatedWarriors_1[_i];
        var _a = exports.checkWarriorsPositions(centralWarrior, warrior), differenceInX = _a.differenceInX, differenceInY = _a.differenceInY;
        var x = nextNode.x + (differenceInX * mapConfig_1.gridSize);
        var y = nextNode.y + (differenceInY * mapConfig_1.gridSize);
        console.error('x:', x, 'y:', y);
        var moveToNode = drawPath_1.getNodeFromMap(x, y, createMap_1.map);
        console.error('moveToNode', moveToNode);
        warrior.moveToNode = moveToNode;
    }
    // command unit to move
    // while(movingWarriors.length > 0) {
    //   console.error('movingWarriors:', movingWarriors);
    //   let closest = getClosestWarriorToDestinationInArray(movingWarriors, nextNode.x, nextNode.y);
    //   let startNode = getNodeFromMap(closest.x, closest.y);
    //   let path:any = aStar(startNode, closest.moveToNode);
    //   updateWarrior(closest, path, 0, closest.moveToNode.x, closest.moveToNode.y);
    //   movingWarriors = deleteObjectFromArray(closest, movingWarriors);
    // }
    exports.unitMovement(movingWarriors, nextNode);
};
exports.checkWarriorsPositions = function (centralWarrior, currentWarrior) {
    var centralCol = centralWarrior.colInUnit;
    var centralRow = centralWarrior.rowInUnit;
    var currentRow = currentWarrior.rowInUnit;
    var currentCol = currentWarrior.colInUnit;
    var differenceInX = currentCol - centralCol;
    var differenceInY = currentRow - centralRow;
    return {
        differenceInX: differenceInX,
        differenceInY: differenceInY
    };
};
exports.unitMovement = function (movingWarriors, nextNode) {
    if (movingWarriors.length === 0) {
        return;
    }
    var closest = unitUtils_1.getClosestWarriorToDestinationInArray(movingWarriors, nextNode.x, nextNode.y);
    var startNode = drawPath_1.getNodeFromMap(closest.x, closest.y, createMap_1.map);
    var path = AStar_1.aStar(startNode, closest.moveToNode, createMap_1.map);
    warriorMovement_1.updateWarrior(closest, path, 0, closest.moveToNode.x, closest.moveToNode.y);
    movingWarriors = objUtils_1.deleteObjectFromArray(closest, movingWarriors);
    exports.unitMovement(movingWarriors, nextNode);
};


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNDUxNDJiMGFkMDExMTc3ZTkwZDEiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hcC9tYXBDb25maWcudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dhcnJpb3Ivd2FycmlvckFjdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFwL2NyZWF0ZU1hcC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvb2JqVXRpbHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhdGgvZHJhd1BhdGgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0b3JlL3dhcnJpb3JTdG9yZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd2Fycmlvci93YXJyaW9yTW92ZW1lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0b3JlL3VuaXRTdG9yZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcGF0aC9BU3Rhci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdW5pdC91bml0VXRpbHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hcC9kcmF3R3JpZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd2Fycmlvci9XYXJyaW9yLnRzIiwid2VicGFjazovLy8uL3NyYy91bml0L3VuaXRBY3Rpb25zLnRzIiwid2VicGFjazovLy8uL3NyYy91bml0L1VuaXQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhdGgvYVN0YXJVdGlscy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdW5pdC91bml0TW92ZW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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Q0FBQyxjQUFjLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDekMsQ0FBQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNDUxNDJiMGFkMDExMTc3ZTkwZDEiLCIvLyBnbG9iYWwgdmFyaWFibGVzXG5leHBvcnQgY29uc3QgV0lEVEg6IG51bWJlciA9IDEyMDA7XG5leHBvcnQgY29uc3QgSEVJR0hUOiBudW1iZXIgPSA2MDA7XG5leHBvcnQgY29uc3QgZ3JpZFNpemU6bnVtYmVyID0gMjA7XG5cbi8vIGNyZWF0ZSBDYW52YXNcbmV4cG9ydCBsZXQgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG5jYW52YXMuaWQgPSBcImNhbnZhc1wiO1xuY2FudmFzLndpZHRoID0gV0lEVEg7XG5jYW52YXMuaGVpZ2h0ID0gSEVJR0hUO1xuY2FudmFzLnN0eWxlLmJvcmRlciA9IFwiMXB4IHNvbGlkXCI7XG5cbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY2FudmFzKTtcblxuLy8gZGVmaW5lIDJkIGNvbnRleHRcbmV4cG9ydCBsZXQgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tYXAvbWFwQ29uZmlnLnRzIiwiaW1wb3J0IHtncmlkU2l6ZX0gZnJvbSAnLi4vbWFwL21hcENvbmZpZyc7XG5pbXBvcnQge1xuICB3YXJyaW9ycyxcbiAgY3VycmVudGx5Q2hvc2VuV2FycmlvcixcbiAgYXNzaWduQ3VycmVudGx5Q2hvc2VuV2FycmlvclxufSBmcm9tICcuLi9zdG9yZS93YXJyaW9yU3RvcmUnO1xuaW1wb3J0IHtjdHh9IGZyb20gJy4uL21hcC9tYXBDb25maWcnO1xuaW1wb3J0IFdhcnJpb3IgZnJvbSAnLi9XYXJyaW9yJztcblxuZXhwb3J0IGNvbnN0IG9uQ2hvb3NlV2FycmlvciA9ICh3YXJyaW9yczphbnlbXSwgbW91c2VYOm51bWJlciwgbW91c2VZOm51bWJlcikgPT4ge1xuICBsZXQgZm91bmRlZFdhcnJpb3IgPSBudWxsO1xuICBmb3IobGV0IHdhcnJpb3Igb2Ygd2FycmlvcnMpIHtcbiAgICBsZXQgYm90dG9tUmlnaHRYID0gd2Fycmlvci54ICsgZ3JpZFNpemU7XG4gICAgbGV0IGJvdHRvbVJpZ2h0WSA9IHdhcnJpb3IueSArIGdyaWRTaXplO1xuICAgIGlmKG1vdXNlWCA+PSB3YXJyaW9yLnggJiYgbW91c2VYIDwgYm90dG9tUmlnaHRYICYmIG1vdXNlWSA+PSB3YXJyaW9yLnkgJiYgbW91c2VZIDwgYm90dG9tUmlnaHRZKSB7XG4gICAgICBjb25zb2xlLmxvZygnd2FycmlvcicsIHdhcnJpb3IubmFtZSwgJyB3YXMgY2hvc2VuJyk7XG4gICAgICB3YXJyaW9yLmlzQ3VycmVudGx5Q2hvc2VuID0gdHJ1ZTtcbiAgICAgIGZvdW5kZWRXYXJyaW9yID0gd2FycmlvcjtcbiAgICB9XG4gIH1cbiAgYXNzaWduQ3VycmVudGx5Q2hvc2VuV2Fycmlvcihmb3VuZGVkV2Fycmlvcik7XG4gIGNvbnNvbGUubG9nKCdjdXJyZW50bHlDaG9zZW5XYXJyaW9yJywgY3VycmVudGx5Q2hvc2VuV2Fycmlvcik7XG59XG5cbmV4cG9ydCBjb25zdCBkcmF3V2FycmlvciA9ICh3YXJyaW9yOmFueSkgPT4ge1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHguYXJjKHdhcnJpb3IuY2VudGVyWCwgd2Fycmlvci5jZW50ZXJZLCB3YXJyaW9yLnJhZGl1cywgMCwgTWF0aC5QSSoyKTtcbiAgICBjdHguZmlsbFN0eWxlID0gJyNkOTI1MTAnO1xuICAgIGN0eC5maWxsKCk7XG4gICAgY3R4LmNsb3NlUGF0aCgpO1xufVxuXG5leHBvcnQgY29uc3QgYXNzaWduV2Fycmlvck1vdmVUb1Bvc2l0aW9uID0gKHdhcnJpb3I6YW55LCB4Om51bWJlciwgeTpudW1iZXIpID0+IHtcbiAgLy9jb25zb2xlLmVycm9yKCdhc3NpZ25Nb3ZlVG9Qb3NpdGlvbicpO1xuICBpZih3YXJyaW9yKSB7XG4gICAgd2Fycmlvci5tb3ZlVG9Ob2RlWCA9IHg7XG4gICAgd2Fycmlvci5tb3ZlVG9Ob2RlWSA9IHk7XG4gICAgY29uc29sZS5sb2cod2Fycmlvci5uYW1lICsgJyBpcyBtb3ZpbmcgdG8gbm9kZTonICsgd2Fycmlvci5tb3ZlVG9Ob2RlWCArICcgeTonICsgd2Fycmlvci5tb3ZlVG9Ob2RlWSk7XG4gIH0gZWxzZSB7XG4gICAgY29uc29sZS5sb2coJ3dhcnJpb3Igbm90IGNob3NlbicpO1xuICB9XG59XG5cbi8vIGNyZWF0ZSBVbml0IGFuZCBpbW1lZGlhdGx5IHB1c2ggaXQgaW50byB1bml0cyBhcnJheVxuZXhwb3J0IGxldCBjcmVhdGVXYXJyaW9yID0gKG5hbWU6c3RyaW5nLCB4Om51bWJlciwgeTpudW1iZXIsIHJhZGl1czpudW1iZXIpID0+IHtcbiAgLy9jb25zb2xlLmVycm9yKCdjcmVhdGVVbml0Jyk7XG4gIGxldCB3YXJyaW9yID0gbmV3IFdhcnJpb3IobmFtZSwgeCwgeSwgcmFkaXVzKTtcbiAgd2FycmlvcnMucHVzaCh3YXJyaW9yKTtcbiAgZHJhd1dhcnJpb3Iod2Fycmlvcik7XG4gIHJldHVybiB3YXJyaW9yO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3dhcnJpb3Ivd2FycmlvckFjdGlvbi50cyIsImltcG9ydCB7XG4gIGNhbnZhcyxcbiAgY3R4LFxuICBXSURUSCxcbiAgSEVJR0hULFxuICBncmlkU2l6ZVxufSBmcm9tICcuLi9tYXAvbWFwQ29uZmlnJztcblxuaW1wb3J0IHtcbiAgZGVsZXRlT2JqZWN0RnJvbUFycmF5LFxufSBmcm9tICcuLi91dGlscy9vYmpVdGlscyc7XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVOb2RlcyA9ICgpID0+IHtcbiAgbGV0IG1hcDphbnlbXSA9IFtdO1xuICBsZXQgdmFsdWUgPSAxO1xuICBsZXQgaWQgPSAwO1xuICBmb3IobGV0IHkgPSAwOyB5IDw9IEhFSUdIVDsgeSs9IGdyaWRTaXplKSB7XG4gICAgZm9yKGxldCB4ID0gMDsgeCA8PSBXSURUSDsgeCs9IGdyaWRTaXplKSB7XG4gICAgICBtYXAucHVzaCh7XG4gICAgICAgIGlkOiBpZCxcbiAgICAgICAgeDogeCxcbiAgICAgICAgeTogeSxcbiAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICBuZWlnaGJvdXJzOiBbXVxuICAgICAgfSk7XG4gICAgICBpZCsrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbWFwO1xufVxuXG5leHBvcnQgY29uc3QgbmVpZ2hib3VycyA9IChub2RlOmFueSwgbWFwOmFueVtdKSA9PiB7XG4gIGxldCBkaXJzID0gW1xuICAgIHt4OiAtZ3JpZFNpemUsIHk6IC1ncmlkU2l6ZSwgZGlzdGFuY2U6IDE0fSxcbiAgICB7eDogMCwgeTogLWdyaWRTaXplLCBkaXN0YW5jZTogMTB9LFxuICAgIHt4OiBncmlkU2l6ZSwgeTogLWdyaWRTaXplLCBkaXN0YW5jZTogMTR9LFxuICAgIHt4OiAtZ3JpZFNpemUsIHk6IDAsIGRpc3RhbmNlOiAxMH0sXG4gICAge3g6IGdyaWRTaXplLCB5OiAwLCBkaXN0YW5jZTogMTB9LFxuICAgIHt4OiAtZ3JpZFNpemUsIHk6IGdyaWRTaXplLCBkaXN0YW5jZTogMTR9LFxuICAgIHt4OiAwLCB5OiBncmlkU2l6ZSwgZGlzdGFuY2U6IDEwfSxcbiAgICB7eDogZ3JpZFNpemUsIHk6IGdyaWRTaXplLCBkaXN0YW5jZTogMTR9XG4gIF07XG4gIGxldCByZXN1bHQgPSBbXTtcbiAgZm9yKGxldCBkaXIgb2YgZGlycykge1xuICAgIGxldCBuZWlnaGJvdXIgPSB7XG4gICAgICB4OiBub2RlLnggKyBkaXIueCxcbiAgICAgIHk6IG5vZGUueSArIGRpci55LFxuICAgICAgZGlzdGFuY2U6IGRpci5kaXN0YW5jZVxuICAgIH1cbiAgICBpZihuZWlnaGJvdXIueCA+PSAwICYmIG5laWdoYm91ci54IDwgV0lEVEggJiYgbmVpZ2hib3VyLnkgPj0gMCAmJiBuZWlnaGJvdXIueSA8IEhFSUdIVCkge1xuICAgICAgICBsZXQgZmluZGVkOmJvb2xlYW4gPSBmYWxzZTtcbiAgICAgICAgZm9yKGxldCBub2RlIG9mIG1hcCkge1xuICAgICAgICAgIGlmKG5laWdoYm91ci54ID09PSBub2RlLnggJiYgbmVpZ2hib3VyLnkgPT09IG5vZGUueSkge1xuICAgICAgICAgICAgZmluZGVkID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYoZmluZGVkKSB7XG4gICAgICAgICAgcmVzdWx0LnB1c2goe1xuICAgICAgICAgICAgeDogbmVpZ2hib3VyLngsXG4gICAgICAgICAgICB5OiBuZWlnaGJvdXIueSxcbiAgICAgICAgICAgIGRpc3RhbmNlOiBuZWlnaGJvdXIuZGlzdGFuY2UsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGNvbnN0IGFkZE5laWdoYm91cnMgPSAobWFwOmFueVtdKSA9PiB7XG4gIGZvcihsZXQgbm9kZSBvZiBtYXApIHtcbiAgICBsZXQgbiA9IG5laWdoYm91cnMobm9kZSwgbWFwKTtcbiAgICBub2RlLm5laWdoYm91cnMgPSBuO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVXYXJyaW9yT2JzdGFjbGUgPSAocG9zaXRpb25YOm51bWJlciwgcG9zaXRpb25ZOm51bWJlciwgbWFwOmFueVtdKSA9PiB7XG4gIGxldCBub2RlID0ge1xuICAgIHg6IHBvc2l0aW9uWCxcbiAgICB5OiBwb3NpdGlvbllcbiAgfTtcbiAgcmV0dXJuIGRlbGV0ZU9iamVjdEZyb21BcnJheShub2RlLCBtYXApXG59XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVPbmVPYnN0YWNsZSA9IChwb3NpdGlvblg6bnVtYmVyLCBwb3NpdGlvblk6bnVtYmVyLCB0eXBlOnN0cmluZz0nZm9yZXN0JykgPT4ge1xuICBsZXQgbm9kZSA9IHtcbiAgICB4OiBwb3NpdGlvblgsXG4gICAgeTogcG9zaXRpb25ZXG4gIH07XG4gIGlmKHR5cGUgPT09ICdmb3Jlc3QnKSBjdHguZmlsbFN0eWxlID0gJ2dyZWVuJztcbiAgZWxzZSBpZih0eXBlID09PSAnbW91bnRhaW4nKSBjdHguZmlsbFN0eWxlID0gJyM4QjQ1MTMnO1xuICBlbHNlIGlmKHR5cGUgPT09ICdyaXZlcicpIGN0eC5maWxsU3R5bGUgPSAnYmx1ZSc7XG4gIGN0eC5maWxsUmVjdChwb3NpdGlvblgsIHBvc2l0aW9uWSwgZ3JpZFNpemUsIGdyaWRTaXplKTtcbiAgcmV0dXJuIGRlbGV0ZU9iamVjdEZyb21BcnJheShub2RlLCBtYXApXG59XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVPYnN0YWNsZXMgPSAoc3RhcnRYOm51bWJlciwgZmluaXNoWDpudW1iZXIsIHN0YXJ0WTpudW1iZXIsIGZpbmlzaFk6bnVtYmVyLCB0eXBlOnN0cmluZz0nZm9yZXN0JykgPT4ge1xuICBsZXQgbmV3TWFwOmFueVtdID0gbWFwO1xuICBmb3IobGV0IHggPSBzdGFydFg7IHggPD0gZmluaXNoWDsgeCArPSBncmlkU2l6ZSkge1xuICAgIGZvcihsZXQgeSA9IHN0YXJ0WTsgeSA8PSBmaW5pc2hZOyB5ICs9IGdyaWRTaXplKSB7XG4gICAgICBsZXQgbm9kZSA9IHtcbiAgICAgICAgeCxcbiAgICAgICAgeVxuICAgICAgfVxuICAgICAgbmV3TWFwID0gZGVsZXRlT2JqZWN0RnJvbUFycmF5KG5vZGUsIG5ld01hcCk7XG4gICAgICBpZih0eXBlID09PSAnZm9yZXN0JykgY3R4LmZpbGxTdHlsZSA9ICdncmVlbic7XG4gICAgICBlbHNlIGlmKHR5cGUgPT09ICdtb3VudGFpbicpIGN0eC5maWxsU3R5bGUgPSAnIzhCNDUxMyc7XG4gICAgICBlbHNlIGlmKHR5cGUgPT09ICdyaXZlcicpIGN0eC5maWxsU3R5bGUgPSAnYmx1ZSc7XG4gICAgICBsZXQgeExlbmd0aCA9IE1hdGguYWJzKHN0YXJ0WCAtIGZpbmlzaFgpO1xuICAgICAgbGV0IHlMZW5ndGggPSBNYXRoLmFicyhzdGFydFkgLSBmaW5pc2hZKTtcbiAgICAgIGN0eC5maWxsUmVjdCh4LCB5LCBncmlkU2l6ZSwgZ3JpZFNpemUpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbmV3TWFwO1xufVxuXG5leHBvcnQgbGV0IG1hcCA9IGNyZWF0ZU5vZGVzKCk7XG5tYXAgPSBjcmVhdGVPYnN0YWNsZXMoMTIwLCAxNjAsIDEyMCwgMTYwLCAncml2ZXInKTtcbm1hcCA9IGNyZWF0ZU9ic3RhY2xlcyg2NjAsIDgyMCwgMTgwLCAyMDAsICdyaXZlcicpO1xubWFwID0gY3JlYXRlT2JzdGFjbGVzKDkwMCwgMTE4MCwgMTgwLCAyMDAsICdyaXZlcicpO1xubWFwID0gY3JlYXRlT25lT2JzdGFjbGUoMzAwLCAzNDAsICdtb3VudGFpbicpO1xubWFwID0gY3JlYXRlT2JzdGFjbGVzKDI4MCwgMzIwLCAzNjAsIDM4MCwgJ21vdW50YWluJyk7XG5tYXAgPSBjcmVhdGVPYnN0YWNsZXMoNzQwLCA3NjAsIDQyMCwgNTAwLCAnZm9yZXN0Jyk7XG5tYXAgPSBjcmVhdGVPYnN0YWNsZXMoOTYwLCAxMDAwLCA0NDAsIDQ2MCwgJ2ZvcmVzdCcpO1xubWFwID0gY3JlYXRlT2JzdGFjbGVzKDk4MCwgMTAwMCwgNDQwLCA1MjAsICdmb3Jlc3QnKTtcbmFkZE5laWdoYm91cnMobWFwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tYXAvY3JlYXRlTWFwLnRzIiwiZXhwb3J0IGNvbnN0IGRlbGV0ZU9iamVjdEZyb21BcnJheSA9IChvYmplY3Q6YW55LCBhcnI6YW55W10pID0+IHtcbiAgbGV0IHVwZGF0ZWRBcnIgPSBhcnIuZmlsdGVyKChlbCkgPT4ge1xuICAgIGlmKGVsLnggPT09IG9iamVjdC54ICYmIGVsLnkgPT09IG9iamVjdC55KSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9KTtcbiAgcmV0dXJuIHVwZGF0ZWRBcnI7XG59XG5cbmV4cG9ydCBjb25zdCBpc09iamVjdEluQXJyYXkgPSAob2JqZWN0OmFueSwgYXJyOmFueVtdKSA9PiB7XG4gIGxldCByZXN1bHQ6Ym9vbGVhbiA9IGZhbHNlO1xuICBmb3IobGV0IG5vZGUgb2YgYXJyKSB7XG4gICAgaWYob2JqZWN0LnggPT09IG5vZGUueCAmJiBvYmplY3QueSA9PT0gbm9kZS55KSB7XG4gICAgICByZXN1bHQgPSB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgY29uc3QgZ2V0Tm9kZUZyb21BcnJheSA9IChvYmplY3Q6YW55LCBhcnI6YW55W10pID0+IHtcbiAgZm9yKGxldCBub2RlIG9mIGFycikge1xuICAgIGlmKG5vZGUueCA9PT0gb2JqZWN0LnggJiYgbm9kZS55ICYmIG9iamVjdC55KSB7XG4gICAgICByZXR1cm4gbm9kZTtcbiAgICB9XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91dGlscy9vYmpVdGlscy50cyIsImltcG9ydCB7XG4gIGNhbnZhcyxcbiAgY3R4LFxuICBXSURUSCxcbiAgSEVJR0hULFxuICBncmlkU2l6ZSxcbn0gZnJvbSAnLi4vbWFwL21hcENvbmZpZyc7XG5cbmV4cG9ydCBjb25zdCBkcmF3UGF0aCA9IChwYXRoOmFueVtdKSA9PiB7XG4gIGZvcihsZXQgc3RlcCBvZiBwYXRoKSB7XG4gICAgY3R4LmZpbGxTdHlsZSA9ICd5ZWxsb3cnO1xuICAgIGN0eC5maWxsUmVjdChzdGVwLngsIHN0ZXAueSwgZ3JpZFNpemUsIGdyaWRTaXplKTtcbiAgfVxufVxuXG5leHBvcnQgbGV0IGdldE5vZGVGcm9tTWFwID0gKHg6bnVtYmVyLCB5Om51bWJlciwgbWFwOmFueVtdKSA9PiB7XG4gIGxldCBub2RlOmFueTtcbiAgZm9yKGxldCBncmlkIG9mIG1hcCkge1xuICAgIGxldCBib3R0b21SaWdodFggPSBncmlkLnggKyBncmlkU2l6ZTtcbiAgICBsZXQgYm90dG9tUmlnaHRZID0gZ3JpZC55ICsgZ3JpZFNpemU7XG4gICAgaWYoeCA+PSBncmlkLnggJiYgeCA8IGJvdHRvbVJpZ2h0WCAmJiB5ID49IGdyaWQueSAmJiB5IDwgYm90dG9tUmlnaHRZKSB7XG4gICAgICBub2RlID0gZ3JpZDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG5vZGU7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcGF0aC9kcmF3UGF0aC50cyIsImV4cG9ydCBjb25zdCB3YXJyaW9yczphbnlbXSA9IFtdO1xuZXhwb3J0IGxldCBjdXJyZW50bHlDaG9zZW5XYXJyaW9yOmFueSA9IG51bGw7XG5cbmV4cG9ydCBjb25zdCBhc3NpZ25DdXJyZW50bHlDaG9zZW5XYXJyaW9yID0gKHdhcnJpb3I6YW55KSA9PiB7XG4gIC8vIGNoZWNrIHVuaXRcbiAgaWYod2Fycmlvcikge1xuICAgICAgY3VycmVudGx5Q2hvc2VuV2FycmlvciA9IHdhcnJpb3I7XG4gIH0gZWxzZSB7XG4gICAgY3VycmVudGx5Q2hvc2VuV2FycmlvciA9IG51bGw7XG4gIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3N0b3JlL3dhcnJpb3JTdG9yZS50cyIsImltcG9ydCB7ZHJhd1dhcnJpb3J9IGZyb20gJy4vd2FycmlvckFjdGlvbic7XG5pbXBvcnQge3dhcnJpb3JzfSBmcm9tICcuLi9zdG9yZS93YXJyaW9yU3RvcmUnO1xuaW1wb3J0IHtcbiAgbWFwLFxuICBjcmVhdGVXYXJyaW9yT2JzdGFjbGUsXG4gIGFkZE5laWdoYm91cnNcbn0gZnJvbSAnLi4vbWFwL2NyZWF0ZU1hcCc7XG5pbXBvcnQge2dldE5vZGVGcm9tTWFwfSBmcm9tICcuLi9wYXRoL2RyYXdQYXRoJztcbmltcG9ydCB7XG4gIGdyaWRTaXplLFxuICBjdHgsXG4gIFdJRFRILFxuICBIRUlHSFRcbn0gZnJvbSAnLi4vbWFwL21hcENvbmZpZyc7XG5pbXBvcnQge2FTdGFyfSBmcm9tICcuLi9wYXRoL0FTdGFyJztcbmltcG9ydCB7ZGVsZXRlT2JqZWN0RnJvbUFycmF5fSBmcm9tICcuLi91dGlscy9vYmpVdGlscyc7XG5cbmV4cG9ydCBsZXQgdXBkYXRlV2FycmlvciA9ICh3YXJyaW9yOmFueSwgcGF0aDphbnlbXSwgaTpudW1iZXI9MCwgY3VycmVudE1vdmVUb1g6bnVtYmVyLCBjdXJyZW50TW92ZVRvWTpudW1iZXIpID0+IHtcbiAgLy9jb25zb2xlLmxvZygndXBkYXRlV2FycmlvcicpO1xuICB3YXJyaW9yLnNldElzTW92aW5nVG9UcnVlKCk7XG4gIGlmKGN1cnJlbnRNb3ZlVG9YICE9PSB3YXJyaW9yLm1vdmVUb05vZGUueCB8fCBjdXJyZW50TW92ZVRvWSAhPT0gd2Fycmlvci5tb3ZlVG9Ob2RlLnkpIHtcbiAgICBjb25zb2xlLmxvZygnbmV3IGRlc3RpbmF0aW9uIGhhcyBiZWVuIGNob3NlbicpO1xuICAgIHdhcnJpb3Iuc2V0SXNNb3ZpbmdUb0ZhbHNlKCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGxldCB1cGRhdGVkUGF0aCA9IHBhdGg7XG4gIGxldCBub2RlID0gdXBkYXRlZFBhdGhbaV07IC8vIGdldCBuZXh0IG5vZGVcblxuICAvLyBhbGx5IHdhcnJpb3IgaXMgb24gdGhlIGRlc3RpbmF0aW9uIHBvc2l0aW9uXG4gIC8vIGN1cnJlbnRXYXJyaW9yIHNob3VsZCBzdG9wIG1vdmluZ1xuICBpZihjaGVja090aGVyV2FycmlvcnNQb3NpdGlvbih3YXJyaW9ycywgd2Fycmlvciwgbm9kZS54LCBub2RlLnkpICYmIGkgPT09IHVwZGF0ZWRQYXRoLmxlbmd0aCAtIDEpIHtcbiAgICB3YXJyaW9yLm1vdmVUb05vZGUueCA9IHdhcnJpb3IueDsgLy8gc2V0IG1vdmVUb05vZGUgdmFsdWUgdG8gY3VycmVudCB3YXJyaW9yIHBvc2l0aW9uXG4gICAgd2Fycmlvci5tb3ZlVG9Ob2RlLnkgPSB3YXJyaW9yLnk7XG4gICAgd2Fycmlvci5zZXRJc01vdmluZ1RvRmFsc2UoKTtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYoY2hlY2tPdGhlcldhcnJpb3JzUG9zaXRpb24od2FycmlvcnMsIHdhcnJpb3IsIG5vZGUueCwgbm9kZS55KSkge1xuICAgIC8vIHVuaXQgaGFzIGFub3RoZXIgYWxsaWVzJyB1bml0IG9uIGl0cyB3YXlcbiAgICBjb25zb2xlLmVycm9yKCd1cGRhdGVVbml0OiBhbm90aGVyIHVuaXQgaXMgb24gdGhlIHdheSB4Oicsbm9kZS54LCd5OicsIG5vZGUueSk7XG4gICAgbGV0IHVwZGF0ZWRNYXAgPSBtYXA7XG4gICAgdXBkYXRlZE1hcCA9IGNyZWF0ZVdhcnJpb3JPYnN0YWNsZShub2RlLngsIG5vZGUueSwgdXBkYXRlZE1hcCk7XG4gICAgYWRkTmVpZ2hib3Vycyh1cGRhdGVkTWFwKTtcbiAgICBjb25zb2xlLmxvZygnZGVsZXRlZCBOb2RlJywgbm9kZSk7XG4gICAgY29uc29sZS5sb2coJ3VwZGF0ZWRNYXAnLCB1cGRhdGVkTWFwKTtcbiAgICBjb25zb2xlLmxvZygnbm9kZScsIG5vZGUpO1xuICAgIGxldCBzdGFydE5vZGUgPSBnZXROb2RlRnJvbU1hcCh3YXJyaW9yLngsIHdhcnJpb3IueSwgdXBkYXRlZE1hcCk7XG4gICAgbGV0IGZpbmlzaE5vZGUgPSBnZXROb2RlRnJvbU1hcChjdXJyZW50TW92ZVRvWCwgY3VycmVudE1vdmVUb1ksIHVwZGF0ZWRNYXApO1xuICAgIGxldCBuZXdQYXRoOmFueSA9IGFTdGFyKHN0YXJ0Tm9kZSwgZmluaXNoTm9kZSwgdXBkYXRlZE1hcCk7XG5cbiAgICBjb25zb2xlLmVycm9yKCduZXdQYXRoJywgbmV3UGF0aCk7XG4gICAgdXBkYXRlV2Fycmlvcih3YXJyaW9yLCBuZXdQYXRoLCAwLCBjdXJyZW50TW92ZVRvWCwgY3VycmVudE1vdmVUb1kpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGxldCBub2RlVG9DbGVhciA9IG5vZGU7O1xuICBpZihpICE9PSAwKSB7XG4gICAgbm9kZVRvQ2xlYXIgPSB1cGRhdGVkUGF0aFtpIC0gMV07XG4gIH1cbiAgbW92ZVRvTmV4dE5vZGUod2Fycmlvciwgbm9kZSwgbm9kZVRvQ2xlYXIpO1xuICBpKys7XG4gIGlmKGkgIT09IHVwZGF0ZWRQYXRoLmxlbmd0aCkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdXBkYXRlV2Fycmlvcih3YXJyaW9yLCB1cGRhdGVkUGF0aCwgaSwgY3VycmVudE1vdmVUb1gsIGN1cnJlbnRNb3ZlVG9ZKTtcbiAgICB9LCA0MDApO1xuICB9XG59XG5cbi8vIGNoZWNrIGlmIG5leHROb2RlIGlzIG9jY3VwaWVkIGJ5IG90aGVyIHdhcnJpb3JcbmV4cG9ydCBjb25zdCBjaGVja090aGVyV2FycmlvcnNQb3NpdGlvbiA9ICh3YXJyaW9yczphbnlbXSwgY3VycmVudFVuaXQ6YW55LCB4Om51bWJlciwgeTpudW1iZXIpID0+IHtcbiAgbGV0IHVwZGF0ZWRXYXJyaW9ycyA9IGRlbGV0ZU9iamVjdEZyb21BcnJheShjdXJyZW50VW5pdCwgd2FycmlvcnMpO1xuICBmb3IobGV0IHdhcnJpb3Igb2YgdXBkYXRlZFdhcnJpb3JzKSB7XG4gICAgaWYod2Fycmlvci54ID09PSB4ICYmIHdhcnJpb3IueSA9PT0geSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IGNvbnN0IG1vdmVUb05leHROb2RlID0gKHdhcnJpb3I6YW55LCBub2RlOmFueSwgcHJldmlvdXNOb2RlOmFueSkgPT4ge1xuICBjdHguY2xlYXJSZWN0KHByZXZpb3VzTm9kZS54LCBwcmV2aW91c05vZGUueSwgZ3JpZFNpemUsIGdyaWRTaXplKTtcbiAgd2Fycmlvci5zZXRYKG5vZGUueCk7IC8vIGNhbGN1bGF0ZSBjZW50ZXIgb2YgdGhlIGN1cnJlbnQgbm9kZVxuICB3YXJyaW9yLnNldFkobm9kZS55KTtcbiAgZHJhd1dhcnJpb3Iod2Fycmlvcik7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvd2Fycmlvci93YXJyaW9yTW92ZW1lbnQudHMiLCJleHBvcnQgY29uc3QgdW5pdHM6YW55W10gPSBbXTtcbmV4cG9ydCBsZXQgY3VycmVudGx5Q2hvc2VuVW5pdDphbnkgPSBudWxsO1xuXG5leHBvcnQgY29uc3QgYXNzaWduQ3VycmVudGx5Q2hvc2VuVW5pdCA9ICh1bml0OmFueSkgPT4ge1xuICAvLyBjaGVjayB1bml0XG4gIGlmKHVuaXQpIHtcbiAgICAgIGN1cnJlbnRseUNob3NlblVuaXQgPSB1bml0O1xuICB9IGVsc2Uge1xuICAgIGN1cnJlbnRseUNob3NlblVuaXQgPSBudWxsO1xuICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zdG9yZS91bml0U3RvcmUudHMiLCJpbXBvcnQge25laWdoYm91cnN9IGZyb20gJy4uL21hcC9jcmVhdGVNYXAnO1xuaW1wb3J0IHtcbiAgZGVsZXRlT2JqZWN0RnJvbUFycmF5LFxuICBpc09iamVjdEluQXJyYXlcbn0gZnJvbSAnLi4vdXRpbHMvb2JqVXRpbHMnO1xuXG5pbXBvcnQge1xuICBnZXRNaW5GU2NvcmUsXG4gIHVuY2xvc2VkTmVpZ2JvdXJzLFxuICBpc09iamVjdEluTWFwS2V5c1xufSBmcm9tICcuL2FTdGFyVXRpbHMnO1xuXG5leHBvcnQgY29uc3QgYVN0YXIgPSAoc3RhcnROb2RlOmFueSwgZmluaXNoTm9kZTphbnksIG1hcDphbnlbXSkgPT4ge1xuICAvLyB0aGUgc2V0IG9mIGN1cnJlbnRseSBkaXNjb3ZlcmVkIG5vZGVzIHRoYXQgYXJlIG5vdCBldmFsdWF0ZWQgeWV0XG4gIC8vIEluaXRpYWxseSBvbmx5IHRoZSBzdGFydCBub2RlIGlzIGtub3duXG4gIGxldCBvcGVuOmFueVtdID0gW107XG5cbiAgLy8gdGhlIHNldCBvZiBub2RlcyB0aGF0IGFscmVhZHkgZXZhbHVhdGVkXG4gIGxldCBjbG9zZWQ6YW55W10gPSBbXTtcbiAgc3RhcnROb2RlLmdTY29yZSA9IDA7XG4gIHN0YXJ0Tm9kZS5mU2NvcmUgPSBzdGFydE5vZGUuZ1Njb3JlICsgaChzdGFydE5vZGUsIGZpbmlzaE5vZGUpXG4gIG9wZW4ucHVzaChzdGFydE5vZGUpO1xuXG4gIC8vIGZvciBlYWNoIG5vZGUsIHdoaWNoIG5vZGUgaXMgY2FuIG1vc3QgZWZmaWNpZW50bHkgYmUgcmVhY2hlZCBmcm9tXG4gIC8vIGlmIGEgbm9kZSBjYW4gYmUgcmVhY2hlZCBmcm9tIG1hbnkgbm9kZXMsIGNhbWVGcm9tIHdpbGwgZXZlbnRpYWxseVxuICAvLyBjb250YWluIHRoZSBtb3N0IGVmZmljaWVudCBwcmV2aW91cyBzdGVwXG4gIGxldCBmcm9tID0gbmV3IE1hcCgpO1xuXG4gIC8vIEZvciBlYWNoIG5vZGUsIHRoZSBjb3N0IG9mIGdldHRpbmcgZnJvbSB0aGUgc3RhcnQgbm9kZSB0byB0aGF0IG5vZGUuXG4gIC8vIGxldCBnU2NvcmUgPSBuZXcgTWFwKCk7XG4gIC8vIGxldCBmU2NvcmUgPSBuZXcgTWFwKCk7XG4gIC8vXG4gIC8vIGdTY29yZS5zZXQoc3RhcnROb2RlLCAwKTtcbiAgLy8gZlNjb3JlLnNldChzdGFydE5vZGUsIGdTY29yZS5nZXQoc3RhcnROb2RlKSArIGgoc3RhcnROb2RlLCBmaW5pc2hOb2RlKSk7XG4gIHdoaWxlKG9wZW4pIHtcbiAgICBsZXQgY3VycmVudDphbnkgPSBnZXRNaW5GU2NvcmUob3Blbik7XG4gICAgLy9jb25zb2xlLmxvZygnY3VycmVudCcsIGN1cnJlbnQpO1xuICAgIGlmKGN1cnJlbnQueCA9PT0gZmluaXNoTm9kZS54ICYmIGN1cnJlbnQueSA9PT0gZmluaXNoTm9kZS55KSB7XG4gICAgICAvL2NvbnNvbGUuZXJyb3IoJ1BhdGgnLCByZWNvbnN0cnVjdFBhdGgoZnJvbSwgY3VycmVudCkpO1xuICAgICAgcmV0dXJuIHJlY29uc3RydWN0UGF0aChmcm9tLCBjdXJyZW50KTtcbiAgICB9XG4gICAgb3BlbiA9IGRlbGV0ZU9iamVjdEZyb21BcnJheShjdXJyZW50LCBvcGVuKTtcbiAgICBjbG9zZWQucHVzaChjdXJyZW50KTtcbiAgICBmb3IobGV0IG5laWdoYm91ciBvZiB1bmNsb3NlZE5laWdib3VycyhjdXJyZW50LCBjbG9zZWQpKSB7XG4gICAgICBsZXQgdGVtcEcgPSBjdXJyZW50LmdTY29yZSArIG5laWdoYm91ci5kaXN0YW5jZTtcbiAgICAgIGlmKCFpc09iamVjdEluQXJyYXkobmVpZ2hib3VyLCBvcGVuKSB8fCB0ZW1wRyA8IG5laWdoYm91ci5nU2NvcmUpIHtcbiAgICAgICAgZnJvbS5zZXQobmVpZ2hib3VyLCBjdXJyZW50KTtcbiAgICAgICAgbmVpZ2hib3VyLmdTY29yZSA9IHRlbXBHO1xuICAgICAgICBuZWlnaGJvdXIuZlNjb3JlID0gbmVpZ2hib3VyLmdTY29yZSArIGgobmVpZ2hib3VyLCBmaW5pc2hOb2RlKTtcbiAgICAgIH1cbiAgICAgIGlmKCFpc09iamVjdEluQXJyYXkobmVpZ2hib3VyLCBvcGVuKSkgeyAvLyBjcmVhdGUgZnVuY3Rpb25cbiAgICAgICAgbGV0IG5vZGVOZWlnaGJvdXJzID0gbmVpZ2hib3VycyhuZWlnaGJvdXIsIG1hcCk7XG4gICAgICAgIG5laWdoYm91ci5uZWlnaGJvdXJzID0gbm9kZU5laWdoYm91cnM7XG4gICAgICAgIG9wZW4ucHVzaChuZWlnaGJvdXIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBjb25zb2xlLmxvZygnZmFpbHVyZScpO1xuICByZXR1cm4gMDsgLy8gZmFpbHVyZVxufVxuXG5leHBvcnQgY29uc3QgaCA9IChzdGFydE5vZGU6YW55LCBmaW5pc2hOb2RlOmFueSkgPT4ge1xuLy9mdW5jdGlvbiBoZXVyaXN0aWMobm9kZSkgPVxuICAvLyBkeCA9IGFicyhub2RlLnggLSBnb2FsLngpXG4gIC8vIGR5ID0gYWJzKG5vZGUueSAtIGdvYWwueSlcbiAgLy8gcmV0dXJuIEQgKiAoZHggKyBkeSkgKyAoRDIgLSAyICogRCkgKiBtaW4oZHgsIGR5KVxuICBsZXQgRCA9IDEwOyAvLyBjb3N0IG9mIG1vdmluZyBob3Jpem9udGFsbHlcbiAgbGV0IEQyID0gMTQ7IC8vIGNvc3Qgb2YgbW92aW5nIGRpYWdvbmFsbHlcbiAgbGV0IGR4ID0gTWF0aC5hYnMoc3RhcnROb2RlLnggLSBmaW5pc2hOb2RlLngpO1xuICBsZXQgZHkgPSBNYXRoLmFicyhzdGFydE5vZGUueSAtIGZpbmlzaE5vZGUueSk7XG4gIHJldHVybiBEICogKGR4ICsgZHkpICsgKEQyIC0gMiAqIEQpICogTWF0aC5taW4oZHgsIGR5KTtcbn1cblxuXG5cbmV4cG9ydCBjb25zdCByZWNvbnN0cnVjdFBhdGggPSAoZnJvbTphbnksIGN1cnJlbnQ6YW55KSA9PiB7XG4gIC8vIGZ1bmN0aW9uIHJlY29uc3RydWN0X3BhdGgoY2FtZUZyb20sIGN1cnJlbnQpXG4gIC8vICAgdG90YWxfcGF0aCA6PSBbY3VycmVudF1cbiAgLy8gICB3aGlsZSBjdXJyZW50IGluIGNhbWVGcm9tLktleXM6XG4gIC8vICAgICAgIGN1cnJlbnQgOj0gY2FtZUZyb21bY3VycmVudF1cbiAgLy8gICAgICAgdG90YWxfcGF0aC5hcHBlbmQoY3VycmVudClcbiAgLy8gICByZXR1cm4gdG90YWxfcGF0aFxuICBsZXQgcmV2ZXJzZVBhdGg6YW55W10gPSBbY3VycmVudF07XG4gIGxldCB0b3RhbFBhdGg6YW55W10gPSBbXTtcbiAgd2hpbGUoaXNPYmplY3RJbk1hcEtleXMoY3VycmVudCwgZnJvbSkpIHtcbiAgICBjdXJyZW50ID0gZnJvbS5nZXQoY3VycmVudCk7XG4gICAgcmV2ZXJzZVBhdGgucHVzaChjdXJyZW50KTtcbiAgfVxuICBmb3IobGV0IGkgPSByZXZlcnNlUGF0aC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIHRvdGFsUGF0aC5wdXNoKHJldmVyc2VQYXRoW2ldKTtcbiAgfVxuICByZXR1cm4gdG90YWxQYXRoO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3BhdGgvQVN0YXIudHMiLCJleHBvcnQgY29uc3QgZ2V0Q2xvc2VzdFdhcnJpb3JUb0Rlc3RpbmF0aW9uID0gKHVuaXQ6YW55LCBkZXN0WDpudW1iZXIsIGRlc3RZOm51bWJlcikgPT4ge1xuICBsZXQgY2xvc2VzdCA9IDA7XG4gIGxldCBkaWZmZXJlbmNlOm51bWJlcjtcbiAgbGV0IHdhcnJpb3JzID0gdW5pdC53YXJyaW9ycztcbiAgZm9yKGxldCBpID0gMTsgaSA8PSB3YXJyaW9ycy5sZW5ndGggLSAxOyArK2kpIHtcbiAgICBsZXQgY3VycmVudFVuaXREaWZmZXJlbmNlID0gTWF0aC5zcXJ0KE1hdGgucG93KE1hdGguYWJzKHdhcnJpb3JzW2ldLnggLSBkZXN0WCksIDIpICsgTWF0aC5wb3coTWF0aC5hYnMod2FycmlvcnNbaV0ueSAtIGRlc3RZKSwgMikpO1xuICAgIGxldCBwcmV2aW91c1VuaXREaWZmZXJlbmNlID0gTWF0aC5zcXJ0KE1hdGgucG93KE1hdGguYWJzKHdhcnJpb3JzW2Nsb3Nlc3RdLnggLSBkZXN0WCksIDIpICsgTWF0aC5wb3coTWF0aC5hYnMod2FycmlvcnNbY2xvc2VzdF0ueSAtIGRlc3RZKSwgMikpO1xuXG4gICAgaWYoY3VycmVudFVuaXREaWZmZXJlbmNlIDwgcHJldmlvdXNVbml0RGlmZmVyZW5jZSkge1xuICAgICAgY2xvc2VzdCA9IGk7XG4gICAgfVxuICB9XG4gIHJldHVybiB3YXJyaW9yc1tjbG9zZXN0XTtcbn1cblxuZXhwb3J0IGNvbnN0IGdldENsb3Nlc3RXYXJyaW9yVG9EZXN0aW5hdGlvbkluQXJyYXkgPSAod2FycmlvcnM6YW55W10sIGRlc3RYOm51bWJlciwgZGVzdFk6bnVtYmVyKSA9PiB7XG4gIGxldCBjbG9zZXN0ID0gMDtcbiAgbGV0IGRpZmZlcmVuY2U6bnVtYmVyO1xuICBmb3IobGV0IGkgPSAxOyBpIDw9IHdhcnJpb3JzLmxlbmd0aCAtIDE7ICsraSkge1xuICAgIGxldCBjdXJyZW50VW5pdERpZmZlcmVuY2UgPSBNYXRoLnNxcnQoTWF0aC5wb3coTWF0aC5hYnMod2FycmlvcnNbaV0ueCAtIGRlc3RYKSwgMikgKyBNYXRoLnBvdyhNYXRoLmFicyh3YXJyaW9yc1tpXS55IC0gZGVzdFkpLCAyKSk7XG4gICAgbGV0IHByZXZpb3VzVW5pdERpZmZlcmVuY2UgPSBNYXRoLnNxcnQoTWF0aC5wb3coTWF0aC5hYnMod2FycmlvcnNbY2xvc2VzdF0ueCAtIGRlc3RYKSwgMikgKyBNYXRoLnBvdyhNYXRoLmFicyh3YXJyaW9yc1tjbG9zZXN0XS55IC0gZGVzdFkpLCAyKSk7XG5cbiAgICBpZihjdXJyZW50VW5pdERpZmZlcmVuY2UgPCBwcmV2aW91c1VuaXREaWZmZXJlbmNlKSB7XG4gICAgICBjbG9zZXN0ID0gaTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHdhcnJpb3JzW2Nsb3Nlc3RdO1xufVxuXG5leHBvcnQgY29uc3QgZ2V0Q2VudHJhbFdhcnJpb3JJblVuaXQgPSAodW5pdDphbnkpID0+IHtcbiAgbGV0IGNlbnRyYWxSb3cgPSBNYXRoLnJvdW5kKHVuaXQucm93IC8gMik7XG4gIGxldCBjZW50cmFsQ29sID0gTWF0aC5yb3VuZCh1bml0LmNvbCAvIDIpO1xuICBmb3IobGV0IHdhcnJpb3Igb2YgdW5pdC53YXJyaW9ycykge1xuICAgIGlmKHdhcnJpb3IuY29sSW5Vbml0ID09PSBjZW50cmFsQ29sICYmIHdhcnJpb3Iucm93SW5Vbml0ID09PSBjZW50cmFsUm93KSB7XG4gICAgICByZXR1cm4gd2FycmlvcjtcbiAgICB9XG4gIH1cbn1cblxuIC8vIGdldCB1bml0J3MgcG9zaXRpb24gYW5kIGRlc3RpbmF0aW9uIHBvc2l0aW9uIGFuZCByZXR1cm4gYW5nbGUgaW4gcmFkaWFucyBiZXR3ZWVuIHVuaXQgYW5kIGRlc3RpbmF0aW9uXG5leHBvcnQgY29uc3QgY2FsY0Rlc3RpbmF0aW9uQW5nbGVJbkRlZ3JlZXMgPSAodW5pdDphbnksIGRlc3RYOm51bWJlciwgZGVzdFk6bnVtYmVyKTpudW1iZXIgPT4ge1xuICAvL2NvbnNvbGUuZXJyb3IoJ2NhbGNEZXN0aW5hdGlvbkFuZ2xlSW5EZWdyZWVzJyk7XG4gIGxldCB3YXJyaW9yID0gZ2V0Q2xvc2VzdFdhcnJpb3JUb0Rlc3RpbmF0aW9uKHVuaXQsIGRlc3RYLCBkZXN0WSk7XG4gIGxldCBhbmdsZTtcbiAgbGV0IGEgPSBNYXRoLmFicyhkZXN0WSAtIHdhcnJpb3IueSk7XG4gIGxldCBiID0gTWF0aC5hYnMoZGVzdFggLSB3YXJyaW9yLngpO1xuICBsZXQgYW5nbGVJblJhZGlhbiA9IE1hdGguYXRhbihhIC8gYik7XG4gIC8vIGNoZWNrIHF1YXRlciBvZiB0aGUgY2lyY2xlXG4gIGxldCBkZWdyZWUgPSAgYW5nbGVJblJhZGlhbiAqICgxODAgLyBNYXRoLlBJKTsgLy8gY29udmVydCByYWRpYW5zIGludG8gZGVncmVlXG4gIGxldCBxdWF0ZXIgPSBnZXRRdWF0ZXIod2Fycmlvci54LCB3YXJyaW9yLnksIGRlc3RYLCBkZXN0WSk7IC8vIGNoZWNrIHF1YXRlclxuICBpZihxdWF0ZXIgPT09IDEpIGFuZ2xlID0gZGVncmVlO1xuICBpZihxdWF0ZXIgPT09IDIpIGFuZ2xlID0gOTAgKyAoOTAgLSBkZWdyZWUpO1xuICBlbHNlIGlmKHF1YXRlciA9PT0gMykgYW5nbGUgPSAxODAgKyBkZWdyZWU7XG4gIGVsc2UgaWYocXVhdGVyID09PSA0KSBhbmdsZSA9IDI3MCArICg5MCAtIGRlZ3JlZSk7XG4gIHJldHVybiBNYXRoLnJvdW5kKGFuZ2xlKTtcbn1cblxuZXhwb3J0IGNvbnN0IGdldFF1YXRlciA9ICh1bml0WDpudW1iZXIsIHVuaXRZOm51bWJlciwgZGVzdFg6bnVtYmVyLCBkZXN0WTpudW1iZXIpOm51bWJlciA9PiB7XG4gIC8vY29uc29sZS5lcnJvcignZ2V0UXVhdGVyJyk7XG4gIGxldCBxdWF0ZXI7XG4gIGlmKGRlc3RYID49IHVuaXRYICYmIGRlc3RZIDwgdW5pdFkpIHtcbiAgICBxdWF0ZXIgPSAxO1xuICB9XG4gIGVsc2UgaWYoZGVzdFggPCB1bml0WCAmJiBkZXN0WSA8PSB1bml0WSkge1xuICAgIHF1YXRlciA9IDI7XG4gIH1cbiAgZWxzZSBpZihkZXN0WCA8PSB1bml0WCAmJiBkZXN0WSA+IHVuaXRZKSB7XG4gICAgcXVhdGVyID0gMztcbiAgfVxuICBlbHNlIGlmKGRlc3RYID4gdW5pdFggJiYgZGVzdFkgPj0gdW5pdFkpIHtcbiAgICBxdWF0ZXIgPSA0O1xuICB9XG4gIHJldHVybiBxdWF0ZXI7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdW5pdC91bml0VXRpbHMudHMiLCJpbXBvcnQge1xuICBjYW52YXMsXG4gIGN0eCxcbiAgV0lEVEgsXG4gIEhFSUdIVCxcbiAgZ3JpZFNpemVcbn0gZnJvbSAnLi9tYXAvbWFwQ29uZmlnJztcblxuaW1wb3J0IHtkcmF3R3JpZH0gZnJvbSAnLi9tYXAvZHJhd0dyaWQnO1xuaW1wb3J0IHtcbiAgYWRkTmVpZ2hib3VycyxcbiAgY3JlYXRlTm9kZXMsXG4gIG1hcFxufSBmcm9tICcuL21hcC9jcmVhdGVNYXAnO1xuaW1wb3J0IHtzaG93T2JzdGFjbGVzfSBmcm9tICcuL21hcC9tYXBVdGlscyc7XG5pbXBvcnQge2gsIGFTdGFyfSBmcm9tICcuL3BhdGgvQVN0YXInO1xuaW1wb3J0IHtcbiAgZHJhd1BhdGgsXG4gIGdldE5vZGVGcm9tTWFwXG59IGZyb20gJy4vcGF0aC9kcmF3UGF0aCc7XG5cbmltcG9ydCBXYXJyaW9yIGZyb20gJy4vd2Fycmlvci9XYXJyaW9yJztcbmltcG9ydCB7d2FycmlvcnMsIGN1cnJlbnRseUNob3NlbldhcnJpb3J9IGZyb20gJy4vc3RvcmUvd2FycmlvclN0b3JlJztcbmltcG9ydCB7XG4gIG9uQ2hvb3NlV2FycmlvcixcbiAgY3JlYXRlV2FycmlvcixcbiAgYXNzaWduV2Fycmlvck1vdmVUb1Bvc2l0aW9uLFxufSBmcm9tICcuL3dhcnJpb3Ivd2FycmlvckFjdGlvbic7XG5pbXBvcnQge3VwZGF0ZVdhcnJpb3J9IGZyb20gJy4vd2Fycmlvci93YXJyaW9yTW92ZW1lbnQnO1xuXG5pbXBvcnQge1xuICBjcmVhdGVVbml0LFxuICBvbkNob29zZVVuaXQsXG4gIG9uQ2hhbmdlV2FycmlvclBvc2l0aW9uSW5Vbml0XG59IGZyb20gJy4vdW5pdC91bml0QWN0aW9ucyc7XG5pbXBvcnQge1xuICB1bml0cyxcbiAgY3VycmVudGx5Q2hvc2VuVW5pdFxufSBmcm9tICcuL3N0b3JlL3VuaXRTdG9yZSc7XG5cbmltcG9ydCB7XG4gIGNhbGNEZXN0aW5hdGlvbkFuZ2xlSW5EZWdyZWVzXG59IGZyb20gJy4vdW5pdC91bml0VXRpbHMnO1xuXG5pbXBvcnQge21vdmVUb1Bvc2l0aW9ufSBmcm9tICcuL3VuaXQvdW5pdE1vdmVtZW50JztcblxubGV0IHdhcnJpb3IgPSBjcmVhdGVXYXJyaW9yKCdiYXJiYXJpYW4nLCA4MCwgMTYwLCA1KTtcbmNyZWF0ZVVuaXQoJ3Rlc3RVbml0JywgNiwgMjQwLCA0MjApO1xuXG5kcmF3R3JpZCgpO1xuY29uc29sZS5sb2coJ21hcCcsIG1hcCk7XG5jb25zb2xlLmxvZygnY3VycmVudGx5Q2hvc2VuV2FycmlvcicsIGN1cnJlbnRseUNob3NlbldhcnJpb3IpO1xuXG5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICBjb25zb2xlLmVycm9yKCdDbGljaycpO1xuICBsZXQgeCA9IGUub2Zmc2V0WDsgLy8gZ2V0IFhcbiAgbGV0IHkgPSBlLm9mZnNldFk7IC8vIGdldCBZXG4gIGNvbnNvbGUubG9nKCdQb3NpdGlvbiB4JywgZS5vZmZzZXRYKTsgLy8gZ2V0IFhcbiAgY29uc29sZS5sb2coJ1Bvc2l0aW9uIHknLCBlLm9mZnNldFkpOyAvLyBnZXQgWVxuICBvbkNob29zZVdhcnJpb3Iod2FycmlvcnMsIHgsIHkpO1xuICBvbkNob29zZVVuaXQodW5pdHMsIGN1cnJlbnRseUNob3NlbldhcnJpb3IpO1xuICBjb25zb2xlLmxvZygnY3VycmVudGx5Q2hvc2VuV2FycmlvcicsIGN1cnJlbnRseUNob3NlbldhcnJpb3IpO1xufSk7XG5cbi8vIHNldCBvbkNsaWNrTGlzdGVuZXIgZm9yIHJpZ2h0IG1vdXNlIGV2ZW50XG5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignY29udGV4dG1lbnUnLCAoZSkgPT4ge1xuICBjb25zb2xlLmVycm9yKCdSaWdodCBNb3VzZSBDbGljaycpO1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIGxldCB4ID0gZS5vZmZzZXRYOyAvLyBnZXQgWFxuICBsZXQgeSA9IGUub2Zmc2V0WTsgLy8gZ2V0IFlcbiAgbGV0IHN0YXJ0Tm9kZSA9IGdldE5vZGVGcm9tTWFwKGN1cnJlbnRseUNob3NlblVuaXQuY29tbWFuZGVyUG9zaXRpb25YLCBjdXJyZW50bHlDaG9zZW5Vbml0LmNvbW1hbmRlclBvc2l0aW9uWSwgbWFwKTtcbiAgbGV0IGZpbmlzaE5vZGUgPSBnZXROb2RlRnJvbU1hcCh4LCB5LCBtYXApO1xuICBjb25zb2xlLmVycm9yKCdzdGFydE5vZGUnLCBzdGFydE5vZGUpO1xuICBjb25zb2xlLmVycm9yKCdmaW5pc2hOb2RlJywgZmluaXNoTm9kZSk7XG4gIGFzc2lnbldhcnJpb3JNb3ZlVG9Qb3NpdGlvbihjdXJyZW50bHlDaG9zZW5XYXJyaW9yLCB4LCB5KTtcbiAgbW92ZVRvUG9zaXRpb24oY3VycmVudGx5Q2hvc2VuVW5pdCwgZmluaXNoTm9kZSk7XG4gIGNvbnNvbGUuZXJyb3IoJ0FuZ2xlJywgY2FsY0Rlc3RpbmF0aW9uQW5nbGVJbkRlZ3JlZXMoY3VycmVudGx5Q2hvc2VuVW5pdCwgeCwgeSkpO1xuICAvLyBsZXQgcGF0aDphbnkgPSBhU3RhcihzdGFydE5vZGUsIGZpbmlzaE5vZGUpO1xuICAvLyBpZihjdXJyZW50bHlDaG9zZW5Vbml0KSB7XG4gIC8vICBvbkNoYW5nZVdhcnJpb3JQb3NpdGlvbkluVW5pdChjdXJyZW50bHlDaG9zZW5Vbml0LHBhdGgsIDAsIHgsIHkpO1xuICAvLyB9XG5cbiAgLy9kcmF3UGF0aChwYXRoKTtcbn0pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2dhbWUudHMiLCJpbXBvcnQge1xuICBjYW52YXMsXG4gIGN0eCxcbiAgV0lEVEgsXG4gIEhFSUdIVCxcbiAgZ3JpZFNpemVcbn0gZnJvbSAnLi9tYXBDb25maWcnO1xuXG5leHBvcnQgY29uc3QgZHJhd0dyaWQgPSAoKSA9PiB7XG4gIGZvcihsZXQgeSA9IDA7IHkgPD0gSEVJR0hUOyB5Kz0gZ3JpZFNpemUpIHtcbiAgICBmb3IobGV0IHggPSAwOyB4IDw9IFdJRFRIOyB4Kz0gZ3JpZFNpemUpIHtcbiAgICAgIGN0eC5zdHJva2VSZWN0KHgsIHksIGdyaWRTaXplLCBncmlkU2l6ZSk7XG4gICAgfVxuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFwL2RyYXdHcmlkLnRzIiwiaW1wb3J0IHtncmlkU2l6ZX0gZnJvbSAnLi4vbWFwL21hcENvbmZpZyc7XG5cbmNsYXNzIFdhcnJpb3Ige1xuICBuYW1lOiBzdHJpbmc7XG4gIHg6IG51bWJlcjtcbiAgeTogbnVtYmVyO1xuICBjZW50ZXJYOiBudW1iZXI7XG4gIGNlbnRlclk6IG51bWJlcjtcbiAgcmFkaXVzOiBudW1iZXI7XG4gIG1vdmVUb05vZGVYOiBudW1iZXI7XG4gIG1vdmVUb05vZGVZOiBudW1iZXI7XG4gIGlzQ3VycmVudGx5Q2hvc2VuOiBib29sZWFuID0gZmFsc2U7XG4gIHBvc2l0aW9uSW5Vbml0OiBudW1iZXI7XG4gIHJvd0luVW5pdDogbnVtYmVyO1xuICBjb2xJblVuaXQ6IG51bWJlcjtcbiAgbW92ZVRvTm9kZTogYW55O1xuICBpc01vdmluZzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKG5hbWU6c3RyaW5nLCB4Om51bWJlciwgeTpudW1iZXIsIHJhZGl1czpudW1iZXIpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgICB0aGlzLnJhZGl1cyA9IHJhZGl1cztcbiAgICB0aGlzLmNlbnRlclggPSB4ICsgKGdyaWRTaXplIC8gMik7XG4gICAgdGhpcy5jZW50ZXJZID0geSArIChncmlkU2l6ZSAvIDIpO1xuICB9XG5cbiAgc2V0WCh4Om51bWJlcikge1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy5jZW50ZXJYID0geCArIChncmlkU2l6ZSAvIDIpO1xuICB9XG5cbiAgc2V0WSh5Om51bWJlcikge1xuICAgIHRoaXMueSA9IHk7XG4gICAgdGhpcy5jZW50ZXJZID0geSArIChncmlkU2l6ZSAvIDIpO1xuICB9XG5cbiAgYXNzaWduUG9zaXRpb24obmV3UG9zaXRpb246IG51bWJlcikge1xuICAgIHRoaXMucG9zaXRpb25JblVuaXQgPSBuZXdQb3NpdGlvbjtcbiAgfVxuXG4gIHNldElzTW92aW5nVG9UcnVlKCkge1xuICAgIHRoaXMuaXNNb3ZpbmcgPSB0cnVlO1xuICB9XG5cbiAgc2V0SXNNb3ZpbmdUb0ZhbHNlKCkge1xuICAgIHRoaXMuaXNNb3ZpbmcgPSBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBXYXJyaW9yO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3dhcnJpb3IvV2Fycmlvci50cyIsImltcG9ydCB7Y3JlYXRlV2Fycmlvcn0gZnJvbSAnLi4vd2Fycmlvci93YXJyaW9yQWN0aW9uJztcbmltcG9ydCB7Z3JpZFNpemV9IGZyb20gJy4uL21hcC9tYXBDb25maWcnO1xuaW1wb3J0IHt1cGRhdGVXYXJyaW9yfSBmcm9tICcuLi93YXJyaW9yL3dhcnJpb3JNb3ZlbWVudCc7XG5pbXBvcnQge21hcH0gZnJvbSAnLi4vbWFwL2NyZWF0ZU1hcCdcbmltcG9ydCBVbml0IGZyb20gJy4vVW5pdCc7XG5cbmltcG9ydCB7XG4gIHVuaXRzLFxuICBjdXJyZW50bHlDaG9zZW5Vbml0LFxuICBhc3NpZ25DdXJyZW50bHlDaG9zZW5Vbml0XG59IGZyb20gJy4uL3N0b3JlL3VuaXRTdG9yZSc7XG5cbmltcG9ydCB7XG4gIGFzc2lnbldhcnJpb3JNb3ZlVG9Qb3NpdGlvbixcbn0gZnJvbSAnLi4vd2Fycmlvci93YXJyaW9yQWN0aW9uJztcblxuaW1wb3J0IHtcbiAgZ2V0Tm9kZUZyb21NYXBcbn0gZnJvbSAnLi4vcGF0aC9kcmF3UGF0aCc7XG5cbmltcG9ydCB7YVN0YXJ9IGZyb20gJy4uL3BhdGgvQVN0YXInO1xuXG5leHBvcnQgY29uc3Qgb25DaGFuZ2VXYXJyaW9yUG9zaXRpb25JblVuaXQgPSAodW5pdDphbnksIHBhdGg6YW55W10sIGk6bnVtYmVyPTAsIGN1cnJlbnRNb3ZlVG9YOm51bWJlciwgY3VycmVudE1vdmVUb1k6bnVtYmVyKSA9PiB7XG4gIGxldCByb3cgPSB1bml0LnF1YW50aXR5IC8gMjtcbiAgbGV0IGNvbCA9IE1hdGguY2VpbCh1bml0LnF1YW50aXR5IC8gcm93KTtcbiAgZm9yKGxldCB3YXJyaW9yIG9mIHVuaXQud2FycmlvcnMpIHtcbiAgICBsZXQgc3RhcnROb2RlID0gZ2V0Tm9kZUZyb21NYXAoY3VycmVudGx5Q2hvc2VuVW5pdC5jb21tYW5kZXJQb3NpdGlvblgsIGN1cnJlbnRseUNob3NlblVuaXQuY29tbWFuZGVyUG9zaXRpb25ZLCBtYXApO1xuICAgIGxldCBmaW5pc2hOb2RlID0gZ2V0Tm9kZUZyb21NYXAoY3VycmVudE1vdmVUb1gsIGN1cnJlbnRNb3ZlVG9ZLCBtYXApO1xuICAgIGxldCBwYXRoOmFueSA9IGFTdGFyKHN0YXJ0Tm9kZSwgZmluaXNoTm9kZSwgbWFwKTtcbiAgICBhc3NpZ25XYXJyaW9yTW92ZVRvUG9zaXRpb24od2FycmlvciwgY3VycmVudE1vdmVUb1gsIGN1cnJlbnRNb3ZlVG9ZKTtcbiAgICB1cGRhdGVXYXJyaW9yKHdhcnJpb3IsIHBhdGgsIGksIGN1cnJlbnRNb3ZlVG9YLCBjdXJyZW50TW92ZVRvWSk7XG4gICAgY3VycmVudE1vdmVUb1ggKz0gZ3JpZFNpemU7XG4gICAgY29uc29sZS5sb2coJ2knLCBpKTtcbiAgICBjb25zb2xlLmxvZygnY3VycmVudE1vdmVUb1gnLCBjdXJyZW50TW92ZVRvWCk7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGFkZFdhcnJpb3JzVG9Vbml0ID0gKHVuaXQ6YW55KSA9PiB7XG4gIGxldCBzdGFydFggPSB1bml0LmNvbW1hbmRlclBvc2l0aW9uWDtcbiAgbGV0IHN0YXJ0WSA9IHVuaXQuY29tbWFuZGVyUG9zaXRpb25ZO1xuICBsZXQgaSA9IDE7XG4gIGxldCByb3cgPSB1bml0LnF1YW50aXR5IC8gMjtcbiAgbGV0IGNvbCA9IE1hdGguY2VpbCh1bml0LnF1YW50aXR5IC8gcm93KTtcbiAgbGV0IGZpbmlzaFggPSBzdGFydFggKyAoKHJvdyAtIDEpICogZ3JpZFNpemUpO1xuICBsZXQgZmluaXNoWSA9IHN0YXJ0WSArICgoY29sIC0gMSkgKiBncmlkU2l6ZSk7XG4gIGxldCByYWRpdXMgPSBncmlkU2l6ZSAvIDQ7XG4gIGxldCB1bml0Um93ID0gMTsgLy8gdG8gZ2l2ZSB3YXJyaW9yIHJvdyBhbmQgY29sdW1uIHBvc2l0aW9uIGluIHVuaXRcbiAgbGV0IHVuaXRDb2wgPSAxO1xuICB1bml0LnJvdyA9IHJvdzsgLy8gYWRkIHJvdyBpbnN0YW5jZSBmb3IgdW5pdFxuICB1bml0LmNvbCA9IGNvbDsgLy8gYWRkIGNvbCBpbnN0YW5jZSBmb3IgdW5pdFxuICBmb3IobGV0IHkgPSBzdGFydFg7IHkgPD0gZmluaXNoWTsgeSArPSBncmlkU2l6ZSkge1xuICAgIGlmKGkgPD0gdW5pdC5xdWFudGl0eSkge1xuICAgICAgZm9yKGxldCB4ID0gc3RhcnRYOyB4IDw9IGZpbmlzaFg7ICB4Kz0gZ3JpZFNpemUpIHtcbiAgICAgICAgbGV0IGN1cnJlbnRXYXJyaW9yID0gY3JlYXRlV2Fycmlvcih1bml0Lm5hbWUsIHgsIHksIHJhZGl1cyk7XG4gICAgICAgIGN1cnJlbnRXYXJyaW9yLmFzc2lnblBvc2l0aW9uKGkpO1xuICAgICAgICBjdXJyZW50V2Fycmlvci5yb3dJblVuaXQgPSB1bml0Um93O1xuICAgICAgICBjdXJyZW50V2Fycmlvci5jb2xJblVuaXQgPSB1bml0Q29sO1xuICAgICAgICB1bml0LmFkZFdhcnJpb3JUb1VuaXQoY3VycmVudFdhcnJpb3IpO1xuICAgICAgICBpKys7XG4gICAgICAgIHVuaXRDb2wrKztcbiAgICAgIH1cbiAgICB9XG4gICAgdW5pdFJvdysrO1xuICAgIHVuaXRDb2wgPSAxO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVVbml0ID0gKG5hbWU6c3RyaW5nLCBxdWFudGl0eTpudW1iZXIsIHBvc1g6bnVtYmVyLCBwb3NZOiBudW1iZXIpID0+IHtcbiAgbGV0IG5ld1VuaXQgPSBuZXcgVW5pdChuYW1lLCBxdWFudGl0eSwgcG9zWCwgcG9zWSk7XG4gIGxldCByYWRpdXMgPSBncmlkU2l6ZSAvIDQ7XG4gIGFkZFdhcnJpb3JzVG9Vbml0KG5ld1VuaXQpO1xuICB1bml0cy5wdXNoKG5ld1VuaXQpO1xufVxuXG4vLyB3YXJyaW9ycyBpbiB0aGUgdW5pdCBoYXZlIHNhbWUgbmFtZSBhcyB1bml0IHRoYXQgdGhleSBhc3NpZ25lZCB0b1xuLy8gaWYgd2FycmlvciB3aXRoIHNhbWUgbmFtZSBpcyBjaG9zZW4gdGhhdCBtZWFucyB0aGF0IHVuaXQgYWxzb1xuLy8gaGFzIGJlZW4gY2hvc2VuXG5leHBvcnQgY29uc3Qgb25DaG9vc2VVbml0ID0gKHVuaXRzOmFueSwgY3VycmVudGx5Q2hvc2VuV2FycmlvcjphbnkpID0+IHtcbiAgbGV0IGZvdW5kZWRVbml0ID0gbnVsbDtcbiAgaWYoY3VycmVudGx5Q2hvc2VuV2Fycmlvcikge1xuICAgIGZvcihsZXQgdW5pdCBvZiB1bml0cykge1xuICAgICAgaWYoY3VycmVudGx5Q2hvc2VuV2Fycmlvci5uYW1lID09PSB1bml0Lm5hbWUpIHtcbiAgICAgICAgZm91bmRlZFVuaXQgPSB1bml0O1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBhc3NpZ25DdXJyZW50bHlDaG9zZW5Vbml0KGZvdW5kZWRVbml0KTtcbiAgY29uc29sZS5sb2coJ2N1cnJlbnRseUNob3NlblVuaXQnLCBjdXJyZW50bHlDaG9zZW5Vbml0KTtcbn1cblxubGV0IGdldFVuaXRDb21tYW5kZXIgPSAodW5pdDphbnkpID0+IHtcbiAgZm9yKGxldCB3YXJyaW9yIG9mIHVuaXQud2FycmlvcnMpIHtcbiAgICBpZih3YXJyaW9yLnBvc2l0aW9uSW5Vbml0ID09PSAxKSB7XG4gICAgICByZXR1cm4gd2FycmlvcjtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHVwZGF0ZVVuaXQgPSAodW5pdDphbnksIHBhdGg6YW55W10sIGk6bnVtYmVyPTAsIGN1cnJlbnRNb3ZlVG9YOm51bWJlciwgY3VycmVudE1vdmVUb1k6bnVtYmVyKSA9PiB7XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91bml0L3VuaXRBY3Rpb25zLnRzIiwiXG5cbmNsYXNzIFVuaXQge1xuICBuYW1lOiBzdHJpbmc7XG4gIHF1YW50aXR5OiBudW1iZXI7XG4gIGNvbW1hbmRlclBvc2l0aW9uWDogbnVtYmVyO1xuICBjb21tYW5kZXJQb3NpdGlvblk6IG51bWJlcjtcbiAgd2FycmlvcnM6IGFueVtdID0gW107XG4gIGNvbDogbnVtYmVyO1xuICByb3c6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcihuYW1lOnN0cmluZywgcXVhbnRpdHk6bnVtYmVyLCBwb3NYOm51bWJlciwgcG9zWTpudW1iZXIpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMucXVhbnRpdHkgPSBxdWFudGl0eTtcbiAgICB0aGlzLmNvbW1hbmRlclBvc2l0aW9uWCA9IHBvc1g7XG4gICAgdGhpcy5jb21tYW5kZXJQb3NpdGlvblkgPSBwb3NYO1xuICB9XG4gIGFkZFdhcnJpb3JUb1VuaXQod2FycmlvcjphbnkpIHtcbiAgICB0aGlzLndhcnJpb3JzLnB1c2god2Fycmlvcik7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVW5pdDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91bml0L1VuaXQudHMiLCJleHBvcnQgY29uc3QgZ2V0TWluRlNjb3JlID0gKG9wZW46YW55W10pID0+IHtcbiAgbGV0IG1pbiA9IDA7XG4gIGZvcihsZXQgaSA9IDE7IGkgPCBvcGVuLmxlbmd0aCAtIDE7ICsraSkge1xuICAgIGlmKG9wZW5bbWluXS5mU2NvcmUgPiBvcGVuW2ldLmZTY29yZSkge1xuICAgICAgbWluID0gaTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG9wZW5bbWluXTtcbn1cblxuZXhwb3J0IGNvbnN0IHVuY2xvc2VkTmVpZ2JvdXJzID0gKGN1cnJlbnQ6YW55LCBjbG9zZWQ6YW55KSA9PiB7XG4gIGxldCBuZWlnaGJvdXJzTm90SW5DbG9zZWQgPSBbXTtcbiAgZm9yKGxldCBuZWlnaGJvdXIgb2YgY3VycmVudC5uZWlnaGJvdXJzKSB7XG4gICAgbGV0IGlzSW5DbG9zZWQ6Ym9vbGVhbiA9IGZhbHNlO1xuICAgIGZvcihsZXQgbm9kZSBvZiBjbG9zZWQpIHtcbiAgICAgIGlmKG5laWdoYm91ci54ID09PSBub2RlLnggJiYgbmVpZ2hib3VyLnkgPT09IG5vZGUueSkge1xuICAgICAgICBpc0luQ2xvc2VkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYoIWlzSW5DbG9zZWQpIHtcbiAgICAgIG5laWdoYm91cnNOb3RJbkNsb3NlZC5wdXNoKG5laWdoYm91cik7XG4gICAgfVxuICB9XG4gIHJldHVybiBuZWlnaGJvdXJzTm90SW5DbG9zZWQ7XG59XG5cbmV4cG9ydCBjb25zdCBpc09iamVjdEluTWFwS2V5cyA9IChvYmplY3Q6YW55LCBtYXA6YW55KSA9PiB7XG4gIGxldCBhcnI6YW55W10gPSBBcnJheS5mcm9tKG1hcCk7XG4gIGxldCByZXN1bHQ6Ym9vbGVhbiA9IGZhbHNlO1xuICBmb3IobGV0IGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgKytpKSB7XG4gICAgLy9jb25zb2xlLmxvZygnb2JqZWN0Jywgb2JqZWN0KTtcbiAgICBpZihhcnJbaV1bMF0ueCA9PT0gb2JqZWN0LnggJiYgYXJyW2ldWzBdLnkgPT09IG9iamVjdC55KSB7XG4gICAgICByZXN1bHQgPSB0cnVlO1xuICAgIH1cbiAgfVxuICBjb25zb2xlLmxvZygncmVzdWx0JywgcmVzdWx0KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9wYXRoL2FTdGFyVXRpbHMudHMiLCJpbXBvcnQge1xuICBnZXRDZW50cmFsV2FycmlvckluVW5pdCxcbiAgZ2V0Q2xvc2VzdFdhcnJpb3JUb0Rlc3RpbmF0aW9uSW5BcnJheVxufSBmcm9tICcuL3VuaXRVdGlscyc7XG5pbXBvcnQge2dyaWRTaXplfSBmcm9tICcuLi9tYXAvbWFwQ29uZmlnJztcbmltcG9ydCB7bWFwfSBmcm9tICcuLi9tYXAvY3JlYXRlTWFwJztcbmltcG9ydCB7Z2V0Tm9kZUZyb21NYXB9IGZyb20gJy4uL3BhdGgvZHJhd1BhdGgnO1xuaW1wb3J0IHtcbiAgZ2V0Tm9kZUZyb21BcnJheSxcbiAgZGVsZXRlT2JqZWN0RnJvbUFycmF5XG59IGZyb20gJy4uL3V0aWxzL29ialV0aWxzJztcbmltcG9ydCB7dXBkYXRlV2Fycmlvcn0gZnJvbSAnLi4vd2Fycmlvci93YXJyaW9yTW92ZW1lbnQnO1xuaW1wb3J0IHthU3Rhcn0gZnJvbSAnLi4vcGF0aC9BU3Rhcic7XG5cbmV4cG9ydCBjb25zdCBtb3ZlVG9Qb3NpdGlvbiA9ICh1bml0OmFueSwgbmV4dE5vZGU6YW55KSA9PiB7XG4gIC8vIGFzc2lnbiBtb3ZlVG9Qb3NpdGlvbnMgdG8gd2FycmlvcnNcbiAgbGV0IG1vdmluZ1dhcnJpb3JzID0gT2JqZWN0LmFzc2lnbihbXSwgdW5pdC53YXJyaW9ycyk7XG4gIGxldCBjZW50cmFsV2FycmlvciA9IGdldENlbnRyYWxXYXJyaW9ySW5Vbml0KHVuaXQpO1xuICBsZXQgdXBkYXRlZFdhcnJpb3JzID0gZGVsZXRlT2JqZWN0RnJvbUFycmF5KGNlbnRyYWxXYXJyaW9yLCB1bml0LndhcnJpb3JzKTtcbiAgLy9jb25zb2xlLmxvZygndXBkYXRlZFdhcnJpb3JzJywgdXBkYXRlZFdhcnJpb3JzKTtcbiAgY2VudHJhbFdhcnJpb3IubW92ZVRvTm9kZSA9IG5leHROb2RlO1xuICAvLyBhc3NpZ24gY2VudHJhbFVuaXQgZ2UgdG8gbmV4dCBuZXh0Tm9kZVxuICAvLyBhc3NpZ24gb3RoZXIgd2FycmlvcnMgbmV4dCBwb3NpdGlvbnNcbiAgZm9yKGxldCB3YXJyaW9yIG9mIHVwZGF0ZWRXYXJyaW9ycykge1xuICAgIGxldCB7ZGlmZmVyZW5jZUluWCxkaWZmZXJlbmNlSW5ZfSA9IGNoZWNrV2FycmlvcnNQb3NpdGlvbnMoY2VudHJhbFdhcnJpb3IsIHdhcnJpb3IpO1xuICAgIGxldCB4Om51bWJlciA9IG5leHROb2RlLnggKyAoZGlmZmVyZW5jZUluWCAqIGdyaWRTaXplKTtcbiAgICBsZXQgeTpudW1iZXIgPSBuZXh0Tm9kZS55ICsgKGRpZmZlcmVuY2VJblkgKiBncmlkU2l6ZSk7XG4gICAgY29uc29sZS5lcnJvcigneDonLCB4LCAneTonLCB5KTtcbiAgICBsZXQgbW92ZVRvTm9kZSA9IGdldE5vZGVGcm9tTWFwKHgsIHksIG1hcCk7XG4gICAgY29uc29sZS5lcnJvcignbW92ZVRvTm9kZScsIG1vdmVUb05vZGUpO1xuICAgIHdhcnJpb3IubW92ZVRvTm9kZSA9IG1vdmVUb05vZGU7XG4gIH1cbiAgLy8gY29tbWFuZCB1bml0IHRvIG1vdmVcbiAgLy8gd2hpbGUobW92aW5nV2FycmlvcnMubGVuZ3RoID4gMCkge1xuICAvLyAgIGNvbnNvbGUuZXJyb3IoJ21vdmluZ1dhcnJpb3JzOicsIG1vdmluZ1dhcnJpb3JzKTtcbiAgLy8gICBsZXQgY2xvc2VzdCA9IGdldENsb3Nlc3RXYXJyaW9yVG9EZXN0aW5hdGlvbkluQXJyYXkobW92aW5nV2FycmlvcnMsIG5leHROb2RlLngsIG5leHROb2RlLnkpO1xuICAvLyAgIGxldCBzdGFydE5vZGUgPSBnZXROb2RlRnJvbU1hcChjbG9zZXN0LngsIGNsb3Nlc3QueSk7XG4gIC8vICAgbGV0IHBhdGg6YW55ID0gYVN0YXIoc3RhcnROb2RlLCBjbG9zZXN0Lm1vdmVUb05vZGUpO1xuICAvLyAgIHVwZGF0ZVdhcnJpb3IoY2xvc2VzdCwgcGF0aCwgMCwgY2xvc2VzdC5tb3ZlVG9Ob2RlLngsIGNsb3Nlc3QubW92ZVRvTm9kZS55KTtcbiAgLy8gICBtb3ZpbmdXYXJyaW9ycyA9IGRlbGV0ZU9iamVjdEZyb21BcnJheShjbG9zZXN0LCBtb3ZpbmdXYXJyaW9ycyk7XG4gIC8vIH1cbiAgdW5pdE1vdmVtZW50KG1vdmluZ1dhcnJpb3JzLCBuZXh0Tm9kZSk7XG59XG5cbmV4cG9ydCBjb25zdCBjaGVja1dhcnJpb3JzUG9zaXRpb25zID0gKGNlbnRyYWxXYXJyaW9yOmFueSwgY3VycmVudFdhcnJpb3I6YW55KSA9PiB7XG4gIGxldCBjZW50cmFsQ29sID0gY2VudHJhbFdhcnJpb3IuY29sSW5Vbml0O1xuICBsZXQgY2VudHJhbFJvdyA9IGNlbnRyYWxXYXJyaW9yLnJvd0luVW5pdDtcbiAgbGV0IGN1cnJlbnRSb3cgPSBjdXJyZW50V2Fycmlvci5yb3dJblVuaXQ7XG4gIGxldCBjdXJyZW50Q29sID0gY3VycmVudFdhcnJpb3IuY29sSW5Vbml0O1xuICBsZXQgZGlmZmVyZW5jZUluWCA9IGN1cnJlbnRDb2wgLSBjZW50cmFsQ29sO1xuICBsZXQgZGlmZmVyZW5jZUluWSA9IGN1cnJlbnRSb3cgLSBjZW50cmFsUm93O1xuICByZXR1cm4ge1xuICAgIGRpZmZlcmVuY2VJblgsXG4gICAgZGlmZmVyZW5jZUluWVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCB1bml0TW92ZW1lbnQgPSAobW92aW5nV2FycmlvcnM6YW55W10sIG5leHROb2RlOmFueSkgPT4ge1xuICBpZihtb3ZpbmdXYXJyaW9ycy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgbGV0IGNsb3Nlc3QgPSBnZXRDbG9zZXN0V2FycmlvclRvRGVzdGluYXRpb25JbkFycmF5KG1vdmluZ1dhcnJpb3JzLCBuZXh0Tm9kZS54LCBuZXh0Tm9kZS55KTtcbiAgbGV0IHN0YXJ0Tm9kZSA9IGdldE5vZGVGcm9tTWFwKGNsb3Nlc3QueCwgY2xvc2VzdC55LCBtYXApO1xuICBsZXQgcGF0aDphbnkgPSBhU3RhcihzdGFydE5vZGUsIGNsb3Nlc3QubW92ZVRvTm9kZSwgbWFwKTtcbiAgdXBkYXRlV2FycmlvcihjbG9zZXN0LCBwYXRoLCAwLCBjbG9zZXN0Lm1vdmVUb05vZGUueCwgY2xvc2VzdC5tb3ZlVG9Ob2RlLnkpO1xuICBtb3ZpbmdXYXJyaW9ycyA9IGRlbGV0ZU9iamVjdEZyb21BcnJheShjbG9zZXN0LCBtb3ZpbmdXYXJyaW9ycyk7XG4gIHVuaXRNb3ZlbWVudChtb3ZpbmdXYXJyaW9ycywgbmV4dE5vZGUpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3VuaXQvdW5pdE1vdmVtZW50LnRzIl0sInNvdXJjZVJvb3QiOiIifQ==