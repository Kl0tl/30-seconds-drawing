import template from './error-toast-template.html!text';

class ErrorToastService {
  static register(module) {
    module.service(this.name, this);
  }

  static get $inject() {
    return ['$mdToast'];
  }

  constructor($mdToast) {
    this.$mdToast = $mdToast;
  }

  show(message, options = {}) {
    return this.$mdToast.show(Object.assign({
      template: template,
      locals: { message },
      controller: 'ErrorToastController',
      controllerAs: 'vm'
    }, options));
  }
}

export default ErrorToastService;
