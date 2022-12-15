// ! Изменение картинок на темной теме
const imagesDarkMode = document.querySelectorAll('[data-img-src]')
function addClassDarkForImage() {
  imagesDarkMode.forEach((img) => {
    img.src = img.getAttribute('data-img-src')
  })
}
function removeClassDarkForImage() {
  imagesDarkMode.forEach((img) => {
    if (img.src.includes('_dark')) {
      img.src = img.src.replace('_dark', '')
    }
    // const extensionImg = /\.[^\.]*$/.exec(img.src)[0]
    // img.src = img.src.slice(0, img.src.length - 9) + extensionImg
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