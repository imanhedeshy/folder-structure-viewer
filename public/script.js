const folderInput = document.querySelector('.file-structure-viewer__input');
const browseButton = document.querySelector('.file-structure-viewer__button');
const downloadExcelButton = document.querySelector('.file-structure-viewer__button-excel');
const structureContainer = document.querySelector('.file-structure-viewer__structure');
const spreadsheetContainer = document.querySelector('.file-structure-viewer__spreadsheet');

browseButton.addEventListener('click', () => {
    fetch(`http://localhost:3000/folder-structure?path=${encodeURIComponent(folderInput.value)}`)
        .then(response => response.json())
        .then(data => {
            structureContainer.innerHTML = '';
            spreadsheetContainer.innerHTML = '';
            displayStructure(data, structureContainer);
        })
        .catch(error => console.error(error));
});

downloadExcelButton.addEventListener('click', () => {
    fetch(`http://localhost:3000/folder-structure-excel?path=${encodeURIComponent(folderInput.value)}`)
        .then(response => response.arrayBuffer())
        .then(data => {
            const workbook = XLSX.read(data, {type: 'buffer'});
            const worksheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[worksheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, {header: 1});
            const table = createTable(jsonData);
            spreadsheetContainer.innerHTML = '';
            spreadsheetContainer.appendChild(table);
        })
        .catch(error => console.error(error));
});

function displayStructure(data, parent) {
    data.forEach(item => {
        const div = document.createElement('div');
        div.className = item.type.toLowerCase();
        const span = document.createElement('span');
        span.className = `${item.type.toLowerCase()}-name`;
        span.textContent = `${item.index} ${item.name}`;
        div.appendChild(span);
        parent.appendChild(div);
        if (item.children) {
            displayStructure(item.children, div);
        }
    });
}

function createTable(data) {
    const table = document.createElement('table');
    table.className = 'table';
    data.forEach((row, rowIndex) => {
        const tr = document.createElement('tr');
        row.forEach((cell, cellIndex) => {
            const td = document.createElement(rowIndex === 0 ? 'th' : 'td');
            td.textContent = cell;
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });
    return table;
}
