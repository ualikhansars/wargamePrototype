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
var createMap_1 = __webpack_require__(2);
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
var mapConfig_1 = __webpack_require__(0);
var objUtils_1 = __webpack_require__(3);
exports.updateWarrior = function (warrior, path, i, currentMoveToX, currentMoveToY) {
    if (i === void 0) { i = 0; }
    //console.log('updateWarrior');
    if (currentMoveToX !== warrior.moveToNode.x || currentMoveToY !== warrior.moveToNode.y) {
        console.log('new destination has been chosen');
        return;
    }
    var updatedPath = path;
    var node = path[i]; // get next node
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
    var startNode = drawPath_1.getNodeFromMap(unitStore_1.currentlyChosenUnit.commanderPositionX, unitStore_1.currentlyChosenUnit.commanderPositionY);
    var finishNode = drawPath_1.getNodeFromMap(x, y);
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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var warriorAction_1 = __webpack_require__(1);
var mapConfig_1 = __webpack_require__(0);
var warriorMovement_1 = __webpack_require__(6);
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
        var startNode = drawPath_1.getNodeFromMap(unitStore_1.currentlyChosenUnit.commanderPositionX, unitStore_1.currentlyChosenUnit.commanderPositionY);
        var finishNode = drawPath_1.getNodeFromMap(currentMoveToX, currentMoveToY);
        var path_1 = AStar_1.aStar(startNode, finishNode);
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
        var moveToNode = drawPath_1.getNodeFromMap(x, y);
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
    var startNode = drawPath_1.getNodeFromMap(closest.x, closest.y);
    var path = AStar_1.aStar(startNode, closest.moveToNode);
    warriorMovement_1.updateWarrior(closest, path, 0, closest.moveToNode.x, closest.moveToNode.y);
    movingWarriors = objUtils_1.deleteObjectFromArray(closest, movingWarriors);
    exports.unitMovement(movingWarriors, nextNode);
};


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOGYzNjhmY2Y3NTBkYmM4NTkyNGEiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hcC9tYXBDb25maWcudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dhcnJpb3Ivd2FycmlvckFjdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFwL2NyZWF0ZU1hcC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvb2JqVXRpbHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhdGgvZHJhd1BhdGgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0b3JlL3dhcnJpb3JTdG9yZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd2Fycmlvci93YXJyaW9yTW92ZW1lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0b3JlL3VuaXRTdG9yZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcGF0aC9BU3Rhci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdW5pdC91bml0VXRpbHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hcC9kcmF3R3JpZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd2Fycmlvci9XYXJyaW9yLnRzIiwid2VicGFjazovLy8uL3NyYy91bml0L3VuaXRBY3Rpb25zLnRzIiwid2VicGFjazovLy8uL3NyYy91bml0L1VuaXQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhdGgvYVN0YXJVdGlscy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdW5pdC91bml0TW92ZW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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Q0FBQyxDQUFDO0FBQ3pDLENBQUMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDhmMzY4ZmNmNzUwZGJjODU5MjRhIiwiLy8gZ2xvYmFsIHZhcmlhYmxlc1xuZXhwb3J0IGNvbnN0IFdJRFRIOiBudW1iZXIgPSAxMjAwO1xuZXhwb3J0IGNvbnN0IEhFSUdIVDogbnVtYmVyID0gNjAwO1xuZXhwb3J0IGNvbnN0IGdyaWRTaXplOm51bWJlciA9IDIwO1xuXG4vLyBjcmVhdGUgQ2FudmFzXG5leHBvcnQgbGV0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuY2FudmFzLmlkID0gXCJjYW52YXNcIjtcbmNhbnZhcy53aWR0aCA9IFdJRFRIO1xuY2FudmFzLmhlaWdodCA9IEhFSUdIVDtcbmNhbnZhcy5zdHlsZS5ib3JkZXIgPSBcIjFweCBzb2xpZFwiO1xuXG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNhbnZhcyk7XG5cbi8vIGRlZmluZSAyZCBjb250ZXh0XG5leHBvcnQgbGV0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFwL21hcENvbmZpZy50cyIsImltcG9ydCB7Z3JpZFNpemV9IGZyb20gJy4uL21hcC9tYXBDb25maWcnO1xuaW1wb3J0IHtcbiAgd2FycmlvcnMsXG4gIGN1cnJlbnRseUNob3NlbldhcnJpb3IsXG4gIGFzc2lnbkN1cnJlbnRseUNob3NlbldhcnJpb3Jcbn0gZnJvbSAnLi4vc3RvcmUvd2FycmlvclN0b3JlJztcbmltcG9ydCB7Y3R4fSBmcm9tICcuLi9tYXAvbWFwQ29uZmlnJztcbmltcG9ydCBXYXJyaW9yIGZyb20gJy4vV2Fycmlvcic7XG5cbmV4cG9ydCBjb25zdCBvbkNob29zZVdhcnJpb3IgPSAod2FycmlvcnM6YW55W10sIG1vdXNlWDpudW1iZXIsIG1vdXNlWTpudW1iZXIpID0+IHtcbiAgbGV0IGZvdW5kZWRXYXJyaW9yID0gbnVsbDtcbiAgZm9yKGxldCB3YXJyaW9yIG9mIHdhcnJpb3JzKSB7XG4gICAgbGV0IGJvdHRvbVJpZ2h0WCA9IHdhcnJpb3IueCArIGdyaWRTaXplO1xuICAgIGxldCBib3R0b21SaWdodFkgPSB3YXJyaW9yLnkgKyBncmlkU2l6ZTtcbiAgICBpZihtb3VzZVggPj0gd2Fycmlvci54ICYmIG1vdXNlWCA8IGJvdHRvbVJpZ2h0WCAmJiBtb3VzZVkgPj0gd2Fycmlvci55ICYmIG1vdXNlWSA8IGJvdHRvbVJpZ2h0WSkge1xuICAgICAgY29uc29sZS5sb2coJ3dhcnJpb3InLCB3YXJyaW9yLm5hbWUsICcgd2FzIGNob3NlbicpO1xuICAgICAgd2Fycmlvci5pc0N1cnJlbnRseUNob3NlbiA9IHRydWU7XG4gICAgICBmb3VuZGVkV2FycmlvciA9IHdhcnJpb3I7XG4gICAgfVxuICB9XG4gIGFzc2lnbkN1cnJlbnRseUNob3NlbldhcnJpb3IoZm91bmRlZFdhcnJpb3IpO1xuICBjb25zb2xlLmxvZygnY3VycmVudGx5Q2hvc2VuV2FycmlvcicsIGN1cnJlbnRseUNob3NlbldhcnJpb3IpO1xufVxuXG5leHBvcnQgY29uc3QgZHJhd1dhcnJpb3IgPSAod2FycmlvcjphbnkpID0+IHtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4LmFyYyh3YXJyaW9yLmNlbnRlclgsIHdhcnJpb3IuY2VudGVyWSwgd2Fycmlvci5yYWRpdXMsIDAsIE1hdGguUEkqMik7XG4gICAgY3R4LmZpbGxTdHlsZSA9ICcjZDkyNTEwJztcbiAgICBjdHguZmlsbCgpO1xuICAgIGN0eC5jbG9zZVBhdGgoKTtcbn1cblxuZXhwb3J0IGNvbnN0IGFzc2lnbldhcnJpb3JNb3ZlVG9Qb3NpdGlvbiA9ICh3YXJyaW9yOmFueSwgeDpudW1iZXIsIHk6bnVtYmVyKSA9PiB7XG4gIC8vY29uc29sZS5lcnJvcignYXNzaWduTW92ZVRvUG9zaXRpb24nKTtcbiAgaWYod2Fycmlvcikge1xuICAgIHdhcnJpb3IubW92ZVRvTm9kZVggPSB4O1xuICAgIHdhcnJpb3IubW92ZVRvTm9kZVkgPSB5O1xuICAgIGNvbnNvbGUubG9nKHdhcnJpb3IubmFtZSArICcgaXMgbW92aW5nIHRvIG5vZGU6JyArIHdhcnJpb3IubW92ZVRvTm9kZVggKyAnIHk6JyArIHdhcnJpb3IubW92ZVRvTm9kZVkpO1xuICB9IGVsc2Uge1xuICAgIGNvbnNvbGUubG9nKCd3YXJyaW9yIG5vdCBjaG9zZW4nKTtcbiAgfVxufVxuXG4vLyBjcmVhdGUgVW5pdCBhbmQgaW1tZWRpYXRseSBwdXNoIGl0IGludG8gdW5pdHMgYXJyYXlcbmV4cG9ydCBsZXQgY3JlYXRlV2FycmlvciA9IChuYW1lOnN0cmluZywgeDpudW1iZXIsIHk6bnVtYmVyLCByYWRpdXM6bnVtYmVyKSA9PiB7XG4gIC8vY29uc29sZS5lcnJvcignY3JlYXRlVW5pdCcpO1xuICBsZXQgd2FycmlvciA9IG5ldyBXYXJyaW9yKG5hbWUsIHgsIHksIHJhZGl1cyk7XG4gIHdhcnJpb3JzLnB1c2god2Fycmlvcik7XG4gIGRyYXdXYXJyaW9yKHdhcnJpb3IpO1xuICByZXR1cm4gd2Fycmlvcjtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy93YXJyaW9yL3dhcnJpb3JBY3Rpb24udHMiLCJpbXBvcnQge1xuICBjYW52YXMsXG4gIGN0eCxcbiAgV0lEVEgsXG4gIEhFSUdIVCxcbiAgZ3JpZFNpemVcbn0gZnJvbSAnLi4vbWFwL21hcENvbmZpZyc7XG5cbmltcG9ydCB7XG4gIGRlbGV0ZU9iamVjdEZyb21BcnJheSxcbn0gZnJvbSAnLi4vdXRpbHMvb2JqVXRpbHMnO1xuXG5leHBvcnQgY29uc3QgY3JlYXRlTm9kZXMgPSAoKSA9PiB7XG4gIGxldCBtYXA6YW55W10gPSBbXTtcbiAgbGV0IHZhbHVlID0gMTtcbiAgbGV0IGlkID0gMDtcbiAgZm9yKGxldCB5ID0gMDsgeSA8PSBIRUlHSFQ7IHkrPSBncmlkU2l6ZSkge1xuICAgIGZvcihsZXQgeCA9IDA7IHggPD0gV0lEVEg7IHgrPSBncmlkU2l6ZSkge1xuICAgICAgbWFwLnB1c2goe1xuICAgICAgICBpZDogaWQsXG4gICAgICAgIHg6IHgsXG4gICAgICAgIHk6IHksXG4gICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgbmVpZ2hib3VyczogW11cbiAgICAgIH0pO1xuICAgICAgaWQrKztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG1hcDtcbn1cblxuZXhwb3J0IGNvbnN0IG5laWdoYm91cnMgPSAobm9kZTphbnkpID0+IHtcbiAgbGV0IGRpcnMgPSBbXG4gICAge3g6IC1ncmlkU2l6ZSwgeTogLWdyaWRTaXplLCBkaXN0YW5jZTogMTR9LFxuICAgIHt4OiAwLCB5OiAtZ3JpZFNpemUsIGRpc3RhbmNlOiAxMH0sXG4gICAge3g6IGdyaWRTaXplLCB5OiAtZ3JpZFNpemUsIGRpc3RhbmNlOiAxNH0sXG4gICAge3g6IC1ncmlkU2l6ZSwgeTogMCwgZGlzdGFuY2U6IDEwfSxcbiAgICB7eDogZ3JpZFNpemUsIHk6IDAsIGRpc3RhbmNlOiAxMH0sXG4gICAge3g6IC1ncmlkU2l6ZSwgeTogZ3JpZFNpemUsIGRpc3RhbmNlOiAxNH0sXG4gICAge3g6IDAsIHk6IGdyaWRTaXplLCBkaXN0YW5jZTogMTB9LFxuICAgIHt4OiBncmlkU2l6ZSwgeTogZ3JpZFNpemUsIGRpc3RhbmNlOiAxNH1cbiAgXTtcbiAgbGV0IHJlc3VsdCA9IFtdO1xuICBmb3IobGV0IGRpciBvZiBkaXJzKSB7XG4gICAgbGV0IG5laWdoYm91ciA9IHtcbiAgICAgIHg6IG5vZGUueCArIGRpci54LFxuICAgICAgeTogbm9kZS55ICsgZGlyLnksXG4gICAgICBkaXN0YW5jZTogZGlyLmRpc3RhbmNlXG4gICAgfVxuICAgIGlmKG5laWdoYm91ci54ID49IDAgJiYgbmVpZ2hib3VyLnggPCBXSURUSCAmJiBuZWlnaGJvdXIueSA+PSAwICYmIG5laWdoYm91ci55IDwgSEVJR0hUKSB7XG4gICAgICAgIGxldCBmaW5kZWQ6Ym9vbGVhbiA9IGZhbHNlO1xuICAgICAgICBmb3IobGV0IG5vZGUgb2YgbWFwKSB7XG4gICAgICAgICAgaWYobmVpZ2hib3VyLnggPT09IG5vZGUueCAmJiBuZWlnaGJvdXIueSA9PT0gbm9kZS55KSB7XG4gICAgICAgICAgICBmaW5kZWQgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZihmaW5kZWQpIHtcbiAgICAgICAgICByZXN1bHQucHVzaCh7XG4gICAgICAgICAgICB4OiBuZWlnaGJvdXIueCxcbiAgICAgICAgICAgIHk6IG5laWdoYm91ci55LFxuICAgICAgICAgICAgZGlzdGFuY2U6IG5laWdoYm91ci5kaXN0YW5jZSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgY29uc3QgYWRkTmVpZ2hib3VycyA9IChtYXA6YW55W10pID0+IHtcbiAgZm9yKGxldCBub2RlIG9mIG1hcCkge1xuICAgIGxldCBuID0gbmVpZ2hib3Vycyhub2RlKTtcbiAgICBub2RlLm5laWdoYm91cnMgPSBuO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVPbmVPYnN0YWNsZSA9IChwb3NpdGlvblg6bnVtYmVyLCBwb3NpdGlvblk6bnVtYmVyLCB0eXBlOnN0cmluZz0nZm9yZXN0JykgPT4ge1xuICBsZXQgbm9kZSA9IHtcbiAgICB4OiBwb3NpdGlvblgsXG4gICAgeTogcG9zaXRpb25ZXG4gIH07XG4gIGlmKHR5cGUgPT09ICdmb3Jlc3QnKSBjdHguZmlsbFN0eWxlID0gJ2dyZWVuJztcbiAgZWxzZSBpZih0eXBlID09PSAnbW91bnRhaW4nKSBjdHguZmlsbFN0eWxlID0gJyM4QjQ1MTMnO1xuICBlbHNlIGlmKHR5cGUgPT09ICdyaXZlcicpIGN0eC5maWxsU3R5bGUgPSAnYmx1ZSc7XG4gIGN0eC5maWxsUmVjdChwb3NpdGlvblgsIHBvc2l0aW9uWSwgZ3JpZFNpemUsIGdyaWRTaXplKTtcbiAgcmV0dXJuIGRlbGV0ZU9iamVjdEZyb21BcnJheShub2RlLCBtYXApXG59XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVPYnN0YWNsZXMgPSAoc3RhcnRYOm51bWJlciwgZmluaXNoWDpudW1iZXIsIHN0YXJ0WTpudW1iZXIsIGZpbmlzaFk6bnVtYmVyLCB0eXBlOnN0cmluZz0nZm9yZXN0JykgPT4ge1xuICBsZXQgbmV3TWFwOmFueVtdID0gbWFwO1xuICBmb3IobGV0IHggPSBzdGFydFg7IHggPD0gZmluaXNoWDsgeCArPSBncmlkU2l6ZSkge1xuICAgIGZvcihsZXQgeSA9IHN0YXJ0WTsgeSA8PSBmaW5pc2hZOyB5ICs9IGdyaWRTaXplKSB7XG4gICAgICBsZXQgbm9kZSA9IHtcbiAgICAgICAgeCxcbiAgICAgICAgeVxuICAgICAgfVxuICAgICAgbmV3TWFwID0gZGVsZXRlT2JqZWN0RnJvbUFycmF5KG5vZGUsIG5ld01hcCk7XG4gICAgICBpZih0eXBlID09PSAnZm9yZXN0JykgY3R4LmZpbGxTdHlsZSA9ICdncmVlbic7XG4gICAgICBlbHNlIGlmKHR5cGUgPT09ICdtb3VudGFpbicpIGN0eC5maWxsU3R5bGUgPSAnIzhCNDUxMyc7XG4gICAgICBlbHNlIGlmKHR5cGUgPT09ICdyaXZlcicpIGN0eC5maWxsU3R5bGUgPSAnYmx1ZSc7XG4gICAgICBsZXQgeExlbmd0aCA9IE1hdGguYWJzKHN0YXJ0WCAtIGZpbmlzaFgpO1xuICAgICAgbGV0IHlMZW5ndGggPSBNYXRoLmFicyhzdGFydFkgLSBmaW5pc2hZKTtcbiAgICAgIGN0eC5maWxsUmVjdCh4LCB5LCBncmlkU2l6ZSwgZ3JpZFNpemUpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbmV3TWFwO1xufVxuXG5leHBvcnQgbGV0IG1hcCA9IGNyZWF0ZU5vZGVzKCk7XG5tYXAgPSBjcmVhdGVPYnN0YWNsZXMoMTIwLCAxNjAsIDEyMCwgMTYwLCAncml2ZXInKTtcbm1hcCA9IGNyZWF0ZU9ic3RhY2xlcyg2NjAsIDgyMCwgMTgwLCAyMDAsICdyaXZlcicpO1xubWFwID0gY3JlYXRlT2JzdGFjbGVzKDkwMCwgMTE4MCwgMTgwLCAyMDAsICdyaXZlcicpO1xubWFwID0gY3JlYXRlT25lT2JzdGFjbGUoMzAwLCAzNDAsICdtb3VudGFpbicpO1xubWFwID0gY3JlYXRlT2JzdGFjbGVzKDI4MCwgMzIwLCAzNjAsIDM4MCwgJ21vdW50YWluJyk7XG5tYXAgPSBjcmVhdGVPYnN0YWNsZXMoNzQwLCA3NjAsIDQyMCwgNTAwLCAnZm9yZXN0Jyk7XG5tYXAgPSBjcmVhdGVPYnN0YWNsZXMoOTYwLCAxMDAwLCA0NDAsIDQ2MCwgJ2ZvcmVzdCcpO1xubWFwID0gY3JlYXRlT2JzdGFjbGVzKDk4MCwgMTAwMCwgNDQwLCA1MjAsICdmb3Jlc3QnKTtcbmFkZE5laWdoYm91cnMobWFwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tYXAvY3JlYXRlTWFwLnRzIiwiZXhwb3J0IGNvbnN0IGRlbGV0ZU9iamVjdEZyb21BcnJheSA9IChvYmplY3Q6YW55LCBhcnI6YW55W10pID0+IHtcbiAgbGV0IHVwZGF0ZWRBcnIgPSBhcnIuZmlsdGVyKChlbCkgPT4ge1xuICAgIGlmKGVsLnggPT09IG9iamVjdC54ICYmIGVsLnkgPT09IG9iamVjdC55KSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9KTtcbiAgcmV0dXJuIHVwZGF0ZWRBcnI7XG59XG5cbmV4cG9ydCBjb25zdCBpc09iamVjdEluQXJyYXkgPSAob2JqZWN0OmFueSwgYXJyOmFueVtdKSA9PiB7XG4gIGxldCByZXN1bHQ6Ym9vbGVhbiA9IGZhbHNlO1xuICBmb3IobGV0IG5vZGUgb2YgYXJyKSB7XG4gICAgaWYob2JqZWN0LnggPT09IG5vZGUueCAmJiBvYmplY3QueSA9PT0gbm9kZS55KSB7XG4gICAgICByZXN1bHQgPSB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgY29uc3QgZ2V0Tm9kZUZyb21BcnJheSA9IChvYmplY3Q6YW55LCBhcnI6YW55W10pID0+IHtcbiAgZm9yKGxldCBub2RlIG9mIGFycikge1xuICAgIGlmKG5vZGUueCA9PT0gb2JqZWN0LnggJiYgbm9kZS55ICYmIG9iamVjdC55KSB7XG4gICAgICByZXR1cm4gbm9kZTtcbiAgICB9XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91dGlscy9vYmpVdGlscy50cyIsImltcG9ydCB7XG4gIGNhbnZhcyxcbiAgY3R4LFxuICBXSURUSCxcbiAgSEVJR0hULFxuICBncmlkU2l6ZSxcbn0gZnJvbSAnLi4vbWFwL21hcENvbmZpZyc7XG5cbmltcG9ydCB7bWFwfSBmcm9tICcuLi9tYXAvY3JlYXRlTWFwJztcblxuZXhwb3J0IGNvbnN0IGRyYXdQYXRoID0gKHBhdGg6YW55W10pID0+IHtcbiAgZm9yKGxldCBzdGVwIG9mIHBhdGgpIHtcbiAgICBjdHguZmlsbFN0eWxlID0gJ3llbGxvdyc7XG4gICAgY3R4LmZpbGxSZWN0KHN0ZXAueCwgc3RlcC55LCBncmlkU2l6ZSwgZ3JpZFNpemUpO1xuICB9XG59XG5cbmV4cG9ydCBsZXQgZ2V0Tm9kZUZyb21NYXAgPSAoeDpudW1iZXIsIHk6bnVtYmVyKSA9PiB7XG4gIGxldCBub2RlOmFueTtcbiAgZm9yKGxldCBncmlkIG9mIG1hcCkge1xuICAgIGxldCBib3R0b21SaWdodFggPSBncmlkLnggKyBncmlkU2l6ZTtcbiAgICBsZXQgYm90dG9tUmlnaHRZID0gZ3JpZC55ICsgZ3JpZFNpemU7XG4gICAgaWYoeCA+PSBncmlkLnggJiYgeCA8IGJvdHRvbVJpZ2h0WCAmJiB5ID49IGdyaWQueSAmJiB5IDwgYm90dG9tUmlnaHRZKSB7XG4gICAgICBub2RlID0gZ3JpZDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG5vZGU7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcGF0aC9kcmF3UGF0aC50cyIsImV4cG9ydCBjb25zdCB3YXJyaW9yczphbnlbXSA9IFtdO1xuZXhwb3J0IGxldCBjdXJyZW50bHlDaG9zZW5XYXJyaW9yOmFueSA9IG51bGw7XG5cbmV4cG9ydCBjb25zdCBhc3NpZ25DdXJyZW50bHlDaG9zZW5XYXJyaW9yID0gKHdhcnJpb3I6YW55KSA9PiB7XG4gIC8vIGNoZWNrIHVuaXRcbiAgaWYod2Fycmlvcikge1xuICAgICAgY3VycmVudGx5Q2hvc2VuV2FycmlvciA9IHdhcnJpb3I7XG4gIH0gZWxzZSB7XG4gICAgY3VycmVudGx5Q2hvc2VuV2FycmlvciA9IG51bGw7XG4gIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3N0b3JlL3dhcnJpb3JTdG9yZS50cyIsImltcG9ydCB7ZHJhd1dhcnJpb3J9IGZyb20gJy4vd2FycmlvckFjdGlvbic7XG5pbXBvcnQge1xuICBncmlkU2l6ZSxcbiAgY3R4LFxuICBXSURUSCxcbiAgSEVJR0hUXG59IGZyb20gJy4uL21hcC9tYXBDb25maWcnO1xuaW1wb3J0IHtkZWxldGVPYmplY3RGcm9tQXJyYXl9IGZyb20gJy4uL3V0aWxzL29ialV0aWxzJztcblxuZXhwb3J0IGxldCB1cGRhdGVXYXJyaW9yID0gKHdhcnJpb3I6YW55LCBwYXRoOmFueVtdLCBpOm51bWJlcj0wLCBjdXJyZW50TW92ZVRvWDpudW1iZXIsIGN1cnJlbnRNb3ZlVG9ZOm51bWJlcikgPT4ge1xuICAvL2NvbnNvbGUubG9nKCd1cGRhdGVXYXJyaW9yJyk7XG4gIGlmKGN1cnJlbnRNb3ZlVG9YICE9PSB3YXJyaW9yLm1vdmVUb05vZGUueCB8fCBjdXJyZW50TW92ZVRvWSAhPT0gd2Fycmlvci5tb3ZlVG9Ob2RlLnkpIHtcbiAgICBjb25zb2xlLmxvZygnbmV3IGRlc3RpbmF0aW9uIGhhcyBiZWVuIGNob3NlbicpO1xuICAgIHJldHVybjtcbiAgfVxuICBsZXQgdXBkYXRlZFBhdGggPSBwYXRoO1xuICBsZXQgbm9kZSA9IHBhdGhbaV07IC8vIGdldCBuZXh0IG5vZGVcbiAgbGV0IG5vZGVUb0NsZWFyID0gbm9kZTs7XG4gIGlmKGkgIT09IDApIHtcbiAgICBub2RlVG9DbGVhciA9IHVwZGF0ZWRQYXRoW2kgLSAxXTtcbiAgfVxuICBtb3ZlVG9OZXh0Tm9kZSh3YXJyaW9yLCBub2RlLCBub2RlVG9DbGVhcik7XG4gIGkrKztcbiAgaWYoaSAhPT0gdXBkYXRlZFBhdGgubGVuZ3RoKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB1cGRhdGVXYXJyaW9yKHdhcnJpb3IsIHVwZGF0ZWRQYXRoLCBpLCBjdXJyZW50TW92ZVRvWCwgY3VycmVudE1vdmVUb1kpO1xuICAgIH0sIDQwMCk7XG4gIH1cbn1cblxuLy8gY2hlY2sgaWYgbmV4dE5vZGUgaXMgb2NjdXBpZWQgYnkgb3RoZXIgd2FycmlvclxuZXhwb3J0IGNvbnN0IGNoZWNrT3RoZXJXYXJyaW9yc1Bvc2l0aW9uID0gKHdhcnJpb3JzOmFueVtdLCBjdXJyZW50VW5pdDphbnksIHg6bnVtYmVyLCB5Om51bWJlcikgPT4ge1xuICBsZXQgdXBkYXRlZFdhcnJpb3JzID0gZGVsZXRlT2JqZWN0RnJvbUFycmF5KGN1cnJlbnRVbml0LCB3YXJyaW9ycyk7XG4gIGZvcihsZXQgd2FycmlvciBvZiB1cGRhdGVkV2FycmlvcnMpIHtcbiAgICBpZih3YXJyaW9yLnggPT09IHggJiYgd2Fycmlvci55ID09PSB5KSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgY29uc3QgbW92ZVRvTmV4dE5vZGUgPSAod2FycmlvcjphbnksIG5vZGU6YW55LCBwcmV2aW91c05vZGU6YW55KSA9PiB7XG4gIGN0eC5jbGVhclJlY3QocHJldmlvdXNOb2RlLngsIHByZXZpb3VzTm9kZS55LCBncmlkU2l6ZSwgZ3JpZFNpemUpO1xuICB3YXJyaW9yLnNldFgobm9kZS54KTsgLy8gY2FsY3VsYXRlIGNlbnRlciBvZiB0aGUgY3VycmVudCBub2RlXG4gIHdhcnJpb3Iuc2V0WShub2RlLnkpO1xuICBkcmF3V2Fycmlvcih3YXJyaW9yKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy93YXJyaW9yL3dhcnJpb3JNb3ZlbWVudC50cyIsImV4cG9ydCBjb25zdCB1bml0czphbnlbXSA9IFtdO1xuZXhwb3J0IGxldCBjdXJyZW50bHlDaG9zZW5Vbml0OmFueSA9IG51bGw7XG5cbmV4cG9ydCBjb25zdCBhc3NpZ25DdXJyZW50bHlDaG9zZW5Vbml0ID0gKHVuaXQ6YW55KSA9PiB7XG4gIC8vIGNoZWNrIHVuaXRcbiAgaWYodW5pdCkge1xuICAgICAgY3VycmVudGx5Q2hvc2VuVW5pdCA9IHVuaXQ7XG4gIH0gZWxzZSB7XG4gICAgY3VycmVudGx5Q2hvc2VuVW5pdCA9IG51bGw7XG4gIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3N0b3JlL3VuaXRTdG9yZS50cyIsImltcG9ydCB7bmVpZ2hib3Vyc30gZnJvbSAnLi4vbWFwL2NyZWF0ZU1hcCc7XG5pbXBvcnQge1xuICBkZWxldGVPYmplY3RGcm9tQXJyYXksXG4gIGlzT2JqZWN0SW5BcnJheVxufSBmcm9tICcuLi91dGlscy9vYmpVdGlscyc7XG5cbmltcG9ydCB7XG4gIGdldE1pbkZTY29yZSxcbiAgdW5jbG9zZWROZWlnYm91cnMsXG4gIGlzT2JqZWN0SW5NYXBLZXlzXG59IGZyb20gJy4vYVN0YXJVdGlscyc7XG5cbmV4cG9ydCBjb25zdCBhU3RhciA9IChzdGFydE5vZGU6YW55LCBmaW5pc2hOb2RlOmFueSkgPT4ge1xuICAvLyB0aGUgc2V0IG9mIGN1cnJlbnRseSBkaXNjb3ZlcmVkIG5vZGVzIHRoYXQgYXJlIG5vdCBldmFsdWF0ZWQgeWV0XG4gIC8vIEluaXRpYWxseSBvbmx5IHRoZSBzdGFydCBub2RlIGlzIGtub3duXG4gIGxldCBvcGVuOmFueVtdID0gW107XG5cbiAgLy8gdGhlIHNldCBvZiBub2RlcyB0aGF0IGFscmVhZHkgZXZhbHVhdGVkXG4gIGxldCBjbG9zZWQ6YW55W10gPSBbXTtcbiAgc3RhcnROb2RlLmdTY29yZSA9IDA7XG4gIHN0YXJ0Tm9kZS5mU2NvcmUgPSBzdGFydE5vZGUuZ1Njb3JlICsgaChzdGFydE5vZGUsIGZpbmlzaE5vZGUpXG4gIG9wZW4ucHVzaChzdGFydE5vZGUpO1xuXG4gIC8vIGZvciBlYWNoIG5vZGUsIHdoaWNoIG5vZGUgaXMgY2FuIG1vc3QgZWZmaWNpZW50bHkgYmUgcmVhY2hlZCBmcm9tXG4gIC8vIGlmIGEgbm9kZSBjYW4gYmUgcmVhY2hlZCBmcm9tIG1hbnkgbm9kZXMsIGNhbWVGcm9tIHdpbGwgZXZlbnRpYWxseVxuICAvLyBjb250YWluIHRoZSBtb3N0IGVmZmljaWVudCBwcmV2aW91cyBzdGVwXG4gIGxldCBmcm9tID0gbmV3IE1hcCgpO1xuXG4gIC8vIEZvciBlYWNoIG5vZGUsIHRoZSBjb3N0IG9mIGdldHRpbmcgZnJvbSB0aGUgc3RhcnQgbm9kZSB0byB0aGF0IG5vZGUuXG4gIC8vIGxldCBnU2NvcmUgPSBuZXcgTWFwKCk7XG4gIC8vIGxldCBmU2NvcmUgPSBuZXcgTWFwKCk7XG4gIC8vXG4gIC8vIGdTY29yZS5zZXQoc3RhcnROb2RlLCAwKTtcbiAgLy8gZlNjb3JlLnNldChzdGFydE5vZGUsIGdTY29yZS5nZXQoc3RhcnROb2RlKSArIGgoc3RhcnROb2RlLCBmaW5pc2hOb2RlKSk7XG4gIHdoaWxlKG9wZW4pIHtcbiAgICBsZXQgY3VycmVudDphbnkgPSBnZXRNaW5GU2NvcmUob3Blbik7XG4gICAgLy9jb25zb2xlLmxvZygnY3VycmVudCcsIGN1cnJlbnQpO1xuICAgIGlmKGN1cnJlbnQueCA9PT0gZmluaXNoTm9kZS54ICYmIGN1cnJlbnQueSA9PT0gZmluaXNoTm9kZS55KSB7XG4gICAgICAvL2NvbnNvbGUuZXJyb3IoJ1BhdGgnLCByZWNvbnN0cnVjdFBhdGgoZnJvbSwgY3VycmVudCkpO1xuICAgICAgcmV0dXJuIHJlY29uc3RydWN0UGF0aChmcm9tLCBjdXJyZW50KTtcbiAgICB9XG4gICAgb3BlbiA9IGRlbGV0ZU9iamVjdEZyb21BcnJheShjdXJyZW50LCBvcGVuKTtcbiAgICBjbG9zZWQucHVzaChjdXJyZW50KTtcbiAgICBmb3IobGV0IG5laWdoYm91ciBvZiB1bmNsb3NlZE5laWdib3VycyhjdXJyZW50LCBjbG9zZWQpKSB7XG4gICAgICBsZXQgdGVtcEcgPSBjdXJyZW50LmdTY29yZSArIG5laWdoYm91ci5kaXN0YW5jZTtcbiAgICAgIGlmKCFpc09iamVjdEluQXJyYXkobmVpZ2hib3VyLCBvcGVuKSB8fCB0ZW1wRyA8IG5laWdoYm91ci5nU2NvcmUpIHtcbiAgICAgICAgZnJvbS5zZXQobmVpZ2hib3VyLCBjdXJyZW50KTtcbiAgICAgICAgbmVpZ2hib3VyLmdTY29yZSA9IHRlbXBHO1xuICAgICAgICBuZWlnaGJvdXIuZlNjb3JlID0gbmVpZ2hib3VyLmdTY29yZSArIGgobmVpZ2hib3VyLCBmaW5pc2hOb2RlKTtcbiAgICAgIH1cbiAgICAgIGlmKCFpc09iamVjdEluQXJyYXkobmVpZ2hib3VyLCBvcGVuKSkgeyAvLyBjcmVhdGUgZnVuY3Rpb25cbiAgICAgICAgbGV0IG5vZGVOZWlnaGJvdXJzID0gbmVpZ2hib3VycyhuZWlnaGJvdXIpO1xuICAgICAgICBuZWlnaGJvdXIubmVpZ2hib3VycyA9IG5vZGVOZWlnaGJvdXJzO1xuICAgICAgICBvcGVuLnB1c2gobmVpZ2hib3VyKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgY29uc29sZS5sb2coJ2ZhaWx1cmUnKTtcbiAgcmV0dXJuIDA7IC8vIGZhaWx1cmVcbn1cblxuZXhwb3J0IGNvbnN0IGggPSAoc3RhcnROb2RlOmFueSwgZmluaXNoTm9kZTphbnkpID0+IHtcbi8vZnVuY3Rpb24gaGV1cmlzdGljKG5vZGUpID1cbiAgLy8gZHggPSBhYnMobm9kZS54IC0gZ29hbC54KVxuICAvLyBkeSA9IGFicyhub2RlLnkgLSBnb2FsLnkpXG4gIC8vIHJldHVybiBEICogKGR4ICsgZHkpICsgKEQyIC0gMiAqIEQpICogbWluKGR4LCBkeSlcbiAgbGV0IEQgPSAxMDsgLy8gY29zdCBvZiBtb3ZpbmcgaG9yaXpvbnRhbGx5XG4gIGxldCBEMiA9IDE0OyAvLyBjb3N0IG9mIG1vdmluZyBkaWFnb25hbGx5XG4gIGxldCBkeCA9IE1hdGguYWJzKHN0YXJ0Tm9kZS54IC0gZmluaXNoTm9kZS54KTtcbiAgbGV0IGR5ID0gTWF0aC5hYnMoc3RhcnROb2RlLnkgLSBmaW5pc2hOb2RlLnkpO1xuICByZXR1cm4gRCAqIChkeCArIGR5KSArIChEMiAtIDIgKiBEKSAqIE1hdGgubWluKGR4LCBkeSk7XG59XG5cblxuXG5leHBvcnQgY29uc3QgcmVjb25zdHJ1Y3RQYXRoID0gKGZyb206YW55LCBjdXJyZW50OmFueSkgPT4ge1xuICAvLyBmdW5jdGlvbiByZWNvbnN0cnVjdF9wYXRoKGNhbWVGcm9tLCBjdXJyZW50KVxuICAvLyAgIHRvdGFsX3BhdGggOj0gW2N1cnJlbnRdXG4gIC8vICAgd2hpbGUgY3VycmVudCBpbiBjYW1lRnJvbS5LZXlzOlxuICAvLyAgICAgICBjdXJyZW50IDo9IGNhbWVGcm9tW2N1cnJlbnRdXG4gIC8vICAgICAgIHRvdGFsX3BhdGguYXBwZW5kKGN1cnJlbnQpXG4gIC8vICAgcmV0dXJuIHRvdGFsX3BhdGhcbiAgbGV0IHJldmVyc2VQYXRoOmFueVtdID0gW2N1cnJlbnRdO1xuICBsZXQgdG90YWxQYXRoOmFueVtdID0gW107XG4gIHdoaWxlKGlzT2JqZWN0SW5NYXBLZXlzKGN1cnJlbnQsIGZyb20pKSB7XG4gICAgY3VycmVudCA9IGZyb20uZ2V0KGN1cnJlbnQpO1xuICAgIHJldmVyc2VQYXRoLnB1c2goY3VycmVudCk7XG4gIH1cbiAgZm9yKGxldCBpID0gcmV2ZXJzZVBhdGgubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICB0b3RhbFBhdGgucHVzaChyZXZlcnNlUGF0aFtpXSk7XG4gIH1cbiAgcmV0dXJuIHRvdGFsUGF0aDtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9wYXRoL0FTdGFyLnRzIiwiZXhwb3J0IGNvbnN0IGdldENsb3Nlc3RXYXJyaW9yVG9EZXN0aW5hdGlvbiA9ICh1bml0OmFueSwgZGVzdFg6bnVtYmVyLCBkZXN0WTpudW1iZXIpID0+IHtcbiAgbGV0IGNsb3Nlc3QgPSAwO1xuICBsZXQgZGlmZmVyZW5jZTpudW1iZXI7XG4gIGxldCB3YXJyaW9ycyA9IHVuaXQud2FycmlvcnM7XG4gIGZvcihsZXQgaSA9IDE7IGkgPD0gd2FycmlvcnMubGVuZ3RoIC0gMTsgKytpKSB7XG4gICAgbGV0IGN1cnJlbnRVbml0RGlmZmVyZW5jZSA9IE1hdGguc3FydChNYXRoLnBvdyhNYXRoLmFicyh3YXJyaW9yc1tpXS54IC0gZGVzdFgpLCAyKSArIE1hdGgucG93KE1hdGguYWJzKHdhcnJpb3JzW2ldLnkgLSBkZXN0WSksIDIpKTtcbiAgICBsZXQgcHJldmlvdXNVbml0RGlmZmVyZW5jZSA9IE1hdGguc3FydChNYXRoLnBvdyhNYXRoLmFicyh3YXJyaW9yc1tjbG9zZXN0XS54IC0gZGVzdFgpLCAyKSArIE1hdGgucG93KE1hdGguYWJzKHdhcnJpb3JzW2Nsb3Nlc3RdLnkgLSBkZXN0WSksIDIpKTtcblxuICAgIGlmKGN1cnJlbnRVbml0RGlmZmVyZW5jZSA8IHByZXZpb3VzVW5pdERpZmZlcmVuY2UpIHtcbiAgICAgIGNsb3Nlc3QgPSBpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gd2FycmlvcnNbY2xvc2VzdF07XG59XG5cbmV4cG9ydCBjb25zdCBnZXRDbG9zZXN0V2FycmlvclRvRGVzdGluYXRpb25JbkFycmF5ID0gKHdhcnJpb3JzOmFueVtdLCBkZXN0WDpudW1iZXIsIGRlc3RZOm51bWJlcikgPT4ge1xuICBsZXQgY2xvc2VzdCA9IDA7XG4gIGxldCBkaWZmZXJlbmNlOm51bWJlcjtcbiAgZm9yKGxldCBpID0gMTsgaSA8PSB3YXJyaW9ycy5sZW5ndGggLSAxOyArK2kpIHtcbiAgICBsZXQgY3VycmVudFVuaXREaWZmZXJlbmNlID0gTWF0aC5zcXJ0KE1hdGgucG93KE1hdGguYWJzKHdhcnJpb3JzW2ldLnggLSBkZXN0WCksIDIpICsgTWF0aC5wb3coTWF0aC5hYnMod2FycmlvcnNbaV0ueSAtIGRlc3RZKSwgMikpO1xuICAgIGxldCBwcmV2aW91c1VuaXREaWZmZXJlbmNlID0gTWF0aC5zcXJ0KE1hdGgucG93KE1hdGguYWJzKHdhcnJpb3JzW2Nsb3Nlc3RdLnggLSBkZXN0WCksIDIpICsgTWF0aC5wb3coTWF0aC5hYnMod2FycmlvcnNbY2xvc2VzdF0ueSAtIGRlc3RZKSwgMikpO1xuXG4gICAgaWYoY3VycmVudFVuaXREaWZmZXJlbmNlIDwgcHJldmlvdXNVbml0RGlmZmVyZW5jZSkge1xuICAgICAgY2xvc2VzdCA9IGk7XG4gICAgfVxuICB9XG4gIHJldHVybiB3YXJyaW9yc1tjbG9zZXN0XTtcbn1cblxuZXhwb3J0IGNvbnN0IGdldENlbnRyYWxXYXJyaW9ySW5Vbml0ID0gKHVuaXQ6YW55KSA9PiB7XG4gIGxldCBjZW50cmFsUm93ID0gTWF0aC5yb3VuZCh1bml0LnJvdyAvIDIpO1xuICBsZXQgY2VudHJhbENvbCA9IE1hdGgucm91bmQodW5pdC5jb2wgLyAyKTtcbiAgZm9yKGxldCB3YXJyaW9yIG9mIHVuaXQud2FycmlvcnMpIHtcbiAgICBpZih3YXJyaW9yLmNvbEluVW5pdCA9PT0gY2VudHJhbENvbCAmJiB3YXJyaW9yLnJvd0luVW5pdCA9PT0gY2VudHJhbFJvdykge1xuICAgICAgcmV0dXJuIHdhcnJpb3I7XG4gICAgfVxuICB9XG59XG5cbiAvLyBnZXQgdW5pdCdzIHBvc2l0aW9uIGFuZCBkZXN0aW5hdGlvbiBwb3NpdGlvbiBhbmQgcmV0dXJuIGFuZ2xlIGluIHJhZGlhbnMgYmV0d2VlbiB1bml0IGFuZCBkZXN0aW5hdGlvblxuZXhwb3J0IGNvbnN0IGNhbGNEZXN0aW5hdGlvbkFuZ2xlSW5EZWdyZWVzID0gKHVuaXQ6YW55LCBkZXN0WDpudW1iZXIsIGRlc3RZOm51bWJlcik6bnVtYmVyID0+IHtcbiAgLy9jb25zb2xlLmVycm9yKCdjYWxjRGVzdGluYXRpb25BbmdsZUluRGVncmVlcycpO1xuICBsZXQgd2FycmlvciA9IGdldENsb3Nlc3RXYXJyaW9yVG9EZXN0aW5hdGlvbih1bml0LCBkZXN0WCwgZGVzdFkpO1xuICBsZXQgYW5nbGU7XG4gIGxldCBhID0gTWF0aC5hYnMoZGVzdFkgLSB3YXJyaW9yLnkpO1xuICBsZXQgYiA9IE1hdGguYWJzKGRlc3RYIC0gd2Fycmlvci54KTtcbiAgbGV0IGFuZ2xlSW5SYWRpYW4gPSBNYXRoLmF0YW4oYSAvIGIpO1xuICAvLyBjaGVjayBxdWF0ZXIgb2YgdGhlIGNpcmNsZVxuICBsZXQgZGVncmVlID0gIGFuZ2xlSW5SYWRpYW4gKiAoMTgwIC8gTWF0aC5QSSk7IC8vIGNvbnZlcnQgcmFkaWFucyBpbnRvIGRlZ3JlZVxuICBsZXQgcXVhdGVyID0gZ2V0UXVhdGVyKHdhcnJpb3IueCwgd2Fycmlvci55LCBkZXN0WCwgZGVzdFkpOyAvLyBjaGVjayBxdWF0ZXJcbiAgaWYocXVhdGVyID09PSAxKSBhbmdsZSA9IGRlZ3JlZTtcbiAgaWYocXVhdGVyID09PSAyKSBhbmdsZSA9IDkwICsgKDkwIC0gZGVncmVlKTtcbiAgZWxzZSBpZihxdWF0ZXIgPT09IDMpIGFuZ2xlID0gMTgwICsgZGVncmVlO1xuICBlbHNlIGlmKHF1YXRlciA9PT0gNCkgYW5nbGUgPSAyNzAgKyAoOTAgLSBkZWdyZWUpO1xuICByZXR1cm4gTWF0aC5yb3VuZChhbmdsZSk7XG59XG5cbmV4cG9ydCBjb25zdCBnZXRRdWF0ZXIgPSAodW5pdFg6bnVtYmVyLCB1bml0WTpudW1iZXIsIGRlc3RYOm51bWJlciwgZGVzdFk6bnVtYmVyKTpudW1iZXIgPT4ge1xuICAvL2NvbnNvbGUuZXJyb3IoJ2dldFF1YXRlcicpO1xuICBsZXQgcXVhdGVyO1xuICBpZihkZXN0WCA+PSB1bml0WCAmJiBkZXN0WSA8IHVuaXRZKSB7XG4gICAgcXVhdGVyID0gMTtcbiAgfVxuICBlbHNlIGlmKGRlc3RYIDwgdW5pdFggJiYgZGVzdFkgPD0gdW5pdFkpIHtcbiAgICBxdWF0ZXIgPSAyO1xuICB9XG4gIGVsc2UgaWYoZGVzdFggPD0gdW5pdFggJiYgZGVzdFkgPiB1bml0WSkge1xuICAgIHF1YXRlciA9IDM7XG4gIH1cbiAgZWxzZSBpZihkZXN0WCA+IHVuaXRYICYmIGRlc3RZID49IHVuaXRZKSB7XG4gICAgcXVhdGVyID0gNDtcbiAgfVxuICByZXR1cm4gcXVhdGVyO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3VuaXQvdW5pdFV0aWxzLnRzIiwiaW1wb3J0IHtcbiAgY2FudmFzLFxuICBjdHgsXG4gIFdJRFRILFxuICBIRUlHSFQsXG4gIGdyaWRTaXplXG59IGZyb20gJy4vbWFwL21hcENvbmZpZyc7XG5cbmltcG9ydCB7ZHJhd0dyaWR9IGZyb20gJy4vbWFwL2RyYXdHcmlkJztcbmltcG9ydCB7XG4gIGFkZE5laWdoYm91cnMsXG4gIGNyZWF0ZU5vZGVzLFxuICBtYXBcbn0gZnJvbSAnLi9tYXAvY3JlYXRlTWFwJztcbmltcG9ydCB7c2hvd09ic3RhY2xlc30gZnJvbSAnLi9tYXAvbWFwVXRpbHMnO1xuaW1wb3J0IHtoLCBhU3Rhcn0gZnJvbSAnLi9wYXRoL0FTdGFyJztcbmltcG9ydCB7XG4gIGRyYXdQYXRoLFxuICBnZXROb2RlRnJvbU1hcFxufSBmcm9tICcuL3BhdGgvZHJhd1BhdGgnO1xuXG5pbXBvcnQgV2FycmlvciBmcm9tICcuL3dhcnJpb3IvV2Fycmlvcic7XG5pbXBvcnQge3dhcnJpb3JzLCBjdXJyZW50bHlDaG9zZW5XYXJyaW9yfSBmcm9tICcuL3N0b3JlL3dhcnJpb3JTdG9yZSc7XG5pbXBvcnQge1xuICBvbkNob29zZVdhcnJpb3IsXG4gIGNyZWF0ZVdhcnJpb3IsXG4gIGFzc2lnbldhcnJpb3JNb3ZlVG9Qb3NpdGlvbixcbn0gZnJvbSAnLi93YXJyaW9yL3dhcnJpb3JBY3Rpb24nO1xuaW1wb3J0IHt1cGRhdGVXYXJyaW9yfSBmcm9tICcuL3dhcnJpb3Ivd2Fycmlvck1vdmVtZW50JztcblxuaW1wb3J0IHtcbiAgY3JlYXRlVW5pdCxcbiAgb25DaG9vc2VVbml0LFxuICBvbkNoYW5nZVdhcnJpb3JQb3NpdGlvbkluVW5pdFxufSBmcm9tICcuL3VuaXQvdW5pdEFjdGlvbnMnO1xuaW1wb3J0IHtcbiAgdW5pdHMsXG4gIGN1cnJlbnRseUNob3NlblVuaXRcbn0gZnJvbSAnLi9zdG9yZS91bml0U3RvcmUnO1xuXG5pbXBvcnQge1xuICBjYWxjRGVzdGluYXRpb25BbmdsZUluRGVncmVlc1xufSBmcm9tICcuL3VuaXQvdW5pdFV0aWxzJztcblxuaW1wb3J0IHttb3ZlVG9Qb3NpdGlvbn0gZnJvbSAnLi91bml0L3VuaXRNb3ZlbWVudCc7XG5cbmxldCB3YXJyaW9yID0gY3JlYXRlV2FycmlvcignYmFyYmFyaWFuJywgODAsIDE2MCwgNSk7XG5jcmVhdGVVbml0KCd0ZXN0VW5pdCcsIDYsIDI0MCwgNDIwKTtcblxuZHJhd0dyaWQoKTtcbmNvbnNvbGUubG9nKCdtYXAnLCBtYXApO1xuY29uc29sZS5sb2coJ2N1cnJlbnRseUNob3NlbldhcnJpb3InLCBjdXJyZW50bHlDaG9zZW5XYXJyaW9yKTtcblxuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgY29uc29sZS5lcnJvcignQ2xpY2snKTtcbiAgbGV0IHggPSBlLm9mZnNldFg7IC8vIGdldCBYXG4gIGxldCB5ID0gZS5vZmZzZXRZOyAvLyBnZXQgWVxuICBjb25zb2xlLmxvZygnUG9zaXRpb24geCcsIGUub2Zmc2V0WCk7IC8vIGdldCBYXG4gIGNvbnNvbGUubG9nKCdQb3NpdGlvbiB5JywgZS5vZmZzZXRZKTsgLy8gZ2V0IFlcbiAgb25DaG9vc2VXYXJyaW9yKHdhcnJpb3JzLCB4LCB5KTtcbiAgb25DaG9vc2VVbml0KHVuaXRzLCBjdXJyZW50bHlDaG9zZW5XYXJyaW9yKTtcbiAgY29uc29sZS5sb2coJ2N1cnJlbnRseUNob3NlbldhcnJpb3InLCBjdXJyZW50bHlDaG9zZW5XYXJyaW9yKTtcbn0pO1xuXG4vLyBzZXQgb25DbGlja0xpc3RlbmVyIGZvciByaWdodCBtb3VzZSBldmVudFxuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ2NvbnRleHRtZW51JywgKGUpID0+IHtcbiAgY29uc29sZS5lcnJvcignUmlnaHQgTW91c2UgQ2xpY2snKTtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBsZXQgeCA9IGUub2Zmc2V0WDsgLy8gZ2V0IFhcbiAgbGV0IHkgPSBlLm9mZnNldFk7IC8vIGdldCBZXG4gIGxldCBzdGFydE5vZGUgPSBnZXROb2RlRnJvbU1hcChjdXJyZW50bHlDaG9zZW5Vbml0LmNvbW1hbmRlclBvc2l0aW9uWCwgY3VycmVudGx5Q2hvc2VuVW5pdC5jb21tYW5kZXJQb3NpdGlvblkpO1xuICBsZXQgZmluaXNoTm9kZSA9IGdldE5vZGVGcm9tTWFwKHgsIHkpO1xuICBjb25zb2xlLmVycm9yKCdzdGFydE5vZGUnLCBzdGFydE5vZGUpO1xuICBjb25zb2xlLmVycm9yKCdmaW5pc2hOb2RlJywgZmluaXNoTm9kZSk7XG4gIGFzc2lnbldhcnJpb3JNb3ZlVG9Qb3NpdGlvbihjdXJyZW50bHlDaG9zZW5XYXJyaW9yLCB4LCB5KTtcbiAgbW92ZVRvUG9zaXRpb24oY3VycmVudGx5Q2hvc2VuVW5pdCwgZmluaXNoTm9kZSk7XG4gIGNvbnNvbGUuZXJyb3IoJ0FuZ2xlJywgY2FsY0Rlc3RpbmF0aW9uQW5nbGVJbkRlZ3JlZXMoY3VycmVudGx5Q2hvc2VuVW5pdCwgeCwgeSkpO1xuICAvLyBsZXQgcGF0aDphbnkgPSBhU3RhcihzdGFydE5vZGUsIGZpbmlzaE5vZGUpO1xuICAvLyBpZihjdXJyZW50bHlDaG9zZW5Vbml0KSB7XG4gIC8vICBvbkNoYW5nZVdhcnJpb3JQb3NpdGlvbkluVW5pdChjdXJyZW50bHlDaG9zZW5Vbml0LHBhdGgsIDAsIHgsIHkpO1xuICAvLyB9XG5cbiAgLy9kcmF3UGF0aChwYXRoKTtcbn0pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2dhbWUudHMiLCJpbXBvcnQge1xuICBjYW52YXMsXG4gIGN0eCxcbiAgV0lEVEgsXG4gIEhFSUdIVCxcbiAgZ3JpZFNpemVcbn0gZnJvbSAnLi9tYXBDb25maWcnO1xuXG5leHBvcnQgY29uc3QgZHJhd0dyaWQgPSAoKSA9PiB7XG4gIGZvcihsZXQgeSA9IDA7IHkgPD0gSEVJR0hUOyB5Kz0gZ3JpZFNpemUpIHtcbiAgICBmb3IobGV0IHggPSAwOyB4IDw9IFdJRFRIOyB4Kz0gZ3JpZFNpemUpIHtcbiAgICAgIGN0eC5zdHJva2VSZWN0KHgsIHksIGdyaWRTaXplLCBncmlkU2l6ZSk7XG4gICAgfVxuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFwL2RyYXdHcmlkLnRzIiwiaW1wb3J0IHtncmlkU2l6ZX0gZnJvbSAnLi4vbWFwL21hcENvbmZpZyc7XG5cbmNsYXNzIFdhcnJpb3Ige1xuICBuYW1lOiBzdHJpbmc7XG4gIHg6IG51bWJlcjtcbiAgeTogbnVtYmVyO1xuICBjZW50ZXJYOiBudW1iZXI7XG4gIGNlbnRlclk6IG51bWJlcjtcbiAgcmFkaXVzOiBudW1iZXI7XG4gIG1vdmVUb05vZGVYOiBudW1iZXI7XG4gIG1vdmVUb05vZGVZOiBudW1iZXI7XG4gIGlzQ3VycmVudGx5Q2hvc2VuOiBib29sZWFuID0gZmFsc2U7XG4gIHBvc2l0aW9uSW5Vbml0OiBudW1iZXI7XG4gIHJvd0luVW5pdDogbnVtYmVyO1xuICBjb2xJblVuaXQ6IG51bWJlcjtcbiAgbW92ZVRvTm9kZTogYW55O1xuXG4gIGNvbnN0cnVjdG9yKG5hbWU6c3RyaW5nLCB4Om51bWJlciwgeTpudW1iZXIsIHJhZGl1czpudW1iZXIpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgICB0aGlzLnJhZGl1cyA9IHJhZGl1cztcbiAgICB0aGlzLmNlbnRlclggPSB4ICsgKGdyaWRTaXplIC8gMik7XG4gICAgdGhpcy5jZW50ZXJZID0geSArIChncmlkU2l6ZSAvIDIpO1xuICB9XG5cbiAgc2V0WCh4Om51bWJlcikge1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy5jZW50ZXJYID0geCArIChncmlkU2l6ZSAvIDIpO1xuICB9XG5cbiAgc2V0WSh5Om51bWJlcikge1xuICAgIHRoaXMueSA9IHk7XG4gICAgdGhpcy5jZW50ZXJZID0geSArIChncmlkU2l6ZSAvIDIpO1xuICB9XG5cbiAgYXNzaWduUG9zaXRpb24obmV3UG9zaXRpb246IG51bWJlcikge1xuICAgIHRoaXMucG9zaXRpb25JblVuaXQgPSBuZXdQb3NpdGlvbjtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBXYXJyaW9yO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3dhcnJpb3IvV2Fycmlvci50cyIsImltcG9ydCB7Y3JlYXRlV2Fycmlvcn0gZnJvbSAnLi4vd2Fycmlvci93YXJyaW9yQWN0aW9uJztcbmltcG9ydCB7Z3JpZFNpemV9IGZyb20gJy4uL21hcC9tYXBDb25maWcnO1xuaW1wb3J0IHt1cGRhdGVXYXJyaW9yfSBmcm9tICcuLi93YXJyaW9yL3dhcnJpb3JNb3ZlbWVudCc7XG5pbXBvcnQgVW5pdCBmcm9tICcuL1VuaXQnO1xuXG5pbXBvcnQge1xuICB1bml0cyxcbiAgY3VycmVudGx5Q2hvc2VuVW5pdCxcbiAgYXNzaWduQ3VycmVudGx5Q2hvc2VuVW5pdFxufSBmcm9tICcuLi9zdG9yZS91bml0U3RvcmUnO1xuXG5pbXBvcnQge1xuICBhc3NpZ25XYXJyaW9yTW92ZVRvUG9zaXRpb24sXG59IGZyb20gJy4uL3dhcnJpb3Ivd2FycmlvckFjdGlvbic7XG5cbmltcG9ydCB7XG4gIGdldE5vZGVGcm9tTWFwXG59IGZyb20gJy4uL3BhdGgvZHJhd1BhdGgnO1xuXG5pbXBvcnQge2FTdGFyfSBmcm9tICcuLi9wYXRoL0FTdGFyJztcblxuZXhwb3J0IGNvbnN0IG9uQ2hhbmdlV2FycmlvclBvc2l0aW9uSW5Vbml0ID0gKHVuaXQ6YW55LCBwYXRoOmFueVtdLCBpOm51bWJlcj0wLCBjdXJyZW50TW92ZVRvWDpudW1iZXIsIGN1cnJlbnRNb3ZlVG9ZOm51bWJlcikgPT4ge1xuICBsZXQgcm93ID0gdW5pdC5xdWFudGl0eSAvIDI7XG4gIGxldCBjb2wgPSBNYXRoLmNlaWwodW5pdC5xdWFudGl0eSAvIHJvdyk7XG4gIGZvcihsZXQgd2FycmlvciBvZiB1bml0LndhcnJpb3JzKSB7XG4gICAgbGV0IHN0YXJ0Tm9kZSA9IGdldE5vZGVGcm9tTWFwKGN1cnJlbnRseUNob3NlblVuaXQuY29tbWFuZGVyUG9zaXRpb25YLCBjdXJyZW50bHlDaG9zZW5Vbml0LmNvbW1hbmRlclBvc2l0aW9uWSk7XG4gICAgbGV0IGZpbmlzaE5vZGUgPSBnZXROb2RlRnJvbU1hcChjdXJyZW50TW92ZVRvWCwgY3VycmVudE1vdmVUb1kpO1xuICAgIGxldCBwYXRoOmFueSA9IGFTdGFyKHN0YXJ0Tm9kZSwgZmluaXNoTm9kZSk7XG4gICAgYXNzaWduV2Fycmlvck1vdmVUb1Bvc2l0aW9uKHdhcnJpb3IsIGN1cnJlbnRNb3ZlVG9YLCBjdXJyZW50TW92ZVRvWSk7XG4gICAgdXBkYXRlV2Fycmlvcih3YXJyaW9yLCBwYXRoLCBpLCBjdXJyZW50TW92ZVRvWCwgY3VycmVudE1vdmVUb1kpO1xuICAgIGN1cnJlbnRNb3ZlVG9YICs9IGdyaWRTaXplO1xuICAgIGNvbnNvbGUubG9nKCdpJywgaSk7XG4gICAgY29uc29sZS5sb2coJ2N1cnJlbnRNb3ZlVG9YJywgY3VycmVudE1vdmVUb1gpO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBhZGRXYXJyaW9yc1RvVW5pdCA9ICh1bml0OmFueSkgPT4ge1xuICBsZXQgc3RhcnRYID0gdW5pdC5jb21tYW5kZXJQb3NpdGlvblg7XG4gIGxldCBzdGFydFkgPSB1bml0LmNvbW1hbmRlclBvc2l0aW9uWTtcbiAgbGV0IGkgPSAxO1xuICBsZXQgcm93ID0gdW5pdC5xdWFudGl0eSAvIDI7XG4gIGxldCBjb2wgPSBNYXRoLmNlaWwodW5pdC5xdWFudGl0eSAvIHJvdyk7XG4gIGxldCBmaW5pc2hYID0gc3RhcnRYICsgKChyb3cgLSAxKSAqIGdyaWRTaXplKTtcbiAgbGV0IGZpbmlzaFkgPSBzdGFydFkgKyAoKGNvbCAtIDEpICogZ3JpZFNpemUpO1xuICBsZXQgcmFkaXVzID0gZ3JpZFNpemUgLyA0O1xuICBsZXQgdW5pdFJvdyA9IDE7IC8vIHRvIGdpdmUgd2FycmlvciByb3cgYW5kIGNvbHVtbiBwb3NpdGlvbiBpbiB1bml0XG4gIGxldCB1bml0Q29sID0gMTtcbiAgdW5pdC5yb3cgPSByb3c7IC8vIGFkZCByb3cgaW5zdGFuY2UgZm9yIHVuaXRcbiAgdW5pdC5jb2wgPSBjb2w7IC8vIGFkZCBjb2wgaW5zdGFuY2UgZm9yIHVuaXRcbiAgZm9yKGxldCB5ID0gc3RhcnRYOyB5IDw9IGZpbmlzaFk7IHkgKz0gZ3JpZFNpemUpIHtcbiAgICBpZihpIDw9IHVuaXQucXVhbnRpdHkpIHtcbiAgICAgIGZvcihsZXQgeCA9IHN0YXJ0WDsgeCA8PSBmaW5pc2hYOyAgeCs9IGdyaWRTaXplKSB7XG4gICAgICAgIGxldCBjdXJyZW50V2FycmlvciA9IGNyZWF0ZVdhcnJpb3IodW5pdC5uYW1lLCB4LCB5LCByYWRpdXMpO1xuICAgICAgICBjdXJyZW50V2Fycmlvci5hc3NpZ25Qb3NpdGlvbihpKTtcbiAgICAgICAgY3VycmVudFdhcnJpb3Iucm93SW5Vbml0ID0gdW5pdFJvdztcbiAgICAgICAgY3VycmVudFdhcnJpb3IuY29sSW5Vbml0ID0gdW5pdENvbDtcbiAgICAgICAgdW5pdC5hZGRXYXJyaW9yVG9Vbml0KGN1cnJlbnRXYXJyaW9yKTtcbiAgICAgICAgaSsrO1xuICAgICAgICB1bml0Q29sKys7XG4gICAgICB9XG4gICAgfVxuICAgIHVuaXRSb3crKztcbiAgICB1bml0Q29sID0gMTtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgY3JlYXRlVW5pdCA9IChuYW1lOnN0cmluZywgcXVhbnRpdHk6bnVtYmVyLCBwb3NYOm51bWJlciwgcG9zWTogbnVtYmVyKSA9PiB7XG4gIGxldCBuZXdVbml0ID0gbmV3IFVuaXQobmFtZSwgcXVhbnRpdHksIHBvc1gsIHBvc1kpO1xuICBsZXQgcmFkaXVzID0gZ3JpZFNpemUgLyA0O1xuICBhZGRXYXJyaW9yc1RvVW5pdChuZXdVbml0KTtcbiAgdW5pdHMucHVzaChuZXdVbml0KTtcbn1cblxuLy8gd2FycmlvcnMgaW4gdGhlIHVuaXQgaGF2ZSBzYW1lIG5hbWUgYXMgdW5pdCB0aGF0IHRoZXkgYXNzaWduZWQgdG9cbi8vIGlmIHdhcnJpb3Igd2l0aCBzYW1lIG5hbWUgaXMgY2hvc2VuIHRoYXQgbWVhbnMgdGhhdCB1bml0IGFsc29cbi8vIGhhcyBiZWVuIGNob3NlblxuZXhwb3J0IGNvbnN0IG9uQ2hvb3NlVW5pdCA9ICh1bml0czphbnksIGN1cnJlbnRseUNob3NlbldhcnJpb3I6YW55KSA9PiB7XG4gIGxldCBmb3VuZGVkVW5pdCA9IG51bGw7XG4gIGlmKGN1cnJlbnRseUNob3NlbldhcnJpb3IpIHtcbiAgICBmb3IobGV0IHVuaXQgb2YgdW5pdHMpIHtcbiAgICAgIGlmKGN1cnJlbnRseUNob3NlbldhcnJpb3IubmFtZSA9PT0gdW5pdC5uYW1lKSB7XG4gICAgICAgIGZvdW5kZWRVbml0ID0gdW5pdDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgYXNzaWduQ3VycmVudGx5Q2hvc2VuVW5pdChmb3VuZGVkVW5pdCk7XG4gIGNvbnNvbGUubG9nKCdjdXJyZW50bHlDaG9zZW5Vbml0JywgY3VycmVudGx5Q2hvc2VuVW5pdCk7XG59XG5cbmxldCBnZXRVbml0Q29tbWFuZGVyID0gKHVuaXQ6YW55KSA9PiB7XG4gIGZvcihsZXQgd2FycmlvciBvZiB1bml0LndhcnJpb3JzKSB7XG4gICAgaWYod2Fycmlvci5wb3NpdGlvbkluVW5pdCA9PT0gMSkge1xuICAgICAgcmV0dXJuIHdhcnJpb3I7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCB1cGRhdGVVbml0ID0gKHVuaXQ6YW55LCBwYXRoOmFueVtdLCBpOm51bWJlcj0wLCBjdXJyZW50TW92ZVRvWDpudW1iZXIsIGN1cnJlbnRNb3ZlVG9ZOm51bWJlcikgPT4ge1xuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdW5pdC91bml0QWN0aW9ucy50cyIsIlxuXG5jbGFzcyBVbml0IHtcbiAgbmFtZTogc3RyaW5nO1xuICBxdWFudGl0eTogbnVtYmVyO1xuICBjb21tYW5kZXJQb3NpdGlvblg6IG51bWJlcjtcbiAgY29tbWFuZGVyUG9zaXRpb25ZOiBudW1iZXI7XG4gIHdhcnJpb3JzOiBhbnlbXSA9IFtdO1xuICBjb2w6IG51bWJlcjtcbiAgcm93OiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IobmFtZTpzdHJpbmcsIHF1YW50aXR5Om51bWJlciwgcG9zWDpudW1iZXIsIHBvc1k6bnVtYmVyKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLnF1YW50aXR5ID0gcXVhbnRpdHk7XG4gICAgdGhpcy5jb21tYW5kZXJQb3NpdGlvblggPSBwb3NYO1xuICAgIHRoaXMuY29tbWFuZGVyUG9zaXRpb25ZID0gcG9zWDtcbiAgfVxuICBhZGRXYXJyaW9yVG9Vbml0KHdhcnJpb3I6YW55KSB7XG4gICAgdGhpcy53YXJyaW9ycy5wdXNoKHdhcnJpb3IpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFVuaXQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdW5pdC9Vbml0LnRzIiwiZXhwb3J0IGNvbnN0IGdldE1pbkZTY29yZSA9IChvcGVuOmFueVtdKSA9PiB7XG4gIGxldCBtaW4gPSAwO1xuICBmb3IobGV0IGkgPSAxOyBpIDwgb3Blbi5sZW5ndGggLSAxOyArK2kpIHtcbiAgICBpZihvcGVuW21pbl0uZlNjb3JlID4gb3BlbltpXS5mU2NvcmUpIHtcbiAgICAgIG1pbiA9IGk7XG4gICAgfVxuICB9XG4gIHJldHVybiBvcGVuW21pbl07XG59XG5cbmV4cG9ydCBjb25zdCB1bmNsb3NlZE5laWdib3VycyA9IChjdXJyZW50OmFueSwgY2xvc2VkOmFueSkgPT4ge1xuICBsZXQgbmVpZ2hib3Vyc05vdEluQ2xvc2VkID0gW107XG4gIGZvcihsZXQgbmVpZ2hib3VyIG9mIGN1cnJlbnQubmVpZ2hib3Vycykge1xuICAgIGxldCBpc0luQ2xvc2VkOmJvb2xlYW4gPSBmYWxzZTtcbiAgICBmb3IobGV0IG5vZGUgb2YgY2xvc2VkKSB7XG4gICAgICBpZihuZWlnaGJvdXIueCA9PT0gbm9kZS54ICYmIG5laWdoYm91ci55ID09PSBub2RlLnkpIHtcbiAgICAgICAgaXNJbkNsb3NlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIGlmKCFpc0luQ2xvc2VkKSB7XG4gICAgICBuZWlnaGJvdXJzTm90SW5DbG9zZWQucHVzaChuZWlnaGJvdXIpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbmVpZ2hib3Vyc05vdEluQ2xvc2VkO1xufVxuXG5leHBvcnQgY29uc3QgaXNPYmplY3RJbk1hcEtleXMgPSAob2JqZWN0OmFueSwgbWFwOmFueSkgPT4ge1xuICBsZXQgYXJyOmFueVtdID0gQXJyYXkuZnJvbShtYXApO1xuICBsZXQgcmVzdWx0OmJvb2xlYW4gPSBmYWxzZTtcbiAgZm9yKGxldCBpID0gMDsgaSA8IGFyci5sZW5ndGg7ICsraSkge1xuICAgIC8vY29uc29sZS5sb2coJ29iamVjdCcsIG9iamVjdCk7XG4gICAgaWYoYXJyW2ldWzBdLnggPT09IG9iamVjdC54ICYmIGFycltpXVswXS55ID09PSBvYmplY3QueSkge1xuICAgICAgcmVzdWx0ID0gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgY29uc29sZS5sb2coJ3Jlc3VsdCcsIHJlc3VsdCk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcGF0aC9hU3RhclV0aWxzLnRzIiwiaW1wb3J0IHtcbiAgZ2V0Q2VudHJhbFdhcnJpb3JJblVuaXQsXG4gIGdldENsb3Nlc3RXYXJyaW9yVG9EZXN0aW5hdGlvbkluQXJyYXlcbn0gZnJvbSAnLi91bml0VXRpbHMnO1xuaW1wb3J0IHtncmlkU2l6ZX0gZnJvbSAnLi4vbWFwL21hcENvbmZpZyc7XG5pbXBvcnQge21hcH0gZnJvbSAnLi4vbWFwL2NyZWF0ZU1hcCc7XG5pbXBvcnQge2dldE5vZGVGcm9tTWFwfSBmcm9tICcuLi9wYXRoL2RyYXdQYXRoJztcbmltcG9ydCB7XG4gIGdldE5vZGVGcm9tQXJyYXksXG4gIGRlbGV0ZU9iamVjdEZyb21BcnJheVxufSBmcm9tICcuLi91dGlscy9vYmpVdGlscyc7XG5pbXBvcnQge3VwZGF0ZVdhcnJpb3J9IGZyb20gJy4uL3dhcnJpb3Ivd2Fycmlvck1vdmVtZW50JztcbmltcG9ydCB7YVN0YXJ9IGZyb20gJy4uL3BhdGgvQVN0YXInO1xuXG5leHBvcnQgY29uc3QgbW92ZVRvUG9zaXRpb24gPSAodW5pdDphbnksIG5leHROb2RlOmFueSkgPT4ge1xuICAvLyBhc3NpZ24gbW92ZVRvUG9zaXRpb25zIHRvIHdhcnJpb3JzXG4gIGxldCBtb3ZpbmdXYXJyaW9ycyA9IE9iamVjdC5hc3NpZ24oW10sIHVuaXQud2FycmlvcnMpO1xuICBsZXQgY2VudHJhbFdhcnJpb3IgPSBnZXRDZW50cmFsV2FycmlvckluVW5pdCh1bml0KTtcbiAgbGV0IHVwZGF0ZWRXYXJyaW9ycyA9IGRlbGV0ZU9iamVjdEZyb21BcnJheShjZW50cmFsV2FycmlvciwgdW5pdC53YXJyaW9ycyk7XG4gIC8vY29uc29sZS5sb2coJ3VwZGF0ZWRXYXJyaW9ycycsIHVwZGF0ZWRXYXJyaW9ycyk7XG4gIGNlbnRyYWxXYXJyaW9yLm1vdmVUb05vZGUgPSBuZXh0Tm9kZTtcbiAgLy8gYXNzaWduIGNlbnRyYWxVbml0IGdlIHRvIG5leHQgbmV4dE5vZGVcbiAgLy8gYXNzaWduIG90aGVyIHdhcnJpb3JzIG5leHQgcG9zaXRpb25zXG4gIGZvcihsZXQgd2FycmlvciBvZiB1cGRhdGVkV2FycmlvcnMpIHtcbiAgICBsZXQge2RpZmZlcmVuY2VJblgsZGlmZmVyZW5jZUluWX0gPSBjaGVja1dhcnJpb3JzUG9zaXRpb25zKGNlbnRyYWxXYXJyaW9yLCB3YXJyaW9yKTtcbiAgICBsZXQgeDpudW1iZXIgPSBuZXh0Tm9kZS54ICsgKGRpZmZlcmVuY2VJblggKiBncmlkU2l6ZSk7XG4gICAgbGV0IHk6bnVtYmVyID0gbmV4dE5vZGUueSArIChkaWZmZXJlbmNlSW5ZICogZ3JpZFNpemUpO1xuICAgIGNvbnNvbGUuZXJyb3IoJ3g6JywgeCwgJ3k6JywgeSk7XG4gICAgbGV0IG1vdmVUb05vZGUgPSBnZXROb2RlRnJvbU1hcCh4LCB5KTtcbiAgICBjb25zb2xlLmVycm9yKCdtb3ZlVG9Ob2RlJywgbW92ZVRvTm9kZSk7XG4gICAgd2Fycmlvci5tb3ZlVG9Ob2RlID0gbW92ZVRvTm9kZTtcbiAgfVxuICAvLyBjb21tYW5kIHVuaXQgdG8gbW92ZVxuICAvLyB3aGlsZShtb3ZpbmdXYXJyaW9ycy5sZW5ndGggPiAwKSB7XG4gIC8vICAgY29uc29sZS5lcnJvcignbW92aW5nV2FycmlvcnM6JywgbW92aW5nV2FycmlvcnMpO1xuICAvLyAgIGxldCBjbG9zZXN0ID0gZ2V0Q2xvc2VzdFdhcnJpb3JUb0Rlc3RpbmF0aW9uSW5BcnJheShtb3ZpbmdXYXJyaW9ycywgbmV4dE5vZGUueCwgbmV4dE5vZGUueSk7XG4gIC8vICAgbGV0IHN0YXJ0Tm9kZSA9IGdldE5vZGVGcm9tTWFwKGNsb3Nlc3QueCwgY2xvc2VzdC55KTtcbiAgLy8gICBsZXQgcGF0aDphbnkgPSBhU3RhcihzdGFydE5vZGUsIGNsb3Nlc3QubW92ZVRvTm9kZSk7XG4gIC8vICAgdXBkYXRlV2FycmlvcihjbG9zZXN0LCBwYXRoLCAwLCBjbG9zZXN0Lm1vdmVUb05vZGUueCwgY2xvc2VzdC5tb3ZlVG9Ob2RlLnkpO1xuICAvLyAgIG1vdmluZ1dhcnJpb3JzID0gZGVsZXRlT2JqZWN0RnJvbUFycmF5KGNsb3Nlc3QsIG1vdmluZ1dhcnJpb3JzKTtcbiAgLy8gfVxuICB1bml0TW92ZW1lbnQobW92aW5nV2FycmlvcnMsIG5leHROb2RlKTtcbn1cblxuZXhwb3J0IGNvbnN0IGNoZWNrV2FycmlvcnNQb3NpdGlvbnMgPSAoY2VudHJhbFdhcnJpb3I6YW55LCBjdXJyZW50V2FycmlvcjphbnkpID0+IHtcbiAgbGV0IGNlbnRyYWxDb2wgPSBjZW50cmFsV2Fycmlvci5jb2xJblVuaXQ7XG4gIGxldCBjZW50cmFsUm93ID0gY2VudHJhbFdhcnJpb3Iucm93SW5Vbml0O1xuICBsZXQgY3VycmVudFJvdyA9IGN1cnJlbnRXYXJyaW9yLnJvd0luVW5pdDtcbiAgbGV0IGN1cnJlbnRDb2wgPSBjdXJyZW50V2Fycmlvci5jb2xJblVuaXQ7XG4gIGxldCBkaWZmZXJlbmNlSW5YID0gY3VycmVudENvbCAtIGNlbnRyYWxDb2w7XG4gIGxldCBkaWZmZXJlbmNlSW5ZID0gY3VycmVudFJvdyAtIGNlbnRyYWxSb3c7XG4gIHJldHVybiB7XG4gICAgZGlmZmVyZW5jZUluWCxcbiAgICBkaWZmZXJlbmNlSW5ZXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHVuaXRNb3ZlbWVudCA9IChtb3ZpbmdXYXJyaW9yczphbnlbXSwgbmV4dE5vZGU6YW55KSA9PiB7XG4gIGlmKG1vdmluZ1dhcnJpb3JzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybjtcbiAgfVxuICBsZXQgY2xvc2VzdCA9IGdldENsb3Nlc3RXYXJyaW9yVG9EZXN0aW5hdGlvbkluQXJyYXkobW92aW5nV2FycmlvcnMsIG5leHROb2RlLngsIG5leHROb2RlLnkpO1xuICBsZXQgc3RhcnROb2RlID0gZ2V0Tm9kZUZyb21NYXAoY2xvc2VzdC54LCBjbG9zZXN0LnkpO1xuICBsZXQgcGF0aDphbnkgPSBhU3RhcihzdGFydE5vZGUsIGNsb3Nlc3QubW92ZVRvTm9kZSk7XG4gIHVwZGF0ZVdhcnJpb3IoY2xvc2VzdCwgcGF0aCwgMCwgY2xvc2VzdC5tb3ZlVG9Ob2RlLngsIGNsb3Nlc3QubW92ZVRvTm9kZS55KTtcbiAgbW92aW5nV2FycmlvcnMgPSBkZWxldGVPYmplY3RGcm9tQXJyYXkoY2xvc2VzdCwgbW92aW5nV2FycmlvcnMpO1xuICB1bml0TW92ZW1lbnQobW92aW5nV2FycmlvcnMsIG5leHROb2RlKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91bml0L3VuaXRNb3ZlbWVudC50cyJdLCJzb3VyY2VSb290IjoiIn0=