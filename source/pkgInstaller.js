class PkgInstaller {
    constructor(packages) {
      this.name ="PkgInstaller";
      if (packages == null)
          throw 'packages can not be null or empty';
      if (!Array.isArray(packages))
          throw 'packages should be in array';
      packages.forEach((value)=> {
          if (typeof value != 'string')
              throw 'items in the array should be string type';
      });
  
      this.packages = packages;
    }
    
    parsePackages() {
        let results = {};
        this.packages.forEach((value)=> {
          let values = value.split(':');
          if (values.length != 2) {
            throw 'unexpected input in string';
          }
    
          let pkg = values[0].trim(),
            dependency = values[1].trim();
    
          if (pkg.length == 0) {
            throw 'invalid package length';
          }
    
          if (!results[pkg]) results[pkg] = [];
          if (!results[dependency] && dependency.length > 0) results[dependency] = [];
          if (dependency.length > 0)
            results[pkg].push(dependency);
        });
        return results;
      }
  
    topSort(parsedPackages) {
        let results = [];
        let sorted = {};
    
        Object.keys(parsedPackages).forEach((p)=> {
          sort(p, []);
        });
    
        function sort(p, ancestors) {
          if (sorted[p])
            return;
          ancestors.push(p);
          var pkg = parsedPackages[p];
          pkg.forEach((dependency)=> {
            if (ancestors.indexOf(dependency) >= 0) {
              throw 'circular reference';
            }
            sort(dependency, ancestors);
          });
          sorted[p] = true;
          results.push(p);
        }
        return results;
      }
  
  install() {
        let parsedPackages = this.parsePackages();
        return this.topSort(parsedPackages).join(', ');
      }
  }
module.exports = PkgInstaller;