class hashMap {
  constructor() {
    this.loadFactor = 0.75;
    this.numberOfEntries = 0;
    this.size = 16;
    this.buckets = new Array(this.size).fill(null).map(() => new LinkedList());
  }
  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashCode % this.buckets.length;
    }

    return hashCode;
  }

  set(key, value) {
    const index = this.hash(key);
    const list = this.buckets[index];
    if (list.head === null) {
      list.append({ key, value });
      this.numberOfEntries++;
      this.resize();
      return true;
    } else {
      let current = list.head;
      while (current != null) {
        if (current.value.key === key) {
          current.value.value = value;
          return true;
        }
        if (current == null) {
          list.append({ key, value });
          this.numberOfEntries++;
          this.resize();
        }
        current = current.nextNode;
      }
      list.append({ key, value });
      this.numberOfEntries++;
      this.resize();
    }
  }
  get(key) {
    const index = this.hash(key);
    const list = this.buckets[index];

    let current = list.head;
    while (current != null) {
      if (current.value.key === key) {
        return console.log(
          `The key ${key} have the value ${current.value.value}`
        );
      }

      current = current.nextNode;
    }
    return console.log(null);
  }
  has(key) {
    const index = this.hash(key);
    const list = this.buckets[index];

    let current = list.head;
    while (current != null) {
      if (current.value.key === key) {
        return console.log(true);
      }

      current = current.nextNode;
    }
    return console.log(false);
  }
  remove(key) {
    const index = this.hash(key);
    const list = this.buckets[index];
    let current = list.head;
    let previous = null;

    while (current != null) {
      if (current.value.key == key) {
        list.head = null;
        this.numberOfEntries--;

        return console.log(true);
      }
      if (current.value.key == key) {
        previous.nextNode = null;
        this.numberOfEntries--;
        return console.log(true);
      }
      previous = current;
      current = current.nextNode;
    }
    return false;
  }
  lenght() {
    console.log(`There is ${this.numberOfEntries} keys stored in the hash map`);
  }
  clear() {
    this.numberOfEntries = 0;
    this.buckets = new Array(this.size).fill(null).map(() => new LinkedList());
    console.log("All value have been cleared !");
  }
  keys() {
    let i = 0;
    let keyArray = [];
    for (let i = 0; i < this.size; i++) {
      let list = this.buckets[i];

      let current = list.head;
      while (current != null) {
        keyArray.push(current.value.key);
        current = current.nextNode;
      }
    }
    return console.log(keyArray);
  }
  values() {
    let i = 0;
    let valueArray = [];
    for (let i = 0; i < this.size; i++) {
      let list = this.buckets[i];

      let current = list.head;
      while (current != null) {
        valueArray.push(current.value.value);
        current = current.nextNode;
      }
    }
    return console.log(valueArray);
  }
  entries() {
    let i = 0;
    let entriesArray = [];
    for (let i = 0; i < this.size; i++) {
      let list = this.buckets[i];

      let current = list.head;
      while (current != null) {
        entriesArray.push([current.value.key, current.value.value]);
        current = current.nextNode;
      }
    }
    console.log(entriesArray);
    return entriesArray;
  }
  resize() {
    let factor = this.loadFactor * this.size;

    if (this.numberOfEntries > factor) {
      let entriesArray = this.entries();
      this.size++;

      factor = this.loadFactor * this.size;

      this.clear();

      for (let i = 0; i < entriesArray.length; i++) {
        let key = entriesArray[i][0];
        let value = entriesArray[i][1];
        this.set(key, value);
      }
    }
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }
  append(value) {
    const node = new Node(value);

    if (this.head === null) {
      this.head = node;
    } else {
      let current = this.head;
      while (current.nextNode) {
        current = current.nextNode;
      }

      current.nextNode = node;
    }
  }
}
class Node {
  constructor(value = null, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }
}
const test = new hashMap();

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
test.set("moon", "silver");
