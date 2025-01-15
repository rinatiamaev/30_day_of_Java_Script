// Interval Cancellation

// Given a function fn, an array of arguments args, and an interval time t, return a cancel function cancelFn.

// After a delay of cancelTimeMs, the returned cancel function cancelFn will be invoked.

// setTimeout(cancelFn, cancelTimeMs)
// The function fn should be called with args immediately and then called again every t milliseconds until cancelFn is called at cancelTimeMs ms.

 

// Example 1:

// Input: fn = (x) => x * 2, args = [4], t = 35
// Output: 
// [
//    {"time": 0, "returned": 8},
//    {"time": 35, "returned": 8},
//    {"time": 70, "returned": 8},
//    {"time": 105, "returned": 8},
//    {"time": 140, "returned": 8},
//    {"time": 175, "returned": 8}
// ]
// Explanation: 
// const cancelTimeMs = 190;
// const cancelFn = cancellable((x) => x * 2, [4], 35);
// setTimeout(cancelFn, cancelTimeMs);

// Every 35ms, fn(4) is called. Until t=190ms, then it is cancelled.
// 1st fn call is at 0ms. fn(4) returns 8.
// 2nd fn call is at 35ms. fn(4) returns 8.
// 3rd fn call is at 70ms. fn(4) returns 8.
// 4th fn call is at 105ms. fn(4) returns 8.
// 5th fn call is at 140ms. fn(4) returns 8.
// 6th fn call is at 175ms. fn(4) returns 8.
// Cancelled at 190ms

function cancellable(fn, args, t) {
    let result = [];
    let startTime = Date.now();
    const initialResult = fn(...args);
    result.push({ time: 0, returned: initialResult });
    const intervalId = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        const returned = fn(...args);
        result.push({ time: elapsedTime, returned });
    }, t);
    const cancelFn = () => {
        clearInterval(intervalId);
    };
    cancelFn.getResult = () => result;

    return cancelFn;
}


const fn = (x) => x * 2;
const args = [4];
const t = 35;
const cancelTimeMs = 190; 

const cancelFn = cancellable(fn, args, t);


setTimeout(() => {
    cancelFn();
    console.log(cancelFn.getResult());
}, cancelTimeMs);
