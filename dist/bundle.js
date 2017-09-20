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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
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
var Warrior_1 = __webpack_require__(9);
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
var mapConfig_1 = __webpack_require__(0);
var drawGrid_1 = __webpack_require__(8);
var createMap_1 = __webpack_require__(2);
var drawPath_1 = __webpack_require__(4);
var warriorStore_1 = __webpack_require__(5);
var warriorAction_1 = __webpack_require__(1);
var unitActions_1 = __webpack_require__(10);
var unitStore_1 = __webpack_require__(6);
var unitUtils_1 = __webpack_require__(15);
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
    warriorAction_1.assignWarriorMoveToPosition(warriorStore_1.currentlyChosenWarrior, x, y);
    console.error('Angle', unitUtils_1.calcDestinationAngleInDegrees(unitStore_1.currentlyChosenUnit, x, y));
    // let path:any = aStar(startNode, finishNode);
    // if(currentlyChosenUnit) {
    //  onChangeWarriorPositionInUnit(currentlyChosenUnit,path, 0, x, y);
    // }
    //drawPath(path);
});


/***/ }),
/* 8 */
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
/* 9 */
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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var warriorAction_1 = __webpack_require__(1);
var mapConfig_1 = __webpack_require__(0);
var warriorMovement_1 = __webpack_require__(11);
var Unit_1 = __webpack_require__(12);
var unitStore_1 = __webpack_require__(6);
var warriorAction_2 = __webpack_require__(1);
var drawPath_1 = __webpack_require__(4);
var AStar_1 = __webpack_require__(13);
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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var warriorAction_1 = __webpack_require__(1);
var mapConfig_1 = __webpack_require__(0);
exports.updateWarrior = function (warrior, path, i, currentMoveToX, currentMoveToY) {
    if (i === void 0) { i = 0; }
    console.log('updateWarrior');
    if (currentMoveToX !== warrior.moveToNodeX || currentMoveToY !== warrior.moveToNodeY) {
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
        }, 300);
    }
};


/***/ }),
/* 12 */
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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var createMap_1 = __webpack_require__(2);
var objUtils_1 = __webpack_require__(3);
var aStarUtils_1 = __webpack_require__(14);
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


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMDIwZjdlYmNlZGQ4ZDYyODk2NTUiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hcC9tYXBDb25maWcudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dhcnJpb3Ivd2FycmlvckFjdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFwL2NyZWF0ZU1hcC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvb2JqVXRpbHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhdGgvZHJhd1BhdGgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0b3JlL3dhcnJpb3JTdG9yZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc3RvcmUvdW5pdFN0b3JlLnRzIiwid2VicGFjazovLy8uL3NyYy9nYW1lLnRzIiwid2VicGFjazovLy8uL3NyYy9tYXAvZHJhd0dyaWQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dhcnJpb3IvV2Fycmlvci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdW5pdC91bml0QWN0aW9ucy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd2Fycmlvci93YXJyaW9yTW92ZW1lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VuaXQvVW5pdC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcGF0aC9BU3Rhci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcGF0aC9hU3RhclV0aWxzLnRzIiwid2VicGFjazovLy8uL3NyYy91bml0L3VuaXRVdGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtB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QUksQ0FBQyxFQUFFLEVBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQztRQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsQ0FBQyxFQUFFLEdBQUcsTUFBTSxDQUFDLENBQUM7SUFDbEQsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDM0IsQ0FBQztBQUVZLGlCQUFTLEdBQUcsVUFBQyxLQUFZLEVBQUUsS0FBWSxFQUFFLEtBQVksRUFBRSxLQUFZO0lBQzlFLDZCQUE2QjtJQUM3QixJQUFJLE1BQU0sQ0FBQztJQUNYLEVBQUUsRUFBQyxLQUFLLElBQUksS0FBSyxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ25DLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDYixDQUFDO0lBQ0QsSUFBSSxDQUFDLEVBQUUsRUFBQyxLQUFLLEdBQUcsS0FBSyxJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ3hDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDYixDQUFDO0lBQ0QsSUFBSSxDQUFDLEVBQUUsRUFBQyxLQUFLLElBQUksS0FBSyxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ3hDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDYixDQUFDO0lBQ0QsSUFBSSxDQUFDLEVBQUUsRUFBQyxLQUFLLEdBQUcsS0FBSyxJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ3hDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDYixDQUFDO0lBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQztBQUNoQixDQUFDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDAyMGY3ZWJjZWRkOGQ2Mjg5NjU1IiwiLy8gZ2xvYmFsIHZhcmlhYmxlc1xuZXhwb3J0IGNvbnN0IFdJRFRIOiBudW1iZXIgPSAxMjAwO1xuZXhwb3J0IGNvbnN0IEhFSUdIVDogbnVtYmVyID0gNjAwO1xuZXhwb3J0IGNvbnN0IGdyaWRTaXplOm51bWJlciA9IDIwO1xuXG4vLyBjcmVhdGUgQ2FudmFzXG5leHBvcnQgbGV0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuY2FudmFzLmlkID0gXCJjYW52YXNcIjtcbmNhbnZhcy53aWR0aCA9IFdJRFRIO1xuY2FudmFzLmhlaWdodCA9IEhFSUdIVDtcbmNhbnZhcy5zdHlsZS5ib3JkZXIgPSBcIjFweCBzb2xpZFwiO1xuXG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNhbnZhcyk7XG5cbi8vIGRlZmluZSAyZCBjb250ZXh0XG5leHBvcnQgbGV0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFwL21hcENvbmZpZy50cyIsImltcG9ydCB7Z3JpZFNpemV9IGZyb20gJy4uL21hcC9tYXBDb25maWcnO1xuaW1wb3J0IHtcbiAgd2FycmlvcnMsXG4gIGN1cnJlbnRseUNob3NlbldhcnJpb3IsXG4gIGFzc2lnbkN1cnJlbnRseUNob3NlbldhcnJpb3Jcbn0gZnJvbSAnLi4vc3RvcmUvd2FycmlvclN0b3JlJztcbmltcG9ydCB7Y3R4fSBmcm9tICcuLi9tYXAvbWFwQ29uZmlnJztcbmltcG9ydCBXYXJyaW9yIGZyb20gJy4vV2Fycmlvcic7XG5cbmV4cG9ydCBjb25zdCBvbkNob29zZVdhcnJpb3IgPSAod2FycmlvcnM6YW55W10sIG1vdXNlWDpudW1iZXIsIG1vdXNlWTpudW1iZXIpID0+IHtcbiAgbGV0IGZvdW5kZWRXYXJyaW9yID0gbnVsbDtcbiAgZm9yKGxldCB3YXJyaW9yIG9mIHdhcnJpb3JzKSB7XG4gICAgbGV0IGJvdHRvbVJpZ2h0WCA9IHdhcnJpb3IueCArIGdyaWRTaXplO1xuICAgIGxldCBib3R0b21SaWdodFkgPSB3YXJyaW9yLnkgKyBncmlkU2l6ZTtcbiAgICBpZihtb3VzZVggPj0gd2Fycmlvci54ICYmIG1vdXNlWCA8IGJvdHRvbVJpZ2h0WCAmJiBtb3VzZVkgPj0gd2Fycmlvci55ICYmIG1vdXNlWSA8IGJvdHRvbVJpZ2h0WSkge1xuICAgICAgY29uc29sZS5sb2coJ3dhcnJpb3InLCB3YXJyaW9yLm5hbWUsICcgd2FzIGNob3NlbicpO1xuICAgICAgd2Fycmlvci5pc0N1cnJlbnRseUNob3NlbiA9IHRydWU7XG4gICAgICBmb3VuZGVkV2FycmlvciA9IHdhcnJpb3I7XG4gICAgfVxuICB9XG4gIGFzc2lnbkN1cnJlbnRseUNob3NlbldhcnJpb3IoZm91bmRlZFdhcnJpb3IpO1xuICBjb25zb2xlLmxvZygnY3VycmVudGx5Q2hvc2VuV2FycmlvcicsIGN1cnJlbnRseUNob3NlbldhcnJpb3IpO1xufVxuXG5leHBvcnQgY29uc3QgZHJhd1dhcnJpb3IgPSAod2FycmlvcjphbnkpID0+IHtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4LmFyYyh3YXJyaW9yLmNlbnRlclgsIHdhcnJpb3IuY2VudGVyWSwgd2Fycmlvci5yYWRpdXMsIDAsIE1hdGguUEkqMik7XG4gICAgY3R4LmZpbGxTdHlsZSA9ICcjZDkyNTEwJztcbiAgICBjdHguZmlsbCgpO1xuICAgIGN0eC5jbG9zZVBhdGgoKTtcbn1cblxuZXhwb3J0IGNvbnN0IGFzc2lnbldhcnJpb3JNb3ZlVG9Qb3NpdGlvbiA9ICh3YXJyaW9yOmFueSwgeDpudW1iZXIsIHk6bnVtYmVyKSA9PiB7XG4gIC8vY29uc29sZS5lcnJvcignYXNzaWduTW92ZVRvUG9zaXRpb24nKTtcbiAgaWYod2Fycmlvcikge1xuICAgIHdhcnJpb3IubW92ZVRvTm9kZVggPSB4O1xuICAgIHdhcnJpb3IubW92ZVRvTm9kZVkgPSB5O1xuICAgIGNvbnNvbGUubG9nKHdhcnJpb3IubmFtZSArICcgaXMgbW92aW5nIHRvIG5vZGU6JyArIHdhcnJpb3IubW92ZVRvTm9kZVggKyAnIHk6JyArIHdhcnJpb3IubW92ZVRvTm9kZVkpO1xuICB9IGVsc2Uge1xuICAgIGNvbnNvbGUubG9nKCd3YXJyaW9yIG5vdCBjaG9zZW4nKTtcbiAgfVxufVxuXG4vLyBjcmVhdGUgVW5pdCBhbmQgaW1tZWRpYXRseSBwdXNoIGl0IGludG8gdW5pdHMgYXJyYXlcbmV4cG9ydCBsZXQgY3JlYXRlV2FycmlvciA9IChuYW1lOnN0cmluZywgeDpudW1iZXIsIHk6bnVtYmVyLCByYWRpdXM6bnVtYmVyKSA9PiB7XG4gIC8vY29uc29sZS5lcnJvcignY3JlYXRlVW5pdCcpO1xuICBsZXQgd2FycmlvciA9IG5ldyBXYXJyaW9yKG5hbWUsIHgsIHksIHJhZGl1cyk7XG4gIHdhcnJpb3JzLnB1c2god2Fycmlvcik7XG4gIGRyYXdXYXJyaW9yKHdhcnJpb3IpO1xuICByZXR1cm4gd2Fycmlvcjtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy93YXJyaW9yL3dhcnJpb3JBY3Rpb24udHMiLCJpbXBvcnQge1xuICBjYW52YXMsXG4gIGN0eCxcbiAgV0lEVEgsXG4gIEhFSUdIVCxcbiAgZ3JpZFNpemVcbn0gZnJvbSAnLi4vbWFwL21hcENvbmZpZyc7XG5cbmltcG9ydCB7XG4gIGRlbGV0ZU9iamVjdEZyb21BcnJheSxcbn0gZnJvbSAnLi4vdXRpbHMvb2JqVXRpbHMnO1xuXG5leHBvcnQgY29uc3QgY3JlYXRlTm9kZXMgPSAoKSA9PiB7XG4gIGxldCBtYXA6YW55W10gPSBbXTtcbiAgbGV0IHZhbHVlID0gMTtcbiAgbGV0IGlkID0gMDtcbiAgZm9yKGxldCB5ID0gMDsgeSA8PSBIRUlHSFQ7IHkrPSBncmlkU2l6ZSkge1xuICAgIGZvcihsZXQgeCA9IDA7IHggPD0gV0lEVEg7IHgrPSBncmlkU2l6ZSkge1xuICAgICAgbWFwLnB1c2goe1xuICAgICAgICBpZDogaWQsXG4gICAgICAgIHg6IHgsXG4gICAgICAgIHk6IHksXG4gICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgbmVpZ2hib3VyczogW11cbiAgICAgIH0pO1xuICAgICAgaWQrKztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG1hcDtcbn1cblxuZXhwb3J0IGNvbnN0IG5laWdoYm91cnMgPSAobm9kZTphbnkpID0+IHtcbiAgbGV0IGRpcnMgPSBbXG4gICAge3g6IC1ncmlkU2l6ZSwgeTogLWdyaWRTaXplLCBkaXN0YW5jZTogMTR9LFxuICAgIHt4OiAwLCB5OiAtZ3JpZFNpemUsIGRpc3RhbmNlOiAxMH0sXG4gICAge3g6IGdyaWRTaXplLCB5OiAtZ3JpZFNpemUsIGRpc3RhbmNlOiAxNH0sXG4gICAge3g6IC1ncmlkU2l6ZSwgeTogMCwgZGlzdGFuY2U6IDEwfSxcbiAgICB7eDogZ3JpZFNpemUsIHk6IDAsIGRpc3RhbmNlOiAxMH0sXG4gICAge3g6IC1ncmlkU2l6ZSwgeTogZ3JpZFNpemUsIGRpc3RhbmNlOiAxNH0sXG4gICAge3g6IDAsIHk6IGdyaWRTaXplLCBkaXN0YW5jZTogMTB9LFxuICAgIHt4OiBncmlkU2l6ZSwgeTogZ3JpZFNpemUsIGRpc3RhbmNlOiAxNH1cbiAgXTtcbiAgbGV0IHJlc3VsdCA9IFtdO1xuICBmb3IobGV0IGRpciBvZiBkaXJzKSB7XG4gICAgbGV0IG5laWdoYm91ciA9IHtcbiAgICAgIHg6IG5vZGUueCArIGRpci54LFxuICAgICAgeTogbm9kZS55ICsgZGlyLnksXG4gICAgICBkaXN0YW5jZTogZGlyLmRpc3RhbmNlXG4gICAgfVxuICAgIGlmKG5laWdoYm91ci54ID49IDAgJiYgbmVpZ2hib3VyLnggPCBXSURUSCAmJiBuZWlnaGJvdXIueSA+PSAwICYmIG5laWdoYm91ci55IDwgSEVJR0hUKSB7XG4gICAgICAgIGxldCBmaW5kZWQ6Ym9vbGVhbiA9IGZhbHNlO1xuICAgICAgICBmb3IobGV0IG5vZGUgb2YgbWFwKSB7XG4gICAgICAgICAgaWYobmVpZ2hib3VyLnggPT09IG5vZGUueCAmJiBuZWlnaGJvdXIueSA9PT0gbm9kZS55KSB7XG4gICAgICAgICAgICBmaW5kZWQgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZihmaW5kZWQpIHtcbiAgICAgICAgICByZXN1bHQucHVzaCh7XG4gICAgICAgICAgICB4OiBuZWlnaGJvdXIueCxcbiAgICAgICAgICAgIHk6IG5laWdoYm91ci55LFxuICAgICAgICAgICAgZGlzdGFuY2U6IG5laWdoYm91ci5kaXN0YW5jZSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgY29uc3QgYWRkTmVpZ2hib3VycyA9IChtYXA6YW55W10pID0+IHtcbiAgZm9yKGxldCBub2RlIG9mIG1hcCkge1xuICAgIGxldCBuID0gbmVpZ2hib3Vycyhub2RlKTtcbiAgICBub2RlLm5laWdoYm91cnMgPSBuO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVPbmVPYnN0YWNsZSA9IChwb3NpdGlvblg6bnVtYmVyLCBwb3NpdGlvblk6bnVtYmVyLCB0eXBlOnN0cmluZz0nZm9yZXN0JykgPT4ge1xuICBsZXQgbm9kZSA9IHtcbiAgICB4OiBwb3NpdGlvblgsXG4gICAgeTogcG9zaXRpb25ZXG4gIH07XG4gIGlmKHR5cGUgPT09ICdmb3Jlc3QnKSBjdHguZmlsbFN0eWxlID0gJ2dyZWVuJztcbiAgZWxzZSBpZih0eXBlID09PSAnbW91bnRhaW4nKSBjdHguZmlsbFN0eWxlID0gJyM4QjQ1MTMnO1xuICBlbHNlIGlmKHR5cGUgPT09ICdyaXZlcicpIGN0eC5maWxsU3R5bGUgPSAnYmx1ZSc7XG4gIGN0eC5maWxsUmVjdChwb3NpdGlvblgsIHBvc2l0aW9uWSwgZ3JpZFNpemUsIGdyaWRTaXplKTtcbiAgcmV0dXJuIGRlbGV0ZU9iamVjdEZyb21BcnJheShub2RlLCBtYXApXG59XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVPYnN0YWNsZXMgPSAoc3RhcnRYOm51bWJlciwgZmluaXNoWDpudW1iZXIsIHN0YXJ0WTpudW1iZXIsIGZpbmlzaFk6bnVtYmVyLCB0eXBlOnN0cmluZz0nZm9yZXN0JykgPT4ge1xuICBsZXQgbmV3TWFwOmFueVtdID0gbWFwO1xuICBmb3IobGV0IHggPSBzdGFydFg7IHggPD0gZmluaXNoWDsgeCArPSBncmlkU2l6ZSkge1xuICAgIGZvcihsZXQgeSA9IHN0YXJ0WTsgeSA8PSBmaW5pc2hZOyB5ICs9IGdyaWRTaXplKSB7XG4gICAgICBsZXQgbm9kZSA9IHtcbiAgICAgICAgeCxcbiAgICAgICAgeVxuICAgICAgfVxuICAgICAgbmV3TWFwID0gZGVsZXRlT2JqZWN0RnJvbUFycmF5KG5vZGUsIG5ld01hcCk7XG4gICAgICBpZih0eXBlID09PSAnZm9yZXN0JykgY3R4LmZpbGxTdHlsZSA9ICdncmVlbic7XG4gICAgICBlbHNlIGlmKHR5cGUgPT09ICdtb3VudGFpbicpIGN0eC5maWxsU3R5bGUgPSAnIzhCNDUxMyc7XG4gICAgICBlbHNlIGlmKHR5cGUgPT09ICdyaXZlcicpIGN0eC5maWxsU3R5bGUgPSAnYmx1ZSc7XG4gICAgICBsZXQgeExlbmd0aCA9IE1hdGguYWJzKHN0YXJ0WCAtIGZpbmlzaFgpO1xuICAgICAgbGV0IHlMZW5ndGggPSBNYXRoLmFicyhzdGFydFkgLSBmaW5pc2hZKTtcbiAgICAgIGN0eC5maWxsUmVjdCh4LCB5LCBncmlkU2l6ZSwgZ3JpZFNpemUpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbmV3TWFwO1xufVxuXG5leHBvcnQgbGV0IG1hcCA9IGNyZWF0ZU5vZGVzKCk7XG5tYXAgPSBjcmVhdGVPYnN0YWNsZXMoMTIwLCAxNjAsIDEyMCwgMTYwLCAncml2ZXInKTtcbm1hcCA9IGNyZWF0ZU9ic3RhY2xlcyg2NjAsIDgyMCwgMTgwLCAyMDAsICdyaXZlcicpO1xubWFwID0gY3JlYXRlT2JzdGFjbGVzKDkwMCwgMTE4MCwgMTgwLCAyMDAsICdyaXZlcicpO1xubWFwID0gY3JlYXRlT25lT2JzdGFjbGUoMzAwLCAzNDAsICdtb3VudGFpbicpO1xubWFwID0gY3JlYXRlT2JzdGFjbGVzKDI4MCwgMzIwLCAzNjAsIDM4MCwgJ21vdW50YWluJyk7XG5tYXAgPSBjcmVhdGVPYnN0YWNsZXMoNzQwLCA3NjAsIDQyMCwgNTAwLCAnZm9yZXN0Jyk7XG5tYXAgPSBjcmVhdGVPYnN0YWNsZXMoOTYwLCAxMDAwLCA0NDAsIDQ2MCwgJ2ZvcmVzdCcpO1xubWFwID0gY3JlYXRlT2JzdGFjbGVzKDk4MCwgMTAwMCwgNDQwLCA1MjAsICdmb3Jlc3QnKTtcbmFkZE5laWdoYm91cnMobWFwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tYXAvY3JlYXRlTWFwLnRzIiwiZXhwb3J0IGNvbnN0IGRlbGV0ZU9iamVjdEZyb21BcnJheSA9IChvYmplY3Q6YW55LCBhcnI6YW55W10pID0+IHtcbiAgbGV0IHVwZGF0ZWRBcnIgPSBhcnIuZmlsdGVyKChlbCkgPT4ge1xuICAgIGlmKGVsLnggPT09IG9iamVjdC54ICYmIGVsLnkgPT09IG9iamVjdC55KSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9KTtcbiAgcmV0dXJuIHVwZGF0ZWRBcnI7XG59XG5cbmV4cG9ydCBjb25zdCBpc09iamVjdEluQXJyYXkgPSAob2JqZWN0OmFueSwgYXJyOmFueVtdKSA9PiB7XG4gIGxldCByZXN1bHQ6Ym9vbGVhbiA9IGZhbHNlO1xuICBmb3IobGV0IG5vZGUgb2YgYXJyKSB7XG4gICAgaWYob2JqZWN0LnggPT09IG5vZGUueCAmJiBvYmplY3QueSA9PT0gbm9kZS55KSB7XG4gICAgICByZXN1bHQgPSB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgY29uc3QgZ2V0Tm9kZUZyb21BcnJheSA9IChvYmplY3Q6YW55LCBhcnI6YW55W10pID0+IHtcbiAgZm9yKGxldCBub2RlIG9mIGFycikge1xuICAgIGlmKG5vZGUueCA9PT0gb2JqZWN0LnggJiYgbm9kZS55ICYmIG9iamVjdC55KSB7XG4gICAgICByZXR1cm4gbm9kZTtcbiAgICB9XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91dGlscy9vYmpVdGlscy50cyIsImltcG9ydCB7XG4gIGNhbnZhcyxcbiAgY3R4LFxuICBXSURUSCxcbiAgSEVJR0hULFxuICBncmlkU2l6ZSxcbn0gZnJvbSAnLi4vbWFwL21hcENvbmZpZyc7XG5cbmltcG9ydCB7bWFwfSBmcm9tICcuLi9tYXAvY3JlYXRlTWFwJztcblxuZXhwb3J0IGNvbnN0IGRyYXdQYXRoID0gKHBhdGg6YW55W10pID0+IHtcbiAgZm9yKGxldCBzdGVwIG9mIHBhdGgpIHtcbiAgICBjdHguZmlsbFN0eWxlID0gJ3llbGxvdyc7XG4gICAgY3R4LmZpbGxSZWN0KHN0ZXAueCwgc3RlcC55LCBncmlkU2l6ZSwgZ3JpZFNpemUpO1xuICB9XG59XG5cbmV4cG9ydCBsZXQgZ2V0Tm9kZUZyb21NYXAgPSAoeDpudW1iZXIsIHk6bnVtYmVyKSA9PiB7XG4gIGxldCBub2RlOmFueTtcbiAgZm9yKGxldCBncmlkIG9mIG1hcCkge1xuICAgIGxldCBib3R0b21SaWdodFggPSBncmlkLnggKyBncmlkU2l6ZTtcbiAgICBsZXQgYm90dG9tUmlnaHRZID0gZ3JpZC55ICsgZ3JpZFNpemU7XG4gICAgaWYoeCA+PSBncmlkLnggJiYgeCA8IGJvdHRvbVJpZ2h0WCAmJiB5ID49IGdyaWQueSAmJiB5IDwgYm90dG9tUmlnaHRZKSB7XG4gICAgICBub2RlID0gZ3JpZDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG5vZGU7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcGF0aC9kcmF3UGF0aC50cyIsImV4cG9ydCBjb25zdCB3YXJyaW9yczphbnlbXSA9IFtdO1xuZXhwb3J0IGxldCBjdXJyZW50bHlDaG9zZW5XYXJyaW9yOmFueSA9IG51bGw7XG5cbmV4cG9ydCBjb25zdCBhc3NpZ25DdXJyZW50bHlDaG9zZW5XYXJyaW9yID0gKHdhcnJpb3I6YW55KSA9PiB7XG4gIC8vIGNoZWNrIHVuaXRcbiAgaWYod2Fycmlvcikge1xuICAgICAgY3VycmVudGx5Q2hvc2VuV2FycmlvciA9IHdhcnJpb3I7XG4gIH0gZWxzZSB7XG4gICAgY3VycmVudGx5Q2hvc2VuV2FycmlvciA9IG51bGw7XG4gIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3N0b3JlL3dhcnJpb3JTdG9yZS50cyIsImV4cG9ydCBjb25zdCB1bml0czphbnlbXSA9IFtdO1xuZXhwb3J0IGxldCBjdXJyZW50bHlDaG9zZW5Vbml0OmFueSA9IG51bGw7XG5cbmV4cG9ydCBjb25zdCBhc3NpZ25DdXJyZW50bHlDaG9zZW5Vbml0ID0gKHVuaXQ6YW55KSA9PiB7XG4gIC8vIGNoZWNrIHVuaXRcbiAgaWYodW5pdCkge1xuICAgICAgY3VycmVudGx5Q2hvc2VuVW5pdCA9IHVuaXQ7XG4gIH0gZWxzZSB7XG4gICAgY3VycmVudGx5Q2hvc2VuVW5pdCA9IG51bGw7XG4gIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3N0b3JlL3VuaXRTdG9yZS50cyIsImltcG9ydCB7XG4gIGNhbnZhcyxcbiAgY3R4LFxuICBXSURUSCxcbiAgSEVJR0hULFxuICBncmlkU2l6ZVxufSBmcm9tICcuL21hcC9tYXBDb25maWcnO1xuXG5pbXBvcnQge2RyYXdHcmlkfSBmcm9tICcuL21hcC9kcmF3R3JpZCc7XG5pbXBvcnQge1xuICBhZGROZWlnaGJvdXJzLFxuICBjcmVhdGVOb2RlcyxcbiAgbWFwXG59IGZyb20gJy4vbWFwL2NyZWF0ZU1hcCc7XG5pbXBvcnQge3Nob3dPYnN0YWNsZXN9IGZyb20gJy4vbWFwL21hcFV0aWxzJztcbmltcG9ydCB7aCwgYVN0YXJ9IGZyb20gJy4vcGF0aC9BU3Rhcic7XG5pbXBvcnQge1xuICBkcmF3UGF0aCxcbiAgZ2V0Tm9kZUZyb21NYXBcbn0gZnJvbSAnLi9wYXRoL2RyYXdQYXRoJztcblxuaW1wb3J0IFdhcnJpb3IgZnJvbSAnLi93YXJyaW9yL1dhcnJpb3InO1xuaW1wb3J0IHt3YXJyaW9ycywgY3VycmVudGx5Q2hvc2VuV2Fycmlvcn0gZnJvbSAnLi9zdG9yZS93YXJyaW9yU3RvcmUnO1xuaW1wb3J0IHtcbiAgb25DaG9vc2VXYXJyaW9yLFxuICBjcmVhdGVXYXJyaW9yLFxuICBhc3NpZ25XYXJyaW9yTW92ZVRvUG9zaXRpb24sXG59IGZyb20gJy4vd2Fycmlvci93YXJyaW9yQWN0aW9uJztcbmltcG9ydCB7dXBkYXRlV2Fycmlvcn0gZnJvbSAnLi93YXJyaW9yL3dhcnJpb3JNb3ZlbWVudCc7XG5cbmltcG9ydCB7XG4gIGNyZWF0ZVVuaXQsXG4gIG9uQ2hvb3NlVW5pdCxcbiAgb25DaGFuZ2VXYXJyaW9yUG9zaXRpb25JblVuaXRcbn0gZnJvbSAnLi91bml0L3VuaXRBY3Rpb25zJztcbmltcG9ydCB7XG4gIHVuaXRzLFxuICBjdXJyZW50bHlDaG9zZW5Vbml0XG59IGZyb20gJy4vc3RvcmUvdW5pdFN0b3JlJztcblxuaW1wb3J0IHtcbiAgY2FsY0Rlc3RpbmF0aW9uQW5nbGVJbkRlZ3JlZXNcbn0gZnJvbSAnLi91bml0L3VuaXRVdGlscyc7XG5cbmxldCB3YXJyaW9yID0gY3JlYXRlV2FycmlvcignYmFyYmFyaWFuJywgODAsIDE2MCwgNSk7XG5jcmVhdGVVbml0KCd0ZXN0VW5pdCcsIDYsIDI0MCwgNDIwKTtcblxuZHJhd0dyaWQoKTtcbmNvbnNvbGUubG9nKCdtYXAnLCBtYXApO1xuY29uc29sZS5sb2coJ2N1cnJlbnRseUNob3NlbldhcnJpb3InLCBjdXJyZW50bHlDaG9zZW5XYXJyaW9yKTtcblxuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgY29uc29sZS5lcnJvcignQ2xpY2snKTtcbiAgbGV0IHggPSBlLm9mZnNldFg7IC8vIGdldCBYXG4gIGxldCB5ID0gZS5vZmZzZXRZOyAvLyBnZXQgWVxuICBjb25zb2xlLmxvZygnUG9zaXRpb24geCcsIGUub2Zmc2V0WCk7IC8vIGdldCBYXG4gIGNvbnNvbGUubG9nKCdQb3NpdGlvbiB5JywgZS5vZmZzZXRZKTsgLy8gZ2V0IFlcbiAgb25DaG9vc2VXYXJyaW9yKHdhcnJpb3JzLCB4LCB5KTtcbiAgb25DaG9vc2VVbml0KHVuaXRzLCBjdXJyZW50bHlDaG9zZW5XYXJyaW9yKTtcbiAgY29uc29sZS5sb2coJ2N1cnJlbnRseUNob3NlbldhcnJpb3InLCBjdXJyZW50bHlDaG9zZW5XYXJyaW9yKTtcbn0pO1xuXG4vLyBzZXQgb25DbGlja0xpc3RlbmVyIGZvciByaWdodCBtb3VzZSBldmVudFxuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ2NvbnRleHRtZW51JywgKGUpID0+IHtcbiAgY29uc29sZS5lcnJvcignUmlnaHQgTW91c2UgQ2xpY2snKTtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBsZXQgeCA9IGUub2Zmc2V0WDsgLy8gZ2V0IFhcbiAgbGV0IHkgPSBlLm9mZnNldFk7IC8vIGdldCBZXG4gIGxldCBzdGFydE5vZGUgPSBnZXROb2RlRnJvbU1hcChjdXJyZW50bHlDaG9zZW5Vbml0LmNvbW1hbmRlclBvc2l0aW9uWCwgY3VycmVudGx5Q2hvc2VuVW5pdC5jb21tYW5kZXJQb3NpdGlvblkpO1xuICBsZXQgZmluaXNoTm9kZSA9IGdldE5vZGVGcm9tTWFwKHgsIHkpO1xuICBjb25zb2xlLmVycm9yKCdzdGFydE5vZGUnLCBzdGFydE5vZGUpO1xuICBjb25zb2xlLmVycm9yKCdmaW5pc2hOb2RlJywgZmluaXNoTm9kZSk7XG4gIGFzc2lnbldhcnJpb3JNb3ZlVG9Qb3NpdGlvbihjdXJyZW50bHlDaG9zZW5XYXJyaW9yLCB4LCB5KTtcblxuICBhc3NpZ25XYXJyaW9yTW92ZVRvUG9zaXRpb24oY3VycmVudGx5Q2hvc2VuV2FycmlvciwgeCwgeSk7XG4gIGNvbnNvbGUuZXJyb3IoJ0FuZ2xlJywgY2FsY0Rlc3RpbmF0aW9uQW5nbGVJbkRlZ3JlZXMoY3VycmVudGx5Q2hvc2VuVW5pdCwgeCwgeSkpO1xuICAvLyBsZXQgcGF0aDphbnkgPSBhU3RhcihzdGFydE5vZGUsIGZpbmlzaE5vZGUpO1xuICAvLyBpZihjdXJyZW50bHlDaG9zZW5Vbml0KSB7XG4gIC8vICBvbkNoYW5nZVdhcnJpb3JQb3NpdGlvbkluVW5pdChjdXJyZW50bHlDaG9zZW5Vbml0LHBhdGgsIDAsIHgsIHkpO1xuICAvLyB9XG5cbiAgLy9kcmF3UGF0aChwYXRoKTtcbn0pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2dhbWUudHMiLCJpbXBvcnQge1xuICBjYW52YXMsXG4gIGN0eCxcbiAgV0lEVEgsXG4gIEhFSUdIVCxcbiAgZ3JpZFNpemVcbn0gZnJvbSAnLi9tYXBDb25maWcnO1xuXG5leHBvcnQgY29uc3QgZHJhd0dyaWQgPSAoKSA9PiB7XG4gIGZvcihsZXQgeSA9IDA7IHkgPD0gSEVJR0hUOyB5Kz0gZ3JpZFNpemUpIHtcbiAgICBmb3IobGV0IHggPSAwOyB4IDw9IFdJRFRIOyB4Kz0gZ3JpZFNpemUpIHtcbiAgICAgIGN0eC5zdHJva2VSZWN0KHgsIHksIGdyaWRTaXplLCBncmlkU2l6ZSk7XG4gICAgfVxuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFwL2RyYXdHcmlkLnRzIiwiaW1wb3J0IHtncmlkU2l6ZX0gZnJvbSAnLi4vbWFwL21hcENvbmZpZyc7XG5cbmNsYXNzIFdhcnJpb3Ige1xuICBuYW1lOiBzdHJpbmc7XG4gIHg6IG51bWJlcjtcbiAgeTogbnVtYmVyO1xuICBjZW50ZXJYOiBudW1iZXI7XG4gIGNlbnRlclk6IG51bWJlcjtcbiAgcmFkaXVzOiBudW1iZXI7XG4gIG1vdmVUb05vZGVYOiBudW1iZXI7XG4gIG1vdmVUb05vZGVZOiBudW1iZXI7XG4gIGlzQ3VycmVudGx5Q2hvc2VuOiBib29sZWFuID0gZmFsc2U7XG4gIHBvc2l0aW9uSW5Vbml0OiBudW1iZXI7XG4gIHJvd0luVW5pdDogbnVtYmVyO1xuICBjb2xJblVuaXQ6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcihuYW1lOnN0cmluZywgeDpudW1iZXIsIHk6bnVtYmVyLCByYWRpdXM6bnVtYmVyKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gICAgdGhpcy5yYWRpdXMgPSByYWRpdXM7XG4gICAgdGhpcy5jZW50ZXJYID0geCArIChncmlkU2l6ZSAvIDIpO1xuICAgIHRoaXMuY2VudGVyWSA9IHkgKyAoZ3JpZFNpemUgLyAyKTtcbiAgfVxuXG4gIHNldFgoeDpudW1iZXIpIHtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMuY2VudGVyWCA9IHggKyAoZ3JpZFNpemUgLyAyKTtcbiAgfVxuXG4gIHNldFkoeTpudW1iZXIpIHtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHRoaXMuY2VudGVyWSA9IHkgKyAoZ3JpZFNpemUgLyAyKTtcbiAgfVxuXG4gIGFzc2lnblBvc2l0aW9uKG5ld1Bvc2l0aW9uOiBudW1iZXIpIHtcbiAgICB0aGlzLnBvc2l0aW9uSW5Vbml0ID0gbmV3UG9zaXRpb247XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgV2FycmlvcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy93YXJyaW9yL1dhcnJpb3IudHMiLCJpbXBvcnQge2NyZWF0ZVdhcnJpb3J9IGZyb20gJy4uL3dhcnJpb3Ivd2FycmlvckFjdGlvbic7XG5pbXBvcnQge2dyaWRTaXplfSBmcm9tICcuLi9tYXAvbWFwQ29uZmlnJztcbmltcG9ydCB7dXBkYXRlV2Fycmlvcn0gZnJvbSAnLi4vd2Fycmlvci93YXJyaW9yTW92ZW1lbnQnO1xuaW1wb3J0IFVuaXQgZnJvbSAnLi9Vbml0JztcblxuaW1wb3J0IHtcbiAgdW5pdHMsXG4gIGN1cnJlbnRseUNob3NlblVuaXQsXG4gIGFzc2lnbkN1cnJlbnRseUNob3NlblVuaXRcbn0gZnJvbSAnLi4vc3RvcmUvdW5pdFN0b3JlJztcblxuaW1wb3J0IHtcbiAgYXNzaWduV2Fycmlvck1vdmVUb1Bvc2l0aW9uLFxufSBmcm9tICcuLi93YXJyaW9yL3dhcnJpb3JBY3Rpb24nO1xuXG5pbXBvcnQge1xuICBnZXROb2RlRnJvbU1hcFxufSBmcm9tICcuLi9wYXRoL2RyYXdQYXRoJztcblxuaW1wb3J0IHthU3Rhcn0gZnJvbSAnLi4vcGF0aC9BU3Rhcic7XG5cbmV4cG9ydCBjb25zdCBvbkNoYW5nZVdhcnJpb3JQb3NpdGlvbkluVW5pdCA9ICh1bml0OmFueSwgcGF0aDphbnlbXSwgaTpudW1iZXI9MCwgY3VycmVudE1vdmVUb1g6bnVtYmVyLCBjdXJyZW50TW92ZVRvWTpudW1iZXIpID0+IHtcbiAgbGV0IHJvdyA9IHVuaXQucXVhbnRpdHkgLyAyO1xuICBsZXQgY29sID0gTWF0aC5jZWlsKHVuaXQucXVhbnRpdHkgLyByb3cpO1xuICBmb3IobGV0IHdhcnJpb3Igb2YgdW5pdC53YXJyaW9ycykge1xuICAgIGxldCBzdGFydE5vZGUgPSBnZXROb2RlRnJvbU1hcChjdXJyZW50bHlDaG9zZW5Vbml0LmNvbW1hbmRlclBvc2l0aW9uWCwgY3VycmVudGx5Q2hvc2VuVW5pdC5jb21tYW5kZXJQb3NpdGlvblkpO1xuICAgIGxldCBmaW5pc2hOb2RlID0gZ2V0Tm9kZUZyb21NYXAoY3VycmVudE1vdmVUb1gsIGN1cnJlbnRNb3ZlVG9ZKTtcbiAgICBsZXQgcGF0aDphbnkgPSBhU3RhcihzdGFydE5vZGUsIGZpbmlzaE5vZGUpO1xuICAgIGFzc2lnbldhcnJpb3JNb3ZlVG9Qb3NpdGlvbih3YXJyaW9yLCBjdXJyZW50TW92ZVRvWCwgY3VycmVudE1vdmVUb1kpO1xuICAgIHVwZGF0ZVdhcnJpb3Iod2FycmlvciwgcGF0aCwgaSwgY3VycmVudE1vdmVUb1gsIGN1cnJlbnRNb3ZlVG9ZKTtcbiAgICBjdXJyZW50TW92ZVRvWCArPSBncmlkU2l6ZTtcbiAgICBjb25zb2xlLmxvZygnaScsIGkpO1xuICAgIGNvbnNvbGUubG9nKCdjdXJyZW50TW92ZVRvWCcsIGN1cnJlbnRNb3ZlVG9YKTtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgYWRkV2FycmlvcnNUb1VuaXQgPSAodW5pdDphbnkpID0+IHtcbiAgbGV0IHN0YXJ0WCA9IHVuaXQuY29tbWFuZGVyUG9zaXRpb25YO1xuICBsZXQgc3RhcnRZID0gdW5pdC5jb21tYW5kZXJQb3NpdGlvblk7XG4gIGxldCBpID0gMTtcbiAgbGV0IHJvdyA9IHVuaXQucXVhbnRpdHkgLyAyO1xuICBsZXQgY29sID0gTWF0aC5jZWlsKHVuaXQucXVhbnRpdHkgLyByb3cpO1xuICBsZXQgZmluaXNoWCA9IHN0YXJ0WCArICgocm93IC0gMSkgKiBncmlkU2l6ZSk7XG4gIGxldCBmaW5pc2hZID0gc3RhcnRZICsgKChjb2wgLSAxKSAqIGdyaWRTaXplKTtcbiAgbGV0IHJhZGl1cyA9IGdyaWRTaXplIC8gNDtcbiAgbGV0IHVuaXRSb3cgPSAxOyAvLyB0byBnaXZlIHdhcnJpb3Igcm93IGFuZCBjb2x1bW4gcG9zaXRpb24gaW4gdW5pdFxuICBsZXQgdW5pdENvbCA9IDE7XG4gIGZvcihsZXQgeSA9IHN0YXJ0WDsgeSA8PSBmaW5pc2hZOyB5ICs9IGdyaWRTaXplKSB7XG4gICAgaWYoaSA8PSB1bml0LnF1YW50aXR5KSB7XG4gICAgICBmb3IobGV0IHggPSBzdGFydFg7IHggPD0gZmluaXNoWDsgIHgrPSBncmlkU2l6ZSkge1xuICAgICAgICBsZXQgY3VycmVudFdhcnJpb3IgPSBjcmVhdGVXYXJyaW9yKHVuaXQubmFtZSwgeCwgeSwgcmFkaXVzKTtcbiAgICAgICAgY3VycmVudFdhcnJpb3IuYXNzaWduUG9zaXRpb24oaSk7XG4gICAgICAgIGN1cnJlbnRXYXJyaW9yLnJvd0luVW5pdCA9IHVuaXRSb3c7XG4gICAgICAgIGN1cnJlbnRXYXJyaW9yLmNvbEluVW5pdCA9IHVuaXRDb2w7XG4gICAgICAgIHVuaXQuYWRkV2FycmlvclRvVW5pdChjdXJyZW50V2Fycmlvcik7XG4gICAgICAgIGkrKztcbiAgICAgICAgdW5pdENvbCsrO1xuICAgICAgfVxuICAgIH1cbiAgICB1bml0Um93Kys7XG4gICAgdW5pdENvbCA9IDE7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVVuaXQgPSAobmFtZTpzdHJpbmcsIHF1YW50aXR5Om51bWJlciwgcG9zWDpudW1iZXIsIHBvc1k6IG51bWJlcikgPT4ge1xuICBsZXQgbmV3VW5pdCA9IG5ldyBVbml0KG5hbWUsIHF1YW50aXR5LCBwb3NYLCBwb3NZKTtcbiAgbGV0IHJhZGl1cyA9IGdyaWRTaXplIC8gNDtcbiAgYWRkV2FycmlvcnNUb1VuaXQobmV3VW5pdCk7XG4gIHVuaXRzLnB1c2gobmV3VW5pdCk7XG59XG5cbi8vIHdhcnJpb3JzIGluIHRoZSB1bml0IGhhdmUgc2FtZSBuYW1lIGFzIHVuaXQgdGhhdCB0aGV5IGFzc2lnbmVkIHRvXG4vLyBpZiB3YXJyaW9yIHdpdGggc2FtZSBuYW1lIGlzIGNob3NlbiB0aGF0IG1lYW5zIHRoYXQgdW5pdCBhbHNvXG4vLyBoYXMgYmVlbiBjaG9zZW5cbmV4cG9ydCBjb25zdCBvbkNob29zZVVuaXQgPSAodW5pdHM6YW55LCBjdXJyZW50bHlDaG9zZW5XYXJyaW9yOmFueSkgPT4ge1xuICBsZXQgZm91bmRlZFVuaXQgPSBudWxsO1xuICBpZihjdXJyZW50bHlDaG9zZW5XYXJyaW9yKSB7XG4gICAgZm9yKGxldCB1bml0IG9mIHVuaXRzKSB7XG4gICAgICBpZihjdXJyZW50bHlDaG9zZW5XYXJyaW9yLm5hbWUgPT09IHVuaXQubmFtZSkge1xuICAgICAgICBmb3VuZGVkVW5pdCA9IHVuaXQ7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGFzc2lnbkN1cnJlbnRseUNob3NlblVuaXQoZm91bmRlZFVuaXQpO1xuICBjb25zb2xlLmxvZygnY3VycmVudGx5Q2hvc2VuVW5pdCcsIGN1cnJlbnRseUNob3NlblVuaXQpO1xufVxuXG5sZXQgZ2V0VW5pdENvbW1hbmRlciA9ICh1bml0OmFueSkgPT4ge1xuICBmb3IobGV0IHdhcnJpb3Igb2YgdW5pdC53YXJyaW9ycykge1xuICAgIGlmKHdhcnJpb3IucG9zaXRpb25JblVuaXQgPT09IDEpIHtcbiAgICAgIHJldHVybiB3YXJyaW9yO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY29uc3QgdXBkYXRlVW5pdCA9ICh1bml0OmFueSwgcGF0aDphbnlbXSwgaTpudW1iZXI9MCwgY3VycmVudE1vdmVUb1g6bnVtYmVyLCBjdXJyZW50TW92ZVRvWTpudW1iZXIpID0+IHtcblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3VuaXQvdW5pdEFjdGlvbnMudHMiLCJpbXBvcnQge2RyYXdXYXJyaW9yfSBmcm9tICcuL3dhcnJpb3JBY3Rpb24nO1xuaW1wb3J0IHtcbiAgZ3JpZFNpemUsXG4gIGN0eCxcbiAgV0lEVEgsXG4gIEhFSUdIVFxufSBmcm9tICcuLi9tYXAvbWFwQ29uZmlnJztcbmltcG9ydCB7ZGVsZXRlT2JqZWN0RnJvbUFycmF5fSBmcm9tICcuLi91dGlscy9vYmpVdGlscyc7XG5cbmV4cG9ydCBsZXQgdXBkYXRlV2FycmlvciA9ICh3YXJyaW9yOmFueSwgcGF0aDphbnlbXSwgaTpudW1iZXI9MCwgY3VycmVudE1vdmVUb1g6bnVtYmVyLCBjdXJyZW50TW92ZVRvWTpudW1iZXIpID0+IHtcbiAgY29uc29sZS5sb2coJ3VwZGF0ZVdhcnJpb3InKTtcbiAgaWYoY3VycmVudE1vdmVUb1ggIT09IHdhcnJpb3IubW92ZVRvTm9kZVggfHwgY3VycmVudE1vdmVUb1kgIT09IHdhcnJpb3IubW92ZVRvTm9kZVkpIHtcbiAgICBjb25zb2xlLmxvZygnbmV3IGRlc3RpbmF0aW9uIGhhcyBiZWVuIGNob3NlbicpO1xuICAgIHJldHVybjtcbiAgfVxuICBsZXQgdXBkYXRlZFBhdGggPSBwYXRoO1xuICBsZXQgbm9kZSA9IHBhdGhbaV07IC8vIGdldCBuZXh0IG5vZGVcbiAgbGV0IG5vZGVUb0NsZWFyID0gbm9kZTs7XG4gIGlmKGkgIT09IDApIHtcbiAgICBub2RlVG9DbGVhciA9IHVwZGF0ZWRQYXRoW2kgLSAxXTtcbiAgfVxuICBjdHguY2xlYXJSZWN0KG5vZGVUb0NsZWFyLngsIG5vZGVUb0NsZWFyLnksIGdyaWRTaXplLCBncmlkU2l6ZSk7XG4gIHdhcnJpb3Iuc2V0WChub2RlLngpOyAvLyBjYWxjdWxhdGUgY2VudGVyIG9mIHRoZSBjdXJyZW50IG5vZGVcbiAgd2Fycmlvci5zZXRZKG5vZGUueSk7XG4gIC8vY29uc29sZS5sb2coJ3dhcnJpb3IueCcsIHdhcnJpb3IueCwgJ3dhcnJpb3IueScsIHdhcnJpb3IueSk7XG4gIGRyYXdXYXJyaW9yKHdhcnJpb3IpO1xuICBpKys7XG4gIGlmKGkgIT09IHVwZGF0ZWRQYXRoLmxlbmd0aCkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdXBkYXRlV2Fycmlvcih3YXJyaW9yLCB1cGRhdGVkUGF0aCwgaSwgY3VycmVudE1vdmVUb1gsIGN1cnJlbnRNb3ZlVG9ZKTtcbiAgICB9LCAzMDApO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvd2Fycmlvci93YXJyaW9yTW92ZW1lbnQudHMiLCJcblxuY2xhc3MgVW5pdCB7XG4gIG5hbWU6IHN0cmluZztcbiAgcXVhbnRpdHk6IG51bWJlcjtcbiAgY29tbWFuZGVyUG9zaXRpb25YOiBudW1iZXI7XG4gIGNvbW1hbmRlclBvc2l0aW9uWTogbnVtYmVyO1xuICB3YXJyaW9yczogYW55W10gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihuYW1lOnN0cmluZywgcXVhbnRpdHk6bnVtYmVyLCBwb3NYOm51bWJlciwgcG9zWTpudW1iZXIpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMucXVhbnRpdHkgPSBxdWFudGl0eTtcbiAgICB0aGlzLmNvbW1hbmRlclBvc2l0aW9uWCA9IHBvc1g7XG4gICAgdGhpcy5jb21tYW5kZXJQb3NpdGlvblkgPSBwb3NYO1xuICB9XG4gIGFkZFdhcnJpb3JUb1VuaXQod2FycmlvcjphbnkpIHtcbiAgICB0aGlzLndhcnJpb3JzLnB1c2god2Fycmlvcik7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVW5pdDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91bml0L1VuaXQudHMiLCJpbXBvcnQge25laWdoYm91cnN9IGZyb20gJy4uL21hcC9jcmVhdGVNYXAnO1xuaW1wb3J0IHtcbiAgZGVsZXRlT2JqZWN0RnJvbUFycmF5LFxuICBpc09iamVjdEluQXJyYXlcbn0gZnJvbSAnLi4vdXRpbHMvb2JqVXRpbHMnO1xuXG5pbXBvcnQge1xuICBnZXRNaW5GU2NvcmUsXG4gIHVuY2xvc2VkTmVpZ2JvdXJzLFxuICBpc09iamVjdEluTWFwS2V5c1xufSBmcm9tICcuL2FTdGFyVXRpbHMnO1xuXG5leHBvcnQgY29uc3QgYVN0YXIgPSAoc3RhcnROb2RlOmFueSwgZmluaXNoTm9kZTphbnkpID0+IHtcbiAgLy8gdGhlIHNldCBvZiBjdXJyZW50bHkgZGlzY292ZXJlZCBub2RlcyB0aGF0IGFyZSBub3QgZXZhbHVhdGVkIHlldFxuICAvLyBJbml0aWFsbHkgb25seSB0aGUgc3RhcnQgbm9kZSBpcyBrbm93blxuICBsZXQgb3BlbjphbnlbXSA9IFtdO1xuXG4gIC8vIHRoZSBzZXQgb2Ygbm9kZXMgdGhhdCBhbHJlYWR5IGV2YWx1YXRlZFxuICBsZXQgY2xvc2VkOmFueVtdID0gW107XG4gIHN0YXJ0Tm9kZS5nU2NvcmUgPSAwO1xuICBzdGFydE5vZGUuZlNjb3JlID0gc3RhcnROb2RlLmdTY29yZSArIGgoc3RhcnROb2RlLCBmaW5pc2hOb2RlKVxuICBvcGVuLnB1c2goc3RhcnROb2RlKTtcblxuICAvLyBmb3IgZWFjaCBub2RlLCB3aGljaCBub2RlIGlzIGNhbiBtb3N0IGVmZmljaWVudGx5IGJlIHJlYWNoZWQgZnJvbVxuICAvLyBpZiBhIG5vZGUgY2FuIGJlIHJlYWNoZWQgZnJvbSBtYW55IG5vZGVzLCBjYW1lRnJvbSB3aWxsIGV2ZW50aWFsbHlcbiAgLy8gY29udGFpbiB0aGUgbW9zdCBlZmZpY2llbnQgcHJldmlvdXMgc3RlcFxuICBsZXQgZnJvbSA9IG5ldyBNYXAoKTtcblxuICAvLyBGb3IgZWFjaCBub2RlLCB0aGUgY29zdCBvZiBnZXR0aW5nIGZyb20gdGhlIHN0YXJ0IG5vZGUgdG8gdGhhdCBub2RlLlxuICAvLyBsZXQgZ1Njb3JlID0gbmV3IE1hcCgpO1xuICAvLyBsZXQgZlNjb3JlID0gbmV3IE1hcCgpO1xuICAvL1xuICAvLyBnU2NvcmUuc2V0KHN0YXJ0Tm9kZSwgMCk7XG4gIC8vIGZTY29yZS5zZXQoc3RhcnROb2RlLCBnU2NvcmUuZ2V0KHN0YXJ0Tm9kZSkgKyBoKHN0YXJ0Tm9kZSwgZmluaXNoTm9kZSkpO1xuICB3aGlsZShvcGVuKSB7XG4gICAgbGV0IGN1cnJlbnQ6YW55ID0gZ2V0TWluRlNjb3JlKG9wZW4pO1xuICAgIC8vY29uc29sZS5sb2coJ2N1cnJlbnQnLCBjdXJyZW50KTtcbiAgICBpZihjdXJyZW50LnggPT09IGZpbmlzaE5vZGUueCAmJiBjdXJyZW50LnkgPT09IGZpbmlzaE5vZGUueSkge1xuICAgICAgLy9jb25zb2xlLmVycm9yKCdQYXRoJywgcmVjb25zdHJ1Y3RQYXRoKGZyb20sIGN1cnJlbnQpKTtcbiAgICAgIHJldHVybiByZWNvbnN0cnVjdFBhdGgoZnJvbSwgY3VycmVudCk7XG4gICAgfVxuICAgIG9wZW4gPSBkZWxldGVPYmplY3RGcm9tQXJyYXkoY3VycmVudCwgb3Blbik7XG4gICAgY2xvc2VkLnB1c2goY3VycmVudCk7XG4gICAgZm9yKGxldCBuZWlnaGJvdXIgb2YgdW5jbG9zZWROZWlnYm91cnMoY3VycmVudCwgY2xvc2VkKSkge1xuICAgICAgbGV0IHRlbXBHID0gY3VycmVudC5nU2NvcmUgKyBuZWlnaGJvdXIuZGlzdGFuY2U7XG4gICAgICBpZighaXNPYmplY3RJbkFycmF5KG5laWdoYm91ciwgb3BlbikgfHwgdGVtcEcgPCBuZWlnaGJvdXIuZ1Njb3JlKSB7XG4gICAgICAgIGZyb20uc2V0KG5laWdoYm91ciwgY3VycmVudCk7XG4gICAgICAgIG5laWdoYm91ci5nU2NvcmUgPSB0ZW1wRztcbiAgICAgICAgbmVpZ2hib3VyLmZTY29yZSA9IG5laWdoYm91ci5nU2NvcmUgKyBoKG5laWdoYm91ciwgZmluaXNoTm9kZSk7XG4gICAgICB9XG4gICAgICBpZighaXNPYmplY3RJbkFycmF5KG5laWdoYm91ciwgb3BlbikpIHsgLy8gY3JlYXRlIGZ1bmN0aW9uXG4gICAgICAgIGxldCBub2RlTmVpZ2hib3VycyA9IG5laWdoYm91cnMobmVpZ2hib3VyKTtcbiAgICAgICAgbmVpZ2hib3VyLm5laWdoYm91cnMgPSBub2RlTmVpZ2hib3VycztcbiAgICAgICAgb3Blbi5wdXNoKG5laWdoYm91cik7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGNvbnNvbGUubG9nKCdmYWlsdXJlJyk7XG4gIHJldHVybiAwOyAvLyBmYWlsdXJlXG59XG5cbmV4cG9ydCBjb25zdCBoID0gKHN0YXJ0Tm9kZTphbnksIGZpbmlzaE5vZGU6YW55KSA9PiB7XG4vL2Z1bmN0aW9uIGhldXJpc3RpYyhub2RlKSA9XG4gIC8vIGR4ID0gYWJzKG5vZGUueCAtIGdvYWwueClcbiAgLy8gZHkgPSBhYnMobm9kZS55IC0gZ29hbC55KVxuICAvLyByZXR1cm4gRCAqIChkeCArIGR5KSArIChEMiAtIDIgKiBEKSAqIG1pbihkeCwgZHkpXG4gIGxldCBEID0gMTA7IC8vIGNvc3Qgb2YgbW92aW5nIGhvcml6b250YWxseVxuICBsZXQgRDIgPSAxNDsgLy8gY29zdCBvZiBtb3ZpbmcgZGlhZ29uYWxseVxuICBsZXQgZHggPSBNYXRoLmFicyhzdGFydE5vZGUueCAtIGZpbmlzaE5vZGUueCk7XG4gIGxldCBkeSA9IE1hdGguYWJzKHN0YXJ0Tm9kZS55IC0gZmluaXNoTm9kZS55KTtcbiAgcmV0dXJuIEQgKiAoZHggKyBkeSkgKyAoRDIgLSAyICogRCkgKiBNYXRoLm1pbihkeCwgZHkpO1xufVxuXG5cblxuZXhwb3J0IGNvbnN0IHJlY29uc3RydWN0UGF0aCA9IChmcm9tOmFueSwgY3VycmVudDphbnkpID0+IHtcbiAgLy8gZnVuY3Rpb24gcmVjb25zdHJ1Y3RfcGF0aChjYW1lRnJvbSwgY3VycmVudClcbiAgLy8gICB0b3RhbF9wYXRoIDo9IFtjdXJyZW50XVxuICAvLyAgIHdoaWxlIGN1cnJlbnQgaW4gY2FtZUZyb20uS2V5czpcbiAgLy8gICAgICAgY3VycmVudCA6PSBjYW1lRnJvbVtjdXJyZW50XVxuICAvLyAgICAgICB0b3RhbF9wYXRoLmFwcGVuZChjdXJyZW50KVxuICAvLyAgIHJldHVybiB0b3RhbF9wYXRoXG4gIGxldCByZXZlcnNlUGF0aDphbnlbXSA9IFtjdXJyZW50XTtcbiAgbGV0IHRvdGFsUGF0aDphbnlbXSA9IFtdO1xuICB3aGlsZShpc09iamVjdEluTWFwS2V5cyhjdXJyZW50LCBmcm9tKSkge1xuICAgIGN1cnJlbnQgPSBmcm9tLmdldChjdXJyZW50KTtcbiAgICByZXZlcnNlUGF0aC5wdXNoKGN1cnJlbnQpO1xuICB9XG4gIGZvcihsZXQgaSA9IHJldmVyc2VQYXRoLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgdG90YWxQYXRoLnB1c2gocmV2ZXJzZVBhdGhbaV0pO1xuICB9XG4gIHJldHVybiB0b3RhbFBhdGg7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcGF0aC9BU3Rhci50cyIsImV4cG9ydCBjb25zdCBnZXRNaW5GU2NvcmUgPSAob3BlbjphbnlbXSkgPT4ge1xuICBsZXQgbWluID0gMDtcbiAgZm9yKGxldCBpID0gMTsgaSA8IG9wZW4ubGVuZ3RoIC0gMTsgKytpKSB7XG4gICAgaWYob3BlblttaW5dLmZTY29yZSA+IG9wZW5baV0uZlNjb3JlKSB7XG4gICAgICBtaW4gPSBpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gb3BlblttaW5dO1xufVxuXG5leHBvcnQgY29uc3QgdW5jbG9zZWROZWlnYm91cnMgPSAoY3VycmVudDphbnksIGNsb3NlZDphbnkpID0+IHtcbiAgbGV0IG5laWdoYm91cnNOb3RJbkNsb3NlZCA9IFtdO1xuICBmb3IobGV0IG5laWdoYm91ciBvZiBjdXJyZW50Lm5laWdoYm91cnMpIHtcbiAgICBsZXQgaXNJbkNsb3NlZDpib29sZWFuID0gZmFsc2U7XG4gICAgZm9yKGxldCBub2RlIG9mIGNsb3NlZCkge1xuICAgICAgaWYobmVpZ2hib3VyLnggPT09IG5vZGUueCAmJiBuZWlnaGJvdXIueSA9PT0gbm9kZS55KSB7XG4gICAgICAgIGlzSW5DbG9zZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICBpZighaXNJbkNsb3NlZCkge1xuICAgICAgbmVpZ2hib3Vyc05vdEluQ2xvc2VkLnB1c2gobmVpZ2hib3VyKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG5laWdoYm91cnNOb3RJbkNsb3NlZDtcbn1cblxuZXhwb3J0IGNvbnN0IGlzT2JqZWN0SW5NYXBLZXlzID0gKG9iamVjdDphbnksIG1hcDphbnkpID0+IHtcbiAgbGV0IGFycjphbnlbXSA9IEFycmF5LmZyb20obWFwKTtcbiAgbGV0IHJlc3VsdDpib29sZWFuID0gZmFsc2U7XG4gIGZvcihsZXQgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyArK2kpIHtcbiAgICAvL2NvbnNvbGUubG9nKCdvYmplY3QnLCBvYmplY3QpO1xuICAgIGlmKGFycltpXVswXS54ID09PSBvYmplY3QueCAmJiBhcnJbaV1bMF0ueSA9PT0gb2JqZWN0LnkpIHtcbiAgICAgIHJlc3VsdCA9IHRydWU7XG4gICAgfVxuICB9XG4gIGNvbnNvbGUubG9nKCdyZXN1bHQnLCByZXN1bHQpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3BhdGgvYVN0YXJVdGlscy50cyIsImV4cG9ydCBjb25zdCBnZXRDbG9zZXN0V2FycmlvclRvRGVzdGluYXRpb24gPSAodW5pdDphbnksIGRlc3RYOm51bWJlciwgZGVzdFk6bnVtYmVyKSA9PiB7XG4gIGxldCBjbG9zZXN0ID0gMDtcbiAgbGV0IGRpZmZlcmVuY2U6bnVtYmVyO1xuICBsZXQgd2FycmlvcnMgPSB1bml0LndhcnJpb3JzO1xuICBmb3IobGV0IGkgPSAxOyBpIDw9IHdhcnJpb3JzLmxlbmd0aCAtIDE7ICsraSkge1xuICAgIGxldCBjdXJyZW50VW5pdERpZmZlcmVuY2UgPSBNYXRoLnNxcnQoTWF0aC5wb3coTWF0aC5hYnMod2FycmlvcnNbaV0ueCAtIGRlc3RYKSwgMikgKyBNYXRoLnBvdyhNYXRoLmFicyh3YXJyaW9yc1tpXS55IC0gZGVzdFkpLCAyKSk7XG4gICAgbGV0IHByZXZpb3VzVW5pdERpZmZlcmVuY2UgPSBNYXRoLnNxcnQoTWF0aC5wb3coTWF0aC5hYnMod2FycmlvcnNbY2xvc2VzdF0ueCAtIGRlc3RYKSwgMikgKyBNYXRoLnBvdyhNYXRoLmFicyh3YXJyaW9yc1tjbG9zZXN0XS55IC0gZGVzdFkpLCAyKSk7XG5cbiAgICBpZihjdXJyZW50VW5pdERpZmZlcmVuY2UgPCBwcmV2aW91c1VuaXREaWZmZXJlbmNlKSB7XG4gICAgICBjbG9zZXN0ID0gaTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHdhcnJpb3JzW2Nsb3Nlc3RdO1xufVxuXG4gLy8gZ2V0IHVuaXQncyBwb3NpdGlvbiBhbmQgZGVzdGluYXRpb24gcG9zaXRpb24gYW5kIHJldHVybiBhbmdsZSBpbiByYWRpYW5zIGJldHdlZW4gdW5pdCBhbmQgZGVzdGluYXRpb25cbmV4cG9ydCBjb25zdCBjYWxjRGVzdGluYXRpb25BbmdsZUluRGVncmVlcyA9ICh1bml0OmFueSwgZGVzdFg6bnVtYmVyLCBkZXN0WTpudW1iZXIpOm51bWJlciA9PiB7XG4gIC8vY29uc29sZS5lcnJvcignY2FsY0Rlc3RpbmF0aW9uQW5nbGVJbkRlZ3JlZXMnKTtcbiAgbGV0IHdhcnJpb3IgPSBnZXRDbG9zZXN0V2FycmlvclRvRGVzdGluYXRpb24odW5pdCwgZGVzdFgsIGRlc3RZKTtcbiAgbGV0IGFuZ2xlO1xuICBsZXQgYSA9IE1hdGguYWJzKGRlc3RZIC0gd2Fycmlvci55KTtcbiAgbGV0IGIgPSBNYXRoLmFicyhkZXN0WCAtIHdhcnJpb3IueCk7XG4gIGxldCBhbmdsZUluUmFkaWFuID0gTWF0aC5hdGFuKGEgLyBiKTtcbiAgLy8gY2hlY2sgcXVhdGVyIG9mIHRoZSBjaXJjbGVcbiAgbGV0IGRlZ3JlZSA9ICBhbmdsZUluUmFkaWFuICogKDE4MCAvIE1hdGguUEkpOyAvLyBjb252ZXJ0IHJhZGlhbnMgaW50byBkZWdyZWVcbiAgbGV0IHF1YXRlciA9IGdldFF1YXRlcih3YXJyaW9yLngsIHdhcnJpb3IueSwgZGVzdFgsIGRlc3RZKTsgLy8gY2hlY2sgcXVhdGVyXG4gIGlmKHF1YXRlciA9PT0gMSkgYW5nbGUgPSBkZWdyZWU7XG4gIGlmKHF1YXRlciA9PT0gMikgYW5nbGUgPSA5MCArICg5MCAtIGRlZ3JlZSk7XG4gIGVsc2UgaWYocXVhdGVyID09PSAzKSBhbmdsZSA9IDE4MCArIGRlZ3JlZTtcbiAgZWxzZSBpZihxdWF0ZXIgPT09IDQpIGFuZ2xlID0gMjcwICsgKDkwIC0gZGVncmVlKTtcbiAgcmV0dXJuIE1hdGgucm91bmQoYW5nbGUpO1xufVxuXG5leHBvcnQgY29uc3QgZ2V0UXVhdGVyID0gKHVuaXRYOm51bWJlciwgdW5pdFk6bnVtYmVyLCBkZXN0WDpudW1iZXIsIGRlc3RZOm51bWJlcik6bnVtYmVyID0+IHtcbiAgLy9jb25zb2xlLmVycm9yKCdnZXRRdWF0ZXInKTtcbiAgbGV0IHF1YXRlcjtcbiAgaWYoZGVzdFggPj0gdW5pdFggJiYgZGVzdFkgPCB1bml0WSkge1xuICAgIHF1YXRlciA9IDE7XG4gIH1cbiAgZWxzZSBpZihkZXN0WCA8IHVuaXRYICYmIGRlc3RZIDw9IHVuaXRZKSB7XG4gICAgcXVhdGVyID0gMjtcbiAgfVxuICBlbHNlIGlmKGRlc3RYIDw9IHVuaXRYICYmIGRlc3RZID4gdW5pdFkpIHtcbiAgICBxdWF0ZXIgPSAzO1xuICB9XG4gIGVsc2UgaWYoZGVzdFggPiB1bml0WCAmJiBkZXN0WSA+PSB1bml0WSkge1xuICAgIHF1YXRlciA9IDQ7XG4gIH1cbiAgcmV0dXJuIHF1YXRlcjtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91bml0L3VuaXRVdGlscy50cyJdLCJzb3VyY2VSb290IjoiIn0=