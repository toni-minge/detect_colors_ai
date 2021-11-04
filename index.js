const ColorThief = require('colorthief');
const path = require('path');
const ntc = require('./ntc')
const fs = require('fs');

const step = 9

let jsonData = require('./data.json');

const folder = '/Users/toniminge/Desktop/ai/results/final_results_1000/final/'
const number = '0000'

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

var promises = []

// for(var i = 0; i < 10; i++){
  for(var j = 0; j < 10; j++){
    for(var k = 0; k < 10; k++){
      for(var l = 0; l < 10; l++){
        const img = path.resolve(process.cwd(), `${folder}/seed${step}${j}${k}${l}.png`);
        const promise = ColorThief.getPalette(img, 3)
        promises.push(promise)
      }
    }
  }
// }

function parseNumber(num){
  var length = num.toString().length

  if (length === 1){
    return `${step}00${num}`
  } else if (length === 2) {
    return `${step}0${num}`
  } else if (length === 3) {
    return `${step}${num}`
  } else {
    return num
  }
}

function convertRgb(arr){
  var count = 0
  var data = []

  arr.forEach((item, i) => {
    const naming_obj = []

    item.forEach((obj, j) => {
      const name = ntc.name(rgbToHex(obj[0], obj[1], obj[2]))
      naming_obj.push(name[1])
    });

    var data_obj = {
      title: `seed${parseNumber(count)}`,
      labels: naming_obj
    }
    data.push(data_obj)

    count = count + 1
  });

  let tmp_data = jsonData.concat(data)
  let result = JSON.stringify(tmp_data);
  fs.writeFileSync('data.json', result);
  // console.log(data)
  console.log('Step: ' + step + ' | detected the colors of ' + data.length + ' images. Love you Toni.')
}

// console.log(promises)
// Promise.all(promises).then((v) => {console.log(v)})
async function detectColors(){
  try {
    res = await Promise.all(promises)
    convertRgb(res)
  } catch (err){
    console.log(err)
  }
}


detectColors()



// console.log(ntc.name(rgbToHex(113, 131, 85)))


// ColorThief.getColor(img)
//     .then(color => { console.log(color) })
//     .catch(err => { console.log(err) })
