import { expect } from 'chai';
import BlogPostRoute from '../../src/route/BlogPostRoute';

describe(`BlogPostRoute`, function() {
  const existingPostName = 'postname-1'
  const path = '/blog/';
  const req = {
    method: 'GET',
    url: `${path}${existingPostName}`,
  };
  const unknownPostName = 'postname-2'
  const badPath = '/asdfasdf/';
  const badReq = {
    method: 'GET',
    url: `${badPath}${unknownPostName}`,
  };

  const route = new BlogPostRoute(path, null, {
      validPostSlugListGetter: () => [ existingPostName ],
    }
  );

  describe(`path`, function() {
    it('should return what was set on construction', function() {
      expect(route.path).to.be.equal(path);
    });
  });

  describe(`matches(req)`, function() {
    it('should be a function', function() {
      expect(typeof route.matches).to.be.equal('function');
    });
    it('should return a boolean', function() {
      expect(route.matches(req)).to.be.a('boolean');
    });
    it('should return true for a string containing path', function() {
      expect(route.matches(req)).to.be.true;
    });
    it('should return false for a string not containing path', function() {
      expect(route.matches(badReq)).to.be.false;
    });
  });

  describe(`isValid(req)`, function() {
    it('should be a function', function() {
      expect(typeof route.isValid).to.be.equal('function');
    });
    it('should return a boolean', function() {
      expect(route.isValid(req)).to.be.a('boolean');
      expect(route.isValid(badReq)).to.be.a('boolean');
    });
    it('should return false when matches() is false', function() {
      expect(route.matches(badReq)).to.be.equal(route.isValid(badReq));
    });
  });
});
