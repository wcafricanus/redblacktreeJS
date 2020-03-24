const BinaryTreeNode = require('./binarytreenode');

class RBTreeNode extends BinaryTreeNode{
    constructor(value) {
        super(value);
        this._red = true;
        this.colorChanged = null;
    }

    get red(){
        return this._red;
    }

    set red(value){
        this._red = value;
        if (this.colorChanged)
            this.colorChanged(value);
    }
}

module.exports = RBTreeNode;