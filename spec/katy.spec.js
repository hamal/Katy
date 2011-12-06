(function() {
  var KT;

  KT = require('../lib/katy.coffee').KT;

  require('UnderscoreMatchersForJasmine');

  describe("Wrapping Katy", function() {
    var khw;
    khw = KT("Hello World");
    describe('K', function() {
      it("should provide K", function() {
        return expect(khw).toRespondTo('K');
      });
      it('should execute the function', function() {
        var called;
        called = false;
        khw.K(function() {
          return called = true;
        });
        return expect(called).toBeTruthy();
      });
      return it('should return the receiver', function() {
        return expect(khw.K(function(x) {
          return 'XXX' + x + 'XXX';
        })).toEqual("Hello World");
      });
    });
    return describe('T', function() {
      it("should provide T", function() {
        return expect(khw).toRespondTo('T');
      });
      it('should execute the function', function() {
        var called;
        called = false;
        khw.T(function() {
          return called = true;
        });
        return expect(called).toBeTruthy();
      });
      return it('should return the result', function() {
        return expect(khw.T(function(x) {
          return 'XXX' + x + 'XXX';
        })).toEqual("XXXHello WorldXXX");
      });
    });
  });

  describe('Installing Katy', function() {
    var hw;
    KT.mixInto(String);
    hw = "Hello World";
    describe('K', function() {
      it("should provide K", function() {
        return expect(hw).toRespondTo('K');
      });
      it('should execute the function', function() {
        var called;
        called = false;
        hw.K(function() {
          return called = true;
        });
        return expect(called).toBeTruthy();
      });
      return it('should return the receiver', function() {
        return expect(hw.K(function(x) {
          return 'XXX' + x + 'XXX';
        })).toEqual("Hello World");
      });
    });
    return describe('T', function() {
      it("should provide T", function() {
        return expect(hw).toRespondTo('T');
      });
      it('should execute the function', function() {
        var called;
        called = false;
        hw.T(function() {
          return called = true;
        });
        return expect(called).toBeTruthy();
      });
      return it('should return the result', function() {
        return expect(hw.T(function(x) {
          return 'XXX' + x + 'XXX';
        })).toEqual("XXXHello WorldXXX");
      });
    });
  });

  describe("Functionalizing Strings", function() {
    describe("lambdas", function() {
      var k123;
      KT.installStringLambdas();
      k123 = KT([1, 2, 3]);
      it('should accept a string lambda for K', function() {
        return expect(k123.K('.concat([4, 5, 6])')).toEqual([1, 2, 3]);
      });
      return it('should accept a string lambda for T', function() {
        return expect(k123.T('.concat([4, 5, 6])')).toEqual([1, 2, 3, 4, 5, 6]);
      });
    });
    return describe('messages', function() {
      var k123;
      k123 = KT([1, 2, 3]);
      it('should accept a message and argument(s) for K', function() {
        return expect(k123.K('concat', [4, 5, 6])).toEqual([1, 2, 3]);
      });
      return it('should accept a message and argument(s) for T', function() {
        return expect(k123.T('concat', [4, 5, 6])).toEqual([1, 2, 3, 4, 5, 6]);
      });
    });
  });

  describe('chaining', function() {
    it('should not be mixed into array', function() {
      return expect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).not.toRespondToAny('K', 'T');
    });
    return it('should chain', function() {
      return expect(KT([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).chain().K('pop').K('pop').K('pop').T('pop').value()).toEqual(7);
    });
  });

}).call(this);
