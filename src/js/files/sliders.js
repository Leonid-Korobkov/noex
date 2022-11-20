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
  Parallax,
  Autoplay,
  Controller,
  Thumbs
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
  if (document.querySelector('.main-slider__slider')) {
    const mainSlider = new Swiper('.main-slider__slider', {
      modules: [Navigation, Pagination, Parallax, Autoplay],
      observer: true,
      observeParents: true,
      slidesPerView: 1,
      spaceBetween: 0,
      // autoHeight: true,
      speed: 800,
      loop: true,
      parallax: true,
      pagination: {
        el: '.main-slider__pagination',
        clickable: true,
        type: 'bullets'
      },
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      navigation: {
        prevEl: '.main-slider__button-prev',
        nextEl: '.main-slider__button-next'
      },
      breakpoints: {
        // when window width is >= 320px
        320: {
          speed: 400
        },
        // when window width is >= 480px
        480: {
          speed: 500
        },
        // when window width is >= 640px
        640: {
          speed: 600
        },
        991: {
          speed: 700
        }
      }
    })
    let mySliderNumberNullCurrent = document.querySelector(
      '.main-slider__number-null-current'
    )
    let mySliderNumberNullTotal = document.querySelector(
      '.main-slider__number-null-total'
    )

    let mySliderAllSlides = document.querySelector('.main-slider__total-num')
    let mySliderCurrentSlide = document.querySelector(
      '.main-slider__current-num'
    )

    if (mainSlider.slides.length - 2 >= 10) {
      mySliderNumberNullTotal.remove()
    }

    mySliderAllSlides.innerHTML = mainSlider.slides.length - 2
    function currentSlideCount() {
      let currentSlide = ++mainSlider.realIndex
      mySliderCurrentSlide.innerHTML = currentSlide
      if (currentSlide >= 10) {
        mySliderNumberNullCurrent.style = 'display: none'
      } else {
        mySliderNumberNullCurrent.style = 'display: inline'
      }
    }
    currentSlideCount()
    mainSlider.on('slideChange', currentSlideCount)
  }
  // ! Мини слайдер (projects)
  if (document.querySelector('.projects-slider-mini')) {
    // let projectSlider = document.querySelector('.projects-slider')
    const projectMiniSlider = new Swiper('.projects-slider-mini', {
      observer: true,
      observeParents: true,
      slidesPerView: 'auto',
      spaceBetween: 0,

      breakpoints: {
        320: {
          direction: 'horizontal'
          // slidesPerView: 'auto',
          // loop: true
          // autoScrollOffset: 1
          // slidesPerView: 3
        },
        850: {
          loop: false,
          direction: 'vertical'
          // slidesPerView: 'auto'
        }
      }
    })
  }
  // ! Главный слайдер (projects)
  if (document.querySelector('.projects-slider')) {
    // let projectMiniSlider = document.querySelector('.main-slider__slider')
    const projectSlider = new Swiper('.projects-slider', {
      modules: [Navigation, Autoplay, Thumbs],
      observer: true,
      observeParents: true,
      slidesPerView: 'auto',
      spaceBetween: 62,
      speed: 800,
      loop: true,
      autoplay: {
        delay: 3000,
        // disableOnInteraction: false
      },
      navigation: {
        prevEl: '.projects-slider-mini__button_prev',
        nextEl: '.projects-slider-mini__button_next'
      },
      thumbs: {
        swiper: {
          el: '.projects-slider-mini'
        }
      },

      breakpoints: {
        320: {
          speed: 300,
          navigation: false,
          spaceBetween: 10
        },
        650: {
          speed: 500,
          // slidesPerView: 2,
          spaceBetween: 10
        },
        850: {
          speed: 600,
          spaceBetween: 40,
          loop: false,
          navigation: {
            prevEl: '.projects-slider-mini__button_prev ',
            nextEl: '.projects-slider-mini__button_next'
          }
        },
        1300: {
          spaceBetween: 62
        }
      }
    })
  }

  // ! Мини слайдер (working)
  if (document.querySelector('.working-slider-mini')) {
    const workingMiniSlider = new Swiper('.working-slider-mini', {
      observer: true,
      observeParents: true,
      spaceBetween: 0,
      // loop: true,
      breakpoints: {
        320: {
          direction: 'horizontal',
          slidesPerView: 'auto',
          spaceBetween: 80
        },
        850: {
          direction: 'vertical',
          slidesPerView: 'auto'
        }
      }
    })
  }
  // ! Главный слайдер (working)
  if (document.querySelector('.working-slider')) {
    // let projectMiniSlider = document.querySelector('.main-slider__slider')
    const workingSlider = new Swiper('.working-slider', {
      modules: [Navigation, Parallax, Autoplay, Thumbs],
      observer: true,
      observeParents: true,
      slidesPerView: 'auto',
      spaceBetween: 0,
      parallax: true,
      // effect: 'fade',
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      thumbs: {
        swiper: {
          el: '.working-slider-mini',
          multipleActiveThumbs: true,
          autoScrollOffset: 1
        }
      },
      navigation: {
        prevEl: '.working-slider__button_prev',
        nextEl: '.working-slider__button_next'
      },
      breakpoints: {
        320: {
          speed: 300
        },
        650: {
          speed: 500
        },
        850: {
          speed: 600
        }
      }
    })
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
