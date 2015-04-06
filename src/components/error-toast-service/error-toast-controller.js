class ErrorToastController {
  static register(module) {
    module.controller(this.name, this);
  }

  static get $inject() {
    return ['$mdToast', 'message'];
  }

  constructor($mdToast, message) {
    this.$mdToast = $mdToast;
    this.message = message;
  }

  onClicked() {
    this.$mdToast.hide();
  }
}

export default ErrorToastController;
