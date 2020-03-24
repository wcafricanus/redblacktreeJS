var assert = require('assert');
const RBTreeNode = require('../model/rbtreenode');
const RedBlackTree = require('../model/redblacktree');
const PositionArranger = require('../positionarranger');
const RBTreeVM = require('../src/rbtreevm');

it('should arrange screen position of nodes correctly', function(){
    let varList = [5,1,2,8,6,4];
    let tree = new RedBlackTree();
    for (let i = 0; i < varList.length; i++) {
        let newNode = new RBTreeNode(varList[i]);
        tree.insert(newNode);
    }
    let treeVM = new RBTreeVM(tree);
    let arranger = new PositionArranger(100, 0, 10, 10);
    arranger.arrange(tree);
    assert.equal(tree.rootNode.posX, 100);
    assert.equal(tree.rootNode.posY, 0);
    assert.equal(tree.rootNode.left.posX, 90);
    assert.equal(tree.rootNode.left.posY, 10);
});

it("RBTreeVM should update its nodeVMs' target positions after arranger arrange() on rbtree", function(){
    let varList = [5,1,2,8,6,4];
    let tree = new RedBlackTree();
    for (let i = 0; i < varList.length; i++) {
        let newNode = new RBTreeNode(varList[i]);
        tree.insert(newNode);
    }
    let treeVM = new RBTreeVM(tree);
    let arranger = new PositionArranger(100, 0, 10, 10);
    arranger.arrange(tree);
    assert.equal(treeVM.nodes.get(tree.rootNode).posX, 0);
    assert.equal(treeVM.nodes.get(tree.rootNode).posY, 0);
    assert.equal(treeVM.nodes.get(tree.rootNode.left).posX, 0);
    assert.equal(treeVM.nodes.get(tree.rootNode.left).posY, 0);
    assert.equal(treeVM.nodes.get(tree.rootNode).targetX, 100);
    assert.equal(treeVM.nodes.get(tree.rootNode).targetY, 0);
    assert.equal(treeVM.nodes.get(tree.rootNode.left).targetX, 90);
    assert.equal(treeVM.nodes.get(tree.rootNode.left).targetY, 10);
});