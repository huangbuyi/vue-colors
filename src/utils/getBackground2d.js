  function getBackground2d (model, color) {

    let background = {
      'r': `linear-gradient(to top right, rgba(${ Math.round(color[0]) },0,0,1),transparent, rgba(${ Math.round(color[0]) },255,255,1) ), 
          linear-gradient(to bottom right, rgb(${ Math.round(color[0]) },255,0), rgb(${ Math.round(color[0]) },0,255) )`,
      'g': `linear-gradient(to top right, rgba(0,${ Math.round(color[1]) },0,1),transparent, rgba(255,${ Math.round(color[1]) },255,1) ), 
          linear-gradient(to bottom right, rgb(255,${ Math.round(color[1]) },0), rgb(0,${ Math.round(color[1]) },255) )`,
      'b': `linear-gradient(to top right, rgba(0,0,${ Math.round(color[2]) },1),transparent, rgba(255,255,${ Math.round(color[2]) },1) ), 
          linear-gradient(to bottom right, rgb(0,255,${ Math.round(color[2]) }), rgb(255,0,${ Math.round(color[2]) }) )`,
      'h': `linear-gradient(to top, #000, transparent),linear-gradient(to right, #FFF, rgba(255,255,255,0)),
          linear-gradient(to top, hsl(${ color[0] }, 100%, 50%), hsl(${ color[0] }, 100%, 50%))`,
      's': `linear-gradient(to top, #000, transparent), linear-gradient(rgba(255,255,255,${ 1-color[1] }), rgba(255,255,255,${ 1-color[1] })),
          linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)`,
      'v': `linear-gradient(to top, rgba(0,0,0,${ 1-color[2] }), rgba(0,0,0,${ 1-color[2] })),linear-gradient(to top, #fff, transparent), 
          linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)`
    }

    return background[model]
  }

  export default getBackground2d