import angular from 'angular';

import fullscreenServiceModule from 'components/fullscreen-service/fullscreen-module';
import countdownDirectiveModule from 'components/countdown-directive/countdown-module';

import ImagesPlayerController from './images-player-controller';
import ImagesPlayerDirective from './images-player-directive';

const module = angular.module('app.images-player-directive', [
  fullscreenServiceModule.name,
  countdownDirectiveModule.name
]);

ImagesPlayerController.register(module);
ImagesPlayerDirective.register(module);

export default module;
