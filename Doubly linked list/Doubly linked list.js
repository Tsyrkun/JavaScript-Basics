
const EventEmitter = require('events');

function Node(value) {
    this.data = value;
    this.previous = null;
    this.next = null;
};

function DoublyList() {
    this._length = 0;
    this.head = null;
    this.tail = null;
    this.emitter = new EventEmitter();
}

DoublyList.prototype.add = function(...values) {
    const node = new Node(value);

    if (this._length) {
        this.tail.next = node;
        node.previous = this.tail;
        this.tail = node;
    } else {
        this.head = node;
        this.tail = node;
    }

    this._length++;
    this.emitter.emit('add', value);

    return this;
};


DoublyList.prototype.remove = function(position) {
    let currentNode = this.head,
        length = this._length,
        count = 1,
        message = {failure: 'Failure: non-existent node in this list.'},
        beforeNodeToDelete = null,
        nodeToDelete = null,
        deletedNode = null;

    if (length === 0 || position < 1 || position > length) {
        throw new Error(message.failure);
    }

    if (position === 1) {
        this.head = currentNode.next;

        if (!this.head) {
            this.head.previous = null;
        } else {
            this.tail = null;
        }

    } else if (position === this._length) {
        this.tail = this.tail.previous;
        this.tail.next = null;
    } else {
        while (count < position) {
            currentNode = currentNode.next;
            count++;
        }

        beforeNodeToDelete = currentNode.previous;
        nodeToDelete = currentNode;
        afterNodeToDelete = currentNode.next;

        beforeNodeToDelete.next = afterNodeToDelete;
        afterNodeToDelete.previous = beforeNodeToDelete;
        deletedNode = nodeToDelete;
        nodeToDelete = null;
    }

    this._length--;
    this.emitter.emit('remove', position);

    return message.success;
};

DoublyList.prototype.removeAll = function() {
    this.head = null;
    this.tail = null;
    this._length = 0;
    this.emitter.emit('removeAll');
};

DoublyList.prototype.subscribe = function(event, cb) {
    this.emitter.on(event, (args) => cb(args));
};


// test

const list = new DoublyList();
list.subscribe('add', value => {
    console.log(`Added value ${value}`);
});
list.subscribe('remove', position => {
    console.log(`Removed item at position ${position}`);
});
list.subscribe('removeAll', () => {
    console.log('List has been emptied');
});

list.add(4, 5, 2)(3, 7).add(14);
list.add(228);
list.remove(1);
list.removeAll()
