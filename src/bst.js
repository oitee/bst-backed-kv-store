// Implement a balanced binary search tree

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
   * Returns the height of a given node in the BST
   * @param {Node} node
   * @returns Number
   */
  findHeight(node) {
    if (node) return node.height;
    return -1;
  }

  /**
   * Sets the height of a given node of the BST, according to the following:
   * The height of a node = (Max of the heights of its two children nodes) + 1
   * @param {Node} node
   */
  updateHeight(node) {
    if (node)
      node.height =
        Math.max(this.findHeight(node.right), this.findHeight(node.left)) + 1;
  }

  /**
   * Checks if the condition of a balanaced BST is violated at the level of a given node
   * If yes, it makes the necessary directional rotation(s) to balance the heights of its subtrees
   * This is done recursively by a bottom-up  traversal for every node in the BST till the root node
   * @param {Node} node
   * @returns
   */
  rebalance(node) {
    if (node == null) {
      return;
    }
    this.updateHeight(node);

    if (!this.isBalanced(node)) {
      //condition to check if the BST is imbalanced on the right sub-tree of a given node
      if (this.findHeight(node.right) > this.findHeight(node.left)) {
        //condition to check if the height of the right-subtree of the right child node is
        // greater than or equal to the height of the left sub-tree of the right child node
        if (this.findHeight(node.right.right) >= height(node.right.left)) {
          leftRotate(node);
        }
        //when the left sub-tree of the right child node is greater than the right sub-tree of
        //the right child node
        else {
          this.rightRotate(node.right);
          this.leftRotate(node);
        }
      }
      //when the BST is imbalanced on the left sub-tree of a given node
      else {
        //condition to check if the height of the left sub-tree of the left child node
        // is greater than or equal to the height of the right sub-tree of the right child node
        if (
          this.findHeight(node.left.left) >= this.findHeight(node.left.right)
        ) {
          rightRotate(node);
        }
        //when the height of the right subtree of the left child node is greater than the
        // height of the right sub-tree of the left child node
        else {
          this.leftRotate(node.left);
          this.rightRotate(node);
        }
      }

      this.rebalance(node.parent);
    }
  }

  /**
   * Left rotates a given node and updates the parent, child node pointers and their heights
   * @param {Node} x
   */
  leftRotate(x) {
    let xParent = x.parent;
    let y = x.right;

    // let yR = y.right;
    let yL = y.left;
    // let xR = x.right;
    // let xL = x.left;

    y.left = x;
    x.right = yL;

    // update parent nodes
    x.parent = y;
    if (xParent === null) {
      this.root = y;
    } else if (xParent.left === x) {
      xParent.left = y;
    } else {
      xParent.right = x;
    }
    if (yL) yL.parent = x;

    //update the heights of the changed nodes: x and y & y's parent
    this.updateHeight(x);
    this.updateHeight(y);
    this.updateHeight(xParent);
  }

  rightRotate(x) {
    let xParent = x.parent;
    let y = x.left;
    let yR = y.right;

    y.right = x;
    x.left = yR;

    //update parent nodes
    x.parent = y;
    if (xParent == null) {
      this.root = y;
    } else if (xParent.left == x) {
      xParent.left = y;
    } else {
      xParent.right = y;
    }

    if (yR) yR.parent = x;

    //update heights of the changed nodes: x and y & y's parent
    this.updateHeight(x);
    this.updateHeight(y);
    this.updateHeight(xParent);
  }
  /**
   * Inserts a new key-value pair in the BST and then calls `this.rebalance`
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
        let newNode = new Node(key, value);
        node.left = newNode;
        newNode.parent = node;
        this.rebalance(newNode);
      }
    } else {
      if (node.right) {
        this.insert(key, value, node.right);
      } else {
        let newNode = new Node(key, value);
        node.right = newNode;
        newNode.parent = node;
        this.rebalance(newNode);
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
  getAllKeyValuePairsInArr(node = this.root) {
    let result = [];
    if (node === null) {
      return null;
    }

    let leftSubTree = this.getAllKeyValuePairsInArr(node.left);
    if (leftSubTree) {
      leftSubTree.forEach((pair) => result.push(pair));
    }
    result.push([node.key, node.value]);

    let rightSubTree = this.getAllKeyValuePairsInArr(node.right);
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

    let leftSubTree = this.getAllKeyValuePairsInStr(node.left);
    if (leftSubTree) {
      result += leftSubTree;
    }
    result += `< ${node.key}, ${node.value}>
`;

    let rightSubTree = this.getAllKeyValuePairsInStr(node.right);
    if (rightSubTree) {
      result += rightSubTree;
    }

    return result;
  }

  isBalanced(node = this.root) {
    return (
      Math.abs(this.findHeight(node.left) - this.findHeight(node.right)) < 2
    );
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
