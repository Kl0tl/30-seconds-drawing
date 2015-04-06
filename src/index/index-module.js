import 'angular-material';
import 'angular-ui-router';

import angular from 'angular';

import countdownDirectiveModule from 'components/countdown-directive/countdown-module';
import fileInputDirectiveModule from 'components/file-input-directive/file-input-module';
import fileDropDirectiveModule from 'components/file-drop-directive/file-drop-module';
import errorToastServiceModule from 'components/error-toast-service/error-toast-module';
import pageVisibilityServiceModule from 'components/page-visibility-service/page-visibility-module';

import './index-styles.css!';

import playButtonIcon from './assets/ic_play_arrow_24px.svg!text';
import uploadButtonIcon from './assets/ic_file_upload_24px.svg!text';
import shuffleButtonIcon from './assets/ic_shuffle_24px.svg!text';
import cycleButtonIcon from './assets/ic_loop_24px.svg!text';

import configure from './index-config';
import IndexController from './index-controller';

const module = angular.module('app.index', [
  'ngMaterial', 'ui.router',
  countdownDirectiveModule.name,
  fileInputDirectiveModule.name,
  fileDropDirectiveModule.name,
  errorToastServiceModule.name,
  pageVisibilityServiceModule.name
]);

module.run(($templateCache) => {
  $templateCache.put('ic_play_arrow_24px.svg', playButtonIcon);
  $templateCache.put('ic_file_upload_24px.svg', uploadButtonIcon);
  $templateCache.put('ic_shuffle_24px.svg', shuffleButtonIcon);
  $templateCache.put('ic_loop_24px.svg', cycleButtonIcon);
});

configure(module);
IndexController.register(module);

export default module;
