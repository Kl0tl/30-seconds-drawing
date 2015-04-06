import 'angular-material';

import angular from 'angular';

import ErrorToastController from './error-toast-controller';
import ErrorToastService from './error-toast-service';

const module = angular.module('app.error-toast-service', ['ngMaterial']);

ErrorToastController.register(module);
ErrorToastService.register(module);

export default module;
