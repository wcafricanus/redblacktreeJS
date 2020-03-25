var assert = require('assert');

const BinaryTree = require('../model/binarytree');
const BinaryTreeNode = require('../model/binarytreenode');

let tree;
beforeEach(function() {
    tree = new BinaryTree();
    let varList = [5,3,6,8,1,4];
    for (let i of varList) {
        tree.insert(i);
    }
});

it('should add new node to correct branches.', function(){
    let tree = new BinaryTree();
    let root = new BinaryTreeNode(10);
    tree.insert(root);
    let node1 = new BinaryTreeNode(1);
    tree.insert(node1);
    let node2 = new BinaryTreeNode(11);
    tree.insert(node2);
    let node3 = new BinaryTreeNode(2);
    tree.insert(node3);
    let node4 = new BinaryTreeNode(0);
    tree.insert(node4);
    let node5 = new BinaryTreeNode(4);
    tree.insert(node5);
    assert.equal(root.left, node1);
    assert.equal(root.right, node2);
    assert.equal(root.left.right, node3);
    assert.equal(root.left.left, node4);
    assert.equal(root.left.right.right, node5);
});

it('should set new node\'s parent to correct parent node.', function(){
    let tree = new BinaryTree();
    let root = new BinaryTreeNode(9);
    tree.insert(root);
    let node1 = new BinaryTreeNode(1);
    tree.insert(node1);
    assert.equal(root.parent, null);
    assert.equal(root.left, node1);
    assert.equal(root.left.parent, root);
});

it('should set new node\'s parent to correct parent node.', function(){
    let tree = new BinaryTree();
    let root = new BinaryTreeNode(9);
    tree.insert(root);
    let node1 = new BinaryTreeNode(1);
    tree.insert(node1);
    assert.equal(root.parent, null);
    assert.equal(root.left, node1);
    assert.equal(root.left.parent, root);
});

it('binary tree should find a node given its value.', function(){
    assert.equal(tree.find(5).value, 5);
    assert.equal(tree.find(4).value, 4);
    assert.equal(tree.find(3).value, 3);
    assert.equal(tree.find(8).value, 8);
});

it('binary tree find() should return null if value does not exist.', function(){
    assert.equal(tree.find(2), null);
});

it('binaryTree should have iterator that iterate through entire tree in ascending order.', function(){
    let resultList = [];
    for(let node of tree){
        resultList.push(node.value);
    }

    assert.deepEqual(resultList, [1,3,4,5,6,8]);
});

it('binaryTreeNode isLeaf should return true if it is leaf node', function(){
    assert.equal(tree.find(5).isLeaf, false);
    assert.equal(tree.find(3).isLeaf, false);
    assert.equal(tree.find(6).isLeaf, false);
    assert.equal(tree.find(8).isLeaf, true);
    assert.equal(tree.find(1).isLeaf, true);
    assert.equal(tree.find(4).isLeaf, true);
});

it('binary tree deletes leaf correctly', function(){
    assert(tree.rootNode.left.left);
    tree.delete(1);
    assert(!tree.rootNode.left.left);

    assert(tree.rootNode.left.right);
    tree.delete(4);
    assert(!tree.rootNode.left.right);
});

it('binary tree deletes non-leaf correctly', function(){
    assert(tree.rootNode.left);
    tree.delete(3);
    assert(tree.rootNode.left.value === 4);

    tree.delete(4);
    assert(tree.rootNode.left.value === 1);

    tree.delete(5);
    assert(tree.rootNode.value === 6);
    assert(tree.rootNode.right.value === 8);

    tree.delete(1);
    assert(tree.rootNode.left === null);

    tree.delete(6);
    assert(tree.rootNode.value === 8);
    assert(tree.rootNode.right === null);

    tree.delete(8);
    assert(tree.rootNode === null);
});