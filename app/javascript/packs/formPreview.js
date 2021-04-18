
document.addEventListener('turbolinks:load', () => {
  const uploader = document.querySelector('.uploader');
  const swiperWrapper = document.querySelector('.swiper-wrapper')
  // const swiperSlide = document.querySelector('.wiper-slide')

  uploader.addEventListener('change', (e) => {
    const uploadFiles = uploader.files
    // 枚数制限
    if(uploadFiles.length > 10){
      alert('アップロードできる画像は10枚までです')
      return false;
    }
    for(i= 0; i < uploadFiles.length; i++){
      const file = uploadFiles[i];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // imgタグを生成してそこに読み取った画像のurlをセットし、swiperのコンテンツに加える
        const imgUrl = reader.result;
        // divを作ってswiper-slideのクラス付与
        const divTag = document.createElement("div");
        divTag.classList = "card_inner swiper-slide";
        // img作って、object-fitクラス付与
        const imgTag = document.createElement("img");
        imgTag.classList = "object-fit";
        // imgにsrcを付与
        imgTag.setAttribute('src', imgUrl);
        // それをdivに入れる
        divTag.appendChild(imgTag);
        // swiperでslideするためのコンテンツboxに入れる
        swiperWrapper.appendChild(divTag);
        // onloadでhtmlにimgタグをセットして、最後にswiperを発火させる。
        if( i === uploadFiles.length ){
          var mySwiper = new Swiper('.swiper-container', {
            pagination: {
              el: '.swiper-pagination',
              type: 'bullets',
              clickable: true
            }
          });
        }
      }
    }
    
  });
})