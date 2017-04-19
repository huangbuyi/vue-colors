export default function calcEventPosition(e, container) {
  const containerWidth = container.clientWidth
  const containerHeight = container.clientHeight
  const x = typeof e.pageX === 'number' ? e.pageX : e.touches[0].pageX
  const y = typeof e.pageY === 'number' ? e.pageY : e.touches[0].pageY
  let left = x - (container.getBoundingClientRect().left + window.pageXOffset)
  let top = y - (container.getBoundingClientRect().top + window.pageYOffset)

  left = left < 0 ? 0 : left
  left = left > containerWidth ? containerWidth : left
  top = top < 0 ? 0 : top 
  top = top > containerHeight ? containerHeight : top

  return {
    leftP: left / containerWidth,
    topP: top / containerHeight
  }
}``