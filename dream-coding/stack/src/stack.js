class Node {
  constructor(item, next) {
    this.item = item;
    this.next = next;
  }
}

class Stack {
  constructor() {
    this._size = 0;
    this.head = null;
  }

  size() {
    return this._size;
  }

  push(item) {
    const node = new Node(item, this.head);
    this.head = node;
    this._size++;
  }

  pop() {
    if (this.head == null) {
      throw new Error("The stack is empty");
    }

    const node = this.head;
    this.head = node.next;
    this._size--;
    return node.item;
  }

  peek() {
    if (this.head == null) {
      throw new Error("The stack is empty");
    }

    const node = this.head;
    return node.item;
  }
}

module.exports = Stack;
