const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.number = 0;
	}

	push(data, priority) {
		const node = new Node(data, priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
	}

	pop() {
		if (this.root) {
			const r = this.root.data;
			if (this.parentNodes.length > 0)
				 this.number--;

			this.restoreRootFromLastInsertedNode(this.detachRoot());
			this.shiftNodeDown(this.root);
			
			return r;
		}
	}

	detachRoot() {
		const a = this.root;
		this.root = null;
		if (this.parentNodes[0] === a) 
			this.parentNodes.shift();
		return a;
	}

	restoreRootFromLastInsertedNode(detached) {
		if (this.parentNodes.length != 0) {
			const n = this.parentNodes[this.parentNodes.length-1];

			if (this.parentNodes.length == 2) {
				const b = this.parentNodes.pop();
				this.parentNodes.unshift(b);
			}	
			else if (this.parentNodes.length > 2) 
				if (n.parent.right === n) {
					this.parentNodes.unshift(n.parent);
					this.parentNodes.pop();
				}
				else this.parentNodes.pop();

			n.remove();
			this.root = n;
			if (detached.left){ 
				n.left = detached.left;
				detached.left.parent = n;
			}
			if (detached.right) {
				n.right = detached.right;
				detached.right.parent = n;
			}
		}
	}

	size() {
		return this.number;
	}

	isEmpty() {
			return !this.size(); 
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this.number = 0;
	}

	insertNode(node) {
		if (!this.root)
			this.root = node;
		else if (!this.parentNodes[0].left) {
				this.parentNodes[0].appendChild(node);
			}
		else if (!this.parentNodes[0].right) {
			this.parentNodes[0].appendChild(node);
			this.parentNodes.shift();
		}
		this.parentNodes.push(node);
		this.number++;
	}
	
	shiftNodeUp(node) {
		if (node.parent) {
			if (node.priority > node.parent.priority) {
				const n = this.parentNodes.indexOf(node);
				if (this.parentNodes.indexOf(node.parent) > -1)
					this.parentNodes[this.parentNodes.indexOf(node.parent)] = node;
				this.parentNodes[n] = node.parent;
				
				node.swapWithParent();
				this.shiftNodeUp(node);
			}
		}
		else {
			this.root = node;
		}
	}

	shiftNodeDown(node) {
		if (node && node.left) 
			if (node.right && Math.max(node.priority, node.left.priority, node.right.priority) == node.right.priority) {
				if (this.parentNodes.indexOf(node.right) > -1)
					this.parentNodes[this.parentNodes.indexOf(node.right)] = node;
				
				if (this.root === node) 
					this.root = node.right;

				node.right.swapWithParent();
				this.shiftNodeDown(node);
			}
			else if ((!node.right && node.left.priority > node.priority) || (node.right && Math.max(node.priority, node.left.priority, node.right.priority) == node.left.priority))	{
				if (this.parentNodes.indexOf(node) > -1) {
					const n = this.parentNodes.indexOf(node);
					this.parentNodes[this.parentNodes.indexOf(node.left)] = node;
					this.parentNodes[n] = node.left;
				}
				else if (this.parentNodes.indexOf(node.left) > -1)
					this.parentNodes[this.parentNodes.indexOf(node.left)] = node;
			
				if (this.root === node)
					this.root = node.left;

				node.left.swapWithParent();
				this.shiftNodeDown(node);
			}
	}
}

module.exports = MaxHeap;
