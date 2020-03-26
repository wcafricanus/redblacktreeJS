const BinaryTreeNode = require('./binarytreenode');

class BinaryTree{
    constructor() {
        this.rootNode = null;
        this.stack = [];
    }

    [Symbol.iterator](){
        this.in_order_left(this.rootNode, this.stack);
        return this;
    }

    next(){
        if(this.stack.length){
            let item = this.stack.pop();
            if(item.right){
                this.in_order_left(item.right, this.stack);
            }
            return {done: false, value: item};
        }
        else{
            return {done: true};
        }
    }

    in_order_left(current, stack) {
        while(current){
            stack.push(current);
            current = current.left;
        }
    }

    find(value){
        let next = this.rootNode;
        while (next){
            if (next.value === value){
                break;
            }
            else if(next.value > value){
                next = next.left;
            }
            else{
                next = next.right;
            }
        }
        return next;
    }

    createNode(value){
        return new BinaryTreeNode(value);
    }

    insert(node){
        if(!isNaN(node)) //  is a number
        {
            node = this.createNode(node);
        }

        let cursor = this.rootNode;
        let parent = null;
        let left = true;
        while(true){
            let result = this.tryInsertTo(cursor, node, parent, left);
            if(result)
                break;

            parent = cursor;
            if (node.value < cursor.value) {
                left = true;
                cursor = cursor.left;
            }
            else{
                left = false;
                cursor = cursor.right;
            }
        }

        return node;
    }

    tryInsertTo(candidateSlot, node, parent, left){
        // if slot is empty, put node here
        if(!candidateSlot){
            node.parent = parent;
            // very first node, become root
            if(!parent){
                this.rootNode = node;
                return true;
            }
            // not the first node
            if(left)
                parent.left = node;
            else
                parent.right = node;
            return true;
        }

        // there is an existing node at this position
        return false;
    }

    delete(node){
        if(!isNaN(node)) //  is a number
        {
            node = this.find(node);
        }
        if (!node)
            throw "Node Not Found.";

        let toDelete = this.designateNodeToDelete(node);

        this.remove(toDelete)
    }

    remove(node){
        // root node
        if (node===this.rootNode){
            this.rootNode = null;
            return;
        }

        // not root
        if(node === node.parent.left)
            node.parent.left = null;
        else
            node.parent.right = null;
        node.parent = null;
    }


    designateNodeToDelete(node) {
        if (node.isLeaf){
            return node;
        }
        // node has one child
        else if((node.left||node.right)&&!(node.left&&node.right)){
            let child = node.left? node.left: node.right;
            node.value = child.value;
            return this.designateNodeToDelete(child);
        }
        // node has two children
        else{
            // find inorder successor
            let stack = [];
            this.in_order_left(node.right, stack);
            let inorder_suc = stack.pop();
            node.value = inorder_suc.value;
            return this.designateNodeToDelete(inorder_suc);
        }
    }
}

module.exports = BinaryTree;