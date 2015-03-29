class CountdownController {
  static register(module) {
    module.controller(this.name, this);
  }

  static get $inject() {
    return [];
  }

  constructor() {
    this.initial = this.value;
  }

  get progress() {
    return (1 - (this.value / this.initial)) * 100;
  }
}

export default CountdownController;
