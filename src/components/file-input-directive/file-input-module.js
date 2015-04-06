import angular from 'angular';

import FileInputDirective from './file-input-directive';

const module = angular.module('app.file-input-directive', []);

FileInputDirective.register(module);

export default module;
