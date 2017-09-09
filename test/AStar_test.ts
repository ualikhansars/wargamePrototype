import { expect, should, assert} from 'chai';

import {getMinFScore} from '../src/path/AStar';

describe('A* Algorithm tests', function() {
  describe('getMinFScore', function() {
    let open = new Map();
    open.set({x: 12, y: 30}, 200);
    open.set({x: 11, y: 31}, 700);
    open.set({x: 22, y: 300}, 120);
    open.set({x: 120, y: 230}, 334);
    open.set({x: 27, y: 47}, 1200);
    open.set({x: 39, y: 52}, 430);
    open.set({x: 121, y: 222}, 600);
    it('min value should be 120, return node is {node: {x: 12, y: 30}, value: 120}', function() {
      assert.equal(getMinFScore(open)[1], 120);
    });
  });
});
