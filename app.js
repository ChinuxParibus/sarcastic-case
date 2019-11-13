const Q = ($query, $all = false, $node = document) =>
  $all ? [...$node.querySelectorAll($query)] : $node.querySelector($query)
const showElement = ($el) => ($el.style.display = '')
const hideElement = ($el) => ($el.style.display = 'none')

const sarcastic = Q('textarea')
const clipboard = Q('.clipboard')
const normal = Q('.input')
const notification = Q('.notification')

document.addEventListener('DOMContentLoaded', (ev) => {
  sarcastic.value = ''
  normal.value = ''
  hideElement(notification)
})

normal.addEventListener('keyup', (ev) => {
  if (ev.keyCode === 13) {
    const normalText = normal.value
    const sarcasticText = normalText
      .split('')
      .map((letter, i) => i % 2 === 0 ? letter.toLowerCase() : letter.toUpperCase())
      .join('')
    sarcastic.value = sarcasticText
    normal.value = ''
  }
})

clipboard.addEventListener('click', (ev) => {
  sarcastic.select()
  document.execCommand('copy')
  document.getSelection().removeAllRanges()
  sarcastic.value = ''
  showElement(notification)
  setTimeout(() => (hideElement(notification)), 2000)
})
