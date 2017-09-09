import { expect, should, assert} from 'chai';

import {getMinFScore} from '../src/path/AStar';

let open:any = new Map();
let node1 = {x: 12, y: 30};
let node2 = {x: 11, y: 31};
let node3 = {x: 22, y: 300};
let node4 = {x: 120, y: 230};
let node5 = {x: 27, y: 47};
let node6 = {x: 39, y: 52};
let node7 = {x: 121, y: 222};

open.set(node1, 200);
open.set(node2, 700);
open.set(node3, 120);
open.set(node4, 334);
open.set(node5, 1200);
open.set(node6, 430);
open.set(node7, 600);

describe('A* Algorithm tests', function() {
  describe('getMinFScore', function() {
    it('min value should be 120, return node is {node: {x: 12, y: 30}, value: 120}', function() {
      assert.equal(getMinFScore(open)[1], 120);
    });
  });
  describe('Test finish node', function() {
    it('finish node is {x: 12, y:30}', function() {
      assert.equal(getMinFScore(open)[0].x, 22);
      assert.equal(getMinFScore(open)[0].y, 300);
    });
  });
  describe('Delete node from map', function() {
    it('Delete node {x: 27, y: 52}, 430', function() {
      open.delete(node5);
      assert.equal(open.has(node1), true);
      assert.equal(open.has(node5), false);
    });
  });
});
