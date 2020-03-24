const BinaryTree = require('./binarytree');
const RBTreeNode = require('./rbtreenode');

class RedBlackTree extends BinaryTree{
    constructor(){
        super();
        this.rbTreeChanged = null;
    }
    insert(value) {
        let node=value;
        if(!isNaN(value)) //  is a number
        {
            node = new RBTreeNode(value);
        }
        super.insert(node);
        let nodeToCheck = node;
        while(nodeToCheck){
            nodeToCheck = this.checkBalance(nodeToCheck);
        }
        if (this.rbTreeChanged)
            this.rbTreeChanged(this);
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
                let N = node;
                let G = grandpa;
                let RC = node.right;
                this.rightRotate(G, N, P, RC);
            }
            if (node === node.parent.right && node.parent === grandpa.left) {
                // left rotate parent
                let P = node.parent;
                let N = node;
                let G = grandpa;
                let LC = node.left;
                this.leftRotate(G, N, P, LC);
            }

            if (leftBranch) {
                let P = grandpa.left;
                let G = grandpa;
                // right rotate grandpa
                this.rightRotate(G.parent, P, G, P.right);
                // recolor
                P.red = false;
                G.red = true;
            } else {
                let P = grandpa.right;
                let G = grandpa;
                // left rotate grandpa
                this.leftRotate(G.parent, P, G, P.left);
                // recolor
                P.red = false;
                G.red = true;
            }
        }
        return recheck;
    }

    leftRotate(G, N, P, LC) {
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

    rightRotate(G, N, P, RC) {
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