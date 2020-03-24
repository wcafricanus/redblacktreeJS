class BinaryTreeNode{
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.parent = null;
        this._posX = 0;
        this._posY = 0;
        this.radius = 20;
        this.positionChanged = null;
    }

    get posX(){
        return this._posX;
    }

    set posX(x){
        this._posX = x;
        if (this.positionChanged)
            this.positionChanged(this._posX, this._posY);
    }

    get posY(){
        return this._posY;
    }

    set posY(y){
        this._posY = y;
        if (this.positionChanged)
            this.positionChanged(this._posX, this._posY);
    }

    connectLeft(node){
        this.left = node;
        node.parent = this;
    }

    connectRight(node){
        this.right = node;
        node.parent = this;
    }

    countDescendants(){
        let leftCount = this.left? this.left.countDescendants() + 1: 0;
        let rightCount = this.right? this.right.countDescendants() + 1: 0;
        return leftCount + rightCount;
    }

    countLeftDescendants(){
        if(this.left)
            return this.left.countDescendants() + 1;
        return 0;
    }

    countRightDescendants(){
        if(this.right)
            return this.right.countDescendants() + 1;
        return 0;
    }
}

module.exports = BinaryTreeNode;