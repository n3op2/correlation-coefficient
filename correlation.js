// Correlation Test
const data = require('./data2.js');
const a = "places";
const b = "stab";
//const data = [
//  {x: 3, y: true},
//  {x: 10, y: true},
//  {x: 12, y: false},
//  {x: 4, y: false},
//  {x: 7, y: false},
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

//For numbers
const getMean = (d, key, N) => {
  let sum = d.reduce((acc, cur) => ({[key]: acc[key] + cur[key]}))[key];
  return sum / N;
};

const getABComb = (d, keyA, keyB, meanA, meanB) => {
  return d.map(el => (el[keyA] - meanA) * (el[keyB] - meanB))
    .reduce((acc, cur) => acc + cur);
};

const getDeviationScores = (d, key, mean, N) => {
  const pow2Arr = d.map(el => (el[key] - mean) * (el[key] - mean));
  const variance = pow2Arr.reduce((acc, cur) => acc + cur);
  return Math.round(variance * 1000) / 1000;
}

const getN = (d) => Object.keys(d).length;

const getR = (ABComb, devA, devB) => ABComb / Math.sqrt(devA * devB);

//For Binary Correlation
const getBinR = (t) => {
	console.log('a: ', ((t[3] * t[0]) - (t[2] * t[1]))) 
  console.log('b: ', Math.sqrt((t[2] + t[3]) * (t[0] + t[1]) * (t[1] * t[3]) * (t[0] + t[2])));
	return (t[3] * t[0] - t[2] * t[1]) / 
    Math.sqrt((t[2] + t[3]) * (t[0] + t[1]) * (t[1] * t[3]) * (t[0] + t[2]));
}

const buildTable = (arg, d, keyA, keyB) => {
	let t = [0, 0, 0, 0];
	for(let i = 0; i < d.length; i++) {
		let index = 0;
		if(d[i][keyA].indexOf(arg)) index++;
		if(d[i][keyB]) index += 2;
		t[index]++;
	}
	return t;
}

const getKeyVals = (d, key) => {
	const aKeys = [];
	for(let i in d) {
		for(let j in d[i][key]) {
			if(aKeys.indexOf(d[i][key][j]) == -1) aKeys.push(d[i][key][j]);
		}
	}
	return aKeys;
}


console.log(getKeyVals(data, a));
const test1 = buildTable('school', data, a, b);
console.log(test1);
console.log('phi: ', getBinR(test1));

const N = getN(data);
const meanA = getMean(data, a, N); 
const meanB = getMean(data, b, N); 
const devA = getDeviationScores(data, a, meanA, N);
const devB = getDeviationScores(data, b, meanB, N);
const ABComb = getABComb(data, a, b, meanA, meanB);
const r = getR(ABComb, devA, devB); 

console.log('abComb: ', ABComb);
console.log('N: ', N);
console.log('devA: ', devA);
console.log('devB: ', devB);
console.log('meanA: ', meanA);
console.log('meanB: ', meanB);
console.log('r: ', r);
