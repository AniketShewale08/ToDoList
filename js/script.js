let currentIndex = -1; // To keep track of which item is being updated

function getAndUpdate() {
    console.log("Updating List");
    let taskTitle = document.getElementById('title').value;
    let taskDescription = document.getElementById('description').value;

    if (!taskTitle || !taskDescription) {
        alert("Please fill out both Title and Description!");
        return;
    }

    let itemJsonArray = [];
    if (localStorage.getItem('itemJson') == null) {
        itemJsonArray.push([taskTitle, taskDescription]);
    } else {
        let itemJsonArrayStr = localStorage.getItem('itemJson');
        itemJsonArray = JSON.parse(itemJsonArrayStr);

        if (currentIndex >= 0) {
            itemJsonArray[currentIndex] = [taskTitle, taskDescription];
            currentIndex = -1; 
        } else {
            itemJsonArray.push([taskTitle, taskDescription]);
        }
    }
    
    localStorage.setItem('itemJson', JSON.stringify(itemJsonArray));

    document.getElementById('title').value = "";
    document.getElementById('description').value = "";
    
    update();

    document.getElementById('add').textContent = 'Add to List';
}

function update() {
    if (localStorage.getItem('itemJson') == null) {
        itemJsonArray = [];
        localStorage.setItem('itemJson', JSON.stringify(itemJsonArray));
    } else {
        itemJsonArrayStr = localStorage.getItem('itemJson');
        itemJsonArray = JSON.parse(itemJsonArrayStr);
    }

    let tableBody = document.getElementById('tableBody');
    let str = "";
    itemJsonArray.forEach((element, index) => {
        str += `
            <tr>
                <th scope="row">${index + 1}</th>
                <td>${element[0]}</td>
                <td>${element[1]}</td>
                <td>
                    <button class="btn btn-info btn-sm" onclick="editItem(${index})">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleted(${index})">Delete</button>
                </td>
            </tr>`;
    });
    tableBody.innerHTML = str;
}

function editItem(index) {
    
    let itemJsonArrayStr = localStorage.getItem('itemJson');
    let itemJsonArray = JSON.parse(itemJsonArrayStr);

    let taskToEdit = itemJsonArray[index];

    document.getElementById('title').value = taskToEdit[0];
    document.getElementById('description').value = taskToEdit[1];
    
    currentIndex = index;    
    document.getElementById('add').textContent = 'Update Item';
}

function deleted(itemIndex) {
    console.log(`Delete: ${itemIndex}`);
    let itemJsonArrayStr = localStorage.getItem('itemJson');
    let itemJsonArray = JSON.parse(itemJsonArrayStr);
    itemJsonArray.splice(itemIndex, 1);
    localStorage.setItem('itemJson', JSON.stringify(itemJsonArray));
    update();
}

function cleared() {
    if (confirm("Do you really want to clear?")) {
        console.log("Clearing List");
        localStorage.clear();
        update();
    }
}

document.getElementById('add').addEventListener("click", getAndUpdate);
update();
