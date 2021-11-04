let jsonData = require('./data.json');
let count_data = {}
const fs = require('fs');

jsonData.forEach((item, i) => {
  item.labels.forEach((label, j) => {
    const key = label.toString()

    if (label in count_data){
      count_data[key] = count_data[key] + 1
    } else {
      count_data[key] = 1
    }
  });
});


const ordered = Object.keys(count_data).sort((a, b) => {return count_data[b] - count_data[a]}).reduce(
  (obj, key) => {
    obj[key] = count_data[key];
    return obj;
  },{}
);

let result = JSON.stringify(ordered);
fs.writeFileSync('count_data.json', result);
