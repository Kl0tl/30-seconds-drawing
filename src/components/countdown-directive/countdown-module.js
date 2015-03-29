import angular from 'angular';

import angularMaterialModule from 'angular-material';

import CountdownController from './countdown-controller';
import CountdownDirective from './countdown-directive';

const module = angular.module('app.countdown-directive', [angularMaterialModule.name]);

CountdownController.register(module);
CountdownDirective.register(module);

export default module;
