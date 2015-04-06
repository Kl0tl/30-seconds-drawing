import angular from 'angular';

import indexModule from './index/index-module';

const module = angular.module('app', [indexModule.name]);

angular.bootstrap(document.querySelector('body'), ['app']);

export default module;
