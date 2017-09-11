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
            result.push({
                x: neighbor.x,
                y: neighbor.y,
                distance: neighbor.distance,
            });
        }
    }
    return result;
};
exports.addNeighbours = function (map) {
    for (var _i = 0, map_1 = map; _i < map_1.length; _i++) {
        var node = map_1[_i];
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
var createMap_1 = __webpack_require__(3);
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
            console.error('Path', exports.reconstructPath(from, current));
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
    // function reconstruct_path(cameFrom, current)
    //   total_path := [current]
    //   while current in cameFrom.Keys:
    //       current := cameFrom[current]
    //       total_path.append(current)
    //   return total_path
    var totalPath = [current];
    while (exports.isObjectInMapKeys(current, from)) {
        console.log('current in cameFrom.keys()');
        current = from[current];
        totalPath.push(current);
    }
    return totalPath;
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
exports.isObjectInMapKeys = function (object, map) {
    var arr = Array.from(map);
    var result = false;
    for (var i = 0; i < arr.length - 1; ++i) {
        console.log('arr[i][0]', arr[i][0]);
        if (arr[i][0].x === object.x && arr[i][0].y === object.y) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMTZlNTNiMmU4NWM2Mzc5MzRiNGQiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hcC9tYXBDb25maWcudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hcC9kcmF3R3JpZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFwL2NyZWF0ZU1hcC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcGF0aC9BU3Rhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUM3REEsbUJBQW1CO0FBQ04sYUFBSyxHQUFXLElBQUksQ0FBQztBQUNyQixjQUFNLEdBQVcsR0FBRyxDQUFDO0FBQ3JCLGdCQUFRLEdBQVUsR0FBRyxDQUFDO0FBRW5DLGdCQUFnQjtBQUNMLGNBQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3JELGNBQU0sQ0FBQyxFQUFFLEdBQUcsUUFBUSxDQUFDO0FBQ3JCLGNBQU0sQ0FBQyxLQUFLLEdBQUcsYUFBSyxDQUFDO0FBQ3JCLGNBQU0sQ0FBQyxNQUFNLEdBQUcsY0FBTSxDQUFDO0FBQ3ZCLGNBQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLFdBQVcsQ0FBQztBQUVs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WUFDVixFQUFFLEVBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxJQUFJLFNBQVMsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BELFVBQVUsR0FBRyxJQUFJLENBQUM7WUFDcEIsQ0FBQztTQUNGO1FBQ0QsRUFBRSxFQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNmLHFCQUFxQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN4QyxDQUFDO0tBQ0Y7SUFDRCxNQUFNLENBQUMscUJBQXFCLENBQUM7QUFDL0IsQ0FBQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAxNmU1M2IyZTg1YzYzNzkzNGI0ZCIsIi8vIGdsb2JhbCB2YXJpYWJsZXNcbmV4cG9ydCBjb25zdCBXSURUSDogbnVtYmVyID0gMTAwMDtcbmV4cG9ydCBjb25zdCBIRUlHSFQ6IG51bWJlciA9IDYwMDtcbmV4cG9ydCBjb25zdCBncmlkU2l6ZTpudW1iZXIgPSAxMDA7XG5cbi8vIGNyZWF0ZSBDYW52YXNcbmV4cG9ydCBsZXQgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG5jYW52YXMuaWQgPSBcImNhbnZhc1wiO1xuY2FudmFzLndpZHRoID0gV0lEVEg7XG5jYW52YXMuaGVpZ2h0ID0gSEVJR0hUO1xuY2FudmFzLnN0eWxlLmJvcmRlciA9IFwiMXB4IHNvbGlkXCI7XG5cbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY2FudmFzKTtcblxuLy8gZGVmaW5lIDJkIGNvbnRleHRcbmV4cG9ydCBsZXQgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tYXAvbWFwQ29uZmlnLnRzIiwiaW1wb3J0IHtjYW52YXMsIGN0eH0gZnJvbSAnLi9tYXAvbWFwQ29uZmlnJztcbmltcG9ydCB7ZHJhd0dyaWR9IGZyb20gJy4vbWFwL2RyYXdHcmlkJztcbmltcG9ydCB7XG4gIGFkZE5laWdoYm91cnMsXG4gIGNyZWF0ZU5vZGVzLFxuICBtYXBcbn0gZnJvbSAnLi9tYXAvY3JlYXRlTWFwJztcbmltcG9ydCB7c2hvd09ic3RhY2xlc30gZnJvbSAnLi9tYXAvbWFwVXRpbHMnO1xuaW1wb3J0IHtoLCBhU3Rhcn0gZnJvbSAnLi9wYXRoL0FTdGFyJztcblxubGV0IGdyaWRTaXplID0gMTAwO1xuXG5kcmF3R3JpZCgpO1xuY29uc29sZS5sb2cobWFwKTtcblxubGV0IHN0YXJ0Tm9kZTphbnk7XG5sZXQgZmluaXNoTm9kZTphbnk7XG5cbmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gIGNvbnNvbGUuZXJyb3IoJ0NsaWNrJyk7XG4gIGxldCB4ID0gZS5vZmZzZXRYOyAvLyBnZXQgWFxuICBsZXQgeSA9IGUub2Zmc2V0WTsgLy8gZ2V0IFlcbiAgY29uc29sZS5sb2coJ1Bvc2l0aW9uIHgnLCBlLm9mZnNldFgpOyAvLyBnZXQgWFxuICBjb25zb2xlLmxvZygnUG9zaXRpb24geScsIGUub2Zmc2V0WSk7IC8vIGdldCBZXG4gIGZvcihsZXQgZ3JpZCBvZiBtYXApIHtcbiAgICBsZXQgYm90dG9tUmlnaHRYID0gZ3JpZC54ICsgZ3JpZFNpemU7XG4gICAgbGV0IGJvdHRvbVJpZ2h0WSA9IGdyaWQueSArIGdyaWRTaXplO1xuICAgIGlmKHggPj0gZ3JpZC54ICYmIHggPCBib3R0b21SaWdodFggJiYgeSA+PSBncmlkLnkgJiYgeSA8IGJvdHRvbVJpZ2h0WSkge1xuICAgICAgY3R4LmZpbGxTdHlsZSA9ICdncmVlbic7XG4gICAgICBjdHguZmlsbFJlY3QoZ3JpZC54LCBncmlkLnksIGdyaWRTaXplICwgZ3JpZFNpemUpO1xuICAgICAgc3RhcnROb2RlID0gZ3JpZDtcbiAgICAgIGNvbnNvbGUubG9nKCdncmlkJywgZ3JpZCwgJ3dhcyBjbGlja2VkJyk7XG4gICAgfVxuICB9XG59KTtcblxuLy8gc2V0IG9uQ2xpY2tMaXN0ZW5lciBmb3IgcmlnaHQgbW91c2UgZXZlbnRcbmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdjb250ZXh0bWVudScsIChlKSA9PiB7XG4gIGNvbnNvbGUuZXJyb3IoJ1JpZ2h0IE1vdXNlIENsaWNrJyk7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgbGV0IHggPSBlLm9mZnNldFg7IC8vIGdldCBYXG4gIGxldCB5ID0gZS5vZmZzZXRZOyAvLyBnZXQgWVxuXG4gIGZvcihsZXQgZ3JpZCBvZiBtYXApIHtcbiAgICBsZXQgYm90dG9tUmlnaHRYID0gZ3JpZC54ICsgZ3JpZFNpemU7XG4gICAgbGV0IGJvdHRvbVJpZ2h0WSA9IGdyaWQueSArIGdyaWRTaXplO1xuICAgIGlmKHggPj0gZ3JpZC54ICYmIHggPCBib3R0b21SaWdodFggJiYgeSA+PSBncmlkLnkgJiYgeSA8IGJvdHRvbVJpZ2h0WSkge1xuICAgICAgY3R4LmZpbGxTdHlsZSA9ICdyZWQnO1xuICAgICAgY3R4LmZpbGxSZWN0KGdyaWQueCwgZ3JpZC55LCBncmlkU2l6ZSwgZ3JpZFNpemUpO1xuICAgICAgY29uc29sZS5sb2coJ2dyaWQnLCBncmlkLCAnd2FzIGNsaWNrZWQnKTtcbiAgICAgIGZpbmlzaE5vZGUgPSBncmlkO1xuICAgICAgY29uc29sZS5sb2coJ2gnLCBoKHN0YXJ0Tm9kZSwgZmluaXNoTm9kZSkpO1xuICAgICAgYVN0YXIoc3RhcnROb2RlLCBmaW5pc2hOb2RlKTtcbiAgICB9XG4gIH1cbn0pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2dhbWUudHMiLCJpbXBvcnQge1xuICBjYW52YXMsXG4gIGN0eCxcbiAgV0lEVEgsXG4gIEhFSUdIVCxcbiAgZ3JpZFNpemVcbn0gZnJvbSAnLi9tYXBDb25maWcnO1xuXG5leHBvcnQgY29uc3QgZHJhd0dyaWQgPSAoKSA9PiB7XG4gIGZvcihsZXQgeSA9IDA7IHkgPD0gSEVJR0hUOyB5Kz0gZ3JpZFNpemUpIHtcbiAgICBmb3IobGV0IHggPSAwOyB4IDw9IFdJRFRIOyB4Kz0gZ3JpZFNpemUpIHtcbiAgICAgIGN0eC5zdHJva2VSZWN0KHgsIHksIGdyaWRTaXplLCBncmlkU2l6ZSk7XG4gICAgfVxuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFwL2RyYXdHcmlkLnRzIiwiaW1wb3J0IHtcbiAgY2FudmFzLFxuICBjdHgsXG4gIFdJRFRILFxuICBIRUlHSFQsXG4gIGdyaWRTaXplXG59IGZyb20gJy4uL21hcC9tYXBDb25maWcnO1xuXG5leHBvcnQgY29uc3QgY3JlYXRlTm9kZXMgPSAoKSA9PiB7XG4gIGxldCBtYXA6YW55W10gPSBbXTtcbiAgbGV0IHZhbHVlID0gMTtcbiAgbGV0IGlkID0gMDtcbiAgZm9yKGxldCB5ID0gMDsgeSA8PSBIRUlHSFQ7IHkrPSBncmlkU2l6ZSkge1xuICAgIGZvcihsZXQgeCA9IDA7IHggPD0gV0lEVEg7IHgrPSBncmlkU2l6ZSkge1xuICAgICAgbWFwLnB1c2goe1xuICAgICAgICBpZDogaWQsXG4gICAgICAgIHg6IHgsXG4gICAgICAgIHk6IHksXG4gICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgbmVpZ2hib3VyczogW11cbiAgICAgIH0pO1xuICAgICAgaWQrKztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG1hcDtcbn1cblxuZXhwb3J0IGNvbnN0IG5laWdoYm91cnMgPSAobm9kZTphbnkpID0+IHtcbiAgbGV0IGRpcnMgPSBbXG4gICAge3g6IC1ncmlkU2l6ZSwgeTogLWdyaWRTaXplLCBkaXN0YW5jZTogMTR9LFxuICAgIHt4OiAwLCB5OiAtZ3JpZFNpemUsIGRpc3RhbmNlOiAxMH0sXG4gICAge3g6IGdyaWRTaXplLCB5OiAtZ3JpZFNpemUsIGRpc3RhbmNlOiAxNH0sXG4gICAge3g6IC1ncmlkU2l6ZSwgeTogMCwgZGlzdGFuY2U6IDEwfSxcbiAgICB7eDogZ3JpZFNpemUsIHk6IDAsIGRpc3RhbmNlOiAxMH0sXG4gICAge3g6IC1ncmlkU2l6ZSwgeTogZ3JpZFNpemUsIGRpc3RhbmNlOiAxNH0sXG4gICAge3g6IDAsIHk6IGdyaWRTaXplLCBkaXN0YW5jZTogMTB9LFxuICAgIHt4OiBncmlkU2l6ZSwgeTogZ3JpZFNpemUsIGRpc3RhbmNlOiAxNH1cbiAgXTtcbiAgbGV0IHJlc3VsdCA9IFtdO1xuICBmb3IobGV0IGRpciBvZiBkaXJzKSB7XG4gICAgbGV0IG5laWdoYm9yID0ge1xuICAgICAgeDogbm9kZS54ICsgZGlyLngsXG4gICAgICB5OiBub2RlLnkgKyBkaXIueSxcbiAgICAgIGRpc3RhbmNlOiBkaXIuZGlzdGFuY2VcbiAgICB9XG4gICAgaWYobmVpZ2hib3IueCA+PSAwICYmIG5laWdoYm9yLnggPCAxMDAwICYmIG5laWdoYm9yLnkgPj0gMCAmJiBuZWlnaGJvci55IDwgNjAwKSB7XG4gICAgICByZXN1bHQucHVzaCh7XG4gICAgICAgIHg6IG5laWdoYm9yLngsXG4gICAgICAgIHk6IG5laWdoYm9yLnksXG4gICAgICAgIGRpc3RhbmNlOiBuZWlnaGJvci5kaXN0YW5jZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgY29uc3QgYWRkTmVpZ2hib3VycyA9IChtYXA6YW55W10pID0+IHtcbiAgZm9yKGxldCBub2RlIG9mIG1hcCkge1xuICAgIGxldCBuID0gbmVpZ2hib3Vycyhub2RlKTtcbiAgICBub2RlLm5laWdoYm91cnMgPSBuO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBtYXAgPSBjcmVhdGVOb2RlcygpO1xuYWRkTmVpZ2hib3VycyhtYXApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21hcC9jcmVhdGVNYXAudHMiLCJpbXBvcnQge25laWdoYm91cnMsIG1hcH0gZnJvbSAnLi4vbWFwL2NyZWF0ZU1hcCc7XG5cbmV4cG9ydCBjb25zdCBhU3RhciA9IChzdGFydE5vZGU6YW55LCBmaW5pc2hOb2RlOmFueSkgPT4ge1xuICAvLyB0aGUgc2V0IG9mIGN1cnJlbnRseSBkaXNjb3ZlcmVkIG5vZGVzIHRoYXQgYXJlIG5vdCBldmFsdWF0ZWQgeWV0XG4gIC8vIEluaXRpYWxseSBvbmx5IHRoZSBzdGFydCBub2RlIGlzIGtub3duXG4gIGxldCBvcGVuOmFueVtdID0gW107XG5cbiAgLy8gdGhlIHNldCBvZiBub2RlcyB0aGF0IGFscmVhZHkgZXZhbHVhdGVkXG4gIGxldCBjbG9zZWQ6YW55W10gPSBbXTtcbiAgc3RhcnROb2RlLmdTY29yZSA9IDA7XG4gIHN0YXJ0Tm9kZS5mU2NvcmUgPSBzdGFydE5vZGUuZ1Njb3JlICsgaChzdGFydE5vZGUsIGZpbmlzaE5vZGUpXG4gIG9wZW4ucHVzaChzdGFydE5vZGUpO1xuXG4gIC8vIGZvciBlYWNoIG5vZGUsIHdoaWNoIG5vZGUgaXMgY2FuIG1vc3QgZWZmaWNpZW50bHkgYmUgcmVhY2hlZCBmcm9tXG4gIC8vIGlmIGEgbm9kZSBjYW4gYmUgcmVhY2hlZCBmcm9tIG1hbnkgbm9kZXMsIGNhbWVGcm9tIHdpbGwgZXZlbnRpYWxseVxuICAvLyBjb250YWluIHRoZSBtb3N0IGVmZmljaWVudCBwcmV2aW91cyBzdGVwXG4gIGxldCBmcm9tID0gbmV3IE1hcCgpO1xuXG4gIC8vIEZvciBlYWNoIG5vZGUsIHRoZSBjb3N0IG9mIGdldHRpbmcgZnJvbSB0aGUgc3RhcnQgbm9kZSB0byB0aGF0IG5vZGUuXG4gIC8vIGxldCBnU2NvcmUgPSBuZXcgTWFwKCk7XG4gIC8vIGxldCBmU2NvcmUgPSBuZXcgTWFwKCk7XG4gIC8vXG4gIC8vIGdTY29yZS5zZXQoc3RhcnROb2RlLCAwKTtcbiAgLy8gZlNjb3JlLnNldChzdGFydE5vZGUsIGdTY29yZS5nZXQoc3RhcnROb2RlKSArIGgoc3RhcnROb2RlLCBmaW5pc2hOb2RlKSk7XG4gIHdoaWxlKG9wZW4pIHtcbiAgICBsZXQgY3VycmVudDphbnkgPSBnZXRNaW5GU2NvcmUob3Blbik7XG4gICAgY29uc29sZS5sb2coJ2N1cnJlbnQnLCBjdXJyZW50KTtcbiAgICBpZihjdXJyZW50LnggPT09IGZpbmlzaE5vZGUueCAmJiBjdXJyZW50LnkgPT09IGZpbmlzaE5vZGUueSkge1xuICAgICAgY29uc29sZS5lcnJvcignUGF0aCcsIHJlY29uc3RydWN0UGF0aChmcm9tLCBjdXJyZW50KSk7XG4gICAgICByZXR1cm4gcmVjb25zdHJ1Y3RQYXRoKGZyb20sIGN1cnJlbnQpO1xuICAgIH1cbiAgICBvcGVuID0gZGVsZXRlT2JqZWN0RnJvbUFycmF5KGN1cnJlbnQsIG9wZW4pO1xuICAgIGNsb3NlZC5wdXNoKGN1cnJlbnQpO1xuICAgIGZvcihsZXQgbmVpZ2hib3VyIG9mIHVuY2xvc2VkTmVpZ2JvdXJzKGN1cnJlbnQsIGNsb3NlZCkpIHtcbiAgICAgIGxldCB0ZW1wRyA9IGN1cnJlbnQuZ1Njb3JlICsgbmVpZ2hib3VyLmRpc3RhbmNlO1xuICAgICAgaWYoIWlzT2JqZWN0SW5BcnJheShuZWlnaGJvdXIsIG9wZW4pIHx8IHRlbXBHIDwgbmVpZ2hib3VyLmdTY29yZSkge1xuICAgICAgICBmcm9tLnNldChuZWlnaGJvdXIsIGN1cnJlbnQpO1xuICAgICAgICBuZWlnaGJvdXIuZ1Njb3JlID0gdGVtcEc7XG4gICAgICAgIG5laWdoYm91ci5mU2NvcmUgPSBuZWlnaGJvdXIuZ1Njb3JlICsgaChuZWlnaGJvdXIsIGZpbmlzaE5vZGUpO1xuICAgICAgfVxuICAgICAgaWYoIWlzT2JqZWN0SW5BcnJheShuZWlnaGJvdXIsIG9wZW4pKSB7IC8vIGNyZWF0ZSBmdW5jdGlvblxuICAgICAgICBsZXQgbm9kZU5laWdoYm91cnMgPSBuZWlnaGJvdXJzKG5laWdoYm91cik7XG4gICAgICAgIG5laWdoYm91ci5uZWlnaGJvdXJzID0gbm9kZU5laWdoYm91cnM7XG4gICAgICAgIG9wZW4ucHVzaChuZWlnaGJvdXIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBjb25zb2xlLmxvZygnZmFpbHVyZScpO1xuICByZXR1cm4gMDsgLy8gZmFpbHVyZVxufVxuXG5leHBvcnQgY29uc3QgaCA9IChzdGFydE5vZGU6YW55LCBmaW5pc2hOb2RlOmFueSkgPT4ge1xuLy9mdW5jdGlvbiBoZXVyaXN0aWMobm9kZSkgPVxuICAvLyBkeCA9IGFicyhub2RlLnggLSBnb2FsLngpXG4gIC8vIGR5ID0gYWJzKG5vZGUueSAtIGdvYWwueSlcbiAgLy8gcmV0dXJuIEQgKiAoZHggKyBkeSkgKyAoRDIgLSAyICogRCkgKiBtaW4oZHgsIGR5KVxuICBsZXQgRCA9IDEwOyAvLyBjb3N0IG9mIG1vdmluZyBob3Jpem9udGFsbHlcbiAgbGV0IEQyID0gMTQ7IC8vIGNvc3Qgb2YgbW92aW5nIGRpYWdvbmFsbHlcbiAgbGV0IGR4ID0gTWF0aC5hYnMoc3RhcnROb2RlLnggLSBmaW5pc2hOb2RlLngpO1xuICBsZXQgZHkgPSBNYXRoLmFicyhzdGFydE5vZGUueSAtIGZpbmlzaE5vZGUueSk7XG4gIHJldHVybiBEICogKGR4ICsgZHkpICsgKEQyIC0gMiAqIEQpICogTWF0aC5taW4oZHgsIGR5KTtcbn1cblxuLy8gZXhwb3J0IGNvbnN0IGdldE1pbkZTY29yZSA9IChtYXA6YW55KSA9PiB7XG4vLyAgIGxldCBvcGVuOmFueVtdID0gQXJyYXkuZnJvbShtYXApO1xuLy8gICBsZXQgbWluID0gMDtcbi8vICAgZm9yKGxldCBpID0gMTsgaSA8IG9wZW4ubGVuZ3RoIC0gMTsgKytpKSB7XG4vLyAgICAgaWYob3BlblttaW5dWzFdID4gb3BlbltpXVsxXSkge1xuLy8gICAgICAgbWluID0gaTtcbi8vICAgICB9XG4vLyAgIH1cbi8vICAgcmV0dXJuIG9wZW5bbWluXTtcbi8vIH1cblxuZXhwb3J0IGNvbnN0IGdldE1pbkZTY29yZSA9IChvcGVuOmFueVtdKSA9PiB7XG4gIGxldCBtaW4gPSAwO1xuICBmb3IobGV0IGkgPSAxOyBpIDwgb3Blbi5sZW5ndGggLSAxOyArK2kpIHtcbiAgICBpZihvcGVuW21pbl0uZlNjb3JlID4gb3BlbltpXS5mU2NvcmUpIHtcbiAgICAgIG1pbiA9IGk7XG4gICAgfVxuICB9XG4gIHJldHVybiBvcGVuW21pbl07XG59XG5cbmV4cG9ydCBjb25zdCByZWNvbnN0cnVjdFBhdGggPSAoZnJvbTphbnksIGN1cnJlbnQ6YW55KSA9PiB7XG4gIGNvbnNvbGUubG9nKCdyZWNvbnN0cnVjdFBhdGggZnJvbTonLCBmcm9tKTtcbiAgY29uc29sZS5sb2coJ3JlY29uc3RydWN0UGF0aCBjdXJyZW50JywgY3VycmVudCk7XG4gIC8vIGZ1bmN0aW9uIHJlY29uc3RydWN0X3BhdGgoY2FtZUZyb20sIGN1cnJlbnQpXG4gIC8vICAgdG90YWxfcGF0aCA6PSBbY3VycmVudF1cbiAgLy8gICB3aGlsZSBjdXJyZW50IGluIGNhbWVGcm9tLktleXM6XG4gIC8vICAgICAgIGN1cnJlbnQgOj0gY2FtZUZyb21bY3VycmVudF1cbiAgLy8gICAgICAgdG90YWxfcGF0aC5hcHBlbmQoY3VycmVudClcbiAgLy8gICByZXR1cm4gdG90YWxfcGF0aFxuICBsZXQgdG90YWxQYXRoOmFueVtdID0gW2N1cnJlbnRdO1xuICB3aGlsZShpc09iamVjdEluTWFwS2V5cyhjdXJyZW50LCBmcm9tKSkge1xuICAgIGNvbnNvbGUubG9nKCdjdXJyZW50IGluIGNhbWVGcm9tLmtleXMoKScpO1xuICAgIGN1cnJlbnQgPSBmcm9tW2N1cnJlbnRdO1xuICAgIHRvdGFsUGF0aC5wdXNoKGN1cnJlbnQpO1xuICB9XG4gIHJldHVybiB0b3RhbFBhdGg7XG59XG5cbmV4cG9ydCBjb25zdCBkZWxldGVPYmplY3RGcm9tQXJyYXkgPSAob2JqZWN0OmFueSwgYXJyOmFueVtdKSA9PiB7XG4gIGxldCB1cGRhdGVkQXJyID0gYXJyLmZpbHRlcigoZWwpID0+IHtcbiAgICBpZihlbC54ID09PSBvYmplY3QueCAmJiBlbC55ID09PSBvYmplY3QueSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSk7XG4gIHJldHVybiB1cGRhdGVkQXJyO1xufVxuXG5leHBvcnQgY29uc3QgaXNPYmplY3RJbkFycmF5ID0gKG9iamVjdDphbnksIGFycjphbnlbXSkgPT4ge1xuICBsZXQgcmVzdWx0OmJvb2xlYW4gPSBmYWxzZTtcbiAgZm9yKGxldCBub2RlIG9mIGFycikge1xuICAgIGlmKG9iamVjdC54ID09PSBub2RlLnggJiYgb2JqZWN0LnkgPT09IG5vZGUueSkge1xuICAgICAgcmVzdWx0ID0gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGNvbnN0IGlzT2JqZWN0SW5NYXBLZXlzID0gKG9iamVjdDphbnksIG1hcDphbnkpID0+IHtcbiAgbGV0IGFycjphbnlbXSA9IEFycmF5LmZyb20obWFwKTtcbiAgbGV0IHJlc3VsdDpib29sZWFuID0gZmFsc2U7XG4gIGZvcihsZXQgaSA9IDA7IGkgPCBhcnIubGVuZ3RoIC0gMTsgKytpKSB7XG4gICAgY29uc29sZS5sb2coJ2FycltpXVswXScsIGFycltpXVswXSk7XG4gICAgaWYoYXJyW2ldWzBdLnggPT09IG9iamVjdC54ICYmIGFycltpXVswXS55ID09PSBvYmplY3QueSkge1xuICAgICAgcmVzdWx0ID0gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGNvbnN0IHVuY2xvc2VkTmVpZ2JvdXJzID0gKGN1cnJlbnQ6YW55LCBjbG9zZWQ6YW55KSA9PiB7XG4gIGxldCBuZWlnaGJvdXJzTm90SW5DbG9zZWQgPSBbXTtcbiAgZm9yKGxldCBuZWlnaGJvdXIgb2YgY3VycmVudC5uZWlnaGJvdXJzKSB7XG4gICAgbGV0IGlzSW5DbG9zZWQ6Ym9vbGVhbiA9IGZhbHNlO1xuICAgIGZvcihsZXQgbm9kZSBvZiBjbG9zZWQpIHtcbiAgICAgIGlmKG5laWdoYm91ci54ID09PSBub2RlLnggJiYgbmVpZ2hib3VyLnkgPT09IG5vZGUueSkge1xuICAgICAgICBpc0luQ2xvc2VkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYoIWlzSW5DbG9zZWQpIHtcbiAgICAgIG5laWdoYm91cnNOb3RJbkNsb3NlZC5wdXNoKG5laWdoYm91cik7XG4gICAgfVxuICB9XG4gIHJldHVybiBuZWlnaGJvdXJzTm90SW5DbG9zZWQ7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcGF0aC9BU3Rhci50cyJdLCJzb3VyY2VSb290IjoiIn0=