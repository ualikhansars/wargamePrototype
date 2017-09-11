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
exports.gridSize = 100;
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
var AStar_1 = __webpack_require__(4);
var gridSize = 100;
drawGrid_1.drawGrid();
console.log(createMap_1.map);
var startNode;
var finishNode;
mapConfig_1.canvas.addEventListener('click', function (e) {
    console.error('Click');
    var x = e.offsetX; // get X
    var y = e.offsetY; // get Y
    console.log('Position x', e.offsetX); // get X
    console.log('Position y', e.offsetY); // get Y
    for (var _i = 0, map_1 = createMap_1.map; _i < map_1.length; _i++) {
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
    for (var _i = 0, map_2 = createMap_1.map; _i < map_2.length; _i++) {
        var grid = map_2[_i];
        var bottomRightX = grid.x + gridSize;
        var bottomRightY = grid.y + gridSize;
        if (x >= grid.x && x < bottomRightX && y >= grid.y && y < bottomRightY) {
            mapConfig_1.ctx.fillStyle = 'red';
            mapConfig_1.ctx.fillRect(grid.x, grid.y, gridSize, gridSize);
            console.log('grid', grid, 'was clicked');
            finishNode = grid;
            console.log('h', AStar_1.h(startNode, finishNode));
            AStar_1.aStar(startNode, finishNode);
        }
    }
});


/***/ }),
/* 2 */
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var mapConfig_1 = __webpack_require__(0);
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
        var neighbor = {
            x: node.x + dir.x,
            y: node.y + dir.y,
            distance: dir.distance
        };
        if (neighbor.x >= 0 && neighbor.x < 1000 && neighbor.y >= 0 && neighbor.y < 600) {
            for (var _a = 0, map_1 = exports.map; _a < map_1.length; _a++) {
                var node_1 = map_1[_a];
                if (neighbor.x === node_1.x && neighbor.y) {
                    result.push(node_1);
                }
            }
            // result.push({
            //   x: neighbor.x,
            //   y: neighbor.y,
            //   distance: neighbor.distance,
            // });
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
exports.map = exports.createNodes();
exports.addNeighbours(exports.map);


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
        var current = exports.getMinFScore(open);
        console.log('current', current);
        if (current.x === finishNode.x && current.y === finishNode.y) {
            return exports.reconstructPath(from, current);
        }
        open = exports.deleteObjectFromArray(current, open);
        closed.push(current);
        for (var _i = 0, _a = exports.unclosedNeigbours(current, closed); _i < _a.length; _i++) {
            var neighbour = _a[_i];
            var tempG = current.gScore + neighbour.distance;
            if (!exports.isObjectInArray(neighbour, open) || tempG < neighbour.gScore) {
                from.set(neighbour, current);
                neighbour.gScore = tempG;
                neighbour.fScore = neighbour.gScore + exports.h(neighbour, finishNode);
            }
            if (!exports.isObjectInArray(neighbour, open)) {
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
// export const getMinFScore = (map:any) => {
//   let open:any[] = Array.from(map);
//   let min = 0;
//   for(let i = 1; i < open.length - 1; ++i) {
//     if(open[min][1] > open[i][1]) {
//       min = i;
//     }
//   }
//   return open[min];
// }
exports.getMinFScore = function (open) {
    var min = 0;
    for (var i = 1; i < open.length - 1; ++i) {
        if (open[min].fScore > open[i].fScore) {
            min = i;
        }
    }
    return open[min];
};
exports.reconstructPath = function (from, current) {
    console.log('reconstructPath from:', from);
    console.log('reconstructPath current', current);
};
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


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMzk2NjA3YzZhOGUxNjVlYzIwNDAiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hcC9tYXBDb25maWcudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hcC9kcmF3R3JpZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFwL2NyZWF0ZU1hcC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcGF0aC9BU3Rhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUM3REEsbUJBQW1CO0FBQ04sYUFBSyxHQUFXLElBQUksQ0FBQztBQUNyQixjQUFNLEdBQVcsR0FBRyxDQUFDO0FBQ3JCLGdCQUFRLEdBQVUsR0FBRyxDQUFDO0FBRW5DLGdCQUFnQjtBQUNMLGNBQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3JELGNBQU0sQ0FBQyxFQUFFLEdBQUcsUUFBUSxDQUFDO0FBQ3JCLGNBQU0sQ0FBQyxLQUFLLEdBQUcsYUFBSyxDQUFDO0FBQ3JCLGNBQU0sQ0FBQyxNQUFNLEdBQUcsY0FBTSxDQUFDO0FBQ3ZCLGNBQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLFdBQVcsQ0FBQztBQUVs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QyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsSUFBSSxTQUFTLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNwRCxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQ3BCLENBQUM7U0FDRjtRQUNELEVBQUUsRUFBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDZixxQkFBcUIsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDeEMsQ0FBQztLQUNGO0lBQ0QsTUFBTSxDQUFDLHFCQUFxQixDQUFDO0FBQy9CLENBQUMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMzk2NjA3YzZhOGUxNjVlYzIwNDAiLCIvLyBnbG9iYWwgdmFyaWFibGVzXG5leHBvcnQgY29uc3QgV0lEVEg6IG51bWJlciA9IDEwMDA7XG5leHBvcnQgY29uc3QgSEVJR0hUOiBudW1iZXIgPSA2MDA7XG5leHBvcnQgY29uc3QgZ3JpZFNpemU6bnVtYmVyID0gMTAwO1xuXG4vLyBjcmVhdGUgQ2FudmFzXG5leHBvcnQgbGV0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuY2FudmFzLmlkID0gXCJjYW52YXNcIjtcbmNhbnZhcy53aWR0aCA9IFdJRFRIO1xuY2FudmFzLmhlaWdodCA9IEhFSUdIVDtcbmNhbnZhcy5zdHlsZS5ib3JkZXIgPSBcIjFweCBzb2xpZFwiO1xuXG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNhbnZhcyk7XG5cbi8vIGRlZmluZSAyZCBjb250ZXh0XG5leHBvcnQgbGV0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFwL21hcENvbmZpZy50cyIsImltcG9ydCB7Y2FudmFzLCBjdHh9IGZyb20gJy4vbWFwL21hcENvbmZpZyc7XG5pbXBvcnQge2RyYXdHcmlkfSBmcm9tICcuL21hcC9kcmF3R3JpZCc7XG5pbXBvcnQge1xuICBhZGROZWlnaGJvdXJzLFxuICBjcmVhdGVOb2RlcyxcbiAgbWFwXG59IGZyb20gJy4vbWFwL2NyZWF0ZU1hcCc7XG5pbXBvcnQge3Nob3dPYnN0YWNsZXN9IGZyb20gJy4vbWFwL21hcFV0aWxzJztcbmltcG9ydCB7aCwgYVN0YXJ9IGZyb20gJy4vcGF0aC9BU3Rhcic7XG5cbmxldCBncmlkU2l6ZSA9IDEwMDtcblxuZHJhd0dyaWQoKTtcbmNvbnNvbGUubG9nKG1hcCk7XG5cbmxldCBzdGFydE5vZGU6YW55O1xubGV0IGZpbmlzaE5vZGU6YW55O1xuXG5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICBjb25zb2xlLmVycm9yKCdDbGljaycpO1xuICBsZXQgeCA9IGUub2Zmc2V0WDsgLy8gZ2V0IFhcbiAgbGV0IHkgPSBlLm9mZnNldFk7IC8vIGdldCBZXG4gIGNvbnNvbGUubG9nKCdQb3NpdGlvbiB4JywgZS5vZmZzZXRYKTsgLy8gZ2V0IFhcbiAgY29uc29sZS5sb2coJ1Bvc2l0aW9uIHknLCBlLm9mZnNldFkpOyAvLyBnZXQgWVxuICBmb3IobGV0IGdyaWQgb2YgbWFwKSB7XG4gICAgbGV0IGJvdHRvbVJpZ2h0WCA9IGdyaWQueCArIGdyaWRTaXplO1xuICAgIGxldCBib3R0b21SaWdodFkgPSBncmlkLnkgKyBncmlkU2l6ZTtcbiAgICBpZih4ID49IGdyaWQueCAmJiB4IDwgYm90dG9tUmlnaHRYICYmIHkgPj0gZ3JpZC55ICYmIHkgPCBib3R0b21SaWdodFkpIHtcbiAgICAgIGN0eC5maWxsU3R5bGUgPSAnZ3JlZW4nO1xuICAgICAgY3R4LmZpbGxSZWN0KGdyaWQueCwgZ3JpZC55LCBncmlkU2l6ZSAsIGdyaWRTaXplKTtcbiAgICAgIHN0YXJ0Tm9kZSA9IGdyaWQ7XG4gICAgICBjb25zb2xlLmxvZygnZ3JpZCcsIGdyaWQsICd3YXMgY2xpY2tlZCcpO1xuICAgIH1cbiAgfVxufSk7XG5cbi8vIHNldCBvbkNsaWNrTGlzdGVuZXIgZm9yIHJpZ2h0IG1vdXNlIGV2ZW50XG5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignY29udGV4dG1lbnUnLCAoZSkgPT4ge1xuICBjb25zb2xlLmVycm9yKCdSaWdodCBNb3VzZSBDbGljaycpO1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIGxldCB4ID0gZS5vZmZzZXRYOyAvLyBnZXQgWFxuICBsZXQgeSA9IGUub2Zmc2V0WTsgLy8gZ2V0IFlcblxuICBmb3IobGV0IGdyaWQgb2YgbWFwKSB7XG4gICAgbGV0IGJvdHRvbVJpZ2h0WCA9IGdyaWQueCArIGdyaWRTaXplO1xuICAgIGxldCBib3R0b21SaWdodFkgPSBncmlkLnkgKyBncmlkU2l6ZTtcbiAgICBpZih4ID49IGdyaWQueCAmJiB4IDwgYm90dG9tUmlnaHRYICYmIHkgPj0gZ3JpZC55ICYmIHkgPCBib3R0b21SaWdodFkpIHtcbiAgICAgIGN0eC5maWxsU3R5bGUgPSAncmVkJztcbiAgICAgIGN0eC5maWxsUmVjdChncmlkLngsIGdyaWQueSwgZ3JpZFNpemUsIGdyaWRTaXplKTtcbiAgICAgIGNvbnNvbGUubG9nKCdncmlkJywgZ3JpZCwgJ3dhcyBjbGlja2VkJyk7XG4gICAgICBmaW5pc2hOb2RlID0gZ3JpZDtcbiAgICAgIGNvbnNvbGUubG9nKCdoJywgaChzdGFydE5vZGUsIGZpbmlzaE5vZGUpKTtcbiAgICAgIGFTdGFyKHN0YXJ0Tm9kZSwgZmluaXNoTm9kZSk7XG4gICAgfVxuICB9XG59KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9nYW1lLnRzIiwiaW1wb3J0IHtcbiAgY2FudmFzLFxuICBjdHgsXG4gIFdJRFRILFxuICBIRUlHSFQsXG4gIGdyaWRTaXplXG59IGZyb20gJy4vbWFwQ29uZmlnJztcblxuZXhwb3J0IGNvbnN0IGRyYXdHcmlkID0gKCkgPT4ge1xuICBmb3IobGV0IHkgPSAwOyB5IDw9IEhFSUdIVDsgeSs9IGdyaWRTaXplKSB7XG4gICAgZm9yKGxldCB4ID0gMDsgeCA8PSBXSURUSDsgeCs9IGdyaWRTaXplKSB7XG4gICAgICBjdHguc3Ryb2tlUmVjdCh4LCB5LCBncmlkU2l6ZSwgZ3JpZFNpemUpO1xuICAgIH1cbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21hcC9kcmF3R3JpZC50cyIsImltcG9ydCB7XG4gIGNhbnZhcyxcbiAgY3R4LFxuICBXSURUSCxcbiAgSEVJR0hULFxuICBncmlkU2l6ZVxufSBmcm9tICcuLi9tYXAvbWFwQ29uZmlnJztcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZU5vZGVzID0gKCkgPT4ge1xuICBsZXQgbWFwOmFueVtdID0gW107XG4gIGxldCB2YWx1ZSA9IDE7XG4gIGxldCBpZCA9IDA7XG4gIGZvcihsZXQgeSA9IDA7IHkgPD0gSEVJR0hUOyB5Kz0gZ3JpZFNpemUpIHtcbiAgICBmb3IobGV0IHggPSAwOyB4IDw9IFdJRFRIOyB4Kz0gZ3JpZFNpemUpIHtcbiAgICAgIG1hcC5wdXNoKHtcbiAgICAgICAgaWQ6IGlkLFxuICAgICAgICB4OiB4LFxuICAgICAgICB5OiB5LFxuICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgIG5laWdoYm91cnM6IFtdXG4gICAgICB9KTtcbiAgICAgIGlkKys7XG4gICAgfVxuICB9XG4gIHJldHVybiBtYXA7XG59XG5cbmV4cG9ydCBjb25zdCBuZWlnaGJvdXJzID0gKG5vZGU6YW55KSA9PiB7XG4gIGxldCBkaXJzID0gW1xuICAgIHt4OiAtZ3JpZFNpemUsIHk6IC1ncmlkU2l6ZSwgZGlzdGFuY2U6IDE0fSxcbiAgICB7eDogMCwgeTogLWdyaWRTaXplLCBkaXN0YW5jZTogMTB9LFxuICAgIHt4OiBncmlkU2l6ZSwgeTogLWdyaWRTaXplLCBkaXN0YW5jZTogMTR9LFxuICAgIHt4OiAtZ3JpZFNpemUsIHk6IDAsIGRpc3RhbmNlOiAxMH0sXG4gICAge3g6IGdyaWRTaXplLCB5OiAwLCBkaXN0YW5jZTogMTB9LFxuICAgIHt4OiAtZ3JpZFNpemUsIHk6IGdyaWRTaXplLCBkaXN0YW5jZTogMTR9LFxuICAgIHt4OiAwLCB5OiBncmlkU2l6ZSwgZGlzdGFuY2U6IDEwfSxcbiAgICB7eDogZ3JpZFNpemUsIHk6IGdyaWRTaXplLCBkaXN0YW5jZTogMTR9XG4gIF07XG4gIGxldCByZXN1bHQgPSBbXTtcbiAgZm9yKGxldCBkaXIgb2YgZGlycykge1xuICAgIGxldCBuZWlnaGJvciA9IHtcbiAgICAgIHg6IG5vZGUueCArIGRpci54LFxuICAgICAgeTogbm9kZS55ICsgZGlyLnksXG4gICAgICBkaXN0YW5jZTogZGlyLmRpc3RhbmNlXG4gICAgfVxuICAgIGlmKG5laWdoYm9yLnggPj0gMCAmJiBuZWlnaGJvci54IDwgMTAwMCAmJiBuZWlnaGJvci55ID49IDAgJiYgbmVpZ2hib3IueSA8IDYwMCkge1xuICAgICAgZm9yKGxldCBub2RlIG9mIG1hcCkge1xuICAgICAgICBpZihuZWlnaGJvci54ID09PSBub2RlLnggJiYgbmVpZ2hib3IueSApIHtcbiAgICAgICAgICByZXN1bHQucHVzaChub2RlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gcmVzdWx0LnB1c2goe1xuICAgICAgLy8gICB4OiBuZWlnaGJvci54LFxuICAgICAgLy8gICB5OiBuZWlnaGJvci55LFxuICAgICAgLy8gICBkaXN0YW5jZTogbmVpZ2hib3IuZGlzdGFuY2UsXG4gICAgICAvLyB9KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGNvbnN0IGFkZE5laWdoYm91cnMgPSAobWFwOmFueVtdKSA9PiB7XG4gIGZvcihsZXQgbm9kZSBvZiBtYXApIHtcbiAgICBsZXQgbiA9IG5laWdoYm91cnMobm9kZSk7XG4gICAgbm9kZS5uZWlnaGJvdXJzID0gbjtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgbWFwID0gY3JlYXRlTm9kZXMoKTtcbmFkZE5laWdoYm91cnMobWFwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tYXAvY3JlYXRlTWFwLnRzIiwiZXhwb3J0IGNvbnN0IGFTdGFyID0gKHN0YXJ0Tm9kZTphbnksIGZpbmlzaE5vZGU6YW55KSA9PiB7XG4gIC8vIHRoZSBzZXQgb2YgY3VycmVudGx5IGRpc2NvdmVyZWQgbm9kZXMgdGhhdCBhcmUgbm90IGV2YWx1YXRlZCB5ZXRcbiAgLy8gSW5pdGlhbGx5IG9ubHkgdGhlIHN0YXJ0IG5vZGUgaXMga25vd25cbiAgbGV0IG9wZW46YW55W10gPSBbXTtcblxuICAvLyB0aGUgc2V0IG9mIG5vZGVzIHRoYXQgYWxyZWFkeSBldmFsdWF0ZWRcbiAgbGV0IGNsb3NlZDphbnlbXSA9IFtdO1xuICBzdGFydE5vZGUuZ1Njb3JlID0gMDtcbiAgc3RhcnROb2RlLmZTY29yZSA9IHN0YXJ0Tm9kZS5nU2NvcmUgKyBoKHN0YXJ0Tm9kZSwgZmluaXNoTm9kZSlcbiAgb3Blbi5wdXNoKHN0YXJ0Tm9kZSk7XG5cbiAgLy8gZm9yIGVhY2ggbm9kZSwgd2hpY2ggbm9kZSBpcyBjYW4gbW9zdCBlZmZpY2llbnRseSBiZSByZWFjaGVkIGZyb21cbiAgLy8gaWYgYSBub2RlIGNhbiBiZSByZWFjaGVkIGZyb20gbWFueSBub2RlcywgY2FtZUZyb20gd2lsbCBldmVudGlhbGx5XG4gIC8vIGNvbnRhaW4gdGhlIG1vc3QgZWZmaWNpZW50IHByZXZpb3VzIHN0ZXBcbiAgbGV0IGZyb20gPSBuZXcgTWFwKCk7XG5cbiAgLy8gRm9yIGVhY2ggbm9kZSwgdGhlIGNvc3Qgb2YgZ2V0dGluZyBmcm9tIHRoZSBzdGFydCBub2RlIHRvIHRoYXQgbm9kZS5cbiAgLy8gbGV0IGdTY29yZSA9IG5ldyBNYXAoKTtcbiAgLy8gbGV0IGZTY29yZSA9IG5ldyBNYXAoKTtcbiAgLy9cbiAgLy8gZ1Njb3JlLnNldChzdGFydE5vZGUsIDApO1xuICAvLyBmU2NvcmUuc2V0KHN0YXJ0Tm9kZSwgZ1Njb3JlLmdldChzdGFydE5vZGUpICsgaChzdGFydE5vZGUsIGZpbmlzaE5vZGUpKTtcbiAgd2hpbGUob3Blbikge1xuICAgIGxldCBjdXJyZW50OmFueSA9IGdldE1pbkZTY29yZShvcGVuKTtcbiAgICBjb25zb2xlLmxvZygnY3VycmVudCcsIGN1cnJlbnQpO1xuICAgIGlmKGN1cnJlbnQueCA9PT0gZmluaXNoTm9kZS54ICYmIGN1cnJlbnQueSA9PT0gZmluaXNoTm9kZS55KSB7XG4gICAgICByZXR1cm4gcmVjb25zdHJ1Y3RQYXRoKGZyb20sIGN1cnJlbnQpO1xuICAgIH1cbiAgICBvcGVuID0gZGVsZXRlT2JqZWN0RnJvbUFycmF5KGN1cnJlbnQsIG9wZW4pO1xuICAgIGNsb3NlZC5wdXNoKGN1cnJlbnQpO1xuICAgIGZvcihsZXQgbmVpZ2hib3VyIG9mIHVuY2xvc2VkTmVpZ2JvdXJzKGN1cnJlbnQsIGNsb3NlZCkpIHtcbiAgICAgIGxldCB0ZW1wRyA9IGN1cnJlbnQuZ1Njb3JlICsgbmVpZ2hib3VyLmRpc3RhbmNlO1xuICAgICAgaWYoIWlzT2JqZWN0SW5BcnJheShuZWlnaGJvdXIsIG9wZW4pIHx8IHRlbXBHIDwgbmVpZ2hib3VyLmdTY29yZSkge1xuICAgICAgICBmcm9tLnNldChuZWlnaGJvdXIsIGN1cnJlbnQpO1xuICAgICAgICBuZWlnaGJvdXIuZ1Njb3JlID0gdGVtcEc7XG4gICAgICAgIG5laWdoYm91ci5mU2NvcmUgPSBuZWlnaGJvdXIuZ1Njb3JlICsgaChuZWlnaGJvdXIsIGZpbmlzaE5vZGUpO1xuICAgICAgfVxuICAgICAgaWYoIWlzT2JqZWN0SW5BcnJheShuZWlnaGJvdXIsIG9wZW4pKSB7IC8vIGNyZWF0ZSBmdW5jdGlvblxuICAgICAgICBvcGVuLnB1c2gobmVpZ2hib3VyKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgY29uc29sZS5sb2coJ2ZhaWx1cmUnKTtcbiAgcmV0dXJuIDA7IC8vIGZhaWx1cmVcbn1cblxuZXhwb3J0IGNvbnN0IGggPSAoc3RhcnROb2RlOmFueSwgZmluaXNoTm9kZTphbnkpID0+IHtcbi8vZnVuY3Rpb24gaGV1cmlzdGljKG5vZGUpID1cbiAgLy8gZHggPSBhYnMobm9kZS54IC0gZ29hbC54KVxuICAvLyBkeSA9IGFicyhub2RlLnkgLSBnb2FsLnkpXG4gIC8vIHJldHVybiBEICogKGR4ICsgZHkpICsgKEQyIC0gMiAqIEQpICogbWluKGR4LCBkeSlcbiAgbGV0IEQgPSAxMDsgLy8gY29zdCBvZiBtb3ZpbmcgaG9yaXpvbnRhbGx5XG4gIGxldCBEMiA9IDE0OyAvLyBjb3N0IG9mIG1vdmluZyBkaWFnb25hbGx5XG4gIGxldCBkeCA9IE1hdGguYWJzKHN0YXJ0Tm9kZS54IC0gZmluaXNoTm9kZS54KTtcbiAgbGV0IGR5ID0gTWF0aC5hYnMoc3RhcnROb2RlLnkgLSBmaW5pc2hOb2RlLnkpO1xuICByZXR1cm4gRCAqIChkeCArIGR5KSArIChEMiAtIDIgKiBEKSAqIE1hdGgubWluKGR4LCBkeSk7XG59XG5cbi8vIGV4cG9ydCBjb25zdCBnZXRNaW5GU2NvcmUgPSAobWFwOmFueSkgPT4ge1xuLy8gICBsZXQgb3BlbjphbnlbXSA9IEFycmF5LmZyb20obWFwKTtcbi8vICAgbGV0IG1pbiA9IDA7XG4vLyAgIGZvcihsZXQgaSA9IDE7IGkgPCBvcGVuLmxlbmd0aCAtIDE7ICsraSkge1xuLy8gICAgIGlmKG9wZW5bbWluXVsxXSA+IG9wZW5baV1bMV0pIHtcbi8vICAgICAgIG1pbiA9IGk7XG4vLyAgICAgfVxuLy8gICB9XG4vLyAgIHJldHVybiBvcGVuW21pbl07XG4vLyB9XG5cbmV4cG9ydCBjb25zdCBnZXRNaW5GU2NvcmUgPSAob3BlbjphbnlbXSkgPT4ge1xuICBsZXQgbWluID0gMDtcbiAgZm9yKGxldCBpID0gMTsgaSA8IG9wZW4ubGVuZ3RoIC0gMTsgKytpKSB7XG4gICAgaWYob3BlblttaW5dLmZTY29yZSA+IG9wZW5baV0uZlNjb3JlKSB7XG4gICAgICBtaW4gPSBpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gb3BlblttaW5dO1xufVxuXG5leHBvcnQgY29uc3QgcmVjb25zdHJ1Y3RQYXRoID0gKGZyb206YW55LCBjdXJyZW50OmFueSkgPT4ge1xuICBjb25zb2xlLmxvZygncmVjb25zdHJ1Y3RQYXRoIGZyb206JywgZnJvbSk7XG4gIGNvbnNvbGUubG9nKCdyZWNvbnN0cnVjdFBhdGggY3VycmVudCcsIGN1cnJlbnQpO1xufVxuXG5leHBvcnQgY29uc3QgZGVsZXRlT2JqZWN0RnJvbUFycmF5ID0gKG9iamVjdDphbnksIGFycjphbnlbXSkgPT4ge1xuICBsZXQgdXBkYXRlZEFyciA9IGFyci5maWx0ZXIoKGVsKSA9PiB7XG4gICAgaWYoZWwueCA9PT0gb2JqZWN0LnggJiYgZWwueSA9PT0gb2JqZWN0LnkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH0pO1xuICByZXR1cm4gdXBkYXRlZEFycjtcbn1cblxuZXhwb3J0IGNvbnN0IGlzT2JqZWN0SW5BcnJheSA9IChvYmplY3Q6YW55LCBhcnI6YW55W10pID0+IHtcbiAgbGV0IHJlc3VsdDpib29sZWFuID0gZmFsc2U7XG4gIGZvcihsZXQgbm9kZSBvZiBhcnIpIHtcbiAgICBpZihvYmplY3QueCA9PT0gbm9kZS54ICYmIG9iamVjdC55ID09PSBub2RlLnkpIHtcbiAgICAgIHJlc3VsdCA9IHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBjb25zdCB1bmNsb3NlZE5laWdib3VycyA9IChjdXJyZW50OmFueSwgY2xvc2VkOmFueSkgPT4ge1xuICBsZXQgbmVpZ2hib3Vyc05vdEluQ2xvc2VkID0gW107XG4gIGZvcihsZXQgbmVpZ2hib3VyIG9mIGN1cnJlbnQubmVpZ2hib3Vycykge1xuICAgIGxldCBpc0luQ2xvc2VkOmJvb2xlYW4gPSBmYWxzZTtcbiAgICBmb3IobGV0IG5vZGUgb2YgY2xvc2VkKSB7XG4gICAgICBpZihuZWlnaGJvdXIueCA9PT0gbm9kZS54ICYmIG5laWdoYm91ci55ID09PSBub2RlLnkpIHtcbiAgICAgICAgaXNJbkNsb3NlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIGlmKCFpc0luQ2xvc2VkKSB7XG4gICAgICBuZWlnaGJvdXJzTm90SW5DbG9zZWQucHVzaChuZWlnaGJvdXIpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbmVpZ2hib3Vyc05vdEluQ2xvc2VkO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3BhdGgvQVN0YXIudHMiXSwic291cmNlUm9vdCI6IiJ9