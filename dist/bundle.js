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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
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
var Warrior_1 = __webpack_require__(10);
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
/* 7 */
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var mapConfig_1 = __webpack_require__(0);
var drawGrid_1 = __webpack_require__(9);
var createMap_1 = __webpack_require__(2);
var drawPath_1 = __webpack_require__(4);
var warriorStore_1 = __webpack_require__(5);
var warriorAction_1 = __webpack_require__(1);
var unitActions_1 = __webpack_require__(11);
var unitStore_1 = __webpack_require__(6);
var unitUtils_1 = __webpack_require__(7);
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
/* 9 */
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
/* 10 */
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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var warriorAction_1 = __webpack_require__(1);
var mapConfig_1 = __webpack_require__(0);
var warriorMovement_1 = __webpack_require__(12);
var Unit_1 = __webpack_require__(13);
var unitStore_1 = __webpack_require__(6);
var warriorAction_2 = __webpack_require__(1);
var drawPath_1 = __webpack_require__(4);
var AStar_1 = __webpack_require__(14);
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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var warriorAction_1 = __webpack_require__(1);
var mapConfig_1 = __webpack_require__(0);
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
    mapConfig_1.ctx.clearRect(nodeToClear.x, nodeToClear.y, mapConfig_1.gridSize, mapConfig_1.gridSize);
    warrior.setX(node.x); // calculate center of the current node
    warrior.setY(node.y);
    //console.log('warrior.x', warrior.x, 'warrior.y', warrior.y);
    warriorAction_1.drawWarrior(warrior);
    i++;
    if (i !== updatedPath.length) {
        setTimeout(function () {
            exports.updateWarrior(warrior, updatedPath, i, currentMoveToX, currentMoveToY);
        }, 400);
    }
};


/***/ }),
/* 13 */
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
/* 14 */
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
var unitUtils_1 = __webpack_require__(7);
var mapConfig_1 = __webpack_require__(0);
var drawPath_1 = __webpack_require__(4);
var objUtils_1 = __webpack_require__(3);
var warriorMovement_1 = __webpack_require__(12);
var AStar_1 = __webpack_require__(14);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZWUxOGFlYWJiZWMzNjk1MDFhNzEiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hcC9tYXBDb25maWcudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dhcnJpb3Ivd2FycmlvckFjdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFwL2NyZWF0ZU1hcC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvb2JqVXRpbHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhdGgvZHJhd1BhdGgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0b3JlL3dhcnJpb3JTdG9yZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc3RvcmUvdW5pdFN0b3JlLnRzIiwid2VicGFjazovLy8uL3NyYy91bml0L3VuaXRVdGlscy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2FtZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFwL2RyYXdHcmlkLnRzIiwid2VicGFjazovLy8uL3NyYy93YXJyaW9yL1dhcnJpb3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VuaXQvdW5pdEFjdGlvbnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dhcnJpb3Ivd2Fycmlvck1vdmVtZW50LnRzIiwid2VicGFjazovLy8uL3NyYy91bml0L1VuaXQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhdGgvQVN0YXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhdGgvYVN0YXJVdGlscy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdW5pdC91bml0TW92ZW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QUFDO0lBQ0QsSUFBSSxPQUFPLEdBQUcsaURBQXFDLENBQUMsY0FBYyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVGLElBQUksU0FBUyxHQUFHLHlCQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckQsSUFBSSxJQUFJLEdBQU8sYUFBSyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDcEQsK0JBQWEsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVFLGNBQWMsR0FBRyxnQ0FBcUIsQ0FBQyxPQUFPLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFDaEUsb0JBQVksQ0FBQyxjQUFjLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDekMsQ0FBQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA4KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBlZTE4YWVhYmJlYzM2OTUwMWE3MSIsIi8vIGdsb2JhbCB2YXJpYWJsZXNcbmV4cG9ydCBjb25zdCBXSURUSDogbnVtYmVyID0gMTIwMDtcbmV4cG9ydCBjb25zdCBIRUlHSFQ6IG51bWJlciA9IDYwMDtcbmV4cG9ydCBjb25zdCBncmlkU2l6ZTpudW1iZXIgPSAyMDtcblxuLy8gY3JlYXRlIENhbnZhc1xuZXhwb3J0IGxldCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbmNhbnZhcy5pZCA9IFwiY2FudmFzXCI7XG5jYW52YXMud2lkdGggPSBXSURUSDtcbmNhbnZhcy5oZWlnaHQgPSBIRUlHSFQ7XG5jYW52YXMuc3R5bGUuYm9yZGVyID0gXCIxcHggc29saWRcIjtcblxuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjYW52YXMpO1xuXG4vLyBkZWZpbmUgMmQgY29udGV4dFxuZXhwb3J0IGxldCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21hcC9tYXBDb25maWcudHMiLCJpbXBvcnQge2dyaWRTaXplfSBmcm9tICcuLi9tYXAvbWFwQ29uZmlnJztcbmltcG9ydCB7XG4gIHdhcnJpb3JzLFxuICBjdXJyZW50bHlDaG9zZW5XYXJyaW9yLFxuICBhc3NpZ25DdXJyZW50bHlDaG9zZW5XYXJyaW9yXG59IGZyb20gJy4uL3N0b3JlL3dhcnJpb3JTdG9yZSc7XG5pbXBvcnQge2N0eH0gZnJvbSAnLi4vbWFwL21hcENvbmZpZyc7XG5pbXBvcnQgV2FycmlvciBmcm9tICcuL1dhcnJpb3InO1xuXG5leHBvcnQgY29uc3Qgb25DaG9vc2VXYXJyaW9yID0gKHdhcnJpb3JzOmFueVtdLCBtb3VzZVg6bnVtYmVyLCBtb3VzZVk6bnVtYmVyKSA9PiB7XG4gIGxldCBmb3VuZGVkV2FycmlvciA9IG51bGw7XG4gIGZvcihsZXQgd2FycmlvciBvZiB3YXJyaW9ycykge1xuICAgIGxldCBib3R0b21SaWdodFggPSB3YXJyaW9yLnggKyBncmlkU2l6ZTtcbiAgICBsZXQgYm90dG9tUmlnaHRZID0gd2Fycmlvci55ICsgZ3JpZFNpemU7XG4gICAgaWYobW91c2VYID49IHdhcnJpb3IueCAmJiBtb3VzZVggPCBib3R0b21SaWdodFggJiYgbW91c2VZID49IHdhcnJpb3IueSAmJiBtb3VzZVkgPCBib3R0b21SaWdodFkpIHtcbiAgICAgIGNvbnNvbGUubG9nKCd3YXJyaW9yJywgd2Fycmlvci5uYW1lLCAnIHdhcyBjaG9zZW4nKTtcbiAgICAgIHdhcnJpb3IuaXNDdXJyZW50bHlDaG9zZW4gPSB0cnVlO1xuICAgICAgZm91bmRlZFdhcnJpb3IgPSB3YXJyaW9yO1xuICAgIH1cbiAgfVxuICBhc3NpZ25DdXJyZW50bHlDaG9zZW5XYXJyaW9yKGZvdW5kZWRXYXJyaW9yKTtcbiAgY29uc29sZS5sb2coJ2N1cnJlbnRseUNob3NlbldhcnJpb3InLCBjdXJyZW50bHlDaG9zZW5XYXJyaW9yKTtcbn1cblxuZXhwb3J0IGNvbnN0IGRyYXdXYXJyaW9yID0gKHdhcnJpb3I6YW55KSA9PiB7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5hcmMod2Fycmlvci5jZW50ZXJYLCB3YXJyaW9yLmNlbnRlclksIHdhcnJpb3IucmFkaXVzLCAwLCBNYXRoLlBJKjIpO1xuICAgIGN0eC5maWxsU3R5bGUgPSAnI2Q5MjUxMCc7XG4gICAgY3R4LmZpbGwoKTtcbiAgICBjdHguY2xvc2VQYXRoKCk7XG59XG5cbmV4cG9ydCBjb25zdCBhc3NpZ25XYXJyaW9yTW92ZVRvUG9zaXRpb24gPSAod2FycmlvcjphbnksIHg6bnVtYmVyLCB5Om51bWJlcikgPT4ge1xuICAvL2NvbnNvbGUuZXJyb3IoJ2Fzc2lnbk1vdmVUb1Bvc2l0aW9uJyk7XG4gIGlmKHdhcnJpb3IpIHtcbiAgICB3YXJyaW9yLm1vdmVUb05vZGVYID0geDtcbiAgICB3YXJyaW9yLm1vdmVUb05vZGVZID0geTtcbiAgICBjb25zb2xlLmxvZyh3YXJyaW9yLm5hbWUgKyAnIGlzIG1vdmluZyB0byBub2RlOicgKyB3YXJyaW9yLm1vdmVUb05vZGVYICsgJyB5OicgKyB3YXJyaW9yLm1vdmVUb05vZGVZKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLmxvZygnd2FycmlvciBub3QgY2hvc2VuJyk7XG4gIH1cbn1cblxuLy8gY3JlYXRlIFVuaXQgYW5kIGltbWVkaWF0bHkgcHVzaCBpdCBpbnRvIHVuaXRzIGFycmF5XG5leHBvcnQgbGV0IGNyZWF0ZVdhcnJpb3IgPSAobmFtZTpzdHJpbmcsIHg6bnVtYmVyLCB5Om51bWJlciwgcmFkaXVzOm51bWJlcikgPT4ge1xuICAvL2NvbnNvbGUuZXJyb3IoJ2NyZWF0ZVVuaXQnKTtcbiAgbGV0IHdhcnJpb3IgPSBuZXcgV2FycmlvcihuYW1lLCB4LCB5LCByYWRpdXMpO1xuICB3YXJyaW9ycy5wdXNoKHdhcnJpb3IpO1xuICBkcmF3V2Fycmlvcih3YXJyaW9yKTtcbiAgcmV0dXJuIHdhcnJpb3I7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvd2Fycmlvci93YXJyaW9yQWN0aW9uLnRzIiwiaW1wb3J0IHtcbiAgY2FudmFzLFxuICBjdHgsXG4gIFdJRFRILFxuICBIRUlHSFQsXG4gIGdyaWRTaXplXG59IGZyb20gJy4uL21hcC9tYXBDb25maWcnO1xuXG5pbXBvcnQge1xuICBkZWxldGVPYmplY3RGcm9tQXJyYXksXG59IGZyb20gJy4uL3V0aWxzL29ialV0aWxzJztcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZU5vZGVzID0gKCkgPT4ge1xuICBsZXQgbWFwOmFueVtdID0gW107XG4gIGxldCB2YWx1ZSA9IDE7XG4gIGxldCBpZCA9IDA7XG4gIGZvcihsZXQgeSA9IDA7IHkgPD0gSEVJR0hUOyB5Kz0gZ3JpZFNpemUpIHtcbiAgICBmb3IobGV0IHggPSAwOyB4IDw9IFdJRFRIOyB4Kz0gZ3JpZFNpemUpIHtcbiAgICAgIG1hcC5wdXNoKHtcbiAgICAgICAgaWQ6IGlkLFxuICAgICAgICB4OiB4LFxuICAgICAgICB5OiB5LFxuICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgIG5laWdoYm91cnM6IFtdXG4gICAgICB9KTtcbiAgICAgIGlkKys7XG4gICAgfVxuICB9XG4gIHJldHVybiBtYXA7XG59XG5cbmV4cG9ydCBjb25zdCBuZWlnaGJvdXJzID0gKG5vZGU6YW55KSA9PiB7XG4gIGxldCBkaXJzID0gW1xuICAgIHt4OiAtZ3JpZFNpemUsIHk6IC1ncmlkU2l6ZSwgZGlzdGFuY2U6IDE0fSxcbiAgICB7eDogMCwgeTogLWdyaWRTaXplLCBkaXN0YW5jZTogMTB9LFxuICAgIHt4OiBncmlkU2l6ZSwgeTogLWdyaWRTaXplLCBkaXN0YW5jZTogMTR9LFxuICAgIHt4OiAtZ3JpZFNpemUsIHk6IDAsIGRpc3RhbmNlOiAxMH0sXG4gICAge3g6IGdyaWRTaXplLCB5OiAwLCBkaXN0YW5jZTogMTB9LFxuICAgIHt4OiAtZ3JpZFNpemUsIHk6IGdyaWRTaXplLCBkaXN0YW5jZTogMTR9LFxuICAgIHt4OiAwLCB5OiBncmlkU2l6ZSwgZGlzdGFuY2U6IDEwfSxcbiAgICB7eDogZ3JpZFNpemUsIHk6IGdyaWRTaXplLCBkaXN0YW5jZTogMTR9XG4gIF07XG4gIGxldCByZXN1bHQgPSBbXTtcbiAgZm9yKGxldCBkaXIgb2YgZGlycykge1xuICAgIGxldCBuZWlnaGJvdXIgPSB7XG4gICAgICB4OiBub2RlLnggKyBkaXIueCxcbiAgICAgIHk6IG5vZGUueSArIGRpci55LFxuICAgICAgZGlzdGFuY2U6IGRpci5kaXN0YW5jZVxuICAgIH1cbiAgICBpZihuZWlnaGJvdXIueCA+PSAwICYmIG5laWdoYm91ci54IDwgV0lEVEggJiYgbmVpZ2hib3VyLnkgPj0gMCAmJiBuZWlnaGJvdXIueSA8IEhFSUdIVCkge1xuICAgICAgICBsZXQgZmluZGVkOmJvb2xlYW4gPSBmYWxzZTtcbiAgICAgICAgZm9yKGxldCBub2RlIG9mIG1hcCkge1xuICAgICAgICAgIGlmKG5laWdoYm91ci54ID09PSBub2RlLnggJiYgbmVpZ2hib3VyLnkgPT09IG5vZGUueSkge1xuICAgICAgICAgICAgZmluZGVkID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYoZmluZGVkKSB7XG4gICAgICAgICAgcmVzdWx0LnB1c2goe1xuICAgICAgICAgICAgeDogbmVpZ2hib3VyLngsXG4gICAgICAgICAgICB5OiBuZWlnaGJvdXIueSxcbiAgICAgICAgICAgIGRpc3RhbmNlOiBuZWlnaGJvdXIuZGlzdGFuY2UsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGNvbnN0IGFkZE5laWdoYm91cnMgPSAobWFwOmFueVtdKSA9PiB7XG4gIGZvcihsZXQgbm9kZSBvZiBtYXApIHtcbiAgICBsZXQgbiA9IG5laWdoYm91cnMobm9kZSk7XG4gICAgbm9kZS5uZWlnaGJvdXJzID0gbjtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgY3JlYXRlT25lT2JzdGFjbGUgPSAocG9zaXRpb25YOm51bWJlciwgcG9zaXRpb25ZOm51bWJlciwgdHlwZTpzdHJpbmc9J2ZvcmVzdCcpID0+IHtcbiAgbGV0IG5vZGUgPSB7XG4gICAgeDogcG9zaXRpb25YLFxuICAgIHk6IHBvc2l0aW9uWVxuICB9O1xuICBpZih0eXBlID09PSAnZm9yZXN0JykgY3R4LmZpbGxTdHlsZSA9ICdncmVlbic7XG4gIGVsc2UgaWYodHlwZSA9PT0gJ21vdW50YWluJykgY3R4LmZpbGxTdHlsZSA9ICcjOEI0NTEzJztcbiAgZWxzZSBpZih0eXBlID09PSAncml2ZXInKSBjdHguZmlsbFN0eWxlID0gJ2JsdWUnO1xuICBjdHguZmlsbFJlY3QocG9zaXRpb25YLCBwb3NpdGlvblksIGdyaWRTaXplLCBncmlkU2l6ZSk7XG4gIHJldHVybiBkZWxldGVPYmplY3RGcm9tQXJyYXkobm9kZSwgbWFwKVxufVxuXG5leHBvcnQgY29uc3QgY3JlYXRlT2JzdGFjbGVzID0gKHN0YXJ0WDpudW1iZXIsIGZpbmlzaFg6bnVtYmVyLCBzdGFydFk6bnVtYmVyLCBmaW5pc2hZOm51bWJlciwgdHlwZTpzdHJpbmc9J2ZvcmVzdCcpID0+IHtcbiAgbGV0IG5ld01hcDphbnlbXSA9IG1hcDtcbiAgZm9yKGxldCB4ID0gc3RhcnRYOyB4IDw9IGZpbmlzaFg7IHggKz0gZ3JpZFNpemUpIHtcbiAgICBmb3IobGV0IHkgPSBzdGFydFk7IHkgPD0gZmluaXNoWTsgeSArPSBncmlkU2l6ZSkge1xuICAgICAgbGV0IG5vZGUgPSB7XG4gICAgICAgIHgsXG4gICAgICAgIHlcbiAgICAgIH1cbiAgICAgIG5ld01hcCA9IGRlbGV0ZU9iamVjdEZyb21BcnJheShub2RlLCBuZXdNYXApO1xuICAgICAgaWYodHlwZSA9PT0gJ2ZvcmVzdCcpIGN0eC5maWxsU3R5bGUgPSAnZ3JlZW4nO1xuICAgICAgZWxzZSBpZih0eXBlID09PSAnbW91bnRhaW4nKSBjdHguZmlsbFN0eWxlID0gJyM4QjQ1MTMnO1xuICAgICAgZWxzZSBpZih0eXBlID09PSAncml2ZXInKSBjdHguZmlsbFN0eWxlID0gJ2JsdWUnO1xuICAgICAgbGV0IHhMZW5ndGggPSBNYXRoLmFicyhzdGFydFggLSBmaW5pc2hYKTtcbiAgICAgIGxldCB5TGVuZ3RoID0gTWF0aC5hYnMoc3RhcnRZIC0gZmluaXNoWSk7XG4gICAgICBjdHguZmlsbFJlY3QoeCwgeSwgZ3JpZFNpemUsIGdyaWRTaXplKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG5ld01hcDtcbn1cblxuZXhwb3J0IGxldCBtYXAgPSBjcmVhdGVOb2RlcygpO1xubWFwID0gY3JlYXRlT2JzdGFjbGVzKDEyMCwgMTYwLCAxMjAsIDE2MCwgJ3JpdmVyJyk7XG5tYXAgPSBjcmVhdGVPYnN0YWNsZXMoNjYwLCA4MjAsIDE4MCwgMjAwLCAncml2ZXInKTtcbm1hcCA9IGNyZWF0ZU9ic3RhY2xlcyg5MDAsIDExODAsIDE4MCwgMjAwLCAncml2ZXInKTtcbm1hcCA9IGNyZWF0ZU9uZU9ic3RhY2xlKDMwMCwgMzQwLCAnbW91bnRhaW4nKTtcbm1hcCA9IGNyZWF0ZU9ic3RhY2xlcygyODAsIDMyMCwgMzYwLCAzODAsICdtb3VudGFpbicpO1xubWFwID0gY3JlYXRlT2JzdGFjbGVzKDc0MCwgNzYwLCA0MjAsIDUwMCwgJ2ZvcmVzdCcpO1xubWFwID0gY3JlYXRlT2JzdGFjbGVzKDk2MCwgMTAwMCwgNDQwLCA0NjAsICdmb3Jlc3QnKTtcbm1hcCA9IGNyZWF0ZU9ic3RhY2xlcyg5ODAsIDEwMDAsIDQ0MCwgNTIwLCAnZm9yZXN0Jyk7XG5hZGROZWlnaGJvdXJzKG1hcCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFwL2NyZWF0ZU1hcC50cyIsImV4cG9ydCBjb25zdCBkZWxldGVPYmplY3RGcm9tQXJyYXkgPSAob2JqZWN0OmFueSwgYXJyOmFueVtdKSA9PiB7XG4gIGxldCB1cGRhdGVkQXJyID0gYXJyLmZpbHRlcigoZWwpID0+IHtcbiAgICBpZihlbC54ID09PSBvYmplY3QueCAmJiBlbC55ID09PSBvYmplY3QueSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSk7XG4gIHJldHVybiB1cGRhdGVkQXJyO1xufVxuXG5leHBvcnQgY29uc3QgaXNPYmplY3RJbkFycmF5ID0gKG9iamVjdDphbnksIGFycjphbnlbXSkgPT4ge1xuICBsZXQgcmVzdWx0OmJvb2xlYW4gPSBmYWxzZTtcbiAgZm9yKGxldCBub2RlIG9mIGFycikge1xuICAgIGlmKG9iamVjdC54ID09PSBub2RlLnggJiYgb2JqZWN0LnkgPT09IG5vZGUueSkge1xuICAgICAgcmVzdWx0ID0gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGNvbnN0IGdldE5vZGVGcm9tQXJyYXkgPSAob2JqZWN0OmFueSwgYXJyOmFueVtdKSA9PiB7XG4gIGZvcihsZXQgbm9kZSBvZiBhcnIpIHtcbiAgICBpZihub2RlLnggPT09IG9iamVjdC54ICYmIG5vZGUueSAmJiBvYmplY3QueSkge1xuICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdXRpbHMvb2JqVXRpbHMudHMiLCJpbXBvcnQge1xuICBjYW52YXMsXG4gIGN0eCxcbiAgV0lEVEgsXG4gIEhFSUdIVCxcbiAgZ3JpZFNpemUsXG59IGZyb20gJy4uL21hcC9tYXBDb25maWcnO1xuXG5pbXBvcnQge21hcH0gZnJvbSAnLi4vbWFwL2NyZWF0ZU1hcCc7XG5cbmV4cG9ydCBjb25zdCBkcmF3UGF0aCA9IChwYXRoOmFueVtdKSA9PiB7XG4gIGZvcihsZXQgc3RlcCBvZiBwYXRoKSB7XG4gICAgY3R4LmZpbGxTdHlsZSA9ICd5ZWxsb3cnO1xuICAgIGN0eC5maWxsUmVjdChzdGVwLngsIHN0ZXAueSwgZ3JpZFNpemUsIGdyaWRTaXplKTtcbiAgfVxufVxuXG5leHBvcnQgbGV0IGdldE5vZGVGcm9tTWFwID0gKHg6bnVtYmVyLCB5Om51bWJlcikgPT4ge1xuICBsZXQgbm9kZTphbnk7XG4gIGZvcihsZXQgZ3JpZCBvZiBtYXApIHtcbiAgICBsZXQgYm90dG9tUmlnaHRYID0gZ3JpZC54ICsgZ3JpZFNpemU7XG4gICAgbGV0IGJvdHRvbVJpZ2h0WSA9IGdyaWQueSArIGdyaWRTaXplO1xuICAgIGlmKHggPj0gZ3JpZC54ICYmIHggPCBib3R0b21SaWdodFggJiYgeSA+PSBncmlkLnkgJiYgeSA8IGJvdHRvbVJpZ2h0WSkge1xuICAgICAgbm9kZSA9IGdyaWQ7XG4gICAgfVxuICB9XG4gIHJldHVybiBub2RlO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3BhdGgvZHJhd1BhdGgudHMiLCJleHBvcnQgY29uc3Qgd2FycmlvcnM6YW55W10gPSBbXTtcbmV4cG9ydCBsZXQgY3VycmVudGx5Q2hvc2VuV2FycmlvcjphbnkgPSBudWxsO1xuXG5leHBvcnQgY29uc3QgYXNzaWduQ3VycmVudGx5Q2hvc2VuV2FycmlvciA9ICh3YXJyaW9yOmFueSkgPT4ge1xuICAvLyBjaGVjayB1bml0XG4gIGlmKHdhcnJpb3IpIHtcbiAgICAgIGN1cnJlbnRseUNob3NlbldhcnJpb3IgPSB3YXJyaW9yO1xuICB9IGVsc2Uge1xuICAgIGN1cnJlbnRseUNob3NlbldhcnJpb3IgPSBudWxsO1xuICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zdG9yZS93YXJyaW9yU3RvcmUudHMiLCJleHBvcnQgY29uc3QgdW5pdHM6YW55W10gPSBbXTtcbmV4cG9ydCBsZXQgY3VycmVudGx5Q2hvc2VuVW5pdDphbnkgPSBudWxsO1xuXG5leHBvcnQgY29uc3QgYXNzaWduQ3VycmVudGx5Q2hvc2VuVW5pdCA9ICh1bml0OmFueSkgPT4ge1xuICAvLyBjaGVjayB1bml0XG4gIGlmKHVuaXQpIHtcbiAgICAgIGN1cnJlbnRseUNob3NlblVuaXQgPSB1bml0O1xuICB9IGVsc2Uge1xuICAgIGN1cnJlbnRseUNob3NlblVuaXQgPSBudWxsO1xuICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zdG9yZS91bml0U3RvcmUudHMiLCJleHBvcnQgY29uc3QgZ2V0Q2xvc2VzdFdhcnJpb3JUb0Rlc3RpbmF0aW9uID0gKHVuaXQ6YW55LCBkZXN0WDpudW1iZXIsIGRlc3RZOm51bWJlcikgPT4ge1xuICBsZXQgY2xvc2VzdCA9IDA7XG4gIGxldCBkaWZmZXJlbmNlOm51bWJlcjtcbiAgbGV0IHdhcnJpb3JzID0gdW5pdC53YXJyaW9ycztcbiAgZm9yKGxldCBpID0gMTsgaSA8PSB3YXJyaW9ycy5sZW5ndGggLSAxOyArK2kpIHtcbiAgICBsZXQgY3VycmVudFVuaXREaWZmZXJlbmNlID0gTWF0aC5zcXJ0KE1hdGgucG93KE1hdGguYWJzKHdhcnJpb3JzW2ldLnggLSBkZXN0WCksIDIpICsgTWF0aC5wb3coTWF0aC5hYnMod2FycmlvcnNbaV0ueSAtIGRlc3RZKSwgMikpO1xuICAgIGxldCBwcmV2aW91c1VuaXREaWZmZXJlbmNlID0gTWF0aC5zcXJ0KE1hdGgucG93KE1hdGguYWJzKHdhcnJpb3JzW2Nsb3Nlc3RdLnggLSBkZXN0WCksIDIpICsgTWF0aC5wb3coTWF0aC5hYnMod2FycmlvcnNbY2xvc2VzdF0ueSAtIGRlc3RZKSwgMikpO1xuXG4gICAgaWYoY3VycmVudFVuaXREaWZmZXJlbmNlIDwgcHJldmlvdXNVbml0RGlmZmVyZW5jZSkge1xuICAgICAgY2xvc2VzdCA9IGk7XG4gICAgfVxuICB9XG4gIHJldHVybiB3YXJyaW9yc1tjbG9zZXN0XTtcbn1cblxuZXhwb3J0IGNvbnN0IGdldENsb3Nlc3RXYXJyaW9yVG9EZXN0aW5hdGlvbkluQXJyYXkgPSAod2FycmlvcnM6YW55W10sIGRlc3RYOm51bWJlciwgZGVzdFk6bnVtYmVyKSA9PiB7XG4gIGxldCBjbG9zZXN0ID0gMDtcbiAgbGV0IGRpZmZlcmVuY2U6bnVtYmVyO1xuICBmb3IobGV0IGkgPSAxOyBpIDw9IHdhcnJpb3JzLmxlbmd0aCAtIDE7ICsraSkge1xuICAgIGxldCBjdXJyZW50VW5pdERpZmZlcmVuY2UgPSBNYXRoLnNxcnQoTWF0aC5wb3coTWF0aC5hYnMod2FycmlvcnNbaV0ueCAtIGRlc3RYKSwgMikgKyBNYXRoLnBvdyhNYXRoLmFicyh3YXJyaW9yc1tpXS55IC0gZGVzdFkpLCAyKSk7XG4gICAgbGV0IHByZXZpb3VzVW5pdERpZmZlcmVuY2UgPSBNYXRoLnNxcnQoTWF0aC5wb3coTWF0aC5hYnMod2FycmlvcnNbY2xvc2VzdF0ueCAtIGRlc3RYKSwgMikgKyBNYXRoLnBvdyhNYXRoLmFicyh3YXJyaW9yc1tjbG9zZXN0XS55IC0gZGVzdFkpLCAyKSk7XG5cbiAgICBpZihjdXJyZW50VW5pdERpZmZlcmVuY2UgPCBwcmV2aW91c1VuaXREaWZmZXJlbmNlKSB7XG4gICAgICBjbG9zZXN0ID0gaTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHdhcnJpb3JzW2Nsb3Nlc3RdO1xufVxuXG5leHBvcnQgY29uc3QgZ2V0Q2VudHJhbFdhcnJpb3JJblVuaXQgPSAodW5pdDphbnkpID0+IHtcbiAgbGV0IGNlbnRyYWxSb3cgPSBNYXRoLnJvdW5kKHVuaXQucm93IC8gMik7XG4gIGxldCBjZW50cmFsQ29sID0gTWF0aC5yb3VuZCh1bml0LmNvbCAvIDIpO1xuICBmb3IobGV0IHdhcnJpb3Igb2YgdW5pdC53YXJyaW9ycykge1xuICAgIGlmKHdhcnJpb3IuY29sSW5Vbml0ID09PSBjZW50cmFsQ29sICYmIHdhcnJpb3Iucm93SW5Vbml0ID09PSBjZW50cmFsUm93KSB7XG4gICAgICByZXR1cm4gd2FycmlvcjtcbiAgICB9XG4gIH1cbn1cblxuIC8vIGdldCB1bml0J3MgcG9zaXRpb24gYW5kIGRlc3RpbmF0aW9uIHBvc2l0aW9uIGFuZCByZXR1cm4gYW5nbGUgaW4gcmFkaWFucyBiZXR3ZWVuIHVuaXQgYW5kIGRlc3RpbmF0aW9uXG5leHBvcnQgY29uc3QgY2FsY0Rlc3RpbmF0aW9uQW5nbGVJbkRlZ3JlZXMgPSAodW5pdDphbnksIGRlc3RYOm51bWJlciwgZGVzdFk6bnVtYmVyKTpudW1iZXIgPT4ge1xuICAvL2NvbnNvbGUuZXJyb3IoJ2NhbGNEZXN0aW5hdGlvbkFuZ2xlSW5EZWdyZWVzJyk7XG4gIGxldCB3YXJyaW9yID0gZ2V0Q2xvc2VzdFdhcnJpb3JUb0Rlc3RpbmF0aW9uKHVuaXQsIGRlc3RYLCBkZXN0WSk7XG4gIGxldCBhbmdsZTtcbiAgbGV0IGEgPSBNYXRoLmFicyhkZXN0WSAtIHdhcnJpb3IueSk7XG4gIGxldCBiID0gTWF0aC5hYnMoZGVzdFggLSB3YXJyaW9yLngpO1xuICBsZXQgYW5nbGVJblJhZGlhbiA9IE1hdGguYXRhbihhIC8gYik7XG4gIC8vIGNoZWNrIHF1YXRlciBvZiB0aGUgY2lyY2xlXG4gIGxldCBkZWdyZWUgPSAgYW5nbGVJblJhZGlhbiAqICgxODAgLyBNYXRoLlBJKTsgLy8gY29udmVydCByYWRpYW5zIGludG8gZGVncmVlXG4gIGxldCBxdWF0ZXIgPSBnZXRRdWF0ZXIod2Fycmlvci54LCB3YXJyaW9yLnksIGRlc3RYLCBkZXN0WSk7IC8vIGNoZWNrIHF1YXRlclxuICBpZihxdWF0ZXIgPT09IDEpIGFuZ2xlID0gZGVncmVlO1xuICBpZihxdWF0ZXIgPT09IDIpIGFuZ2xlID0gOTAgKyAoOTAgLSBkZWdyZWUpO1xuICBlbHNlIGlmKHF1YXRlciA9PT0gMykgYW5nbGUgPSAxODAgKyBkZWdyZWU7XG4gIGVsc2UgaWYocXVhdGVyID09PSA0KSBhbmdsZSA9IDI3MCArICg5MCAtIGRlZ3JlZSk7XG4gIHJldHVybiBNYXRoLnJvdW5kKGFuZ2xlKTtcbn1cblxuZXhwb3J0IGNvbnN0IGdldFF1YXRlciA9ICh1bml0WDpudW1iZXIsIHVuaXRZOm51bWJlciwgZGVzdFg6bnVtYmVyLCBkZXN0WTpudW1iZXIpOm51bWJlciA9PiB7XG4gIC8vY29uc29sZS5lcnJvcignZ2V0UXVhdGVyJyk7XG4gIGxldCBxdWF0ZXI7XG4gIGlmKGRlc3RYID49IHVuaXRYICYmIGRlc3RZIDwgdW5pdFkpIHtcbiAgICBxdWF0ZXIgPSAxO1xuICB9XG4gIGVsc2UgaWYoZGVzdFggPCB1bml0WCAmJiBkZXN0WSA8PSB1bml0WSkge1xuICAgIHF1YXRlciA9IDI7XG4gIH1cbiAgZWxzZSBpZihkZXN0WCA8PSB1bml0WCAmJiBkZXN0WSA+IHVuaXRZKSB7XG4gICAgcXVhdGVyID0gMztcbiAgfVxuICBlbHNlIGlmKGRlc3RYID4gdW5pdFggJiYgZGVzdFkgPj0gdW5pdFkpIHtcbiAgICBxdWF0ZXIgPSA0O1xuICB9XG4gIHJldHVybiBxdWF0ZXI7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdW5pdC91bml0VXRpbHMudHMiLCJpbXBvcnQge1xuICBjYW52YXMsXG4gIGN0eCxcbiAgV0lEVEgsXG4gIEhFSUdIVCxcbiAgZ3JpZFNpemVcbn0gZnJvbSAnLi9tYXAvbWFwQ29uZmlnJztcblxuaW1wb3J0IHtkcmF3R3JpZH0gZnJvbSAnLi9tYXAvZHJhd0dyaWQnO1xuaW1wb3J0IHtcbiAgYWRkTmVpZ2hib3VycyxcbiAgY3JlYXRlTm9kZXMsXG4gIG1hcFxufSBmcm9tICcuL21hcC9jcmVhdGVNYXAnO1xuaW1wb3J0IHtzaG93T2JzdGFjbGVzfSBmcm9tICcuL21hcC9tYXBVdGlscyc7XG5pbXBvcnQge2gsIGFTdGFyfSBmcm9tICcuL3BhdGgvQVN0YXInO1xuaW1wb3J0IHtcbiAgZHJhd1BhdGgsXG4gIGdldE5vZGVGcm9tTWFwXG59IGZyb20gJy4vcGF0aC9kcmF3UGF0aCc7XG5cbmltcG9ydCBXYXJyaW9yIGZyb20gJy4vd2Fycmlvci9XYXJyaW9yJztcbmltcG9ydCB7d2FycmlvcnMsIGN1cnJlbnRseUNob3NlbldhcnJpb3J9IGZyb20gJy4vc3RvcmUvd2FycmlvclN0b3JlJztcbmltcG9ydCB7XG4gIG9uQ2hvb3NlV2FycmlvcixcbiAgY3JlYXRlV2FycmlvcixcbiAgYXNzaWduV2Fycmlvck1vdmVUb1Bvc2l0aW9uLFxufSBmcm9tICcuL3dhcnJpb3Ivd2FycmlvckFjdGlvbic7XG5pbXBvcnQge3VwZGF0ZVdhcnJpb3J9IGZyb20gJy4vd2Fycmlvci93YXJyaW9yTW92ZW1lbnQnO1xuXG5pbXBvcnQge1xuICBjcmVhdGVVbml0LFxuICBvbkNob29zZVVuaXQsXG4gIG9uQ2hhbmdlV2FycmlvclBvc2l0aW9uSW5Vbml0XG59IGZyb20gJy4vdW5pdC91bml0QWN0aW9ucyc7XG5pbXBvcnQge1xuICB1bml0cyxcbiAgY3VycmVudGx5Q2hvc2VuVW5pdFxufSBmcm9tICcuL3N0b3JlL3VuaXRTdG9yZSc7XG5cbmltcG9ydCB7XG4gIGNhbGNEZXN0aW5hdGlvbkFuZ2xlSW5EZWdyZWVzXG59IGZyb20gJy4vdW5pdC91bml0VXRpbHMnO1xuXG5pbXBvcnQge21vdmVUb1Bvc2l0aW9ufSBmcm9tICcuL3VuaXQvdW5pdE1vdmVtZW50JztcblxubGV0IHdhcnJpb3IgPSBjcmVhdGVXYXJyaW9yKCdiYXJiYXJpYW4nLCA4MCwgMTYwLCA1KTtcbmNyZWF0ZVVuaXQoJ3Rlc3RVbml0JywgNiwgMjQwLCA0MjApO1xuXG5kcmF3R3JpZCgpO1xuY29uc29sZS5sb2coJ21hcCcsIG1hcCk7XG5jb25zb2xlLmxvZygnY3VycmVudGx5Q2hvc2VuV2FycmlvcicsIGN1cnJlbnRseUNob3NlbldhcnJpb3IpO1xuXG5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICBjb25zb2xlLmVycm9yKCdDbGljaycpO1xuICBsZXQgeCA9IGUub2Zmc2V0WDsgLy8gZ2V0IFhcbiAgbGV0IHkgPSBlLm9mZnNldFk7IC8vIGdldCBZXG4gIGNvbnNvbGUubG9nKCdQb3NpdGlvbiB4JywgZS5vZmZzZXRYKTsgLy8gZ2V0IFhcbiAgY29uc29sZS5sb2coJ1Bvc2l0aW9uIHknLCBlLm9mZnNldFkpOyAvLyBnZXQgWVxuICBvbkNob29zZVdhcnJpb3Iod2FycmlvcnMsIHgsIHkpO1xuICBvbkNob29zZVVuaXQodW5pdHMsIGN1cnJlbnRseUNob3NlbldhcnJpb3IpO1xuICBjb25zb2xlLmxvZygnY3VycmVudGx5Q2hvc2VuV2FycmlvcicsIGN1cnJlbnRseUNob3NlbldhcnJpb3IpO1xufSk7XG5cbi8vIHNldCBvbkNsaWNrTGlzdGVuZXIgZm9yIHJpZ2h0IG1vdXNlIGV2ZW50XG5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignY29udGV4dG1lbnUnLCAoZSkgPT4ge1xuICBjb25zb2xlLmVycm9yKCdSaWdodCBNb3VzZSBDbGljaycpO1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIGxldCB4ID0gZS5vZmZzZXRYOyAvLyBnZXQgWFxuICBsZXQgeSA9IGUub2Zmc2V0WTsgLy8gZ2V0IFlcbiAgbGV0IHN0YXJ0Tm9kZSA9IGdldE5vZGVGcm9tTWFwKGN1cnJlbnRseUNob3NlblVuaXQuY29tbWFuZGVyUG9zaXRpb25YLCBjdXJyZW50bHlDaG9zZW5Vbml0LmNvbW1hbmRlclBvc2l0aW9uWSk7XG4gIGxldCBmaW5pc2hOb2RlID0gZ2V0Tm9kZUZyb21NYXAoeCwgeSk7XG4gIGNvbnNvbGUuZXJyb3IoJ3N0YXJ0Tm9kZScsIHN0YXJ0Tm9kZSk7XG4gIGNvbnNvbGUuZXJyb3IoJ2ZpbmlzaE5vZGUnLCBmaW5pc2hOb2RlKTtcbiAgYXNzaWduV2Fycmlvck1vdmVUb1Bvc2l0aW9uKGN1cnJlbnRseUNob3NlbldhcnJpb3IsIHgsIHkpO1xuICBtb3ZlVG9Qb3NpdGlvbihjdXJyZW50bHlDaG9zZW5Vbml0LCBmaW5pc2hOb2RlKTtcbiAgY29uc29sZS5lcnJvcignQW5nbGUnLCBjYWxjRGVzdGluYXRpb25BbmdsZUluRGVncmVlcyhjdXJyZW50bHlDaG9zZW5Vbml0LCB4LCB5KSk7XG4gIC8vIGxldCBwYXRoOmFueSA9IGFTdGFyKHN0YXJ0Tm9kZSwgZmluaXNoTm9kZSk7XG4gIC8vIGlmKGN1cnJlbnRseUNob3NlblVuaXQpIHtcbiAgLy8gIG9uQ2hhbmdlV2FycmlvclBvc2l0aW9uSW5Vbml0KGN1cnJlbnRseUNob3NlblVuaXQscGF0aCwgMCwgeCwgeSk7XG4gIC8vIH1cblxuICAvL2RyYXdQYXRoKHBhdGgpO1xufSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZ2FtZS50cyIsImltcG9ydCB7XG4gIGNhbnZhcyxcbiAgY3R4LFxuICBXSURUSCxcbiAgSEVJR0hULFxuICBncmlkU2l6ZVxufSBmcm9tICcuL21hcENvbmZpZyc7XG5cbmV4cG9ydCBjb25zdCBkcmF3R3JpZCA9ICgpID0+IHtcbiAgZm9yKGxldCB5ID0gMDsgeSA8PSBIRUlHSFQ7IHkrPSBncmlkU2l6ZSkge1xuICAgIGZvcihsZXQgeCA9IDA7IHggPD0gV0lEVEg7IHgrPSBncmlkU2l6ZSkge1xuICAgICAgY3R4LnN0cm9rZVJlY3QoeCwgeSwgZ3JpZFNpemUsIGdyaWRTaXplKTtcbiAgICB9XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tYXAvZHJhd0dyaWQudHMiLCJpbXBvcnQge2dyaWRTaXplfSBmcm9tICcuLi9tYXAvbWFwQ29uZmlnJztcblxuY2xhc3MgV2FycmlvciB7XG4gIG5hbWU6IHN0cmluZztcbiAgeDogbnVtYmVyO1xuICB5OiBudW1iZXI7XG4gIGNlbnRlclg6IG51bWJlcjtcbiAgY2VudGVyWTogbnVtYmVyO1xuICByYWRpdXM6IG51bWJlcjtcbiAgbW92ZVRvTm9kZVg6IG51bWJlcjtcbiAgbW92ZVRvTm9kZVk6IG51bWJlcjtcbiAgaXNDdXJyZW50bHlDaG9zZW46IGJvb2xlYW4gPSBmYWxzZTtcbiAgcG9zaXRpb25JblVuaXQ6IG51bWJlcjtcbiAgcm93SW5Vbml0OiBudW1iZXI7XG4gIGNvbEluVW5pdDogbnVtYmVyO1xuICBtb3ZlVG9Ob2RlOiBhbnk7XG5cbiAgY29uc3RydWN0b3IobmFtZTpzdHJpbmcsIHg6bnVtYmVyLCB5Om51bWJlciwgcmFkaXVzOm51bWJlcikge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHRoaXMucmFkaXVzID0gcmFkaXVzO1xuICAgIHRoaXMuY2VudGVyWCA9IHggKyAoZ3JpZFNpemUgLyAyKTtcbiAgICB0aGlzLmNlbnRlclkgPSB5ICsgKGdyaWRTaXplIC8gMik7XG4gIH1cblxuICBzZXRYKHg6bnVtYmVyKSB7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLmNlbnRlclggPSB4ICsgKGdyaWRTaXplIC8gMik7XG4gIH1cblxuICBzZXRZKHk6bnVtYmVyKSB7XG4gICAgdGhpcy55ID0geTtcbiAgICB0aGlzLmNlbnRlclkgPSB5ICsgKGdyaWRTaXplIC8gMik7XG4gIH1cblxuICBhc3NpZ25Qb3NpdGlvbihuZXdQb3NpdGlvbjogbnVtYmVyKSB7XG4gICAgdGhpcy5wb3NpdGlvbkluVW5pdCA9IG5ld1Bvc2l0aW9uO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFdhcnJpb3I7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvd2Fycmlvci9XYXJyaW9yLnRzIiwiaW1wb3J0IHtjcmVhdGVXYXJyaW9yfSBmcm9tICcuLi93YXJyaW9yL3dhcnJpb3JBY3Rpb24nO1xuaW1wb3J0IHtncmlkU2l6ZX0gZnJvbSAnLi4vbWFwL21hcENvbmZpZyc7XG5pbXBvcnQge3VwZGF0ZVdhcnJpb3J9IGZyb20gJy4uL3dhcnJpb3Ivd2Fycmlvck1vdmVtZW50JztcbmltcG9ydCBVbml0IGZyb20gJy4vVW5pdCc7XG5cbmltcG9ydCB7XG4gIHVuaXRzLFxuICBjdXJyZW50bHlDaG9zZW5Vbml0LFxuICBhc3NpZ25DdXJyZW50bHlDaG9zZW5Vbml0XG59IGZyb20gJy4uL3N0b3JlL3VuaXRTdG9yZSc7XG5cbmltcG9ydCB7XG4gIGFzc2lnbldhcnJpb3JNb3ZlVG9Qb3NpdGlvbixcbn0gZnJvbSAnLi4vd2Fycmlvci93YXJyaW9yQWN0aW9uJztcblxuaW1wb3J0IHtcbiAgZ2V0Tm9kZUZyb21NYXBcbn0gZnJvbSAnLi4vcGF0aC9kcmF3UGF0aCc7XG5cbmltcG9ydCB7YVN0YXJ9IGZyb20gJy4uL3BhdGgvQVN0YXInO1xuXG5leHBvcnQgY29uc3Qgb25DaGFuZ2VXYXJyaW9yUG9zaXRpb25JblVuaXQgPSAodW5pdDphbnksIHBhdGg6YW55W10sIGk6bnVtYmVyPTAsIGN1cnJlbnRNb3ZlVG9YOm51bWJlciwgY3VycmVudE1vdmVUb1k6bnVtYmVyKSA9PiB7XG4gIGxldCByb3cgPSB1bml0LnF1YW50aXR5IC8gMjtcbiAgbGV0IGNvbCA9IE1hdGguY2VpbCh1bml0LnF1YW50aXR5IC8gcm93KTtcbiAgZm9yKGxldCB3YXJyaW9yIG9mIHVuaXQud2FycmlvcnMpIHtcbiAgICBsZXQgc3RhcnROb2RlID0gZ2V0Tm9kZUZyb21NYXAoY3VycmVudGx5Q2hvc2VuVW5pdC5jb21tYW5kZXJQb3NpdGlvblgsIGN1cnJlbnRseUNob3NlblVuaXQuY29tbWFuZGVyUG9zaXRpb25ZKTtcbiAgICBsZXQgZmluaXNoTm9kZSA9IGdldE5vZGVGcm9tTWFwKGN1cnJlbnRNb3ZlVG9YLCBjdXJyZW50TW92ZVRvWSk7XG4gICAgbGV0IHBhdGg6YW55ID0gYVN0YXIoc3RhcnROb2RlLCBmaW5pc2hOb2RlKTtcbiAgICBhc3NpZ25XYXJyaW9yTW92ZVRvUG9zaXRpb24od2FycmlvciwgY3VycmVudE1vdmVUb1gsIGN1cnJlbnRNb3ZlVG9ZKTtcbiAgICB1cGRhdGVXYXJyaW9yKHdhcnJpb3IsIHBhdGgsIGksIGN1cnJlbnRNb3ZlVG9YLCBjdXJyZW50TW92ZVRvWSk7XG4gICAgY3VycmVudE1vdmVUb1ggKz0gZ3JpZFNpemU7XG4gICAgY29uc29sZS5sb2coJ2knLCBpKTtcbiAgICBjb25zb2xlLmxvZygnY3VycmVudE1vdmVUb1gnLCBjdXJyZW50TW92ZVRvWCk7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGFkZFdhcnJpb3JzVG9Vbml0ID0gKHVuaXQ6YW55KSA9PiB7XG4gIGxldCBzdGFydFggPSB1bml0LmNvbW1hbmRlclBvc2l0aW9uWDtcbiAgbGV0IHN0YXJ0WSA9IHVuaXQuY29tbWFuZGVyUG9zaXRpb25ZO1xuICBsZXQgaSA9IDE7XG4gIGxldCByb3cgPSB1bml0LnF1YW50aXR5IC8gMjtcbiAgbGV0IGNvbCA9IE1hdGguY2VpbCh1bml0LnF1YW50aXR5IC8gcm93KTtcbiAgbGV0IGZpbmlzaFggPSBzdGFydFggKyAoKHJvdyAtIDEpICogZ3JpZFNpemUpO1xuICBsZXQgZmluaXNoWSA9IHN0YXJ0WSArICgoY29sIC0gMSkgKiBncmlkU2l6ZSk7XG4gIGxldCByYWRpdXMgPSBncmlkU2l6ZSAvIDQ7XG4gIGxldCB1bml0Um93ID0gMTsgLy8gdG8gZ2l2ZSB3YXJyaW9yIHJvdyBhbmQgY29sdW1uIHBvc2l0aW9uIGluIHVuaXRcbiAgbGV0IHVuaXRDb2wgPSAxO1xuICB1bml0LnJvdyA9IHJvdzsgLy8gYWRkIHJvdyBpbnN0YW5jZSBmb3IgdW5pdFxuICB1bml0LmNvbCA9IGNvbDsgLy8gYWRkIGNvbCBpbnN0YW5jZSBmb3IgdW5pdFxuICBmb3IobGV0IHkgPSBzdGFydFg7IHkgPD0gZmluaXNoWTsgeSArPSBncmlkU2l6ZSkge1xuICAgIGlmKGkgPD0gdW5pdC5xdWFudGl0eSkge1xuICAgICAgZm9yKGxldCB4ID0gc3RhcnRYOyB4IDw9IGZpbmlzaFg7ICB4Kz0gZ3JpZFNpemUpIHtcbiAgICAgICAgbGV0IGN1cnJlbnRXYXJyaW9yID0gY3JlYXRlV2Fycmlvcih1bml0Lm5hbWUsIHgsIHksIHJhZGl1cyk7XG4gICAgICAgIGN1cnJlbnRXYXJyaW9yLmFzc2lnblBvc2l0aW9uKGkpO1xuICAgICAgICBjdXJyZW50V2Fycmlvci5yb3dJblVuaXQgPSB1bml0Um93O1xuICAgICAgICBjdXJyZW50V2Fycmlvci5jb2xJblVuaXQgPSB1bml0Q29sO1xuICAgICAgICB1bml0LmFkZFdhcnJpb3JUb1VuaXQoY3VycmVudFdhcnJpb3IpO1xuICAgICAgICBpKys7XG4gICAgICAgIHVuaXRDb2wrKztcbiAgICAgIH1cbiAgICB9XG4gICAgdW5pdFJvdysrO1xuICAgIHVuaXRDb2wgPSAxO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVVbml0ID0gKG5hbWU6c3RyaW5nLCBxdWFudGl0eTpudW1iZXIsIHBvc1g6bnVtYmVyLCBwb3NZOiBudW1iZXIpID0+IHtcbiAgbGV0IG5ld1VuaXQgPSBuZXcgVW5pdChuYW1lLCBxdWFudGl0eSwgcG9zWCwgcG9zWSk7XG4gIGxldCByYWRpdXMgPSBncmlkU2l6ZSAvIDQ7XG4gIGFkZFdhcnJpb3JzVG9Vbml0KG5ld1VuaXQpO1xuICB1bml0cy5wdXNoKG5ld1VuaXQpO1xufVxuXG4vLyB3YXJyaW9ycyBpbiB0aGUgdW5pdCBoYXZlIHNhbWUgbmFtZSBhcyB1bml0IHRoYXQgdGhleSBhc3NpZ25lZCB0b1xuLy8gaWYgd2FycmlvciB3aXRoIHNhbWUgbmFtZSBpcyBjaG9zZW4gdGhhdCBtZWFucyB0aGF0IHVuaXQgYWxzb1xuLy8gaGFzIGJlZW4gY2hvc2VuXG5leHBvcnQgY29uc3Qgb25DaG9vc2VVbml0ID0gKHVuaXRzOmFueSwgY3VycmVudGx5Q2hvc2VuV2FycmlvcjphbnkpID0+IHtcbiAgbGV0IGZvdW5kZWRVbml0ID0gbnVsbDtcbiAgaWYoY3VycmVudGx5Q2hvc2VuV2Fycmlvcikge1xuICAgIGZvcihsZXQgdW5pdCBvZiB1bml0cykge1xuICAgICAgaWYoY3VycmVudGx5Q2hvc2VuV2Fycmlvci5uYW1lID09PSB1bml0Lm5hbWUpIHtcbiAgICAgICAgZm91bmRlZFVuaXQgPSB1bml0O1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBhc3NpZ25DdXJyZW50bHlDaG9zZW5Vbml0KGZvdW5kZWRVbml0KTtcbiAgY29uc29sZS5sb2coJ2N1cnJlbnRseUNob3NlblVuaXQnLCBjdXJyZW50bHlDaG9zZW5Vbml0KTtcbn1cblxubGV0IGdldFVuaXRDb21tYW5kZXIgPSAodW5pdDphbnkpID0+IHtcbiAgZm9yKGxldCB3YXJyaW9yIG9mIHVuaXQud2FycmlvcnMpIHtcbiAgICBpZih3YXJyaW9yLnBvc2l0aW9uSW5Vbml0ID09PSAxKSB7XG4gICAgICByZXR1cm4gd2FycmlvcjtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHVwZGF0ZVVuaXQgPSAodW5pdDphbnksIHBhdGg6YW55W10sIGk6bnVtYmVyPTAsIGN1cnJlbnRNb3ZlVG9YOm51bWJlciwgY3VycmVudE1vdmVUb1k6bnVtYmVyKSA9PiB7XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91bml0L3VuaXRBY3Rpb25zLnRzIiwiaW1wb3J0IHtkcmF3V2Fycmlvcn0gZnJvbSAnLi93YXJyaW9yQWN0aW9uJztcbmltcG9ydCB7XG4gIGdyaWRTaXplLFxuICBjdHgsXG4gIFdJRFRILFxuICBIRUlHSFRcbn0gZnJvbSAnLi4vbWFwL21hcENvbmZpZyc7XG5pbXBvcnQge2RlbGV0ZU9iamVjdEZyb21BcnJheX0gZnJvbSAnLi4vdXRpbHMvb2JqVXRpbHMnO1xuXG5leHBvcnQgbGV0IHVwZGF0ZVdhcnJpb3IgPSAod2FycmlvcjphbnksIHBhdGg6YW55W10sIGk6bnVtYmVyPTAsIGN1cnJlbnRNb3ZlVG9YOm51bWJlciwgY3VycmVudE1vdmVUb1k6bnVtYmVyKSA9PiB7XG4gIC8vY29uc29sZS5sb2coJ3VwZGF0ZVdhcnJpb3InKTtcbiAgaWYoY3VycmVudE1vdmVUb1ggIT09IHdhcnJpb3IubW92ZVRvTm9kZS54IHx8IGN1cnJlbnRNb3ZlVG9ZICE9PSB3YXJyaW9yLm1vdmVUb05vZGUueSkge1xuICAgIGNvbnNvbGUubG9nKCduZXcgZGVzdGluYXRpb24gaGFzIGJlZW4gY2hvc2VuJyk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGxldCB1cGRhdGVkUGF0aCA9IHBhdGg7XG4gIGxldCBub2RlID0gcGF0aFtpXTsgLy8gZ2V0IG5leHQgbm9kZVxuICBsZXQgbm9kZVRvQ2xlYXIgPSBub2RlOztcbiAgaWYoaSAhPT0gMCkge1xuICAgIG5vZGVUb0NsZWFyID0gdXBkYXRlZFBhdGhbaSAtIDFdO1xuICB9XG4gIGN0eC5jbGVhclJlY3Qobm9kZVRvQ2xlYXIueCwgbm9kZVRvQ2xlYXIueSwgZ3JpZFNpemUsIGdyaWRTaXplKTtcbiAgd2Fycmlvci5zZXRYKG5vZGUueCk7IC8vIGNhbGN1bGF0ZSBjZW50ZXIgb2YgdGhlIGN1cnJlbnQgbm9kZVxuICB3YXJyaW9yLnNldFkobm9kZS55KTtcbiAgLy9jb25zb2xlLmxvZygnd2Fycmlvci54Jywgd2Fycmlvci54LCAnd2Fycmlvci55Jywgd2Fycmlvci55KTtcbiAgZHJhd1dhcnJpb3Iod2Fycmlvcik7XG4gIGkrKztcbiAgaWYoaSAhPT0gdXBkYXRlZFBhdGgubGVuZ3RoKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB1cGRhdGVXYXJyaW9yKHdhcnJpb3IsIHVwZGF0ZWRQYXRoLCBpLCBjdXJyZW50TW92ZVRvWCwgY3VycmVudE1vdmVUb1kpO1xuICAgIH0sIDQwMCk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy93YXJyaW9yL3dhcnJpb3JNb3ZlbWVudC50cyIsIlxuXG5jbGFzcyBVbml0IHtcbiAgbmFtZTogc3RyaW5nO1xuICBxdWFudGl0eTogbnVtYmVyO1xuICBjb21tYW5kZXJQb3NpdGlvblg6IG51bWJlcjtcbiAgY29tbWFuZGVyUG9zaXRpb25ZOiBudW1iZXI7XG4gIHdhcnJpb3JzOiBhbnlbXSA9IFtdO1xuICBjb2w6IG51bWJlcjtcbiAgcm93OiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IobmFtZTpzdHJpbmcsIHF1YW50aXR5Om51bWJlciwgcG9zWDpudW1iZXIsIHBvc1k6bnVtYmVyKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLnF1YW50aXR5ID0gcXVhbnRpdHk7XG4gICAgdGhpcy5jb21tYW5kZXJQb3NpdGlvblggPSBwb3NYO1xuICAgIHRoaXMuY29tbWFuZGVyUG9zaXRpb25ZID0gcG9zWDtcbiAgfVxuICBhZGRXYXJyaW9yVG9Vbml0KHdhcnJpb3I6YW55KSB7XG4gICAgdGhpcy53YXJyaW9ycy5wdXNoKHdhcnJpb3IpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFVuaXQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdW5pdC9Vbml0LnRzIiwiaW1wb3J0IHtuZWlnaGJvdXJzfSBmcm9tICcuLi9tYXAvY3JlYXRlTWFwJztcbmltcG9ydCB7XG4gIGRlbGV0ZU9iamVjdEZyb21BcnJheSxcbiAgaXNPYmplY3RJbkFycmF5XG59IGZyb20gJy4uL3V0aWxzL29ialV0aWxzJztcblxuaW1wb3J0IHtcbiAgZ2V0TWluRlNjb3JlLFxuICB1bmNsb3NlZE5laWdib3VycyxcbiAgaXNPYmplY3RJbk1hcEtleXNcbn0gZnJvbSAnLi9hU3RhclV0aWxzJztcblxuZXhwb3J0IGNvbnN0IGFTdGFyID0gKHN0YXJ0Tm9kZTphbnksIGZpbmlzaE5vZGU6YW55KSA9PiB7XG4gIC8vIHRoZSBzZXQgb2YgY3VycmVudGx5IGRpc2NvdmVyZWQgbm9kZXMgdGhhdCBhcmUgbm90IGV2YWx1YXRlZCB5ZXRcbiAgLy8gSW5pdGlhbGx5IG9ubHkgdGhlIHN0YXJ0IG5vZGUgaXMga25vd25cbiAgbGV0IG9wZW46YW55W10gPSBbXTtcblxuICAvLyB0aGUgc2V0IG9mIG5vZGVzIHRoYXQgYWxyZWFkeSBldmFsdWF0ZWRcbiAgbGV0IGNsb3NlZDphbnlbXSA9IFtdO1xuICBzdGFydE5vZGUuZ1Njb3JlID0gMDtcbiAgc3RhcnROb2RlLmZTY29yZSA9IHN0YXJ0Tm9kZS5nU2NvcmUgKyBoKHN0YXJ0Tm9kZSwgZmluaXNoTm9kZSlcbiAgb3Blbi5wdXNoKHN0YXJ0Tm9kZSk7XG5cbiAgLy8gZm9yIGVhY2ggbm9kZSwgd2hpY2ggbm9kZSBpcyBjYW4gbW9zdCBlZmZpY2llbnRseSBiZSByZWFjaGVkIGZyb21cbiAgLy8gaWYgYSBub2RlIGNhbiBiZSByZWFjaGVkIGZyb20gbWFueSBub2RlcywgY2FtZUZyb20gd2lsbCBldmVudGlhbGx5XG4gIC8vIGNvbnRhaW4gdGhlIG1vc3QgZWZmaWNpZW50IHByZXZpb3VzIHN0ZXBcbiAgbGV0IGZyb20gPSBuZXcgTWFwKCk7XG5cbiAgLy8gRm9yIGVhY2ggbm9kZSwgdGhlIGNvc3Qgb2YgZ2V0dGluZyBmcm9tIHRoZSBzdGFydCBub2RlIHRvIHRoYXQgbm9kZS5cbiAgLy8gbGV0IGdTY29yZSA9IG5ldyBNYXAoKTtcbiAgLy8gbGV0IGZTY29yZSA9IG5ldyBNYXAoKTtcbiAgLy9cbiAgLy8gZ1Njb3JlLnNldChzdGFydE5vZGUsIDApO1xuICAvLyBmU2NvcmUuc2V0KHN0YXJ0Tm9kZSwgZ1Njb3JlLmdldChzdGFydE5vZGUpICsgaChzdGFydE5vZGUsIGZpbmlzaE5vZGUpKTtcbiAgd2hpbGUob3Blbikge1xuICAgIGxldCBjdXJyZW50OmFueSA9IGdldE1pbkZTY29yZShvcGVuKTtcbiAgICAvL2NvbnNvbGUubG9nKCdjdXJyZW50JywgY3VycmVudCk7XG4gICAgaWYoY3VycmVudC54ID09PSBmaW5pc2hOb2RlLnggJiYgY3VycmVudC55ID09PSBmaW5pc2hOb2RlLnkpIHtcbiAgICAgIC8vY29uc29sZS5lcnJvcignUGF0aCcsIHJlY29uc3RydWN0UGF0aChmcm9tLCBjdXJyZW50KSk7XG4gICAgICByZXR1cm4gcmVjb25zdHJ1Y3RQYXRoKGZyb20sIGN1cnJlbnQpO1xuICAgIH1cbiAgICBvcGVuID0gZGVsZXRlT2JqZWN0RnJvbUFycmF5KGN1cnJlbnQsIG9wZW4pO1xuICAgIGNsb3NlZC5wdXNoKGN1cnJlbnQpO1xuICAgIGZvcihsZXQgbmVpZ2hib3VyIG9mIHVuY2xvc2VkTmVpZ2JvdXJzKGN1cnJlbnQsIGNsb3NlZCkpIHtcbiAgICAgIGxldCB0ZW1wRyA9IGN1cnJlbnQuZ1Njb3JlICsgbmVpZ2hib3VyLmRpc3RhbmNlO1xuICAgICAgaWYoIWlzT2JqZWN0SW5BcnJheShuZWlnaGJvdXIsIG9wZW4pIHx8IHRlbXBHIDwgbmVpZ2hib3VyLmdTY29yZSkge1xuICAgICAgICBmcm9tLnNldChuZWlnaGJvdXIsIGN1cnJlbnQpO1xuICAgICAgICBuZWlnaGJvdXIuZ1Njb3JlID0gdGVtcEc7XG4gICAgICAgIG5laWdoYm91ci5mU2NvcmUgPSBuZWlnaGJvdXIuZ1Njb3JlICsgaChuZWlnaGJvdXIsIGZpbmlzaE5vZGUpO1xuICAgICAgfVxuICAgICAgaWYoIWlzT2JqZWN0SW5BcnJheShuZWlnaGJvdXIsIG9wZW4pKSB7IC8vIGNyZWF0ZSBmdW5jdGlvblxuICAgICAgICBsZXQgbm9kZU5laWdoYm91cnMgPSBuZWlnaGJvdXJzKG5laWdoYm91cik7XG4gICAgICAgIG5laWdoYm91ci5uZWlnaGJvdXJzID0gbm9kZU5laWdoYm91cnM7XG4gICAgICAgIG9wZW4ucHVzaChuZWlnaGJvdXIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBjb25zb2xlLmxvZygnZmFpbHVyZScpO1xuICByZXR1cm4gMDsgLy8gZmFpbHVyZVxufVxuXG5leHBvcnQgY29uc3QgaCA9IChzdGFydE5vZGU6YW55LCBmaW5pc2hOb2RlOmFueSkgPT4ge1xuLy9mdW5jdGlvbiBoZXVyaXN0aWMobm9kZSkgPVxuICAvLyBkeCA9IGFicyhub2RlLnggLSBnb2FsLngpXG4gIC8vIGR5ID0gYWJzKG5vZGUueSAtIGdvYWwueSlcbiAgLy8gcmV0dXJuIEQgKiAoZHggKyBkeSkgKyAoRDIgLSAyICogRCkgKiBtaW4oZHgsIGR5KVxuICBsZXQgRCA9IDEwOyAvLyBjb3N0IG9mIG1vdmluZyBob3Jpem9udGFsbHlcbiAgbGV0IEQyID0gMTQ7IC8vIGNvc3Qgb2YgbW92aW5nIGRpYWdvbmFsbHlcbiAgbGV0IGR4ID0gTWF0aC5hYnMoc3RhcnROb2RlLnggLSBmaW5pc2hOb2RlLngpO1xuICBsZXQgZHkgPSBNYXRoLmFicyhzdGFydE5vZGUueSAtIGZpbmlzaE5vZGUueSk7XG4gIHJldHVybiBEICogKGR4ICsgZHkpICsgKEQyIC0gMiAqIEQpICogTWF0aC5taW4oZHgsIGR5KTtcbn1cblxuXG5cbmV4cG9ydCBjb25zdCByZWNvbnN0cnVjdFBhdGggPSAoZnJvbTphbnksIGN1cnJlbnQ6YW55KSA9PiB7XG4gIC8vIGZ1bmN0aW9uIHJlY29uc3RydWN0X3BhdGgoY2FtZUZyb20sIGN1cnJlbnQpXG4gIC8vICAgdG90YWxfcGF0aCA6PSBbY3VycmVudF1cbiAgLy8gICB3aGlsZSBjdXJyZW50IGluIGNhbWVGcm9tLktleXM6XG4gIC8vICAgICAgIGN1cnJlbnQgOj0gY2FtZUZyb21bY3VycmVudF1cbiAgLy8gICAgICAgdG90YWxfcGF0aC5hcHBlbmQoY3VycmVudClcbiAgLy8gICByZXR1cm4gdG90YWxfcGF0aFxuICBsZXQgcmV2ZXJzZVBhdGg6YW55W10gPSBbY3VycmVudF07XG4gIGxldCB0b3RhbFBhdGg6YW55W10gPSBbXTtcbiAgd2hpbGUoaXNPYmplY3RJbk1hcEtleXMoY3VycmVudCwgZnJvbSkpIHtcbiAgICBjdXJyZW50ID0gZnJvbS5nZXQoY3VycmVudCk7XG4gICAgcmV2ZXJzZVBhdGgucHVzaChjdXJyZW50KTtcbiAgfVxuICBmb3IobGV0IGkgPSByZXZlcnNlUGF0aC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIHRvdGFsUGF0aC5wdXNoKHJldmVyc2VQYXRoW2ldKTtcbiAgfVxuICByZXR1cm4gdG90YWxQYXRoO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3BhdGgvQVN0YXIudHMiLCJleHBvcnQgY29uc3QgZ2V0TWluRlNjb3JlID0gKG9wZW46YW55W10pID0+IHtcbiAgbGV0IG1pbiA9IDA7XG4gIGZvcihsZXQgaSA9IDE7IGkgPCBvcGVuLmxlbmd0aCAtIDE7ICsraSkge1xuICAgIGlmKG9wZW5bbWluXS5mU2NvcmUgPiBvcGVuW2ldLmZTY29yZSkge1xuICAgICAgbWluID0gaTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG9wZW5bbWluXTtcbn1cblxuZXhwb3J0IGNvbnN0IHVuY2xvc2VkTmVpZ2JvdXJzID0gKGN1cnJlbnQ6YW55LCBjbG9zZWQ6YW55KSA9PiB7XG4gIGxldCBuZWlnaGJvdXJzTm90SW5DbG9zZWQgPSBbXTtcbiAgZm9yKGxldCBuZWlnaGJvdXIgb2YgY3VycmVudC5uZWlnaGJvdXJzKSB7XG4gICAgbGV0IGlzSW5DbG9zZWQ6Ym9vbGVhbiA9IGZhbHNlO1xuICAgIGZvcihsZXQgbm9kZSBvZiBjbG9zZWQpIHtcbiAgICAgIGlmKG5laWdoYm91ci54ID09PSBub2RlLnggJiYgbmVpZ2hib3VyLnkgPT09IG5vZGUueSkge1xuICAgICAgICBpc0luQ2xvc2VkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYoIWlzSW5DbG9zZWQpIHtcbiAgICAgIG5laWdoYm91cnNOb3RJbkNsb3NlZC5wdXNoKG5laWdoYm91cik7XG4gICAgfVxuICB9XG4gIHJldHVybiBuZWlnaGJvdXJzTm90SW5DbG9zZWQ7XG59XG5cbmV4cG9ydCBjb25zdCBpc09iamVjdEluTWFwS2V5cyA9IChvYmplY3Q6YW55LCBtYXA6YW55KSA9PiB7XG4gIGxldCBhcnI6YW55W10gPSBBcnJheS5mcm9tKG1hcCk7XG4gIGxldCByZXN1bHQ6Ym9vbGVhbiA9IGZhbHNlO1xuICBmb3IobGV0IGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgKytpKSB7XG4gICAgLy9jb25zb2xlLmxvZygnb2JqZWN0Jywgb2JqZWN0KTtcbiAgICBpZihhcnJbaV1bMF0ueCA9PT0gb2JqZWN0LnggJiYgYXJyW2ldWzBdLnkgPT09IG9iamVjdC55KSB7XG4gICAgICByZXN1bHQgPSB0cnVlO1xuICAgIH1cbiAgfVxuICBjb25zb2xlLmxvZygncmVzdWx0JywgcmVzdWx0KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9wYXRoL2FTdGFyVXRpbHMudHMiLCJpbXBvcnQge1xuICBnZXRDZW50cmFsV2FycmlvckluVW5pdCxcbiAgZ2V0Q2xvc2VzdFdhcnJpb3JUb0Rlc3RpbmF0aW9uSW5BcnJheVxufSBmcm9tICcuL3VuaXRVdGlscyc7XG5pbXBvcnQge2dyaWRTaXplfSBmcm9tICcuLi9tYXAvbWFwQ29uZmlnJztcbmltcG9ydCB7bWFwfSBmcm9tICcuLi9tYXAvY3JlYXRlTWFwJztcbmltcG9ydCB7Z2V0Tm9kZUZyb21NYXB9IGZyb20gJy4uL3BhdGgvZHJhd1BhdGgnO1xuaW1wb3J0IHtcbiAgZ2V0Tm9kZUZyb21BcnJheSxcbiAgZGVsZXRlT2JqZWN0RnJvbUFycmF5XG59IGZyb20gJy4uL3V0aWxzL29ialV0aWxzJztcbmltcG9ydCB7dXBkYXRlV2Fycmlvcn0gZnJvbSAnLi4vd2Fycmlvci93YXJyaW9yTW92ZW1lbnQnO1xuaW1wb3J0IHthU3Rhcn0gZnJvbSAnLi4vcGF0aC9BU3Rhcic7XG5cbmV4cG9ydCBjb25zdCBtb3ZlVG9Qb3NpdGlvbiA9ICh1bml0OmFueSwgbmV4dE5vZGU6YW55KSA9PiB7XG4gIC8vIGFzc2lnbiBtb3ZlVG9Qb3NpdGlvbnMgdG8gd2FycmlvcnNcbiAgbGV0IG1vdmluZ1dhcnJpb3JzID0gT2JqZWN0LmFzc2lnbihbXSwgdW5pdC53YXJyaW9ycyk7XG4gIGxldCBjZW50cmFsV2FycmlvciA9IGdldENlbnRyYWxXYXJyaW9ySW5Vbml0KHVuaXQpO1xuICBsZXQgdXBkYXRlZFdhcnJpb3JzID0gZGVsZXRlT2JqZWN0RnJvbUFycmF5KGNlbnRyYWxXYXJyaW9yLCB1bml0LndhcnJpb3JzKTtcbiAgLy9jb25zb2xlLmxvZygndXBkYXRlZFdhcnJpb3JzJywgdXBkYXRlZFdhcnJpb3JzKTtcbiAgY2VudHJhbFdhcnJpb3IubW92ZVRvTm9kZSA9IG5leHROb2RlO1xuICAvLyBhc3NpZ24gY2VudHJhbFVuaXQgZ2UgdG8gbmV4dCBuZXh0Tm9kZVxuICAvLyBhc3NpZ24gb3RoZXIgd2FycmlvcnMgbmV4dCBwb3NpdGlvbnNcbiAgZm9yKGxldCB3YXJyaW9yIG9mIHVwZGF0ZWRXYXJyaW9ycykge1xuICAgIGxldCB7ZGlmZmVyZW5jZUluWCxkaWZmZXJlbmNlSW5ZfSA9IGNoZWNrV2FycmlvcnNQb3NpdGlvbnMoY2VudHJhbFdhcnJpb3IsIHdhcnJpb3IpO1xuICAgIGxldCB4Om51bWJlciA9IG5leHROb2RlLnggKyAoZGlmZmVyZW5jZUluWCAqIGdyaWRTaXplKTtcbiAgICBsZXQgeTpudW1iZXIgPSBuZXh0Tm9kZS55ICsgKGRpZmZlcmVuY2VJblkgKiBncmlkU2l6ZSk7XG4gICAgY29uc29sZS5lcnJvcigneDonLCB4LCAneTonLCB5KTtcbiAgICBsZXQgbW92ZVRvTm9kZSA9IGdldE5vZGVGcm9tTWFwKHgsIHkpO1xuICAgIGNvbnNvbGUuZXJyb3IoJ21vdmVUb05vZGUnLCBtb3ZlVG9Ob2RlKTtcbiAgICB3YXJyaW9yLm1vdmVUb05vZGUgPSBtb3ZlVG9Ob2RlO1xuICB9XG4gIC8vIGNvbW1hbmQgdW5pdCB0byBtb3ZlXG4gIC8vIHdoaWxlKG1vdmluZ1dhcnJpb3JzLmxlbmd0aCA+IDApIHtcbiAgLy8gICBjb25zb2xlLmVycm9yKCdtb3ZpbmdXYXJyaW9yczonLCBtb3ZpbmdXYXJyaW9ycyk7XG4gIC8vICAgbGV0IGNsb3Nlc3QgPSBnZXRDbG9zZXN0V2FycmlvclRvRGVzdGluYXRpb25JbkFycmF5KG1vdmluZ1dhcnJpb3JzLCBuZXh0Tm9kZS54LCBuZXh0Tm9kZS55KTtcbiAgLy8gICBsZXQgc3RhcnROb2RlID0gZ2V0Tm9kZUZyb21NYXAoY2xvc2VzdC54LCBjbG9zZXN0LnkpO1xuICAvLyAgIGxldCBwYXRoOmFueSA9IGFTdGFyKHN0YXJ0Tm9kZSwgY2xvc2VzdC5tb3ZlVG9Ob2RlKTtcbiAgLy8gICB1cGRhdGVXYXJyaW9yKGNsb3Nlc3QsIHBhdGgsIDAsIGNsb3Nlc3QubW92ZVRvTm9kZS54LCBjbG9zZXN0Lm1vdmVUb05vZGUueSk7XG4gIC8vICAgbW92aW5nV2FycmlvcnMgPSBkZWxldGVPYmplY3RGcm9tQXJyYXkoY2xvc2VzdCwgbW92aW5nV2FycmlvcnMpO1xuICAvLyB9XG4gIHVuaXRNb3ZlbWVudChtb3ZpbmdXYXJyaW9ycywgbmV4dE5vZGUpO1xufVxuXG5leHBvcnQgY29uc3QgY2hlY2tXYXJyaW9yc1Bvc2l0aW9ucyA9IChjZW50cmFsV2FycmlvcjphbnksIGN1cnJlbnRXYXJyaW9yOmFueSkgPT4ge1xuICBsZXQgY2VudHJhbENvbCA9IGNlbnRyYWxXYXJyaW9yLmNvbEluVW5pdDtcbiAgbGV0IGNlbnRyYWxSb3cgPSBjZW50cmFsV2Fycmlvci5yb3dJblVuaXQ7XG4gIGxldCBjdXJyZW50Um93ID0gY3VycmVudFdhcnJpb3Iucm93SW5Vbml0O1xuICBsZXQgY3VycmVudENvbCA9IGN1cnJlbnRXYXJyaW9yLmNvbEluVW5pdDtcbiAgbGV0IGRpZmZlcmVuY2VJblggPSBjdXJyZW50Q29sIC0gY2VudHJhbENvbDtcbiAgbGV0IGRpZmZlcmVuY2VJblkgPSBjdXJyZW50Um93IC0gY2VudHJhbFJvdztcbiAgcmV0dXJuIHtcbiAgICBkaWZmZXJlbmNlSW5YLFxuICAgIGRpZmZlcmVuY2VJbllcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgdW5pdE1vdmVtZW50ID0gKG1vdmluZ1dhcnJpb3JzOmFueVtdLCBuZXh0Tm9kZTphbnkpID0+IHtcbiAgaWYobW92aW5nV2FycmlvcnMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGxldCBjbG9zZXN0ID0gZ2V0Q2xvc2VzdFdhcnJpb3JUb0Rlc3RpbmF0aW9uSW5BcnJheShtb3ZpbmdXYXJyaW9ycywgbmV4dE5vZGUueCwgbmV4dE5vZGUueSk7XG4gIGxldCBzdGFydE5vZGUgPSBnZXROb2RlRnJvbU1hcChjbG9zZXN0LngsIGNsb3Nlc3QueSk7XG4gIGxldCBwYXRoOmFueSA9IGFTdGFyKHN0YXJ0Tm9kZSwgY2xvc2VzdC5tb3ZlVG9Ob2RlKTtcbiAgdXBkYXRlV2FycmlvcihjbG9zZXN0LCBwYXRoLCAwLCBjbG9zZXN0Lm1vdmVUb05vZGUueCwgY2xvc2VzdC5tb3ZlVG9Ob2RlLnkpO1xuICBtb3ZpbmdXYXJyaW9ycyA9IGRlbGV0ZU9iamVjdEZyb21BcnJheShjbG9zZXN0LCBtb3ZpbmdXYXJyaW9ycyk7XG4gIHVuaXRNb3ZlbWVudChtb3ZpbmdXYXJyaW9ycywgbmV4dE5vZGUpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3VuaXQvdW5pdE1vdmVtZW50LnRzIl0sInNvdXJjZVJvb3QiOiIifQ==