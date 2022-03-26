// Implement a binary search tree

export class BinaryTree {
  constructor(key, value) {
    this.root = new Node(key, value);
  }

  /**
   * Returns the root node of the BST
   * @returns Node
   */
  getRoot() {
    return this.root;
  }



  /**
   * Inserts a new key-value pair in the BST
   * @param {Number} key
   * @param {String} value
   * @param {Node} node
   */
  insert(key, value, node = this.root) {
    if (key === node.key) {
      node.value = value;
    } else if (key < node.key) {
      if (node.left) {
        this.insert(key, value, node.left);
      } else {
        const newNode = new Node(key, value);
        node.left = newNode;
        newNode.parent = node;
      }
    } else {
      if (node.right) {
        this.insert(key, value, node.right);
      } else {
        const newNode = new Node(key, value);
        node.right = newNode;
        newNode.parent = node;
      }
    }
  }

  /**
   * Returns the corresponding value of a given key in the BST
   * @param {Number} key
   * @param {Node} node
   * @returns String
   */
  get(key, node = this.root) {
    if (node == null) {
      return null;
    }
    if (node.key === key) {
      return node.value;
    }
    if (key < node.key) {
      return this.get(key, node.left);
    }
    return this.get(key, node.right);
  }

  /**
   * Returns a two-dimensional array, containing all the key-value pairs of the BST
   * @param {Node} node
   * @returns Array
   */
  getAllPairs(node = this.root) {
    const result = [];
    if (node === null) {
      return null;
    }

    const leftSubTree = this.getAllPairs(node.left);
    if (leftSubTree) {
      leftSubTree.forEach((pair) => result.push(pair));
    }
    result.push([node.key, node.value]);

    const rightSubTree = this.getAllPairs(node.right);
    if (rightSubTree) {
      rightSubTree.forEach((pair) => result.push(pair));
    }

    return result;
  }
  /**
   * Returns a String representing all the key-value pairs in the BST
   * @param {Node} node
   * @returns String
   */
  getAllKeyValuePairsInStr(node = this.root) {
    let result = "";
    if (node === null) {
      return null;
    }

    const leftSubTree = this.getAllKeyValuePairsInStr(node.left);
    if (leftSubTree) {
      result += leftSubTree;
    }
    result += `< ${node.key}, ${node.value}>
`;

    const rightSubTree = this.getAllKeyValuePairsInStr(node.right);
    if (rightSubTree) {
      result += rightSubTree;
    }

    return result;
  }
}

class Node {
  constructor(key, value, parent = null, left = null, right = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = left;
    this.right = right;
    this.height = 1;
  }
}
