import angular from 'angular';

import playlistsModule from './playlists/playlists-module';

const module = angular.module('app', [playlistsModule.name]);

export default module;
