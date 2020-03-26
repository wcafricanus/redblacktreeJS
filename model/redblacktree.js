const BinaryTree = require('./binarytree');
const RBTreeNode = require('./rbtreenode');

class RedBlackTree extends BinaryTree{
    constructor(){
        super();
        this.rbTreeChanged = null;
    }

    createNode(value){
        let node = new RBTreeNode(value);
        return node;
    }

    insert(node) {
        node = super.insert(node);
        let nodeToCheck = node;
        while(nodeToCheck){
            nodeToCheck = this.checkBalance(nodeToCheck);
        }
        if (this.rbTreeChanged)
            this.rbTreeChanged(this);
        return node;
    }

    checkBalance(node) {
        let recheck = null;
        if (node === this.rootNode) {
            node.red = false;
            return recheck;
        }
        if (!node.parent.red) {
            return recheck;
        }
        // node and parent both red
        let uncle = this.getUncle(node);
        let grandpa = node.parent.parent;
        // uncle also red
        if (uncle && uncle.red) {
            // flip color of parent and uncle
            uncle.red = false;
            node.parent.red = false;
            // grand parent is root
            if (grandpa === this.rootNode) {
                return recheck;
            }
            // grand parent is not root
            else {
                grandpa.red = true;
                recheck = grandpa;
            }
        }
        // uncle not red
        else {
            let leftBranch = node.parent === grandpa.left;
            if (node === node.parent.left && node.parent === grandpa.right) {
                // right rotate parent
                let P = node.parent;
                this.rightRotate(P);
            }
            if (node === node.parent.right && node.parent === grandpa.left) {
                // left rotate parent
                this.leftRotate(node.parent);
            }

            if (leftBranch) {
                let P = grandpa.left;
                let G = grandpa;
                // right rotate grandpa
                this.rightRotate(G);
                // recolor
                P.red = false;
                G.red = true;
            } else {
                let P = grandpa.right;
                let G = grandpa;
                // left rotate grandpa
                this.leftRotate(G);
                // recolor
                P.red = false;
                G.red = true;
            }
        }
        return recheck;
    }

    preRemoveOperation(node){
        // simple case, if either u or v is red
        if (node.red){
            return;
        }
        // both u and v are black
        // sibling exists
        if(node.sibling){
            // and sibling is black
            if (!node.sibling.red){
                // left left case
                if(node.sibling===node.parent.left && node.sibling.left && node.sibling.left.red){
                    let r = node.sibling.left;
                    let s = node.sibling;
                    let p = node.parent;
                    this.rightRotate(p);
                    // recolor
                    s.red = p.red;
                    r.red = false;
                    p.red = false;
                }
                // left right case
                else if(node.sibling===node.parent.left && node.sibling.right && node.sibling.right.red){
                    let r = node.sibling.right;
                    let s = node.sibling;
                    // double rotation
                    this.leftRotate(node.sibling);
                    this.rightRotate(node.parent);
                    // recolor
                    r.red = false;
                    s.red = true;
                }
                // right right case
                else if(node.sibling===node.parent.right && node.sibling.right && node.sibling.right.red){
                    let r = node.sibling.right;
                    let s = node.sibling;
                    let p = node.parent;
                    this.leftRotate(p);
                    // recolor
                    s.red = p.red;
                    r.red = false;
                    p.red = false;
                }
                // right left case
                else if(node.sibling===node.parent.right && node.sibling.left&& node.sibling.left.red){
                    let r = node.sibling.left;
                    let s = node.sibling;
                    // double rotation
                    this.rightRotate(node.sibling);
                    this.leftRotate(node.parent);
                    // recolor
                    r.red = false;
                    s.red = true;
                }
                else // sibling is black and both sibling's children are black
                {
                    // recolor
                    node.sibling.red = true;
                    // if parent is black, recolor it to black makes it double black, recur the operation for parent.
                    if (!node.parent.red)
                        this.preRemoveOperation(node.parent);
                    // if parent is red, recolor it to black, no need to do recursion.
                    else
                        node.parent.red = false;
                }
            }
            // sibling is red
            else{
                let P = node.parent;
                let S = node.sibling;
                if (node.sibling===node.parent.right){
                    this.leftRotate(P);
                }
                if (node.sibling===node.parent.left){
                    this.rightRotate(P);
                }
                // recolor
                P.red = true;
                S.red = false;
                this.preRemoveOperation(node);
            }
        }
    }

    remove(node) {
        this.preRemoveOperation(node);

        super.remove(node);
        if (this.rbTreeChanged)
            this.rbTreeChanged(this);
    }

    leftRotate(P) {
        let G = P.parent;
        let N = P.right;
        let LC = N.left;
        // 1. link grandpa self
        if (G)
            if (G.left===P)
                G.left = N;
            else
                G.right = N;
        N.parent = G;
        // 2. relink self parent
        N.left = P;
        P.parent = N;
        // 3. link left child to parent right
        P.right = LC;
        if(LC)
            LC.parent = P;
        // update root node reference if root node is changed
        if (!N.parent)
            this.rootNode = N;
    }

    rightRotate(P) {
        let G = P.parent;
        let N = P.left;
        let RC = N.right;
        // 1. link grandpa self
        if (G)
            if (G.right===P)
                G.right = N;
            else
                G.left = N;
        N.parent = G;
        // 2. relink self parent
        P.parent = N;
        N.right = P;
        // 3. link right child to parent left
        P.left = RC;
        if (RC)
            RC.parent = P;
        // update root node reference if root node is changed
        if (!N.parent)
            this.rootNode = N;
    }

    getUncle(node) {
        if(node.parent===node.parent.parent.left)
            return node.parent.parent.right;
        return node.parent.parent.left;
    }
}

module.exports = RedBlackTree;