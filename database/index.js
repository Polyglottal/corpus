// const Database = require('better-sqlite3');
// const path = require('path');
// const dbPath = path.join(__dirname, 'database.db');
// const db = new Database(dbPath, { verbose: console.log });
// db.exec('PRAGMA foreign_keys = ON');

// try {
//     db.prepare('CREATE TABLE IF NOT EXISTS test_table (id INTEGER PRIMARY KEY, name TEXT').run();
//     console.log('Table created successfully');
// } catch (error) {
//     console.error('Error creating table', error);
// }

module.export = db;