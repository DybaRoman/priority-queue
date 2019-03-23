class Node {
	constructor(data, priority) {
    this.data = data;
    this.priority = priority;
    this.parent = null;
    this.left = null;
    this.right = null;
	}

	appendChild(node) {
    if (!this.left) {
      this.left = node;
      node.parent = this;
    }
    else if (!this.right) {
      this.right = node;
      node.parent = this;
    } 
	}

	removeChild(node) {
    if (node === this.left) {
      this.left = null;
      node.parent = null;
    }
    else if (node === this.right) {
      this.right = null;
      node.parent = null;
    }
    else throw new Error("Node has no children");
	}

	remove() {
    if (this.parent) 
      this.parent.removeChild(this);
	}

	swapWithParent() {
    if (this.parent) {
      const temp_parent = this.parent;
       
      if (this.parent.left === this)
        var side = 1;
      else side = 2;
      this.remove();
      
      if (this.left) {
        var temp_left = this.left;
        this.left.remove();
      }

      if (this.right) {
        var temp_right = this.right;
        this.right.remove();
      }

      if (temp_parent.parent) {
        var temp = temp_parent.parent;
        temp_parent.remove();
        temp.appendChild(this);
      }

    if (side == 1) {
      this.appendChild(temp_parent);
      if (temp_parent.right){
        temp = temp_parent.right;
        temp_parent.right.remove();
        this.appendChild(temp);
      }
    }
    else {
      temp = temp_parent.left;
      temp_parent.left.remove();
      this.appendChild(temp);
      this.appendChild(temp_parent);
    }

      if (temp_left) temp_parent.appendChild(temp_left);
      if (temp_right) temp_parent.appendChild(temp_right);
    }
	}
}

module.exports = Node;
