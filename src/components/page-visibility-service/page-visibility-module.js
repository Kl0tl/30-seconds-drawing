import angular from 'angular';

import PageVisibilityService from './page-visibility-service';

const module = angular.module('app.page-visibility-service', []);

PageVisibilityService.register(module);

export default module;
