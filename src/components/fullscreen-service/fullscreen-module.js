import angular from 'angular';

import FullscreenService from './fullscreen-service';

const module = angular.module('app.fullscreen-service', []);

FullscreenService.register(module);

export default module;
