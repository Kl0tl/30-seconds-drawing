import template from './countdown-template.html!text';

class CountdownDirective {
  static register(module) {
    module.directive('appCountdown', this);
  }

  static get $inject() {
    return [];
  }

  constructor() {
    this.restrict = 'E';
    this.template = template;
    this.scope = { value: '=' };
    this.controller = 'CountdownController';
    this.controllerAs = 'vm';
    this.bindToController = true;
  }
}

export default CountdownDirective;
