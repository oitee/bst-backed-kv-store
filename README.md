# bst-backed-kv-store
A Balanced Binary Search Tree backed hashtable

## Goal

To create a key-value store with fast (close to O(1)) insertion and look-up.

## Scope

This key value store supports the following operations:

- Insertion: To insert a key-value store. If the key exists, the existing value gets updated
- Retrieval: To retrive the value of an existing key from the store. If a given key does not exist, it will return `null`
- Retrieval of the all pairs: To retrieve every existing key-value pairs stored in the store.

This store only supports positive integers as keys.

## Implementation Details

The simplest way to implement a key-value store is to treat the index of an array as the key and to store the associated value in the corresponding slot of the array. This guarantees a constant time for look-up and insertion. However, this method is infeasible, as we will need an array of infinite size in order to map every possible key to a unique index of the array.

For this reason, a hash function is much more effective for storing key-value pairs: while (*nearly*) retaining the property of a constant-time lookup, we can use the many-to-one property of hash functions to map an infinite universe of positive integers to an array of finite size.

This key-value store uses the modulo function as its underlying hash function.

### What about collisions

Obviously, as a corollary of the many-to-one property of hash functions, it is possible (and with rise in the number of keys being stored, increasingly probable) that more than one key maps to the same index. To handle such collisions, this key-value store implements separate chaining: each hash-bucket (of the hash-map) hosts a binary search tree, which (by definition) can support an inifinte number of nodes. The relative advantage of using a binary tree (over a simple linked list) for storing colliding key-value pairs, is that the binary search trees (*on an average*) provides a time-complexity of O(log n) for look-ups and insertions (as opposed to the much more costly O(n) time complexity for linked lists).

However, the efficiency of ordinary binary search trees are dependent on the order of insertion of new nodes. For example, if we insert nodes in an ascending order, we will get a highly disbalanced binary search tree: it will essentially be a linked list. This takes away the crucial advantage of using binary search trees. To fix this, we can use a self-balancing binary search tree. This will ensure that, for every insertion, the binary search tree will re-adjust itself, to correct any resultant imbalance.

This key-value store implements an AVL tree, which maintains the following condition: for any given node in the tree, the difference in heights of its left and right sub-trees will not exceed 1. Here, 'height' refers to the number of paths between the root node of a sub-tree and its farthest leaf node. [**The implementation of the AVL tree was undertaken with the help of this [MIT Lecture](https://www.youtube.com/watch?v=FNeL18KsWPc).**]

### Rehashing

Additionally, this key-value store implements re-hashing. By default, it maintains a load-factor of 0.75. This means that, when the ratio of the number of non-empty hash-buckets to the total size of the hash-map exceeds 0.75, the size of the hash-map will be doubled, and every existing key-value pair will be mapped to this newly re-hashed map.


## Running the System

To run this system, Node.js need to be installed.

This project can be run using the following command on the terminal:

```
npm install
npm start
```

This will kick-start a CLI-interface on the terminal. To quit a session, `q` needs to be entered.

## Tests

To run tests:

```
npm test
```