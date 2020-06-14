let api = {

    _baseUrl: 'https://json.medrating.org',

    async getUsers() {

        let url = this._baseUrl + '/users/';

        try {
            let response = await fetch(url);
            return response.json();
        } catch (e) {
            console.error(e);
        }

    },

    async getAlbums(id) {

        let url = this._baseUrl + `/albums?userId=${id}`;

        try {
            let response = await fetch(url);
            return response.json();
        } catch (e) {
            console.error(e);
        }

    },

    async getPhotos(albumId) {

        let url = this._baseUrl + `/photos?albumId=${albumId}`;

        try {
            let response = await fetch(url);
            return response.json();
        } catch (e) {
            console.error(e);
        }

    }

};
