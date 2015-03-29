class PlaylistsService {
  static get $inject() {
    return ['$q'];
  }

  constructor($q) {
    this.$q = $q;
  }

  get(id) {
    return this.getAll().then((playlists) => {
      return playlists.find((playlist) => playlist.id === id);
    });
  }

  getAll() {
    return this.$q.when([{
      id: 'X',
      title: 'Mes dessins',
      pictures: []
    }]);
  }
}

export default PlaylistsService;
