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
    if (currentMoveToX !== warrior.moveToNode.x || currentMoveToY !== warrior.moveToNode.y) {
        console.log('new destination has been chosen');
        warrior.moveToNode.x = warrior.x;
        warrior.moveToNode.y = warrior.y;
        warrior.setIsMovingToFalse();
        console.error('new destination; node{x: 960, y: 480} in map:', objUtils_1.isObjectInArray({ x: 960, y: 480 }, createMap_1.map));
        return;
    }
    var updatedPath = Object.assign([], path);
    var node = updatedPath[i]; // get next node
    // ally warrior is on the destination position
    // currentWarrior should stop moving
    if (exports.checkOtherWarriorsPosition(warriorStore_1.warriors, warrior, node.x, node.y) && i === updatedPath.length - 1) {
        warrior.moveToNode.x = node.x; // set moveToNode value to current warrior position
        warrior.moveToNode.y = node.y;
        warrior.setIsMovingToFalse();
        console.error('ally unit in dest position; node{x: 960, y: 480} in map:', objUtils_1.isObjectInArray({ x: 960, y: 480 }, createMap_1.map));
        return;
    }
    if (exports.checkOtherWarriorsPosition(warriorStore_1.warriors, warrior, node.x, node.y)) {
        if (exports.isAllyUnitIsOnPosition(warriorStore_1.warriors, warrior, node.x, node.y)) {
            console.log("ally's warrior is on position");
            warrior.setIsMovingToFalse();
            warrior.setX(warrior.x);
            warrior.setY(warrior.y);
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
    console.error('node{x: 960, y: 480} in map:', objUtils_1.isObjectInArray({ x: 960, y: 480 }, createMap_1.map));
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
    console.log('is node in map:', objUtils_1.isObjectInArray({ x: closest.x, y: closest.y }, createMap_1.map));
    console.log('map:', createMap_1.map);
    console.error('unitMovement startNode:', startNode);
    var path = AStar_1.aStar(startNode, closest.moveToNode, createMap_1.map);
    warriorMovement_1.updateWarrior(closest, path, 0, closest.moveToNode.x, closest.moveToNode.y);
    movingWarriors = objUtils_1.deleteObjectFromArray(closest, movingWarriors);
    exports.unitMovement(movingWarriors, nextNode);
};


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjYxZDY2NjA3N2M2YWRjNTE2MjgiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hcC9tYXBDb25maWcudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hcC9jcmVhdGVNYXAudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL29ialV0aWxzLnRzIiwid2VicGFjazovLy8uL3NyYy9wYXRoL2RyYXdQYXRoLnRzIiwid2VicGFjazovLy8uL3NyYy93YXJyaW9yL3dhcnJpb3JBY3Rpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0b3JlL3dhcnJpb3JTdG9yZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcGF0aC9BU3Rhci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd2Fycmlvci93YXJyaW9yTW92ZW1lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0b3JlL3VuaXRTdG9yZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdW5pdC91bml0VXRpbHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hcC9kcmF3R3JpZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd2Fycmlvci9XYXJyaW9yLnRzIiwid2VicGFjazovLy8uL3NyYy91bml0L3VuaXRBY3Rpb25zLnRzIiwid2VicGFjazovLy8uL3NyYy9wYXRoL2FTdGFyVXRpbHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VuaXQvVW5pdC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdW5pdC91bml0TW92ZW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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TyxDQUFDLENBQUMsRUFBRSxlQUFHLENBQUMsQ0FBQyxDQUFDLG1DQUFtQztJQUM5RixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDOUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSwwQkFBZSxDQUFDLEVBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDLEVBQUMsRUFBRSxlQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ25GLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLGVBQUcsQ0FBQyxDQUFDO0lBQ3pCLE9BQU8sQ0FBQyxLQUFLLENBQUMseUJBQXlCLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDcEQsSUFBSSxJQUFJLEdBQU8sYUFBSyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsVUFBVSxFQUFFLGVBQUcsQ0FBQyxDQUFDO0lBQ3pELCtCQUFhLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM1RSxjQUFjLEdBQUcsZ0NBQXFCLENBQUMsT0FBTyxFQUFFLGNBQWMsQ0FBQyxDQUFDO0lBQ2hFLG9CQUFZLENBQUMsY0FBYyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ3pDLENBQUMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDY2MWQ2NjYwNzdjNmFkYzUxNjI4IiwiLy8gZ2xvYmFsIHZhcmlhYmxlc1xuZXhwb3J0IGNvbnN0IFdJRFRIOiBudW1iZXIgPSAxMjAwO1xuZXhwb3J0IGNvbnN0IEhFSUdIVDogbnVtYmVyID0gNjAwO1xuZXhwb3J0IGNvbnN0IGdyaWRTaXplOm51bWJlciA9IDIwO1xuXG4vLyBjcmVhdGUgQ2FudmFzXG5leHBvcnQgbGV0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuY2FudmFzLmlkID0gXCJjYW52YXNcIjtcbmNhbnZhcy53aWR0aCA9IFdJRFRIO1xuY2FudmFzLmhlaWdodCA9IEhFSUdIVDtcbmNhbnZhcy5zdHlsZS5ib3JkZXIgPSBcIjFweCBzb2xpZFwiO1xuXG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNhbnZhcyk7XG5cbi8vIGRlZmluZSAyZCBjb250ZXh0XG5leHBvcnQgbGV0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFwL21hcENvbmZpZy50cyIsImltcG9ydCB7XG4gIGNhbnZhcyxcbiAgY3R4LFxuICBXSURUSCxcbiAgSEVJR0hULFxuICBncmlkU2l6ZVxufSBmcm9tICcuLi9tYXAvbWFwQ29uZmlnJztcblxuaW1wb3J0IHtcbiAgZGVsZXRlT2JqZWN0RnJvbUFycmF5LFxufSBmcm9tICcuLi91dGlscy9vYmpVdGlscyc7XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVOb2RlcyA9ICgpID0+IHtcbiAgbGV0IG1hcDphbnlbXSA9IFtdO1xuICBsZXQgdmFsdWUgPSAxO1xuICBsZXQgaWQgPSAwO1xuICBmb3IobGV0IHkgPSAwOyB5IDw9IEhFSUdIVDsgeSs9IGdyaWRTaXplKSB7XG4gICAgZm9yKGxldCB4ID0gMDsgeCA8PSBXSURUSDsgeCs9IGdyaWRTaXplKSB7XG4gICAgICBtYXAucHVzaCh7XG4gICAgICAgIGlkOiBpZCxcbiAgICAgICAgeDogeCxcbiAgICAgICAgeTogeSxcbiAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICBuZWlnaGJvdXJzOiBbXVxuICAgICAgfSk7XG4gICAgICBpZCsrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbWFwO1xufVxuXG5leHBvcnQgY29uc3QgbmVpZ2hib3VycyA9IChub2RlOmFueSwgbWFwOmFueVtdKSA9PiB7XG4gIGxldCBkaXJzID0gW1xuICAgIHt4OiAtZ3JpZFNpemUsIHk6IC1ncmlkU2l6ZSwgZGlzdGFuY2U6IDE0fSxcbiAgICB7eDogMCwgeTogLWdyaWRTaXplLCBkaXN0YW5jZTogMTB9LFxuICAgIHt4OiBncmlkU2l6ZSwgeTogLWdyaWRTaXplLCBkaXN0YW5jZTogMTR9LFxuICAgIHt4OiAtZ3JpZFNpemUsIHk6IDAsIGRpc3RhbmNlOiAxMH0sXG4gICAge3g6IGdyaWRTaXplLCB5OiAwLCBkaXN0YW5jZTogMTB9LFxuICAgIHt4OiAtZ3JpZFNpemUsIHk6IGdyaWRTaXplLCBkaXN0YW5jZTogMTR9LFxuICAgIHt4OiAwLCB5OiBncmlkU2l6ZSwgZGlzdGFuY2U6IDEwfSxcbiAgICB7eDogZ3JpZFNpemUsIHk6IGdyaWRTaXplLCBkaXN0YW5jZTogMTR9XG4gIF07XG4gIGxldCByZXN1bHQgPSBbXTtcbiAgZm9yKGxldCBkaXIgb2YgZGlycykge1xuICAgIGxldCBuZWlnaGJvdXIgPSB7XG4gICAgICB4OiBub2RlLnggKyBkaXIueCxcbiAgICAgIHk6IG5vZGUueSArIGRpci55LFxuICAgICAgZGlzdGFuY2U6IGRpci5kaXN0YW5jZVxuICAgIH1cbiAgICBpZihuZWlnaGJvdXIueCA+PSAwICYmIG5laWdoYm91ci54IDwgV0lEVEggJiYgbmVpZ2hib3VyLnkgPj0gMCAmJiBuZWlnaGJvdXIueSA8IEhFSUdIVCkge1xuICAgICAgICBsZXQgZmluZGVkOmJvb2xlYW4gPSBmYWxzZTtcbiAgICAgICAgZm9yKGxldCBub2RlIG9mIG1hcCkge1xuICAgICAgICAgIGlmKG5laWdoYm91ci54ID09PSBub2RlLnggJiYgbmVpZ2hib3VyLnkgPT09IG5vZGUueSkge1xuICAgICAgICAgICAgZmluZGVkID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYoZmluZGVkKSB7XG4gICAgICAgICAgcmVzdWx0LnB1c2goe1xuICAgICAgICAgICAgeDogbmVpZ2hib3VyLngsXG4gICAgICAgICAgICB5OiBuZWlnaGJvdXIueSxcbiAgICAgICAgICAgIGRpc3RhbmNlOiBuZWlnaGJvdXIuZGlzdGFuY2UsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGNvbnN0IGFkZE5laWdoYm91cnMgPSAobWFwOmFueVtdKSA9PiB7XG4gIGxldCB1cGRhdGVkTWFwID0gT2JqZWN0LmFzc2lnbihbXSwgbWFwKTtcbiAgZm9yKGxldCBub2RlIG9mIHVwZGF0ZWRNYXApIHtcbiAgICBsZXQgbiA9IG5laWdoYm91cnMobm9kZSwgbWFwKTtcbiAgICBub2RlLm5laWdoYm91cnMgPSBuO1xuICB9XG4gIHJldHVybiB1cGRhdGVkTWFwO1xufVxuXG5leHBvcnQgY29uc3QgY3JlYXRlV2Fycmlvck9ic3RhY2xlID0gKHBvc2l0aW9uWDpudW1iZXIsIHBvc2l0aW9uWTpudW1iZXIsIG1hcDphbnlbXSkgPT4ge1xuICBsZXQgbm9kZSA9IHtcbiAgICB4OiBwb3NpdGlvblgsXG4gICAgeTogcG9zaXRpb25ZXG4gIH07XG4gIHJldHVybiBkZWxldGVPYmplY3RGcm9tQXJyYXkobm9kZSwgbWFwKTtcbn1cblxuZXhwb3J0IGNvbnN0IGNyZWF0ZU9uZU9ic3RhY2xlID0gKHBvc2l0aW9uWDpudW1iZXIsIHBvc2l0aW9uWTpudW1iZXIsIHR5cGU6c3RyaW5nPSdmb3Jlc3QnLCBtYXA6YW55W10pID0+IHtcbiAgbGV0IG5vZGUgPSB7XG4gICAgeDogcG9zaXRpb25YLFxuICAgIHk6IHBvc2l0aW9uWVxuICB9O1xuICBpZih0eXBlID09PSAnZm9yZXN0JykgY3R4LmZpbGxTdHlsZSA9ICdncmVlbic7XG4gIGVsc2UgaWYodHlwZSA9PT0gJ21vdW50YWluJykgY3R4LmZpbGxTdHlsZSA9ICcjOEI0NTEzJztcbiAgZWxzZSBpZih0eXBlID09PSAncml2ZXInKSBjdHguZmlsbFN0eWxlID0gJ2JsdWUnO1xuICBjdHguZmlsbFJlY3QocG9zaXRpb25YLCBwb3NpdGlvblksIGdyaWRTaXplLCBncmlkU2l6ZSk7XG4gIHJldHVybiBkZWxldGVPYmplY3RGcm9tQXJyYXkobm9kZSwgbWFwKVxufVxuXG5leHBvcnQgY29uc3QgY3JlYXRlT2JzdGFjbGVzID0gKHN0YXJ0WDpudW1iZXIsIGZpbmlzaFg6bnVtYmVyLCBzdGFydFk6bnVtYmVyLCBmaW5pc2hZOm51bWJlciwgdHlwZTpzdHJpbmc9J2ZvcmVzdCcsIG1hcDphbnlbXSkgPT4ge1xuICBsZXQgbmV3TWFwOmFueVtdID0gT2JqZWN0LmFzc2lnbihbXSwgbWFwKTtcbiAgZm9yKGxldCB4ID0gc3RhcnRYOyB4IDw9IGZpbmlzaFg7IHggKz0gZ3JpZFNpemUpIHtcbiAgICBmb3IobGV0IHkgPSBzdGFydFk7IHkgPD0gZmluaXNoWTsgeSArPSBncmlkU2l6ZSkge1xuICAgICAgbGV0IG5vZGUgPSB7XG4gICAgICAgIHgsXG4gICAgICAgIHlcbiAgICAgIH1cbiAgICAgIG5ld01hcCA9IGRlbGV0ZU9iamVjdEZyb21BcnJheShub2RlLCBuZXdNYXApO1xuICAgICAgaWYodHlwZSA9PT0gJ2ZvcmVzdCcpIGN0eC5maWxsU3R5bGUgPSAnZ3JlZW4nO1xuICAgICAgZWxzZSBpZih0eXBlID09PSAnbW91bnRhaW4nKSBjdHguZmlsbFN0eWxlID0gJyM4QjQ1MTMnO1xuICAgICAgZWxzZSBpZih0eXBlID09PSAncml2ZXInKSBjdHguZmlsbFN0eWxlID0gJ2JsdWUnO1xuICAgICAgbGV0IHhMZW5ndGggPSBNYXRoLmFicyhzdGFydFggLSBmaW5pc2hYKTtcbiAgICAgIGxldCB5TGVuZ3RoID0gTWF0aC5hYnMoc3RhcnRZIC0gZmluaXNoWSk7XG4gICAgICBjdHguZmlsbFJlY3QoeCwgeSwgZ3JpZFNpemUsIGdyaWRTaXplKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG5ld01hcDtcbn1cblxuZXhwb3J0IGxldCBtYXAgPSBjcmVhdGVOb2RlcygpO1xubWFwID0gY3JlYXRlT2JzdGFjbGVzKDEyMCwgMTYwLCAxMjAsIDE2MCwgJ3JpdmVyJywgbWFwKTtcbm1hcCA9IGNyZWF0ZU9ic3RhY2xlcyg2NjAsIDgyMCwgMTgwLCAyMDAsICdyaXZlcicsIG1hcCk7XG5tYXAgPSBjcmVhdGVPYnN0YWNsZXMoOTAwLCAxMTgwLCAxODAsIDIwMCwgJ3JpdmVyJywgbWFwKTtcbm1hcCA9IGNyZWF0ZU9uZU9ic3RhY2xlKDMwMCwgMzQwLCAnbW91bnRhaW4nLCBtYXApO1xubWFwID0gY3JlYXRlT2JzdGFjbGVzKDI4MCwgMzIwLCAzNjAsIDM4MCwgJ21vdW50YWluJywgbWFwKTtcbm1hcCA9IGNyZWF0ZU9ic3RhY2xlcyg3NDAsIDc2MCwgNDIwLCA1MDAsICdmb3Jlc3QnLCBtYXApO1xubWFwID0gY3JlYXRlT2JzdGFjbGVzKDk2MCwgMTAwMCwgNDQwLCA0NjAsICdmb3Jlc3QnLCBtYXApO1xubWFwID0gY3JlYXRlT2JzdGFjbGVzKDk4MCwgMTAwMCwgNDQwLCA1MjAsICdmb3Jlc3QnLCBtYXApO1xubWFwID0gYWRkTmVpZ2hib3VycyhtYXApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21hcC9jcmVhdGVNYXAudHMiLCJleHBvcnQgY29uc3QgZGVsZXRlT2JqZWN0RnJvbUFycmF5ID0gKG9iamVjdDphbnksIGFycjphbnlbXSkgPT4ge1xuICBsZXQgdXBkYXRlZEFyciA9IGFyci5maWx0ZXIoKGVsKSA9PiB7XG4gICAgaWYoZWwueCA9PT0gb2JqZWN0LnggJiYgZWwueSA9PT0gb2JqZWN0LnkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH0pO1xuICByZXR1cm4gdXBkYXRlZEFycjtcbn1cblxuZXhwb3J0IGNvbnN0IGlzT2JqZWN0SW5BcnJheSA9IChvYmplY3Q6YW55LCBhcnI6YW55W10pID0+IHtcbiAgbGV0IHJlc3VsdDpib29sZWFuID0gZmFsc2U7XG4gIGZvcihsZXQgbm9kZSBvZiBhcnIpIHtcbiAgICBpZihvYmplY3QueCA9PT0gbm9kZS54ICYmIG9iamVjdC55ID09PSBub2RlLnkpIHtcbiAgICAgIHJlc3VsdCA9IHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBjb25zdCBnZXROb2RlRnJvbUFycmF5ID0gKG9iamVjdDphbnksIGFycjphbnlbXSkgPT4ge1xuICBmb3IobGV0IG5vZGUgb2YgYXJyKSB7XG4gICAgaWYobm9kZS54ID09PSBvYmplY3QueCAmJiBub2RlLnkgJiYgb2JqZWN0LnkpIHtcbiAgICAgIHJldHVybiBub2RlO1xuICAgIH1cbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3V0aWxzL29ialV0aWxzLnRzIiwiaW1wb3J0IHtcbiAgY2FudmFzLFxuICBjdHgsXG4gIFdJRFRILFxuICBIRUlHSFQsXG4gIGdyaWRTaXplLFxufSBmcm9tICcuLi9tYXAvbWFwQ29uZmlnJztcblxuZXhwb3J0IGNvbnN0IGRyYXdQYXRoID0gKHBhdGg6YW55W10pID0+IHtcbiAgZm9yKGxldCBzdGVwIG9mIHBhdGgpIHtcbiAgICBjdHguZmlsbFN0eWxlID0gJ3llbGxvdyc7XG4gICAgY3R4LmZpbGxSZWN0KHN0ZXAueCwgc3RlcC55LCBncmlkU2l6ZSwgZ3JpZFNpemUpO1xuICB9XG59XG5cbmV4cG9ydCBsZXQgZ2V0Tm9kZUZyb21NYXAgPSAoeDpudW1iZXIsIHk6bnVtYmVyLCBtYXA6YW55W10pID0+IHtcbiAgbGV0IG5vZGU6YW55O1xuICBmb3IobGV0IGdyaWQgb2YgbWFwKSB7XG4gICAgbGV0IGJvdHRvbVJpZ2h0WCA9IGdyaWQueCArIGdyaWRTaXplO1xuICAgIGxldCBib3R0b21SaWdodFkgPSBncmlkLnkgKyBncmlkU2l6ZTtcbiAgICBpZih4ID49IGdyaWQueCAmJiB4IDwgYm90dG9tUmlnaHRYICYmIHkgPj0gZ3JpZC55ICYmIHkgPCBib3R0b21SaWdodFkpIHtcbiAgICAgIG5vZGUgPSBncmlkO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbm9kZTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9wYXRoL2RyYXdQYXRoLnRzIiwiaW1wb3J0IHtncmlkU2l6ZX0gZnJvbSAnLi4vbWFwL21hcENvbmZpZyc7XG5pbXBvcnQge1xuICB3YXJyaW9ycyxcbiAgY3VycmVudGx5Q2hvc2VuV2FycmlvcixcbiAgYXNzaWduQ3VycmVudGx5Q2hvc2VuV2FycmlvclxufSBmcm9tICcuLi9zdG9yZS93YXJyaW9yU3RvcmUnO1xuaW1wb3J0IHtjdHh9IGZyb20gJy4uL21hcC9tYXBDb25maWcnO1xuaW1wb3J0IFdhcnJpb3IgZnJvbSAnLi9XYXJyaW9yJztcblxuZXhwb3J0IGNvbnN0IG9uQ2hvb3NlV2FycmlvciA9ICh3YXJyaW9yczphbnlbXSwgbW91c2VYOm51bWJlciwgbW91c2VZOm51bWJlcikgPT4ge1xuICBsZXQgZm91bmRlZFdhcnJpb3IgPSBudWxsO1xuICBmb3IobGV0IHdhcnJpb3Igb2Ygd2FycmlvcnMpIHtcbiAgICBsZXQgYm90dG9tUmlnaHRYID0gd2Fycmlvci54ICsgZ3JpZFNpemU7XG4gICAgbGV0IGJvdHRvbVJpZ2h0WSA9IHdhcnJpb3IueSArIGdyaWRTaXplO1xuICAgIGlmKG1vdXNlWCA+PSB3YXJyaW9yLnggJiYgbW91c2VYIDwgYm90dG9tUmlnaHRYICYmIG1vdXNlWSA+PSB3YXJyaW9yLnkgJiYgbW91c2VZIDwgYm90dG9tUmlnaHRZKSB7XG4gICAgICBjb25zb2xlLmxvZygnd2FycmlvcicsIHdhcnJpb3IubmFtZSwgJyB3YXMgY2hvc2VuJyk7XG4gICAgICB3YXJyaW9yLmlzQ3VycmVudGx5Q2hvc2VuID0gdHJ1ZTtcbiAgICAgIGZvdW5kZWRXYXJyaW9yID0gd2FycmlvcjtcbiAgICB9XG4gIH1cbiAgYXNzaWduQ3VycmVudGx5Q2hvc2VuV2Fycmlvcihmb3VuZGVkV2Fycmlvcik7XG4gIGNvbnNvbGUubG9nKCdjdXJyZW50bHlDaG9zZW5XYXJyaW9yJywgY3VycmVudGx5Q2hvc2VuV2Fycmlvcik7XG59XG5cbmV4cG9ydCBjb25zdCBkcmF3V2FycmlvciA9ICh3YXJyaW9yOmFueSkgPT4ge1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHguYXJjKHdhcnJpb3IuY2VudGVyWCwgd2Fycmlvci5jZW50ZXJZLCB3YXJyaW9yLnJhZGl1cywgMCwgTWF0aC5QSSoyKTtcbiAgICBjdHguZmlsbFN0eWxlID0gJyNkOTI1MTAnO1xuICAgIGN0eC5maWxsKCk7XG4gICAgY3R4LmNsb3NlUGF0aCgpO1xufVxuXG5leHBvcnQgY29uc3QgYXNzaWduV2Fycmlvck1vdmVUb1Bvc2l0aW9uID0gKHdhcnJpb3I6YW55LCB4Om51bWJlciwgeTpudW1iZXIpID0+IHtcbiAgLy9jb25zb2xlLmVycm9yKCdhc3NpZ25Nb3ZlVG9Qb3NpdGlvbicpO1xuICBpZih3YXJyaW9yKSB7XG4gICAgd2Fycmlvci5tb3ZlVG9Ob2RlWCA9IHg7XG4gICAgd2Fycmlvci5tb3ZlVG9Ob2RlWSA9IHk7XG4gICAgY29uc29sZS5sb2cod2Fycmlvci5uYW1lICsgJyBpcyBtb3ZpbmcgdG8gbm9kZTonICsgd2Fycmlvci5tb3ZlVG9Ob2RlWCArICcgeTonICsgd2Fycmlvci5tb3ZlVG9Ob2RlWSk7XG4gIH0gZWxzZSB7XG4gICAgY29uc29sZS5sb2coJ3dhcnJpb3Igbm90IGNob3NlbicpO1xuICB9XG59XG5cbi8vIGNyZWF0ZSBVbml0IGFuZCBpbW1lZGlhdGx5IHB1c2ggaXQgaW50byB1bml0cyBhcnJheVxuZXhwb3J0IGxldCBjcmVhdGVXYXJyaW9yID0gKG5hbWU6c3RyaW5nLCB4Om51bWJlciwgeTpudW1iZXIsIHJhZGl1czpudW1iZXIpID0+IHtcbiAgLy9jb25zb2xlLmVycm9yKCdjcmVhdGVVbml0Jyk7XG4gIGxldCB3YXJyaW9yID0gbmV3IFdhcnJpb3IobmFtZSwgeCwgeSwgcmFkaXVzKTtcbiAgd2FycmlvcnMucHVzaCh3YXJyaW9yKTtcbiAgZHJhd1dhcnJpb3Iod2Fycmlvcik7XG4gIHJldHVybiB3YXJyaW9yO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3dhcnJpb3Ivd2FycmlvckFjdGlvbi50cyIsImV4cG9ydCBjb25zdCB3YXJyaW9yczphbnlbXSA9IFtdO1xuZXhwb3J0IGxldCBjdXJyZW50bHlDaG9zZW5XYXJyaW9yOmFueSA9IG51bGw7XG5cbmV4cG9ydCBjb25zdCBhc3NpZ25DdXJyZW50bHlDaG9zZW5XYXJyaW9yID0gKHdhcnJpb3I6YW55KSA9PiB7XG4gIC8vIGNoZWNrIHVuaXRcbiAgaWYod2Fycmlvcikge1xuICAgICAgY3VycmVudGx5Q2hvc2VuV2FycmlvciA9IHdhcnJpb3I7XG4gIH0gZWxzZSB7XG4gICAgY3VycmVudGx5Q2hvc2VuV2FycmlvciA9IG51bGw7XG4gIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3N0b3JlL3dhcnJpb3JTdG9yZS50cyIsImltcG9ydCB7bmVpZ2hib3Vyc30gZnJvbSAnLi4vbWFwL2NyZWF0ZU1hcCc7XG5pbXBvcnQge1xuICBkZWxldGVPYmplY3RGcm9tQXJyYXksXG4gIGlzT2JqZWN0SW5BcnJheVxufSBmcm9tICcuLi91dGlscy9vYmpVdGlscyc7XG5cbmltcG9ydCB7XG4gIGdldE1pbkZTY29yZSxcbiAgdW5jbG9zZWROZWlnYm91cnMsXG4gIGlzT2JqZWN0SW5NYXBLZXlzXG59IGZyb20gJy4vYVN0YXJVdGlscyc7XG5cbmV4cG9ydCBjb25zdCBhU3RhciA9IChzdGFydE5vZGU6YW55LCBmaW5pc2hOb2RlOmFueSwgbWFwOmFueVtdKSA9PiB7XG4gIC8vIHRoZSBzZXQgb2YgY3VycmVudGx5IGRpc2NvdmVyZWQgbm9kZXMgdGhhdCBhcmUgbm90IGV2YWx1YXRlZCB5ZXRcbiAgLy8gSW5pdGlhbGx5IG9ubHkgdGhlIHN0YXJ0IG5vZGUgaXMga25vd25cbiAgbGV0IG9wZW46YW55W10gPSBbXTtcblxuICAvLyB0aGUgc2V0IG9mIG5vZGVzIHRoYXQgYWxyZWFkeSBldmFsdWF0ZWRcbiAgbGV0IGNsb3NlZDphbnlbXSA9IFtdO1xuICBzdGFydE5vZGUuZ1Njb3JlID0gMDtcbiAgc3RhcnROb2RlLmZTY29yZSA9IHN0YXJ0Tm9kZS5nU2NvcmUgKyBoKHN0YXJ0Tm9kZSwgZmluaXNoTm9kZSlcbiAgb3Blbi5wdXNoKHN0YXJ0Tm9kZSk7XG5cbiAgLy8gZm9yIGVhY2ggbm9kZSwgd2hpY2ggbm9kZSBpcyBjYW4gbW9zdCBlZmZpY2llbnRseSBiZSByZWFjaGVkIGZyb21cbiAgLy8gaWYgYSBub2RlIGNhbiBiZSByZWFjaGVkIGZyb20gbWFueSBub2RlcywgY2FtZUZyb20gd2lsbCBldmVudGlhbGx5XG4gIC8vIGNvbnRhaW4gdGhlIG1vc3QgZWZmaWNpZW50IHByZXZpb3VzIHN0ZXBcbiAgbGV0IGZyb20gPSBuZXcgTWFwKCk7XG5cbiAgLy8gRm9yIGVhY2ggbm9kZSwgdGhlIGNvc3Qgb2YgZ2V0dGluZyBmcm9tIHRoZSBzdGFydCBub2RlIHRvIHRoYXQgbm9kZS5cbiAgLy8gbGV0IGdTY29yZSA9IG5ldyBNYXAoKTtcbiAgLy8gbGV0IGZTY29yZSA9IG5ldyBNYXAoKTtcbiAgLy9cbiAgLy8gZ1Njb3JlLnNldChzdGFydE5vZGUsIDApO1xuICAvLyBmU2NvcmUuc2V0KHN0YXJ0Tm9kZSwgZ1Njb3JlLmdldChzdGFydE5vZGUpICsgaChzdGFydE5vZGUsIGZpbmlzaE5vZGUpKTtcbiAgd2hpbGUob3Blbikge1xuICAgIGxldCBjdXJyZW50OmFueSA9IGdldE1pbkZTY29yZShvcGVuKTtcbiAgICAvL2NvbnNvbGUubG9nKCdjdXJyZW50JywgY3VycmVudCk7XG4gICAgaWYoY3VycmVudC54ID09PSBmaW5pc2hOb2RlLnggJiYgY3VycmVudC55ID09PSBmaW5pc2hOb2RlLnkpIHtcbiAgICAgIC8vY29uc29sZS5lcnJvcignUGF0aCcsIHJlY29uc3RydWN0UGF0aChmcm9tLCBjdXJyZW50KSk7XG4gICAgICByZXR1cm4gcmVjb25zdHJ1Y3RQYXRoKGZyb20sIGN1cnJlbnQpO1xuICAgIH1cbiAgICBvcGVuID0gZGVsZXRlT2JqZWN0RnJvbUFycmF5KGN1cnJlbnQsIG9wZW4pO1xuICAgIGNsb3NlZC5wdXNoKGN1cnJlbnQpO1xuICAgIGZvcihsZXQgbmVpZ2hib3VyIG9mIHVuY2xvc2VkTmVpZ2JvdXJzKGN1cnJlbnQsIGNsb3NlZCkpIHtcbiAgICAgIGxldCB0ZW1wRyA9IGN1cnJlbnQuZ1Njb3JlICsgbmVpZ2hib3VyLmRpc3RhbmNlO1xuICAgICAgaWYoIWlzT2JqZWN0SW5BcnJheShuZWlnaGJvdXIsIG9wZW4pIHx8IHRlbXBHIDwgbmVpZ2hib3VyLmdTY29yZSkge1xuICAgICAgICBmcm9tLnNldChuZWlnaGJvdXIsIGN1cnJlbnQpO1xuICAgICAgICBuZWlnaGJvdXIuZ1Njb3JlID0gdGVtcEc7XG4gICAgICAgIG5laWdoYm91ci5mU2NvcmUgPSBuZWlnaGJvdXIuZ1Njb3JlICsgaChuZWlnaGJvdXIsIGZpbmlzaE5vZGUpO1xuICAgICAgfVxuICAgICAgaWYoIWlzT2JqZWN0SW5BcnJheShuZWlnaGJvdXIsIG9wZW4pKSB7IC8vIGNyZWF0ZSBmdW5jdGlvblxuICAgICAgICBsZXQgbm9kZU5laWdoYm91cnMgPSBuZWlnaGJvdXJzKG5laWdoYm91ciwgbWFwKTtcbiAgICAgICAgbmVpZ2hib3VyLm5laWdoYm91cnMgPSBub2RlTmVpZ2hib3VycztcbiAgICAgICAgb3Blbi5wdXNoKG5laWdoYm91cik7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGNvbnNvbGUubG9nKCdmYWlsdXJlJyk7XG4gIHJldHVybiAwOyAvLyBmYWlsdXJlXG59XG5cbmV4cG9ydCBjb25zdCBoID0gKHN0YXJ0Tm9kZTphbnksIGZpbmlzaE5vZGU6YW55KSA9PiB7XG4vL2Z1bmN0aW9uIGhldXJpc3RpYyhub2RlKSA9XG4gIC8vIGR4ID0gYWJzKG5vZGUueCAtIGdvYWwueClcbiAgLy8gZHkgPSBhYnMobm9kZS55IC0gZ29hbC55KVxuICAvLyByZXR1cm4gRCAqIChkeCArIGR5KSArIChEMiAtIDIgKiBEKSAqIG1pbihkeCwgZHkpXG4gIGxldCBEID0gMTA7IC8vIGNvc3Qgb2YgbW92aW5nIGhvcml6b250YWxseVxuICBsZXQgRDIgPSAxNDsgLy8gY29zdCBvZiBtb3ZpbmcgZGlhZ29uYWxseVxuICBsZXQgZHggPSBNYXRoLmFicyhzdGFydE5vZGUueCAtIGZpbmlzaE5vZGUueCk7XG4gIGxldCBkeSA9IE1hdGguYWJzKHN0YXJ0Tm9kZS55IC0gZmluaXNoTm9kZS55KTtcbiAgcmV0dXJuIEQgKiAoZHggKyBkeSkgKyAoRDIgLSAyICogRCkgKiBNYXRoLm1pbihkeCwgZHkpO1xufVxuXG5cblxuZXhwb3J0IGNvbnN0IHJlY29uc3RydWN0UGF0aCA9IChmcm9tOmFueSwgY3VycmVudDphbnkpID0+IHtcbiAgLy8gZnVuY3Rpb24gcmVjb25zdHJ1Y3RfcGF0aChjYW1lRnJvbSwgY3VycmVudClcbiAgLy8gICB0b3RhbF9wYXRoIDo9IFtjdXJyZW50XVxuICAvLyAgIHdoaWxlIGN1cnJlbnQgaW4gY2FtZUZyb20uS2V5czpcbiAgLy8gICAgICAgY3VycmVudCA6PSBjYW1lRnJvbVtjdXJyZW50XVxuICAvLyAgICAgICB0b3RhbF9wYXRoLmFwcGVuZChjdXJyZW50KVxuICAvLyAgIHJldHVybiB0b3RhbF9wYXRoXG4gIGxldCByZXZlcnNlUGF0aDphbnlbXSA9IFtjdXJyZW50XTtcbiAgbGV0IHRvdGFsUGF0aDphbnlbXSA9IFtdO1xuICB3aGlsZShpc09iamVjdEluTWFwS2V5cyhjdXJyZW50LCBmcm9tKSkge1xuICAgIGN1cnJlbnQgPSBmcm9tLmdldChjdXJyZW50KTtcbiAgICByZXZlcnNlUGF0aC5wdXNoKGN1cnJlbnQpO1xuICB9XG4gIGZvcihsZXQgaSA9IHJldmVyc2VQYXRoLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgdG90YWxQYXRoLnB1c2gocmV2ZXJzZVBhdGhbaV0pO1xuICB9XG4gIHJldHVybiB0b3RhbFBhdGg7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcGF0aC9BU3Rhci50cyIsImltcG9ydCB7ZHJhd1dhcnJpb3J9IGZyb20gJy4vd2FycmlvckFjdGlvbic7XG5pbXBvcnQge3dhcnJpb3JzfSBmcm9tICcuLi9zdG9yZS93YXJyaW9yU3RvcmUnO1xuaW1wb3J0IHtcbiAgbWFwLFxuICBjcmVhdGVXYXJyaW9yT2JzdGFjbGUsXG4gIGFkZE5laWdoYm91cnNcbn0gZnJvbSAnLi4vbWFwL2NyZWF0ZU1hcCc7XG5pbXBvcnQge2dldE5vZGVGcm9tTWFwfSBmcm9tICcuLi9wYXRoL2RyYXdQYXRoJztcbmltcG9ydCB7XG4gIGdyaWRTaXplLFxuICBjdHgsXG4gIFdJRFRILFxuICBIRUlHSFRcbn0gZnJvbSAnLi4vbWFwL21hcENvbmZpZyc7XG5pbXBvcnQge2FTdGFyfSBmcm9tICcuLi9wYXRoL0FTdGFyJztcbmltcG9ydCB7ZGVsZXRlT2JqZWN0RnJvbUFycmF5LGlzT2JqZWN0SW5BcnJheX0gZnJvbSAnLi4vdXRpbHMvb2JqVXRpbHMnO1xuXG5leHBvcnQgbGV0IHVwZGF0ZVdhcnJpb3IgPSAod2FycmlvcjphbnksIHBhdGg6YW55W10sIGk6bnVtYmVyPTAsIGN1cnJlbnRNb3ZlVG9YOm51bWJlciwgY3VycmVudE1vdmVUb1k6bnVtYmVyKSA9PiB7XG4gIC8vY29uc29sZS5sb2coJ3VwZGF0ZVdhcnJpb3InKTtcbiAgd2Fycmlvci5zZXRJc01vdmluZ1RvVHJ1ZSgpO1xuICBpZihjdXJyZW50TW92ZVRvWCAhPT0gd2Fycmlvci5tb3ZlVG9Ob2RlLnggfHwgY3VycmVudE1vdmVUb1kgIT09IHdhcnJpb3IubW92ZVRvTm9kZS55KSB7XG4gICAgY29uc29sZS5sb2coJ25ldyBkZXN0aW5hdGlvbiBoYXMgYmVlbiBjaG9zZW4nKTtcbiAgICB3YXJyaW9yLm1vdmVUb05vZGUueCA9IHdhcnJpb3IueDtcbiAgICB3YXJyaW9yLm1vdmVUb05vZGUueSA9IHdhcnJpb3IueTtcbiAgICB3YXJyaW9yLnNldElzTW92aW5nVG9GYWxzZSgpO1xuICAgIGNvbnNvbGUuZXJyb3IoJ25ldyBkZXN0aW5hdGlvbjsgbm9kZXt4OiA5NjAsIHk6IDQ4MH0gaW4gbWFwOicsIGlzT2JqZWN0SW5BcnJheSh7eDogOTYwLCB5OiA0ODB9LCBtYXApKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBsZXQgdXBkYXRlZFBhdGggPSBPYmplY3QuYXNzaWduKFtdLCBwYXRoKTtcbiAgbGV0IG5vZGUgPSB1cGRhdGVkUGF0aFtpXTsgLy8gZ2V0IG5leHQgbm9kZVxuXG4gIC8vIGFsbHkgd2FycmlvciBpcyBvbiB0aGUgZGVzdGluYXRpb24gcG9zaXRpb25cbiAgLy8gY3VycmVudFdhcnJpb3Igc2hvdWxkIHN0b3AgbW92aW5nXG4gIGlmKGNoZWNrT3RoZXJXYXJyaW9yc1Bvc2l0aW9uKHdhcnJpb3JzLCB3YXJyaW9yLCBub2RlLngsIG5vZGUueSkgJiYgaSA9PT0gdXBkYXRlZFBhdGgubGVuZ3RoIC0gMSkge1xuICAgIHdhcnJpb3IubW92ZVRvTm9kZS54ID0gbm9kZS54OyAvLyBzZXQgbW92ZVRvTm9kZSB2YWx1ZSB0byBjdXJyZW50IHdhcnJpb3IgcG9zaXRpb25cbiAgICB3YXJyaW9yLm1vdmVUb05vZGUueSA9IG5vZGUueTtcbiAgICB3YXJyaW9yLnNldElzTW92aW5nVG9GYWxzZSgpO1xuICAgIGNvbnNvbGUuZXJyb3IoJ2FsbHkgdW5pdCBpbiBkZXN0IHBvc2l0aW9uOyBub2Rle3g6IDk2MCwgeTogNDgwfSBpbiBtYXA6JywgaXNPYmplY3RJbkFycmF5KHt4OiA5NjAsIHk6IDQ4MH0sIG1hcCkpO1xuICAgIHJldHVybjtcbiAgfVxuICBpZihjaGVja090aGVyV2FycmlvcnNQb3NpdGlvbih3YXJyaW9ycywgd2Fycmlvciwgbm9kZS54LCBub2RlLnkpKSB7XG5cbiAgICBpZihpc0FsbHlVbml0SXNPblBvc2l0aW9uKHdhcnJpb3JzLCB3YXJyaW9yLCBub2RlLngsIG5vZGUueSkpIHtcbiAgICAgIGNvbnNvbGUubG9nKGBhbGx5J3Mgd2FycmlvciBpcyBvbiBwb3NpdGlvbmApO1xuICAgICAgd2Fycmlvci5zZXRJc01vdmluZ1RvRmFsc2UoKTtcbiAgICAgIHdhcnJpb3Iuc2V0WCh3YXJyaW9yLngpO1xuICAgICAgd2Fycmlvci5zZXRZKHdhcnJpb3IueSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIHVuaXQgaGFzIGFub3RoZXIgYWxsaWVzJyB1bml0IG9uIGl0cyB3YXlcbiAgICBjb25zb2xlLmVycm9yKCd1cGRhdGVVbml0OiBhbm90aGVyIHVuaXQgaXMgb24gdGhlIHdheSB4Oicsbm9kZS54LCd5OicsIG5vZGUueSk7XG4gICAgbGV0IHVwZGF0ZWRNYXAgPSBPYmplY3QuYXNzaWduKFtdLCBtYXApO1xuICAgIGNvbnNvbGUuZXJyb3IoJ2NyZWF0ZVdhcnJpb3JPYnN0YWNsZSB4OicsIG5vZGUueCwgJ3k6Jywgbm9kZS55KTtcbiAgICB1cGRhdGVkTWFwID0gY3JlYXRlV2Fycmlvck9ic3RhY2xlKG5vZGUueCwgbm9kZS55LCB1cGRhdGVkTWFwKTtcbiAgICB1cGRhdGVkTWFwID0gYWRkTmVpZ2hib3Vycyh1cGRhdGVkTWFwKTtcbiAgICBjb25zb2xlLmxvZygnZGVsZXRlZCBOb2RlJywgbm9kZSk7XG4gICAgY29uc29sZS5sb2coJ3VwZGF0ZWRNYXAnLCB1cGRhdGVkTWFwKTtcbiAgICBjb25zb2xlLmxvZygnbm9kZScsIG5vZGUpO1xuICAgIGxldCBzdGFydE5vZGUgPSBnZXROb2RlRnJvbU1hcCh3YXJyaW9yLngsIHdhcnJpb3IueSwgdXBkYXRlZE1hcCk7XG4gICAgbGV0IGZpbmlzaE5vZGUgPSBnZXROb2RlRnJvbU1hcChjdXJyZW50TW92ZVRvWCwgY3VycmVudE1vdmVUb1ksIHVwZGF0ZWRNYXApO1xuICAgIGNvbnNvbGUuZXJyb3IoJ25vZGV7eDogOTYwLCB5OiA0ODB9IGluIG1hcDonLCBpc09iamVjdEluQXJyYXkoe3g6IDk2MCwgeTogNDgwfSwgbWFwKSk7XG4gICAgbGV0IG5ld1BhdGg6YW55ID0gYVN0YXIoc3RhcnROb2RlLCBmaW5pc2hOb2RlLCB1cGRhdGVkTWFwKTtcblxuICAgIGNvbnNvbGUuZXJyb3IoJ25ld1BhdGgnLCBuZXdQYXRoKTtcbiAgICB1cGRhdGVXYXJyaW9yKHdhcnJpb3IsIG5ld1BhdGgsIDAsIGN1cnJlbnRNb3ZlVG9YLCBjdXJyZW50TW92ZVRvWSk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgbGV0IG5vZGVUb0NsZWFyID0gbm9kZTs7XG4gIGlmKGkgIT09IDApIHtcbiAgICBub2RlVG9DbGVhciA9IHVwZGF0ZWRQYXRoW2kgLSAxXTtcbiAgfVxuICBtb3ZlVG9OZXh0Tm9kZSh3YXJyaW9yLCBub2RlLCBub2RlVG9DbGVhcik7XG4gIGkrKztcblxuICBpZihpICE9PSB1cGRhdGVkUGF0aC5sZW5ndGgpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHVwZGF0ZVdhcnJpb3Iod2FycmlvciwgdXBkYXRlZFBhdGgsIGksIGN1cnJlbnRNb3ZlVG9YLCBjdXJyZW50TW92ZVRvWSk7XG4gICAgfSwgNDAwKTtcbiAgfSBlbHNlIHtcbiAgICB3YXJyaW9yLm1vdmVUb05vZGUueCA9IHdhcnJpb3IueDsgLy8gc2V0IG1vdmVUb05vZGUgdmFsdWUgdG8gY3VycmVudCB3YXJyaW9yIHBvc2l0aW9uXG4gICAgd2Fycmlvci5tb3ZlVG9Ob2RlLnkgPSB3YXJyaW9yLnk7XG4gICAgd2Fycmlvci5zZXRJc01vdmluZ1RvRmFsc2UoKTtcbiAgICByZXR1cm47XG4gIH1cbn1cblxuLy8gY2hlY2sgaWYgbmV4dE5vZGUgaXMgb2NjdXBpZWQgYnkgb3RoZXIgd2FycmlvclxuZXhwb3J0IGNvbnN0IGNoZWNrT3RoZXJXYXJyaW9yc1Bvc2l0aW9uID0gKHdhcnJpb3JzOmFueVtdLCBjdXJyZW50V2FycmlvcjphbnksIHg6bnVtYmVyLCB5Om51bWJlcikgPT4ge1xuICBsZXQgdXBkYXRlZFdhcnJpb3JzID0gZGVsZXRlT2JqZWN0RnJvbUFycmF5KGN1cnJlbnRXYXJyaW9yLCB3YXJyaW9ycyk7XG4gIGZvcihsZXQgd2FycmlvciBvZiB1cGRhdGVkV2FycmlvcnMpIHtcbiAgICBpZih3YXJyaW9yLnggPT09IHggJiYgd2Fycmlvci55ID09PSB5KSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vLyBjaGVjayBpZiBuZXh0Tm9kZSBpcyBvY2N1cGllZCBieSBhbGx5J3Mgd2FycmlvclxuLy8gdGhhdCBpcyBub3QgbW92aW5nXG5leHBvcnQgY29uc3QgaXNBbGx5VW5pdElzT25Qb3NpdGlvbiA9ICh3YXJyaW9yczphbnlbXSwgY3VycmVudFdhcnJpb3I6YW55LCB4Om51bWJlciwgeTpudW1iZXIpID0+IHtcbiAgbGV0IHVwZGF0ZWRXYXJyaW9ycyA9IGRlbGV0ZU9iamVjdEZyb21BcnJheShjdXJyZW50V2Fycmlvciwgd2FycmlvcnMpO1xuICBmb3IobGV0IHdhcnJpb3Igb2YgdXBkYXRlZFdhcnJpb3JzKSB7XG4gICAgaWYod2Fycmlvci54ID09PSB4ICYmIHdhcnJpb3IueSA9PT0geSkge1xuICAgICAgaWYod2Fycmlvci5uYW1lID09PSBjdXJyZW50V2Fycmlvci5uYW1lICYmIHdhcnJpb3IuaXNNb3ZpbmcgPT09IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbmV4cG9ydCBjb25zdCBtb3ZlVG9OZXh0Tm9kZSA9ICh3YXJyaW9yOmFueSwgbm9kZTphbnksIHByZXZpb3VzTm9kZTphbnkpID0+IHtcbiAgY3R4LmNsZWFyUmVjdChwcmV2aW91c05vZGUueCwgcHJldmlvdXNOb2RlLnksIGdyaWRTaXplLCBncmlkU2l6ZSk7XG4gIHdhcnJpb3Iuc2V0WChub2RlLngpOyAvLyBjYWxjdWxhdGUgY2VudGVyIG9mIHRoZSBjdXJyZW50IG5vZGVcbiAgd2Fycmlvci5zZXRZKG5vZGUueSk7XG4gIGRyYXdXYXJyaW9yKHdhcnJpb3IpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3dhcnJpb3Ivd2Fycmlvck1vdmVtZW50LnRzIiwiZXhwb3J0IGNvbnN0IHVuaXRzOmFueVtdID0gW107XG5leHBvcnQgbGV0IGN1cnJlbnRseUNob3NlblVuaXQ6YW55ID0gbnVsbDtcblxuZXhwb3J0IGNvbnN0IGFzc2lnbkN1cnJlbnRseUNob3NlblVuaXQgPSAodW5pdDphbnkpID0+IHtcbiAgLy8gY2hlY2sgdW5pdFxuICBpZih1bml0KSB7XG4gICAgICBjdXJyZW50bHlDaG9zZW5Vbml0ID0gdW5pdDtcbiAgfSBlbHNlIHtcbiAgICBjdXJyZW50bHlDaG9zZW5Vbml0ID0gbnVsbDtcbiAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc3RvcmUvdW5pdFN0b3JlLnRzIiwiZXhwb3J0IGNvbnN0IGdldENsb3Nlc3RXYXJyaW9yVG9EZXN0aW5hdGlvbiA9ICh1bml0OmFueSwgZGVzdFg6bnVtYmVyLCBkZXN0WTpudW1iZXIpID0+IHtcbiAgbGV0IGNsb3Nlc3QgPSAwO1xuICBsZXQgZGlmZmVyZW5jZTpudW1iZXI7XG4gIGxldCB3YXJyaW9ycyA9IHVuaXQud2FycmlvcnM7XG4gIGZvcihsZXQgaSA9IDE7IGkgPD0gd2FycmlvcnMubGVuZ3RoIC0gMTsgKytpKSB7XG4gICAgbGV0IGN1cnJlbnRVbml0RGlmZmVyZW5jZSA9IE1hdGguc3FydChNYXRoLnBvdyhNYXRoLmFicyh3YXJyaW9yc1tpXS54IC0gZGVzdFgpLCAyKSArIE1hdGgucG93KE1hdGguYWJzKHdhcnJpb3JzW2ldLnkgLSBkZXN0WSksIDIpKTtcbiAgICBsZXQgcHJldmlvdXNVbml0RGlmZmVyZW5jZSA9IE1hdGguc3FydChNYXRoLnBvdyhNYXRoLmFicyh3YXJyaW9yc1tjbG9zZXN0XS54IC0gZGVzdFgpLCAyKSArIE1hdGgucG93KE1hdGguYWJzKHdhcnJpb3JzW2Nsb3Nlc3RdLnkgLSBkZXN0WSksIDIpKTtcblxuICAgIGlmKGN1cnJlbnRVbml0RGlmZmVyZW5jZSA8IHByZXZpb3VzVW5pdERpZmZlcmVuY2UpIHtcbiAgICAgIGNsb3Nlc3QgPSBpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gd2FycmlvcnNbY2xvc2VzdF07XG59XG5cbmV4cG9ydCBjb25zdCBnZXRDbG9zZXN0V2FycmlvclRvRGVzdGluYXRpb25JbkFycmF5ID0gKHdhcnJpb3JzOmFueVtdLCBkZXN0WDpudW1iZXIsIGRlc3RZOm51bWJlcikgPT4ge1xuICBsZXQgY2xvc2VzdCA9IDA7XG4gIGxldCBkaWZmZXJlbmNlOm51bWJlcjtcbiAgZm9yKGxldCBpID0gMTsgaSA8PSB3YXJyaW9ycy5sZW5ndGggLSAxOyArK2kpIHtcbiAgICBsZXQgY3VycmVudFVuaXREaWZmZXJlbmNlID0gTWF0aC5zcXJ0KE1hdGgucG93KE1hdGguYWJzKHdhcnJpb3JzW2ldLnggLSBkZXN0WCksIDIpICsgTWF0aC5wb3coTWF0aC5hYnMod2FycmlvcnNbaV0ueSAtIGRlc3RZKSwgMikpO1xuICAgIGxldCBwcmV2aW91c1VuaXREaWZmZXJlbmNlID0gTWF0aC5zcXJ0KE1hdGgucG93KE1hdGguYWJzKHdhcnJpb3JzW2Nsb3Nlc3RdLnggLSBkZXN0WCksIDIpICsgTWF0aC5wb3coTWF0aC5hYnMod2FycmlvcnNbY2xvc2VzdF0ueSAtIGRlc3RZKSwgMikpO1xuXG4gICAgaWYoY3VycmVudFVuaXREaWZmZXJlbmNlIDwgcHJldmlvdXNVbml0RGlmZmVyZW5jZSkge1xuICAgICAgY2xvc2VzdCA9IGk7XG4gICAgfVxuICB9XG4gIHJldHVybiB3YXJyaW9yc1tjbG9zZXN0XTtcbn1cblxuZXhwb3J0IGNvbnN0IGdldENlbnRyYWxXYXJyaW9ySW5Vbml0ID0gKHVuaXQ6YW55KSA9PiB7XG4gIGxldCBjZW50cmFsUm93ID0gTWF0aC5yb3VuZCh1bml0LnJvdyAvIDIpO1xuICBsZXQgY2VudHJhbENvbCA9IE1hdGgucm91bmQodW5pdC5jb2wgLyAyKTtcbiAgZm9yKGxldCB3YXJyaW9yIG9mIHVuaXQud2FycmlvcnMpIHtcbiAgICBpZih3YXJyaW9yLmNvbEluVW5pdCA9PT0gY2VudHJhbENvbCAmJiB3YXJyaW9yLnJvd0luVW5pdCA9PT0gY2VudHJhbFJvdykge1xuICAgICAgcmV0dXJuIHdhcnJpb3I7XG4gICAgfVxuICB9XG59XG5cbiAvLyBnZXQgdW5pdCdzIHBvc2l0aW9uIGFuZCBkZXN0aW5hdGlvbiBwb3NpdGlvbiBhbmQgcmV0dXJuIGFuZ2xlIGluIHJhZGlhbnMgYmV0d2VlbiB1bml0IGFuZCBkZXN0aW5hdGlvblxuZXhwb3J0IGNvbnN0IGNhbGNEZXN0aW5hdGlvbkFuZ2xlSW5EZWdyZWVzID0gKHVuaXQ6YW55LCBkZXN0WDpudW1iZXIsIGRlc3RZOm51bWJlcik6bnVtYmVyID0+IHtcbiAgLy9jb25zb2xlLmVycm9yKCdjYWxjRGVzdGluYXRpb25BbmdsZUluRGVncmVlcycpO1xuICBsZXQgd2FycmlvciA9IGdldENsb3Nlc3RXYXJyaW9yVG9EZXN0aW5hdGlvbih1bml0LCBkZXN0WCwgZGVzdFkpO1xuICBsZXQgYW5nbGU7XG4gIGxldCBhID0gTWF0aC5hYnMoZGVzdFkgLSB3YXJyaW9yLnkpO1xuICBsZXQgYiA9IE1hdGguYWJzKGRlc3RYIC0gd2Fycmlvci54KTtcbiAgbGV0IGFuZ2xlSW5SYWRpYW4gPSBNYXRoLmF0YW4oYSAvIGIpO1xuICAvLyBjaGVjayBxdWF0ZXIgb2YgdGhlIGNpcmNsZVxuICBsZXQgZGVncmVlID0gIGFuZ2xlSW5SYWRpYW4gKiAoMTgwIC8gTWF0aC5QSSk7IC8vIGNvbnZlcnQgcmFkaWFucyBpbnRvIGRlZ3JlZVxuICBsZXQgcXVhdGVyID0gZ2V0UXVhdGVyKHdhcnJpb3IueCwgd2Fycmlvci55LCBkZXN0WCwgZGVzdFkpOyAvLyBjaGVjayBxdWF0ZXJcbiAgaWYocXVhdGVyID09PSAxKSBhbmdsZSA9IGRlZ3JlZTtcbiAgaWYocXVhdGVyID09PSAyKSBhbmdsZSA9IDkwICsgKDkwIC0gZGVncmVlKTtcbiAgZWxzZSBpZihxdWF0ZXIgPT09IDMpIGFuZ2xlID0gMTgwICsgZGVncmVlO1xuICBlbHNlIGlmKHF1YXRlciA9PT0gNCkgYW5nbGUgPSAyNzAgKyAoOTAgLSBkZWdyZWUpO1xuICByZXR1cm4gTWF0aC5yb3VuZChhbmdsZSk7XG59XG5cbmV4cG9ydCBjb25zdCBnZXRRdWF0ZXIgPSAodW5pdFg6bnVtYmVyLCB1bml0WTpudW1iZXIsIGRlc3RYOm51bWJlciwgZGVzdFk6bnVtYmVyKTpudW1iZXIgPT4ge1xuICAvL2NvbnNvbGUuZXJyb3IoJ2dldFF1YXRlcicpO1xuICBsZXQgcXVhdGVyO1xuICBpZihkZXN0WCA+PSB1bml0WCAmJiBkZXN0WSA8IHVuaXRZKSB7XG4gICAgcXVhdGVyID0gMTtcbiAgfVxuICBlbHNlIGlmKGRlc3RYIDwgdW5pdFggJiYgZGVzdFkgPD0gdW5pdFkpIHtcbiAgICBxdWF0ZXIgPSAyO1xuICB9XG4gIGVsc2UgaWYoZGVzdFggPD0gdW5pdFggJiYgZGVzdFkgPiB1bml0WSkge1xuICAgIHF1YXRlciA9IDM7XG4gIH1cbiAgZWxzZSBpZihkZXN0WCA+IHVuaXRYICYmIGRlc3RZID49IHVuaXRZKSB7XG4gICAgcXVhdGVyID0gNDtcbiAgfVxuICByZXR1cm4gcXVhdGVyO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3VuaXQvdW5pdFV0aWxzLnRzIiwiaW1wb3J0IHtcbiAgY2FudmFzLFxuICBjdHgsXG4gIFdJRFRILFxuICBIRUlHSFQsXG4gIGdyaWRTaXplXG59IGZyb20gJy4vbWFwL21hcENvbmZpZyc7XG5cbmltcG9ydCB7ZHJhd0dyaWR9IGZyb20gJy4vbWFwL2RyYXdHcmlkJztcbmltcG9ydCB7XG4gIGFkZE5laWdoYm91cnMsXG4gIGNyZWF0ZU5vZGVzLFxuICBtYXBcbn0gZnJvbSAnLi9tYXAvY3JlYXRlTWFwJztcbmltcG9ydCB7c2hvd09ic3RhY2xlc30gZnJvbSAnLi9tYXAvbWFwVXRpbHMnO1xuaW1wb3J0IHtoLCBhU3Rhcn0gZnJvbSAnLi9wYXRoL0FTdGFyJztcbmltcG9ydCB7XG4gIGRyYXdQYXRoLFxuICBnZXROb2RlRnJvbU1hcFxufSBmcm9tICcuL3BhdGgvZHJhd1BhdGgnO1xuXG5pbXBvcnQgV2FycmlvciBmcm9tICcuL3dhcnJpb3IvV2Fycmlvcic7XG5pbXBvcnQge3dhcnJpb3JzLCBjdXJyZW50bHlDaG9zZW5XYXJyaW9yfSBmcm9tICcuL3N0b3JlL3dhcnJpb3JTdG9yZSc7XG5pbXBvcnQge1xuICBvbkNob29zZVdhcnJpb3IsXG4gIGNyZWF0ZVdhcnJpb3IsXG4gIGFzc2lnbldhcnJpb3JNb3ZlVG9Qb3NpdGlvbixcbn0gZnJvbSAnLi93YXJyaW9yL3dhcnJpb3JBY3Rpb24nO1xuaW1wb3J0IHt1cGRhdGVXYXJyaW9yfSBmcm9tICcuL3dhcnJpb3Ivd2Fycmlvck1vdmVtZW50JztcblxuaW1wb3J0IHtcbiAgY3JlYXRlVW5pdCxcbiAgb25DaG9vc2VVbml0LFxuICBvbkNoYW5nZVdhcnJpb3JQb3NpdGlvbkluVW5pdFxufSBmcm9tICcuL3VuaXQvdW5pdEFjdGlvbnMnO1xuaW1wb3J0IHtcbiAgdW5pdHMsXG4gIGN1cnJlbnRseUNob3NlblVuaXRcbn0gZnJvbSAnLi9zdG9yZS91bml0U3RvcmUnO1xuXG5pbXBvcnQge1xuICBjYWxjRGVzdGluYXRpb25BbmdsZUluRGVncmVlc1xufSBmcm9tICcuL3VuaXQvdW5pdFV0aWxzJztcblxuaW1wb3J0IHttb3ZlVG9Qb3NpdGlvbn0gZnJvbSAnLi91bml0L3VuaXRNb3ZlbWVudCc7XG5cbmxldCB3YXJyaW9yID0gY3JlYXRlV2FycmlvcignYmFyYmFyaWFuJywgODAsIDE2MCwgNSk7XG5jcmVhdGVVbml0KCd0ZXN0VW5pdCcsIDYsIDI0MCwgNDIwKTtcblxuZHJhd0dyaWQoKTtcbmNvbnNvbGUubG9nKCdtYXAnLCBtYXApO1xuY29uc29sZS5sb2coJ2N1cnJlbnRseUNob3NlbldhcnJpb3InLCBjdXJyZW50bHlDaG9zZW5XYXJyaW9yKTtcblxuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgY29uc29sZS5lcnJvcignQ2xpY2snKTtcbiAgbGV0IHggPSBlLm9mZnNldFg7IC8vIGdldCBYXG4gIGxldCB5ID0gZS5vZmZzZXRZOyAvLyBnZXQgWVxuICBjb25zb2xlLmxvZygnUG9zaXRpb24geCcsIGUub2Zmc2V0WCk7IC8vIGdldCBYXG4gIGNvbnNvbGUubG9nKCdQb3NpdGlvbiB5JywgZS5vZmZzZXRZKTsgLy8gZ2V0IFlcbiAgb25DaG9vc2VXYXJyaW9yKHdhcnJpb3JzLCB4LCB5KTtcbiAgb25DaG9vc2VVbml0KHVuaXRzLCBjdXJyZW50bHlDaG9zZW5XYXJyaW9yKTtcbiAgY29uc29sZS5sb2coJ2N1cnJlbnRseUNob3NlbldhcnJpb3InLCBjdXJyZW50bHlDaG9zZW5XYXJyaW9yKTtcbn0pO1xuXG4vLyBzZXQgb25DbGlja0xpc3RlbmVyIGZvciByaWdodCBtb3VzZSBldmVudFxuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ2NvbnRleHRtZW51JywgKGUpID0+IHtcbiAgY29uc29sZS5lcnJvcignUmlnaHQgTW91c2UgQ2xpY2snKTtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBsZXQgeCA9IGUub2Zmc2V0WDsgLy8gZ2V0IFhcbiAgbGV0IHkgPSBlLm9mZnNldFk7IC8vIGdldCBZXG4gIGxldCB1cGRhdGVkTWFwID0gT2JqZWN0LmFzc2lnbihbXSwgbWFwKTtcbiAgbGV0IHN0YXJ0Tm9kZSA9IGdldE5vZGVGcm9tTWFwKGN1cnJlbnRseUNob3NlblVuaXQuY29tbWFuZGVyUG9zaXRpb25YLCBjdXJyZW50bHlDaG9zZW5Vbml0LmNvbW1hbmRlclBvc2l0aW9uWSwgdXBkYXRlZE1hcCk7XG4gIGxldCBmaW5pc2hOb2RlID0gZ2V0Tm9kZUZyb21NYXAoeCwgeSwgbWFwKTtcbiAgY29uc29sZS5lcnJvcignc3RhcnROb2RlJywgc3RhcnROb2RlKTtcbiAgY29uc29sZS5lcnJvcignZmluaXNoTm9kZScsIGZpbmlzaE5vZGUpO1xuICBhc3NpZ25XYXJyaW9yTW92ZVRvUG9zaXRpb24oY3VycmVudGx5Q2hvc2VuV2FycmlvciwgeCwgeSk7XG4gIG1vdmVUb1Bvc2l0aW9uKGN1cnJlbnRseUNob3NlblVuaXQsIGZpbmlzaE5vZGUpO1xuICBjb25zb2xlLmVycm9yKCdBbmdsZScsIGNhbGNEZXN0aW5hdGlvbkFuZ2xlSW5EZWdyZWVzKGN1cnJlbnRseUNob3NlblVuaXQsIHgsIHkpKTtcbiAgLy8gbGV0IHBhdGg6YW55ID0gYVN0YXIoc3RhcnROb2RlLCBmaW5pc2hOb2RlKTtcbiAgLy8gaWYoY3VycmVudGx5Q2hvc2VuVW5pdCkge1xuICAvLyAgb25DaGFuZ2VXYXJyaW9yUG9zaXRpb25JblVuaXQoY3VycmVudGx5Q2hvc2VuVW5pdCxwYXRoLCAwLCB4LCB5KTtcbiAgLy8gfVxuXG4gIC8vZHJhd1BhdGgocGF0aCk7XG59KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9nYW1lLnRzIiwiaW1wb3J0IHtcbiAgY2FudmFzLFxuICBjdHgsXG4gIFdJRFRILFxuICBIRUlHSFQsXG4gIGdyaWRTaXplXG59IGZyb20gJy4vbWFwQ29uZmlnJztcblxuZXhwb3J0IGNvbnN0IGRyYXdHcmlkID0gKCkgPT4ge1xuICBmb3IobGV0IHkgPSAwOyB5IDw9IEhFSUdIVDsgeSs9IGdyaWRTaXplKSB7XG4gICAgZm9yKGxldCB4ID0gMDsgeCA8PSBXSURUSDsgeCs9IGdyaWRTaXplKSB7XG4gICAgICBjdHguc3Ryb2tlUmVjdCh4LCB5LCBncmlkU2l6ZSwgZ3JpZFNpemUpO1xuICAgIH1cbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21hcC9kcmF3R3JpZC50cyIsImltcG9ydCB7Z3JpZFNpemV9IGZyb20gJy4uL21hcC9tYXBDb25maWcnO1xuXG5jbGFzcyBXYXJyaW9yIHtcbiAgbmFtZTogc3RyaW5nO1xuICB4OiBudW1iZXI7XG4gIHk6IG51bWJlcjtcbiAgY2VudGVyWDogbnVtYmVyO1xuICBjZW50ZXJZOiBudW1iZXI7XG4gIHJhZGl1czogbnVtYmVyO1xuICBtb3ZlVG9Ob2RlWDogbnVtYmVyO1xuICBtb3ZlVG9Ob2RlWTogbnVtYmVyO1xuICBpc0N1cnJlbnRseUNob3NlbjogYm9vbGVhbiA9IGZhbHNlO1xuICBwb3NpdGlvbkluVW5pdDogbnVtYmVyO1xuICByb3dJblVuaXQ6IG51bWJlcjtcbiAgY29sSW5Vbml0OiBudW1iZXI7XG4gIG1vdmVUb05vZGU6IGFueTtcbiAgaXNNb3Zpbmc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihuYW1lOnN0cmluZywgeDpudW1iZXIsIHk6bnVtYmVyLCByYWRpdXM6bnVtYmVyKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gICAgdGhpcy5yYWRpdXMgPSByYWRpdXM7XG4gICAgdGhpcy5jZW50ZXJYID0geCArIChncmlkU2l6ZSAvIDIpO1xuICAgIHRoaXMuY2VudGVyWSA9IHkgKyAoZ3JpZFNpemUgLyAyKTtcbiAgfVxuXG4gIHNldFgoeDpudW1iZXIpIHtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMuY2VudGVyWCA9IHggKyAoZ3JpZFNpemUgLyAyKTtcbiAgfVxuXG4gIHNldFkoeTpudW1iZXIpIHtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHRoaXMuY2VudGVyWSA9IHkgKyAoZ3JpZFNpemUgLyAyKTtcbiAgfVxuXG4gIGFzc2lnblBvc2l0aW9uKG5ld1Bvc2l0aW9uOiBudW1iZXIpIHtcbiAgICB0aGlzLnBvc2l0aW9uSW5Vbml0ID0gbmV3UG9zaXRpb247XG4gIH1cblxuICBzZXRJc01vdmluZ1RvVHJ1ZSgpIHtcbiAgICB0aGlzLmlzTW92aW5nID0gdHJ1ZTtcbiAgfVxuXG4gIHNldElzTW92aW5nVG9GYWxzZSgpIHtcbiAgICB0aGlzLmlzTW92aW5nID0gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgV2FycmlvcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy93YXJyaW9yL1dhcnJpb3IudHMiLCJpbXBvcnQge2NyZWF0ZVdhcnJpb3J9IGZyb20gJy4uL3dhcnJpb3Ivd2FycmlvckFjdGlvbic7XG5pbXBvcnQge2dyaWRTaXplfSBmcm9tICcuLi9tYXAvbWFwQ29uZmlnJztcbmltcG9ydCB7dXBkYXRlV2Fycmlvcn0gZnJvbSAnLi4vd2Fycmlvci93YXJyaW9yTW92ZW1lbnQnO1xuaW1wb3J0IHttYXB9IGZyb20gJy4uL21hcC9jcmVhdGVNYXAnXG5pbXBvcnQgVW5pdCBmcm9tICcuL1VuaXQnO1xuXG5pbXBvcnQge1xuICB1bml0cyxcbiAgY3VycmVudGx5Q2hvc2VuVW5pdCxcbiAgYXNzaWduQ3VycmVudGx5Q2hvc2VuVW5pdFxufSBmcm9tICcuLi9zdG9yZS91bml0U3RvcmUnO1xuXG5pbXBvcnQge1xuICBhc3NpZ25XYXJyaW9yTW92ZVRvUG9zaXRpb24sXG59IGZyb20gJy4uL3dhcnJpb3Ivd2FycmlvckFjdGlvbic7XG5cbmltcG9ydCB7XG4gIGdldE5vZGVGcm9tTWFwXG59IGZyb20gJy4uL3BhdGgvZHJhd1BhdGgnO1xuXG5pbXBvcnQge2FTdGFyfSBmcm9tICcuLi9wYXRoL0FTdGFyJztcblxuZXhwb3J0IGNvbnN0IG9uQ2hhbmdlV2FycmlvclBvc2l0aW9uSW5Vbml0ID0gKHVuaXQ6YW55LCBwYXRoOmFueVtdLCBpOm51bWJlcj0wLCBjdXJyZW50TW92ZVRvWDpudW1iZXIsIGN1cnJlbnRNb3ZlVG9ZOm51bWJlcikgPT4ge1xuICBsZXQgcm93ID0gdW5pdC5xdWFudGl0eSAvIDI7XG4gIGxldCBjb2wgPSBNYXRoLmNlaWwodW5pdC5xdWFudGl0eSAvIHJvdyk7XG4gIGZvcihsZXQgd2FycmlvciBvZiB1bml0LndhcnJpb3JzKSB7XG4gICAgbGV0IHN0YXJ0Tm9kZSA9IGdldE5vZGVGcm9tTWFwKGN1cnJlbnRseUNob3NlblVuaXQuY29tbWFuZGVyUG9zaXRpb25YLCBjdXJyZW50bHlDaG9zZW5Vbml0LmNvbW1hbmRlclBvc2l0aW9uWSwgbWFwKTtcbiAgICBsZXQgZmluaXNoTm9kZSA9IGdldE5vZGVGcm9tTWFwKGN1cnJlbnRNb3ZlVG9YLCBjdXJyZW50TW92ZVRvWSwgbWFwKTtcbiAgICBsZXQgcGF0aDphbnkgPSBhU3RhcihzdGFydE5vZGUsIGZpbmlzaE5vZGUsIG1hcCk7XG4gICAgYXNzaWduV2Fycmlvck1vdmVUb1Bvc2l0aW9uKHdhcnJpb3IsIGN1cnJlbnRNb3ZlVG9YLCBjdXJyZW50TW92ZVRvWSk7XG4gICAgdXBkYXRlV2Fycmlvcih3YXJyaW9yLCBwYXRoLCBpLCBjdXJyZW50TW92ZVRvWCwgY3VycmVudE1vdmVUb1kpO1xuICAgIGN1cnJlbnRNb3ZlVG9YICs9IGdyaWRTaXplO1xuICAgIGNvbnNvbGUubG9nKCdpJywgaSk7XG4gICAgY29uc29sZS5sb2coJ2N1cnJlbnRNb3ZlVG9YJywgY3VycmVudE1vdmVUb1gpO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBhZGRXYXJyaW9yc1RvVW5pdCA9ICh1bml0OmFueSkgPT4ge1xuICBsZXQgc3RhcnRYID0gdW5pdC5jb21tYW5kZXJQb3NpdGlvblg7XG4gIGxldCBzdGFydFkgPSB1bml0LmNvbW1hbmRlclBvc2l0aW9uWTtcbiAgbGV0IGkgPSAxO1xuICBsZXQgcm93ID0gdW5pdC5xdWFudGl0eSAvIDI7XG4gIGxldCBjb2wgPSBNYXRoLmNlaWwodW5pdC5xdWFudGl0eSAvIHJvdyk7XG4gIGxldCBmaW5pc2hYID0gc3RhcnRYICsgKChyb3cgLSAxKSAqIGdyaWRTaXplKTtcbiAgbGV0IGZpbmlzaFkgPSBzdGFydFkgKyAoKGNvbCAtIDEpICogZ3JpZFNpemUpO1xuICBsZXQgcmFkaXVzID0gZ3JpZFNpemUgLyA0O1xuICBsZXQgdW5pdFJvdyA9IDE7IC8vIHRvIGdpdmUgd2FycmlvciByb3cgYW5kIGNvbHVtbiBwb3NpdGlvbiBpbiB1bml0XG4gIGxldCB1bml0Q29sID0gMTtcbiAgdW5pdC5yb3cgPSByb3c7IC8vIGFkZCByb3cgaW5zdGFuY2UgZm9yIHVuaXRcbiAgdW5pdC5jb2wgPSBjb2w7IC8vIGFkZCBjb2wgaW5zdGFuY2UgZm9yIHVuaXRcbiAgZm9yKGxldCB5ID0gc3RhcnRYOyB5IDw9IGZpbmlzaFk7IHkgKz0gZ3JpZFNpemUpIHtcbiAgICBpZihpIDw9IHVuaXQucXVhbnRpdHkpIHtcbiAgICAgIGZvcihsZXQgeCA9IHN0YXJ0WDsgeCA8PSBmaW5pc2hYOyAgeCs9IGdyaWRTaXplKSB7XG4gICAgICAgIGxldCBjdXJyZW50V2FycmlvciA9IGNyZWF0ZVdhcnJpb3IodW5pdC5uYW1lLCB4LCB5LCByYWRpdXMpO1xuICAgICAgICBjdXJyZW50V2Fycmlvci5hc3NpZ25Qb3NpdGlvbihpKTtcbiAgICAgICAgY3VycmVudFdhcnJpb3Iucm93SW5Vbml0ID0gdW5pdFJvdztcbiAgICAgICAgY3VycmVudFdhcnJpb3IuY29sSW5Vbml0ID0gdW5pdENvbDtcbiAgICAgICAgdW5pdC5hZGRXYXJyaW9yVG9Vbml0KGN1cnJlbnRXYXJyaW9yKTtcbiAgICAgICAgaSsrO1xuICAgICAgICB1bml0Q29sKys7XG4gICAgICB9XG4gICAgfVxuICAgIHVuaXRSb3crKztcbiAgICB1bml0Q29sID0gMTtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgY3JlYXRlVW5pdCA9IChuYW1lOnN0cmluZywgcXVhbnRpdHk6bnVtYmVyLCBwb3NYOm51bWJlciwgcG9zWTogbnVtYmVyKSA9PiB7XG4gIGxldCBuZXdVbml0ID0gbmV3IFVuaXQobmFtZSwgcXVhbnRpdHksIHBvc1gsIHBvc1kpO1xuICBsZXQgcmFkaXVzID0gZ3JpZFNpemUgLyA0O1xuICBhZGRXYXJyaW9yc1RvVW5pdChuZXdVbml0KTtcbiAgdW5pdHMucHVzaChuZXdVbml0KTtcbn1cblxuLy8gd2FycmlvcnMgaW4gdGhlIHVuaXQgaGF2ZSBzYW1lIG5hbWUgYXMgdW5pdCB0aGF0IHRoZXkgYXNzaWduZWQgdG9cbi8vIGlmIHdhcnJpb3Igd2l0aCBzYW1lIG5hbWUgaXMgY2hvc2VuIHRoYXQgbWVhbnMgdGhhdCB1bml0IGFsc29cbi8vIGhhcyBiZWVuIGNob3NlblxuZXhwb3J0IGNvbnN0IG9uQ2hvb3NlVW5pdCA9ICh1bml0czphbnksIGN1cnJlbnRseUNob3NlbldhcnJpb3I6YW55KSA9PiB7XG4gIGxldCBmb3VuZGVkVW5pdCA9IG51bGw7XG4gIGlmKGN1cnJlbnRseUNob3NlbldhcnJpb3IpIHtcbiAgICBmb3IobGV0IHVuaXQgb2YgdW5pdHMpIHtcbiAgICAgIGlmKGN1cnJlbnRseUNob3NlbldhcnJpb3IubmFtZSA9PT0gdW5pdC5uYW1lKSB7XG4gICAgICAgIGZvdW5kZWRVbml0ID0gdW5pdDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgYXNzaWduQ3VycmVudGx5Q2hvc2VuVW5pdChmb3VuZGVkVW5pdCk7XG4gIGNvbnNvbGUubG9nKCdjdXJyZW50bHlDaG9zZW5Vbml0JywgY3VycmVudGx5Q2hvc2VuVW5pdCk7XG59XG5cbmxldCBnZXRVbml0Q29tbWFuZGVyID0gKHVuaXQ6YW55KSA9PiB7XG4gIGZvcihsZXQgd2FycmlvciBvZiB1bml0LndhcnJpb3JzKSB7XG4gICAgaWYod2Fycmlvci5wb3NpdGlvbkluVW5pdCA9PT0gMSkge1xuICAgICAgcmV0dXJuIHdhcnJpb3I7XG4gICAgfVxuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdW5pdC91bml0QWN0aW9ucy50cyIsImV4cG9ydCBjb25zdCBnZXRNaW5GU2NvcmUgPSAob3BlbjphbnlbXSkgPT4ge1xuICBsZXQgbWluID0gMDtcbiAgZm9yKGxldCBpID0gMTsgaSA8IG9wZW4ubGVuZ3RoIC0gMTsgKytpKSB7XG4gICAgaWYob3BlblttaW5dLmZTY29yZSA+IG9wZW5baV0uZlNjb3JlKSB7XG4gICAgICBtaW4gPSBpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gb3BlblttaW5dO1xufVxuXG5leHBvcnQgY29uc3QgdW5jbG9zZWROZWlnYm91cnMgPSAoY3VycmVudDphbnksIGNsb3NlZDphbnkpID0+IHtcbiAgbGV0IG5laWdoYm91cnNOb3RJbkNsb3NlZCA9IFtdO1xuICBmb3IobGV0IG5laWdoYm91ciBvZiBjdXJyZW50Lm5laWdoYm91cnMpIHtcbiAgICBsZXQgaXNJbkNsb3NlZDpib29sZWFuID0gZmFsc2U7XG4gICAgZm9yKGxldCBub2RlIG9mIGNsb3NlZCkge1xuICAgICAgaWYobmVpZ2hib3VyLnggPT09IG5vZGUueCAmJiBuZWlnaGJvdXIueSA9PT0gbm9kZS55KSB7XG4gICAgICAgIGlzSW5DbG9zZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICBpZighaXNJbkNsb3NlZCkge1xuICAgICAgbmVpZ2hib3Vyc05vdEluQ2xvc2VkLnB1c2gobmVpZ2hib3VyKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG5laWdoYm91cnNOb3RJbkNsb3NlZDtcbn1cblxuZXhwb3J0IGNvbnN0IGlzT2JqZWN0SW5NYXBLZXlzID0gKG9iamVjdDphbnksIG1hcDphbnkpID0+IHtcbiAgbGV0IGFycjphbnlbXSA9IEFycmF5LmZyb20obWFwKTtcbiAgbGV0IHJlc3VsdDpib29sZWFuID0gZmFsc2U7XG4gIGZvcihsZXQgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyArK2kpIHtcbiAgICAvL2NvbnNvbGUubG9nKCdvYmplY3QnLCBvYmplY3QpO1xuICAgIGlmKGFycltpXVswXS54ID09PSBvYmplY3QueCAmJiBhcnJbaV1bMF0ueSA9PT0gb2JqZWN0LnkpIHtcbiAgICAgIHJlc3VsdCA9IHRydWU7XG4gICAgfVxuICB9XG4gIGNvbnNvbGUubG9nKCdyZXN1bHQnLCByZXN1bHQpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3BhdGgvYVN0YXJVdGlscy50cyIsIlxuXG5jbGFzcyBVbml0IHtcbiAgbmFtZTogc3RyaW5nO1xuICBxdWFudGl0eTogbnVtYmVyO1xuICBjb21tYW5kZXJQb3NpdGlvblg6IG51bWJlcjtcbiAgY29tbWFuZGVyUG9zaXRpb25ZOiBudW1iZXI7XG4gIHdhcnJpb3JzOiBhbnlbXSA9IFtdO1xuICBjb2w6IG51bWJlcjtcbiAgcm93OiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IobmFtZTpzdHJpbmcsIHF1YW50aXR5Om51bWJlciwgcG9zWDpudW1iZXIsIHBvc1k6bnVtYmVyKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLnF1YW50aXR5ID0gcXVhbnRpdHk7XG4gICAgdGhpcy5jb21tYW5kZXJQb3NpdGlvblggPSBwb3NYO1xuICAgIHRoaXMuY29tbWFuZGVyUG9zaXRpb25ZID0gcG9zWDtcbiAgfVxuICBhZGRXYXJyaW9yVG9Vbml0KHdhcnJpb3I6YW55KSB7XG4gICAgdGhpcy53YXJyaW9ycy5wdXNoKHdhcnJpb3IpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFVuaXQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdW5pdC9Vbml0LnRzIiwiaW1wb3J0IHtcbiAgZ2V0Q2VudHJhbFdhcnJpb3JJblVuaXQsXG4gIGdldENsb3Nlc3RXYXJyaW9yVG9EZXN0aW5hdGlvbkluQXJyYXlcbn0gZnJvbSAnLi91bml0VXRpbHMnO1xuaW1wb3J0IHtncmlkU2l6ZX0gZnJvbSAnLi4vbWFwL21hcENvbmZpZyc7XG5pbXBvcnQge21hcH0gZnJvbSAnLi4vbWFwL2NyZWF0ZU1hcCc7XG5pbXBvcnQge2dldE5vZGVGcm9tTWFwfSBmcm9tICcuLi9wYXRoL2RyYXdQYXRoJztcbmltcG9ydCB7XG4gIGdldE5vZGVGcm9tQXJyYXksXG4gIGRlbGV0ZU9iamVjdEZyb21BcnJheSxcbiAgaXNPYmplY3RJbkFycmF5XG59IGZyb20gJy4uL3V0aWxzL29ialV0aWxzJztcbmltcG9ydCB7dXBkYXRlV2Fycmlvcn0gZnJvbSAnLi4vd2Fycmlvci93YXJyaW9yTW92ZW1lbnQnO1xuaW1wb3J0IHthU3Rhcn0gZnJvbSAnLi4vcGF0aC9BU3Rhcic7XG5cbmV4cG9ydCBjb25zdCBtb3ZlVG9Qb3NpdGlvbiA9ICh1bml0OmFueSwgbmV4dE5vZGU6YW55KSA9PiB7XG4gIC8vIGFzc2lnbiBtb3ZlVG9Qb3NpdGlvbnMgdG8gd2FycmlvcnNcbiAgbGV0IG1vdmluZ1dhcnJpb3JzID0gT2JqZWN0LmFzc2lnbihbXSwgdW5pdC53YXJyaW9ycyk7XG4gIGxldCBjZW50cmFsV2FycmlvciA9IGdldENlbnRyYWxXYXJyaW9ySW5Vbml0KHVuaXQpO1xuICBsZXQgdXBkYXRlZFdhcnJpb3JzID0gZGVsZXRlT2JqZWN0RnJvbUFycmF5KGNlbnRyYWxXYXJyaW9yLCB1bml0LndhcnJpb3JzKTtcbiAgLy9jb25zb2xlLmxvZygndXBkYXRlZFdhcnJpb3JzJywgdXBkYXRlZFdhcnJpb3JzKTtcbiAgY2VudHJhbFdhcnJpb3IubW92ZVRvTm9kZSA9IG5leHROb2RlO1xuICAvLyBhc3NpZ24gY2VudHJhbFVuaXQgZ2UgdG8gbmV4dCBuZXh0Tm9kZVxuICAvLyBhc3NpZ24gb3RoZXIgd2FycmlvcnMgbmV4dCBwb3NpdGlvbnNcbiAgZm9yKGxldCB3YXJyaW9yIG9mIHVwZGF0ZWRXYXJyaW9ycykge1xuICAgIGxldCB7ZGlmZmVyZW5jZUluWCxkaWZmZXJlbmNlSW5ZfSA9IGNoZWNrV2FycmlvcnNQb3NpdGlvbnMoY2VudHJhbFdhcnJpb3IsIHdhcnJpb3IpO1xuICAgIGxldCB4Om51bWJlciA9IG5leHROb2RlLnggKyAoZGlmZmVyZW5jZUluWCAqIGdyaWRTaXplKTtcbiAgICBsZXQgeTpudW1iZXIgPSBuZXh0Tm9kZS55ICsgKGRpZmZlcmVuY2VJblkgKiBncmlkU2l6ZSk7XG4gICAgY29uc29sZS5lcnJvcigneDonLCB4LCAneTonLCB5KTtcbiAgICBsZXQgbW92ZVRvTm9kZTtcbiAgICBpZihpc09iamVjdEluQXJyYXkoe3gsIHl9LCBtYXApKSB7IC8vIGlmIG5vZGUgaXMgIGV4aXN0IHRoZW4gZ28gdG8gdGhpcyBub2RlXG4gICAgICBtb3ZlVG9Ob2RlID0gZ2V0Tm9kZUZyb21NYXAoeCwgeSwgbWFwKTtcbiAgICB9IGVsc2UgeyAvLyBlbHNlIGdvIHRvIGd1YXJhbnRlZCBleGlzdGVkIG5vZGUgKG5leHROb2RlKVxuICAgICAgbW92ZVRvTm9kZSA9IG5leHROb2RlO1xuICAgIH1cblxuICAgIGNvbnNvbGUuZXJyb3IoJ21vdmVUb05vZGUnLCBtb3ZlVG9Ob2RlKTtcbiAgICB3YXJyaW9yLm1vdmVUb05vZGUgPSBtb3ZlVG9Ob2RlO1xuICB9XG4gIHVuaXRNb3ZlbWVudChtb3ZpbmdXYXJyaW9ycywgbmV4dE5vZGUpO1xuICBjb25zb2xlLmVycm9yKCdub2Rle3g6IDk2MCwgeTogNDgwfSBpbiBtYXA6JywgaXNPYmplY3RJbkFycmF5KHt4OiA5NjAsIHk6IDQ4MH0sIG1hcCkpO1xufVxuXG5leHBvcnQgY29uc3QgY2hlY2tXYXJyaW9yc1Bvc2l0aW9ucyA9IChjZW50cmFsV2FycmlvcjphbnksIGN1cnJlbnRXYXJyaW9yOmFueSkgPT4ge1xuICBsZXQgY2VudHJhbENvbCA9IGNlbnRyYWxXYXJyaW9yLmNvbEluVW5pdDtcbiAgbGV0IGNlbnRyYWxSb3cgPSBjZW50cmFsV2Fycmlvci5yb3dJblVuaXQ7XG4gIGxldCBjdXJyZW50Um93ID0gY3VycmVudFdhcnJpb3Iucm93SW5Vbml0O1xuICBsZXQgY3VycmVudENvbCA9IGN1cnJlbnRXYXJyaW9yLmNvbEluVW5pdDtcbiAgbGV0IGRpZmZlcmVuY2VJblggPSBjdXJyZW50Q29sIC0gY2VudHJhbENvbDtcbiAgbGV0IGRpZmZlcmVuY2VJblkgPSBjdXJyZW50Um93IC0gY2VudHJhbFJvdztcbiAgcmV0dXJuIHtcbiAgICBkaWZmZXJlbmNlSW5YLFxuICAgIGRpZmZlcmVuY2VJbllcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgdW5pdE1vdmVtZW50ID0gKG1vdmluZ1dhcnJpb3JzOmFueVtdLCBuZXh0Tm9kZTphbnkpID0+IHtcbiAgaWYobW92aW5nV2FycmlvcnMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIGdldCBjbG9zZXN0IHdhcnJpb3IgdG8gZGVzdGluYXRpb25cbiAgbGV0IGNsb3Nlc3QgPSBnZXRDbG9zZXN0V2FycmlvclRvRGVzdGluYXRpb25JbkFycmF5KG1vdmluZ1dhcnJpb3JzLCBuZXh0Tm9kZS54LCBuZXh0Tm9kZS55KTtcbiAgY29uc29sZS5lcnJvcigndW5pdE1vdmVtZW50IGNsb3Nlc3Q6JywgY2xvc2VzdCk7XG4gIGxldCBzdGFydE5vZGUgPSBnZXROb2RlRnJvbU1hcChjbG9zZXN0LngsIGNsb3Nlc3QueSwgbWFwKTsgLy8gc3RhcnROb2RlIG9mIHRoZSBjbG9zZXN0IHdhcnJpb3JcbiAgY29uc29sZS5sb2coJ3g6JywgY2xvc2VzdC54LCAneTonLCBjbG9zZXN0LnkpO1xuICBjb25zb2xlLmxvZygnaXMgbm9kZSBpbiBtYXA6JywgaXNPYmplY3RJbkFycmF5KHt4OiBjbG9zZXN0LngsIHk6IGNsb3Nlc3QueX0sIG1hcCkpO1xuICBjb25zb2xlLmxvZygnbWFwOicsIG1hcCk7XG4gIGNvbnNvbGUuZXJyb3IoJ3VuaXRNb3ZlbWVudCBzdGFydE5vZGU6Jywgc3RhcnROb2RlKTtcbiAgbGV0IHBhdGg6YW55ID0gYVN0YXIoc3RhcnROb2RlLCBjbG9zZXN0Lm1vdmVUb05vZGUsIG1hcCk7XG4gIHVwZGF0ZVdhcnJpb3IoY2xvc2VzdCwgcGF0aCwgMCwgY2xvc2VzdC5tb3ZlVG9Ob2RlLngsIGNsb3Nlc3QubW92ZVRvTm9kZS55KTtcbiAgbW92aW5nV2FycmlvcnMgPSBkZWxldGVPYmplY3RGcm9tQXJyYXkoY2xvc2VzdCwgbW92aW5nV2FycmlvcnMpO1xuICB1bml0TW92ZW1lbnQobW92aW5nV2FycmlvcnMsIG5leHROb2RlKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91bml0L3VuaXRNb3ZlbWVudC50cyJdLCJzb3VyY2VSb290IjoiIn0=