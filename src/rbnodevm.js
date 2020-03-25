class RBNodeVM{
    constructor(node){
        this.color = node.red? "red": "black";
        this.text = node.value.toString();
        this.radius = node.radius;
        this.posX = 0;
        this.posY = 0;
        this.targetX = node.posX;
        this.targetY = node.posY;
        this.changeFlag = false;
        node.positionChanged = this.positionChangedCallback.bind(this);
        node.colorChanged = this.colorChangedCallback.bind(this);
        node.valueChanged = this.valueChangedCallback.bind(this);
    }

    positionChangedCallback(x, y){
        this.targetX = x;
        this.targetY = y;
        this.changeFlag = true;
    }

    colorChangedCallback(red){
        this.color = red? "red": "black";
    }

    valueChangedCallback(value){
        this.text = value.toString();
    }

    updatePosition(scale){
        if(!this.changeFlag)
            return;

        this.posX += (this.targetX - this.posX)*scale;
        if (Math.abs(this.posX-this.targetX)<1){
            this.posX = this.targetX;
        }

        this.posY += (this.targetY - this.posY)*scale;
        if (Math.abs(this.posY-this.targetY)<1){
            this.posY = this.targetY;
        }

        if (this.posX === this.targetX && this.posY === this.targetY){
            this.changeFlag = false;
        }
    }
}

module.exports = RBNodeVM;