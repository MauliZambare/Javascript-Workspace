console.log("Hello, World!");

function add(a, b) {
    return a + b;
}

console.log("2 + 3 =", add(2, 3));


function isEven(num) {
    return num % 2 === 0;   
}
console.log("Is 4 even?", isEven(4));
console.log("Is 5 even?", isEven(5));


function max(a, b) {
    return (a > b) ? a : b;   
}
console.log("Max of 30 and 20 max is = ", max(30, 20));


function reverseString(str) {   
    return str.split('').reverse().join('');
}
console.log("Reverse of 'hello' is =", reverseString("hello"));



function palindrome(str) {   
    const reversed = str.split('').reverse().join('');
    return str === reversed;
}       
console.log("Is 'racecar' a palindrome?", palindrome("racecar"));
console.log("Is 'hello' a palindrome?", palindrome("hello"));


let str = "JavaScript";
console.log(str.length); // 10


function sumarray(arr) {
    return arr.reduce((acc, val) => acc + val, 0);
}
console.log("Sum of [1, 2, 3, 4, 5] is =", sumarray([1, 2, 3, 4, 5]));




function maxInArray(arr) {
  return Math.max(...arr);
}

maxInArray([4, 8, 1]); // 8


function removeDuplicates(arr) {
  return [...new Set(arr)];
}

removeDuplicates([1, 2, 2, 3]); // [1,2,3]


function factorial(n) {
  let fact = 1;
  for (let i = 1; i <= n; i++) {
    fact *= i;
  }
  return fact;
}

factorial(5); // 120




function countVowels(str) {
  let count = 0;
  let vowels = "aeiouAEIOU";

  for (let ch of str) {
    if (vowels.includes(ch)) count++;
  }
  return count;
}

countVowels("hello"); // 2


function printNumbers(n) {
  for (let i = 1; i <= n; i++) {
    console.log(i);
  }
}





