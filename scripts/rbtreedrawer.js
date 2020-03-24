class RbTreeDrawer{
    constructor(context) {
        this.ctx = context;
    }

    drawNode(nodeVM){
        this.drawBall(nodeVM.posX, nodeVM.posY, nodeVM.radius, nodeVM.color);
        this.drawText(nodeVM.text, nodeVM.posX, nodeVM.posY,
            nodeVM.radius, nodeVM.color==="red"? 'black':'white');
    }

    drawText(text, x, y, radius, color){
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillStyle = color;
        this.ctx.font = "20px Arial";
        this.ctx.fillText(text, x, y);
    }

    drawBall(x, y, radius, color){
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI*2);
        this.ctx.fillStyle = color;
        this.ctx.fill();
        this.ctx.closePath();
    }

    drawConnection(nodeVM1, nodeVM2){
        this.ctx.beginPath();
        this.ctx.moveTo(nodeVM1.posX, nodeVM1.posY);
        this.ctx.lineTo(nodeVM2.posX, nodeVM2.posY);
        this.ctx.stroke();
        this.ctx.closePath();
    }

    drawTree(treeVM){
        // draw connections first
        for (let [node, nodeVM] of treeVM.nodes) {
            if (node.left)
                this.drawConnection(nodeVM, treeVM.nodes.get(node.left));
            if (node.right)
                this.drawConnection(nodeVM, treeVM.nodes.get(node.right));
        }

        // draw nodes
        for (let [node, nodeVM] of treeVM.nodes) {
            this.drawNode(nodeVM);
        }
    }
}