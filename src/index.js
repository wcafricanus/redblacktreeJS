const RBTreeNode = require('../model/rbtreenode');
const RedBlackTree = require('../model/redblacktree');
const PositionArranger = require('../positionarranger');
const RBTreeVM = require('../src/rbtreevm');
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let drawer = new RbTreeDrawer(ctx);
// let varList = [];
let varList = [5,1,2,8,6,4];
let tree = new RedBlackTree();
for (let i = 0; i < varList.length; i++) {
    let newNode = new RBTreeNode(varList[i]);
    tree.insert(newNode);
}
let treeVM = new RBTreeVM(tree);
let arranger = new PositionArranger(canvas.width/2, 40, 50, 50);
arranger.arrange(tree);
document.getElementById("addButton").onclick = addNodeByValue;
document.getElementById("deleteButton").onclick = deleteNodeByValue;
let input = document.getElementById("nodeValue");
input.addEventListener("keyup", function(event) {
    if (event.code === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("addButton").click();
        input.value = '';
    }
    if (event.code === "Delete") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("deleteButton").click();
        input.value = '';
    }
});

function addNodeByValue() {
    let textValue = document.getElementById('nodeValue').value;
    let value = Number(textValue);
    let newNode = new RBTreeNode(value);
    tree.insert(newNode);
    arranger.arrange(tree);
    document.getElementById('errorMsg').innerHTML = '';
}

function deleteNodeByValue() {
    let textValue = document.getElementById('nodeValue').value;
    let value = Number(textValue);
    try {
        tree.delete(value);
        arranger.arrange(tree);
        document.getElementById('errorMsg').innerHTML = '';
    }
    catch (e) {
        document.getElementById('errorMsg').innerHTML = e.toString();
    }
}

function update(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    treeVM.updatePositions();
    drawer.drawTree(treeVM);
}


setInterval(update, 16);