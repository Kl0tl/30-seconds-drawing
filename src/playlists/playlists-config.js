import template from './playlists-template.html!text';

function configure(module) {
  module
    .config(($stateProvider) => {
      $stateProvider.state('playlists', {
        url: '/playlists/:playlistId',
        template: template,
        controller: 'PlaylistsController',
        controllerAs: 'vm',
        resolve: {
          playlist($stateParams, PlaylistsService) {
            if (!$stateParams.playlistId) return null;
            return PlaylistsService.get($stateParams.playlistId);
          }
        }
      });
    })
    .config(($urlRouterProvider) => {
      $urlRouterProvider.when('', '/playlists');
    });
}

export default configure;
