class FileInputDirective {
  static register(module) {
    module.directive('appFileInput',
      ($injector) => $injector.instantiate(this));
  }

  static get $inject() {
    return [];
  }

  constructor() {
    this.restrict = 'A';

    this.link = ($scope, $element, $attrs) => {
      $element.on('change', ({ target }) => $scope.$apply(() => {
        const files = Array.prototype.values.call(target.files);
        const expression = $attrs.appFileInput;

        for (const file of files) {
          $scope.$eval(expression, { file });
        }
      }));
    };
  }
}

export default FileInputDirective;
