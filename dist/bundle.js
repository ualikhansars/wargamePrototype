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
var objUtils_1 = __webpack_require__(2);
exports.createNodes = function () {
    var map = [];
    var value = 1;
    var id = 0;
    for (var y = 0; y < mapConfig_1.HEIGHT; y += mapConfig_1.gridSize) {
        for (var x = 0; x < mapConfig_1.WIDTH; x += mapConfig_1.gridSize) {
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
        if (neighbour.x >= 0 && neighbour.x <= mapConfig_1.WIDTH && neighbour.y >= 0 && neighbour.y <= mapConfig_1.HEIGHT) {
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
    var updatedMap = Object.assign([], map);
    for (var _i = 0, updatedMap_1 = updatedMap; _i < updatedMap_1.length; _i++) {
        var node = updatedMap_1[_i];
        var n = exports.neighbours(node, map);
        node.neighbours = n;
    }
    return updatedMap;
};
exports.createWarriorObstacle = function (positionX, positionY, map) {
    var node = {
        x: positionX,
        y: positionY
    };
    return objUtils_1.deleteObjectFromArray(node, map);
};
exports.createOneObstacle = function (positionX, positionY, type, map) {
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
    return objUtils_1.deleteObjectFromArray(node, map);
};
exports.createObstacles = function (startX, finishX, startY, finishY, type, map) {
    if (type === void 0) { type = 'forest'; }
    var newMap = Object.assign([], map);
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
exports.map = exports.createObstacles(120, 160, 120, 160, 'river', exports.map);
exports.map = exports.createObstacles(660, 820, 180, 200, 'river', exports.map);
exports.map = exports.createObstacles(900, 1180, 180, 200, 'river', exports.map);
exports.map = exports.createOneObstacle(300, 340, 'mountain', exports.map);
exports.map = exports.createObstacles(280, 320, 360, 380, 'mountain', exports.map);
exports.map = exports.createObstacles(740, 760, 420, 500, 'forest', exports.map);
exports.map = exports.createObstacles(960, 1000, 440, 460, 'forest', exports.map);
exports.map = exports.createObstacles(980, 1000, 440, 520, 'forest', exports.map);
exports.map = exports.addNeighbours(exports.map);


/***/ }),
/* 2 */
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
/* 3 */
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
/* 4 */
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
var createMap_1 = __webpack_require__(1);
var objUtils_1 = __webpack_require__(2);
var aStarUtils_1 = __webpack_require__(14);
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
    while (open) {
        var current = aStarUtils_1.getMinFScore(open);
        // console.log('current', current);
        // console.log('finishNode:', finishNode);
        if (current.x === finishNode.x && current.y === finishNode.y) {
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var warriorAction_1 = __webpack_require__(4);
var warriorStore_1 = __webpack_require__(5);
var createMap_1 = __webpack_require__(1);
var drawPath_1 = __webpack_require__(3);
var mapConfig_1 = __webpack_require__(0);
var AStar_1 = __webpack_require__(6);
var objUtils_1 = __webpack_require__(2);
exports.updateWarrior = function (warrior, path, i, currentMoveToX, currentMoveToY) {
    if (i === void 0) { i = 0; }
    //console.log('updateWarrior');
    warrior.setIsMovingToTrue();
    var updatedPath = Object.assign([], path);
    var node = updatedPath[i]; // get next node
    if (currentMoveToX !== warrior.moveToNode.x || currentMoveToY !== warrior.moveToNode.y) {
        console.log('new destination has been chosen');
        warrior.moveToNode.x = node.x;
        warrior.moveToNode.y = node.y;
        warrior.setIsMovingToFalse();
        return;
    }
    // ally warrior is on the destination position
    // currentWarrior should stop moving
    if (exports.checkOtherWarriorsPosition(warriorStore_1.warriors, warrior, node.x, node.y) && i === updatedPath.length - 1) {
        warrior.moveToNode.x = node.x; // set moveToNode value to current warrior position
        warrior.moveToNode.y = node.y;
        warrior.setIsMovingToFalse();
        console.error('ally unit in dest position');
        return;
    }
    if (exports.checkOtherWarriorsPosition(warriorStore_1.warriors, warrior, node.x, node.y)) {
        if (exports.isAllyUnitIsOnPosition(warriorStore_1.warriors, warrior, node.x, node.y)) {
            // warrior in the same unit blocks the next position and it finished movement
            console.log("ally's warrior is on position");
            warrior.setIsMovingToFalse();
            warrior.moveToNode.x = node.x; // set moveToNode value to current warrior position
            warrior.moveToNode.y = node.y;
            return;
        }
        // unit has another allies' unit on its way
        console.error('updateUnit: another unit is on the way x:', node.x, 'y:', node.y);
        var updatedMap = Object.assign([], createMap_1.map);
        console.error('createWarriorObstacle x:', node.x, 'y:', node.y);
        updatedMap = createMap_1.createWarriorObstacle(node.x, node.y, updatedMap);
        updatedMap = createMap_1.addNeighbours(updatedMap);
        console.log('deleted Node', node);
        console.log('updatedMap', updatedMap);
        console.log('node', node);
        var startNode = drawPath_1.getNodeFromMap(warrior.x, warrior.y, updatedMap);
        var finishNode = drawPath_1.getNodeFromMap(currentMoveToX, currentMoveToY, updatedMap);
        console.error('node{x: 960, y: 480} in map:', objUtils_1.isObjectInArray({ x: 960, y: 480 }, createMap_1.map));
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
    else {
        warrior.moveToNode.x = warrior.x; // set moveToNode value to current warrior position
        warrior.moveToNode.y = warrior.y;
        warrior.setIsMovingToFalse();
        return;
    }
};
// check if nextNode is occupied by other warrior
exports.checkOtherWarriorsPosition = function (warriors, currentWarrior, x, y) {
    var updatedWarriors = objUtils_1.deleteObjectFromArray(currentWarrior, warriors);
    for (var _i = 0, updatedWarriors_1 = updatedWarriors; _i < updatedWarriors_1.length; _i++) {
        var warrior = updatedWarriors_1[_i];
        if (warrior.x === x && warrior.y === y) {
            return true;
        }
    }
    return false;
};
// check if nextNode is occupied by ally's warrior
// that is not moving
exports.isAllyUnitIsOnPosition = function (warriors, currentWarrior, x, y) {
    var updatedWarriors = objUtils_1.deleteObjectFromArray(currentWarrior, warriors);
    for (var _i = 0, updatedWarriors_2 = updatedWarriors; _i < updatedWarriors_2.length; _i++) {
        var warrior = updatedWarriors_2[_i];
        if (warrior.x === x && warrior.y === y) {
            if (warrior.name === currentWarrior.name && warrior.isMoving === false) {
                return true;
            }
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
/* 8 */
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
var createMap_1 = __webpack_require__(1);
var drawPath_1 = __webpack_require__(3);
var warriorStore_1 = __webpack_require__(5);
var warriorAction_1 = __webpack_require__(4);
var unitActions_1 = __webpack_require__(13);
var unitStore_1 = __webpack_require__(8);
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
    for (var _i = 0, map_1 = createMap_1.map; _i < map_1.length; _i++) {
        var grid = map_1[_i];
        var bottomRightX = grid.x + mapConfig_1.gridSize;
        var bottomRightY = grid.y + mapConfig_1.gridSize;
        if (x >= grid.x && x < bottomRightX && y >= grid.y && y < bottomRightY) {
            console.log('node', grid, ' was chosen');
        }
    }
});
// set onClickListener for right mouse event
mapConfig_1.canvas.addEventListener('contextmenu', function (e) {
    console.error('Right Mouse Click');
    e.preventDefault();
    var x = e.offsetX; // get X
    var y = e.offsetY; // get Y
    var updatedMap = Object.assign([], createMap_1.map);
    var startNode = drawPath_1.getNodeFromMap(unitStore_1.currentlyChosenUnit.commanderPositionX, unitStore_1.currentlyChosenUnit.commanderPositionY, updatedMap);
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
var warriorAction_1 = __webpack_require__(4);
var mapConfig_1 = __webpack_require__(0);
var warriorMovement_1 = __webpack_require__(7);
var createMap_1 = __webpack_require__(1);
var Unit_1 = __webpack_require__(15);
var unitStore_1 = __webpack_require__(8);
var warriorAction_2 = __webpack_require__(4);
var drawPath_1 = __webpack_require__(3);
var AStar_1 = __webpack_require__(6);
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


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.getMinFScore = function (open) {
    var min = 0;
    if (open.length === 1) {
        return open[min];
    }
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
/* 15 */
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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var unitUtils_1 = __webpack_require__(9);
var mapConfig_1 = __webpack_require__(0);
var createMap_1 = __webpack_require__(1);
var drawPath_1 = __webpack_require__(3);
var objUtils_1 = __webpack_require__(2);
var warriorMovement_1 = __webpack_require__(7);
var AStar_1 = __webpack_require__(6);
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
        var moveToNode = void 0;
        if (objUtils_1.isObjectInArray({ x: x, y: y }, createMap_1.map)) {
            moveToNode = drawPath_1.getNodeFromMap(x, y, createMap_1.map);
        }
        else {
            moveToNode = nextNode;
        }
        console.error('moveToNode', moveToNode);
        warrior.moveToNode = moveToNode;
    }
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
    // get closest warrior to destination
    var closest = unitUtils_1.getClosestWarriorToDestinationInArray(movingWarriors, nextNode.x, nextNode.y);
    console.error('unitMovement closest:', closest);
    var startNode = drawPath_1.getNodeFromMap(closest.x, closest.y, createMap_1.map); // startNode of the closest warrior
    console.log('x:', closest.x, 'y:', closest.y);
    console.error('unitMovement startNode:', startNode);
    console.error('finishNode', closest.moveToNode);
    console.log('map', createMap_1.map);
    var path = AStar_1.aStar(startNode, closest.moveToNode, createMap_1.map);
    warriorMovement_1.updateWarrior(closest, path, 0, closest.moveToNode.x, closest.moveToNode.y);
    movingWarriors = objUtils_1.deleteObjectFromArray(closest, movingWarriors);
    exports.unitMovement(movingWarriors, nextNode);
};


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOTZjZGUwYWRiOGMwYzI5ZTAxNmIiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hcC9tYXBDb25maWcudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hcC9jcmVhdGVNYXAudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL29ialV0aWxzLnRzIiwid2VicGFjazovLy8uL3NyYy9wYXRoL2RyYXdQYXRoLnRzIiwid2VicGFjazovLy8uL3NyYy93YXJyaW9yL3dhcnJpb3JBY3Rpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0b3JlL3dhcnJpb3JTdG9yZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcGF0aC9BU3Rhci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd2Fycmlvci93YXJyaW9yTW92ZW1lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0b3JlL3VuaXRTdG9yZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdW5pdC91bml0VXRpbHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hcC9kcmF3R3JpZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd2Fycmlvci9XYXJyaW9yLnRzIiwid2VicGFjazovLy8uL3NyYy91bml0L3VuaXRBY3Rpb25zLnRzIiwid2VicGFjazovLy8uL3NyYy9wYXRoL2FTdGFyVXRpbHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VuaXQvVW5pdC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdW5pdC91bml0TW92ZW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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LEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVGLE9BQU8sQ0FBQyxLQUFLLENBQUMsdUJBQXVCLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDaEQsSUFBSSxTQUFTLEdBQUcseUJBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDLEVBQUUsZUFBRyxDQUFDLENBQUMsQ0FBQyxtQ0FBbUM7SUFDOUYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlDLE9BQU8sQ0FBQyxLQUFLLENBQUMseUJBQXlCLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDcEQsT0FBTyxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2hELE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLGVBQUcsQ0FBQyxDQUFDO0lBQ3hCLElBQUksSUFBSSxHQUFPLGFBQUssQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLFVBQVUsRUFBRSxlQUFHLENBQUMsQ0FBQztJQUN6RCwrQkFBYSxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUUsY0FBYyxHQUFHLGdDQUFxQixDQUFDLE9BQU8sRUFBRSxjQUFjLENBQUMsQ0FBQztJQUNoRSxvQkFBWSxDQUFDLGNBQWMsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUN6QyxDQUFDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDEwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA5NmNkZTBhZGI4YzBjMjllMDE2YiIsIi8vIGdsb2JhbCB2YXJpYWJsZXNcbmV4cG9ydCBjb25zdCBXSURUSDogbnVtYmVyID0gMTIwMDtcbmV4cG9ydCBjb25zdCBIRUlHSFQ6IG51bWJlciA9IDYwMDtcbmV4cG9ydCBjb25zdCBncmlkU2l6ZTpudW1iZXIgPSAyMDtcblxuLy8gY3JlYXRlIENhbnZhc1xuZXhwb3J0IGxldCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbmNhbnZhcy5pZCA9IFwiY2FudmFzXCI7XG5jYW52YXMud2lkdGggPSBXSURUSDtcbmNhbnZhcy5oZWlnaHQgPSBIRUlHSFQ7XG5jYW52YXMuc3R5bGUuYm9yZGVyID0gXCIxcHggc29saWRcIjtcblxuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjYW52YXMpO1xuXG4vLyBkZWZpbmUgMmQgY29udGV4dFxuZXhwb3J0IGxldCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21hcC9tYXBDb25maWcudHMiLCJpbXBvcnQge1xuICBjYW52YXMsXG4gIGN0eCxcbiAgV0lEVEgsXG4gIEhFSUdIVCxcbiAgZ3JpZFNpemVcbn0gZnJvbSAnLi4vbWFwL21hcENvbmZpZyc7XG5cbmltcG9ydCB7XG4gIGRlbGV0ZU9iamVjdEZyb21BcnJheSxcbn0gZnJvbSAnLi4vdXRpbHMvb2JqVXRpbHMnO1xuXG5leHBvcnQgY29uc3QgY3JlYXRlTm9kZXMgPSAoKSA9PiB7XG4gIGxldCBtYXA6YW55W10gPSBbXTtcbiAgbGV0IHZhbHVlID0gMTtcbiAgbGV0IGlkID0gMDtcbiAgZm9yKGxldCB5ID0gMDsgeSA8IEhFSUdIVDsgeSs9IGdyaWRTaXplKSB7XG4gICAgZm9yKGxldCB4ID0gMDsgeCA8IFdJRFRIOyB4Kz0gZ3JpZFNpemUpIHtcbiAgICAgIG1hcC5wdXNoKHtcbiAgICAgICAgaWQ6IGlkLFxuICAgICAgICB4OiB4LFxuICAgICAgICB5OiB5LFxuICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgIG5laWdoYm91cnM6IFtdXG4gICAgICB9KTtcbiAgICAgIGlkKys7XG4gICAgfVxuICB9XG4gIHJldHVybiBtYXA7XG59XG5cbmV4cG9ydCBjb25zdCBuZWlnaGJvdXJzID0gKG5vZGU6YW55LCBtYXA6YW55W10pID0+IHtcbiAgbGV0IGRpcnMgPSBbXG4gICAge3g6IC1ncmlkU2l6ZSwgeTogLWdyaWRTaXplLCBkaXN0YW5jZTogMTR9LFxuICAgIHt4OiAwLCB5OiAtZ3JpZFNpemUsIGRpc3RhbmNlOiAxMH0sXG4gICAge3g6IGdyaWRTaXplLCB5OiAtZ3JpZFNpemUsIGRpc3RhbmNlOiAxNH0sXG4gICAge3g6IC1ncmlkU2l6ZSwgeTogMCwgZGlzdGFuY2U6IDEwfSxcbiAgICB7eDogZ3JpZFNpemUsIHk6IDAsIGRpc3RhbmNlOiAxMH0sXG4gICAge3g6IC1ncmlkU2l6ZSwgeTogZ3JpZFNpemUsIGRpc3RhbmNlOiAxNH0sXG4gICAge3g6IDAsIHk6IGdyaWRTaXplLCBkaXN0YW5jZTogMTB9LFxuICAgIHt4OiBncmlkU2l6ZSwgeTogZ3JpZFNpemUsIGRpc3RhbmNlOiAxNH1cbiAgXTtcbiAgbGV0IHJlc3VsdCA9IFtdO1xuICBmb3IobGV0IGRpciBvZiBkaXJzKSB7XG4gICAgbGV0IG5laWdoYm91ciA9IHtcbiAgICAgIHg6IG5vZGUueCArIGRpci54LFxuICAgICAgeTogbm9kZS55ICsgZGlyLnksXG4gICAgICBkaXN0YW5jZTogZGlyLmRpc3RhbmNlXG4gICAgfVxuICAgIGlmKG5laWdoYm91ci54ID49IDAgJiYgbmVpZ2hib3VyLnggPD0gV0lEVEggJiYgbmVpZ2hib3VyLnkgPj0gMCAmJiBuZWlnaGJvdXIueSA8PSBIRUlHSFQpIHtcbiAgICAgICAgbGV0IGZpbmRlZDpib29sZWFuID0gZmFsc2U7XG4gICAgICAgIGZvcihsZXQgbm9kZSBvZiBtYXApIHtcbiAgICAgICAgICBpZihuZWlnaGJvdXIueCA9PT0gbm9kZS54ICYmIG5laWdoYm91ci55ID09PSBub2RlLnkpIHtcbiAgICAgICAgICAgIGZpbmRlZCA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmKGZpbmRlZCkge1xuICAgICAgICAgIHJlc3VsdC5wdXNoKHtcbiAgICAgICAgICAgIHg6IG5laWdoYm91ci54LFxuICAgICAgICAgICAgeTogbmVpZ2hib3VyLnksXG4gICAgICAgICAgICBkaXN0YW5jZTogbmVpZ2hib3VyLmRpc3RhbmNlLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBjb25zdCBhZGROZWlnaGJvdXJzID0gKG1hcDphbnlbXSkgPT4ge1xuICBsZXQgdXBkYXRlZE1hcCA9IE9iamVjdC5hc3NpZ24oW10sIG1hcCk7XG4gIGZvcihsZXQgbm9kZSBvZiB1cGRhdGVkTWFwKSB7XG4gICAgbGV0IG4gPSBuZWlnaGJvdXJzKG5vZGUsIG1hcCk7XG4gICAgbm9kZS5uZWlnaGJvdXJzID0gbjtcbiAgfVxuICByZXR1cm4gdXBkYXRlZE1hcDtcbn1cblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVdhcnJpb3JPYnN0YWNsZSA9IChwb3NpdGlvblg6bnVtYmVyLCBwb3NpdGlvblk6bnVtYmVyLCBtYXA6YW55W10pID0+IHtcbiAgbGV0IG5vZGUgPSB7XG4gICAgeDogcG9zaXRpb25YLFxuICAgIHk6IHBvc2l0aW9uWVxuICB9O1xuICByZXR1cm4gZGVsZXRlT2JqZWN0RnJvbUFycmF5KG5vZGUsIG1hcCk7XG59XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVPbmVPYnN0YWNsZSA9IChwb3NpdGlvblg6bnVtYmVyLCBwb3NpdGlvblk6bnVtYmVyLCB0eXBlOnN0cmluZz0nZm9yZXN0JywgbWFwOmFueVtdKSA9PiB7XG4gIGxldCBub2RlID0ge1xuICAgIHg6IHBvc2l0aW9uWCxcbiAgICB5OiBwb3NpdGlvbllcbiAgfTtcbiAgaWYodHlwZSA9PT0gJ2ZvcmVzdCcpIGN0eC5maWxsU3R5bGUgPSAnZ3JlZW4nO1xuICBlbHNlIGlmKHR5cGUgPT09ICdtb3VudGFpbicpIGN0eC5maWxsU3R5bGUgPSAnIzhCNDUxMyc7XG4gIGVsc2UgaWYodHlwZSA9PT0gJ3JpdmVyJykgY3R4LmZpbGxTdHlsZSA9ICdibHVlJztcbiAgY3R4LmZpbGxSZWN0KHBvc2l0aW9uWCwgcG9zaXRpb25ZLCBncmlkU2l6ZSwgZ3JpZFNpemUpO1xuICByZXR1cm4gZGVsZXRlT2JqZWN0RnJvbUFycmF5KG5vZGUsIG1hcClcbn1cblxuZXhwb3J0IGNvbnN0IGNyZWF0ZU9ic3RhY2xlcyA9IChzdGFydFg6bnVtYmVyLCBmaW5pc2hYOm51bWJlciwgc3RhcnRZOm51bWJlciwgZmluaXNoWTpudW1iZXIsIHR5cGU6c3RyaW5nPSdmb3Jlc3QnLCBtYXA6YW55W10pID0+IHtcbiAgbGV0IG5ld01hcDphbnlbXSA9IE9iamVjdC5hc3NpZ24oW10sIG1hcCk7XG4gIGZvcihsZXQgeCA9IHN0YXJ0WDsgeCA8PSBmaW5pc2hYOyB4ICs9IGdyaWRTaXplKSB7XG4gICAgZm9yKGxldCB5ID0gc3RhcnRZOyB5IDw9IGZpbmlzaFk7IHkgKz0gZ3JpZFNpemUpIHtcbiAgICAgIGxldCBub2RlID0ge1xuICAgICAgICB4LFxuICAgICAgICB5XG4gICAgICB9XG4gICAgICBuZXdNYXAgPSBkZWxldGVPYmplY3RGcm9tQXJyYXkobm9kZSwgbmV3TWFwKTtcbiAgICAgIGlmKHR5cGUgPT09ICdmb3Jlc3QnKSBjdHguZmlsbFN0eWxlID0gJ2dyZWVuJztcbiAgICAgIGVsc2UgaWYodHlwZSA9PT0gJ21vdW50YWluJykgY3R4LmZpbGxTdHlsZSA9ICcjOEI0NTEzJztcbiAgICAgIGVsc2UgaWYodHlwZSA9PT0gJ3JpdmVyJykgY3R4LmZpbGxTdHlsZSA9ICdibHVlJztcbiAgICAgIGxldCB4TGVuZ3RoID0gTWF0aC5hYnMoc3RhcnRYIC0gZmluaXNoWCk7XG4gICAgICBsZXQgeUxlbmd0aCA9IE1hdGguYWJzKHN0YXJ0WSAtIGZpbmlzaFkpO1xuICAgICAgY3R4LmZpbGxSZWN0KHgsIHksIGdyaWRTaXplLCBncmlkU2l6ZSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBuZXdNYXA7XG59XG5cbmV4cG9ydCBsZXQgbWFwID0gY3JlYXRlTm9kZXMoKTtcbm1hcCA9IGNyZWF0ZU9ic3RhY2xlcygxMjAsIDE2MCwgMTIwLCAxNjAsICdyaXZlcicsIG1hcCk7XG5tYXAgPSBjcmVhdGVPYnN0YWNsZXMoNjYwLCA4MjAsIDE4MCwgMjAwLCAncml2ZXInLCBtYXApO1xubWFwID0gY3JlYXRlT2JzdGFjbGVzKDkwMCwgMTE4MCwgMTgwLCAyMDAsICdyaXZlcicsIG1hcCk7XG5tYXAgPSBjcmVhdGVPbmVPYnN0YWNsZSgzMDAsIDM0MCwgJ21vdW50YWluJywgbWFwKTtcbm1hcCA9IGNyZWF0ZU9ic3RhY2xlcygyODAsIDMyMCwgMzYwLCAzODAsICdtb3VudGFpbicsIG1hcCk7XG5tYXAgPSBjcmVhdGVPYnN0YWNsZXMoNzQwLCA3NjAsIDQyMCwgNTAwLCAnZm9yZXN0JywgbWFwKTtcbm1hcCA9IGNyZWF0ZU9ic3RhY2xlcyg5NjAsIDEwMDAsIDQ0MCwgNDYwLCAnZm9yZXN0JywgbWFwKTtcbm1hcCA9IGNyZWF0ZU9ic3RhY2xlcyg5ODAsIDEwMDAsIDQ0MCwgNTIwLCAnZm9yZXN0JywgbWFwKTtcbm1hcCA9IGFkZE5laWdoYm91cnMobWFwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tYXAvY3JlYXRlTWFwLnRzIiwiZXhwb3J0IGNvbnN0IGRlbGV0ZU9iamVjdEZyb21BcnJheSA9IChvYmplY3Q6YW55LCBhcnI6YW55W10pID0+IHtcbiAgbGV0IHVwZGF0ZWRBcnIgPSBhcnIuZmlsdGVyKChlbCkgPT4ge1xuICAgIGlmKGVsLnggPT09IG9iamVjdC54ICYmIGVsLnkgPT09IG9iamVjdC55KSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9KTtcbiAgcmV0dXJuIHVwZGF0ZWRBcnI7XG59XG5cbmV4cG9ydCBjb25zdCBpc09iamVjdEluQXJyYXkgPSAob2JqZWN0OmFueSwgYXJyOmFueVtdKSA9PiB7XG4gIGxldCByZXN1bHQ6Ym9vbGVhbiA9IGZhbHNlO1xuICBmb3IobGV0IG5vZGUgb2YgYXJyKSB7XG4gICAgaWYob2JqZWN0LnggPT09IG5vZGUueCAmJiBvYmplY3QueSA9PT0gbm9kZS55KSB7XG4gICAgICByZXN1bHQgPSB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgY29uc3QgZ2V0Tm9kZUZyb21BcnJheSA9IChvYmplY3Q6YW55LCBhcnI6YW55W10pID0+IHtcbiAgZm9yKGxldCBub2RlIG9mIGFycikge1xuICAgIGlmKG5vZGUueCA9PT0gb2JqZWN0LnggJiYgbm9kZS55ICYmIG9iamVjdC55KSB7XG4gICAgICByZXR1cm4gbm9kZTtcbiAgICB9XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91dGlscy9vYmpVdGlscy50cyIsImltcG9ydCB7XG4gIGNhbnZhcyxcbiAgY3R4LFxuICBXSURUSCxcbiAgSEVJR0hULFxuICBncmlkU2l6ZSxcbn0gZnJvbSAnLi4vbWFwL21hcENvbmZpZyc7XG5cbmV4cG9ydCBjb25zdCBkcmF3UGF0aCA9IChwYXRoOmFueVtdKSA9PiB7XG4gIGZvcihsZXQgc3RlcCBvZiBwYXRoKSB7XG4gICAgY3R4LmZpbGxTdHlsZSA9ICd5ZWxsb3cnO1xuICAgIGN0eC5maWxsUmVjdChzdGVwLngsIHN0ZXAueSwgZ3JpZFNpemUsIGdyaWRTaXplKTtcbiAgfVxufVxuXG5leHBvcnQgbGV0IGdldE5vZGVGcm9tTWFwID0gKHg6bnVtYmVyLCB5Om51bWJlciwgbWFwOmFueVtdKSA9PiB7XG4gIGxldCBub2RlOmFueTtcbiAgZm9yKGxldCBncmlkIG9mIG1hcCkge1xuICAgIGxldCBib3R0b21SaWdodFggPSBncmlkLnggKyBncmlkU2l6ZTtcbiAgICBsZXQgYm90dG9tUmlnaHRZID0gZ3JpZC55ICsgZ3JpZFNpemU7XG4gICAgaWYoeCA+PSBncmlkLnggJiYgeCA8IGJvdHRvbVJpZ2h0WCAmJiB5ID49IGdyaWQueSAmJiB5IDwgYm90dG9tUmlnaHRZKSB7XG4gICAgICBub2RlID0gZ3JpZDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG5vZGU7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcGF0aC9kcmF3UGF0aC50cyIsImltcG9ydCB7Z3JpZFNpemV9IGZyb20gJy4uL21hcC9tYXBDb25maWcnO1xuaW1wb3J0IHtcbiAgd2FycmlvcnMsXG4gIGN1cnJlbnRseUNob3NlbldhcnJpb3IsXG4gIGFzc2lnbkN1cnJlbnRseUNob3NlbldhcnJpb3Jcbn0gZnJvbSAnLi4vc3RvcmUvd2FycmlvclN0b3JlJztcbmltcG9ydCB7Y3R4fSBmcm9tICcuLi9tYXAvbWFwQ29uZmlnJztcbmltcG9ydCBXYXJyaW9yIGZyb20gJy4vV2Fycmlvcic7XG5cbmV4cG9ydCBjb25zdCBvbkNob29zZVdhcnJpb3IgPSAod2FycmlvcnM6YW55W10sIG1vdXNlWDpudW1iZXIsIG1vdXNlWTpudW1iZXIpID0+IHtcbiAgbGV0IGZvdW5kZWRXYXJyaW9yID0gbnVsbDtcbiAgZm9yKGxldCB3YXJyaW9yIG9mIHdhcnJpb3JzKSB7XG4gICAgbGV0IGJvdHRvbVJpZ2h0WCA9IHdhcnJpb3IueCArIGdyaWRTaXplO1xuICAgIGxldCBib3R0b21SaWdodFkgPSB3YXJyaW9yLnkgKyBncmlkU2l6ZTtcbiAgICBpZihtb3VzZVggPj0gd2Fycmlvci54ICYmIG1vdXNlWCA8IGJvdHRvbVJpZ2h0WCAmJiBtb3VzZVkgPj0gd2Fycmlvci55ICYmIG1vdXNlWSA8IGJvdHRvbVJpZ2h0WSkge1xuICAgICAgY29uc29sZS5sb2coJ3dhcnJpb3InLCB3YXJyaW9yLm5hbWUsICcgd2FzIGNob3NlbicpO1xuICAgICAgd2Fycmlvci5pc0N1cnJlbnRseUNob3NlbiA9IHRydWU7XG4gICAgICBmb3VuZGVkV2FycmlvciA9IHdhcnJpb3I7XG4gICAgfVxuICB9XG4gIGFzc2lnbkN1cnJlbnRseUNob3NlbldhcnJpb3IoZm91bmRlZFdhcnJpb3IpO1xuICBjb25zb2xlLmxvZygnY3VycmVudGx5Q2hvc2VuV2FycmlvcicsIGN1cnJlbnRseUNob3NlbldhcnJpb3IpO1xufVxuXG5leHBvcnQgY29uc3QgZHJhd1dhcnJpb3IgPSAod2FycmlvcjphbnkpID0+IHtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4LmFyYyh3YXJyaW9yLmNlbnRlclgsIHdhcnJpb3IuY2VudGVyWSwgd2Fycmlvci5yYWRpdXMsIDAsIE1hdGguUEkqMik7XG4gICAgY3R4LmZpbGxTdHlsZSA9ICcjZDkyNTEwJztcbiAgICBjdHguZmlsbCgpO1xuICAgIGN0eC5jbG9zZVBhdGgoKTtcbn1cblxuZXhwb3J0IGNvbnN0IGFzc2lnbldhcnJpb3JNb3ZlVG9Qb3NpdGlvbiA9ICh3YXJyaW9yOmFueSwgeDpudW1iZXIsIHk6bnVtYmVyKSA9PiB7XG4gIC8vY29uc29sZS5lcnJvcignYXNzaWduTW92ZVRvUG9zaXRpb24nKTtcbiAgaWYod2Fycmlvcikge1xuICAgIHdhcnJpb3IubW92ZVRvTm9kZVggPSB4O1xuICAgIHdhcnJpb3IubW92ZVRvTm9kZVkgPSB5O1xuICAgIGNvbnNvbGUubG9nKHdhcnJpb3IubmFtZSArICcgaXMgbW92aW5nIHRvIG5vZGU6JyArIHdhcnJpb3IubW92ZVRvTm9kZVggKyAnIHk6JyArIHdhcnJpb3IubW92ZVRvTm9kZVkpO1xuICB9IGVsc2Uge1xuICAgIGNvbnNvbGUubG9nKCd3YXJyaW9yIG5vdCBjaG9zZW4nKTtcbiAgfVxufVxuXG4vLyBjcmVhdGUgVW5pdCBhbmQgaW1tZWRpYXRseSBwdXNoIGl0IGludG8gdW5pdHMgYXJyYXlcbmV4cG9ydCBsZXQgY3JlYXRlV2FycmlvciA9IChuYW1lOnN0cmluZywgeDpudW1iZXIsIHk6bnVtYmVyLCByYWRpdXM6bnVtYmVyKSA9PiB7XG4gIC8vY29uc29sZS5lcnJvcignY3JlYXRlVW5pdCcpO1xuICBsZXQgd2FycmlvciA9IG5ldyBXYXJyaW9yKG5hbWUsIHgsIHksIHJhZGl1cyk7XG4gIHdhcnJpb3JzLnB1c2god2Fycmlvcik7XG4gIGRyYXdXYXJyaW9yKHdhcnJpb3IpO1xuICByZXR1cm4gd2Fycmlvcjtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy93YXJyaW9yL3dhcnJpb3JBY3Rpb24udHMiLCJleHBvcnQgY29uc3Qgd2FycmlvcnM6YW55W10gPSBbXTtcbmV4cG9ydCBsZXQgY3VycmVudGx5Q2hvc2VuV2FycmlvcjphbnkgPSBudWxsO1xuXG5leHBvcnQgY29uc3QgYXNzaWduQ3VycmVudGx5Q2hvc2VuV2FycmlvciA9ICh3YXJyaW9yOmFueSkgPT4ge1xuICAvLyBjaGVjayB1bml0XG4gIGlmKHdhcnJpb3IpIHtcbiAgICAgIGN1cnJlbnRseUNob3NlbldhcnJpb3IgPSB3YXJyaW9yO1xuICB9IGVsc2Uge1xuICAgIGN1cnJlbnRseUNob3NlbldhcnJpb3IgPSBudWxsO1xuICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zdG9yZS93YXJyaW9yU3RvcmUudHMiLCJpbXBvcnQge25laWdoYm91cnN9IGZyb20gJy4uL21hcC9jcmVhdGVNYXAnO1xuaW1wb3J0IHtcbiAgZGVsZXRlT2JqZWN0RnJvbUFycmF5LFxuICBpc09iamVjdEluQXJyYXlcbn0gZnJvbSAnLi4vdXRpbHMvb2JqVXRpbHMnO1xuXG5pbXBvcnQge1xuICBnZXRNaW5GU2NvcmUsXG4gIHVuY2xvc2VkTmVpZ2JvdXJzLFxuICBpc09iamVjdEluTWFwS2V5c1xufSBmcm9tICcuL2FTdGFyVXRpbHMnO1xuXG5leHBvcnQgY29uc3QgYVN0YXIgPSAoc3RhcnROb2RlOmFueSwgZmluaXNoTm9kZTphbnksIG1hcDphbnlbXSkgPT4ge1xuICAvLyB0aGUgc2V0IG9mIGN1cnJlbnRseSBkaXNjb3ZlcmVkIG5vZGVzIHRoYXQgYXJlIG5vdCBldmFsdWF0ZWQgeWV0XG4gIC8vIEluaXRpYWxseSBvbmx5IHRoZSBzdGFydCBub2RlIGlzIGtub3duXG4gIGxldCBvcGVuOmFueVtdID0gW107XG5cbiAgLy8gdGhlIHNldCBvZiBub2RlcyB0aGF0IGFscmVhZHkgZXZhbHVhdGVkXG4gIGxldCBjbG9zZWQ6YW55W10gPSBbXTtcbiAgc3RhcnROb2RlLmdTY29yZSA9IDA7XG4gIHN0YXJ0Tm9kZS5mU2NvcmUgPSBzdGFydE5vZGUuZ1Njb3JlICsgaChzdGFydE5vZGUsIGZpbmlzaE5vZGUpXG4gIG9wZW4ucHVzaChzdGFydE5vZGUpO1xuXG4gIC8vIGZvciBlYWNoIG5vZGUsIHdoaWNoIG5vZGUgaXMgY2FuIG1vc3QgZWZmaWNpZW50bHkgYmUgcmVhY2hlZCBmcm9tXG4gIC8vIGlmIGEgbm9kZSBjYW4gYmUgcmVhY2hlZCBmcm9tIG1hbnkgbm9kZXMsIGNhbWVGcm9tIHdpbGwgZXZlbnRpYWxseVxuICAvLyBjb250YWluIHRoZSBtb3N0IGVmZmljaWVudCBwcmV2aW91cyBzdGVwXG4gIGxldCBmcm9tID0gbmV3IE1hcCgpO1xuXG4gIC8vIEZvciBlYWNoIG5vZGUsIHRoZSBjb3N0IG9mIGdldHRpbmcgZnJvbSB0aGUgc3RhcnQgbm9kZSB0byB0aGF0IG5vZGUuXG4gIHdoaWxlKG9wZW4pIHtcbiAgICBsZXQgY3VycmVudDphbnkgPSBnZXRNaW5GU2NvcmUob3Blbik7XG4gICAgLy8gY29uc29sZS5sb2coJ2N1cnJlbnQnLCBjdXJyZW50KTtcbiAgICAvLyBjb25zb2xlLmxvZygnZmluaXNoTm9kZTonLCBmaW5pc2hOb2RlKTtcbiAgICBpZihjdXJyZW50LnggPT09IGZpbmlzaE5vZGUueCAmJiBjdXJyZW50LnkgPT09IGZpbmlzaE5vZGUueSkge1xuICAgICAgcmV0dXJuIHJlY29uc3RydWN0UGF0aChmcm9tLCBjdXJyZW50KTtcbiAgICB9XG4gICAgb3BlbiA9IGRlbGV0ZU9iamVjdEZyb21BcnJheShjdXJyZW50LCBvcGVuKTtcbiAgICBjbG9zZWQucHVzaChjdXJyZW50KTtcbiAgICBmb3IobGV0IG5laWdoYm91ciBvZiB1bmNsb3NlZE5laWdib3VycyhjdXJyZW50LCBjbG9zZWQpKSB7XG4gICAgICBsZXQgdGVtcEcgPSBjdXJyZW50LmdTY29yZSArIG5laWdoYm91ci5kaXN0YW5jZTtcbiAgICAgIGlmKCFpc09iamVjdEluQXJyYXkobmVpZ2hib3VyLCBvcGVuKSB8fCB0ZW1wRyA8IG5laWdoYm91ci5nU2NvcmUpIHtcbiAgICAgICAgZnJvbS5zZXQobmVpZ2hib3VyLCBjdXJyZW50KTtcbiAgICAgICAgbmVpZ2hib3VyLmdTY29yZSA9IHRlbXBHO1xuICAgICAgICBuZWlnaGJvdXIuZlNjb3JlID0gbmVpZ2hib3VyLmdTY29yZSArIGgobmVpZ2hib3VyLCBmaW5pc2hOb2RlKTtcbiAgICAgIH1cbiAgICAgIGlmKCFpc09iamVjdEluQXJyYXkobmVpZ2hib3VyLCBvcGVuKSkgeyAvLyBjcmVhdGUgZnVuY3Rpb25cbiAgICAgICAgbGV0IG5vZGVOZWlnaGJvdXJzID0gbmVpZ2hib3VycyhuZWlnaGJvdXIsIG1hcCk7XG4gICAgICAgIG5laWdoYm91ci5uZWlnaGJvdXJzID0gbm9kZU5laWdoYm91cnM7XG4gICAgICAgIG9wZW4ucHVzaChuZWlnaGJvdXIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBjb25zb2xlLmxvZygnZmFpbHVyZScpO1xuICByZXR1cm4gMDsgLy8gZmFpbHVyZVxufVxuXG5leHBvcnQgY29uc3QgaCA9IChzdGFydE5vZGU6YW55LCBmaW5pc2hOb2RlOmFueSkgPT4ge1xuLy9mdW5jdGlvbiBoZXVyaXN0aWMobm9kZSkgPVxuICAvLyBkeCA9IGFicyhub2RlLnggLSBnb2FsLngpXG4gIC8vIGR5ID0gYWJzKG5vZGUueSAtIGdvYWwueSlcbiAgLy8gcmV0dXJuIEQgKiAoZHggKyBkeSkgKyAoRDIgLSAyICogRCkgKiBtaW4oZHgsIGR5KVxuICBsZXQgRCA9IDEwOyAvLyBjb3N0IG9mIG1vdmluZyBob3Jpem9udGFsbHlcbiAgbGV0IEQyID0gMTQ7IC8vIGNvc3Qgb2YgbW92aW5nIGRpYWdvbmFsbHlcbiAgbGV0IGR4ID0gTWF0aC5hYnMoc3RhcnROb2RlLnggLSBmaW5pc2hOb2RlLngpO1xuICBsZXQgZHkgPSBNYXRoLmFicyhzdGFydE5vZGUueSAtIGZpbmlzaE5vZGUueSk7XG4gIHJldHVybiBEICogKGR4ICsgZHkpICsgKEQyIC0gMiAqIEQpICogTWF0aC5taW4oZHgsIGR5KTtcbn1cblxuXG5cbmV4cG9ydCBjb25zdCByZWNvbnN0cnVjdFBhdGggPSAoZnJvbTphbnksIGN1cnJlbnQ6YW55KSA9PiB7XG4gIC8vIGZ1bmN0aW9uIHJlY29uc3RydWN0X3BhdGgoY2FtZUZyb20sIGN1cnJlbnQpXG4gIC8vICAgdG90YWxfcGF0aCA6PSBbY3VycmVudF1cbiAgLy8gICB3aGlsZSBjdXJyZW50IGluIGNhbWVGcm9tLktleXM6XG4gIC8vICAgICAgIGN1cnJlbnQgOj0gY2FtZUZyb21bY3VycmVudF1cbiAgLy8gICAgICAgdG90YWxfcGF0aC5hcHBlbmQoY3VycmVudClcbiAgLy8gICByZXR1cm4gdG90YWxfcGF0aFxuICBsZXQgcmV2ZXJzZVBhdGg6YW55W10gPSBbY3VycmVudF07XG4gIGxldCB0b3RhbFBhdGg6YW55W10gPSBbXTtcbiAgd2hpbGUoaXNPYmplY3RJbk1hcEtleXMoY3VycmVudCwgZnJvbSkpIHtcbiAgICBjdXJyZW50ID0gZnJvbS5nZXQoY3VycmVudCk7XG4gICAgcmV2ZXJzZVBhdGgucHVzaChjdXJyZW50KTtcbiAgfVxuICBmb3IobGV0IGkgPSByZXZlcnNlUGF0aC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIHRvdGFsUGF0aC5wdXNoKHJldmVyc2VQYXRoW2ldKTtcbiAgfVxuICByZXR1cm4gdG90YWxQYXRoO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3BhdGgvQVN0YXIudHMiLCJpbXBvcnQge2RyYXdXYXJyaW9yfSBmcm9tICcuL3dhcnJpb3JBY3Rpb24nO1xuaW1wb3J0IHt3YXJyaW9yc30gZnJvbSAnLi4vc3RvcmUvd2FycmlvclN0b3JlJztcbmltcG9ydCB7XG4gIG1hcCxcbiAgY3JlYXRlV2Fycmlvck9ic3RhY2xlLFxuICBhZGROZWlnaGJvdXJzXG59IGZyb20gJy4uL21hcC9jcmVhdGVNYXAnO1xuaW1wb3J0IHtnZXROb2RlRnJvbU1hcH0gZnJvbSAnLi4vcGF0aC9kcmF3UGF0aCc7XG5pbXBvcnQge1xuICBncmlkU2l6ZSxcbiAgY3R4LFxuICBXSURUSCxcbiAgSEVJR0hUXG59IGZyb20gJy4uL21hcC9tYXBDb25maWcnO1xuaW1wb3J0IHthU3Rhcn0gZnJvbSAnLi4vcGF0aC9BU3Rhcic7XG5pbXBvcnQge2RlbGV0ZU9iamVjdEZyb21BcnJheSxpc09iamVjdEluQXJyYXl9IGZyb20gJy4uL3V0aWxzL29ialV0aWxzJztcblxuZXhwb3J0IGxldCB1cGRhdGVXYXJyaW9yID0gKHdhcnJpb3I6YW55LCBwYXRoOmFueVtdLCBpOm51bWJlcj0wLCBjdXJyZW50TW92ZVRvWDpudW1iZXIsIGN1cnJlbnRNb3ZlVG9ZOm51bWJlcikgPT4ge1xuICAvL2NvbnNvbGUubG9nKCd1cGRhdGVXYXJyaW9yJyk7XG4gIHdhcnJpb3Iuc2V0SXNNb3ZpbmdUb1RydWUoKTtcbiAgbGV0IHVwZGF0ZWRQYXRoID0gT2JqZWN0LmFzc2lnbihbXSwgcGF0aCk7XG4gIGxldCBub2RlID0gdXBkYXRlZFBhdGhbaV07IC8vIGdldCBuZXh0IG5vZGVcblxuICBpZihjdXJyZW50TW92ZVRvWCAhPT0gd2Fycmlvci5tb3ZlVG9Ob2RlLnggfHwgY3VycmVudE1vdmVUb1kgIT09IHdhcnJpb3IubW92ZVRvTm9kZS55KSB7XG4gICAgY29uc29sZS5sb2coJ25ldyBkZXN0aW5hdGlvbiBoYXMgYmVlbiBjaG9zZW4nKTtcbiAgICB3YXJyaW9yLm1vdmVUb05vZGUueCA9IG5vZGUueDtcbiAgICB3YXJyaW9yLm1vdmVUb05vZGUueSA9IG5vZGUueTtcbiAgICB3YXJyaW9yLnNldElzTW92aW5nVG9GYWxzZSgpO1xuICAgIHJldHVybjtcbiAgfVxuICAvLyBhbGx5IHdhcnJpb3IgaXMgb24gdGhlIGRlc3RpbmF0aW9uIHBvc2l0aW9uXG4gIC8vIGN1cnJlbnRXYXJyaW9yIHNob3VsZCBzdG9wIG1vdmluZ1xuICBpZihjaGVja090aGVyV2FycmlvcnNQb3NpdGlvbih3YXJyaW9ycywgd2Fycmlvciwgbm9kZS54LCBub2RlLnkpICYmIGkgPT09IHVwZGF0ZWRQYXRoLmxlbmd0aCAtIDEpIHtcbiAgICB3YXJyaW9yLm1vdmVUb05vZGUueCA9IG5vZGUueDsgLy8gc2V0IG1vdmVUb05vZGUgdmFsdWUgdG8gY3VycmVudCB3YXJyaW9yIHBvc2l0aW9uXG4gICAgd2Fycmlvci5tb3ZlVG9Ob2RlLnkgPSBub2RlLnk7XG4gICAgd2Fycmlvci5zZXRJc01vdmluZ1RvRmFsc2UoKTtcbiAgICBjb25zb2xlLmVycm9yKCdhbGx5IHVuaXQgaW4gZGVzdCBwb3NpdGlvbicpO1xuICAgIHJldHVybjtcbiAgfVxuICBpZihjaGVja090aGVyV2FycmlvcnNQb3NpdGlvbih3YXJyaW9ycywgd2Fycmlvciwgbm9kZS54LCBub2RlLnkpKSB7XG5cbiAgICBpZihpc0FsbHlVbml0SXNPblBvc2l0aW9uKHdhcnJpb3JzLCB3YXJyaW9yLCBub2RlLngsIG5vZGUueSkpIHtcbiAgICAgIC8vIHdhcnJpb3IgaW4gdGhlIHNhbWUgdW5pdCBibG9ja3MgdGhlIG5leHQgcG9zaXRpb24gYW5kIGl0IGZpbmlzaGVkIG1vdmVtZW50XG4gICAgICBjb25zb2xlLmxvZyhgYWxseSdzIHdhcnJpb3IgaXMgb24gcG9zaXRpb25gKTtcbiAgICAgIHdhcnJpb3Iuc2V0SXNNb3ZpbmdUb0ZhbHNlKCk7XG4gICAgICB3YXJyaW9yLm1vdmVUb05vZGUueCA9IG5vZGUueDsgLy8gc2V0IG1vdmVUb05vZGUgdmFsdWUgdG8gY3VycmVudCB3YXJyaW9yIHBvc2l0aW9uXG4gICAgICB3YXJyaW9yLm1vdmVUb05vZGUueSA9IG5vZGUueTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gdW5pdCBoYXMgYW5vdGhlciBhbGxpZXMnIHVuaXQgb24gaXRzIHdheVxuICAgIGNvbnNvbGUuZXJyb3IoJ3VwZGF0ZVVuaXQ6IGFub3RoZXIgdW5pdCBpcyBvbiB0aGUgd2F5IHg6Jyxub2RlLngsJ3k6Jywgbm9kZS55KTtcbiAgICBsZXQgdXBkYXRlZE1hcCA9IE9iamVjdC5hc3NpZ24oW10sIG1hcCk7XG4gICAgY29uc29sZS5lcnJvcignY3JlYXRlV2Fycmlvck9ic3RhY2xlIHg6Jywgbm9kZS54LCAneTonLCBub2RlLnkpO1xuICAgIHVwZGF0ZWRNYXAgPSBjcmVhdGVXYXJyaW9yT2JzdGFjbGUobm9kZS54LCBub2RlLnksIHVwZGF0ZWRNYXApO1xuICAgIHVwZGF0ZWRNYXAgPSBhZGROZWlnaGJvdXJzKHVwZGF0ZWRNYXApO1xuICAgIGNvbnNvbGUubG9nKCdkZWxldGVkIE5vZGUnLCBub2RlKTtcbiAgICBjb25zb2xlLmxvZygndXBkYXRlZE1hcCcsIHVwZGF0ZWRNYXApO1xuICAgIGNvbnNvbGUubG9nKCdub2RlJywgbm9kZSk7XG4gICAgbGV0IHN0YXJ0Tm9kZSA9IGdldE5vZGVGcm9tTWFwKHdhcnJpb3IueCwgd2Fycmlvci55LCB1cGRhdGVkTWFwKTtcbiAgICBsZXQgZmluaXNoTm9kZSA9IGdldE5vZGVGcm9tTWFwKGN1cnJlbnRNb3ZlVG9YLCBjdXJyZW50TW92ZVRvWSwgdXBkYXRlZE1hcCk7XG4gICAgY29uc29sZS5lcnJvcignbm9kZXt4OiA5NjAsIHk6IDQ4MH0gaW4gbWFwOicsIGlzT2JqZWN0SW5BcnJheSh7eDogOTYwLCB5OiA0ODB9LCBtYXApKTtcbiAgICBsZXQgbmV3UGF0aDphbnkgPSBhU3RhcihzdGFydE5vZGUsIGZpbmlzaE5vZGUsIHVwZGF0ZWRNYXApO1xuXG4gICAgY29uc29sZS5lcnJvcignbmV3UGF0aCcsIG5ld1BhdGgpO1xuICAgIHVwZGF0ZVdhcnJpb3Iod2FycmlvciwgbmV3UGF0aCwgMCwgY3VycmVudE1vdmVUb1gsIGN1cnJlbnRNb3ZlVG9ZKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBsZXQgbm9kZVRvQ2xlYXIgPSBub2RlOztcbiAgaWYoaSAhPT0gMCkge1xuICAgIG5vZGVUb0NsZWFyID0gdXBkYXRlZFBhdGhbaSAtIDFdO1xuICB9XG4gIG1vdmVUb05leHROb2RlKHdhcnJpb3IsIG5vZGUsIG5vZGVUb0NsZWFyKTtcbiAgaSsrO1xuXG4gIGlmKGkgIT09IHVwZGF0ZWRQYXRoLmxlbmd0aCkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdXBkYXRlV2Fycmlvcih3YXJyaW9yLCB1cGRhdGVkUGF0aCwgaSwgY3VycmVudE1vdmVUb1gsIGN1cnJlbnRNb3ZlVG9ZKTtcbiAgICB9LCA0MDApO1xuICB9XG4gIGVsc2Uge1xuICAgIHdhcnJpb3IubW92ZVRvTm9kZS54ID0gd2Fycmlvci54OyAvLyBzZXQgbW92ZVRvTm9kZSB2YWx1ZSB0byBjdXJyZW50IHdhcnJpb3IgcG9zaXRpb25cbiAgICB3YXJyaW9yLm1vdmVUb05vZGUueSA9IHdhcnJpb3IueTtcbiAgICB3YXJyaW9yLnNldElzTW92aW5nVG9GYWxzZSgpO1xuICAgIHJldHVybjtcbiAgfVxufVxuXG4vLyBjaGVjayBpZiBuZXh0Tm9kZSBpcyBvY2N1cGllZCBieSBvdGhlciB3YXJyaW9yXG5leHBvcnQgY29uc3QgY2hlY2tPdGhlcldhcnJpb3JzUG9zaXRpb24gPSAod2FycmlvcnM6YW55W10sIGN1cnJlbnRXYXJyaW9yOmFueSwgeDpudW1iZXIsIHk6bnVtYmVyKSA9PiB7XG4gIGxldCB1cGRhdGVkV2FycmlvcnMgPSBkZWxldGVPYmplY3RGcm9tQXJyYXkoY3VycmVudFdhcnJpb3IsIHdhcnJpb3JzKTtcbiAgZm9yKGxldCB3YXJyaW9yIG9mIHVwZGF0ZWRXYXJyaW9ycykge1xuICAgIGlmKHdhcnJpb3IueCA9PT0geCAmJiB3YXJyaW9yLnkgPT09IHkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8vIGNoZWNrIGlmIG5leHROb2RlIGlzIG9jY3VwaWVkIGJ5IGFsbHkncyB3YXJyaW9yXG4vLyB0aGF0IGlzIG5vdCBtb3ZpbmdcbmV4cG9ydCBjb25zdCBpc0FsbHlVbml0SXNPblBvc2l0aW9uID0gKHdhcnJpb3JzOmFueVtdLCBjdXJyZW50V2FycmlvcjphbnksIHg6bnVtYmVyLCB5Om51bWJlcikgPT4ge1xuICBsZXQgdXBkYXRlZFdhcnJpb3JzID0gZGVsZXRlT2JqZWN0RnJvbUFycmF5KGN1cnJlbnRXYXJyaW9yLCB3YXJyaW9ycyk7XG4gIGZvcihsZXQgd2FycmlvciBvZiB1cGRhdGVkV2FycmlvcnMpIHtcbiAgICBpZih3YXJyaW9yLnggPT09IHggJiYgd2Fycmlvci55ID09PSB5KSB7XG4gICAgICBpZih3YXJyaW9yLm5hbWUgPT09IGN1cnJlbnRXYXJyaW9yLm5hbWUgJiYgd2Fycmlvci5pc01vdmluZyA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IGNvbnN0IG1vdmVUb05leHROb2RlID0gKHdhcnJpb3I6YW55LCBub2RlOmFueSwgcHJldmlvdXNOb2RlOmFueSkgPT4ge1xuICBjdHguY2xlYXJSZWN0KHByZXZpb3VzTm9kZS54LCBwcmV2aW91c05vZGUueSwgZ3JpZFNpemUsIGdyaWRTaXplKTtcbiAgd2Fycmlvci5zZXRYKG5vZGUueCk7IC8vIGNhbGN1bGF0ZSBjZW50ZXIgb2YgdGhlIGN1cnJlbnQgbm9kZVxuICB3YXJyaW9yLnNldFkobm9kZS55KTtcbiAgZHJhd1dhcnJpb3Iod2Fycmlvcik7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvd2Fycmlvci93YXJyaW9yTW92ZW1lbnQudHMiLCJleHBvcnQgY29uc3QgdW5pdHM6YW55W10gPSBbXTtcbmV4cG9ydCBsZXQgY3VycmVudGx5Q2hvc2VuVW5pdDphbnkgPSBudWxsO1xuXG5leHBvcnQgY29uc3QgYXNzaWduQ3VycmVudGx5Q2hvc2VuVW5pdCA9ICh1bml0OmFueSkgPT4ge1xuICAvLyBjaGVjayB1bml0XG4gIGlmKHVuaXQpIHtcbiAgICAgIGN1cnJlbnRseUNob3NlblVuaXQgPSB1bml0O1xuICB9IGVsc2Uge1xuICAgIGN1cnJlbnRseUNob3NlblVuaXQgPSBudWxsO1xuICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zdG9yZS91bml0U3RvcmUudHMiLCJleHBvcnQgY29uc3QgZ2V0Q2xvc2VzdFdhcnJpb3JUb0Rlc3RpbmF0aW9uID0gKHVuaXQ6YW55LCBkZXN0WDpudW1iZXIsIGRlc3RZOm51bWJlcikgPT4ge1xuICBsZXQgY2xvc2VzdCA9IDA7XG4gIGxldCBkaWZmZXJlbmNlOm51bWJlcjtcbiAgbGV0IHdhcnJpb3JzID0gdW5pdC53YXJyaW9ycztcbiAgZm9yKGxldCBpID0gMTsgaSA8PSB3YXJyaW9ycy5sZW5ndGggLSAxOyArK2kpIHtcbiAgICBsZXQgY3VycmVudFVuaXREaWZmZXJlbmNlID0gTWF0aC5zcXJ0KE1hdGgucG93KE1hdGguYWJzKHdhcnJpb3JzW2ldLnggLSBkZXN0WCksIDIpICsgTWF0aC5wb3coTWF0aC5hYnMod2FycmlvcnNbaV0ueSAtIGRlc3RZKSwgMikpO1xuICAgIGxldCBwcmV2aW91c1VuaXREaWZmZXJlbmNlID0gTWF0aC5zcXJ0KE1hdGgucG93KE1hdGguYWJzKHdhcnJpb3JzW2Nsb3Nlc3RdLnggLSBkZXN0WCksIDIpICsgTWF0aC5wb3coTWF0aC5hYnMod2FycmlvcnNbY2xvc2VzdF0ueSAtIGRlc3RZKSwgMikpO1xuXG4gICAgaWYoY3VycmVudFVuaXREaWZmZXJlbmNlIDwgcHJldmlvdXNVbml0RGlmZmVyZW5jZSkge1xuICAgICAgY2xvc2VzdCA9IGk7XG4gICAgfVxuICB9XG4gIHJldHVybiB3YXJyaW9yc1tjbG9zZXN0XTtcbn1cblxuZXhwb3J0IGNvbnN0IGdldENsb3Nlc3RXYXJyaW9yVG9EZXN0aW5hdGlvbkluQXJyYXkgPSAod2FycmlvcnM6YW55W10sIGRlc3RYOm51bWJlciwgZGVzdFk6bnVtYmVyKSA9PiB7XG4gIGxldCBjbG9zZXN0ID0gMDtcbiAgbGV0IGRpZmZlcmVuY2U6bnVtYmVyO1xuICBmb3IobGV0IGkgPSAxOyBpIDw9IHdhcnJpb3JzLmxlbmd0aCAtIDE7ICsraSkge1xuICAgIGxldCBjdXJyZW50VW5pdERpZmZlcmVuY2UgPSBNYXRoLnNxcnQoTWF0aC5wb3coTWF0aC5hYnMod2FycmlvcnNbaV0ueCAtIGRlc3RYKSwgMikgKyBNYXRoLnBvdyhNYXRoLmFicyh3YXJyaW9yc1tpXS55IC0gZGVzdFkpLCAyKSk7XG4gICAgbGV0IHByZXZpb3VzVW5pdERpZmZlcmVuY2UgPSBNYXRoLnNxcnQoTWF0aC5wb3coTWF0aC5hYnMod2FycmlvcnNbY2xvc2VzdF0ueCAtIGRlc3RYKSwgMikgKyBNYXRoLnBvdyhNYXRoLmFicyh3YXJyaW9yc1tjbG9zZXN0XS55IC0gZGVzdFkpLCAyKSk7XG5cbiAgICBpZihjdXJyZW50VW5pdERpZmZlcmVuY2UgPCBwcmV2aW91c1VuaXREaWZmZXJlbmNlKSB7XG4gICAgICBjbG9zZXN0ID0gaTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHdhcnJpb3JzW2Nsb3Nlc3RdO1xufVxuXG5leHBvcnQgY29uc3QgZ2V0Q2VudHJhbFdhcnJpb3JJblVuaXQgPSAodW5pdDphbnkpID0+IHtcbiAgbGV0IGNlbnRyYWxSb3cgPSBNYXRoLnJvdW5kKHVuaXQucm93IC8gMik7XG4gIGxldCBjZW50cmFsQ29sID0gTWF0aC5yb3VuZCh1bml0LmNvbCAvIDIpO1xuICBmb3IobGV0IHdhcnJpb3Igb2YgdW5pdC53YXJyaW9ycykge1xuICAgIGlmKHdhcnJpb3IuY29sSW5Vbml0ID09PSBjZW50cmFsQ29sICYmIHdhcnJpb3Iucm93SW5Vbml0ID09PSBjZW50cmFsUm93KSB7XG4gICAgICByZXR1cm4gd2FycmlvcjtcbiAgICB9XG4gIH1cbn1cblxuIC8vIGdldCB1bml0J3MgcG9zaXRpb24gYW5kIGRlc3RpbmF0aW9uIHBvc2l0aW9uIGFuZCByZXR1cm4gYW5nbGUgaW4gcmFkaWFucyBiZXR3ZWVuIHVuaXQgYW5kIGRlc3RpbmF0aW9uXG5leHBvcnQgY29uc3QgY2FsY0Rlc3RpbmF0aW9uQW5nbGVJbkRlZ3JlZXMgPSAodW5pdDphbnksIGRlc3RYOm51bWJlciwgZGVzdFk6bnVtYmVyKTpudW1iZXIgPT4ge1xuICAvL2NvbnNvbGUuZXJyb3IoJ2NhbGNEZXN0aW5hdGlvbkFuZ2xlSW5EZWdyZWVzJyk7XG4gIGxldCB3YXJyaW9yID0gZ2V0Q2xvc2VzdFdhcnJpb3JUb0Rlc3RpbmF0aW9uKHVuaXQsIGRlc3RYLCBkZXN0WSk7XG4gIGxldCBhbmdsZTtcbiAgbGV0IGEgPSBNYXRoLmFicyhkZXN0WSAtIHdhcnJpb3IueSk7XG4gIGxldCBiID0gTWF0aC5hYnMoZGVzdFggLSB3YXJyaW9yLngpO1xuICBsZXQgYW5nbGVJblJhZGlhbiA9IE1hdGguYXRhbihhIC8gYik7XG4gIC8vIGNoZWNrIHF1YXRlciBvZiB0aGUgY2lyY2xlXG4gIGxldCBkZWdyZWUgPSAgYW5nbGVJblJhZGlhbiAqICgxODAgLyBNYXRoLlBJKTsgLy8gY29udmVydCByYWRpYW5zIGludG8gZGVncmVlXG4gIGxldCBxdWF0ZXIgPSBnZXRRdWF0ZXIod2Fycmlvci54LCB3YXJyaW9yLnksIGRlc3RYLCBkZXN0WSk7IC8vIGNoZWNrIHF1YXRlclxuICBpZihxdWF0ZXIgPT09IDEpIGFuZ2xlID0gZGVncmVlO1xuICBpZihxdWF0ZXIgPT09IDIpIGFuZ2xlID0gOTAgKyAoOTAgLSBkZWdyZWUpO1xuICBlbHNlIGlmKHF1YXRlciA9PT0gMykgYW5nbGUgPSAxODAgKyBkZWdyZWU7XG4gIGVsc2UgaWYocXVhdGVyID09PSA0KSBhbmdsZSA9IDI3MCArICg5MCAtIGRlZ3JlZSk7XG4gIHJldHVybiBNYXRoLnJvdW5kKGFuZ2xlKTtcbn1cblxuZXhwb3J0IGNvbnN0IGdldFF1YXRlciA9ICh1bml0WDpudW1iZXIsIHVuaXRZOm51bWJlciwgZGVzdFg6bnVtYmVyLCBkZXN0WTpudW1iZXIpOm51bWJlciA9PiB7XG4gIC8vY29uc29sZS5lcnJvcignZ2V0UXVhdGVyJyk7XG4gIGxldCBxdWF0ZXI7XG4gIGlmKGRlc3RYID49IHVuaXRYICYmIGRlc3RZIDwgdW5pdFkpIHtcbiAgICBxdWF0ZXIgPSAxO1xuICB9XG4gIGVsc2UgaWYoZGVzdFggPCB1bml0WCAmJiBkZXN0WSA8PSB1bml0WSkge1xuICAgIHF1YXRlciA9IDI7XG4gIH1cbiAgZWxzZSBpZihkZXN0WCA8PSB1bml0WCAmJiBkZXN0WSA+IHVuaXRZKSB7XG4gICAgcXVhdGVyID0gMztcbiAgfVxuICBlbHNlIGlmKGRlc3RYID4gdW5pdFggJiYgZGVzdFkgPj0gdW5pdFkpIHtcbiAgICBxdWF0ZXIgPSA0O1xuICB9XG4gIHJldHVybiBxdWF0ZXI7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdW5pdC91bml0VXRpbHMudHMiLCJpbXBvcnQge1xuICBjYW52YXMsXG4gIGN0eCxcbiAgV0lEVEgsXG4gIEhFSUdIVCxcbiAgZ3JpZFNpemVcbn0gZnJvbSAnLi9tYXAvbWFwQ29uZmlnJztcblxuaW1wb3J0IHtkcmF3R3JpZH0gZnJvbSAnLi9tYXAvZHJhd0dyaWQnO1xuaW1wb3J0IHtcbiAgYWRkTmVpZ2hib3VycyxcbiAgY3JlYXRlTm9kZXMsXG4gIG1hcFxufSBmcm9tICcuL21hcC9jcmVhdGVNYXAnO1xuaW1wb3J0IHtzaG93T2JzdGFjbGVzfSBmcm9tICcuL21hcC9tYXBVdGlscyc7XG5pbXBvcnQge2gsIGFTdGFyfSBmcm9tICcuL3BhdGgvQVN0YXInO1xuaW1wb3J0IHtcbiAgZHJhd1BhdGgsXG4gIGdldE5vZGVGcm9tTWFwXG59IGZyb20gJy4vcGF0aC9kcmF3UGF0aCc7XG5cbmltcG9ydCBXYXJyaW9yIGZyb20gJy4vd2Fycmlvci9XYXJyaW9yJztcbmltcG9ydCB7d2FycmlvcnMsIGN1cnJlbnRseUNob3NlbldhcnJpb3J9IGZyb20gJy4vc3RvcmUvd2FycmlvclN0b3JlJztcbmltcG9ydCB7XG4gIG9uQ2hvb3NlV2FycmlvcixcbiAgY3JlYXRlV2FycmlvcixcbiAgYXNzaWduV2Fycmlvck1vdmVUb1Bvc2l0aW9uLFxufSBmcm9tICcuL3dhcnJpb3Ivd2FycmlvckFjdGlvbic7XG5pbXBvcnQge3VwZGF0ZVdhcnJpb3J9IGZyb20gJy4vd2Fycmlvci93YXJyaW9yTW92ZW1lbnQnO1xuXG5pbXBvcnQge1xuICBjcmVhdGVVbml0LFxuICBvbkNob29zZVVuaXQsXG4gIG9uQ2hhbmdlV2FycmlvclBvc2l0aW9uSW5Vbml0XG59IGZyb20gJy4vdW5pdC91bml0QWN0aW9ucyc7XG5pbXBvcnQge1xuICB1bml0cyxcbiAgY3VycmVudGx5Q2hvc2VuVW5pdFxufSBmcm9tICcuL3N0b3JlL3VuaXRTdG9yZSc7XG5cbmltcG9ydCB7XG4gIGNhbGNEZXN0aW5hdGlvbkFuZ2xlSW5EZWdyZWVzXG59IGZyb20gJy4vdW5pdC91bml0VXRpbHMnO1xuXG5pbXBvcnQge21vdmVUb1Bvc2l0aW9ufSBmcm9tICcuL3VuaXQvdW5pdE1vdmVtZW50JztcblxubGV0IHdhcnJpb3IgPSBjcmVhdGVXYXJyaW9yKCdiYXJiYXJpYW4nLCA4MCwgMTYwLCA1KTtcbmNyZWF0ZVVuaXQoJ3Rlc3RVbml0JywgNiwgMjQwLCA0MjApO1xuXG5kcmF3R3JpZCgpO1xuY29uc29sZS5sb2coJ21hcCcsIG1hcCk7XG5jb25zb2xlLmxvZygnY3VycmVudGx5Q2hvc2VuV2FycmlvcicsIGN1cnJlbnRseUNob3NlbldhcnJpb3IpO1xuXG5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICBjb25zb2xlLmVycm9yKCdDbGljaycpO1xuICBsZXQgeCA9IGUub2Zmc2V0WDsgLy8gZ2V0IFhcbiAgbGV0IHkgPSBlLm9mZnNldFk7IC8vIGdldCBZXG4gIGNvbnNvbGUubG9nKCdQb3NpdGlvbiB4JywgZS5vZmZzZXRYKTsgLy8gZ2V0IFhcbiAgY29uc29sZS5sb2coJ1Bvc2l0aW9uIHknLCBlLm9mZnNldFkpOyAvLyBnZXQgWVxuICBvbkNob29zZVdhcnJpb3Iod2FycmlvcnMsIHgsIHkpO1xuICBvbkNob29zZVVuaXQodW5pdHMsIGN1cnJlbnRseUNob3NlbldhcnJpb3IpO1xuICBjb25zb2xlLmxvZygnY3VycmVudGx5Q2hvc2VuV2FycmlvcicsIGN1cnJlbnRseUNob3NlbldhcnJpb3IpO1xuICBmb3IobGV0IGdyaWQgb2YgbWFwKSB7XG4gICAgbGV0IGJvdHRvbVJpZ2h0WCA9IGdyaWQueCArIGdyaWRTaXplO1xuICAgIGxldCBib3R0b21SaWdodFkgPSBncmlkLnkgKyBncmlkU2l6ZTtcbiAgICBpZih4ID49IGdyaWQueCAmJiB4IDwgYm90dG9tUmlnaHRYICYmIHkgPj0gZ3JpZC55ICYmIHkgPCBib3R0b21SaWdodFkpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdub2RlJywgZ3JpZCwgJyB3YXMgY2hvc2VuJyk7XG4gICAgfVxuICB9XG59KTtcblxuLy8gc2V0IG9uQ2xpY2tMaXN0ZW5lciBmb3IgcmlnaHQgbW91c2UgZXZlbnRcbmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdjb250ZXh0bWVudScsIChlKSA9PiB7XG4gIGNvbnNvbGUuZXJyb3IoJ1JpZ2h0IE1vdXNlIENsaWNrJyk7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgbGV0IHggPSBlLm9mZnNldFg7IC8vIGdldCBYXG4gIGxldCB5ID0gZS5vZmZzZXRZOyAvLyBnZXQgWVxuICBsZXQgdXBkYXRlZE1hcCA9IE9iamVjdC5hc3NpZ24oW10sIG1hcCk7XG4gIGxldCBzdGFydE5vZGUgPSBnZXROb2RlRnJvbU1hcChjdXJyZW50bHlDaG9zZW5Vbml0LmNvbW1hbmRlclBvc2l0aW9uWCwgY3VycmVudGx5Q2hvc2VuVW5pdC5jb21tYW5kZXJQb3NpdGlvblksIHVwZGF0ZWRNYXApO1xuICBsZXQgZmluaXNoTm9kZSA9IGdldE5vZGVGcm9tTWFwKHgsIHksIG1hcCk7XG4gIGNvbnNvbGUuZXJyb3IoJ3N0YXJ0Tm9kZScsIHN0YXJ0Tm9kZSk7XG4gIGNvbnNvbGUuZXJyb3IoJ2ZpbmlzaE5vZGUnLCBmaW5pc2hOb2RlKTtcbiAgYXNzaWduV2Fycmlvck1vdmVUb1Bvc2l0aW9uKGN1cnJlbnRseUNob3NlbldhcnJpb3IsIHgsIHkpO1xuICBtb3ZlVG9Qb3NpdGlvbihjdXJyZW50bHlDaG9zZW5Vbml0LCBmaW5pc2hOb2RlKTtcbiAgY29uc29sZS5lcnJvcignQW5nbGUnLCBjYWxjRGVzdGluYXRpb25BbmdsZUluRGVncmVlcyhjdXJyZW50bHlDaG9zZW5Vbml0LCB4LCB5KSk7XG4gIC8vIGxldCBwYXRoOmFueSA9IGFTdGFyKHN0YXJ0Tm9kZSwgZmluaXNoTm9kZSk7XG4gIC8vIGlmKGN1cnJlbnRseUNob3NlblVuaXQpIHtcbiAgLy8gIG9uQ2hhbmdlV2FycmlvclBvc2l0aW9uSW5Vbml0KGN1cnJlbnRseUNob3NlblVuaXQscGF0aCwgMCwgeCwgeSk7XG4gIC8vIH1cblxuICAvL2RyYXdQYXRoKHBhdGgpO1xufSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZ2FtZS50cyIsImltcG9ydCB7XG4gIGNhbnZhcyxcbiAgY3R4LFxuICBXSURUSCxcbiAgSEVJR0hULFxuICBncmlkU2l6ZVxufSBmcm9tICcuL21hcENvbmZpZyc7XG5cbmV4cG9ydCBjb25zdCBkcmF3R3JpZCA9ICgpID0+IHtcbiAgZm9yKGxldCB5ID0gMDsgeSA8PSBIRUlHSFQ7IHkrPSBncmlkU2l6ZSkge1xuICAgIGZvcihsZXQgeCA9IDA7IHggPD0gV0lEVEg7IHgrPSBncmlkU2l6ZSkge1xuICAgICAgY3R4LnN0cm9rZVJlY3QoeCwgeSwgZ3JpZFNpemUsIGdyaWRTaXplKTtcbiAgICB9XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tYXAvZHJhd0dyaWQudHMiLCJpbXBvcnQge2dyaWRTaXplfSBmcm9tICcuLi9tYXAvbWFwQ29uZmlnJztcblxuY2xhc3MgV2FycmlvciB7XG4gIG5hbWU6IHN0cmluZztcbiAgeDogbnVtYmVyO1xuICB5OiBudW1iZXI7XG4gIGNlbnRlclg6IG51bWJlcjtcbiAgY2VudGVyWTogbnVtYmVyO1xuICByYWRpdXM6IG51bWJlcjtcbiAgbW92ZVRvTm9kZVg6IG51bWJlcjtcbiAgbW92ZVRvTm9kZVk6IG51bWJlcjtcbiAgaXNDdXJyZW50bHlDaG9zZW46IGJvb2xlYW4gPSBmYWxzZTtcbiAgcG9zaXRpb25JblVuaXQ6IG51bWJlcjtcbiAgcm93SW5Vbml0OiBudW1iZXI7XG4gIGNvbEluVW5pdDogbnVtYmVyO1xuICBtb3ZlVG9Ob2RlOiBhbnk7XG4gIGlzTW92aW5nOiBib29sZWFuID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IobmFtZTpzdHJpbmcsIHg6bnVtYmVyLCB5Om51bWJlciwgcmFkaXVzOm51bWJlcikge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHRoaXMucmFkaXVzID0gcmFkaXVzO1xuICAgIHRoaXMuY2VudGVyWCA9IHggKyAoZ3JpZFNpemUgLyAyKTtcbiAgICB0aGlzLmNlbnRlclkgPSB5ICsgKGdyaWRTaXplIC8gMik7XG4gIH1cblxuICBzZXRYKHg6bnVtYmVyKSB7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLmNlbnRlclggPSB4ICsgKGdyaWRTaXplIC8gMik7XG4gIH1cblxuICBzZXRZKHk6bnVtYmVyKSB7XG4gICAgdGhpcy55ID0geTtcbiAgICB0aGlzLmNlbnRlclkgPSB5ICsgKGdyaWRTaXplIC8gMik7XG4gIH1cblxuICBhc3NpZ25Qb3NpdGlvbihuZXdQb3NpdGlvbjogbnVtYmVyKSB7XG4gICAgdGhpcy5wb3NpdGlvbkluVW5pdCA9IG5ld1Bvc2l0aW9uO1xuICB9XG5cbiAgc2V0SXNNb3ZpbmdUb1RydWUoKSB7XG4gICAgdGhpcy5pc01vdmluZyA9IHRydWU7XG4gIH1cblxuICBzZXRJc01vdmluZ1RvRmFsc2UoKSB7XG4gICAgdGhpcy5pc01vdmluZyA9IGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFdhcnJpb3I7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvd2Fycmlvci9XYXJyaW9yLnRzIiwiaW1wb3J0IHtjcmVhdGVXYXJyaW9yfSBmcm9tICcuLi93YXJyaW9yL3dhcnJpb3JBY3Rpb24nO1xuaW1wb3J0IHtncmlkU2l6ZX0gZnJvbSAnLi4vbWFwL21hcENvbmZpZyc7XG5pbXBvcnQge3VwZGF0ZVdhcnJpb3J9IGZyb20gJy4uL3dhcnJpb3Ivd2Fycmlvck1vdmVtZW50JztcbmltcG9ydCB7bWFwfSBmcm9tICcuLi9tYXAvY3JlYXRlTWFwJ1xuaW1wb3J0IFVuaXQgZnJvbSAnLi9Vbml0JztcblxuaW1wb3J0IHtcbiAgdW5pdHMsXG4gIGN1cnJlbnRseUNob3NlblVuaXQsXG4gIGFzc2lnbkN1cnJlbnRseUNob3NlblVuaXRcbn0gZnJvbSAnLi4vc3RvcmUvdW5pdFN0b3JlJztcblxuaW1wb3J0IHtcbiAgYXNzaWduV2Fycmlvck1vdmVUb1Bvc2l0aW9uLFxufSBmcm9tICcuLi93YXJyaW9yL3dhcnJpb3JBY3Rpb24nO1xuXG5pbXBvcnQge1xuICBnZXROb2RlRnJvbU1hcFxufSBmcm9tICcuLi9wYXRoL2RyYXdQYXRoJztcblxuaW1wb3J0IHthU3Rhcn0gZnJvbSAnLi4vcGF0aC9BU3Rhcic7XG5cbmV4cG9ydCBjb25zdCBvbkNoYW5nZVdhcnJpb3JQb3NpdGlvbkluVW5pdCA9ICh1bml0OmFueSwgcGF0aDphbnlbXSwgaTpudW1iZXI9MCwgY3VycmVudE1vdmVUb1g6bnVtYmVyLCBjdXJyZW50TW92ZVRvWTpudW1iZXIpID0+IHtcbiAgbGV0IHJvdyA9IHVuaXQucXVhbnRpdHkgLyAyO1xuICBsZXQgY29sID0gTWF0aC5jZWlsKHVuaXQucXVhbnRpdHkgLyByb3cpO1xuICBmb3IobGV0IHdhcnJpb3Igb2YgdW5pdC53YXJyaW9ycykge1xuICAgIGxldCBzdGFydE5vZGUgPSBnZXROb2RlRnJvbU1hcChjdXJyZW50bHlDaG9zZW5Vbml0LmNvbW1hbmRlclBvc2l0aW9uWCwgY3VycmVudGx5Q2hvc2VuVW5pdC5jb21tYW5kZXJQb3NpdGlvblksIG1hcCk7XG4gICAgbGV0IGZpbmlzaE5vZGUgPSBnZXROb2RlRnJvbU1hcChjdXJyZW50TW92ZVRvWCwgY3VycmVudE1vdmVUb1ksIG1hcCk7XG4gICAgbGV0IHBhdGg6YW55ID0gYVN0YXIoc3RhcnROb2RlLCBmaW5pc2hOb2RlLCBtYXApO1xuICAgIGFzc2lnbldhcnJpb3JNb3ZlVG9Qb3NpdGlvbih3YXJyaW9yLCBjdXJyZW50TW92ZVRvWCwgY3VycmVudE1vdmVUb1kpO1xuICAgIHVwZGF0ZVdhcnJpb3Iod2FycmlvciwgcGF0aCwgaSwgY3VycmVudE1vdmVUb1gsIGN1cnJlbnRNb3ZlVG9ZKTtcbiAgICBjdXJyZW50TW92ZVRvWCArPSBncmlkU2l6ZTtcbiAgICBjb25zb2xlLmxvZygnaScsIGkpO1xuICAgIGNvbnNvbGUubG9nKCdjdXJyZW50TW92ZVRvWCcsIGN1cnJlbnRNb3ZlVG9YKTtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgYWRkV2FycmlvcnNUb1VuaXQgPSAodW5pdDphbnkpID0+IHtcbiAgbGV0IHN0YXJ0WCA9IHVuaXQuY29tbWFuZGVyUG9zaXRpb25YO1xuICBsZXQgc3RhcnRZID0gdW5pdC5jb21tYW5kZXJQb3NpdGlvblk7XG4gIGxldCBpID0gMTtcbiAgbGV0IHJvdyA9IHVuaXQucXVhbnRpdHkgLyAyO1xuICBsZXQgY29sID0gTWF0aC5jZWlsKHVuaXQucXVhbnRpdHkgLyByb3cpO1xuICBsZXQgZmluaXNoWCA9IHN0YXJ0WCArICgocm93IC0gMSkgKiBncmlkU2l6ZSk7XG4gIGxldCBmaW5pc2hZID0gc3RhcnRZICsgKChjb2wgLSAxKSAqIGdyaWRTaXplKTtcbiAgbGV0IHJhZGl1cyA9IGdyaWRTaXplIC8gNDtcbiAgbGV0IHVuaXRSb3cgPSAxOyAvLyB0byBnaXZlIHdhcnJpb3Igcm93IGFuZCBjb2x1bW4gcG9zaXRpb24gaW4gdW5pdFxuICBsZXQgdW5pdENvbCA9IDE7XG4gIHVuaXQucm93ID0gcm93OyAvLyBhZGQgcm93IGluc3RhbmNlIGZvciB1bml0XG4gIHVuaXQuY29sID0gY29sOyAvLyBhZGQgY29sIGluc3RhbmNlIGZvciB1bml0XG4gIGZvcihsZXQgeSA9IHN0YXJ0WDsgeSA8PSBmaW5pc2hZOyB5ICs9IGdyaWRTaXplKSB7XG4gICAgaWYoaSA8PSB1bml0LnF1YW50aXR5KSB7XG4gICAgICBmb3IobGV0IHggPSBzdGFydFg7IHggPD0gZmluaXNoWDsgIHgrPSBncmlkU2l6ZSkge1xuICAgICAgICBsZXQgY3VycmVudFdhcnJpb3IgPSBjcmVhdGVXYXJyaW9yKHVuaXQubmFtZSwgeCwgeSwgcmFkaXVzKTtcbiAgICAgICAgY3VycmVudFdhcnJpb3IuYXNzaWduUG9zaXRpb24oaSk7XG4gICAgICAgIGN1cnJlbnRXYXJyaW9yLnJvd0luVW5pdCA9IHVuaXRSb3c7XG4gICAgICAgIGN1cnJlbnRXYXJyaW9yLmNvbEluVW5pdCA9IHVuaXRDb2w7XG4gICAgICAgIHVuaXQuYWRkV2FycmlvclRvVW5pdChjdXJyZW50V2Fycmlvcik7XG4gICAgICAgIGkrKztcbiAgICAgICAgdW5pdENvbCsrO1xuICAgICAgfVxuICAgIH1cbiAgICB1bml0Um93Kys7XG4gICAgdW5pdENvbCA9IDE7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVVuaXQgPSAobmFtZTpzdHJpbmcsIHF1YW50aXR5Om51bWJlciwgcG9zWDpudW1iZXIsIHBvc1k6IG51bWJlcikgPT4ge1xuICBsZXQgbmV3VW5pdCA9IG5ldyBVbml0KG5hbWUsIHF1YW50aXR5LCBwb3NYLCBwb3NZKTtcbiAgbGV0IHJhZGl1cyA9IGdyaWRTaXplIC8gNDtcbiAgYWRkV2FycmlvcnNUb1VuaXQobmV3VW5pdCk7XG4gIHVuaXRzLnB1c2gobmV3VW5pdCk7XG59XG5cbi8vIHdhcnJpb3JzIGluIHRoZSB1bml0IGhhdmUgc2FtZSBuYW1lIGFzIHVuaXQgdGhhdCB0aGV5IGFzc2lnbmVkIHRvXG4vLyBpZiB3YXJyaW9yIHdpdGggc2FtZSBuYW1lIGlzIGNob3NlbiB0aGF0IG1lYW5zIHRoYXQgdW5pdCBhbHNvXG4vLyBoYXMgYmVlbiBjaG9zZW5cbmV4cG9ydCBjb25zdCBvbkNob29zZVVuaXQgPSAodW5pdHM6YW55LCBjdXJyZW50bHlDaG9zZW5XYXJyaW9yOmFueSkgPT4ge1xuICBsZXQgZm91bmRlZFVuaXQgPSBudWxsO1xuICBpZihjdXJyZW50bHlDaG9zZW5XYXJyaW9yKSB7XG4gICAgZm9yKGxldCB1bml0IG9mIHVuaXRzKSB7XG4gICAgICBpZihjdXJyZW50bHlDaG9zZW5XYXJyaW9yLm5hbWUgPT09IHVuaXQubmFtZSkge1xuICAgICAgICBmb3VuZGVkVW5pdCA9IHVuaXQ7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGFzc2lnbkN1cnJlbnRseUNob3NlblVuaXQoZm91bmRlZFVuaXQpO1xuICBjb25zb2xlLmxvZygnY3VycmVudGx5Q2hvc2VuVW5pdCcsIGN1cnJlbnRseUNob3NlblVuaXQpO1xufVxuXG5sZXQgZ2V0VW5pdENvbW1hbmRlciA9ICh1bml0OmFueSkgPT4ge1xuICBmb3IobGV0IHdhcnJpb3Igb2YgdW5pdC53YXJyaW9ycykge1xuICAgIGlmKHdhcnJpb3IucG9zaXRpb25JblVuaXQgPT09IDEpIHtcbiAgICAgIHJldHVybiB3YXJyaW9yO1xuICAgIH1cbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3VuaXQvdW5pdEFjdGlvbnMudHMiLCJleHBvcnQgY29uc3QgZ2V0TWluRlNjb3JlID0gKG9wZW46YW55W10pID0+IHtcbiAgbGV0IG1pbiA9IDA7XG4gIGlmKG9wZW4ubGVuZ3RoID09PSAxKSB7XG4gICAgcmV0dXJuIG9wZW5bbWluXTtcbiAgfVxuICBmb3IobGV0IGkgPSAxOyBpIDwgb3Blbi5sZW5ndGggLSAxOyArK2kpIHtcbiAgICBpZihvcGVuW21pbl0uZlNjb3JlID4gb3BlbltpXS5mU2NvcmUpIHtcbiAgICAgIG1pbiA9IGk7XG4gICAgfVxuICB9XG4gIHJldHVybiBvcGVuW21pbl07XG59XG5cbmV4cG9ydCBjb25zdCB1bmNsb3NlZE5laWdib3VycyA9IChjdXJyZW50OmFueSwgY2xvc2VkOmFueSkgPT4ge1xuICBsZXQgbmVpZ2hib3Vyc05vdEluQ2xvc2VkID0gW107XG4gIGZvcihsZXQgbmVpZ2hib3VyIG9mIGN1cnJlbnQubmVpZ2hib3Vycykge1xuICAgIGxldCBpc0luQ2xvc2VkOmJvb2xlYW4gPSBmYWxzZTtcbiAgICBmb3IobGV0IG5vZGUgb2YgY2xvc2VkKSB7XG4gICAgICBpZihuZWlnaGJvdXIueCA9PT0gbm9kZS54ICYmIG5laWdoYm91ci55ID09PSBub2RlLnkpIHtcbiAgICAgICAgaXNJbkNsb3NlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIGlmKCFpc0luQ2xvc2VkKSB7XG4gICAgICBuZWlnaGJvdXJzTm90SW5DbG9zZWQucHVzaChuZWlnaGJvdXIpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbmVpZ2hib3Vyc05vdEluQ2xvc2VkO1xufVxuXG5leHBvcnQgY29uc3QgaXNPYmplY3RJbk1hcEtleXMgPSAob2JqZWN0OmFueSwgbWFwOmFueSkgPT4ge1xuICBsZXQgYXJyOmFueVtdID0gQXJyYXkuZnJvbShtYXApO1xuICBsZXQgcmVzdWx0OmJvb2xlYW4gPSBmYWxzZTtcbiAgZm9yKGxldCBpID0gMDsgaSA8IGFyci5sZW5ndGg7ICsraSkge1xuICAgIC8vY29uc29sZS5sb2coJ29iamVjdCcsIG9iamVjdCk7XG4gICAgaWYoYXJyW2ldWzBdLnggPT09IG9iamVjdC54ICYmIGFycltpXVswXS55ID09PSBvYmplY3QueSkge1xuICAgICAgcmVzdWx0ID0gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgY29uc29sZS5sb2coJ3Jlc3VsdCcsIHJlc3VsdCk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcGF0aC9hU3RhclV0aWxzLnRzIiwiXG5cbmNsYXNzIFVuaXQge1xuICBuYW1lOiBzdHJpbmc7XG4gIHF1YW50aXR5OiBudW1iZXI7XG4gIGNvbW1hbmRlclBvc2l0aW9uWDogbnVtYmVyO1xuICBjb21tYW5kZXJQb3NpdGlvblk6IG51bWJlcjtcbiAgd2FycmlvcnM6IGFueVtdID0gW107XG4gIGNvbDogbnVtYmVyO1xuICByb3c6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcihuYW1lOnN0cmluZywgcXVhbnRpdHk6bnVtYmVyLCBwb3NYOm51bWJlciwgcG9zWTpudW1iZXIpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMucXVhbnRpdHkgPSBxdWFudGl0eTtcbiAgICB0aGlzLmNvbW1hbmRlclBvc2l0aW9uWCA9IHBvc1g7XG4gICAgdGhpcy5jb21tYW5kZXJQb3NpdGlvblkgPSBwb3NYO1xuICB9XG4gIGFkZFdhcnJpb3JUb1VuaXQod2FycmlvcjphbnkpIHtcbiAgICB0aGlzLndhcnJpb3JzLnB1c2god2Fycmlvcik7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVW5pdDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91bml0L1VuaXQudHMiLCJpbXBvcnQge1xuICBnZXRDZW50cmFsV2FycmlvckluVW5pdCxcbiAgZ2V0Q2xvc2VzdFdhcnJpb3JUb0Rlc3RpbmF0aW9uSW5BcnJheVxufSBmcm9tICcuL3VuaXRVdGlscyc7XG5pbXBvcnQge2dyaWRTaXplfSBmcm9tICcuLi9tYXAvbWFwQ29uZmlnJztcbmltcG9ydCB7bWFwfSBmcm9tICcuLi9tYXAvY3JlYXRlTWFwJztcbmltcG9ydCB7Z2V0Tm9kZUZyb21NYXB9IGZyb20gJy4uL3BhdGgvZHJhd1BhdGgnO1xuaW1wb3J0IHtcbiAgZ2V0Tm9kZUZyb21BcnJheSxcbiAgZGVsZXRlT2JqZWN0RnJvbUFycmF5LFxuICBpc09iamVjdEluQXJyYXlcbn0gZnJvbSAnLi4vdXRpbHMvb2JqVXRpbHMnO1xuaW1wb3J0IHt1cGRhdGVXYXJyaW9yfSBmcm9tICcuLi93YXJyaW9yL3dhcnJpb3JNb3ZlbWVudCc7XG5pbXBvcnQge2FTdGFyfSBmcm9tICcuLi9wYXRoL0FTdGFyJztcblxuZXhwb3J0IGNvbnN0IG1vdmVUb1Bvc2l0aW9uID0gKHVuaXQ6YW55LCBuZXh0Tm9kZTphbnkpID0+IHtcbiAgLy8gYXNzaWduIG1vdmVUb1Bvc2l0aW9ucyB0byB3YXJyaW9yc1xuICBsZXQgbW92aW5nV2FycmlvcnMgPSBPYmplY3QuYXNzaWduKFtdLCB1bml0LndhcnJpb3JzKTtcbiAgbGV0IGNlbnRyYWxXYXJyaW9yID0gZ2V0Q2VudHJhbFdhcnJpb3JJblVuaXQodW5pdCk7XG4gIGxldCB1cGRhdGVkV2FycmlvcnMgPSBkZWxldGVPYmplY3RGcm9tQXJyYXkoY2VudHJhbFdhcnJpb3IsIHVuaXQud2FycmlvcnMpO1xuICAvL2NvbnNvbGUubG9nKCd1cGRhdGVkV2FycmlvcnMnLCB1cGRhdGVkV2FycmlvcnMpO1xuICBjZW50cmFsV2Fycmlvci5tb3ZlVG9Ob2RlID0gbmV4dE5vZGU7XG4gIC8vIGFzc2lnbiBjZW50cmFsVW5pdCBnZSB0byBuZXh0IG5leHROb2RlXG4gIC8vIGFzc2lnbiBvdGhlciB3YXJyaW9ycyBuZXh0IHBvc2l0aW9uc1xuICBmb3IobGV0IHdhcnJpb3Igb2YgdXBkYXRlZFdhcnJpb3JzKSB7XG4gICAgbGV0IHtkaWZmZXJlbmNlSW5YLGRpZmZlcmVuY2VJbll9ID0gY2hlY2tXYXJyaW9yc1Bvc2l0aW9ucyhjZW50cmFsV2Fycmlvciwgd2Fycmlvcik7XG4gICAgbGV0IHg6bnVtYmVyID0gbmV4dE5vZGUueCArIChkaWZmZXJlbmNlSW5YICogZ3JpZFNpemUpO1xuICAgIGxldCB5Om51bWJlciA9IG5leHROb2RlLnkgKyAoZGlmZmVyZW5jZUluWSAqIGdyaWRTaXplKTtcbiAgICBjb25zb2xlLmVycm9yKCd4OicsIHgsICd5OicsIHkpO1xuICAgIGxldCBtb3ZlVG9Ob2RlO1xuICAgIGlmKGlzT2JqZWN0SW5BcnJheSh7eCwgeX0sIG1hcCkpIHsgLy8gaWYgbm9kZSBleGlzdHMgdGhlbiBnbyB0byB0aGlzIG5vZGVcbiAgICAgIG1vdmVUb05vZGUgPSBnZXROb2RlRnJvbU1hcCh4LCB5LCBtYXApO1xuICAgIH0gZWxzZSB7IC8vIGVsc2UgZ28gdG8gZ3VhcmFudGVkIGV4aXN0ZWQgbm9kZSAobmV4dE5vZGUpXG4gICAgICBtb3ZlVG9Ob2RlID0gbmV4dE5vZGU7XG4gICAgfVxuXG4gICAgY29uc29sZS5lcnJvcignbW92ZVRvTm9kZScsIG1vdmVUb05vZGUpO1xuICAgIHdhcnJpb3IubW92ZVRvTm9kZSA9IG1vdmVUb05vZGU7XG4gIH1cbiAgdW5pdE1vdmVtZW50KG1vdmluZ1dhcnJpb3JzLCBuZXh0Tm9kZSk7XG59XG5cbmV4cG9ydCBjb25zdCBjaGVja1dhcnJpb3JzUG9zaXRpb25zID0gKGNlbnRyYWxXYXJyaW9yOmFueSwgY3VycmVudFdhcnJpb3I6YW55KSA9PiB7XG4gIGxldCBjZW50cmFsQ29sID0gY2VudHJhbFdhcnJpb3IuY29sSW5Vbml0O1xuICBsZXQgY2VudHJhbFJvdyA9IGNlbnRyYWxXYXJyaW9yLnJvd0luVW5pdDtcbiAgbGV0IGN1cnJlbnRSb3cgPSBjdXJyZW50V2Fycmlvci5yb3dJblVuaXQ7XG4gIGxldCBjdXJyZW50Q29sID0gY3VycmVudFdhcnJpb3IuY29sSW5Vbml0O1xuICBsZXQgZGlmZmVyZW5jZUluWCA9IGN1cnJlbnRDb2wgLSBjZW50cmFsQ29sO1xuICBsZXQgZGlmZmVyZW5jZUluWSA9IGN1cnJlbnRSb3cgLSBjZW50cmFsUm93O1xuICByZXR1cm4ge1xuICAgIGRpZmZlcmVuY2VJblgsXG4gICAgZGlmZmVyZW5jZUluWVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCB1bml0TW92ZW1lbnQgPSAobW92aW5nV2FycmlvcnM6YW55W10sIG5leHROb2RlOmFueSkgPT4ge1xuICBpZihtb3ZpbmdXYXJyaW9ycy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgLy8gZ2V0IGNsb3Nlc3Qgd2FycmlvciB0byBkZXN0aW5hdGlvblxuICBsZXQgY2xvc2VzdCA9IGdldENsb3Nlc3RXYXJyaW9yVG9EZXN0aW5hdGlvbkluQXJyYXkobW92aW5nV2FycmlvcnMsIG5leHROb2RlLngsIG5leHROb2RlLnkpO1xuICBjb25zb2xlLmVycm9yKCd1bml0TW92ZW1lbnQgY2xvc2VzdDonLCBjbG9zZXN0KTtcbiAgbGV0IHN0YXJ0Tm9kZSA9IGdldE5vZGVGcm9tTWFwKGNsb3Nlc3QueCwgY2xvc2VzdC55LCBtYXApOyAvLyBzdGFydE5vZGUgb2YgdGhlIGNsb3Nlc3Qgd2FycmlvclxuICBjb25zb2xlLmxvZygneDonLCBjbG9zZXN0LngsICd5OicsIGNsb3Nlc3QueSk7XG4gIGNvbnNvbGUuZXJyb3IoJ3VuaXRNb3ZlbWVudCBzdGFydE5vZGU6Jywgc3RhcnROb2RlKTtcbiAgY29uc29sZS5lcnJvcignZmluaXNoTm9kZScsIGNsb3Nlc3QubW92ZVRvTm9kZSk7XG4gIGNvbnNvbGUubG9nKCdtYXAnLCBtYXApO1xuICBsZXQgcGF0aDphbnkgPSBhU3RhcihzdGFydE5vZGUsIGNsb3Nlc3QubW92ZVRvTm9kZSwgbWFwKTtcbiAgdXBkYXRlV2FycmlvcihjbG9zZXN0LCBwYXRoLCAwLCBjbG9zZXN0Lm1vdmVUb05vZGUueCwgY2xvc2VzdC5tb3ZlVG9Ob2RlLnkpO1xuICBtb3ZpbmdXYXJyaW9ycyA9IGRlbGV0ZU9iamVjdEZyb21BcnJheShjbG9zZXN0LCBtb3ZpbmdXYXJyaW9ycyk7XG4gIHVuaXRNb3ZlbWVudChtb3ZpbmdXYXJyaW9ycywgbmV4dE5vZGUpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3VuaXQvdW5pdE1vdmVtZW50LnRzIl0sInNvdXJjZVJvb3QiOiIifQ==