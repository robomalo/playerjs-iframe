import getOrigin from '../../../src/util/get-origin';

describe('getScript()', () => {
  it('should return a correctly formatted origin', () => {
    assert.equal(getOrigin('//foo.com'), 'http://foo.com');
    assert.equal(getOrigin('//foo.com/'), 'http://foo.com');
    assert.equal(getOrigin('http://foo.com'), 'http://foo.com');
    assert.equal(getOrigin('https://www.foo.com/'), 'https://www.foo.com');
    assert.equal(getOrigin('https://www.foo.com/path/to/bar'), 'https://www.foo.com');
  });
});