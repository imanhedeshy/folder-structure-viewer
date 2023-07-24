const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/files', (req, res) => {
    const dir = req.query.dir;
    if (!dir) {
        res.status(400).send('Missing dir parameter');
        return;
    }

    fs.readdir(dir, { withFileTypes: true }, (err, files) => {
        if (err) {
            res.status(500).send(err);
            return;
        }

        const result = files.map((file, index) => {
            return {
                name: file.name,
                isDirectory: file.isDirectory(),
                index: index + 1,
            };
        });

        res.send(result);
    });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
