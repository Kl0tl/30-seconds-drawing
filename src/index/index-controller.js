import shuffle from 'array-shuffle';

class IndexController {
  static register(module) {
    module.controller(this.name, this);
  }

  static get $inject() {
    return ['$scope', '$state', '$timeout', 'ErrorToastService', 'PageVisibilityService'];
  }

  constructor($scope, $state, $timeout, ErrorToastService, PageVisibilityService) {
    this.$scope = $scope;
    this.$state = $state;
    this.$timeout = $timeout;
    this.ErrorToastService = ErrorToastService;
    this.PageVisibilityService = PageVisibilityService;

    const unlisten = this.PageVisibilityService
      .onChange(() => this.onVisibilityChange());

    $scope.$on('$destroy', unlisten);

    this.images = [];
    this.countdown = 30;
    this.isStarted = false;
    this.isPaused = true;

    this._pausedAt = 0;
    this._lastTick = 0;
    this._pendings = 0;
    this._timeoutPromise = 0;
  }

  get current() {
    return this.images[0];
  }

  get isLoading() {
    return this._pendings > 0;
  }

  get canPlay() {
    return this.images.length > 0;
  }

  get shouldShuffle() {
    return this.$state.$current.data.shuffle;
  }

  set shouldShuffle(value) {
    this.$state.$current.data.shuffle = value;
    if (value) this.shuffle();
  }

  get shouldCycle() {
    return this.$state.$current.data.cycle;
  }

  set shouldCycle(value) {
    this.$state.$current.data.cycle = value;
  }

  onClicked() {
    this.pause();
  }

  onPlayButtonClicked() {
    if (this.canPlay) this.play();
  }

  onShuffleButtonClicked() {
    this.shouldShuffle = !this.shouldShuffle;
  }

  onCycleButtonClicked() {
    this.shouldCycle = !this.shouldCycle;
  }

  onFile(file) {
    const reader = new FileReader();

    this._pendings += 1;

    reader.onload = () => this.$scope.$apply(() => {
      this._pendings -= 1;
      this.images.push(reader.result);

      if (this._pendings === 0 && this.shouldShuffle) {
        this.shuffle();
      }
    });

    reader.onerror = () => {
      const message = `Error loading "${ file.name }" :(`;
      this.ErrorToastService.show(message);
    };

    reader.readAsDataURL(file);
  }

  onVisibilityChange() {
    if (!this.PageVisibilityService.isVisible) {
      this.pause();
    }
  }

  play() {
    const tick = () => {
      this.countdown -= 1;
      this._lastTick = Date.now();

      if (this.countdown === 0) {
        this.countdown = 30;
        if (this.canPlay && this.shouldCycle) {
          this.images.shift();
        } else {
          this.isPaused = true;
          this.isStarted = false;
          return;
        }
      }

      this._timeoutPromise = this.$timeout(tick, 1000);
    };

    let delay = 1000;

    if (!this.isStarted) {
      this.isStarted = true;
      this._lastTick = Date.now();
    }

    if (this.isPaused) {
      delay -= this._pausedAt - this._lastTick;
      this.isPaused = false;
    }

    this._lastTick = Date.now();

    this._timeoutPromise = this.$timeout(tick, delay);
  }

  pause() {
    this.isPaused = true;
    this._pausedAt = Date.now();
    this.$timeout.cancel(this._timeoutPromise);
  }

  shuffle() {
    this.images = shuffle(this.images);
  }
}

export default IndexController;
