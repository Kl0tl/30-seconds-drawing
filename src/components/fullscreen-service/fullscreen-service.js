const FULLSCREEN_CHANGE_EVENT = 'fullscreenchange webkitfullscreenchange mozfullscreenchange';
const FULLSCREEN_ERROR_EVENT = 'fullscreenerror webkitfullscreenerror mozfullscreenerror';

class FullscreenService {
  static register(module) {
    module.service('FullscreenService', this);
  }

  static get $inject() {
    return ['$document', '$q'];
  }

  constructor($document, $q) {
    this.$document = $document;
    this.$q = $q;
  }

  get document() {
    return this.$document[0];
  }

  get isEnabled() {
    return this.document.fullscreenEnabled
      || this.document.webkitFullscreeEnabled
      || this.document.mozFullScreenEnabled;
  }

  get fullscreenElement() {
    return this.document.fullscreenElement
      || this.document.webkitFullscreenElement
      || this.document.mozFullScreenElement;
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
