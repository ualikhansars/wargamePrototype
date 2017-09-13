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
    console.log('newMap', newMap);
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
var startNode;
var finishNode;
mapConfig_1.canvas.addEventListener('click', function (e) {
    console.error('Click');
    var x = e.offsetX; // get X
    var y = e.offsetY; // get Y
    console.log('Position x', e.offsetX); // get X
    console.log('Position y', e.offsetY); // get Y
    startNode = drawPath_1.getNodeFromMap(x, y);
    warriorAction_1.onChooseWarrior(warriorStore_1.warriors, x, y);
    console.log('currentlyChosenWarrior', warriorStore_1.currentlyChosenWarrior);
});
// set onClickListener for right mouse event
mapConfig_1.canvas.addEventListener('contextmenu', function (e) {
    console.error('Right Mouse Click');
    e.preventDefault();
    var x = e.offsetX; // get X
    var y = e.offsetY; // get Y
    var finishNode = drawPath_1.getNodeFromMap(x, y);
    warriorAction_1.assignWarriorMoveToPosition(warriorStore_1.currentlyChosenWarrior, x, y);
    var path = AStar_1.aStar(startNode, finishNode);
    if (warriorStore_1.currentlyChosenWarrior) {
        warriorMovement_1.updateWarrior(warriorStore_1.currentlyChosenWarrior, path);
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
exports.updateWarrior = function (warrior, path, i) {
    if (i === void 0) { i = 0; }
    var updatedPath = path;
    console.log('i', i);
    console.log('updatedPath', updatedPath);
    var node = path[i]; // get next node
    console.log('nodeX', node.x);
    var nodeToClear = node;
    ;
    if (i !== 0) {
        nodeToClear = updatedPath[i - 1];
    }
    mapConfig_1.ctx.clearRect(nodeToClear.x, nodeToClear.y, mapConfig_1.gridSize, mapConfig_1.gridSize);
    warrior.setX(node.x); // calculate center of the current node
    warrior.setY(node.y);
    console.log('warrior.x', warrior.x, 'warrior.y', warrior.y);
    warriorAction_1.drawWarrior(warrior);
    i++;
    if (i !== updatedPath.length) {
        setTimeout(function () {
            exports.updateWarrior(warrior, updatedPath, i);
        }, 300);
    }
};


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZDllYmYwYTY2M2E2OGIzMjY2ZTciLCJ3ZWJwYWNrOi8vLy4vc3JjL21hcC9tYXBDb25maWcudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hcC9jcmVhdGVNYXAudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL29ialV0aWxzLnRzIiwid2VicGFjazovLy8uL3NyYy9zdG9yZS93YXJyaW9yU3RvcmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dhcnJpb3Ivd2FycmlvckFjdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2FtZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFwL2RyYXdHcmlkLnRzIiwid2VicGFjazovLy8uL3NyYy9wYXRoL0FTdGFyLnRzIiwid2VicGFjazovLy8uL3NyYy9wYXRoL2FTdGFyVXRpbHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhdGgvZHJhd1BhdGgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dhcnJpb3IvV2Fycmlvci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd2Fycmlvci93YXJyaW9yTW92ZW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7O0FDN0RBLG1CQUFtQjtBQUNOLGFBQUssR0FBVyxJQUFJ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QUMsQ0FBQyxnQkFBZ0I7SUFDcEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdCLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQztJQUFBLENBQUM7SUFDeEIsRUFBRSxFQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ1gsV0FBVyxHQUFHLFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUNELGVBQUcsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQyxFQUFFLG9CQUFRLEVBQUUsb0JBQVEsQ0FBQyxDQUFDO0lBQ2hFLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsdUNBQXVDO0lBQzdELE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDLEVBQUUsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM1RCwyQkFBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3JCLENBQUMsRUFBRSxDQUFDO0lBQ0osRUFBRSxFQUFDLENBQUMsS0FBSyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUM1QixVQUFVLENBQUM7WUFDVCxxQkFBYSxDQUFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDekMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ1YsQ0FBQztBQUNILENBQUMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZDllYmYwYTY2M2E2OGIzMjY2ZTciLCIvLyBnbG9iYWwgdmFyaWFibGVzXG5leHBvcnQgY29uc3QgV0lEVEg6IG51bWJlciA9IDEyMDA7XG5leHBvcnQgY29uc3QgSEVJR0hUOiBudW1iZXIgPSA2MDA7XG5leHBvcnQgY29uc3QgZ3JpZFNpemU6bnVtYmVyID0gMjA7XG5cbi8vIGNyZWF0ZSBDYW52YXNcbmV4cG9ydCBsZXQgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG5jYW52YXMuaWQgPSBcImNhbnZhc1wiO1xuY2FudmFzLndpZHRoID0gV0lEVEg7XG5jYW52YXMuaGVpZ2h0ID0gSEVJR0hUO1xuY2FudmFzLnN0eWxlLmJvcmRlciA9IFwiMXB4IHNvbGlkXCI7XG5cbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY2FudmFzKTtcblxuLy8gZGVmaW5lIDJkIGNvbnRleHRcbmV4cG9ydCBsZXQgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tYXAvbWFwQ29uZmlnLnRzIiwiaW1wb3J0IHtcbiAgY2FudmFzLFxuICBjdHgsXG4gIFdJRFRILFxuICBIRUlHSFQsXG4gIGdyaWRTaXplXG59IGZyb20gJy4uL21hcC9tYXBDb25maWcnO1xuXG5pbXBvcnQge1xuICBkZWxldGVPYmplY3RGcm9tQXJyYXksXG59IGZyb20gJy4uL3V0aWxzL29ialV0aWxzJztcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZU5vZGVzID0gKCkgPT4ge1xuICBsZXQgbWFwOmFueVtdID0gW107XG4gIGxldCB2YWx1ZSA9IDE7XG4gIGxldCBpZCA9IDA7XG4gIGZvcihsZXQgeSA9IDA7IHkgPD0gSEVJR0hUOyB5Kz0gZ3JpZFNpemUpIHtcbiAgICBmb3IobGV0IHggPSAwOyB4IDw9IFdJRFRIOyB4Kz0gZ3JpZFNpemUpIHtcbiAgICAgIG1hcC5wdXNoKHtcbiAgICAgICAgaWQ6IGlkLFxuICAgICAgICB4OiB4LFxuICAgICAgICB5OiB5LFxuICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgIG5laWdoYm91cnM6IFtdXG4gICAgICB9KTtcbiAgICAgIGlkKys7XG4gICAgfVxuICB9XG4gIHJldHVybiBtYXA7XG59XG5cbmV4cG9ydCBjb25zdCBuZWlnaGJvdXJzID0gKG5vZGU6YW55KSA9PiB7XG4gIGxldCBkaXJzID0gW1xuICAgIHt4OiAtZ3JpZFNpemUsIHk6IC1ncmlkU2l6ZSwgZGlzdGFuY2U6IDE0fSxcbiAgICB7eDogMCwgeTogLWdyaWRTaXplLCBkaXN0YW5jZTogMTB9LFxuICAgIHt4OiBncmlkU2l6ZSwgeTogLWdyaWRTaXplLCBkaXN0YW5jZTogMTR9LFxuICAgIHt4OiAtZ3JpZFNpemUsIHk6IDAsIGRpc3RhbmNlOiAxMH0sXG4gICAge3g6IGdyaWRTaXplLCB5OiAwLCBkaXN0YW5jZTogMTB9LFxuICAgIHt4OiAtZ3JpZFNpemUsIHk6IGdyaWRTaXplLCBkaXN0YW5jZTogMTR9LFxuICAgIHt4OiAwLCB5OiBncmlkU2l6ZSwgZGlzdGFuY2U6IDEwfSxcbiAgICB7eDogZ3JpZFNpemUsIHk6IGdyaWRTaXplLCBkaXN0YW5jZTogMTR9XG4gIF07XG4gIGxldCByZXN1bHQgPSBbXTtcbiAgZm9yKGxldCBkaXIgb2YgZGlycykge1xuICAgIGxldCBuZWlnaGJvdXIgPSB7XG4gICAgICB4OiBub2RlLnggKyBkaXIueCxcbiAgICAgIHk6IG5vZGUueSArIGRpci55LFxuICAgICAgZGlzdGFuY2U6IGRpci5kaXN0YW5jZVxuICAgIH1cbiAgICBpZihuZWlnaGJvdXIueCA+PSAwICYmIG5laWdoYm91ci54IDwgV0lEVEggJiYgbmVpZ2hib3VyLnkgPj0gMCAmJiBuZWlnaGJvdXIueSA8IEhFSUdIVCkge1xuICAgICAgICBsZXQgZmluZGVkOmJvb2xlYW4gPSBmYWxzZTtcbiAgICAgICAgZm9yKGxldCBub2RlIG9mIG1hcCkge1xuICAgICAgICAgIGlmKG5laWdoYm91ci54ID09PSBub2RlLnggJiYgbmVpZ2hib3VyLnkgPT09IG5vZGUueSkge1xuICAgICAgICAgICAgZmluZGVkID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYoZmluZGVkKSB7XG4gICAgICAgICAgcmVzdWx0LnB1c2goe1xuICAgICAgICAgICAgeDogbmVpZ2hib3VyLngsXG4gICAgICAgICAgICB5OiBuZWlnaGJvdXIueSxcbiAgICAgICAgICAgIGRpc3RhbmNlOiBuZWlnaGJvdXIuZGlzdGFuY2UsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGNvbnN0IGFkZE5laWdoYm91cnMgPSAobWFwOmFueVtdKSA9PiB7XG4gIGZvcihsZXQgbm9kZSBvZiBtYXApIHtcbiAgICBsZXQgbiA9IG5laWdoYm91cnMobm9kZSk7XG4gICAgbm9kZS5uZWlnaGJvdXJzID0gbjtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgY3JlYXRlT25lT2JzdGFjbGUgPSAocG9zaXRpb25YOm51bWJlciwgcG9zaXRpb25ZOm51bWJlciwgdHlwZTpzdHJpbmc9J2ZvcmVzdCcpID0+IHtcbiAgbGV0IG5vZGUgPSB7XG4gICAgeDogcG9zaXRpb25YLFxuICAgIHk6IHBvc2l0aW9uWVxuICB9O1xuICBpZih0eXBlID09PSAnZm9yZXN0JykgY3R4LmZpbGxTdHlsZSA9ICdncmVlbic7XG4gIGVsc2UgaWYodHlwZSA9PT0gJ21vdW50YWluJykgY3R4LmZpbGxTdHlsZSA9ICcjOEI0NTEzJztcbiAgZWxzZSBpZih0eXBlID09PSAncml2ZXInKSBjdHguZmlsbFN0eWxlID0gJ2JsdWUnO1xuICBjdHguZmlsbFJlY3QocG9zaXRpb25YLCBwb3NpdGlvblksIGdyaWRTaXplLCBncmlkU2l6ZSk7XG4gIHJldHVybiBkZWxldGVPYmplY3RGcm9tQXJyYXkobm9kZSwgbWFwKVxufVxuXG5leHBvcnQgY29uc3QgY3JlYXRlT2JzdGFjbGVzID0gKHN0YXJ0WDpudW1iZXIsIGZpbmlzaFg6bnVtYmVyLCBzdGFydFk6bnVtYmVyLCBmaW5pc2hZOm51bWJlciwgdHlwZTpzdHJpbmc9J2ZvcmVzdCcpID0+IHtcbiAgbGV0IG5ld01hcDphbnlbXSA9IG1hcDtcbiAgZm9yKGxldCB4ID0gc3RhcnRYOyB4IDw9IGZpbmlzaFg7IHggKz0gZ3JpZFNpemUpIHtcbiAgICBmb3IobGV0IHkgPSBzdGFydFk7IHkgPD0gZmluaXNoWTsgeSArPSBncmlkU2l6ZSkge1xuICAgICAgbGV0IG5vZGUgPSB7XG4gICAgICAgIHgsXG4gICAgICAgIHlcbiAgICAgIH1cbiAgICAgIG5ld01hcCA9IGRlbGV0ZU9iamVjdEZyb21BcnJheShub2RlLCBuZXdNYXApO1xuICAgICAgaWYodHlwZSA9PT0gJ2ZvcmVzdCcpIGN0eC5maWxsU3R5bGUgPSAnZ3JlZW4nO1xuICAgICAgZWxzZSBpZih0eXBlID09PSAnbW91bnRhaW4nKSBjdHguZmlsbFN0eWxlID0gJyM4QjQ1MTMnO1xuICAgICAgZWxzZSBpZih0eXBlID09PSAncml2ZXInKSBjdHguZmlsbFN0eWxlID0gJ2JsdWUnO1xuICAgICAgbGV0IHhMZW5ndGggPSBNYXRoLmFicyhzdGFydFggLSBmaW5pc2hYKTtcbiAgICAgIGxldCB5TGVuZ3RoID0gTWF0aC5hYnMoc3RhcnRZIC0gZmluaXNoWSk7XG4gICAgICBjdHguZmlsbFJlY3QoeCwgeSwgZ3JpZFNpemUsIGdyaWRTaXplKTtcbiAgICB9XG4gIH1cbiAgY29uc29sZS5sb2coJ25ld01hcCcsIG5ld01hcCk7XG4gIHJldHVybiBuZXdNYXA7XG59XG5cbmV4cG9ydCBsZXQgbWFwID0gY3JlYXRlTm9kZXMoKTtcbm1hcCA9IGNyZWF0ZU9ic3RhY2xlcygxMjAsIDE2MCwgMTIwLCAxNjAsICdyaXZlcicpO1xubWFwID0gY3JlYXRlT2JzdGFjbGVzKDY2MCwgODIwLCAxODAsIDIwMCwgJ3JpdmVyJyk7XG5tYXAgPSBjcmVhdGVPYnN0YWNsZXMoOTAwLCAxMTgwLCAxODAsIDIwMCwgJ3JpdmVyJyk7XG5tYXAgPSBjcmVhdGVPbmVPYnN0YWNsZSgzMDAsIDM0MCwgJ21vdW50YWluJyk7XG5tYXAgPSBjcmVhdGVPYnN0YWNsZXMoMjgwLCAzMjAsIDM2MCwgMzgwLCAnbW91bnRhaW4nKTtcbm1hcCA9IGNyZWF0ZU9ic3RhY2xlcyg3NDAsIDc2MCwgNDIwLCA1MDAsICdmb3Jlc3QnKTtcbm1hcCA9IGNyZWF0ZU9ic3RhY2xlcyg5NjAsIDEwMDAsIDQ0MCwgNDYwLCAnZm9yZXN0Jyk7XG5tYXAgPSBjcmVhdGVPYnN0YWNsZXMoOTgwLCAxMDAwLCA0NDAsIDUyMCwgJ2ZvcmVzdCcpO1xuYWRkTmVpZ2hib3VycyhtYXApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21hcC9jcmVhdGVNYXAudHMiLCJleHBvcnQgY29uc3QgZGVsZXRlT2JqZWN0RnJvbUFycmF5ID0gKG9iamVjdDphbnksIGFycjphbnlbXSkgPT4ge1xuICBsZXQgdXBkYXRlZEFyciA9IGFyci5maWx0ZXIoKGVsKSA9PiB7XG4gICAgaWYoZWwueCA9PT0gb2JqZWN0LnggJiYgZWwueSA9PT0gb2JqZWN0LnkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH0pO1xuICByZXR1cm4gdXBkYXRlZEFycjtcbn1cblxuZXhwb3J0IGNvbnN0IGlzT2JqZWN0SW5BcnJheSA9IChvYmplY3Q6YW55LCBhcnI6YW55W10pID0+IHtcbiAgbGV0IHJlc3VsdDpib29sZWFuID0gZmFsc2U7XG4gIGZvcihsZXQgbm9kZSBvZiBhcnIpIHtcbiAgICBpZihvYmplY3QueCA9PT0gbm9kZS54ICYmIG9iamVjdC55ID09PSBub2RlLnkpIHtcbiAgICAgIHJlc3VsdCA9IHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBjb25zdCBnZXROb2RlRnJvbUFycmF5ID0gKG9iamVjdDphbnksIGFycjphbnlbXSkgPT4ge1xuICBmb3IobGV0IG5vZGUgb2YgYXJyKSB7XG4gICAgaWYobm9kZS54ID09PSBvYmplY3QueCAmJiBub2RlLnkgJiYgb2JqZWN0LnkpIHtcbiAgICAgIHJldHVybiBub2RlO1xuICAgIH1cbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3V0aWxzL29ialV0aWxzLnRzIiwiZXhwb3J0IGNvbnN0IHdhcnJpb3JzOmFueVtdID0gW107XG5leHBvcnQgbGV0IGN1cnJlbnRseUNob3NlbldhcnJpb3I6YW55ID0gbnVsbDtcblxuZXhwb3J0IGNvbnN0IGFzc2lnbkN1cnJlbnRseUNob3NlbldhcnJpb3IgPSAod2FycmlvcjphbnkpID0+IHtcbiAgLy8gY2hlY2sgdW5pdFxuICBpZih3YXJyaW9yKSB7XG4gICAgICBjdXJyZW50bHlDaG9zZW5XYXJyaW9yID0gd2FycmlvcjtcbiAgfSBlbHNlIHtcbiAgICBjdXJyZW50bHlDaG9zZW5XYXJyaW9yID0gbnVsbDtcbiAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc3RvcmUvd2FycmlvclN0b3JlLnRzIiwiaW1wb3J0IHtncmlkU2l6ZX0gZnJvbSAnLi4vbWFwL21hcENvbmZpZyc7XG5pbXBvcnQge1xuICB3YXJyaW9ycyxcbiAgY3VycmVudGx5Q2hvc2VuV2FycmlvcixcbiAgYXNzaWduQ3VycmVudGx5Q2hvc2VuV2FycmlvclxufSBmcm9tICcuLi9zdG9yZS93YXJyaW9yU3RvcmUnO1xuaW1wb3J0IHtjdHh9IGZyb20gJy4uL21hcC9tYXBDb25maWcnO1xuaW1wb3J0IFdhcnJpb3IgZnJvbSAnLi9XYXJyaW9yJztcblxuZXhwb3J0IGNvbnN0IG9uQ2hvb3NlV2FycmlvciA9ICh3YXJyaW9yczphbnlbXSwgbW91c2VYOm51bWJlciwgbW91c2VZOm51bWJlcikgPT4ge1xuICBsZXQgZm91bmRlZFdhcnJpb3IgPSBudWxsO1xuICBmb3IobGV0IHdhcnJpb3Igb2Ygd2FycmlvcnMpIHtcbiAgICBsZXQgYm90dG9tUmlnaHRYID0gd2Fycmlvci54ICsgZ3JpZFNpemU7XG4gICAgbGV0IGJvdHRvbVJpZ2h0WSA9IHdhcnJpb3IueSArIGdyaWRTaXplO1xuICAgIGlmKG1vdXNlWCA+PSB3YXJyaW9yLnggJiYgbW91c2VYIDwgYm90dG9tUmlnaHRYICYmIG1vdXNlWSA+PSB3YXJyaW9yLnkgJiYgbW91c2VZIDwgYm90dG9tUmlnaHRZKSB7XG4gICAgICBjb25zb2xlLmxvZygnd2FycmlvcicsIHdhcnJpb3IubmFtZSwgJyB3YXMgY2hvc2VuJyk7XG4gICAgICB3YXJyaW9yLmlzQ3VycmVudGx5Q2hvc2VuID0gdHJ1ZTtcbiAgICAgIGZvdW5kZWRXYXJyaW9yID0gd2FycmlvcjtcbiAgICB9XG4gIH1cbiAgYXNzaWduQ3VycmVudGx5Q2hvc2VuV2Fycmlvcihmb3VuZGVkV2Fycmlvcik7XG4gIGNvbnNvbGUubG9nKCdjdXJyZW50bHlDaG9zZW5XYXJyaW9yJywgY3VycmVudGx5Q2hvc2VuV2Fycmlvcik7XG59XG5cbmV4cG9ydCBjb25zdCBkcmF3V2FycmlvciA9ICh3YXJyaW9yOmFueSkgPT4ge1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHguYXJjKHdhcnJpb3IuY2VudGVyWCwgd2Fycmlvci5jZW50ZXJZLCB3YXJyaW9yLnJhZGl1cywgMCwgTWF0aC5QSSoyKTtcbiAgICBjdHguZmlsbFN0eWxlID0gJyNkOTI1MTAnO1xuICAgIGN0eC5maWxsKCk7XG4gICAgY3R4LmNsb3NlUGF0aCgpO1xufVxuXG5leHBvcnQgY29uc3QgYXNzaWduV2Fycmlvck1vdmVUb1Bvc2l0aW9uID0gKHdhcnJpb3I6YW55LCB4Om51bWJlciwgeTpudW1iZXIpID0+IHtcbiAgLy9jb25zb2xlLmVycm9yKCdhc3NpZ25Nb3ZlVG9Qb3NpdGlvbicpO1xuICBpZih3YXJyaW9yKSB7XG4gICAgd2Fycmlvci5tb3ZlVG9Ob2RlWCA9IHg7XG4gICAgd2Fycmlvci5tb3ZlVG9Ob2RlWSA9IHk7XG4gICAgY29uc29sZS5sb2cod2Fycmlvci5uYW1lICsgJyBpcyBtb3ZpbmcgdG8gbm9kZTonICsgd2Fycmlvci5tb3ZlVG9Ob2RlWCArICcgeTonICsgd2Fycmlvci5tb3ZlVG9Ob2RlWSk7XG4gIH0gZWxzZSB7XG4gICAgY29uc29sZS5sb2coJ3dhcnJpb3Igbm90IGNob3NlbicpO1xuICB9XG59XG5cbi8vIGNyZWF0ZSBVbml0IGFuZCBpbW1lZGlhdGx5IHB1c2ggaXQgaW50byB1bml0cyBhcnJheVxuZXhwb3J0IGxldCBjcmVhdGVXYXJyaW9yID0gKG5hbWU6c3RyaW5nLCB4Om51bWJlciwgeTpudW1iZXIsIHJhZGl1czpudW1iZXIpID0+IHtcbiAgLy9jb25zb2xlLmVycm9yKCdjcmVhdGVVbml0Jyk7XG4gIGxldCB3YXJyaW9yID0gbmV3IFdhcnJpb3IobmFtZSwgeCwgeSwgcmFkaXVzKTtcbiAgd2FycmlvcnMucHVzaCh3YXJyaW9yKTtcbiAgZHJhd1dhcnJpb3Iod2Fycmlvcik7XG4gIHJldHVybiB3YXJyaW9yO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3dhcnJpb3Ivd2FycmlvckFjdGlvbi50cyIsImltcG9ydCB7XG4gIGNhbnZhcyxcbiAgY3R4LFxuICBXSURUSCxcbiAgSEVJR0hULFxuICBncmlkU2l6ZVxufSBmcm9tICcuL21hcC9tYXBDb25maWcnO1xuXG5pbXBvcnQge2RyYXdHcmlkfSBmcm9tICcuL21hcC9kcmF3R3JpZCc7XG5pbXBvcnQge1xuICBhZGROZWlnaGJvdXJzLFxuICBjcmVhdGVOb2RlcyxcbiAgbWFwXG59IGZyb20gJy4vbWFwL2NyZWF0ZU1hcCc7XG5pbXBvcnQge3Nob3dPYnN0YWNsZXN9IGZyb20gJy4vbWFwL21hcFV0aWxzJztcbmltcG9ydCB7aCwgYVN0YXJ9IGZyb20gJy4vcGF0aC9BU3Rhcic7XG5pbXBvcnQge1xuICBkcmF3UGF0aCxcbiAgZ2V0Tm9kZUZyb21NYXBcbn0gZnJvbSAnLi9wYXRoL2RyYXdQYXRoJztcblxuaW1wb3J0IFdhcnJpb3IgZnJvbSAnLi93YXJyaW9yL1dhcnJpb3InO1xuaW1wb3J0IHt3YXJyaW9ycywgY3VycmVudGx5Q2hvc2VuV2Fycmlvcn0gZnJvbSAnLi9zdG9yZS93YXJyaW9yU3RvcmUnO1xuaW1wb3J0IHtcbiAgb25DaG9vc2VXYXJyaW9yLFxuICBjcmVhdGVXYXJyaW9yLFxuICBhc3NpZ25XYXJyaW9yTW92ZVRvUG9zaXRpb259IGZyb20gJy4vd2Fycmlvci93YXJyaW9yQWN0aW9uJztcbmltcG9ydCB7dXBkYXRlV2Fycmlvcn0gZnJvbSAnLi93YXJyaW9yL3dhcnJpb3JNb3ZlbWVudCc7XG5cbmxldCB3YXJyaW9yID0gY3JlYXRlV2FycmlvcignYmFyYmFyaWFuJywgODAsIDE2MCwgNSk7XG5cbmRyYXdHcmlkKCk7XG5jb25zb2xlLmxvZygnbWFwJywgbWFwKTtcbmNvbnNvbGUubG9nKCdjdXJyZW50bHlDaG9zZW5XYXJyaW9yJywgY3VycmVudGx5Q2hvc2VuV2Fycmlvcik7XG5cbmxldCBzdGFydE5vZGU6YW55O1xubGV0IGZpbmlzaE5vZGU6YW55O1xuXG5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICBjb25zb2xlLmVycm9yKCdDbGljaycpO1xuICBsZXQgeCA9IGUub2Zmc2V0WDsgLy8gZ2V0IFhcbiAgbGV0IHkgPSBlLm9mZnNldFk7IC8vIGdldCBZXG4gIGNvbnNvbGUubG9nKCdQb3NpdGlvbiB4JywgZS5vZmZzZXRYKTsgLy8gZ2V0IFhcbiAgY29uc29sZS5sb2coJ1Bvc2l0aW9uIHknLCBlLm9mZnNldFkpOyAvLyBnZXQgWVxuICBzdGFydE5vZGUgPSBnZXROb2RlRnJvbU1hcCh4LCB5KTtcbiAgb25DaG9vc2VXYXJyaW9yKHdhcnJpb3JzLCB4LCB5KTtcbiAgY29uc29sZS5sb2coJ2N1cnJlbnRseUNob3NlbldhcnJpb3InLCBjdXJyZW50bHlDaG9zZW5XYXJyaW9yKTtcbn0pO1xuXG4vLyBzZXQgb25DbGlja0xpc3RlbmVyIGZvciByaWdodCBtb3VzZSBldmVudFxuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ2NvbnRleHRtZW51JywgKGUpID0+IHtcbiAgY29uc29sZS5lcnJvcignUmlnaHQgTW91c2UgQ2xpY2snKTtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBsZXQgeCA9IGUub2Zmc2V0WDsgLy8gZ2V0IFhcbiAgbGV0IHkgPSBlLm9mZnNldFk7IC8vIGdldCBZXG4gIGxldCBmaW5pc2hOb2RlID0gZ2V0Tm9kZUZyb21NYXAoeCwgeSk7XG4gIGFzc2lnbldhcnJpb3JNb3ZlVG9Qb3NpdGlvbihjdXJyZW50bHlDaG9zZW5XYXJyaW9yLCB4LCB5KTtcbiAgbGV0IHBhdGg6YW55ID0gYVN0YXIoc3RhcnROb2RlLCBmaW5pc2hOb2RlKTtcbiAgaWYoY3VycmVudGx5Q2hvc2VuV2Fycmlvcikge1xuICAgIHVwZGF0ZVdhcnJpb3IoY3VycmVudGx5Q2hvc2VuV2FycmlvciwgcGF0aCk7XG4gIH1cbiAgLy9kcmF3UGF0aChwYXRoKTtcbn0pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2dhbWUudHMiLCJpbXBvcnQge1xuICBjYW52YXMsXG4gIGN0eCxcbiAgV0lEVEgsXG4gIEhFSUdIVCxcbiAgZ3JpZFNpemVcbn0gZnJvbSAnLi9tYXBDb25maWcnO1xuXG5leHBvcnQgY29uc3QgZHJhd0dyaWQgPSAoKSA9PiB7XG4gIGZvcihsZXQgeSA9IDA7IHkgPD0gSEVJR0hUOyB5Kz0gZ3JpZFNpemUpIHtcbiAgICBmb3IobGV0IHggPSAwOyB4IDw9IFdJRFRIOyB4Kz0gZ3JpZFNpemUpIHtcbiAgICAgIGN0eC5zdHJva2VSZWN0KHgsIHksIGdyaWRTaXplLCBncmlkU2l6ZSk7XG4gICAgfVxuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFwL2RyYXdHcmlkLnRzIiwiaW1wb3J0IHtuZWlnaGJvdXJzfSBmcm9tICcuLi9tYXAvY3JlYXRlTWFwJztcbmltcG9ydCB7XG4gIGRlbGV0ZU9iamVjdEZyb21BcnJheSxcbiAgaXNPYmplY3RJbkFycmF5XG59IGZyb20gJy4uL3V0aWxzL29ialV0aWxzJztcblxuaW1wb3J0IHtcbiAgZ2V0TWluRlNjb3JlLFxuICB1bmNsb3NlZE5laWdib3VycyxcbiAgaXNPYmplY3RJbk1hcEtleXNcbn0gZnJvbSAnLi9hU3RhclV0aWxzJztcblxuZXhwb3J0IGNvbnN0IGFTdGFyID0gKHN0YXJ0Tm9kZTphbnksIGZpbmlzaE5vZGU6YW55KSA9PiB7XG4gIC8vIHRoZSBzZXQgb2YgY3VycmVudGx5IGRpc2NvdmVyZWQgbm9kZXMgdGhhdCBhcmUgbm90IGV2YWx1YXRlZCB5ZXRcbiAgLy8gSW5pdGlhbGx5IG9ubHkgdGhlIHN0YXJ0IG5vZGUgaXMga25vd25cbiAgbGV0IG9wZW46YW55W10gPSBbXTtcblxuICAvLyB0aGUgc2V0IG9mIG5vZGVzIHRoYXQgYWxyZWFkeSBldmFsdWF0ZWRcbiAgbGV0IGNsb3NlZDphbnlbXSA9IFtdO1xuICBzdGFydE5vZGUuZ1Njb3JlID0gMDtcbiAgc3RhcnROb2RlLmZTY29yZSA9IHN0YXJ0Tm9kZS5nU2NvcmUgKyBoKHN0YXJ0Tm9kZSwgZmluaXNoTm9kZSlcbiAgb3Blbi5wdXNoKHN0YXJ0Tm9kZSk7XG5cbiAgLy8gZm9yIGVhY2ggbm9kZSwgd2hpY2ggbm9kZSBpcyBjYW4gbW9zdCBlZmZpY2llbnRseSBiZSByZWFjaGVkIGZyb21cbiAgLy8gaWYgYSBub2RlIGNhbiBiZSByZWFjaGVkIGZyb20gbWFueSBub2RlcywgY2FtZUZyb20gd2lsbCBldmVudGlhbGx5XG4gIC8vIGNvbnRhaW4gdGhlIG1vc3QgZWZmaWNpZW50IHByZXZpb3VzIHN0ZXBcbiAgbGV0IGZyb20gPSBuZXcgTWFwKCk7XG5cbiAgLy8gRm9yIGVhY2ggbm9kZSwgdGhlIGNvc3Qgb2YgZ2V0dGluZyBmcm9tIHRoZSBzdGFydCBub2RlIHRvIHRoYXQgbm9kZS5cbiAgLy8gbGV0IGdTY29yZSA9IG5ldyBNYXAoKTtcbiAgLy8gbGV0IGZTY29yZSA9IG5ldyBNYXAoKTtcbiAgLy9cbiAgLy8gZ1Njb3JlLnNldChzdGFydE5vZGUsIDApO1xuICAvLyBmU2NvcmUuc2V0KHN0YXJ0Tm9kZSwgZ1Njb3JlLmdldChzdGFydE5vZGUpICsgaChzdGFydE5vZGUsIGZpbmlzaE5vZGUpKTtcbiAgd2hpbGUob3Blbikge1xuICAgIGxldCBjdXJyZW50OmFueSA9IGdldE1pbkZTY29yZShvcGVuKTtcbiAgICBjb25zb2xlLmxvZygnY3VycmVudCcsIGN1cnJlbnQpO1xuICAgIGlmKGN1cnJlbnQueCA9PT0gZmluaXNoTm9kZS54ICYmIGN1cnJlbnQueSA9PT0gZmluaXNoTm9kZS55KSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdQYXRoJywgcmVjb25zdHJ1Y3RQYXRoKGZyb20sIGN1cnJlbnQpKTtcbiAgICAgIHJldHVybiByZWNvbnN0cnVjdFBhdGgoZnJvbSwgY3VycmVudCk7XG4gICAgfVxuICAgIG9wZW4gPSBkZWxldGVPYmplY3RGcm9tQXJyYXkoY3VycmVudCwgb3Blbik7XG4gICAgY2xvc2VkLnB1c2goY3VycmVudCk7XG4gICAgZm9yKGxldCBuZWlnaGJvdXIgb2YgdW5jbG9zZWROZWlnYm91cnMoY3VycmVudCwgY2xvc2VkKSkge1xuICAgICAgbGV0IHRlbXBHID0gY3VycmVudC5nU2NvcmUgKyBuZWlnaGJvdXIuZGlzdGFuY2U7XG4gICAgICBpZighaXNPYmplY3RJbkFycmF5KG5laWdoYm91ciwgb3BlbikgfHwgdGVtcEcgPCBuZWlnaGJvdXIuZ1Njb3JlKSB7XG4gICAgICAgIGZyb20uc2V0KG5laWdoYm91ciwgY3VycmVudCk7XG4gICAgICAgIG5laWdoYm91ci5nU2NvcmUgPSB0ZW1wRztcbiAgICAgICAgbmVpZ2hib3VyLmZTY29yZSA9IG5laWdoYm91ci5nU2NvcmUgKyBoKG5laWdoYm91ciwgZmluaXNoTm9kZSk7XG4gICAgICB9XG4gICAgICBpZighaXNPYmplY3RJbkFycmF5KG5laWdoYm91ciwgb3BlbikpIHsgLy8gY3JlYXRlIGZ1bmN0aW9uXG4gICAgICAgIGxldCBub2RlTmVpZ2hib3VycyA9IG5laWdoYm91cnMobmVpZ2hib3VyKTtcbiAgICAgICAgbmVpZ2hib3VyLm5laWdoYm91cnMgPSBub2RlTmVpZ2hib3VycztcbiAgICAgICAgb3Blbi5wdXNoKG5laWdoYm91cik7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGNvbnNvbGUubG9nKCdmYWlsdXJlJyk7XG4gIHJldHVybiAwOyAvLyBmYWlsdXJlXG59XG5cbmV4cG9ydCBjb25zdCBoID0gKHN0YXJ0Tm9kZTphbnksIGZpbmlzaE5vZGU6YW55KSA9PiB7XG4vL2Z1bmN0aW9uIGhldXJpc3RpYyhub2RlKSA9XG4gIC8vIGR4ID0gYWJzKG5vZGUueCAtIGdvYWwueClcbiAgLy8gZHkgPSBhYnMobm9kZS55IC0gZ29hbC55KVxuICAvLyByZXR1cm4gRCAqIChkeCArIGR5KSArIChEMiAtIDIgKiBEKSAqIG1pbihkeCwgZHkpXG4gIGxldCBEID0gMTA7IC8vIGNvc3Qgb2YgbW92aW5nIGhvcml6b250YWxseVxuICBsZXQgRDIgPSAxNDsgLy8gY29zdCBvZiBtb3ZpbmcgZGlhZ29uYWxseVxuICBsZXQgZHggPSBNYXRoLmFicyhzdGFydE5vZGUueCAtIGZpbmlzaE5vZGUueCk7XG4gIGxldCBkeSA9IE1hdGguYWJzKHN0YXJ0Tm9kZS55IC0gZmluaXNoTm9kZS55KTtcbiAgcmV0dXJuIEQgKiAoZHggKyBkeSkgKyAoRDIgLSAyICogRCkgKiBNYXRoLm1pbihkeCwgZHkpO1xufVxuXG5cblxuZXhwb3J0IGNvbnN0IHJlY29uc3RydWN0UGF0aCA9IChmcm9tOmFueSwgY3VycmVudDphbnkpID0+IHtcbiAgY29uc29sZS5sb2coJ3JlY29uc3RydWN0UGF0aCBmcm9tOicsIGZyb20pO1xuICBjb25zb2xlLmxvZygncmVjb25zdHJ1Y3RQYXRoIGN1cnJlbnQnLCBjdXJyZW50KTtcbiAgLy8gZnVuY3Rpb24gcmVjb25zdHJ1Y3RfcGF0aChjYW1lRnJvbSwgY3VycmVudClcbiAgLy8gICB0b3RhbF9wYXRoIDo9IFtjdXJyZW50XVxuICAvLyAgIHdoaWxlIGN1cnJlbnQgaW4gY2FtZUZyb20uS2V5czpcbiAgLy8gICAgICAgY3VycmVudCA6PSBjYW1lRnJvbVtjdXJyZW50XVxuICAvLyAgICAgICB0b3RhbF9wYXRoLmFwcGVuZChjdXJyZW50KVxuICAvLyAgIHJldHVybiB0b3RhbF9wYXRoXG4gIGxldCByZXZlcnNlUGF0aDphbnlbXSA9IFtjdXJyZW50XTtcbiAgbGV0IHRvdGFsUGF0aDphbnlbXSA9IFtdO1xuICB3aGlsZShpc09iamVjdEluTWFwS2V5cyhjdXJyZW50LCBmcm9tKSkge1xuICAgIGNvbnNvbGUubG9nKCdjdXJyZW50JywgY3VycmVudCk7XG4gICAgY3VycmVudCA9IGZyb20uZ2V0KGN1cnJlbnQpO1xuICAgIHJldmVyc2VQYXRoLnB1c2goY3VycmVudCk7XG4gIH1cbiAgZm9yKGxldCBpID0gcmV2ZXJzZVBhdGgubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICB0b3RhbFBhdGgucHVzaChyZXZlcnNlUGF0aFtpXSk7XG4gIH1cbiAgcmV0dXJuIHRvdGFsUGF0aDtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9wYXRoL0FTdGFyLnRzIiwiZXhwb3J0IGNvbnN0IGdldE1pbkZTY29yZSA9IChvcGVuOmFueVtdKSA9PiB7XG4gIGxldCBtaW4gPSAwO1xuICBmb3IobGV0IGkgPSAxOyBpIDwgb3Blbi5sZW5ndGggLSAxOyArK2kpIHtcbiAgICBpZihvcGVuW21pbl0uZlNjb3JlID4gb3BlbltpXS5mU2NvcmUpIHtcbiAgICAgIG1pbiA9IGk7XG4gICAgfVxuICB9XG4gIHJldHVybiBvcGVuW21pbl07XG59XG5cbmV4cG9ydCBjb25zdCB1bmNsb3NlZE5laWdib3VycyA9IChjdXJyZW50OmFueSwgY2xvc2VkOmFueSkgPT4ge1xuICBsZXQgbmVpZ2hib3Vyc05vdEluQ2xvc2VkID0gW107XG4gIGZvcihsZXQgbmVpZ2hib3VyIG9mIGN1cnJlbnQubmVpZ2hib3Vycykge1xuICAgIGxldCBpc0luQ2xvc2VkOmJvb2xlYW4gPSBmYWxzZTtcbiAgICBmb3IobGV0IG5vZGUgb2YgY2xvc2VkKSB7XG4gICAgICBpZihuZWlnaGJvdXIueCA9PT0gbm9kZS54ICYmIG5laWdoYm91ci55ID09PSBub2RlLnkpIHtcbiAgICAgICAgaXNJbkNsb3NlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIGlmKCFpc0luQ2xvc2VkKSB7XG4gICAgICBuZWlnaGJvdXJzTm90SW5DbG9zZWQucHVzaChuZWlnaGJvdXIpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbmVpZ2hib3Vyc05vdEluQ2xvc2VkO1xufVxuXG5leHBvcnQgY29uc3QgaXNPYmplY3RJbk1hcEtleXMgPSAob2JqZWN0OmFueSwgbWFwOmFueSkgPT4ge1xuICBsZXQgYXJyOmFueVtdID0gQXJyYXkuZnJvbShtYXApO1xuICBsZXQgcmVzdWx0OmJvb2xlYW4gPSBmYWxzZTtcbiAgZm9yKGxldCBpID0gMDsgaSA8IGFyci5sZW5ndGg7ICsraSkge1xuICAgIC8vY29uc29sZS5sb2coJ29iamVjdCcsIG9iamVjdCk7XG4gICAgaWYoYXJyW2ldWzBdLnggPT09IG9iamVjdC54ICYmIGFycltpXVswXS55ID09PSBvYmplY3QueSkge1xuICAgICAgcmVzdWx0ID0gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgY29uc29sZS5sb2coJ3Jlc3VsdCcsIHJlc3VsdCk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcGF0aC9hU3RhclV0aWxzLnRzIiwiaW1wb3J0IHtcbiAgY2FudmFzLFxuICBjdHgsXG4gIFdJRFRILFxuICBIRUlHSFQsXG4gIGdyaWRTaXplLFxufSBmcm9tICcuLi9tYXAvbWFwQ29uZmlnJztcblxuaW1wb3J0IHttYXB9IGZyb20gJy4uL21hcC9jcmVhdGVNYXAnO1xuXG5leHBvcnQgY29uc3QgZHJhd1BhdGggPSAocGF0aDphbnlbXSkgPT4ge1xuICBmb3IobGV0IHN0ZXAgb2YgcGF0aCkge1xuICAgIGN0eC5maWxsU3R5bGUgPSAneWVsbG93JztcbiAgICBjdHguZmlsbFJlY3Qoc3RlcC54LCBzdGVwLnksIGdyaWRTaXplLCBncmlkU2l6ZSk7XG4gIH1cbn1cblxuZXhwb3J0IGxldCBnZXROb2RlRnJvbU1hcCA9ICh4Om51bWJlciwgeTpudW1iZXIpID0+IHtcbiAgbGV0IG5vZGU6YW55O1xuICBmb3IobGV0IGdyaWQgb2YgbWFwKSB7XG4gICAgbGV0IGJvdHRvbVJpZ2h0WCA9IGdyaWQueCArIGdyaWRTaXplO1xuICAgIGxldCBib3R0b21SaWdodFkgPSBncmlkLnkgKyBncmlkU2l6ZTtcbiAgICBpZih4ID49IGdyaWQueCAmJiB4IDwgYm90dG9tUmlnaHRYICYmIHkgPj0gZ3JpZC55ICYmIHkgPCBib3R0b21SaWdodFkpIHtcbiAgICAgIG5vZGUgPSBncmlkO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbm9kZTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9wYXRoL2RyYXdQYXRoLnRzIiwiaW1wb3J0IHtncmlkU2l6ZX0gZnJvbSAnLi4vbWFwL21hcENvbmZpZyc7XG5cbmNsYXNzIFdhcnJpb3Ige1xuICBuYW1lOiBzdHJpbmc7XG4gIHg6IG51bWJlcjtcbiAgeTogbnVtYmVyO1xuICBjZW50ZXJYOiBudW1iZXI7XG4gIGNlbnRlclk6IG51bWJlcjtcbiAgcmFkaXVzOiBudW1iZXI7XG4gIG1vdmVUb05vZGVYOiBudW1iZXI7XG4gIG1vdmVUb05vZGVZOiBudW1iZXI7XG4gIGlzQ3VycmVudGx5Q2hvc2VuOiBib29sZWFuID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IobmFtZTpzdHJpbmcsIHg6bnVtYmVyLCB5Om51bWJlciwgcmFkaXVzOm51bWJlcikge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHRoaXMucmFkaXVzID0gcmFkaXVzO1xuICAgIHRoaXMuY2VudGVyWCA9IHggKyAoZ3JpZFNpemUgLyAyKTtcbiAgICB0aGlzLmNlbnRlclkgPSB5ICsgKGdyaWRTaXplIC8gMik7XG4gIH1cblxuICBzZXRYKHg6bnVtYmVyKSB7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLmNlbnRlclggPSB4ICsgKGdyaWRTaXplIC8gMik7XG4gIH1cblxuICBzZXRZKHk6bnVtYmVyKSB7XG4gICAgdGhpcy55ID0geTtcbiAgICB0aGlzLmNlbnRlclkgPSB5ICsgKGdyaWRTaXplIC8gMik7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgV2FycmlvcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy93YXJyaW9yL1dhcnJpb3IudHMiLCJpbXBvcnQge2RyYXdXYXJyaW9yfSBmcm9tICcuL3dhcnJpb3JBY3Rpb24nO1xuaW1wb3J0IHtcbiAgZ3JpZFNpemUsXG4gIGN0eCxcbiAgV0lEVEgsXG4gIEhFSUdIVFxufSBmcm9tICcuLi9tYXAvbWFwQ29uZmlnJztcbmltcG9ydCB7ZGVsZXRlT2JqZWN0RnJvbUFycmF5fSBmcm9tICcuLi91dGlscy9vYmpVdGlscyc7XG5cbmV4cG9ydCBsZXQgdXBkYXRlV2FycmlvciA9ICh3YXJyaW9yOmFueSwgcGF0aDphbnlbXSwgaTpudW1iZXI9MCkgPT4ge1xuICBsZXQgdXBkYXRlZFBhdGggPSBwYXRoO1xuICBjb25zb2xlLmxvZygnaScsIGkpO1xuICBjb25zb2xlLmxvZygndXBkYXRlZFBhdGgnLCB1cGRhdGVkUGF0aCk7XG4gIGxldCBub2RlID0gcGF0aFtpXTsgLy8gZ2V0IG5leHQgbm9kZVxuICBjb25zb2xlLmxvZygnbm9kZVgnLCBub2RlLngpO1xuICBsZXQgbm9kZVRvQ2xlYXIgPSBub2RlOztcbiAgaWYoaSAhPT0gMCkge1xuICAgIG5vZGVUb0NsZWFyID0gdXBkYXRlZFBhdGhbaSAtIDFdO1xuICB9XG4gIGN0eC5jbGVhclJlY3Qobm9kZVRvQ2xlYXIueCwgbm9kZVRvQ2xlYXIueSwgZ3JpZFNpemUsIGdyaWRTaXplKTtcbiAgd2Fycmlvci5zZXRYKG5vZGUueCk7IC8vIGNhbGN1bGF0ZSBjZW50ZXIgb2YgdGhlIGN1cnJlbnQgbm9kZVxuICB3YXJyaW9yLnNldFkobm9kZS55KTtcbiAgY29uc29sZS5sb2coJ3dhcnJpb3IueCcsIHdhcnJpb3IueCwgJ3dhcnJpb3IueScsIHdhcnJpb3IueSk7XG4gIGRyYXdXYXJyaW9yKHdhcnJpb3IpO1xuICBpKys7XG4gIGlmKGkgIT09IHVwZGF0ZWRQYXRoLmxlbmd0aCkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdXBkYXRlV2Fycmlvcih3YXJyaW9yLCB1cGRhdGVkUGF0aCwgaSk7XG4gICAgfSwgMzAwKTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3dhcnJpb3Ivd2Fycmlvck1vdmVtZW50LnRzIl0sInNvdXJjZVJvb3QiOiIifQ==