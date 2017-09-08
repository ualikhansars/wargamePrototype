import { expect, should, assert} from 'chai';

import {getMinFScore} from '../src/path/AStar';

describe('A* Algorithm tests', function() {
  describe('getMinFScore', function() {
    let open = [870, 4234, 324, 120, 670, 547, 320];
    it('min value should be 120', function() {
      assert.equal(getMinFScore(open), 120);
    });
  });
});
