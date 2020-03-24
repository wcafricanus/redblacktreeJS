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

    insert(node){
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
        // TODO
    }
}

module.exports = BinaryTree;