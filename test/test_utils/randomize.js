
export function randomiseArray(arr){
    for(let i = arr.length - 1; i >= 0; i--){
        let randomIndex = generateRandomInteger(0, i);
        let current = arr[i];
        arr[i] = arr[randomIndex];
        arr[randomIndex] = current;
    }
    return arr;
}

function generateRandomInteger(min, max){
    return Math.floor(Math.random() * (max - min) + min);
}