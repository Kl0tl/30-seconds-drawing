const FULLSCREEN_CHANGE_EVENT = 'fullscreenchange webkitfullscreenchange mozfullscreenchange';
const FULLSCREEN_ERROR_EVENT = 'fullscreenerror webkitfullscreenerror mozfullscreenerror';

class FullscreenService {
  static register(module) {
    module.service(this.name, this);
  }

  static get $inject() {
    return ['$document', '$q'];
  }

  constructor($document, $q) {
    this.$document = $document;
    this.$q = $q;
  }

  get isEnabled() {
    return ['fullscreenEnabled', 'webkitFullscreeEnabled', 'mozFullScreenEnabled']
      .some((property) => this.$document.prop(property));
  }

  get fullscreenElement() {
    return ['fullscreenElement', 'webkitFullscreeElement', 'mozFullScreenElement']
      .find((property) => this.$document.prop(property));
  }

  request(element) {
    const method = element.requestFullscreenElement
      || element.webkitFullscreenElement
      || element.mozRequestFullScreenElement;

    return this.$q((resolve, reject) => {
      this.$document.one(FULLSCREEN_CHANGE_EVENT, resolve);
      this.$document.one(FULLSCREEN_ERROR_EVENT, reject);
      method.call(element);
    });
  }
}

export default FullscreenService;
