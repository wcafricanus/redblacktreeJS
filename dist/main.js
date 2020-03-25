/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./model/binarytree.js":
/*!*****************************!*\
  !*** ./model/binarytree.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const BinaryTreeNode = __webpack_require__(/*! ./binarytreenode */ \"./model/binarytreenode.js\");\r\n\r\nclass BinaryTree{\r\n    constructor() {\r\n        this.rootNode = null;\r\n        this.stack = [];\r\n    }\r\n\r\n    [Symbol.iterator](){\r\n        this.in_order_left(this.rootNode, this.stack);\r\n        return this;\r\n    }\r\n\r\n    next(){\r\n        if(this.stack.length){\r\n            let item = this.stack.pop();\r\n            if(item.right){\r\n                this.in_order_left(item.right, this.stack);\r\n            }\r\n            return {done: false, value: item};\r\n        }\r\n        else{\r\n            return {done: true};\r\n        }\r\n    }\r\n\r\n    in_order_left(current, stack) {\r\n        while(current){\r\n            stack.push(current);\r\n            current = current.left;\r\n        }\r\n    }\r\n\r\n    find(value){\r\n        let next = this.rootNode;\r\n        while (next){\r\n            if (next.value === value){\r\n                break;\r\n            }\r\n            else if(next.value > value){\r\n                next = next.left;\r\n            }\r\n            else{\r\n                next = next.right;\r\n            }\r\n        }\r\n        return next;\r\n    }\r\n\r\n    createNode(value){\r\n        return new BinaryTreeNode(value);\r\n    }\r\n\r\n    insert(node){\r\n        if(!isNaN(node)) //  is a number\r\n        {\r\n            node = this.createNode(node);\r\n        }\r\n\r\n        let cursor = this.rootNode;\r\n        let parent = null;\r\n        let left = true;\r\n        while(true){\r\n            let result = this.tryInsertTo(cursor, node, parent, left);\r\n            if(result)\r\n                break;\r\n\r\n            parent = cursor;\r\n            if (node.value < cursor.value) {\r\n                left = true;\r\n                cursor = cursor.left;\r\n            }\r\n            else{\r\n                left = false;\r\n                cursor = cursor.right;\r\n            }\r\n        }\r\n\r\n        return node;\r\n    }\r\n\r\n    tryInsertTo(candidateSlot, node, parent, left){\r\n        // if slot is empty, put node here\r\n        if(!candidateSlot){\r\n            node.parent = parent;\r\n            // very first node, become root\r\n            if(!parent){\r\n                this.rootNode = node;\r\n                return true;\r\n            }\r\n            // not the first node\r\n            if(left)\r\n                parent.left = node;\r\n            else\r\n                parent.right = node;\r\n            return true;\r\n        }\r\n\r\n        // there is an existing node at this position\r\n        return false;\r\n    }\r\n\r\n    delete(node){\r\n        if(!isNaN(node)) //  is a number\r\n        {\r\n            node = this.find(node);\r\n        }\r\n\r\n        let toDelete = this.designateNodeToDelete(node);\r\n\r\n        this.remove(toDelete)\r\n    }\r\n\r\n    remove(node){\r\n        // root node\r\n        if (node===this.rootNode){\r\n            this.rootNode = null;\r\n            return;\r\n        }\r\n\r\n        // not root\r\n        if(node === node.parent.left)\r\n            node.parent.left = null;\r\n        else\r\n            node.parent.right = null;\r\n        node.parent = null;\r\n    }\r\n\r\n\r\n    designateNodeToDelete(node) {\r\n        if (node.isLeaf){\r\n            return node;\r\n        }\r\n        // node has one child\r\n        else if((node.left||node.right)&&!(node.left&&node.right)){\r\n            let child = node.left? node.left: node.right;\r\n            node.value = child.value;\r\n            return this.designateNodeToDelete(child);\r\n        }\r\n        // node has two children\r\n        else{\r\n            // find inorder successor\r\n            let stack = [];\r\n            this.in_order_left(node.right, stack);\r\n            let inorder_suc = stack.pop();\r\n            node.value = inorder_suc.value;\r\n            return this.designateNodeToDelete(inorder_suc);\r\n        }\r\n    }\r\n}\r\n\r\nmodule.exports = BinaryTree;\n\n//# sourceURL=webpack:///./model/binarytree.js?");

/***/ }),

/***/ "./model/binarytreenode.js":
/*!*********************************!*\
  !*** ./model/binarytreenode.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class BinaryTreeNode{\r\n    constructor(value) {\r\n        this._value = value;\r\n        this.left = null;\r\n        this.right = null;\r\n        this.parent = null;\r\n        this._posX = 0;\r\n        this._posY = 0;\r\n        this.radius = 20;\r\n        this.positionChanged = null;\r\n        this.valueChanged = null;\r\n    }\r\n\r\n    get value(){\r\n        return this._value;\r\n    }\r\n\r\n    set value(value){\r\n        this._value = value;\r\n        if(this.valueChanged){\r\n            this.valueChanged(value);\r\n        }\r\n    }\r\n\r\n    get posX(){\r\n        return this._posX;\r\n    }\r\n\r\n    set posX(x){\r\n        this._posX = x;\r\n        if (this.positionChanged)\r\n            this.positionChanged(this._posX, this._posY);\r\n    }\r\n\r\n    get posY(){\r\n        return this._posY;\r\n    }\r\n\r\n    set posY(y){\r\n        this._posY = y;\r\n        if (this.positionChanged)\r\n            this.positionChanged(this._posX, this._posY);\r\n    }\r\n\r\n    connectLeft(node){\r\n        this.left = node;\r\n        node.parent = this;\r\n    }\r\n\r\n    connectRight(node){\r\n        this.right = node;\r\n        node.parent = this;\r\n    }\r\n\r\n    countDescendants(){\r\n        let leftCount = this.left? this.left.countDescendants() + 1: 0;\r\n        let rightCount = this.right? this.right.countDescendants() + 1: 0;\r\n        return leftCount + rightCount;\r\n    }\r\n\r\n    countLeftDescendants(){\r\n        if(this.left)\r\n            return this.left.countDescendants() + 1;\r\n        return 0;\r\n    }\r\n\r\n    countRightDescendants(){\r\n        if(this.right)\r\n            return this.right.countDescendants() + 1;\r\n        return 0;\r\n    }\r\n\r\n    get isLeaf(){\r\n        return !(this.left||this.right);\r\n    }\r\n}\r\n\r\nmodule.exports = BinaryTreeNode;\n\n//# sourceURL=webpack:///./model/binarytreenode.js?");

/***/ }),

/***/ "./model/rbtreenode.js":
/*!*****************************!*\
  !*** ./model/rbtreenode.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const BinaryTreeNode = __webpack_require__(/*! ./binarytreenode */ \"./model/binarytreenode.js\");\r\n\r\nclass RBTreeNode extends BinaryTreeNode{\r\n    constructor(value) {\r\n        super(value);\r\n        this._red = true;\r\n        this.colorChanged = null;\r\n    }\r\n\r\n    get red(){\r\n        return this._red;\r\n    }\r\n\r\n    set red(value){\r\n        this._red = value;\r\n        if (this.colorChanged)\r\n            this.colorChanged(value);\r\n    }\r\n}\r\n\r\nmodule.exports = RBTreeNode;\n\n//# sourceURL=webpack:///./model/rbtreenode.js?");

/***/ }),

/***/ "./model/redblacktree.js":
/*!*******************************!*\
  !*** ./model/redblacktree.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const BinaryTree = __webpack_require__(/*! ./binarytree */ \"./model/binarytree.js\");\r\nconst RBTreeNode = __webpack_require__(/*! ./rbtreenode */ \"./model/rbtreenode.js\");\r\n\r\nclass RedBlackTree extends BinaryTree{\r\n    constructor(){\r\n        super();\r\n        this.rbTreeChanged = null;\r\n    }\r\n\r\n    createNode(value){\r\n        let node = new RBTreeNode(value);\r\n        return node;\r\n    }\r\n\r\n    insert(node) {\r\n        node = super.insert(node);\r\n        let nodeToCheck = node;\r\n        while(nodeToCheck){\r\n            nodeToCheck = this.checkBalance(nodeToCheck);\r\n        }\r\n        if (this.rbTreeChanged)\r\n            this.rbTreeChanged(this);\r\n        return node;\r\n    }\r\n\r\n    checkBalance(node) {\r\n        let recheck = null;\r\n        if (node === this.rootNode) {\r\n            node.red = false;\r\n            return recheck;\r\n        }\r\n        if (!node.parent.red) {\r\n            return recheck;\r\n        }\r\n        // node and parent both red\r\n        let uncle = this.getUncle(node);\r\n        let grandpa = node.parent.parent;\r\n        // uncle also red\r\n        if (uncle && uncle.red) {\r\n            // flip color of parent and uncle\r\n            uncle.red = false;\r\n            node.parent.red = false;\r\n            // grand parent is root\r\n            if (grandpa === this.rootNode) {\r\n                return recheck;\r\n            }\r\n            // grand parent is not root\r\n            else {\r\n                grandpa.red = true;\r\n                recheck = grandpa;\r\n            }\r\n        }\r\n        // uncle not red\r\n        else {\r\n            let leftBranch = node.parent === grandpa.left;\r\n            if (node === node.parent.left && node.parent === grandpa.right) {\r\n                // right rotate parent\r\n                let P = node.parent;\r\n                let N = node;\r\n                let G = grandpa;\r\n                let RC = node.right;\r\n                this.rightRotate(G, N, P, RC);\r\n            }\r\n            if (node === node.parent.right && node.parent === grandpa.left) {\r\n                // left rotate parent\r\n                let P = node.parent;\r\n                let N = node;\r\n                let G = grandpa;\r\n                let LC = node.left;\r\n                this.leftRotate(G, N, P, LC);\r\n            }\r\n\r\n            if (leftBranch) {\r\n                let P = grandpa.left;\r\n                let G = grandpa;\r\n                // right rotate grandpa\r\n                this.rightRotate(G.parent, P, G, P.right);\r\n                // recolor\r\n                P.red = false;\r\n                G.red = true;\r\n            } else {\r\n                let P = grandpa.right;\r\n                let G = grandpa;\r\n                // left rotate grandpa\r\n                this.leftRotate(G.parent, P, G, P.left);\r\n                // recolor\r\n                P.red = false;\r\n                G.red = true;\r\n            }\r\n        }\r\n        return recheck;\r\n    }\r\n\r\n    delete(node) {\r\n        super.delete(node);\r\n        if (this.rbTreeChanged){\r\n            this.rbTreeChanged(this);\r\n        }\r\n    }\r\n\r\n    leftRotate(G, N, P, LC) {\r\n        // 1. link grandpa self\r\n        if (G)\r\n            if (G.left===P)\r\n                G.left = N;\r\n            else\r\n                G.right = N;\r\n        N.parent = G;\r\n        // 2. relink self parent\r\n        N.left = P;\r\n        P.parent = N;\r\n        // 3. link left child to parent right\r\n        P.right = LC;\r\n        if(LC)\r\n            LC.parent = P;\r\n        // update root node reference if root node is changed\r\n        if (!N.parent)\r\n            this.rootNode = N;\r\n    }\r\n\r\n    rightRotate(G, N, P, RC) {\r\n        // 1. link grandpa self\r\n        if (G)\r\n            if (G.right===P)\r\n                G.right = N;\r\n            else\r\n                G.left = N;\r\n        N.parent = G;\r\n        // 2. relink self parent\r\n        P.parent = N;\r\n        N.right = P;\r\n        // 3. link right child to parent left\r\n        P.left = RC;\r\n        if (RC)\r\n            RC.parent = P;\r\n        // update root node reference if root node is changed\r\n        if (!N.parent)\r\n            this.rootNode = N;\r\n    }\r\n\r\n    getUncle(node) {\r\n        if(node.parent===node.parent.parent.left)\r\n            return node.parent.parent.right;\r\n        return node.parent.parent.left;\r\n    }\r\n}\r\n\r\nmodule.exports = RedBlackTree;\n\n//# sourceURL=webpack:///./model/redblacktree.js?");

/***/ }),

/***/ "./positionarranger.js":
/*!*****************************!*\
  !*** ./positionarranger.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\r\n * This class is responsible of determining the screen position\r\n * of all the nodes in a Red Black Tree.\r\n */\r\nclass PositionArranger{\r\n    constructor(x, y, spaceX, spaceY) {\r\n        this.anchor = {x: x, y:y};\r\n        this.spaceX = spaceX;\r\n        this.spaceY = spaceY;\r\n    }\r\n\r\n    arrange(rbtree){\r\n        this.arrangeNodePosition(rbtree.rootNode);\r\n    }\r\n\r\n    arrangeNodePosition(node){\r\n        // if null node, do nothing\r\n        if(!node)\r\n            return;\r\n\r\n        // if root node, set anchor position\r\n        if(!node.parent){\r\n            node.posX = this.anchor.x;\r\n            node.posY = this.anchor.y;\r\n        }\r\n        else if(node === node.parent.right){\r\n            let leftCount = node.countLeftDescendants();\r\n            let offsetX = (leftCount + 1) * this.spaceX;\r\n            node.posX = node.parent.posX + offsetX;\r\n            node.posY = node.parent.posY + this.spaceY;\r\n        }\r\n        else if(node === node.parent.left){\r\n            let rightCount = node.countRightDescendants();\r\n            let offsetX = (rightCount + 1) * this.spaceX;\r\n            node.posX = node.parent.posX - offsetX;\r\n            node.posY = node.parent.posY + this.spaceY;\r\n        }\r\n        //\r\n        this.arrangeNodePosition(node.left);\r\n        this.arrangeNodePosition(node.right);\r\n    }\r\n}\r\n\r\nmodule.exports = PositionArranger;\n\n//# sourceURL=webpack:///./positionarranger.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const RBTreeNode = __webpack_require__(/*! ../model/rbtreenode */ \"./model/rbtreenode.js\");\r\nconst RedBlackTree = __webpack_require__(/*! ../model/redblacktree */ \"./model/redblacktree.js\");\r\nconst PositionArranger = __webpack_require__(/*! ../positionarranger */ \"./positionarranger.js\");\r\nconst RBTreeVM = __webpack_require__(/*! ../src/rbtreevm */ \"./src/rbtreevm.js\");\r\nlet canvas = document.getElementById(\"myCanvas\");\r\nlet ctx = canvas.getContext(\"2d\");\r\nlet drawer = new RbTreeDrawer(ctx);\r\n// let varList = [];\r\nlet varList = [5,1,2,8,6,4];\r\nlet tree = new RedBlackTree();\r\nfor (let i = 0; i < varList.length; i++) {\r\n    let newNode = new RBTreeNode(varList[i]);\r\n    tree.insert(newNode);\r\n}\r\nlet treeVM = new RBTreeVM(tree);\r\nlet arranger = new PositionArranger(canvas.width/2, 40, 50, 50);\r\narranger.arrange(tree);\r\ndocument.getElementById(\"addButton\").onclick = addNodeByValue;\r\ndocument.getElementById(\"deleteButton\").onclick = deleteNodeByValue;\r\nlet input = document.getElementById(\"nodeValue\");\r\ninput.addEventListener(\"keyup\", function(event) {\r\n    if (event.code === \"Enter\") {\r\n        // Cancel the default action, if needed\r\n        event.preventDefault();\r\n        // Trigger the button element with a click\r\n        document.getElementById(\"submitButton\").click();\r\n        input.value = '';\r\n    }\r\n});\r\n\r\nfunction addNodeByValue() {\r\n    let textValue = document.getElementById('nodeValue').value;\r\n    let value = Number(textValue);\r\n    let newNode = new RBTreeNode(value);\r\n    tree.insert(newNode);\r\n    arranger.arrange(tree);\r\n}\r\n\r\nfunction deleteNodeByValue() {\r\n    let textValue = document.getElementById('nodeValue').value;\r\n    let value = Number(textValue);\r\n    tree.delete(value);\r\n    arranger.arrange(tree);\r\n}\r\n\r\nfunction update(){\r\n    ctx.clearRect(0, 0, canvas.width, canvas.height);\r\n    treeVM.updatePositions();\r\n    drawer.drawTree(treeVM);\r\n}\r\n\r\n\r\nsetInterval(update, 16);\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/rbnodevm.js":
/*!*************************!*\
  !*** ./src/rbnodevm.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class RBNodeVM{\r\n    constructor(node){\r\n        this.color = node.red? \"red\": \"black\";\r\n        this.text = node.value.toString();\r\n        this.radius = node.radius;\r\n        this.posX = 0;\r\n        this.posY = 0;\r\n        this.targetX = node.posX;\r\n        this.targetY = node.posY;\r\n        this.changeFlag = false;\r\n        node.positionChanged = this.positionChangedCallback.bind(this);\r\n        node.colorChanged = this.colorChangedCallback.bind(this);\r\n        node.valueChanged = this.valueChangedCallback.bind(this);\r\n    }\r\n\r\n    positionChangedCallback(x, y){\r\n        this.targetX = x;\r\n        this.targetY = y;\r\n        this.changeFlag = true;\r\n    }\r\n\r\n    colorChangedCallback(red){\r\n        this.color = red? \"red\": \"black\";\r\n    }\r\n\r\n    valueChangedCallback(value){\r\n        this.text = value.toString();\r\n    }\r\n\r\n    updatePosition(scale){\r\n        if(!this.changeFlag)\r\n            return;\r\n\r\n        this.posX += (this.targetX - this.posX)*scale;\r\n        if (Math.abs(this.posX-this.targetX)<1){\r\n            this.posX = this.targetX;\r\n        }\r\n\r\n        this.posY += (this.targetY - this.posY)*scale;\r\n        if (Math.abs(this.posY-this.targetY)<1){\r\n            this.posY = this.targetY;\r\n        }\r\n\r\n        if (this.posX === this.targetX && this.posY === this.targetY){\r\n            this.changeFlag = false;\r\n        }\r\n    }\r\n}\r\n\r\nmodule.exports = RBNodeVM;\n\n//# sourceURL=webpack:///./src/rbnodevm.js?");

/***/ }),

/***/ "./src/rbtreevm.js":
/*!*************************!*\
  !*** ./src/rbtreevm.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const RBNodeVM = __webpack_require__(/*! ./rbnodevm */ \"./src/rbnodevm.js\");\r\n\r\nclass RBTreeVM{\r\n    constructor(rbtree) {\r\n        this.nodes = new Map();\r\n        this.updateFromModel(rbtree);\r\n        rbtree.rbTreeChanged = this.rbTreeChangedCallback.bind(this);\r\n    }\r\n\r\n    updateFromModel(rbtree) {\r\n        let swapMap = new Map();\r\n\r\n        for(const node of rbtree){\r\n            let nodeVM = this.nodes.get(node);\r\n            // create nodeVM\r\n            if(!nodeVM){\r\n                nodeVM = new RBNodeVM(node);\r\n            }\r\n            swapMap.set(node, nodeVM);\r\n        }\r\n\r\n        this.nodes = swapMap;\r\n    }\r\n\r\n    updatePositions(){\r\n        for (let [node, nodeVM] of this.nodes){\r\n            nodeVM.updatePosition(0.1);\r\n        }\r\n    }\r\n\r\n    rbTreeChangedCallback(rbtree) {\r\n        this.updateFromModel(rbtree);\r\n    }\r\n}\r\n\r\nmodule.exports = RBTreeVM;\n\n//# sourceURL=webpack:///./src/rbtreevm.js?");

/***/ })

/******/ });