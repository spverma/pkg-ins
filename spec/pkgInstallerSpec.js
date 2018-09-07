let expect = require('chai').expect;
let PkgInstaller = require('../source/pkgInstaller');
describe('Package Installer', function () {
  it('accepts an array of strings', function () {
    let packages = ['d1:d2', 'd3:d4'];
    let installer = new PkgInstaller(['d1:d2', 'd3:d4']);
    expect(installer.packages).to.deep.equal(packages);
  });

  it('returns a string', function () {
    expect(new PkgInstaller(['d1:d2', 'd3:d4']).install()).to.be.a('string');
  });

  describe('fails when', function () {
    it('given a string', function () {
      expect(function () {
        new PkgInstaller('a');
      }).to.throw();
    });

    it('given a number', function () {
      expect(function () {
        new PkgInstaller(1);
      }).to.throw();
    });

    it('given an object', function () {
      expect(function () {
        new PkgInstaller({
          a: 'b'
        });
      }).to.throw();
    });

    it('array contains numbers', function () {
      expect(function () {
        new PkgInstaller([1, 2]);
      }).to.throw();
    });
  });

  describe('should give an error', function () {
    it('invalid input example', function () {
      var input = ["KittenService: ",
      "Leetmeme: Cyberportal",
      "Cyberportal: Ice",
      "CamelCaser: KittenService",
      "Fraudstream: ",
      "Ice: Leetmeme"
    ];
      expect(new PkgInstaller(input).install()).to.throw('cicular reference');
});
  });

  describe('examples', function () {
    it('valid input example 1', function () {
      var input = [
        'KittenService:CamelCaser',
        'CamelCaser:'
      ];
      expect(new PkgInstaller(input).install()).to.deep.equal('CamelCaser, KittenService');
    });

    it('valid input example 2', function () {
      var input = [
        'KittenService:',
        'Letmeme:Cyberportal',
        'Cyberportal:Ice',
        'CamelCaser:KittenService',
        'Fraudstream:Letmeme',
        'Ice:'
      ];
      expect(new PkgInstaller(input).install()).to.deep.equal('KittenService, Ice, Cyberportal, Letmeme, CamelCaser, Fraudstream');
    });
  });
});