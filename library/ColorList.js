const COLORS = {
    red: "red",
    green: "green",
    blue: "blue",
    yellow: "yellow",
    orange: "orange",
    purple: "purple",
    pink: "pink",
    brown: "brown",
    black: "black",
    white: "white",
    cyan: "cyan",
    magenta: "magenta",
    grey: "grey",
    navy: "navy",
    gold: "gold",
    silver: "silver",
    teal: "teal",
    lavender: "lavender",
    beige: "beige",
    indigo: "indigo",
    turquoise: "turquoise",
    coral: "coral",
    maroon: "maroon",
    khaki: "khaki",
    salmon: "salmon",
    mint: "mint",
    peach: "peach",
    plum: "plum",
    charcoal: "charcoal",
    apricot: "apricot",
    lavenderblush: "lavenderblush",
    lightblue: "lightblue",
    lightgreen: "lightgreen",
    lightpink: "lightpink",
    darkblue: "darkblue",
    darkgreen: "darkgreen",
    darkred: "darkred",
    olive: "olive",
    sienna: "sienna",
    turquoiseblue: "turquoiseblue",
    violet: "violet",
    periwinkle: "periwinkle",
    raspberry: "raspberry",
    mintcream: "mintcream",
    slateblue: "slateblue",
    wheat: "wheat",
    chartreuse: "chartreuse",
    fuchsia: "fuchsia",
    royalblue: "royalblue",
    mediumslateblue: "mediumslateblue",
    springgreen: "springgreen",
    lightcoral: "lightcoral",
    bisque: "bisque",
    lightgoldenrodyellow: "lightgoldenrodyellow",
    lightorange: "lightorange",

    random: ()=>{
      
      let keys = Object.keys(COLORS);
      console.log(keys);
      
      let key = keys[Math.floor(Math.random() * keys.length-1)];
      return COLORS[key];
    }
  }


export default COLORS