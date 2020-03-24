const RBNodeVM = require('./rbnodevm');

class RBTreeVM{
    constructor(rbtree) {
        this.nodes = new Map();
        this.updateFromModel(rbtree);
        rbtree.rbTreeChanged = this.rbTreeChangedCallback.bind(this);
    }

    updateFromModel(rbtree) {
        for(const node of rbtree){
            let nodeVM = this.nodes.get(node);
            // create nodeVM
            if(!nodeVM){
                this.nodes.set(node, new RBNodeVM(node));
            }
        }
    }

    updatePositions(){
        for (let [node, nodeVM] of this.nodes){
            nodeVM.updatePosition(0.1);
        }
    }

    rbTreeChangedCallback(rbtree) {
        this.updateFromModel(rbtree);
    }
}

module.exports = RBTreeVM;