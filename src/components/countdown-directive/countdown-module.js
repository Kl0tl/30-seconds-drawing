import 'angular-material';

import angular from 'angular';

import CountdownController from './countdown-controller';
import CountdownDirective from './countdown-directive';

const module = angular.module('app.countdown-directive', ['ngMaterial']);

CountdownController.register(module);
CountdownDirective.register(module);

export default module;
