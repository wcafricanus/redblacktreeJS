var assert = require('assert');

const RBTreeNode = require('../model/rbtreenode');
const RedBlackTree = require('../model/redblacktree');

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