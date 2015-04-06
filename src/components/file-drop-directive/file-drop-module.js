import angular from 'angular';

import errorToastServiceModule from 'components/error-toast-service/error-toast-module';

import FileDropDirective from './file-drop-directive';

const module = angular.module('app.file-drop-module', [errorToastServiceModule.name]);

FileDropDirective.register(module);

export default module;
