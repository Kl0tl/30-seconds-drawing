import template from './index-template.html!text';

function configure(module) {
  module
    .config(($stateProvider) => {
      $stateProvider.state('index', {
        url: '/?shuffle&cycle',
        template: template,
        controller: 'IndexController',
        controllerAs: 'vm',
        data: { shuffle: false, cycle: true },
        onEnter($stateParams) {
          for (const key in this.data) {
            const value = $stateParams[key];
            if (value === undefined) continue;
            this.data[key] = Boolean(JSON.parse(value));
          }
        }
      });
    })
    .config(($urlRouterProvider) => {
      $urlRouterProvider.otherwise('/');
    });
}

export default configure;
