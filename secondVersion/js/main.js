(async () => {

    modal.init();
    state.init();


    fav.setState(state);
    catalog.setState(state);

    const showPage = async () => {
        switch (location.hash) {
            case '#favorites':
                fav.render();
                break;
            case '#catalog':
                await state.loadUsers();
                catalog.renderUsers();
                break;
            default:
                def.render();
        }
    };

    showPage();

    window.addEventListener('hashchange', showPage);

})();