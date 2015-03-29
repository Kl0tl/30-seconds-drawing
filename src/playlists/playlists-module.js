import angular from 'angular';

import angularUIRouterModule from 'angular-ui-router';
import playerDirectiveModule from 'components/player-directive/player-module';

import configure from './playlists-config';
import PlaylistsController from './playlists-controller';
import PlaylistsService from './playlists-service';

const module = angular.module('app.playlists', [
  angularUIRouterModule.name,
  playerDirectiveModule.name
]);

configure(module);
PlaylistsController.register(module);
PlaylistsService.register(module)

export default module;
