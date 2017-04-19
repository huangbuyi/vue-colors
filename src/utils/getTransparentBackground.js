
function getTransparentBackground(color = 'transparent', size = 6) {
  return {
    backgroundImage: `linear-gradient(${ color }, ${ color }),
    									linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc),
    									linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc)`,
    backgroundSize: `100% 100%,${ size*2 }px ${ size*2 }px,${ size*2 }px ${ size*2 }px`,
    backgroundPosition: `0 0,0 0, ${ size }px ${ size }px`,
    backgroundColor: '#fff'
  }
}

export default getTransparentBackground