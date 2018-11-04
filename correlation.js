// Correlation Test
const data = require('./data.js');
const a = "Price";
const b = "Size";
//const data = [
//  {x: 3, y: 2},
//  {x: 3, y: 3},
//  {x: 6, y: 4},
//
//]
//const data = [
//  {a: 215, b: 14.2}, 
//  {a: 325, b: 16.4}, 
//  {a: 185, b: 11.9}, 
//  {a: 332, b: 15.2},
//  {a: 406, b: 18.5},
//  {a: 522, b: 22.1},
//  {a: 412, b: 19.4},
//  {a: 614, b: 25.1},
//  {a: 544, b: 23.4},
//  {a: 421, b: 18.1},
//  {a: 445, b: 22.6},
//  {a: 408, b: 17.2},
//]

const getMean = (d, key, N) => {
  let sum = d.reduce((acc, cur) => ({[key]: acc[key] + cur[key]}))[key];
  return sum / N;
};

const getABComb = (d, keyA, keyB, avgA, avgB) => {
  return d.map(el => (el[keyA] - avgA) * (el[keyB] - avgB))
    .reduce((acc, cur) => acc + cur);
};

const getDeviationScores = (d, key, mean, N) => {
  const pow2Arr = d.map(el => (el[key] - mean) * (el[key] - mean));
  const variance = pow2Arr.reduce((acc, cur) => acc + cur);
  return Math.round(variance * 1000) / 1000;
}

const N = Object.keys(data).length;
const meanA = getMean(data, a, N); 
const meanB = getMean(data, b, N); 
const devA = getDeviationScores(data, a, meanA, N);
const devB = getDeviationScores(data, b, meanB, N);
const abComb = getABComb(data, a, b, meanA, meanB);
const r = abComb / Math.sqrt(devA * devB); 

console.log('abComb: ', abComb);
console.log('N: ', N);
console.log('devA: ', devA);
console.log('devB: ', devB);
console.log('meanA: ', meanA);
console.log('meanB: ', meanB);
console.log('r: ', r);
