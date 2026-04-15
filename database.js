const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbDir = path.join(__dirname, 'data');
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir);
}

const dbPath = path.join(dbDir, 'study-scheduler.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) console.error('Database connection error:', err);
    else console.log('✓ Connected to SQLite database');
});

const initializeDatabase = () => {
    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS subjects (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT UNIQUE NOT NULL, target_hours_per_week REAL DEFAULT 5, color TEXT DEFAULT '#0066CC', created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`);
        db.run(`CREATE TABLE IF NOT EXISTS study_sessions (id INTEGER PRIMARY KEY AUTOINCREMENT, subject_id INTEGER NOT NULL, date TEXT NOT NULL, start_time TEXT NOT NULL, end_time TEXT NOT NULL, planned_duration REAL NOT NULL, actual_duration REAL DEFAULT 0, completed INTEGER DEFAULT 0, notes TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY(subject_id) REFERENCES subjects(id))`);
        db.run(`CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, session_id INTEGER NOT NULL, title TEXT NOT NULL, description TEXT, completed INTEGER DEFAULT 0, completed_at TIMESTAMP, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY(session_id) REFERENCES study_sessions(id))`);
        db.run(`CREATE TABLE IF NOT EXISTS progress (id INTEGER PRIMARY KEY AUTOINCREMENT, subject_id INTEGER NOT NULL, week_start TEXT NOT NULL, hours_studied REAL DEFAULT 0, sessions_completed INTEGER DEFAULT 0, target_hours REAL DEFAULT 5, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY(subject_id) REFERENCES subjects(id))`);
        db.run(`CREATE TABLE IF NOT EXISTS notifications (id INTEGER PRIMARY KEY AUTOINCREMENT, session_id INTEGER NOT NULL, reminder_time TEXT NOT NULL, sent INTEGER DEFAULT 0, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY(session_id) REFERENCES study_sessions(id))`);
        console.log('✓ Database tables initialized');
    });
};

const query = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows || []);
        });
    });
};

const run = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function(err) {
            if (err) reject(err);
            else resolve({ id: this.lastID, changes: this.changes });
        });
    });
};

module.exports = { db, initializeDatabase, query, run };