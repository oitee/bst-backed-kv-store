import assert from "assert";
import * as bst from "../src/bst.js";
import * as utils from "./test_utils/randomize.js";

let kvPairs = [
  [0, "zero"],
  [1, "one"],
  [2, "two"],
  [3, "three"],
  [4, "four"],
  [5, "five"],
  [6, "six"],
  [7, "seven"],
  [8, "eight"],
  [9, "nine"],
  [10, "ten"],
];

function testAscendingOrderInsertion() {
  let store = new bst.BinaryTree(1, "a");
  kvPairs.forEach((pair) => store.insert(pair[0], pair[1]));
  store.insert(5, "5");
  store.insert(5, "5");

  assert.equal(store.isBalanced(), true);
  assert.equal(store.get(0), "zero");
  assert.equal(store.get(1), "one");
  assert.equal(store.get(5), "5");
  assert.equal(store.get(99), null);

  kvPairs.forEach((pair) => store.insert(pair[0], pair[1]));
  assert.equal(store.isBalanced(), true);
  assertIfAllPresent(store, kvPairs);
  
  //asserting in-order traversal
  assert.deepEqual(store.getAllPairs(), kvPairs)
}

function testDescendingOrderInsertion() {
  kvPairs.reverse();
  let store = new bst.BinaryTree(1, "a");

  kvPairs.forEach((pair) => store.insert(pair[0], pair[1]));
  store.insert(5, "5");
  store.insert(5, "5");

  assert.equal(store.isBalanced(), true);
  assert.equal(store.get(0), "zero");
  assert.equal(store.get(1), "one");
  assert.equal(store.get(5), "5");
  assert.equal(store.get(99), null);

  kvPairs.forEach((pair) => store.insert(pair[0], pair[1]));
  assert.equal(store.isBalanced(), true);
  assertIfAllPresent(store, kvPairs);
}

function testRandomOrderInsertion() {
  kvPairs = utils.randomiseArray(kvPairs);
  let store = new bst.BinaryTree(1, "a");

  kvPairs.forEach((pair) => store.insert(pair[0], pair[1]));
  store.insert(5, "5");
  store.insert(5, "5");

  assert.equal(store.isBalanced(), true);
  assert.equal(store.get(0), "zero");
  assert.equal(store.get(1), "one");
  assert.equal(store.get(5), "5");
  assert.equal(store.get(99), null);

  kvPairs.forEach((pair) => store.insert(pair[0], pair[1]));
  assert.equal(store.isBalanced(), true);
  assertIfAllPresent(store, kvPairs);
}

function assertIfAllPresent(store, pairs) {
  let allPairsResultInStr = store.getAllKeyValuePairsInStr();

  pairs.forEach((pair) => {
    let inputPair = `< ${pair[0]}, ${pair[1]}>`;
    assert.equal(allPairsResultInStr.includes(inputPair), true);
  });

  pairs.sort((arr1, arr2) => arr1[0] - arr2[0]);
  assert.deepEqual(pairs, store.getAllPairs());
}

test("Insertion of keys in ascending order", testAscendingOrderInsertion);
test("Insertion of keys in descending order", testDescendingOrderInsertion);
test("Insertion of keys in random order", testRandomOrderInsertion);
