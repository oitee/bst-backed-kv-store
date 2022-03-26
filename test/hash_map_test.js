import assert from "assert";
import * as hashMap from "../src/hash_map.js";
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
  let store = new hashMap.HashMap(2);
  assert.equal(store.get(2), null);

  store.insert(1, "a");
  assert.equal(store.get(1), "a");

  kvPairs.forEach((pair) => store.insert(pair[0], pair[1]));

  assert.equal(store.get(0), "zero");
  assert.equal(store.get(10), "ten");
  assert.equal(store.get(99), null);
  assert.equal(store.exceedsLoadFactor(), false);

  assertIfAllPresent(store, kvPairs);
}

function testDescendingOrderInsertion() {
  let store = new hashMap.HashMap(2);
  assert.equal(store.get(2), null);
  kvPairs.reverse();

  store.insert(10, "z");

  kvPairs.forEach((pair) => store.insert(pair[0], pair[1]));

  assert.equal(store.get(0), "zero");
  assert.equal(store.get(10), "ten");
  assert.equal(store.get(99), null);
  assert.equal(store.exceedsLoadFactor(), false);

  assertIfAllPresent(store, kvPairs);
}

function testRandomOrderInsertion() {
  let store = new hashMap.HashMap(2);
  assert.equal(store.get(2), null);
  kvPairs = utils.randomiseArray(kvPairs);

  store.insert(5, "p");

  kvPairs.forEach((pair) => store.insert(pair[0], pair[1]));

  assert.equal(store.get(0), "zero");
  assert.equal(store.get(10), "ten");
  assert.equal(store.get(99), null);
  assert.equal(store.exceedsLoadFactor(), false);

  assertIfAllPresent(store, kvPairs);
}

function assertIfAllPresent(store, pairs) {
  let allPairsFromStoreStr = store.getAllKeyValuePairsInStr();

  pairs.forEach((pair) => {
    let inputPair = `< ${pair[0]}, ${pair[1]} >`;
    assert.equal(allPairsFromStoreStr.includes(inputPair), true);
  });

  pairs.sort((arr1, arr2) => arr1[0] - arr2[0]);
  let allPairsFromStoreArr = store
    .getAllKeyValuePairsInArr()
    .sort((arr1, arr2) => arr1[0] - arr2[1]);
  assert.deepEqual(pairs, allPairsFromStoreArr);
}

test(
  "Insertion of key value pairs in ascending order",
  testAscendingOrderInsertion
);
test(
  "Insertion of key value pairs in descending order",
  testDescendingOrderInsertion
);
test("Insertion of key value pairs in random order", testRandomOrderInsertion);
