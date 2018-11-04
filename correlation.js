// Correlation Test
//const data = require('./data.js');
//const data = [
//  {x: 3, y: 2},
//  {x: 3, y: 3},
//  {x: 6, y: 4},
//
//]
const data = [
  {a: 215, b: 14.2}, 
  {a: 325, b: 15.4}, 
  {a: 185, b: 11.9}, 
  {a: 332, b: 15.2},
  {a: 406, b: 18.5},
  {a: 522, b: 22.1},
  {a: 412, b: 19.4},
  {a: 614, b: 25.1},
  {a: 544, b: 23.4},
  {a: 421, b: 18.1},
  {a: 445, b: 22.6},
  {a: 408, b: 17.2},
]

const getMean = (d, key, N) => {
  let sum = d.reduce((acc, cur) => ({[key]: acc[key] + cur[key]}))[key];
  return sum / N;
};

const getDiff = (d, keyA, keyB, avgA, avgB) => {
  return d.map(el => (el[keyA] - avgA) * (el[keyB] - avgB))
    .reduce((acc, cur) => acc + cur);
};

const getVariance = (d, key, avg, N) => {
  const pow2Arr = d.map(el => (el[key] - avg) * (el[key] - avg));
  const variance = Math.sqrt(pow2Arr.reduce((acc, cur) => acc + cur) / (N - 1));
  return Math.round(variance * 1000) / 1000;
}

const a = "a";
const b = "b";

let N = Object.keys(data).length;
let meanA = getMean(data, a, N); 
let meanB = getMean(data, b, N); 
let Sa = getVariance(data, a, meanA, N);
let Sb = getVariance(data, b, meanB, N);
let diff = getDiff(data, a, b, meanA, meanB);

console.log('Diff: ', diff);
console.log('N: ', N);
console.log('Sa: ', Sa);
console.log('Sb: ', Sb);
console.log('meanA: ', meanA);
console.log('meanB: ', meanB);

let correlation = (diff / Sa * Sb) / (diff - 1);

console.log(correlation);
