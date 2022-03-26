import * as bst from "./bst.js";
import * as utils from "./utils.js";
export class HashMap {
  constructor(loadFactor, maxSize) {
    this.arr = [];
    if (utils.isPositiveNumber(maxSize)) this.size = maxSize;
    else this.size = 100;
    if (utils.isPositiveNumber(loadFactor)) this.loadFactor = loadFactor;
    else this.loadFactor = 0.75;
    this.addDefaultValues();
    this.filledHashBuckets = 0;
  }
  /**
   * Sets default (null) values on this.arr
   */
  addDefaultValues() {
    for (let i = 0; i < this.size; i++) {
      this.arr[i] = null;
    }
  }

  /**
   * Returns the hash value of a given key
   * @param {Number} key
   * @returns Number
   */
  hashFn(key) {
    return key % this.size;
  }

  /**
   * Inserts a key value pair to the hash-map
   * @param {Number} key
   * @param {String} value
   */
  insert(key, value) {
    const hashValue = this.hashFn(key);
    if (!utils.isPositiveNumber(key)) {
      throw `Keys need to be of positive Numbers: ${key}`;
    }
    if (this.arr[hashValue] == null) {
      this.arr[hashValue] = new bst.BinaryTree(key, value);
      this.filledHashBuckets++;
      this.rehashIfNecessary();
    } else {
      this.arr[hashValue].insert(key, value);
    }
  }

  /**
   * Returns the corresponding value of a given key from the hash-map
   * @param {Number} key
   * @returns String | Null
   */
  get(key) {
    if (!utils.isPositiveNumber(key)) {
      throw `Keys need to be of positive Numbers: ${key}`;
    }
    const hashValue = this.hashFn(key);
    if (this.arr[hashValue] === null) {
      return null;
    }
    return this.arr[hashValue].get(key);
  }

  /**
   * Returns true if the hashMap has exceeded its load factor
   * @returns Boolean
   */
  exceedsLoadFactor() {
    return this.filledHashBuckets / this.size > this.loadFactor;
  }

  /**
   * Checks if rehashing is necessary
   */
  rehashIfNecessary() {
    if (this.exceedsLoadFactor()) {
      this.rehash();
    }
  }

  /**
   * Rehashes the hashMap by creating a new hashMap of double the size,
   * followed by mapping of the exisitng key-value pairs to the new hashMap
   */
  rehash() {
    const newHashMap = new HashMap(this.size * 2, this.loadFactor);
    this.arr.forEach((hashBucket) => {
      if (hashBucket !== null) {
        hashBucket
          .getAllPairs()
          .forEach((pair) => newHashMap.insert(pair[0], pair[1]));
      }
    });
    this.size = newHashMap.size;
    this.arr = newHashMap.arr;
    this.filledHashBuckets = newHashMap.filledHashBuckets;
  }

  /**
   * Returns an array containing all the key-value pairs in the hashMap
   * @returns Array
   */
  getAllArr() {
    return this.arr
    .filter(item => item !== null)
    .flatMap((hashBucket) => hashBucket.getAllPairs())
  }

  /**
   * Returns a string representation of a given array of key-value pairs
   * @returns String
   */
  stringifyPairs(pairs) {
    let resultStr = "";
    pairs.forEach((pair) => {
      resultStr += `< ${pair[0]}, ${pair[1]} >
`;
    });

    return resultStr;
  }

  /**
   * Returns a String representation of all the key-value pairs present in the hashMap
   * @returns String
   */
  getAll() {
    const allPairsArr = this.getAllArr();
    return this.stringifyPairs(allPairsArr);
  }
}
