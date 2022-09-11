/*
Документация по работе в шаблоне: 
Документация слайдера: https://swiperjs.com/
Сниппет(HTML): swiper
*/

// Подключаем слайдер Swiper из node_modules
// При необходимости подключаем дополнительные модули слайдера, указывая их в {} через запятую
// Пример: { Navigation, Autoplay }
import Swiper, {
  Navigation,
  Pagination,
  EffectFade,
  Autoplay
} from 'swiper'
/*
Основниые модули слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Подробнее смотри https://swiperjs.com/
*/

// Стили Swiper
// Базовые стили
import '../../scss/base/swiper.scss'
// Полный набор стилей из scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Полный набор стилей из node_modules
// import 'swiper/css';

// Инициализация слайдеров
function initSliders() {
  // Перечень слайдеров
  // Проверяем, есть ли слайдер на стронице
  if (document.querySelector('.main-slider__slider')) {
    // Указываем скласс нужного слайдера
    // Создаем слайдер
    const mainSlider = new Swiper('.main-slider__slider', {
      // Указываем скласс нужного слайдера
      // Подключаем модули слайдера
      // для конкретного случая
      modules: [Navigation, Pagination, EffectFade, Autoplay],
      observer: true,
      observeParents: true,
      slidesPerView: 1,
      spaceBetween: 0,
      // autoHeight: true,
      speed: 400,
      loop: true,
      //touchRatio: 0,
      //simulateTouch: false,
      //loop: true,
      //preloadImages: false,
      //lazy: true,
			pagination: {
				el: '.main-slider__pagination',
				clickable: true,
				type: 'bullets'
			},
      effect: 'fade',
      // autoplay: {
      // 	delay: 3000,
      // 	disableOnInteraction: false,
      // },
      navigation: {
        prevEl: '.main-slider__button-prev',
        nextEl: '.main-slider__button-next'
      },
    })
		let mySliderNumberNullCurrent = document.querySelector('.main-slider__number-null-current')
		let mySliderNumberNullTotal = document.querySelector('.main-slider__number-null-total')

    let mySliderAllSlides = document.querySelector('.main-slider__total-num')
    let mySliderCurrentSlide = document.querySelector('.main-slider__current-num')

		if(mainSlider.slides.length - 2 >= 10) {
			mySliderNumberNullTotal.remove()
		}

    mySliderAllSlides.innerHTML = mainSlider.slides.length - 2
    function currentSlideCount() {
      let currentSlide = ++mainSlider.realIndex
      mySliderCurrentSlide.innerHTML = currentSlide
			if(currentSlide>=10) {
				mySliderNumberNullCurrent.style = "display: none"
			} else {
				mySliderNumberNullCurrent.style = "display: inline"
			}
    }
		currentSlideCount()
    mainSlider.on('slideChange', currentSlideCount)
  }
}

// Скролл на базе слайдера (по классу swiper_scroll для оболочки слайдера)
function initSlidersScroll() {
  let sliderScrollItems = document.querySelectorAll('.swiper_scroll')
  if (sliderScrollItems.length > 0) {
    for (let index = 0; index < sliderScrollItems.length; index++) {
      const sliderScrollItem = sliderScrollItems[index]
      const sliderScrollBar =
        sliderScrollItem.querySelector('.swiper-scrollbar')
      const sliderScroll = new Swiper(sliderScrollItem, {
        observer: true,
        observeParents: true,
        direction: 'vertical',
        slidesPerView: 'auto',
        freeMode: {
          enabled: true
        },
        scrollbar: {
          el: sliderScrollBar,
          draggable: true,
          snapOnRelease: false
        },
        mousewheel: {
          releaseOnEdges: true
        }
      })
      sliderScroll.scrollbar.updateSize()
    }
  }
}

window.addEventListener('load', function (e) {
  // Запуск инициализации слайдеров
  initSliders()
  // Запуск инициализации скролла на базе слайдера (по классу swiper_scroll)
  //initSlidersScroll();
})
