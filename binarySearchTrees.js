function Node(value){
    return{
        value : value,
        left : null,
        right : null
    };
}

function buildTree(array){
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

function Tree(array){
    const tree = {
        root: buildTree(array),

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
                        root.left = findNode(root.left, value);
                } else if (root.data < value){
                    root.right = findNode(root.right, value);
                }  
            } return findNode(this.root, value);
        },

    
};
 return tree
}

