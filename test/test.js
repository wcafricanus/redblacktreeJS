var assert = require('assert');

const BinaryTree = require('../model/binarytree');
const RBTreeNode = require('../model/rbtreenode');
const RedBlackTree = require('../model/redblacktree');
it('should set new node\'s parent to correct parent node.', function(){
    let tree = new BinaryTree();
    let root = new RBTreeNode(9);
    tree.insert(root);
    let node1 = new RBTreeNode(1);
    tree.insert(node1);
    assert.equal(root.parent, null);
    assert.equal(root.left, node1);
    assert.equal(root.left.parent, root);
});

it('should add new node to correct branches.', function(){
    let tree = new BinaryTree();
    let root = new RBTreeNode(10);
    tree.insert(root);
    let node1 = new RBTreeNode(1);
    tree.insert(node1);
    let node2 = new RBTreeNode(11);
    tree.insert(node2);
    let node3 = new RBTreeNode(2);
    tree.insert(node3);
    let node4 = new RBTreeNode(0);
    tree.insert(node4);
    let node5 = new RBTreeNode(4);
    tree.insert(node5);
    assert.equal(root.left, node1);
    assert.equal(root.right, node2);
    assert.equal(root.left.right, node3);
    assert.equal(root.left.left, node4);
    assert.equal(root.left.right.right, node5);
});

it('node should count its descendants correctly.', function(){
   let varList = [5,3,6,8,1,4];
   let tree = new RedBlackTree();
    for (let i = 0; i < varList.length; i++) {
        let newNode = new RBTreeNode(varList[i]);
        tree.insert(newNode);
    }

    assert.equal(tree.rootNode.countDescendants(), 5);
});

it('node should count its left/right descendants correctly.', function(){
    let varList = [5,3,6,8,1,4];
    let tree = new RedBlackTree();
    for (let i = 0; i < varList.length; i++) {
        let newNode = new RBTreeNode(varList[i]);
        tree.insert(newNode);
    }

    assert.equal(tree.rootNode.countLeftDescendants(), 3);
    assert.equal(tree.rootNode.countRightDescendants(), 2);
});

it('binaryTree should have iterator that iterate through entire tree in ascending order.', function(){
    let varList = [5,3,6,8,1,4];
    let tree = new RedBlackTree();
    for(let item of varList){
        tree.insert(item);
    }

    let resultList = [];
    for(let node of tree){
        resultList.push(node.value);
    }

    assert.deepEqual(resultList, [1,3,4,5,6,8]);
});