const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.static('public'));

app.get('/folder-structure', (req, res) => {
    const folderPath = req.query.path;
    const structure = getFolderStructure(folderPath, '');
    res.send(structure);
});

app.get('/folder-structure-excel', (req, res) => {
    const folderPath = req.query.path;
    const structure = getFolderStructure(folderPath, '');
    const flatStructure = flattenStructure(structure);
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(flatStructure);
    xlsx.utils.book_append_sheet(wb, ws);
    const wbout = xlsx.write(wb, {type: 'buffer'});
    res.setHeader('Content-Type', 'application/vnd.openxmlformats');
    res.setHeader("Content-Disposition", "attachment; filename=" + "FolderStructure.xlsx");
    res.send(wbout);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

function getFolderStructure(dir, index) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach((file, i) => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        const isDirectory = stat.isDirectory();
        results.push({
            index: `${index}${i + 1}`,
            type: isDirectory ? 'Directory' : 'File',
            name: file,
            children: isDirectory ? getFolderStructure(fullPath, `${index}${i + 1}.`) : null
        });
    });
    return results;
}

function flattenStructure(structure, prefix = '') {
    return structure.reduce((acc, item, index) => {
        const newIndex = `${prefix}${index + 1}`;
        if (item.children) {
            acc.push({ index: newIndex, type: item.type, name: item.name });
            acc = acc.concat(flattenStructure(item.children, `${newIndex}.`));
        } else {
            acc.push({ index: newIndex, type: item.type, name: item.name });
        }
        return acc;
    }, []);
}
