class PlaylistsController{
  static get $inject() {
    return ['playlist'];
  }

  constructor(playlist) {
    this.playlist = playlist;
  }
}

export default PlaylistsController;
