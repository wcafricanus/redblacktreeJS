/**
 * This class is responsible of determining the screen position
 * of all the nodes in a Red Black Tree.
 */
class PositionArranger{
    constructor(x, y, spaceX, spaceY) {
        this.anchor = {x: x, y:y};
        this.spaceX = spaceX;
        this.spaceY = spaceY;
    }

    arrange(rbtree){
        this.arrangeNodePosition(rbtree.rootNode);
    }

    arrangeNodePosition(node){
        // if null node, do nothing
        if(!node)
            return;

        // if root node, set anchor position
        if(!node.parent){
            node.posX = this.anchor.x;
            node.posY = this.anchor.y;
        }
        else if(node === node.parent.right){
            let leftCount = node.countLeftDescendants();
            let offsetX = (leftCount + 1) * this.spaceX;
            node.posX = node.parent.posX + offsetX;
            node.posY = node.parent.posY + this.spaceY;
        }
        else if(node === node.parent.left){
            let rightCount = node.countRightDescendants();
            let offsetX = (rightCount + 1) * this.spaceX;
            node.posX = node.parent.posX - offsetX;
            node.posY = node.parent.posY + this.spaceY;
        }
        //
        this.arrangeNodePosition(node.left);
        this.arrangeNodePosition(node.right);
    }
}

module.exports = PositionArranger;