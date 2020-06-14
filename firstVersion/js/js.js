window.addEventListener('DOMContentLoaded', () => {
 // отрисовываю разметку для html
  class UserCard {
    constructor(name, album, photos, photoName, bigPhoto, parentSelector) {
      this.name = name;
      this.album = album;
      this.photos = photos;
      this.photoName = photoName;
      this.bigPhoto = bigPhoto;
      this.parent = document.querySelector(parentSelector);
    }

    render() {
      const element = document.createElement('div');
      element.innerHTML = `
      <div class="catalog__item">
      <ul>
          <li><div class="catalog__item-name">${this.name}</div>
              <div class="catalog__item-albums">
                  <ul>
                      <li><div class="catalog__item-album">${this.album}</div> 
                          <ul class="catalog__item-album__content">
                              <div class="catalog__item-album__content-wrapper">
                                  <i class="fas fa-star"></i>
                                  <li><img src=${this.photos} alt="" class="image" data-big="${this.bigPhoto}"></li>
                              </div>
                              <div class="image__text">
                                  <div>${this.photoName}</div>
                              </div>
                          </ul>
                      </li>
                     </ul>    
                     <ul>
                        <li><div class="catalog__item-album">${this.album}</div> 
                            <ul class="catalog__item-album__content">
                              <div class="catalog__item-album__content-wrapper">
                                  <i class="fas fa-star"></i>
                                  <li><img src=${this.photos} alt="" class="image" data-big="${this.bigPhoto}"></li>
                              </div>
                              <div class="image__text">
                                  <div>${this.photoName}</div>
                              </div>
                            </ul>
                        </li>
                       </ul>
              </div>
           
          </li> 
      </ul>
      <div class="overlay">
            <div class="modal">
                <img src=${this.bigPhoto} alt="">
                <div class="modal__close">&times;</div>
            </div>
        </div>
  </div>
      `;
      this.parent.append(element);
    }
  }
// получаем данные с трех ссылок из ТЗ
  const getResource = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status ${res.status}`);
    }
    return await res.json();
  };

    getResource("https://json.medrating.org/users/")
    .then(data1 => {
      data1.forEach(() => {
      });
      getResource("https://json.medrating.org/photos?albumId=2")
    .then(data2 => {
      data2.forEach(() => {  
      });
      getResource("https://json.medrating.org/albums?userId=3")
    .then(data3 => {
      new UserCard(
        data1[0].name, data3[0].title, data2[0].thumbnailUrl, data2[0].title, data2[0].url, ".catalog").render();
      new UserCard(
        data1[1].name, data3[1].title, data2[1].thumbnailUrl, data2[1].title, data2[1].url, ".catalog").render();

        // функция для открытия класси имени
        $('.catalog__item-name').each(function(i){
          $(this).on('click', function(){
              $('.catalog__item-albums').eq(i).toggle();
          });
         });
         // функция для открытия класса каталога 
         $('.catalog__item-album').each(function(i){
          $(this).on('click', function(){
              $('.catalog__item-album__content').eq(i).toggle();
          });
         });
         // функция для модалки
        $('body').on('click', '.image', function(){
			$(this).parents('.catalog__item').find('.modal img').attr('src', $(this).attr('data-big'));
			$(this).parents('.catalog__item').find('.overlay, .modal').fadeIn();
		});

           $('.modal__close ').on('click', () => {
            $('.overlay, .modal').fadeOut();
        });
        // функция для всплывания названия при наведении 
          $('.image').each(function(i){
              $(this).hover(function(){
                  $('.image__text').eq(i).fadeToggle();
              });
              });
    });
    });
    });
});



