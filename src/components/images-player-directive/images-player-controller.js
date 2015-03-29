class ImagesPlayerController {
  static register(module) {
    module.controller('ImagesPlayerController', this);
  }

  static get $inject() {
    return ['$timeout', '$element', 'FullscreenService'];
  }

  constructor($timeout, $element, FullscreenService) {
    this.$timeout = $timeout;
    this.$element = $element;
    this.FullscreenService = FullscreenService;

    this.current = null;
    this.countdown = 30;
    this.isStarted = false;
    this.isPlaying = false;
    this.isLoading = false;
    this.isShuffled = false;
    this.isAuto = false;

    this._promise = null;
    this._iterator = null;
  }

  onPlayButtonClicked() {
    if (!this.isStarted) this.start();
    else this.play();
  }

  onPauseButtonClicked() {
    this.pause();
  }

  onShuffleButtonClicked() {
    this.isShuffled = !this.isShuffled;
  }

  onAutoButtonClicked() {
    this.isAuto = !this.isAuto;
  }

  onFullscreenButtonClicked() {
    const element = this.$element[0];
    this.FullscreenService.request(element);
  }

  start() {
    this._iterator = this[Symbol.iterator]();
    this.isStarted = true;
    this.play();
  }

  play() {
    let stepImmediately = true;

    const step = () => {
      const { value: promise, done } = this._iterator.next();

      if (done) this.stop();
      else {
        this.isLoading = true;

        promise.then((image) => {
          this.current = image;
          this.countdown -= 1;

          this.isLoading = false;

          if (stepImmediately || this.isAuto) {
            stepImmediately = false;
            this._promise = this.$timeout(step, 1000);
          } else {
            this.isPlaying = false;
          }
        });
      }
    };

    this.isPlaying = true;

    step();
  }

  pause() {
    this.isPlaying = false;
    this.$timeout.cancel(this._promise);
  }

  stop() {
    this._iterator = null;
    this.isStarted = false;
    this.isPlaying = false;
  }

  *[Symbol.iterator]() {
    const images = this.playlist.images.slice();
    const seen = new Set();

    while (seen.size < images.length) {
      const unseen = images.filter((image) => !seen.has(image));
      const candidates = unseen.filter((image) => image.isLoaded);

      if (candidates.length) {
        yield this.$q((resolve) => {
          const image = this.isShuffled ?
            candidates[Math.floor(Math.random() * candidates.length)]
              : candidates[0];

          resolve(mark(image));
        });
      } else {
        const promise = this.isShuffled ?
          Promise.race(unseen.map((image) => image.promise))
            : unseen[0].promise;

        yield promise.then(mark);
      }
    }

    function mark(image) {
      seen.add(image);
      return image;
    }
  }
}

export default ImagesPlayerController;
