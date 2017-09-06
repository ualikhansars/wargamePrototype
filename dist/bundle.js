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
var gridSize = 20;
drawGrid_1.drawGrid(gridSize);
var map = createMap_1.createNodes(gridSize);
createMap_1.addNeighbours(map, gridSize);
mapUtils_1.showObstacles(map, gridSize);
console.log(map);
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
        { x: -gridSize, y: gridSize },
        { x: gridSize, y: -gridSize },
        { x: gridSize, y: -gridSize },
        { x: -gridSize, y: gridSize },
        { x: gridSize, y: gridSize },
        { x: -gridSize, y: gridSize },
        { x: gridSize, y: gridSize },
        { x: gridSize, y: gridSize }
    ];
    var result = [];
    for (var _i = 0, dirs_1 = dirs; _i < dirs_1.length; _i++) {
        var dir = dirs_1[_i];
        var neighbor = {
            x: node.x + dir.x,
            y: node.y + dir.y
        };
        for (var _a = 0, map_2 = map; _a < map_2.length; _a++) {
            var el = map_2[_a];
            if (el.x === neighbor.x && el.y === neighbor.y) {
                result.push({
                    id: el.id,
                    x: el.x,
                    y: el.y,
                    value: el.value
                });
            }
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


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgY2NiODQ5MDYzYTk5Njg1ZTQ4YjYiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hcC9tYXBDb25maWcudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hcC9kcmF3R3JpZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFwL2NyZWF0ZU1hcC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFwL21hcFV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7OztBQzdEQSxtQkFBbUI7QUFDTixhQUFLLEdBQVcsSUFBSSxDQUFDO0FBQ3JCLGNBQU0sR0FBVyxHQUFHLENBQUM7QUFFbEMsZ0JBQWdCO0FBQ0wsY0FBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDckQsY0FBTSxDQUFDLEVBQUUsR0FBRyxRQUFRLENBQUM7QUFDckIsY0FBTSxDQUFDLEtBQUssR0FBRyxhQUFLLENBQUM7QUFDckIsY0FBTSxDQUFDLE1BQU0sR0FBRyxjQUFNLENBQUM7QUFDdkIsY0FBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsV0FBVyxDQUFDO0FBRWxDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQU0sQ0FBQyxDQUFDO0FBRWxDLG9CQUFvQjtBQUNULFdBQUcsR0FBRyxjQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDOzs7Ozs7Ozs7O0FDZHpDLHlDQUE0QztBQUM1Qyx3Q0FBd0M7QUFDeEMseUNBQTJEO0FBQzNELHdDQUE2QztBQUU3QyxJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUM7QUFFbEIsbUJBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNuQixJQUFJLEdBQUcsR0FBRyx1QkFBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ2hDLHlCQUFhLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQzdCLHdCQUFhLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQzdCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7QUFFakIsa0JBQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsVUFBQyxDQUFDO0lBQ2pDLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdkIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVE7SUFDM0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVE7SUFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsUUFBUTtJQUM5QyxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxRQUFRO0lBQzlDLEdBQUcsRUFBYSxVQUFHLEVBQUgsV0FBRyxFQUFILGlCQUFHLEVBQUgsSUFBRztRQUFmLElBQUksSUFBSTtRQUNWLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDO1FBQ3JDLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDO1FBQ3JDLEVBQUUsRUFBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsWUFBWSxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ3RFLGVBQUcsQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDO1lBQ3hCLGVBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRyxRQUFRLENBQUMsQ0FBQztZQUNsRCxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDM0MsQ0FBQztLQUNGO0FBQ0gsQ0FBQyxDQUFDLENBQUM7QUFFSCw0Q0FBNEM7QUFDNUMsa0JBQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLEVBQUUsVUFBQyxDQUFDO0lBQ3ZDLE9BQU8sQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUNuQyxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDbkIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVE7SUFDM0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVE7SUFFM0IsR0FBRyxFQUFhLFVBQUcsRUFBSCxXQUFHLEVBQUgsaUJBQUcsRUFBSCxJQUFHO1FBQWYsSUFBSSxJQUFJO1FBQ1YsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUM7UUFDckMsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUM7UUFDckMsRUFBRSxFQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxZQUFZLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDdEUsZUFBRyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFDdEIsZUFBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ2pELE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxhQUFhLENBQUMsQ0FBQztRQUMzQyxDQUFDO0tBQ0Y7QUFDSCxDQUFDLENBQUMsQ0FBQzs7Ozs7Ozs7OztBQzlDSCx5Q0FLcUI7QUFFUixnQkFBUSxHQUFHLFVBQUMsUUFBZTtJQUN0QyxHQUFHLEVBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxrQkFBTSxFQUFFLENBQUMsSUFBRyxRQUFRLEVBQUUsQ0FBQztRQUN6QyxHQUFHLEVBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxpQkFBSyxFQUFFLENBQUMsSUFBRyxRQUFRLEVBQUUsQ0FBQztZQUN4QyxlQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzNDLENBQUM7SUFDSCxDQUFDO0FBQ0gsQ0FBQzs7Ozs7Ozs7OztBQ2JELHlDQUswQjtBQUViLG1CQUFXLEdBQUcsVUFBQyxRQUFlO0lBQ3pDLElBQUksR0FBRyxHQUFTLEVBQUUsQ0FBQztJQUNuQixJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7SUFDZCxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDWCxHQUFHLEVBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxrQkFBTSxFQUFFLENBQUMsSUFBRyxRQUFRLEVBQUUsQ0FBQztRQUN6QyxHQUFHLEVBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxpQkFBSyxFQUFFLENBQUMsSUFBRyxRQUFRLEVBQUUsQ0FBQztZQUN4QyxHQUFHLENBQUMsSUFBSSxDQUFDO2dCQUNQLEVBQUUsRUFBRSxFQUFFO2dCQUNOLENBQUMsRUFBRSxDQUFDO2dCQUNKLENBQUMsRUFBRSxDQUFDO2dCQUNKLEtBQUssRUFBRSxLQUFLO2dCQUNaLFVBQVUsRUFBRSxFQUFFO2FBQ2YsQ0FBQyxDQUFDO1lBQ0gsRUFBRSxFQUFFLENBQUM7UUFDUCxDQUFDO0lBQ0gsQ0FBQztJQUNELE1BQU0sQ0FBQyxHQUFHLENBQUM7QUFDYixDQUFDO0FBRVkscUJBQWEsR0FBRyxVQUFDLEdBQVMsRUFBRSxRQUFlO0lBQ3RELEdBQUcsRUFBYSxVQUFHLEVBQUgsV0FBRyxFQUFILGlCQUFHLEVBQUgsSUFBRztRQUFmLElBQUksSUFBSTtRQUNWLElBQUksQ0FBQyxHQUFHLGtCQUFVLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztLQUNyQjtBQUNILENBQUM7QUFFWSxrQkFBVSxHQUFHLFVBQUMsSUFBUSxFQUFFLEdBQVMsRUFBRSxRQUFlO0lBQzdELElBQUksSUFBSSxHQUFHO1FBQ1QsRUFBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBQztRQUMzQixFQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFDO1FBQzNCLEVBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUM7UUFDM0IsRUFBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBQztRQUMzQixFQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBQztRQUMxQixFQUFDLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFDO1FBQzNCLEVBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFDO1FBQzFCLEVBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFDO0tBQzNCLENBQUM7SUFDRixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDaEIsR0FBRyxFQUFZLFVBQUksRUFBSixhQUFJLEVBQUosa0JBQUksRUFBSixJQUFJO1FBQWYsSUFBSSxHQUFHO1FBQ1QsSUFBSSxRQUFRLEdBQUc7WUFDYixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUNqQixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztTQUNsQjtRQUNELEdBQUcsRUFBVyxVQUFHLEVBQUgsV0FBRyxFQUFILGlCQUFHLEVBQUgsSUFBRztZQUFiLElBQUksRUFBRTtZQUNSLEVBQUUsRUFBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLFFBQVEsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDOUMsTUFBTSxDQUFDLElBQUksQ0FBQztvQkFDVixFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUU7b0JBQ1QsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO29CQUNQLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztvQkFDUCxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUs7aUJBQ2hCLENBQUMsQ0FBQztZQUNMLENBQUM7U0FDRjtLQUNGO0lBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQztBQUNoQixDQUFDOzs7Ozs7Ozs7O0FDOURELHlDQUF3QztBQUUzQix1QkFBZSxHQUFHLFVBQUMsR0FBUyxFQUFFLE1BQWEsRUFBRSxNQUFhLEVBQUUsS0FBWSxFQUFFLE1BQWE7SUFFbEcsR0FBRyxFQUFhLFVBQUcsRUFBSCxXQUFHLEVBQUgsaUJBQUcsRUFBSCxJQUFHO1FBQWYsSUFBSSxJQUFJO0tBRVg7QUFDSCxDQUFDO0FBRVkscUJBQWEsR0FBRyxVQUFDLEdBQVMsRUFBRSxRQUFlO0lBQ3RELEdBQUcsRUFBYSxVQUFHLEVBQUgsV0FBRyxFQUFILGlCQUFHLEVBQUgsSUFBRztRQUFmLElBQUksSUFBSTtRQUNWLEVBQUUsRUFBQyxJQUFJLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEIsZUFBRyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7WUFDMUIsZUFBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQztRQUNoRSxDQUFDO0tBQ0Y7QUFDSCxDQUFDO0FBRVksa0JBQVUsR0FBRyxVQUFDLElBQVE7SUFDakMsSUFBSSxJQUFJLEdBQUc7UUFDVCxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDckUsQ0FBQztJQUNGLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUNoQixHQUFHLEVBQVksVUFBSSxFQUFKLGFBQUksRUFBSixrQkFBSSxFQUFKLElBQUk7UUFBZixJQUFJLEdBQUc7UUFDVCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNoRDtBQUNILENBQUMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgY2NiODQ5MDYzYTk5Njg1ZTQ4YjYiLCIvLyBnbG9iYWwgdmFyaWFibGVzXG5leHBvcnQgY29uc3QgV0lEVEg6IG51bWJlciA9IDEwMDA7XG5leHBvcnQgY29uc3QgSEVJR0hUOiBudW1iZXIgPSA2MDA7XG5cbi8vIGNyZWF0ZSBDYW52YXNcbmV4cG9ydCBsZXQgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG5jYW52YXMuaWQgPSBcImNhbnZhc1wiO1xuY2FudmFzLndpZHRoID0gV0lEVEg7XG5jYW52YXMuaGVpZ2h0ID0gSEVJR0hUO1xuY2FudmFzLnN0eWxlLmJvcmRlciA9IFwiMXB4IHNvbGlkXCI7XG5cbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY2FudmFzKTtcblxuLy8gZGVmaW5lIDJkIGNvbnRleHRcbmV4cG9ydCBsZXQgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tYXAvbWFwQ29uZmlnLnRzIiwiaW1wb3J0IHtjYW52YXMsIGN0eH0gZnJvbSAnLi9tYXAvbWFwQ29uZmlnJztcbmltcG9ydCB7ZHJhd0dyaWR9IGZyb20gJy4vbWFwL2RyYXdHcmlkJztcbmltcG9ydCB7YWRkTmVpZ2hib3VycywgY3JlYXRlTm9kZXN9IGZyb20gJy4vbWFwL2NyZWF0ZU1hcCc7XG5pbXBvcnQge3Nob3dPYnN0YWNsZXN9IGZyb20gJy4vbWFwL21hcFV0aWxzJztcblxubGV0IGdyaWRTaXplID0gMjA7XG5cbmRyYXdHcmlkKGdyaWRTaXplKTtcbmxldCBtYXAgPSBjcmVhdGVOb2RlcyhncmlkU2l6ZSk7XG5hZGROZWlnaGJvdXJzKG1hcCwgZ3JpZFNpemUpO1xuc2hvd09ic3RhY2xlcyhtYXAsIGdyaWRTaXplKTtcbmNvbnNvbGUubG9nKG1hcCk7XG5cbmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gIGNvbnNvbGUuZXJyb3IoJ0NsaWNrJyk7XG4gIGxldCB4ID0gZS5vZmZzZXRYOyAvLyBnZXQgWFxuICBsZXQgeSA9IGUub2Zmc2V0WTsgLy8gZ2V0IFlcbiAgY29uc29sZS5sb2coJ1Bvc2l0aW9uIHgnLCBlLm9mZnNldFgpOyAvLyBnZXQgWFxuICBjb25zb2xlLmxvZygnUG9zaXRpb24geScsIGUub2Zmc2V0WSk7IC8vIGdldCBZXG4gIGZvcihsZXQgZ3JpZCBvZiBtYXApIHtcbiAgICBsZXQgYm90dG9tUmlnaHRYID0gZ3JpZC54ICsgZ3JpZFNpemU7XG4gICAgbGV0IGJvdHRvbVJpZ2h0WSA9IGdyaWQueSArIGdyaWRTaXplO1xuICAgIGlmKHggPj0gZ3JpZC54ICYmIHggPCBib3R0b21SaWdodFggJiYgeSA+PSBncmlkLnkgJiYgeSA8IGJvdHRvbVJpZ2h0WSkge1xuICAgICAgY3R4LmZpbGxTdHlsZSA9ICdncmVlbic7XG4gICAgICBjdHguZmlsbFJlY3QoZ3JpZC54LCBncmlkLnksIGdyaWRTaXplICwgZ3JpZFNpemUpO1xuICAgICAgY29uc29sZS5sb2coJ2dyaWQnLCBncmlkLCAnd2FzIGNsaWNrZWQnKTtcbiAgICB9XG4gIH1cbn0pO1xuXG4vLyBzZXQgb25DbGlja0xpc3RlbmVyIGZvciByaWdodCBtb3VzZSBldmVudFxuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ2NvbnRleHRtZW51JywgKGUpID0+IHtcbiAgY29uc29sZS5lcnJvcignUmlnaHQgTW91c2UgQ2xpY2snKTtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBsZXQgeCA9IGUub2Zmc2V0WDsgLy8gZ2V0IFhcbiAgbGV0IHkgPSBlLm9mZnNldFk7IC8vIGdldCBZXG5cbiAgZm9yKGxldCBncmlkIG9mIG1hcCkge1xuICAgIGxldCBib3R0b21SaWdodFggPSBncmlkLnggKyBncmlkU2l6ZTtcbiAgICBsZXQgYm90dG9tUmlnaHRZID0gZ3JpZC55ICsgZ3JpZFNpemU7XG4gICAgaWYoeCA+PSBncmlkLnggJiYgeCA8IGJvdHRvbVJpZ2h0WCAmJiB5ID49IGdyaWQueSAmJiB5IDwgYm90dG9tUmlnaHRZKSB7XG4gICAgICBjdHguZmlsbFN0eWxlID0gJ3JlZCc7XG4gICAgICBjdHguZmlsbFJlY3QoZ3JpZC54LCBncmlkLnksIGdyaWRTaXplLCBncmlkU2l6ZSk7XG4gICAgICBjb25zb2xlLmxvZygnZ3JpZCcsIGdyaWQsICd3YXMgY2xpY2tlZCcpO1xuICAgIH1cbiAgfVxufSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZ2FtZS50cyIsImltcG9ydCB7XG4gIGNhbnZhcyxcbiAgY3R4LFxuICBXSURUSCxcbiAgSEVJR0hUXG59IGZyb20gJy4vbWFwQ29uZmlnJztcblxuZXhwb3J0IGNvbnN0IGRyYXdHcmlkID0gKGdyaWRTaXplOm51bWJlcikgPT4ge1xuICBmb3IobGV0IHkgPSAwOyB5IDw9IEhFSUdIVDsgeSs9IGdyaWRTaXplKSB7XG4gICAgZm9yKGxldCB4ID0gMDsgeCA8PSBXSURUSDsgeCs9IGdyaWRTaXplKSB7XG4gICAgICBjdHguc3Ryb2tlUmVjdCh4LCB5LCBncmlkU2l6ZSwgZ3JpZFNpemUpO1xuICAgIH1cbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21hcC9kcmF3R3JpZC50cyIsImltcG9ydCB7XG4gIGNhbnZhcyxcbiAgY3R4LFxuICBXSURUSCxcbiAgSEVJR0hUXG59IGZyb20gJy4uL21hcC9tYXBDb25maWcnO1xuXG5leHBvcnQgY29uc3QgY3JlYXRlTm9kZXMgPSAoZ3JpZFNpemU6bnVtYmVyKSA9PiB7XG4gIGxldCBtYXA6YW55W10gPSBbXTtcbiAgbGV0IHZhbHVlID0gMTtcbiAgbGV0IGlkID0gMDtcbiAgZm9yKGxldCB5ID0gMDsgeSA8PSBIRUlHSFQ7IHkrPSBncmlkU2l6ZSkge1xuICAgIGZvcihsZXQgeCA9IDA7IHggPD0gV0lEVEg7IHgrPSBncmlkU2l6ZSkge1xuICAgICAgbWFwLnB1c2goe1xuICAgICAgICBpZDogaWQsXG4gICAgICAgIHg6IHgsXG4gICAgICAgIHk6IHksXG4gICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgbmVpZ2hib3VyczogW11cbiAgICAgIH0pO1xuICAgICAgaWQrKztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG1hcDtcbn1cblxuZXhwb3J0IGNvbnN0IGFkZE5laWdoYm91cnMgPSAobWFwOmFueVtdLCBncmlkU2l6ZTpudW1iZXIpID0+IHtcbiAgZm9yKGxldCBub2RlIG9mIG1hcCkge1xuICAgIGxldCBuID0gbmVpZ2hib3Vycyhub2RlLCBtYXAsIGdyaWRTaXplKTtcbiAgICBub2RlLm5laWdoYm91cnMgPSBuO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBuZWlnaGJvdXJzID0gKG5vZGU6YW55LCBtYXA6YW55W10sIGdyaWRTaXplOm51bWJlcikgPT4ge1xuICBsZXQgZGlycyA9IFtcbiAgICB7eDogLWdyaWRTaXplLCB5OiBncmlkU2l6ZX0sXG4gICAge3g6IGdyaWRTaXplLCB5OiAtZ3JpZFNpemV9LFxuICAgIHt4OiBncmlkU2l6ZSwgeTogLWdyaWRTaXplfSxcbiAgICB7eDogLWdyaWRTaXplLCB5OiBncmlkU2l6ZX0sXG4gICAge3g6IGdyaWRTaXplLCB5OiBncmlkU2l6ZX0sXG4gICAge3g6IC1ncmlkU2l6ZSwgeTogZ3JpZFNpemV9LFxuICAgIHt4OiBncmlkU2l6ZSwgeTogZ3JpZFNpemV9LFxuICAgIHt4OiBncmlkU2l6ZSwgeTogZ3JpZFNpemV9XG4gIF07XG4gIGxldCByZXN1bHQgPSBbXTtcbiAgZm9yKGxldCBkaXIgb2YgZGlycykge1xuICAgIGxldCBuZWlnaGJvciA9IHtcbiAgICAgIHg6IG5vZGUueCArIGRpci54LFxuICAgICAgeTogbm9kZS55ICsgZGlyLnlcbiAgICB9XG4gICAgZm9yKGxldCBlbCBvZiBtYXApIHtcbiAgICAgIGlmKGVsLnggPT09IG5laWdoYm9yLnggJiYgZWwueSA9PT0gbmVpZ2hib3IueSkge1xuICAgICAgICByZXN1bHQucHVzaCh7XG4gICAgICAgICAgaWQ6IGVsLmlkLFxuICAgICAgICAgIHg6IGVsLngsXG4gICAgICAgICAgeTogZWwueSxcbiAgICAgICAgICB2YWx1ZTogZWwudmFsdWVcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFwL2NyZWF0ZU1hcC50cyIsImltcG9ydCB7Y2FudmFzLCBjdHh9IGZyb20gJy4vbWFwQ29uZmlnJztcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZU1vdW50YWlucyA9IChtYXA6YW55W10sIHN0YXJ0WDpudW1iZXIsIHN0YXJ0WTpudW1iZXIsIHdpZHRoOm51bWJlciwgaGVpZ2h0Om51bWJlcikgPT4ge1xuXG4gIGZvcihsZXQgbm9kZSBvZiBtYXApIHtcblxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBzaG93T2JzdGFjbGVzID0gKG1hcDphbnlbXSwgZ3JpZFNpemU6bnVtYmVyKSA9PiB7XG4gIGZvcihsZXQgbm9kZSBvZiBtYXApIHtcbiAgICBpZihub2RlLnZhbHVlID09PSAwKSB7XG4gICAgICBjdHguZmlsbFN0eWxlID0gJyM4QjQ1MTMnO1xuICAgICAgY3R4LmZpbGxSZWN0KG5vZGUudG9wTGVmdFgsIG5vZGUudG9wTGVmdFksIGdyaWRTaXplLCBncmlkU2l6ZSlcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IG5laWdoYm91cnMgPSAobm9kZTphbnkpID0+IHtcbiAgbGV0IGRpcnMgPSBbXG4gICAgWy0xLCAtMV0sIFswLCAtMV0sIFsxLCAtMV0sIFstMSwgMF0sIFsxLCAwXSwgWy0xLCAxXSwgWzAsIDFdLCBbMSwgMV1cbiAgXTtcbiAgbGV0IHJlc3VsdCA9IFtdO1xuICBmb3IobGV0IGRpciBvZiBkaXJzKSB7XG4gICAgcmVzdWx0LnB1c2gobm9kZVswXSArIGRpclswXSwgbm9kZVsxXSArIGRpclsxXSlcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21hcC9tYXBVdGlscy50cyJdLCJzb3VyY2VSb290IjoiIn0=