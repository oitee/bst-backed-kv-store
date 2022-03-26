import assert from "assert";
import * as bst from "../src/bst.js";

let kvPairs = [[0, "zero"], [1, "one"], [2, "two"], [3, "three"], [4, "four"], [5, "five"], [6, "six"], [7, "seven"], [8, "eight"], [9, "nine"], [10, "ten"]]

function testAscendingOrderInsertion() { 
    let store = new bst.BinaryTree(1, "a");
    kvPairs.forEach(pair => store.insert(pair[0], pair[1]))
    store.insert(5, "5")
    store.insert(5, "5")
    
    assert.equal(store.isBalanced(), true);
    assert.equal(store.get(0), "zero")
    assert.equal(store.get(1), "one")
    assert.equal(store.get(5), "5")
    assert.equal(store.get(99), null)

    kvPairs.forEach(pair => store.insert(pair[0], pair[1]))
    assert.equal(store.isBalanced(), true)
    assertIfAllPresent(store, kvPairs)
}

function testDescendingOrderInsertion(){
    kvPairs.reverse()
    let store = new bst.BinaryTree(1, "a");

    kvPairs.forEach(pair => store.insert(pair[0], pair[1]))
    store.insert(5, "5")
    store.insert(5, "5")
    
    assert.equal(store.isBalanced(), true);
    assert.equal(store.get(0), "zero")
    assert.equal(store.get(1), "one")
    assert.equal(store.get(5), "5")
    assert.equal(store.get(99), null)

    kvPairs.forEach(pair => store.insert(pair[0], pair[1]))
    assert.equal(store.isBalanced(), true)
    assertIfAllPresent(store, kvPairs)
}

function testRandomOrderInsertion(){
    kvPairs = randomiseArray(kvPairs);
    let store = new bst.BinaryTree(1, "a");

    kvPairs.forEach(pair => store.insert(pair[0], pair[1]))
    store.insert(5, "5")
    store.insert(5, "5")
    
    assert.equal(store.isBalanced(), true);
    assert.equal(store.get(0), "zero")
    assert.equal(store.get(1), "one")
    assert.equal(store.get(5), "5")
    assert.equal(store.get(99), null)

    kvPairs.forEach(pair => store.insert(pair[0], pair[1]))
    assert.equal(store.isBalanced(), true)
    assertIfAllPresent(store, kvPairs)
}


function assertIfAllPresent(store, pairs){
    let allPairsResult = store.getAllKeyValuePairs()

    pairs.forEach(pair => {
        let inputPair = `< ${pair[0]}, ${pair[1]}>`
        assert.equal(allPairsResult.includes(inputPair), true);
    })

}

test("Insertion of keys in ascending order", testAscendingOrderInsertion);
test("Insertion of keys in descending order", testDescendingOrderInsertion);
test("Insertion of keys in random order", testRandomOrderInsertion);

function randomiseArray(arr){
    for(let i = arr.length - 1; i >= 0; i--){
        let randomIndex = generateRandomInteger(0, i);
        let current = arr[i];
        arr[i] = arr[randomIndex];
        arr[randomIndex] = current;
    }
    console.log(arr)
    return arr;
}

function generateRandomInteger(min, max){
    return Math.floor(Math.random() * (max - min) + min);
}