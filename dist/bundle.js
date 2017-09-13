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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var mapConfig_1 = __webpack_require__(0);
var warriorStore_1 = __webpack_require__(3);
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var mapConfig_1 = __webpack_require__(0);
var drawGrid_1 = __webpack_require__(6);
var createMap_1 = __webpack_require__(1);
var AStar_1 = __webpack_require__(7);
var drawPath_1 = __webpack_require__(9);
var warriorStore_1 = __webpack_require__(3);
var warriorAction_1 = __webpack_require__(4);
var warriorMovement_1 = __webpack_require__(11);
var warrior = warriorAction_1.createWarrior('barbarian', 80, 160, 5);
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
/* 6 */
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var createMap_1 = __webpack_require__(1);
var objUtils_1 = __webpack_require__(2);
var aStarUtils_1 = __webpack_require__(8);
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
/* 8 */
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
/* 9 */
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
    return Warrior;
}());
exports.default = Warrior;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var warriorAction_1 = __webpack_require__(4);
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


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZjVlYWYyMTdhNDdhMjhhZGE1ZTUiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hcC9tYXBDb25maWcudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hcC9jcmVhdGVNYXAudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL29ialV0aWxzLnRzIiwid2VicGFjazovLy8uL3NyYy9zdG9yZS93YXJyaW9yU3RvcmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dhcnJpb3Ivd2FycmlvckFjdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2FtZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFwL2RyYXdHcmlkLnRzIiwid2VicGFjazovLy8uL3NyYy9wYXRoL0FTdGFyLnRzIiwid2VicGFjazovLy8uL3NyYy9wYXRoL2FTdGFyVXRpbHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhdGgvZHJhd1BhdGgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dhcnJpb3IvV2Fycmlvci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd2Fycmlvci93YXJyaW9yTW92ZW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7O0FDN0RBLG1CQUFtQjtBQUNOLGFBQUssR0FBVyxJQUFJ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LENBQUM7SUFDNUYsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDO0lBQ3ZCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGdCQUFnQjtJQUNwQyxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUM7SUFBQSxDQUFDO0lBQ3hCLEVBQUUsRUFBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNYLFdBQVcsR0FBRyxXQUFXLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFDRCxlQUFHLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUMsRUFBRSxvQkFBUSxFQUFFLG9CQUFRLENBQUMsQ0FBQztJQUNoRSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLHVDQUF1QztJQUM3RCxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNyQiw4REFBOEQ7SUFDOUQsMkJBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNyQixDQUFDLEVBQUUsQ0FBQztJQUNKLEVBQUUsRUFBQyxDQUFDLEtBQUssV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDNUIsVUFBVSxDQUFDO1lBQ1QscUJBQWEsQ0FBQyxPQUFPLEVBQUUsV0FBVyxFQUFFLENBQUMsRUFBRSxjQUFjLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDekUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ1YsQ0FBQztBQUNILENBQUMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZjVlYWYyMTdhNDdhMjhhZGE1ZTUiLCIvLyBnbG9iYWwgdmFyaWFibGVzXG5leHBvcnQgY29uc3QgV0lEVEg6IG51bWJlciA9IDEyMDA7XG5leHBvcnQgY29uc3QgSEVJR0hUOiBudW1iZXIgPSA2MDA7XG5leHBvcnQgY29uc3QgZ3JpZFNpemU6bnVtYmVyID0gMjA7XG5cbi8vIGNyZWF0ZSBDYW52YXNcbmV4cG9ydCBsZXQgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG5jYW52YXMuaWQgPSBcImNhbnZhc1wiO1xuY2FudmFzLndpZHRoID0gV0lEVEg7XG5jYW52YXMuaGVpZ2h0ID0gSEVJR0hUO1xuY2FudmFzLnN0eWxlLmJvcmRlciA9IFwiMXB4IHNvbGlkXCI7XG5cbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY2FudmFzKTtcblxuLy8gZGVmaW5lIDJkIGNvbnRleHRcbmV4cG9ydCBsZXQgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tYXAvbWFwQ29uZmlnLnRzIiwiaW1wb3J0IHtcbiAgY2FudmFzLFxuICBjdHgsXG4gIFdJRFRILFxuICBIRUlHSFQsXG4gIGdyaWRTaXplXG59IGZyb20gJy4uL21hcC9tYXBDb25maWcnO1xuXG5pbXBvcnQge1xuICBkZWxldGVPYmplY3RGcm9tQXJyYXksXG59IGZyb20gJy4uL3V0aWxzL29ialV0aWxzJztcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZU5vZGVzID0gKCkgPT4ge1xuICBsZXQgbWFwOmFueVtdID0gW107XG4gIGxldCB2YWx1ZSA9IDE7XG4gIGxldCBpZCA9IDA7XG4gIGZvcihsZXQgeSA9IDA7IHkgPD0gSEVJR0hUOyB5Kz0gZ3JpZFNpemUpIHtcbiAgICBmb3IobGV0IHggPSAwOyB4IDw9IFdJRFRIOyB4Kz0gZ3JpZFNpemUpIHtcbiAgICAgIG1hcC5wdXNoKHtcbiAgICAgICAgaWQ6IGlkLFxuICAgICAgICB4OiB4LFxuICAgICAgICB5OiB5LFxuICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgIG5laWdoYm91cnM6IFtdXG4gICAgICB9KTtcbiAgICAgIGlkKys7XG4gICAgfVxuICB9XG4gIHJldHVybiBtYXA7XG59XG5cbmV4cG9ydCBjb25zdCBuZWlnaGJvdXJzID0gKG5vZGU6YW55KSA9PiB7XG4gIGxldCBkaXJzID0gW1xuICAgIHt4OiAtZ3JpZFNpemUsIHk6IC1ncmlkU2l6ZSwgZGlzdGFuY2U6IDE0fSxcbiAgICB7eDogMCwgeTogLWdyaWRTaXplLCBkaXN0YW5jZTogMTB9LFxuICAgIHt4OiBncmlkU2l6ZSwgeTogLWdyaWRTaXplLCBkaXN0YW5jZTogMTR9LFxuICAgIHt4OiAtZ3JpZFNpemUsIHk6IDAsIGRpc3RhbmNlOiAxMH0sXG4gICAge3g6IGdyaWRTaXplLCB5OiAwLCBkaXN0YW5jZTogMTB9LFxuICAgIHt4OiAtZ3JpZFNpemUsIHk6IGdyaWRTaXplLCBkaXN0YW5jZTogMTR9LFxuICAgIHt4OiAwLCB5OiBncmlkU2l6ZSwgZGlzdGFuY2U6IDEwfSxcbiAgICB7eDogZ3JpZFNpemUsIHk6IGdyaWRTaXplLCBkaXN0YW5jZTogMTR9XG4gIF07XG4gIGxldCByZXN1bHQgPSBbXTtcbiAgZm9yKGxldCBkaXIgb2YgZGlycykge1xuICAgIGxldCBuZWlnaGJvdXIgPSB7XG4gICAgICB4OiBub2RlLnggKyBkaXIueCxcbiAgICAgIHk6IG5vZGUueSArIGRpci55LFxuICAgICAgZGlzdGFuY2U6IGRpci5kaXN0YW5jZVxuICAgIH1cbiAgICBpZihuZWlnaGJvdXIueCA+PSAwICYmIG5laWdoYm91ci54IDwgV0lEVEggJiYgbmVpZ2hib3VyLnkgPj0gMCAmJiBuZWlnaGJvdXIueSA8IEhFSUdIVCkge1xuICAgICAgICBsZXQgZmluZGVkOmJvb2xlYW4gPSBmYWxzZTtcbiAgICAgICAgZm9yKGxldCBub2RlIG9mIG1hcCkge1xuICAgICAgICAgIGlmKG5laWdoYm91ci54ID09PSBub2RlLnggJiYgbmVpZ2hib3VyLnkgPT09IG5vZGUueSkge1xuICAgICAgICAgICAgZmluZGVkID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYoZmluZGVkKSB7XG4gICAgICAgICAgcmVzdWx0LnB1c2goe1xuICAgICAgICAgICAgeDogbmVpZ2hib3VyLngsXG4gICAgICAgICAgICB5OiBuZWlnaGJvdXIueSxcbiAgICAgICAgICAgIGRpc3RhbmNlOiBuZWlnaGJvdXIuZGlzdGFuY2UsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGNvbnN0IGFkZE5laWdoYm91cnMgPSAobWFwOmFueVtdKSA9PiB7XG4gIGZvcihsZXQgbm9kZSBvZiBtYXApIHtcbiAgICBsZXQgbiA9IG5laWdoYm91cnMobm9kZSk7XG4gICAgbm9kZS5uZWlnaGJvdXJzID0gbjtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgY3JlYXRlT25lT2JzdGFjbGUgPSAocG9zaXRpb25YOm51bWJlciwgcG9zaXRpb25ZOm51bWJlciwgdHlwZTpzdHJpbmc9J2ZvcmVzdCcpID0+IHtcbiAgbGV0IG5vZGUgPSB7XG4gICAgeDogcG9zaXRpb25YLFxuICAgIHk6IHBvc2l0aW9uWVxuICB9O1xuICBpZih0eXBlID09PSAnZm9yZXN0JykgY3R4LmZpbGxTdHlsZSA9ICdncmVlbic7XG4gIGVsc2UgaWYodHlwZSA9PT0gJ21vdW50YWluJykgY3R4LmZpbGxTdHlsZSA9ICcjOEI0NTEzJztcbiAgZWxzZSBpZih0eXBlID09PSAncml2ZXInKSBjdHguZmlsbFN0eWxlID0gJ2JsdWUnO1xuICBjdHguZmlsbFJlY3QocG9zaXRpb25YLCBwb3NpdGlvblksIGdyaWRTaXplLCBncmlkU2l6ZSk7XG4gIHJldHVybiBkZWxldGVPYmplY3RGcm9tQXJyYXkobm9kZSwgbWFwKVxufVxuXG5leHBvcnQgY29uc3QgY3JlYXRlT2JzdGFjbGVzID0gKHN0YXJ0WDpudW1iZXIsIGZpbmlzaFg6bnVtYmVyLCBzdGFydFk6bnVtYmVyLCBmaW5pc2hZOm51bWJlciwgdHlwZTpzdHJpbmc9J2ZvcmVzdCcpID0+IHtcbiAgbGV0IG5ld01hcDphbnlbXSA9IG1hcDtcbiAgZm9yKGxldCB4ID0gc3RhcnRYOyB4IDw9IGZpbmlzaFg7IHggKz0gZ3JpZFNpemUpIHtcbiAgICBmb3IobGV0IHkgPSBzdGFydFk7IHkgPD0gZmluaXNoWTsgeSArPSBncmlkU2l6ZSkge1xuICAgICAgbGV0IG5vZGUgPSB7XG4gICAgICAgIHgsXG4gICAgICAgIHlcbiAgICAgIH1cbiAgICAgIG5ld01hcCA9IGRlbGV0ZU9iamVjdEZyb21BcnJheShub2RlLCBuZXdNYXApO1xuICAgICAgaWYodHlwZSA9PT0gJ2ZvcmVzdCcpIGN0eC5maWxsU3R5bGUgPSAnZ3JlZW4nO1xuICAgICAgZWxzZSBpZih0eXBlID09PSAnbW91bnRhaW4nKSBjdHguZmlsbFN0eWxlID0gJyM4QjQ1MTMnO1xuICAgICAgZWxzZSBpZih0eXBlID09PSAncml2ZXInKSBjdHguZmlsbFN0eWxlID0gJ2JsdWUnO1xuICAgICAgbGV0IHhMZW5ndGggPSBNYXRoLmFicyhzdGFydFggLSBmaW5pc2hYKTtcbiAgICAgIGxldCB5TGVuZ3RoID0gTWF0aC5hYnMoc3RhcnRZIC0gZmluaXNoWSk7XG4gICAgICBjdHguZmlsbFJlY3QoeCwgeSwgZ3JpZFNpemUsIGdyaWRTaXplKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG5ld01hcDtcbn1cblxuZXhwb3J0IGxldCBtYXAgPSBjcmVhdGVOb2RlcygpO1xubWFwID0gY3JlYXRlT2JzdGFjbGVzKDEyMCwgMTYwLCAxMjAsIDE2MCwgJ3JpdmVyJyk7XG5tYXAgPSBjcmVhdGVPYnN0YWNsZXMoNjYwLCA4MjAsIDE4MCwgMjAwLCAncml2ZXInKTtcbm1hcCA9IGNyZWF0ZU9ic3RhY2xlcyg5MDAsIDExODAsIDE4MCwgMjAwLCAncml2ZXInKTtcbm1hcCA9IGNyZWF0ZU9uZU9ic3RhY2xlKDMwMCwgMzQwLCAnbW91bnRhaW4nKTtcbm1hcCA9IGNyZWF0ZU9ic3RhY2xlcygyODAsIDMyMCwgMzYwLCAzODAsICdtb3VudGFpbicpO1xubWFwID0gY3JlYXRlT2JzdGFjbGVzKDc0MCwgNzYwLCA0MjAsIDUwMCwgJ2ZvcmVzdCcpO1xubWFwID0gY3JlYXRlT2JzdGFjbGVzKDk2MCwgMTAwMCwgNDQwLCA0NjAsICdmb3Jlc3QnKTtcbm1hcCA9IGNyZWF0ZU9ic3RhY2xlcyg5ODAsIDEwMDAsIDQ0MCwgNTIwLCAnZm9yZXN0Jyk7XG5hZGROZWlnaGJvdXJzKG1hcCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFwL2NyZWF0ZU1hcC50cyIsImV4cG9ydCBjb25zdCBkZWxldGVPYmplY3RGcm9tQXJyYXkgPSAob2JqZWN0OmFueSwgYXJyOmFueVtdKSA9PiB7XG4gIGxldCB1cGRhdGVkQXJyID0gYXJyLmZpbHRlcigoZWwpID0+IHtcbiAgICBpZihlbC54ID09PSBvYmplY3QueCAmJiBlbC55ID09PSBvYmplY3QueSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSk7XG4gIHJldHVybiB1cGRhdGVkQXJyO1xufVxuXG5leHBvcnQgY29uc3QgaXNPYmplY3RJbkFycmF5ID0gKG9iamVjdDphbnksIGFycjphbnlbXSkgPT4ge1xuICBsZXQgcmVzdWx0OmJvb2xlYW4gPSBmYWxzZTtcbiAgZm9yKGxldCBub2RlIG9mIGFycikge1xuICAgIGlmKG9iamVjdC54ID09PSBub2RlLnggJiYgb2JqZWN0LnkgPT09IG5vZGUueSkge1xuICAgICAgcmVzdWx0ID0gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGNvbnN0IGdldE5vZGVGcm9tQXJyYXkgPSAob2JqZWN0OmFueSwgYXJyOmFueVtdKSA9PiB7XG4gIGZvcihsZXQgbm9kZSBvZiBhcnIpIHtcbiAgICBpZihub2RlLnggPT09IG9iamVjdC54ICYmIG5vZGUueSAmJiBvYmplY3QueSkge1xuICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdXRpbHMvb2JqVXRpbHMudHMiLCJleHBvcnQgY29uc3Qgd2FycmlvcnM6YW55W10gPSBbXTtcbmV4cG9ydCBsZXQgY3VycmVudGx5Q2hvc2VuV2FycmlvcjphbnkgPSBudWxsO1xuXG5leHBvcnQgY29uc3QgYXNzaWduQ3VycmVudGx5Q2hvc2VuV2FycmlvciA9ICh3YXJyaW9yOmFueSkgPT4ge1xuICAvLyBjaGVjayB1bml0XG4gIGlmKHdhcnJpb3IpIHtcbiAgICAgIGN1cnJlbnRseUNob3NlbldhcnJpb3IgPSB3YXJyaW9yO1xuICB9IGVsc2Uge1xuICAgIGN1cnJlbnRseUNob3NlbldhcnJpb3IgPSBudWxsO1xuICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zdG9yZS93YXJyaW9yU3RvcmUudHMiLCJpbXBvcnQge2dyaWRTaXplfSBmcm9tICcuLi9tYXAvbWFwQ29uZmlnJztcbmltcG9ydCB7XG4gIHdhcnJpb3JzLFxuICBjdXJyZW50bHlDaG9zZW5XYXJyaW9yLFxuICBhc3NpZ25DdXJyZW50bHlDaG9zZW5XYXJyaW9yXG59IGZyb20gJy4uL3N0b3JlL3dhcnJpb3JTdG9yZSc7XG5pbXBvcnQge2N0eH0gZnJvbSAnLi4vbWFwL21hcENvbmZpZyc7XG5pbXBvcnQgV2FycmlvciBmcm9tICcuL1dhcnJpb3InO1xuXG5leHBvcnQgY29uc3Qgb25DaG9vc2VXYXJyaW9yID0gKHdhcnJpb3JzOmFueVtdLCBtb3VzZVg6bnVtYmVyLCBtb3VzZVk6bnVtYmVyKSA9PiB7XG4gIGxldCBmb3VuZGVkV2FycmlvciA9IG51bGw7XG4gIGZvcihsZXQgd2FycmlvciBvZiB3YXJyaW9ycykge1xuICAgIGxldCBib3R0b21SaWdodFggPSB3YXJyaW9yLnggKyBncmlkU2l6ZTtcbiAgICBsZXQgYm90dG9tUmlnaHRZID0gd2Fycmlvci55ICsgZ3JpZFNpemU7XG4gICAgaWYobW91c2VYID49IHdhcnJpb3IueCAmJiBtb3VzZVggPCBib3R0b21SaWdodFggJiYgbW91c2VZID49IHdhcnJpb3IueSAmJiBtb3VzZVkgPCBib3R0b21SaWdodFkpIHtcbiAgICAgIGNvbnNvbGUubG9nKCd3YXJyaW9yJywgd2Fycmlvci5uYW1lLCAnIHdhcyBjaG9zZW4nKTtcbiAgICAgIHdhcnJpb3IuaXNDdXJyZW50bHlDaG9zZW4gPSB0cnVlO1xuICAgICAgZm91bmRlZFdhcnJpb3IgPSB3YXJyaW9yO1xuICAgIH1cbiAgfVxuICBhc3NpZ25DdXJyZW50bHlDaG9zZW5XYXJyaW9yKGZvdW5kZWRXYXJyaW9yKTtcbiAgY29uc29sZS5sb2coJ2N1cnJlbnRseUNob3NlbldhcnJpb3InLCBjdXJyZW50bHlDaG9zZW5XYXJyaW9yKTtcbn1cblxuZXhwb3J0IGNvbnN0IGRyYXdXYXJyaW9yID0gKHdhcnJpb3I6YW55KSA9PiB7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5hcmMod2Fycmlvci5jZW50ZXJYLCB3YXJyaW9yLmNlbnRlclksIHdhcnJpb3IucmFkaXVzLCAwLCBNYXRoLlBJKjIpO1xuICAgIGN0eC5maWxsU3R5bGUgPSAnI2Q5MjUxMCc7XG4gICAgY3R4LmZpbGwoKTtcbiAgICBjdHguY2xvc2VQYXRoKCk7XG59XG5cbmV4cG9ydCBjb25zdCBhc3NpZ25XYXJyaW9yTW92ZVRvUG9zaXRpb24gPSAod2FycmlvcjphbnksIHg6bnVtYmVyLCB5Om51bWJlcikgPT4ge1xuICAvL2NvbnNvbGUuZXJyb3IoJ2Fzc2lnbk1vdmVUb1Bvc2l0aW9uJyk7XG4gIGlmKHdhcnJpb3IpIHtcbiAgICB3YXJyaW9yLm1vdmVUb05vZGVYID0geDtcbiAgICB3YXJyaW9yLm1vdmVUb05vZGVZID0geTtcbiAgICBjb25zb2xlLmxvZyh3YXJyaW9yLm5hbWUgKyAnIGlzIG1vdmluZyB0byBub2RlOicgKyB3YXJyaW9yLm1vdmVUb05vZGVYICsgJyB5OicgKyB3YXJyaW9yLm1vdmVUb05vZGVZKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLmxvZygnd2FycmlvciBub3QgY2hvc2VuJyk7XG4gIH1cbn1cblxuLy8gY3JlYXRlIFVuaXQgYW5kIGltbWVkaWF0bHkgcHVzaCBpdCBpbnRvIHVuaXRzIGFycmF5XG5leHBvcnQgbGV0IGNyZWF0ZVdhcnJpb3IgPSAobmFtZTpzdHJpbmcsIHg6bnVtYmVyLCB5Om51bWJlciwgcmFkaXVzOm51bWJlcikgPT4ge1xuICAvL2NvbnNvbGUuZXJyb3IoJ2NyZWF0ZVVuaXQnKTtcbiAgbGV0IHdhcnJpb3IgPSBuZXcgV2FycmlvcihuYW1lLCB4LCB5LCByYWRpdXMpO1xuICB3YXJyaW9ycy5wdXNoKHdhcnJpb3IpO1xuICBkcmF3V2Fycmlvcih3YXJyaW9yKTtcbiAgcmV0dXJuIHdhcnJpb3I7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvd2Fycmlvci93YXJyaW9yQWN0aW9uLnRzIiwiaW1wb3J0IHtcbiAgY2FudmFzLFxuICBjdHgsXG4gIFdJRFRILFxuICBIRUlHSFQsXG4gIGdyaWRTaXplXG59IGZyb20gJy4vbWFwL21hcENvbmZpZyc7XG5cbmltcG9ydCB7ZHJhd0dyaWR9IGZyb20gJy4vbWFwL2RyYXdHcmlkJztcbmltcG9ydCB7XG4gIGFkZE5laWdoYm91cnMsXG4gIGNyZWF0ZU5vZGVzLFxuICBtYXBcbn0gZnJvbSAnLi9tYXAvY3JlYXRlTWFwJztcbmltcG9ydCB7c2hvd09ic3RhY2xlc30gZnJvbSAnLi9tYXAvbWFwVXRpbHMnO1xuaW1wb3J0IHtoLCBhU3Rhcn0gZnJvbSAnLi9wYXRoL0FTdGFyJztcbmltcG9ydCB7XG4gIGRyYXdQYXRoLFxuICBnZXROb2RlRnJvbU1hcFxufSBmcm9tICcuL3BhdGgvZHJhd1BhdGgnO1xuXG5pbXBvcnQgV2FycmlvciBmcm9tICcuL3dhcnJpb3IvV2Fycmlvcic7XG5pbXBvcnQge3dhcnJpb3JzLCBjdXJyZW50bHlDaG9zZW5XYXJyaW9yfSBmcm9tICcuL3N0b3JlL3dhcnJpb3JTdG9yZSc7XG5pbXBvcnQge1xuICBvbkNob29zZVdhcnJpb3IsXG4gIGNyZWF0ZVdhcnJpb3IsXG4gIGFzc2lnbldhcnJpb3JNb3ZlVG9Qb3NpdGlvbn0gZnJvbSAnLi93YXJyaW9yL3dhcnJpb3JBY3Rpb24nO1xuaW1wb3J0IHt1cGRhdGVXYXJyaW9yfSBmcm9tICcuL3dhcnJpb3Ivd2Fycmlvck1vdmVtZW50JztcblxubGV0IHdhcnJpb3IgPSBjcmVhdGVXYXJyaW9yKCdiYXJiYXJpYW4nLCA4MCwgMTYwLCA1KTtcblxuZHJhd0dyaWQoKTtcbmNvbnNvbGUubG9nKCdtYXAnLCBtYXApO1xuY29uc29sZS5sb2coJ2N1cnJlbnRseUNob3NlbldhcnJpb3InLCBjdXJyZW50bHlDaG9zZW5XYXJyaW9yKTtcblxuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgY29uc29sZS5lcnJvcignQ2xpY2snKTtcbiAgbGV0IHggPSBlLm9mZnNldFg7IC8vIGdldCBYXG4gIGxldCB5ID0gZS5vZmZzZXRZOyAvLyBnZXQgWVxuICBjb25zb2xlLmxvZygnUG9zaXRpb24geCcsIGUub2Zmc2V0WCk7IC8vIGdldCBYXG4gIGNvbnNvbGUubG9nKCdQb3NpdGlvbiB5JywgZS5vZmZzZXRZKTsgLy8gZ2V0IFlcbiAgb25DaG9vc2VXYXJyaW9yKHdhcnJpb3JzLCB4LCB5KTtcbiAgY29uc29sZS5sb2coJ2N1cnJlbnRseUNob3NlbldhcnJpb3InLCBjdXJyZW50bHlDaG9zZW5XYXJyaW9yKTtcbn0pO1xuXG4vLyBzZXQgb25DbGlja0xpc3RlbmVyIGZvciByaWdodCBtb3VzZSBldmVudFxuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ2NvbnRleHRtZW51JywgKGUpID0+IHtcbiAgY29uc29sZS5lcnJvcignUmlnaHQgTW91c2UgQ2xpY2snKTtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBsZXQgeCA9IGUub2Zmc2V0WDsgLy8gZ2V0IFhcbiAgbGV0IHkgPSBlLm9mZnNldFk7IC8vIGdldCBZXG4gIGxldCBzdGFydE5vZGUgPSBnZXROb2RlRnJvbU1hcChjdXJyZW50bHlDaG9zZW5XYXJyaW9yLngsIGN1cnJlbnRseUNob3NlbldhcnJpb3IueSk7XG4gIGxldCBmaW5pc2hOb2RlID0gZ2V0Tm9kZUZyb21NYXAoeCwgeSk7XG4gIGNvbnNvbGUuZXJyb3IoJ3N0YXJ0Tm9kZScsIHN0YXJ0Tm9kZSk7XG4gIGNvbnNvbGUuZXJyb3IoJ2ZpbmlzaE5vZGUnLCBmaW5pc2hOb2RlKTtcbiAgYXNzaWduV2Fycmlvck1vdmVUb1Bvc2l0aW9uKGN1cnJlbnRseUNob3NlbldhcnJpb3IsIHgsIHkpO1xuICBsZXQgcGF0aDphbnkgPSBhU3RhcihzdGFydE5vZGUsIGZpbmlzaE5vZGUpO1xuICBpZihjdXJyZW50bHlDaG9zZW5XYXJyaW9yKSB7XG4gICAgdXBkYXRlV2FycmlvcihjdXJyZW50bHlDaG9zZW5XYXJyaW9yLCBwYXRoLCAwLCB4LCB5KTtcbiAgfVxuICAvL2RyYXdQYXRoKHBhdGgpO1xufSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZ2FtZS50cyIsImltcG9ydCB7XG4gIGNhbnZhcyxcbiAgY3R4LFxuICBXSURUSCxcbiAgSEVJR0hULFxuICBncmlkU2l6ZVxufSBmcm9tICcuL21hcENvbmZpZyc7XG5cbmV4cG9ydCBjb25zdCBkcmF3R3JpZCA9ICgpID0+IHtcbiAgZm9yKGxldCB5ID0gMDsgeSA8PSBIRUlHSFQ7IHkrPSBncmlkU2l6ZSkge1xuICAgIGZvcihsZXQgeCA9IDA7IHggPD0gV0lEVEg7IHgrPSBncmlkU2l6ZSkge1xuICAgICAgY3R4LnN0cm9rZVJlY3QoeCwgeSwgZ3JpZFNpemUsIGdyaWRTaXplKTtcbiAgICB9XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tYXAvZHJhd0dyaWQudHMiLCJpbXBvcnQge25laWdoYm91cnN9IGZyb20gJy4uL21hcC9jcmVhdGVNYXAnO1xuaW1wb3J0IHtcbiAgZGVsZXRlT2JqZWN0RnJvbUFycmF5LFxuICBpc09iamVjdEluQXJyYXlcbn0gZnJvbSAnLi4vdXRpbHMvb2JqVXRpbHMnO1xuXG5pbXBvcnQge1xuICBnZXRNaW5GU2NvcmUsXG4gIHVuY2xvc2VkTmVpZ2JvdXJzLFxuICBpc09iamVjdEluTWFwS2V5c1xufSBmcm9tICcuL2FTdGFyVXRpbHMnO1xuXG5leHBvcnQgY29uc3QgYVN0YXIgPSAoc3RhcnROb2RlOmFueSwgZmluaXNoTm9kZTphbnkpID0+IHtcbiAgLy8gdGhlIHNldCBvZiBjdXJyZW50bHkgZGlzY292ZXJlZCBub2RlcyB0aGF0IGFyZSBub3QgZXZhbHVhdGVkIHlldFxuICAvLyBJbml0aWFsbHkgb25seSB0aGUgc3RhcnQgbm9kZSBpcyBrbm93blxuICBsZXQgb3BlbjphbnlbXSA9IFtdO1xuXG4gIC8vIHRoZSBzZXQgb2Ygbm9kZXMgdGhhdCBhbHJlYWR5IGV2YWx1YXRlZFxuICBsZXQgY2xvc2VkOmFueVtdID0gW107XG4gIHN0YXJ0Tm9kZS5nU2NvcmUgPSAwO1xuICBzdGFydE5vZGUuZlNjb3JlID0gc3RhcnROb2RlLmdTY29yZSArIGgoc3RhcnROb2RlLCBmaW5pc2hOb2RlKVxuICBvcGVuLnB1c2goc3RhcnROb2RlKTtcblxuICAvLyBmb3IgZWFjaCBub2RlLCB3aGljaCBub2RlIGlzIGNhbiBtb3N0IGVmZmljaWVudGx5IGJlIHJlYWNoZWQgZnJvbVxuICAvLyBpZiBhIG5vZGUgY2FuIGJlIHJlYWNoZWQgZnJvbSBtYW55IG5vZGVzLCBjYW1lRnJvbSB3aWxsIGV2ZW50aWFsbHlcbiAgLy8gY29udGFpbiB0aGUgbW9zdCBlZmZpY2llbnQgcHJldmlvdXMgc3RlcFxuICBsZXQgZnJvbSA9IG5ldyBNYXAoKTtcblxuICAvLyBGb3IgZWFjaCBub2RlLCB0aGUgY29zdCBvZiBnZXR0aW5nIGZyb20gdGhlIHN0YXJ0IG5vZGUgdG8gdGhhdCBub2RlLlxuICAvLyBsZXQgZ1Njb3JlID0gbmV3IE1hcCgpO1xuICAvLyBsZXQgZlNjb3JlID0gbmV3IE1hcCgpO1xuICAvL1xuICAvLyBnU2NvcmUuc2V0KHN0YXJ0Tm9kZSwgMCk7XG4gIC8vIGZTY29yZS5zZXQoc3RhcnROb2RlLCBnU2NvcmUuZ2V0KHN0YXJ0Tm9kZSkgKyBoKHN0YXJ0Tm9kZSwgZmluaXNoTm9kZSkpO1xuICB3aGlsZShvcGVuKSB7XG4gICAgbGV0IGN1cnJlbnQ6YW55ID0gZ2V0TWluRlNjb3JlKG9wZW4pO1xuICAgIGNvbnNvbGUubG9nKCdjdXJyZW50JywgY3VycmVudCk7XG4gICAgaWYoY3VycmVudC54ID09PSBmaW5pc2hOb2RlLnggJiYgY3VycmVudC55ID09PSBmaW5pc2hOb2RlLnkpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ1BhdGgnLCByZWNvbnN0cnVjdFBhdGgoZnJvbSwgY3VycmVudCkpO1xuICAgICAgcmV0dXJuIHJlY29uc3RydWN0UGF0aChmcm9tLCBjdXJyZW50KTtcbiAgICB9XG4gICAgb3BlbiA9IGRlbGV0ZU9iamVjdEZyb21BcnJheShjdXJyZW50LCBvcGVuKTtcbiAgICBjbG9zZWQucHVzaChjdXJyZW50KTtcbiAgICBmb3IobGV0IG5laWdoYm91ciBvZiB1bmNsb3NlZE5laWdib3VycyhjdXJyZW50LCBjbG9zZWQpKSB7XG4gICAgICBsZXQgdGVtcEcgPSBjdXJyZW50LmdTY29yZSArIG5laWdoYm91ci5kaXN0YW5jZTtcbiAgICAgIGlmKCFpc09iamVjdEluQXJyYXkobmVpZ2hib3VyLCBvcGVuKSB8fCB0ZW1wRyA8IG5laWdoYm91ci5nU2NvcmUpIHtcbiAgICAgICAgZnJvbS5zZXQobmVpZ2hib3VyLCBjdXJyZW50KTtcbiAgICAgICAgbmVpZ2hib3VyLmdTY29yZSA9IHRlbXBHO1xuICAgICAgICBuZWlnaGJvdXIuZlNjb3JlID0gbmVpZ2hib3VyLmdTY29yZSArIGgobmVpZ2hib3VyLCBmaW5pc2hOb2RlKTtcbiAgICAgIH1cbiAgICAgIGlmKCFpc09iamVjdEluQXJyYXkobmVpZ2hib3VyLCBvcGVuKSkgeyAvLyBjcmVhdGUgZnVuY3Rpb25cbiAgICAgICAgbGV0IG5vZGVOZWlnaGJvdXJzID0gbmVpZ2hib3VycyhuZWlnaGJvdXIpO1xuICAgICAgICBuZWlnaGJvdXIubmVpZ2hib3VycyA9IG5vZGVOZWlnaGJvdXJzO1xuICAgICAgICBvcGVuLnB1c2gobmVpZ2hib3VyKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgY29uc29sZS5sb2coJ2ZhaWx1cmUnKTtcbiAgcmV0dXJuIDA7IC8vIGZhaWx1cmVcbn1cblxuZXhwb3J0IGNvbnN0IGggPSAoc3RhcnROb2RlOmFueSwgZmluaXNoTm9kZTphbnkpID0+IHtcbi8vZnVuY3Rpb24gaGV1cmlzdGljKG5vZGUpID1cbiAgLy8gZHggPSBhYnMobm9kZS54IC0gZ29hbC54KVxuICAvLyBkeSA9IGFicyhub2RlLnkgLSBnb2FsLnkpXG4gIC8vIHJldHVybiBEICogKGR4ICsgZHkpICsgKEQyIC0gMiAqIEQpICogbWluKGR4LCBkeSlcbiAgbGV0IEQgPSAxMDsgLy8gY29zdCBvZiBtb3ZpbmcgaG9yaXpvbnRhbGx5XG4gIGxldCBEMiA9IDE0OyAvLyBjb3N0IG9mIG1vdmluZyBkaWFnb25hbGx5XG4gIGxldCBkeCA9IE1hdGguYWJzKHN0YXJ0Tm9kZS54IC0gZmluaXNoTm9kZS54KTtcbiAgbGV0IGR5ID0gTWF0aC5hYnMoc3RhcnROb2RlLnkgLSBmaW5pc2hOb2RlLnkpO1xuICByZXR1cm4gRCAqIChkeCArIGR5KSArIChEMiAtIDIgKiBEKSAqIE1hdGgubWluKGR4LCBkeSk7XG59XG5cblxuXG5leHBvcnQgY29uc3QgcmVjb25zdHJ1Y3RQYXRoID0gKGZyb206YW55LCBjdXJyZW50OmFueSkgPT4ge1xuICBjb25zb2xlLmxvZygncmVjb25zdHJ1Y3RQYXRoIGZyb206JywgZnJvbSk7XG4gIGNvbnNvbGUubG9nKCdyZWNvbnN0cnVjdFBhdGggY3VycmVudCcsIGN1cnJlbnQpO1xuICAvLyBmdW5jdGlvbiByZWNvbnN0cnVjdF9wYXRoKGNhbWVGcm9tLCBjdXJyZW50KVxuICAvLyAgIHRvdGFsX3BhdGggOj0gW2N1cnJlbnRdXG4gIC8vICAgd2hpbGUgY3VycmVudCBpbiBjYW1lRnJvbS5LZXlzOlxuICAvLyAgICAgICBjdXJyZW50IDo9IGNhbWVGcm9tW2N1cnJlbnRdXG4gIC8vICAgICAgIHRvdGFsX3BhdGguYXBwZW5kKGN1cnJlbnQpXG4gIC8vICAgcmV0dXJuIHRvdGFsX3BhdGhcbiAgbGV0IHJldmVyc2VQYXRoOmFueVtdID0gW2N1cnJlbnRdO1xuICBsZXQgdG90YWxQYXRoOmFueVtdID0gW107XG4gIHdoaWxlKGlzT2JqZWN0SW5NYXBLZXlzKGN1cnJlbnQsIGZyb20pKSB7XG4gICAgY29uc29sZS5sb2coJ2N1cnJlbnQnLCBjdXJyZW50KTtcbiAgICBjdXJyZW50ID0gZnJvbS5nZXQoY3VycmVudCk7XG4gICAgcmV2ZXJzZVBhdGgucHVzaChjdXJyZW50KTtcbiAgfVxuICBmb3IobGV0IGkgPSByZXZlcnNlUGF0aC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIHRvdGFsUGF0aC5wdXNoKHJldmVyc2VQYXRoW2ldKTtcbiAgfVxuICByZXR1cm4gdG90YWxQYXRoO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3BhdGgvQVN0YXIudHMiLCJleHBvcnQgY29uc3QgZ2V0TWluRlNjb3JlID0gKG9wZW46YW55W10pID0+IHtcbiAgbGV0IG1pbiA9IDA7XG4gIGZvcihsZXQgaSA9IDE7IGkgPCBvcGVuLmxlbmd0aCAtIDE7ICsraSkge1xuICAgIGlmKG9wZW5bbWluXS5mU2NvcmUgPiBvcGVuW2ldLmZTY29yZSkge1xuICAgICAgbWluID0gaTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG9wZW5bbWluXTtcbn1cblxuZXhwb3J0IGNvbnN0IHVuY2xvc2VkTmVpZ2JvdXJzID0gKGN1cnJlbnQ6YW55LCBjbG9zZWQ6YW55KSA9PiB7XG4gIGxldCBuZWlnaGJvdXJzTm90SW5DbG9zZWQgPSBbXTtcbiAgZm9yKGxldCBuZWlnaGJvdXIgb2YgY3VycmVudC5uZWlnaGJvdXJzKSB7XG4gICAgbGV0IGlzSW5DbG9zZWQ6Ym9vbGVhbiA9IGZhbHNlO1xuICAgIGZvcihsZXQgbm9kZSBvZiBjbG9zZWQpIHtcbiAgICAgIGlmKG5laWdoYm91ci54ID09PSBub2RlLnggJiYgbmVpZ2hib3VyLnkgPT09IG5vZGUueSkge1xuICAgICAgICBpc0luQ2xvc2VkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYoIWlzSW5DbG9zZWQpIHtcbiAgICAgIG5laWdoYm91cnNOb3RJbkNsb3NlZC5wdXNoKG5laWdoYm91cik7XG4gICAgfVxuICB9XG4gIHJldHVybiBuZWlnaGJvdXJzTm90SW5DbG9zZWQ7XG59XG5cbmV4cG9ydCBjb25zdCBpc09iamVjdEluTWFwS2V5cyA9IChvYmplY3Q6YW55LCBtYXA6YW55KSA9PiB7XG4gIGxldCBhcnI6YW55W10gPSBBcnJheS5mcm9tKG1hcCk7XG4gIGxldCByZXN1bHQ6Ym9vbGVhbiA9IGZhbHNlO1xuICBmb3IobGV0IGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgKytpKSB7XG4gICAgLy9jb25zb2xlLmxvZygnb2JqZWN0Jywgb2JqZWN0KTtcbiAgICBpZihhcnJbaV1bMF0ueCA9PT0gb2JqZWN0LnggJiYgYXJyW2ldWzBdLnkgPT09IG9iamVjdC55KSB7XG4gICAgICByZXN1bHQgPSB0cnVlO1xuICAgIH1cbiAgfVxuICBjb25zb2xlLmxvZygncmVzdWx0JywgcmVzdWx0KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9wYXRoL2FTdGFyVXRpbHMudHMiLCJpbXBvcnQge1xuICBjYW52YXMsXG4gIGN0eCxcbiAgV0lEVEgsXG4gIEhFSUdIVCxcbiAgZ3JpZFNpemUsXG59IGZyb20gJy4uL21hcC9tYXBDb25maWcnO1xuXG5pbXBvcnQge21hcH0gZnJvbSAnLi4vbWFwL2NyZWF0ZU1hcCc7XG5cbmV4cG9ydCBjb25zdCBkcmF3UGF0aCA9IChwYXRoOmFueVtdKSA9PiB7XG4gIGZvcihsZXQgc3RlcCBvZiBwYXRoKSB7XG4gICAgY3R4LmZpbGxTdHlsZSA9ICd5ZWxsb3cnO1xuICAgIGN0eC5maWxsUmVjdChzdGVwLngsIHN0ZXAueSwgZ3JpZFNpemUsIGdyaWRTaXplKTtcbiAgfVxufVxuXG5leHBvcnQgbGV0IGdldE5vZGVGcm9tTWFwID0gKHg6bnVtYmVyLCB5Om51bWJlcikgPT4ge1xuICBsZXQgbm9kZTphbnk7XG4gIGZvcihsZXQgZ3JpZCBvZiBtYXApIHtcbiAgICBsZXQgYm90dG9tUmlnaHRYID0gZ3JpZC54ICsgZ3JpZFNpemU7XG4gICAgbGV0IGJvdHRvbVJpZ2h0WSA9IGdyaWQueSArIGdyaWRTaXplO1xuICAgIGlmKHggPj0gZ3JpZC54ICYmIHggPCBib3R0b21SaWdodFggJiYgeSA+PSBncmlkLnkgJiYgeSA8IGJvdHRvbVJpZ2h0WSkge1xuICAgICAgbm9kZSA9IGdyaWQ7XG4gICAgfVxuICB9XG4gIHJldHVybiBub2RlO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3BhdGgvZHJhd1BhdGgudHMiLCJpbXBvcnQge2dyaWRTaXplfSBmcm9tICcuLi9tYXAvbWFwQ29uZmlnJztcblxuY2xhc3MgV2FycmlvciB7XG4gIG5hbWU6IHN0cmluZztcbiAgeDogbnVtYmVyO1xuICB5OiBudW1iZXI7XG4gIGNlbnRlclg6IG51bWJlcjtcbiAgY2VudGVyWTogbnVtYmVyO1xuICByYWRpdXM6IG51bWJlcjtcbiAgbW92ZVRvTm9kZVg6IG51bWJlcjtcbiAgbW92ZVRvTm9kZVk6IG51bWJlcjtcbiAgaXNDdXJyZW50bHlDaG9zZW46IGJvb2xlYW4gPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihuYW1lOnN0cmluZywgeDpudW1iZXIsIHk6bnVtYmVyLCByYWRpdXM6bnVtYmVyKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gICAgdGhpcy5yYWRpdXMgPSByYWRpdXM7XG4gICAgdGhpcy5jZW50ZXJYID0geCArIChncmlkU2l6ZSAvIDIpO1xuICAgIHRoaXMuY2VudGVyWSA9IHkgKyAoZ3JpZFNpemUgLyAyKTtcbiAgfVxuXG4gIHNldFgoeDpudW1iZXIpIHtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMuY2VudGVyWCA9IHggKyAoZ3JpZFNpemUgLyAyKTtcbiAgfVxuXG4gIHNldFkoeTpudW1iZXIpIHtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHRoaXMuY2VudGVyWSA9IHkgKyAoZ3JpZFNpemUgLyAyKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBXYXJyaW9yO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3dhcnJpb3IvV2Fycmlvci50cyIsImltcG9ydCB7ZHJhd1dhcnJpb3J9IGZyb20gJy4vd2FycmlvckFjdGlvbic7XG5pbXBvcnQge1xuICBncmlkU2l6ZSxcbiAgY3R4LFxuICBXSURUSCxcbiAgSEVJR0hUXG59IGZyb20gJy4uL21hcC9tYXBDb25maWcnO1xuaW1wb3J0IHtkZWxldGVPYmplY3RGcm9tQXJyYXl9IGZyb20gJy4uL3V0aWxzL29ialV0aWxzJztcblxuZXhwb3J0IGxldCB1cGRhdGVXYXJyaW9yID0gKHdhcnJpb3I6YW55LCBwYXRoOmFueVtdLCBpOm51bWJlcj0wLCBjdXJyZW50TW92ZVRvWDpudW1iZXIsIGN1cnJlbnRNb3ZlVG9ZOm51bWJlcikgPT4ge1xuICBpZihjdXJyZW50TW92ZVRvWCAhPT0gd2Fycmlvci5tb3ZlVG9Ob2RlWCB8fCBjdXJyZW50TW92ZVRvWSAhPT0gd2Fycmlvci5tb3ZlVG9Ob2RlWSkgcmV0dXJuO1xuICBsZXQgdXBkYXRlZFBhdGggPSBwYXRoO1xuICBsZXQgbm9kZSA9IHBhdGhbaV07IC8vIGdldCBuZXh0IG5vZGVcbiAgbGV0IG5vZGVUb0NsZWFyID0gbm9kZTs7XG4gIGlmKGkgIT09IDApIHtcbiAgICBub2RlVG9DbGVhciA9IHVwZGF0ZWRQYXRoW2kgLSAxXTtcbiAgfVxuICBjdHguY2xlYXJSZWN0KG5vZGVUb0NsZWFyLngsIG5vZGVUb0NsZWFyLnksIGdyaWRTaXplLCBncmlkU2l6ZSk7XG4gIHdhcnJpb3Iuc2V0WChub2RlLngpOyAvLyBjYWxjdWxhdGUgY2VudGVyIG9mIHRoZSBjdXJyZW50IG5vZGVcbiAgd2Fycmlvci5zZXRZKG5vZGUueSk7XG4gIC8vY29uc29sZS5sb2coJ3dhcnJpb3IueCcsIHdhcnJpb3IueCwgJ3dhcnJpb3IueScsIHdhcnJpb3IueSk7XG4gIGRyYXdXYXJyaW9yKHdhcnJpb3IpO1xuICBpKys7XG4gIGlmKGkgIT09IHVwZGF0ZWRQYXRoLmxlbmd0aCkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdXBkYXRlV2Fycmlvcih3YXJyaW9yLCB1cGRhdGVkUGF0aCwgaSwgY3VycmVudE1vdmVUb1gsIGN1cnJlbnRNb3ZlVG9ZKTtcbiAgICB9LCAzMDApO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvd2Fycmlvci93YXJyaW9yTW92ZW1lbnQudHMiXSwic291cmNlUm9vdCI6IiJ9