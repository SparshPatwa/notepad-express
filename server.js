const express = require('express');
const fs = require('fs');
const path = require('path');
var dbPath = path.join(__dirname, 'db/db.json');
if (!fs.existsSync(dbPath)) {
    fs.mkdirSync(path.join(__dirname, 'db'), { recursive: true });
    fs.writeFileSync(
        dbPath,
        JSON.stringify({ notes: [] }, null, 2)
    );
}

const { notes } = require('./db/db.json');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.listen(PORT, () => {
    console.log(`API server now on http://localhost:${PORT}`);
});