function Node(data){
    return{
        data : data,
        left : null,
        right : null
    };
}

export function buildTree(array){
    if(array.length === 0){
        return null;
    }
    let sortedArray = [...array].sort((a, b) => a - b);
    let uniqueSortedArray = [...new Set(sortedArray)];
    let middleIndex = Math.floor(uniqueSortedArray.length / 2);

    let value = uniqueSortedArray[middleIndex];
    let root = Node(value);
    let leftPart = uniqueSortedArray.slice(0, middleIndex);
    let rightPart = uniqueSortedArray.slice(middleIndex + 1);

    root.left = buildTree(leftPart);
    root.right = buildTree(rightPart);

    return root;
}

export function Tree(array){
    const tree = {
        root: buildTree(array),

        prettyPrint(){
            const prettyPrint = (node, prefix = '', isLeft = true) => {
            if (node === null) {
                return;
            }
            if (node.right !== null) {
                prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
            }
            console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
            if (node.left !== null) {
                prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
            }
            };
            prettyPrint(this.root);
        },

        insert(value){
            function insertNode(root, value){
                if(root === null) return Node(value);
                if(value < root.data){
                    root.left = insertNode(root.left, value)
                } else if(value > root.data) {
                    root.right = insertNode(root.right, value)
                } return root;
            } this.root = insertNode(this.root, value);
        },

        deleteItem(value){
            function getSuccessor(curr) {
                curr = curr.right;
                while (curr !== null && curr.left !== null)
                    curr = curr.left;
                return curr;
            };
            function deleteNode(root, value){
                if (root === null){
                    return null;
                } 
                if (root.data > value){
                    root.left = deleteNode(root.left, value);
                } else if (root.data < value){
                    root.right = deleteNode(root.right, value);
                } else {
                    if(root.left === null){
                        return root.right;
                    } 
                    if(root.right === null){
                        return root.left;
                    }
                    const succ = getSuccessor(root);
                    root.data = succ.data;
                    root.right = deleteNode(root.right, succ.data);
                }
                return root;
            } this.root = deleteNode(this.root, value);
        },

        find(value){
            function findNode(root, value){
                if (root === null){
                    return null;
                } else if(root.data === value){
                    return root;
                } else if (root.data > value){
                    return findNode(root.left, value);
                } else if (root.data < value){
                    return findNode(root.right, value);
                }  
            } return findNode(this.root, value);
        },

        levelOrderForEach(callback){
           if(!callback){
            throw new Error("Callback function is required");
           }
           const queue = [];
           if(this.root !== null){
            queue.push(this.root);
           }
           while(queue.length > 0){
            const node = queue.shift();
            callback(node);
            if(node.left !== null){
                queue.push(node.left);
            }
            if(node.right !== null){
                queue.push(node.right);
            }
           }
        },

        preOrderForEach(callback){
            if(!callback){
                throw new Error("Callback function is required");
            }
            const stack = [];
            if(this.root !== null){
                stack.push(this.root);
            }
            while(stack.length > 0){
                const node = stack.shift();
                callback(node);
            if(node.left !== null){
                stack.push(node.left);
            }
            if(node.right !== null){
                stack.push(node.right);
            }
            }
        },

        inOrderForEach(callback){
            if(!callback){
                throw new Error("Callback function is required");
            }
            const stack = [];
            let current = this.root;
            while(stack.length > 0 || current !== null){
                while(current !==null){
                    stack.push(current);
                    current = current.left;
                }
                current = stack.pop();
                callback(current);
                current = current.right;
            }
        },

        postOrderForEach(callback) {
            if (!callback) {
                throw new Error("Callback function is required");
            }
            if (this.root === null) return;
            const stack1 = [];
            const stack2 = [];
            stack1.push(this.root);
            while (stack1.length > 0) {
                const node = stack1.pop();
                stack2.push(node);
                if (node.left !== null) {
                    stack1.push(node.left);
                }
                if (node.right !== null) {
                    stack1.push(node.right);
                }
            }
            while (stack2.length > 0) {
                const node = stack2.pop();
                callback(node);
            }
        },

        height(value) {
            function findNode(root, value) {
                if (root === null){
                    return null;
                }
                if (root.data === value){
                    return root;
                }
                if (value < root.data) {
                    return findNode(root.left, value);
                }
                else {
                    return findNode(root.right, value);
                }
            }
            function getHeight(node) {
                if (node === null) return -1; 
                const leftHeight = getHeight(node.left);
                const rightHeight = getHeight(node.right);
                return Math.max(leftHeight, rightHeight) + 1;
            }
            const targetNode = findNode(this.root, value);
            if (targetNode === null) {
                return null; 
            }
            return getHeight(targetNode);
        },

        depth(value){
            function depthOfValue(root, value, depth = 0){
                if(root === null){
                    return null;
                }
                if(root.data === value){
                    return depth;
                }
                else if (root.data > value){
                    return depthOfValue(root.left, value, depth+1);
                } else if (root.data < value){
                    return depthOfValue(root.right, value, depth+1);
                } 
            };
            return depthOfValue(this.root, value)
        },

        isBalanced(){
            function height(node){
                if(node === null){
                    return -1;
                }
                return 1 + Math.max(height(node.left), height(node.right));
            }
            function isBalancedTree(root){
                if (root === null) {
                    return true;
                }
                const lHeight = height(root.left);
                const rHeight = height(root.right);

                if(Math.abs(lHeight - rHeight)> 1)return false;
                return isBalancedTree(root.left) && isBalancedTree(root.right);
            }
             return isBalancedTree(this.root);
        },

        rebalance(){
            let values = [];
            this.inOrderForEach(function(node){
                values.push(node.data);
            });
            this.root = null;
            this.root = buildTree(values);
            return true;
        }
};
 return tree
};

export function randomArray(size){
    const array = [];
    for(let i = 0; i < size; i++){
        const randomNumber = Math.floor(Math.random()* 100);
        array.push(randomNumber);
    }
    return array;
};
