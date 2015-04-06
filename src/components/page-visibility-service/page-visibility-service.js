const VISIBILITY_CHANGE_EVENT = 'visibilitychange webkitvisibilitychange mozvisibilitychange msvisibilitychange';

class PageVisibilityService {
  static register(module) {
    module.service(this.name, this);
  }

  static get $inject() {
    return ['$document', '$rootScope'];
  }

  constructor($document, $rootScope) {
    this.$document = $document;
    this.$document.on(VISIBILITY_CHANGE_EVENT, () => $rootScope.$apply(() => {
      for (const listener of this._listeners) {
        listener();
      }
    }));

    this._listeners = [];
  }

  get isVisible() {
    return !['hidden', 'webkitHidden', 'mozHidden', 'msHidden']
      .some((property) => this.$document.prop(property));
  }

  onChange(listener) {
    this._listeners.push(listener);

    return () => {
      const indexOfListener = this._listeners.indexOf(listener);

      if (indexOfListener > -1) {
        this._listeners.splice(indexOfListener, 1);
      }
    };
  }
}

export default PageVisibilityService;
