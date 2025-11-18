import { Tree } from "./binarySearchTrees.js";
import { randomArray } from "./binarySearchTrees.js";

let array = randomArray(5);
let newTree = Tree(array);

console.log(array);

console.log(newTree.isBalanced());

newTree.levelOrderForEach(node => console.log(node.data));
newTree.preOrderForEach(node => console.log(node.data));
newTree.postOrderForEach(node => console.log(node.data));
newTree.inOrderForEach(node => console.log(node.data));

newTree.insert(150);
newTree.insert(180);
newTree.insert(230);
newTree.insert(200);

console.log(newTree.isBalanced());

console.log(newTree.rebalance());

console.log(newTree.isBalanced());

newTree.preOrderForEach(node => console.log(node.data));
newTree.postOrderForEach(node => console.log(node.data));
newTree.inOrderForEach(node => console.log(node.data));

newTree.prettyPrint();





