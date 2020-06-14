const state = {

    _lsKey: 'favorites-photos',
    _users: [],
    _albums: {
    },
    _photos: {
    },
    _favoritePhotos: [],

    init() {

        let favPhotos = localStorage.getItem(this._lsKey);

        if (favPhotos) {
            this._favoritePhotos = JSON.parse(favPhotos);
        }

    },

    async loadUsers() {

        if (this._users.length > 0) {
            return;
        }

        let response = await api.getUsers();
        this._users = response.filter(u => u.name !== undefined);

    },

    async loadAlbums(userId) {

        if (this._albums[userId] && this._albums[userId].length > 0) {
            return;
        }

        this._albums[userId] = await api.getAlbums(userId);

    },

    async loadPhotos(albumId) {

        if (this._photos[albumId] && this._photos[albumId].length > 0) {
            return;
        }

        this._photos[albumId] = await api.getPhotos(albumId);

    },

    async toggleFavorite(photo) {

        const favPhotos = this._favoritePhotos.filter((p) => p.id !== photo.id);
        let added = false;

        if (favPhotos.length === this._favoritePhotos.length) {
            this._favoritePhotos.push(photo);
            added = true;
        } else {
            this._favoritePhotos = favPhotos;
        }

        localStorage.setItem(this._lsKey, JSON.stringify(this._favoritePhotos));

        return added;

    },

    getUsers() {
        return this._users;
    },

    getAlbums(userId) {
        return this._albums[userId];
    },

    getPhotos(albumId) {
        return this._photos[albumId];
    },

    getPhoto(albumId, photoId) {
        return this.getPhotos(albumId).find(p => p.id === photoId);
    },

    isPhotoFavorite(photoId) {
        return this._favoritePhotos.find(p => p.id === photoId) !== undefined;
    },

    getFavoritePhotos() {
        return this._favoritePhotos;
    },

    getFavoritePhoto(albumId, photoId) {
        return this.getFavoritePhotos(albumId).find(p => p.id === photoId);
    }

};