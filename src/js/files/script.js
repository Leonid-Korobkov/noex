// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from './functions.js'
// Подключение списка активных модулей
import { flsModules } from './modules.js'

const headerElement = document.querySelector('.header')
document.addEventListener('scroll', function () {
  let scrollTop = window.scrollY
  let headerHeight = headerElement.clientHeight
  if (scrollTop >= headerHeight / 2) {
    headerElement.classList.add('_scroll')
  } else if (scrollTop <= headerHeight / 2) {
    headerElement.classList.remove('_scroll')
  }

  function activeClassItem(item, navigationLink, navigationItem) {
    if (window.innerWidth > 768) {
      document.querySelectorAll(item).forEach((el, i) => {
        if (el.offsetTop - headerHeight - 15 <= scrollTop) {
          document.querySelectorAll(navigationLink).forEach((el) => {
            if (el.classList.contains('active')) {
              el.classList.remove('active')
            }
          })

          document
            .querySelectorAll(navigationItem)
            [i].querySelector('a')
            .classList.add('active')
        }
      })
    }
  }
  activeClassItem(
    '.item-service-info',
    '.navigation-service-info__link',
    '.navigation-service-info__item'
  )
  activeClassItem(
    '.item-single-article',
    '.navigation-single-article__link',
    '.navigation-single-article__item'
  )
})
