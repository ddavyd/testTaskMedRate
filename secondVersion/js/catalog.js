const catalog= {
    _state: null,
    setState(state) {
        this._state = state;
    },
    _usersElement: null,
    renderUsers(){
        document.getElementById('root').innerHTML = `
            <div class="users">
                <div class="users__wrapper" id="users">
                </div>
            </div>`;

            this._usersElement = document.getElementById('users');
            let users = this._state.getUsers();
            let htmlString = ``;
            users.forEach(

                (userr) => {
                    htmlString += `
                        <div class="user">
                            <span class="user__name user__name_close" id="user-name-${userr.id}" data-user-id=${userr.id}>
                                ${userr.name}
                             </span>
                             <div id="user-${userr.id}" class="user__albums"></div>
                        </div>`;
                } 
            );
            this._usersElement.innerHTML = htmlString;
            let usersElements = this._usersElement.querySelectorAll('.user span');
            usersElements.forEach(userElem => {

                userElem.addEventListener('click', (e) => {
                    let userId = +e.currentTarget.dataset.userId;
                    this.onUserNameClick(userId);
                });
            });
    },
    async onUserNameClick(userId) {
        let userName = document.querySelector(`#user-name-${userId}`);
        let targetElement = document.querySelector(`#user-${userId}`);
        if (targetElement.classList.contains('user__albums_active')) {
            userName.classList.remove('user__name_open');
            userName.classList.add('user__name_close');
            targetElement.classList.remove('user__albums_active');
            return;
        }
        await this._state.loadAlbums(userId);
        let albums = await this._state.getAlbums(userId);
        let htmlString = ``;
        albums.forEach(a => {
            htmlString += `
            <div class="album">
                <span class="album__name album__name_close" data-album-id=${a.id} id="album-${a.id}-title">
                    ${a.title}
                </span>
                <div class="album__photos" id="album-${a.id}"></div>
            </div>`;
        });

        targetElement.innerHTML = htmlString;
        targetElement.classList.add('user__albums_active');
        userName.classList.remove('user__name_close');
        userName.classList.add('user__name_open');

        let albumsElements = targetElement.querySelectorAll('.album span');

        albumsElements.forEach(aEl => {
            aEl.addEventListener('click', (e) => {
                e.stopPropagation();
                let albumId = +e.currentTarget.dataset.albumId;
                this.onAlbumNameClick(albumId);
            });
        });
    },
    async onAlbumNameClick(albumId) {
        await this._state.loadPhotos(albumId);
        let albumName = document.querySelector(`#album-${albumId}-title`);
        let photos = await this._state.getPhotos(albumId);
        let targetElement = document.querySelector(`#album-${albumId}`);
        if (targetElement.classList.contains('album__photos_active')) {
            albumName.classList.remove('album__name_open');
            albumName.classList.add('album__name_close');
            targetElement.classList.remove('album__photos_active');
            return;
        }
        let htmlString = ``;
        photos.forEach(p => {
            let isFavorite = this._state.isPhotoFavorite(p.id);

            htmlString += `
            <div class="photo">
                <img src=${p.thumbnailUrl} alt="${p.title}" class="photo__small" 
                    data-photo-id=${p.id} 
                    data-album-id=${albumId}
                    id="photo-${p.id}"
                    title="${p.title}"/>
                <span class="photo__star  ${isFavorite ? 'photo__star_gold' : 'photo__star_grey'}" 
                    data-photo-id=${p.id}
                    id="star-${p.id}"></span>
            </div>`;
        });
        targetElement.innerHTML = htmlString;
        targetElement.classList.add('album__photos_active');
        albumName.classList.remove('album__name_close');
        albumName.classList.add('album__name_open');

        let photosElements = targetElement.querySelectorAll('.photo img');

        photosElements.forEach(pEl => {
            pEl.addEventListener('click', (e) => {
                e.stopPropagation();

                let albumId = +e.currentTarget.dataset.albumId;
                let photoId = +e.currentTarget.dataset.photoId;

                this.onPhotoClick(albumId, photoId);
            });
        });
        let starsElements = targetElement.querySelectorAll('.photo span.photo__star');
        starsElements.forEach(sEl => {
            sEl.addEventListener('click', (e) => {
                e.stopPropagation();

                let photoId = +e.currentTarget.dataset.photoId;
                let photo = photos.filter(p => p.id === photoId);

                this.onStarClick(photoId, photo);
            });
        });
    },
    onPhotoClick(albumId, photoId) {
        let photo = this._state.getPhoto(albumId, photoId);

        modal.show(`<img src="${photo.url}"/>`);

    },
    async onStarClick(photoId, photo) {

        let star = document.querySelector(`#star-${photoId}`);

        let isFavorite = await this._state.toggleFavorite(...photo);

        if (isFavorite) {
            star.classList.add('photo__star_gold');
            star.classList.remove('photo__star_grey');
        } else {
            star.classList.remove('photo__star_gold');
            star.classList.add('photo__star_grey');
        }

    }
};