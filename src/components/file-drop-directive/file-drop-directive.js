class FileDropDirective {
  static register(module) {
    module.directive('appFileDrop',
      ($injector) => $injector.instantiate(this));
  }

  static get $inject() {
    return ['$parse', 'ErrorToastService'];
  }

  constructor($parse, ErrorToastService) {
    this.restrict = 'A';

    this.link = ($scope, $element, $attrs) => {
      $element.on('dragover', ($event) => {
        $event.preventDefault();
        $event.dataTransfer.effectAllowed = 'copy';
      });

      $element.on('dragenter', () => $scope.$apply(() => $scope.isDragging = true));
      $element.on('dragleave', () => $scope.$apply(() => $scope.isDragging = false));

      $element.on('drop', ($event) => $scope.$apply(() => {
        $event.preventDefault();

        const { accept = [], multiple = false } = $attrs.appFileDropOptions ?
          $parse($attrs.appFileDropOptions)($scope) : {};

        const files = Array.prototype.values.call($event.dataTransfer.files);

        for (const file of files) {
          if (accept.some((type) => type == file.type)) {
            $scope.$eval($attrs.appFileDrop, { file });
          } else {
            ErrorToastService.show(`The file "${ file.name }" is not a supported image :(`);
          }
          if (!multiple) break;
        }

        $scope.isDragging = false;
      }));
    };
  }
}

export default FileDropDirective;
