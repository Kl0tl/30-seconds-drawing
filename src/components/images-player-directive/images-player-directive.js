import template from './player-template.html!text';

class ImagesPlayerDirective {
  static register(module) {
    module.directive('appImagesPlayer', this);
  }

  static get $inject() {
    return [];
  }

  constructor() {
    this.restrict = 'E';
    this.template = template;
    this.scope = { playlist: '=' };
    this.controller = 'PlayerController';
    this.controllerAs = 'vm';
    this.bindToController = true;
  }
}

export default ImagesPlayerDirective;
