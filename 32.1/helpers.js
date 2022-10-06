const ExpressError = require("./error");

function convertAndValidateNums(stringNums) {
    const nums = [];
    for (let i = 0; i < stringNums.length; i++) {
        const value = Number(stringNums[i]);
        if (isNaN(value))
            return new ExpressError(
                `${stringNums[i]} at index ${i} is not a number`
            );
        nums.push(value);
    }

    return nums;
}

function mean(arr) {
    if (arr.length === 0) return 0;
    return (
        arr.reduce((acc, cur) => {
            return acc + cur;
        }) / arr.length
    );
}

function median(arr) {
    arr.sort((a, b) => {
        a - b;
    });
    let middleIndex = Math.floor(arr.length / 2);
    let median;

    if (arr.length % 2 === 0) {
        median = (arr[middleIndex] + arr[middleIndex - 1]) / 2;
    } else {
        median = arr[middleIndex];
    }
    return median;
}

function createFrequencyCounter(arr) {
    return arr.reduce(function (acc, next) {
        acc[next] = (acc[next] || 0) + 1;
        return acc;
    }, {});
}

function mode(arr) {
    let freqCounter = createFrequencyCounter(arr);

    let count = 0;
    let mostFrequent;

    for (let key in freqCounter) {
        if (freqCounter[key] > count) {
            mostFrequent = key;
            count = freqCounter[key];
        }
    }

    return +mostFrequent;
}

module.exports = {
    convertAndValidateNums,
    mean,
    mode,
    median,
    createFrequencyCounter
};
