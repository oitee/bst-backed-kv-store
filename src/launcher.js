import readline from "readline";
import * as utils from "./utils.js";
import * as hashMap from "./hash_map.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/**
 * Initiates the REPL and handles user inputs
 * @param {hashMap.HashMap} store 
 */
async function repl(store) {
  console.log(`
1. Insert
2. Retrieve
3. Display current state
`);

  rl.question(`Choice (q to exit): `, async (input) => {
    if (input === "q") {
        console.log("Bye!")
      rl.close();
    } else if (input === "1") {
      insert(store);
      } else if (input === "2") {
        get(store);
      } else if (input === "3") {
        getAll(store);
    } else {
      console.log(`Invalid input`);
      await repl(store);
    }
    ``;
  });
}

/**
 * Takes input key and value from the user and stores them in
 * the key-value store by calling the `insert` method of the store
 * @param {hashMap.HashMap} store 
 */
async function insert(store) {

  rl.question(`Enter key: `, async (inputKey) => {
    if (utils.isPositiveNumber(parseInt(inputKey))) {
      rl.question(`Enter value:`, async (inputValue) => {
        if (utils.isString(inputValue)) {
          store.insert(parseInt(inputKey), inputValue);
          console.log(`Insertion successful`);
        } else {
          console.log(`Invalid response. Please Try Again`);
        }
        console.log();
        console.log(`-----------------------------------------`);
        await repl(store);
      });
    } else {
      console.log(
        `Invalid response. Keys should be positive integers. Please try again`
      );
      console.log();
      console.log(`-----------------------------------------`);
      await repl(store);
    }
  });
}

/**
 * Takes an inputKey from the user and retrieves its value from the 
 * store by calling the `get` method of the store
 * @param {hashMap.hashMap} store 
 */
async function get(store) {

  rl.question(`Enter key: `, async (inputKey) => {
    if (utils.isPositiveNumber(parseInt(inputKey))) {
      console.log(`Retrieved Value: ${store.get(parseInt(inputKey))}`);
    } else {
      console.log(
        `Invalid response. Keys need to be positive integers. Please try again`
      );
    }
    console.log();
    console.log(`-----------------------------------------`);
    await repl(store);
  });
}

/**
 * Displays a stringified version of the key-value store
 * by calling the appropriate method of the store
 * @param {hashMap.HashMap} store 
 */
async function getAll(store) {
  console.log(store.getAllKeyValuePairsInStr())
  console.log();
    console.log(`-----------------------------------------`);
    await repl(store);

}

/**
 * Creates a new instance of the key-value store
 * and initiates the REPL
 */
async function launch() {
  repl(new hashMap.HashMap());
}

launch();
