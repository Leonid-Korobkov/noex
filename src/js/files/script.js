// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from './functions.js'
// Подключение списка активных модулей
import { flsModules } from './modules.js'

const headerElement = document.querySelector('.header')
document.addEventListener('scroll', function () {
  //! Изменений стилей header при скроле
  let scrollTop = window.scrollY
  let headerHeight = headerElement.clientHeight
  if (scrollTop >= headerHeight / 2) {
    headerElement.classList.add('_scroll')
  } else if (scrollTop <= headerHeight / 2) {
    headerElement.classList.remove('_scroll')
  }

  //! Добавление активного класса к элементу
  function activeClassItem(item, navigationLink, navigationItem) {
    if (window.innerWidth > 768) {
      document.querySelectorAll(item).forEach((el, i) => {
        if (el.offsetTop - headerHeight - 15 <= scrollTop) {
          document.querySelectorAll(navigationLink).forEach((el) => {
            if (el.classList.contains('active')) {
              el.classList.remove('active')
            }
          })

          document.querySelectorAll(navigationItem)[i].querySelector('a').classList.add('active')
        }
      })
    }
  }
  activeClassItem('.item-service-info', '.navigation-service-info__link', '.navigation-service-info__item')
  activeClassItem('.item-single-article', '.navigation-single-article__link', '.navigation-single-article__item')
})

//! Кастомизация file и работа с ним
if (document.querySelector('.form-estimate__file')) {
  var dt = new DataTransfer()

  const inputFile = document.querySelector('.form-estimate__file')
  inputFile.addEventListener('change', addNewItemToFile)

  function addNewItemToFile() {
    let filesList = this.nextElementSibling.nextElementSibling

    for (var i = 0; i < this.files.length; i++) {
      let newFileInput = `<li class="form-estimate__file-item">
        <span class="form-estimate__file-name">${this.files.item(i).name}</span>
        <button type="button"><img src="img/icons/icon/cart-file.svg" alt=""></button>
      </li>`
      filesList.insertAdjacentHTML('beforeend', newFileInput)
      dt.items.add(this.files.item(i))
    }
    this.files = dt.files
  }

  document.addEventListener('click', function (e) {
    let element = e.target
    if (element.closest('.form-estimate__file-item button img')) {
      removeFilesItem(element.parentNode)
    }
  })

  function removeFilesItem(element) {
    let name = element.previousElementSibling.textContent
    let input = element.closest('.form-estimate__wrapper-upload').querySelector('input[type=file]')
    element.closest('.form-estimate__file-item').remove()
    for (let i = 0; i < dt.items.length; i++) {
      if (name === dt.items[i].getAsFile().name) {
        dt.items.remove(i)
      }
    }
    input.files = dt.files
  }
}

//! Фильтрация проектов по годам
function filterElements(list, item, itemDate, property) {
  if (document.querySelector(list) && document.querySelector(item) && document.querySelector(itemDate)) {
    const filterItemsList = document.querySelector(list)
    filterItemsList.classList.add('background')
    const paddingTop = window.getComputedStyle(document.querySelector(item)).getPropertyValue('padding-bottom')
    document.querySelector('.filter').addEventListener('click', function (e) {
      filterItemsList.classList.add('click-filter-item')
      setTimeout(() => {
        filterItemsList.classList.remove('click-filter-item')
        let targetElement = e.target
        if (targetElement.closest('.filter__item')) {
          document.querySelectorAll('.filter__item').forEach((item) => {
            item.classList.remove('filter__item_active')
          })
          targetElement.classList.add('filter__item_active')
          const filterItems = document.querySelectorAll(item)
          //! Показ/скрытие элементов и обнуление отступа у первого элемента
          filterItems.forEach((item, index) => {
            const filterItemDate = item.querySelector(itemDate)
            item.classList.remove('show')
            if (targetElement.classList.contains('filter-all-items')) {
              item.style.display = property
              if (index != 0) {
                item.style.paddingTop = paddingTop
              }
              return
            }
            const isTrueNumber =
              Number(filterItemDate.textContent.substring(0, 4)) >= Number(targetElement.textContent.substring(0, 4)) &&
              Number(filterItemDate.textContent.substring(0, 4)) < Number(targetElement.textContent.slice(5, 9))
            if (isTrueNumber) {
              item.style.display = property
              item.classList.add('show')
            } else {
              item.style.display = 'none'
            }
          })
          for (let index = 0; index < filterItems.length; index++) {
            if (filterItems[index].classList.contains('show')) {
              filterItems[index].style.paddingTop = '0'
              return
            }
          }
        }
      }, 200)
    })
  }
}
filterElements('.projects__list', '.projects-item', '.projects-item__date', 'flex')
filterElements('.project__list', '.project-item', '.project-item__date', 'grid')

// ! Изменение картинок на темной теме
const imagesDarkMode = document.querySelectorAll('[data-img-src]')
function addClassDarkForImage() {
  imagesDarkMode.forEach((img) => {
    img.src = img.getAttribute('data-img-src')
  })
}
function removeClassDarkForImage() {
  imagesDarkMode.forEach((img) => {
    const extensionImg = /\.[^\.]*$/.exec(img.src)[0]
    img.src = img.src.slice(0, img.src.length - 9) + extensionImg
  })
}

//! Смена темы
const btnDarkMode = document.querySelector('.dark-mode-btn')

// 1. Проверка темной темы на уровне системных настроек
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  btnDarkMode.classList.add('dark-mode-btn--active')
  document.documentElement.classList.add('dark')
  addClassDarkForImage()
}

// 2. Проверка темной темы в localStorage
if (localStorage.getItem('darkMode') === 'dark') {
  btnDarkMode.classList.add('dark-mode-btn--active')
  document.documentElement.classList.add('dark')
  addClassDarkForImage()
} else if (localStorage.getItem('darkMode') === 'light') {
  btnDarkMode.classList.remove('dark-mode-btn--active')
  document.documentElement.classList.remove('dark')
  removeClassDarkForImage()
}

// Если меняются системные настройки, меняем тему
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
  const newColorScheme = event.matches ? 'dark' : 'light'

  if (newColorScheme === 'dark') {
    btnDarkMode.classList.add('dark-mode-btn--active')
    document.documentElement.classList.add('dark')
    localStorage.setItem('darkMode', 'dark')
    addClassDarkForImage()
  } else {
    btnDarkMode.classList.remove('dark-mode-btn--active')
    document.documentElement.classList.remove('dark')
    localStorage.setItem('darkMode', 'light')
    removeClassDarkForImage()
  }
})

// Включение ночного режима по кнопке
btnDarkMode.onclick = function () {
  btnDarkMode.classList.toggle('dark-mode-btn--active')
  const isDark = document.documentElement.classList.toggle('dark')

  if (isDark) {
    addClassDarkForImage()
    localStorage.setItem('darkMode', 'dark')
  } else {
    removeClassDarkForImage()
    localStorage.setItem('darkMode', 'light')
  }
}