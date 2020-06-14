const modal = {

    _el: document.getElementById("modal"),
    _elContent: document.getElementById("modal").querySelector(".modal__content"),
    _elBackground: document.getElementById("modal").querySelector(".modal__background"),
    close: document.getElementById("modal").querySelector(".modal__close"),


    init() {
        this.close.addEventListener("click", () => {
            this.hide();
         });
    },

    show(content) {
        this._elContent.innerHTML = content;
        this._el.classList.add("modal_active");
    },

    hide() {
        this._el.classList.remove("modal_active");
    }

};
