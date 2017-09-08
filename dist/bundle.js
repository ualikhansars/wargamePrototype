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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// global variables
exports.WIDTH = 1000;
exports.HEIGHT = 600;
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
var drawGrid_1 = __webpack_require__(2);
var createMap_1 = __webpack_require__(3);
var mapUtils_1 = __webpack_require__(4);
var AStar_1 = __webpack_require__(5);
var gridSize = 20;
drawGrid_1.drawGrid(gridSize);
var map = createMap_1.createNodes(gridSize);
createMap_1.addNeighbours(map, gridSize);
mapUtils_1.showObstacles(map, gridSize);
console.log(map);
var startNode;
var finishNode;
mapConfig_1.canvas.addEventListener('click', function (e) {
    console.error('Click');
    var x = e.offsetX; // get X
    var y = e.offsetY; // get Y
    console.log('Position x', e.offsetX); // get X
    console.log('Position y', e.offsetY); // get Y
    for (var _i = 0, map_1 = map; _i < map_1.length; _i++) {
        var grid = map_1[_i];
        var bottomRightX = grid.x + gridSize;
        var bottomRightY = grid.y + gridSize;
        if (x >= grid.x && x < bottomRightX && y >= grid.y && y < bottomRightY) {
            mapConfig_1.ctx.fillStyle = 'green';
            mapConfig_1.ctx.fillRect(grid.x, grid.y, gridSize, gridSize);
            startNode = grid;
            console.log('grid', grid, 'was clicked');
        }
    }
});
// set onClickListener for right mouse event
mapConfig_1.canvas.addEventListener('contextmenu', function (e) {
    console.error('Right Mouse Click');
    e.preventDefault();
    var x = e.offsetX; // get X
    var y = e.offsetY; // get Y
    for (var _i = 0, map_2 = map; _i < map_2.length; _i++) {
        var grid = map_2[_i];
        var bottomRightX = grid.x + gridSize;
        var bottomRightY = grid.y + gridSize;
        if (x >= grid.x && x < bottomRightX && y >= grid.y && y < bottomRightY) {
            mapConfig_1.ctx.fillStyle = 'red';
            mapConfig_1.ctx.fillRect(grid.x, grid.y, gridSize, gridSize);
            console.log('grid', grid, 'was clicked');
            finishNode = grid;
            console.log('h', AStar_1.h(startNode, finishNode));
        }
    }
});


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var mapConfig_1 = __webpack_require__(0);
exports.drawGrid = function (gridSize) {
    for (var y = 0; y <= mapConfig_1.HEIGHT; y += gridSize) {
        for (var x = 0; x <= mapConfig_1.WIDTH; x += gridSize) {
            mapConfig_1.ctx.strokeRect(x, y, gridSize, gridSize);
        }
    }
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var mapConfig_1 = __webpack_require__(0);
exports.createNodes = function (gridSize) {
    var map = [];
    var value = 1;
    var id = 0;
    for (var y = 0; y <= mapConfig_1.HEIGHT; y += gridSize) {
        for (var x = 0; x <= mapConfig_1.WIDTH; x += gridSize) {
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
exports.addNeighbours = function (map, gridSize) {
    for (var _i = 0, map_1 = map; _i < map_1.length; _i++) {
        var node = map_1[_i];
        var n = exports.neighbours(node, map, gridSize);
        node.neighbours = n;
    }
};
exports.neighbours = function (node, map, gridSize) {
    var dirs = [
        { x: -gridSize, y: -gridSize },
        { x: 0, y: -gridSize },
        { x: gridSize, y: -gridSize },
        { x: -gridSize, y: 0 },
        { x: gridSize, y: 0 },
        { x: -gridSize, y: gridSize },
        { x: 0, y: gridSize },
        { x: gridSize, y: gridSize }
    ];
    var result = [];
    for (var _i = 0, dirs_1 = dirs; _i < dirs_1.length; _i++) {
        var dir = dirs_1[_i];
        var neighbor = {
            x: node.x + dir.x,
            y: node.y + dir.y
        };
        if (neighbor.x >= 0 && neighbor.x < 1000 && neighbor.y >= 0 && neighbor.y < 600) {
            result.push({
                x: neighbor.x,
                y: neighbor.y,
            });
        }
    }
    return result;
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var mapConfig_1 = __webpack_require__(0);
exports.createMountains = function (map, startX, startY, width, height) {
    for (var _i = 0, map_1 = map; _i < map_1.length; _i++) {
        var node = map_1[_i];
    }
};
exports.showObstacles = function (map, gridSize) {
    for (var _i = 0, map_2 = map; _i < map_2.length; _i++) {
        var node = map_2[_i];
        if (node.value === 0) {
            mapConfig_1.ctx.fillStyle = '#8B4513';
            mapConfig_1.ctx.fillRect(node.topLeftX, node.topLeftY, gridSize, gridSize);
        }
    }
};
exports.neighbours = function (node) {
    var dirs = [
        [-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]
    ];
    var result = [];
    for (var _i = 0, dirs_1 = dirs; _i < dirs_1.length; _i++) {
        var dir = dirs_1[_i];
        result.push(node[0] + dir[0], node[1] + dir[1]);
    }
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.AStar = function (startNode, finishNode) {
    // the set of currently discovered nodes that are not evaluated yet
    // Initially only the start node is known
    var open = [];
    // the set of nodes that already evaluated
    var closet = [];
    open.push(startNode);
    // for each node, which node is can most efficiently be reached from
    // if a node can be reached from many nodes, cameFrom will eventially
    // contain the most efficient previous step
    var from = new Map();
    // For each node, the cost of getting from the start node to that node.
    var gScore = [];
    var fScore = [];
    gScore.push(startNode);
    gScore[startNode] = 0;
    fScore[startNode] = gScore[startNode] + exports.h(startNode, finishNode);
    while (open) {
        var current = exports.getMinFScore(open);
    }
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
exports.getMinFScore = function (open) {
    var min = 0;
    for (var i = 1; i < open.length - 1; ++i) {
        if (open[min] > open[i]) {
            min = i;
        }
    }
    return open[min];
};


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZmU3Y2QzZjVmNGI5MzdlZjhkMzAiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hcC9tYXBDb25maWcudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hcC9kcmF3R3JpZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFwL2NyZWF0ZU1hcC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFwL21hcFV0aWxzLnRzIiwid2VicGFjazovLy8uL3NyYy9wYXRoL0FTdGFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7OztBQzdEQSxtQkFBbUI7QUFDTixhQUFLLEdBQVcsSUFBSSxDQUFDO0FBQ3JCLGNBQU0sR0FBVyxHQUFHLENBQUM7QUFFbEMsZ0JBQWdCO0FBQ0wsY0FBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDckQsY0FBTSxDQUFDLEVBQUUsR0FBRyxRQUFRLENBQUM7QUFDckIsY0FBTSxDQUFDLEtBQUssR0FBRyxhQUFLLENBQUM7QUFDckIsY0FBTSxDQUFDLE1BQU0sR0FBRyxjQUFNLENBQUM7QUFDdkIsY0FBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsV0FBVyxD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Q0FBQyxDQUFDLENBQUM7SUFDOUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDekQsQ0FBQztBQUVZLG9CQUFZLEdBQUcsVUFBQyxJQUFXO0lBQ3RDLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQztJQUNaLEdBQUcsRUFBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUM7UUFDeEMsRUFBRSxFQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDVixDQUFDO0lBQ0gsQ0FBQztJQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDbkIsQ0FBQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBmZTdjZDNmNWY0YjkzN2VmOGQzMCIsIi8vIGdsb2JhbCB2YXJpYWJsZXNcbmV4cG9ydCBjb25zdCBXSURUSDogbnVtYmVyID0gMTAwMDtcbmV4cG9ydCBjb25zdCBIRUlHSFQ6IG51bWJlciA9IDYwMDtcblxuLy8gY3JlYXRlIENhbnZhc1xuZXhwb3J0IGxldCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbmNhbnZhcy5pZCA9IFwiY2FudmFzXCI7XG5jYW52YXMud2lkdGggPSBXSURUSDtcbmNhbnZhcy5oZWlnaHQgPSBIRUlHSFQ7XG5jYW52YXMuc3R5bGUuYm9yZGVyID0gXCIxcHggc29saWRcIjtcblxuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjYW52YXMpO1xuXG4vLyBkZWZpbmUgMmQgY29udGV4dFxuZXhwb3J0IGxldCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21hcC9tYXBDb25maWcudHMiLCJpbXBvcnQge2NhbnZhcywgY3R4fSBmcm9tICcuL21hcC9tYXBDb25maWcnO1xuaW1wb3J0IHtkcmF3R3JpZH0gZnJvbSAnLi9tYXAvZHJhd0dyaWQnO1xuaW1wb3J0IHthZGROZWlnaGJvdXJzLCBjcmVhdGVOb2Rlc30gZnJvbSAnLi9tYXAvY3JlYXRlTWFwJztcbmltcG9ydCB7c2hvd09ic3RhY2xlc30gZnJvbSAnLi9tYXAvbWFwVXRpbHMnO1xuaW1wb3J0IHtofSBmcm9tICcuL3BhdGgvQVN0YXInO1xuXG5sZXQgZ3JpZFNpemUgPSAyMDtcblxuZHJhd0dyaWQoZ3JpZFNpemUpO1xubGV0IG1hcCA9IGNyZWF0ZU5vZGVzKGdyaWRTaXplKTtcbmFkZE5laWdoYm91cnMobWFwLCBncmlkU2l6ZSk7XG5zaG93T2JzdGFjbGVzKG1hcCwgZ3JpZFNpemUpO1xuY29uc29sZS5sb2cobWFwKTtcblxubGV0IHN0YXJ0Tm9kZTphbnk7XG5sZXQgZmluaXNoTm9kZTphbnk7XG5cbmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gIGNvbnNvbGUuZXJyb3IoJ0NsaWNrJyk7XG4gIGxldCB4ID0gZS5vZmZzZXRYOyAvLyBnZXQgWFxuICBsZXQgeSA9IGUub2Zmc2V0WTsgLy8gZ2V0IFlcbiAgY29uc29sZS5sb2coJ1Bvc2l0aW9uIHgnLCBlLm9mZnNldFgpOyAvLyBnZXQgWFxuICBjb25zb2xlLmxvZygnUG9zaXRpb24geScsIGUub2Zmc2V0WSk7IC8vIGdldCBZXG4gIGZvcihsZXQgZ3JpZCBvZiBtYXApIHtcbiAgICBsZXQgYm90dG9tUmlnaHRYID0gZ3JpZC54ICsgZ3JpZFNpemU7XG4gICAgbGV0IGJvdHRvbVJpZ2h0WSA9IGdyaWQueSArIGdyaWRTaXplO1xuICAgIGlmKHggPj0gZ3JpZC54ICYmIHggPCBib3R0b21SaWdodFggJiYgeSA+PSBncmlkLnkgJiYgeSA8IGJvdHRvbVJpZ2h0WSkge1xuICAgICAgY3R4LmZpbGxTdHlsZSA9ICdncmVlbic7XG4gICAgICBjdHguZmlsbFJlY3QoZ3JpZC54LCBncmlkLnksIGdyaWRTaXplICwgZ3JpZFNpemUpO1xuICAgICAgc3RhcnROb2RlID0gZ3JpZDtcbiAgICAgIGNvbnNvbGUubG9nKCdncmlkJywgZ3JpZCwgJ3dhcyBjbGlja2VkJyk7XG4gICAgfVxuICB9XG59KTtcblxuLy8gc2V0IG9uQ2xpY2tMaXN0ZW5lciBmb3IgcmlnaHQgbW91c2UgZXZlbnRcbmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdjb250ZXh0bWVudScsIChlKSA9PiB7XG4gIGNvbnNvbGUuZXJyb3IoJ1JpZ2h0IE1vdXNlIENsaWNrJyk7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgbGV0IHggPSBlLm9mZnNldFg7IC8vIGdldCBYXG4gIGxldCB5ID0gZS5vZmZzZXRZOyAvLyBnZXQgWVxuXG4gIGZvcihsZXQgZ3JpZCBvZiBtYXApIHtcbiAgICBsZXQgYm90dG9tUmlnaHRYID0gZ3JpZC54ICsgZ3JpZFNpemU7XG4gICAgbGV0IGJvdHRvbVJpZ2h0WSA9IGdyaWQueSArIGdyaWRTaXplO1xuICAgIGlmKHggPj0gZ3JpZC54ICYmIHggPCBib3R0b21SaWdodFggJiYgeSA+PSBncmlkLnkgJiYgeSA8IGJvdHRvbVJpZ2h0WSkge1xuICAgICAgY3R4LmZpbGxTdHlsZSA9ICdyZWQnO1xuICAgICAgY3R4LmZpbGxSZWN0KGdyaWQueCwgZ3JpZC55LCBncmlkU2l6ZSwgZ3JpZFNpemUpO1xuICAgICAgY29uc29sZS5sb2coJ2dyaWQnLCBncmlkLCAnd2FzIGNsaWNrZWQnKTtcbiAgICAgIGZpbmlzaE5vZGUgPSBncmlkO1xuICAgICAgY29uc29sZS5sb2coJ2gnLCBoKHN0YXJ0Tm9kZSwgZmluaXNoTm9kZSkpO1xuICAgIH1cbiAgfVxufSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZ2FtZS50cyIsImltcG9ydCB7XG4gIGNhbnZhcyxcbiAgY3R4LFxuICBXSURUSCxcbiAgSEVJR0hUXG59IGZyb20gJy4vbWFwQ29uZmlnJztcblxuZXhwb3J0IGNvbnN0IGRyYXdHcmlkID0gKGdyaWRTaXplOm51bWJlcikgPT4ge1xuICBmb3IobGV0IHkgPSAwOyB5IDw9IEhFSUdIVDsgeSs9IGdyaWRTaXplKSB7XG4gICAgZm9yKGxldCB4ID0gMDsgeCA8PSBXSURUSDsgeCs9IGdyaWRTaXplKSB7XG4gICAgICBjdHguc3Ryb2tlUmVjdCh4LCB5LCBncmlkU2l6ZSwgZ3JpZFNpemUpO1xuICAgIH1cbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21hcC9kcmF3R3JpZC50cyIsImltcG9ydCB7XG4gIGNhbnZhcyxcbiAgY3R4LFxuICBXSURUSCxcbiAgSEVJR0hUXG59IGZyb20gJy4uL21hcC9tYXBDb25maWcnO1xuXG5leHBvcnQgY29uc3QgY3JlYXRlTm9kZXMgPSAoZ3JpZFNpemU6bnVtYmVyKSA9PiB7XG4gIGxldCBtYXA6YW55W10gPSBbXTtcbiAgbGV0IHZhbHVlID0gMTtcbiAgbGV0IGlkID0gMDtcbiAgZm9yKGxldCB5ID0gMDsgeSA8PSBIRUlHSFQ7IHkrPSBncmlkU2l6ZSkge1xuICAgIGZvcihsZXQgeCA9IDA7IHggPD0gV0lEVEg7IHgrPSBncmlkU2l6ZSkge1xuICAgICAgbWFwLnB1c2goe1xuICAgICAgICBpZDogaWQsXG4gICAgICAgIHg6IHgsXG4gICAgICAgIHk6IHksXG4gICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgbmVpZ2hib3VyczogW11cbiAgICAgIH0pO1xuICAgICAgaWQrKztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG1hcDtcbn1cblxuZXhwb3J0IGNvbnN0IGFkZE5laWdoYm91cnMgPSAobWFwOmFueVtdLCBncmlkU2l6ZTpudW1iZXIpID0+IHtcbiAgZm9yKGxldCBub2RlIG9mIG1hcCkge1xuICAgIGxldCBuID0gbmVpZ2hib3Vycyhub2RlLCBtYXAsIGdyaWRTaXplKTtcbiAgICBub2RlLm5laWdoYm91cnMgPSBuO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBuZWlnaGJvdXJzID0gKG5vZGU6YW55LCBtYXA6YW55W10sIGdyaWRTaXplOm51bWJlcikgPT4ge1xuICBsZXQgZGlycyA9IFtcbiAgICB7eDogLWdyaWRTaXplLCB5OiAtZ3JpZFNpemV9LFxuICAgIHt4OiAwLCB5OiAtZ3JpZFNpemV9LFxuICAgIHt4OiBncmlkU2l6ZSwgeTogLWdyaWRTaXplfSxcbiAgICB7eDogLWdyaWRTaXplLCB5OiAwfSxcbiAgICB7eDogZ3JpZFNpemUsIHk6IDB9LFxuICAgIHt4OiAtZ3JpZFNpemUsIHk6IGdyaWRTaXplfSxcbiAgICB7eDogMCwgeTogZ3JpZFNpemV9LFxuICAgIHt4OiBncmlkU2l6ZSwgeTogZ3JpZFNpemV9XG4gIF07XG4gIGxldCByZXN1bHQgPSBbXTtcbiAgZm9yKGxldCBkaXIgb2YgZGlycykge1xuICAgIGxldCBuZWlnaGJvciA9IHtcbiAgICAgIHg6IG5vZGUueCArIGRpci54LFxuICAgICAgeTogbm9kZS55ICsgZGlyLnlcbiAgICB9XG4gICAgaWYobmVpZ2hib3IueCA+PSAwICYmIG5laWdoYm9yLnggPCAxMDAwICYmIG5laWdoYm9yLnkgPj0gMCAmJiBuZWlnaGJvci55IDwgNjAwKSB7XG4gICAgICByZXN1bHQucHVzaCh7XG4gICAgICAgIHg6IG5laWdoYm9yLngsXG4gICAgICAgIHk6IG5laWdoYm9yLnksXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tYXAvY3JlYXRlTWFwLnRzIiwiaW1wb3J0IHtjYW52YXMsIGN0eH0gZnJvbSAnLi9tYXBDb25maWcnO1xuXG5leHBvcnQgY29uc3QgY3JlYXRlTW91bnRhaW5zID0gKG1hcDphbnlbXSwgc3RhcnRYOm51bWJlciwgc3RhcnRZOm51bWJlciwgd2lkdGg6bnVtYmVyLCBoZWlnaHQ6bnVtYmVyKSA9PiB7XG5cbiAgZm9yKGxldCBub2RlIG9mIG1hcCkge1xuXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHNob3dPYnN0YWNsZXMgPSAobWFwOmFueVtdLCBncmlkU2l6ZTpudW1iZXIpID0+IHtcbiAgZm9yKGxldCBub2RlIG9mIG1hcCkge1xuICAgIGlmKG5vZGUudmFsdWUgPT09IDApIHtcbiAgICAgIGN0eC5maWxsU3R5bGUgPSAnIzhCNDUxMyc7XG4gICAgICBjdHguZmlsbFJlY3Qobm9kZS50b3BMZWZ0WCwgbm9kZS50b3BMZWZ0WSwgZ3JpZFNpemUsIGdyaWRTaXplKVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY29uc3QgbmVpZ2hib3VycyA9IChub2RlOmFueSkgPT4ge1xuICBsZXQgZGlycyA9IFtcbiAgICBbLTEsIC0xXSwgWzAsIC0xXSwgWzEsIC0xXSwgWy0xLCAwXSwgWzEsIDBdLCBbLTEsIDFdLCBbMCwgMV0sIFsxLCAxXVxuICBdO1xuICBsZXQgcmVzdWx0ID0gW107XG4gIGZvcihsZXQgZGlyIG9mIGRpcnMpIHtcbiAgICByZXN1bHQucHVzaChub2RlWzBdICsgZGlyWzBdLCBub2RlWzFdICsgZGlyWzFdKVxuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFwL21hcFV0aWxzLnRzIiwiZXhwb3J0IGNvbnN0IEFTdGFyID0gKHN0YXJ0Tm9kZTphbnksIGZpbmlzaE5vZGU6YW55KSA9PiB7XG4gIC8vIHRoZSBzZXQgb2YgY3VycmVudGx5IGRpc2NvdmVyZWQgbm9kZXMgdGhhdCBhcmUgbm90IGV2YWx1YXRlZCB5ZXRcbiAgLy8gSW5pdGlhbGx5IG9ubHkgdGhlIHN0YXJ0IG5vZGUgaXMga25vd25cbiAgbGV0IG9wZW4gPSBbXTtcblxuICAvLyB0aGUgc2V0IG9mIG5vZGVzIHRoYXQgYWxyZWFkeSBldmFsdWF0ZWRcbiAgbGV0IGNsb3NldCA9IFtdO1xuICBvcGVuLnB1c2goc3RhcnROb2RlKTtcblxuICAvLyBmb3IgZWFjaCBub2RlLCB3aGljaCBub2RlIGlzIGNhbiBtb3N0IGVmZmljaWVudGx5IGJlIHJlYWNoZWQgZnJvbVxuICAvLyBpZiBhIG5vZGUgY2FuIGJlIHJlYWNoZWQgZnJvbSBtYW55IG5vZGVzLCBjYW1lRnJvbSB3aWxsIGV2ZW50aWFsbHlcbiAgLy8gY29udGFpbiB0aGUgbW9zdCBlZmZpY2llbnQgcHJldmlvdXMgc3RlcFxuICBsZXQgZnJvbSA9IG5ldyBNYXAoKTtcblxuICAvLyBGb3IgZWFjaCBub2RlLCB0aGUgY29zdCBvZiBnZXR0aW5nIGZyb20gdGhlIHN0YXJ0IG5vZGUgdG8gdGhhdCBub2RlLlxuICBsZXQgZ1Njb3JlID0gW107XG4gIGxldCBmU2NvcmUgPSBbXTtcblxuICBnU2NvcmUucHVzaChzdGFydE5vZGUpO1xuICBnU2NvcmVbc3RhcnROb2RlXSA9IDA7XG4gIGZTY29yZVtzdGFydE5vZGVdID0gZ1Njb3JlW3N0YXJ0Tm9kZV0gKyBoKHN0YXJ0Tm9kZSwgZmluaXNoTm9kZSk7XG5cbiAgd2hpbGUob3Blbikge1xuICAgIGxldCBjdXJyZW50ID0gZ2V0TWluRlNjb3JlKG9wZW4pO1xuICB9XG5cblxufVxuXG5leHBvcnQgY29uc3QgaCA9IChzdGFydE5vZGU6YW55LCBmaW5pc2hOb2RlOmFueSkgPT4ge1xuLy9mdW5jdGlvbiBoZXVyaXN0aWMobm9kZSkgPVxuICAvLyBkeCA9IGFicyhub2RlLnggLSBnb2FsLngpXG4gIC8vIGR5ID0gYWJzKG5vZGUueSAtIGdvYWwueSlcbiAgLy8gcmV0dXJuIEQgKiAoZHggKyBkeSkgKyAoRDIgLSAyICogRCkgKiBtaW4oZHgsIGR5KVxuICBsZXQgRCA9IDEwOyAvLyBjb3N0IG9mIG1vdmluZyBob3Jpem9udGFsbHlcbiAgbGV0IEQyID0gMTQ7IC8vIGNvc3Qgb2YgbW92aW5nIGRpYWdvbmFsbHlcbiAgbGV0IGR4ID0gTWF0aC5hYnMoc3RhcnROb2RlLnggLSBmaW5pc2hOb2RlLngpO1xuICBsZXQgZHkgPSBNYXRoLmFicyhzdGFydE5vZGUueSAtIGZpbmlzaE5vZGUueSk7XG4gIHJldHVybiBEICogKGR4ICsgZHkpICsgKEQyIC0gMiAqIEQpICogTWF0aC5taW4oZHgsIGR5KTtcbn1cblxuZXhwb3J0IGNvbnN0IGdldE1pbkZTY29yZSA9IChvcGVuOiBhbnlbXSkgPT4ge1xuICBsZXQgbWluID0gMDtcbiAgZm9yKGxldCBpID0gMTsgaSA8IG9wZW4ubGVuZ3RoIC0gMTsgKytpKSB7XG4gICAgaWYob3BlblttaW5dID4gb3BlbltpXSkge1xuICAgICAgbWluID0gaTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG9wZW5bbWluXTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9wYXRoL0FTdGFyLnRzIl0sInNvdXJjZVJvb3QiOiIifQ==