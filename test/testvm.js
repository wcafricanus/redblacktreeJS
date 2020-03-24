var assert = require('assert');
const RBTreeNode = require('../model/rbtreenode');
const RedBlackTree = require('../model/redblacktree');
const PositionArranger = require('../positionarranger');
const RBTreeVM = require('../src/rbtreevm');
it('RBTreeVM should create nodeVMs corresponding to the RBTree model.', function(){
    let varList = [5,1,2,8,6,4];
    let tree = new RedBlackTree();
    for (let i = 0; i < varList.length; i++) {
        let newNode = new RBTreeNode(varList[i]);
        tree.insert(newNode);
    }

    let treeVM = new RBTreeVM(tree);
    assert.equal(treeVM.nodes.size, varList.length);

    tree.insert(0);
    assert.equal(treeVM.nodes.size, varList.length + 1);
});


it('RBNodeVM should be notified of position changes of the RBTreeNode it binds to.', function(){
    let varList = [5];
    let tree = new RedBlackTree();
    for (let i = 0; i < varList.length; i++) {
        let newNode = new RBTreeNode(varList[i]);
        tree.insert(newNode);
    }

    let treeVM = new RBTreeVM(tree);
    assert.equal(treeVM.nodes.get(tree.rootNode).posX, 0);
    assert.equal(treeVM.nodes.get(tree.rootNode).posY, 0);

    tree.rootNode.posX = 20;
    tree.rootNode.posY = 30;
    assert.equal(treeVM.nodes.get(tree.rootNode).posX, 0);
    assert.equal(treeVM.nodes.get(tree.rootNode).posY, 0);
    assert.equal(treeVM.nodes.get(tree.rootNode).targetX, 20);
    assert.equal(treeVM.nodes.get(tree.rootNode).targetY, 30);
});


it('RBNodeVM should be notified of color changes of the RBTreeNode it binds to.', function(){
    let varList = [5];
    let tree = new RedBlackTree();
    for (let i = 0; i < varList.length; i++) {
        let newNode = new RBTreeNode(varList[i]);
        tree.insert(newNode);
    }

    let treeVM = new RBTreeVM(tree);
    assert.equal(treeVM.nodes.get(tree.rootNode).color, 'black');

    tree.rootNode.red = true;
    assert.equal(treeVM.nodes.get(tree.rootNode).color, 'red');
});