const RBNodeVM = require('./rbnodevm');

class RBTreeVM{
    constructor(rbtree) {
        this.nodes = new Map();
        this.updateFromModel(rbtree);
        rbtree.rbTreeChanged = this.rbTreeChangedCallback.bind(this);
    }

    updateFromModel(rbtree) {
        let swapMap = new Map();

        for(const node of rbtree){
            let nodeVM = this.nodes.get(node);
            // create nodeVM
            if(!nodeVM){
                nodeVM = new RBNodeVM(node);
            }
            swapMap.set(node, nodeVM);
        }

        this.nodes = swapMap;
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